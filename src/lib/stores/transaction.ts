import { defineStore, storeToRefs } from 'pinia';

import { ref } from 'vue';

import { 
    WalletName,
    readWallet
} from '../wallet/Wallet'
import { getAccount, getTxByHash } from '../utils/http';
import { UniClient } from '../wallet/UniClient';
import { useWalletStore } from './wallet';
import { useBlockchainStore } from './blockchain';
import type { BroadcastMode } from '../utils/type';

export const useTransactionStore = defineStore('dh-transaction', () => {
  
  const maxFetchTry = ref(0) // the waited time
  const waitBetweenFetch = ref(2000) // the time to wait before next fetch of tx
  const txStep = ref(0) // the tx txStep

  const isSendingTx = ref(false)
  const txError = ref('')
  const txMsg = ref('')
  const txHash = ref('')
  const skipGasEstimation = ref(false)

  function reset() {
    txError.value = '';
    txHash.value = '';
    txMsg.value = '';
    txStep.value = 0;
    isSendingTx.value = false;
  }

  async function sendTx({feeAmount, feeDenom, messages, memo, gasLimit, broadcastMode}: {
    feeDenom: string,
    feeAmount: string,
    messages: any[],
    memo: string,
    gasLimit: string,
    broadcastMode: BroadcastMode
  }) {
    if(isSendingTx.value == true) {
      return Promise.resolve('');
    }
    reset();
    isSendingTx.value = true;
    const { connectedWallet } = storeToRefs(useWalletStore())
    const { selectedBlockchain } = storeToRefs(useBlockchainStore())
    try {
      // request sequence and acc number
      const acc = await getAccount(selectedBlockchain.value?.rest || '', connectedWallet.value?.cosmosAddress || '');
      console.log(connectedWallet.value?.cosmosAddress)
      const tx = {
          chainId: selectedBlockchain.value?.chainId || '',
          signerAddress: connectedWallet.value?.cosmosAddress ?? '',
          messages,
          fee: {
              gas: "200000",
              amount: [
                  { amount: feeAmount, denom: feeDenom },
              ],
          },
          memo: memo,
          signerData: {
              accountNumber: Number(acc.account.account_number),
              sequence: Number(acc.account.sequence),
              chainId: selectedBlockchain.value?.chainId || '',
          },
      };
      console.log('tx:', tx);
      const current = readWallet(WalletName.Keplr, connectedWallet.value?.hdPath);
      const wallet = current ? current.wallet : WalletName.Keplr;
      const client = new UniClient(wallet, {
          chainId: selectedBlockchain.value?.chainId,
          hdPath: current.hdPath,
      });
      
      if(!skipGasEstimation.value) {
        let gasEstimationSuccess = false;
        console.log(selectedBlockchain.value?.rest)
        await client.simulate(selectedBlockchain.value?.rest || '' , tx, broadcastMode).then(gas => {
          // update tx gas
          tx.fee.gas = (gas * 1.25).toFixed()
          gasEstimationSuccess = true;
        }).catch((err) => {
            // sending.value = false;
            txError.value = "Failed to simulate tx gas: " + err;
            tx.fee.gas = gasLimit
        })
        if(!gasEstimationSuccess) {
          txStep.value = 100;
          isSendingTx.value = false;
          return Promise.resolve(null)
        }
      }

      const txRaw = await client.sign(tx);
      const response = await client.broadcastTx(selectedBlockchain.value?.rest || '', txRaw, broadcastMode);

      // show submitting view
      txHash.value = response.tx_response.txhash

      txMsg.value = 'Tx Submitted';
      maxFetchTry.value = 0;
      fetchTx(txHash.value, selectedBlockchain.value?.rest || '')
      return Promise.resolve(txHash.value);
    } catch (e) {
        txStep.value = 100;
        isSendingTx.value = false;
        txError.value = String(e);
        return Promise.resolve(null)
    }
  }

  async function fetchTx(tx: string, endpoint: string) {
    maxFetchTry.value += 1;
    txStep.value += 20; 
    getTxByHash(endpoint, tx)
      .then((res) => {
          if (res.tx_response.code > 0) {
              txError.value = res.tx_response.raw_log;
          } else {
              txMsg.value = 'Tx Confirmed';
          }
          txStep.value = 100;
          isSendingTx.value = false;
      })
      .catch(() => {
          if (maxFetchTry.value < 5) {
            setTimeout(() => {fetchTx(tx, endpoint)}, waitBetweenFetch.value);
          } else {
            txStep.value = 100;
            txError.value = 'Timeout';
            isSendingTx.value = false;
          }
      });
  }

  return {
    isSendingTx,
    txError,
    txMsg,
    txHash,
    txStep,
    skipGasEstimation,
    fetchTx,
    sendTx
  }
})