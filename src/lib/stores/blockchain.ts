import { defineStore } from 'pinia';

import { type Ref, ref, watch, computed } from 'vue';
import { type CoinMetadata, type GovProposalMetadata, GovProposalStatus } from '../utils/type';
import { getCoinMetadata, getGovProposals } from '../utils/http';
import { ChainInfo } from '@keplr-wallet/types';

export const useBlockchainStore = defineStore('dh-blockchain', () => {
  const selectedBlockchain: Ref<ChainInfo|null> = ref(null)
  const coinMetadatas: Ref<{[denom: string]: CoinMetadata}> = ref({})

  const endpoint = computed(() => {
    return selectedBlockchain.value?.rest || ''
  })

  const depositProposals: Ref<GovProposalMetadata[]> = ref([])
  const votingProposals: Ref<GovProposalMetadata[]> = ref([])

  function loadBlockchainData() {
    loadCoinMetadata();
    loadDepositingProposals();
    loadVotingProposals();
  }
  function loadDepositingProposals() {
    getGovProposals(endpoint.value, GovProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD).then(proposalsResult => {
      depositProposals.value = proposalsResult.proposals;
    })
  }
  function loadVotingProposals() {
    getGovProposals(endpoint.value, GovProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD).then(proposalsResult => {
      votingProposals.value = proposalsResult.proposals;
    })
  }
  function loadCoinMetadata() {
    selectedBlockchain.value?.currencies.map(a => {
      try {
        getCoinMetadata(endpoint.value, a.coinMinimalDenom).then(metadata => {
          if(metadata.metadata) {
            coinMetadatas.value[a.coinMinimalDenom] = metadata.metadata
          }
        })
      } catch(err: any) {
        // 
      }
      // manual add from config
      if(!coinMetadatas.value[a.coinMinimalDenom]) {
        coinMetadatas.value[a.coinMinimalDenom] = {
          description: a.coinDenom,
          base: a.coinMinimalDenom,
          display: a.coinDenom,
          name: a.coinDenom,
          symbol: a.coinDenom,
          denom_units: [{
            denom: a.coinMinimalDenom,
            exponent: 0,
            aliases: []
          },{
            denom: a.coinDenom,
            exponent: parseInt(a.coinDecimals.toString()),
            aliases: []
          }]
        }
      }
    })
  }

  watch(selectedBlockchain, () => {
    loadBlockchainData();
  })

  return { 
    selectedBlockchain,
    coinMetadatas,
    depositProposals,
    votingProposals,
  }
})