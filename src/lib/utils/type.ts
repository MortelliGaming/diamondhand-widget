import type { EncodeObject } from '@cosmjs/proto-signing';
import type { SignerData, StdFee } from '@cosmjs/stargate';

export type Coin = {
  amount: string,
  denom: string,
}
export type Configuration = {

}

export type CoinMetadata = {
  description: string,
  denom_units: {
    denom: string,
    exponent: number,
    aliases: string[]
  }[],
  base: string,
  display: string,
  name: string,
  symbol: string
}

export type TxResponse = {
  height: string,
  txhash: string,
  codespace: string,
  code: 0,
  data: string,
  raw_log: string,
}

export type Transaction = {  
  chainId: string; 
  signerAddress: string; 
  messages: readonly EncodeObject[]; 
  fee: StdFee; 
  memo: string; 
  signerData: SignerData 
}

export enum BroadcastMode {
  SYNC = 'BROADCAST_MODE_SYNC', 
  BLOCK = 'BROADCAST_MODE_BLOCK', 
  ASYNC = 'BROADCAST_MODE_ASYNC',
}

export type TxDialogParams = (FeeParams|undefined) & (DelegateParams|DepositParams|RedelegateParams|SendParams|UnbondParams|VoteParams);

export type FeeParams = {
  fees: {
    amount: string,
    denom: string,
    gasLimit: string,
  }
}

export type SendParams = {
  receiver: string,
  amount: string
  denom: string
}


export type VoteParams = {
  proposalId: string,
  option: string
}

export type DelegateParams = {
  validator: string,
  amount: string
  denom: string
}
export type UnbondParams = {
  validator: string,
  amount: string
  denom: string
}
export type RedelegateParams = {
  sourceValidator: string,
  destinationValidator: string,
  amount: string
  denom: string
}

export type DepositParams = {
  proposalId: string,
  amount: string
  denom: string
}

export enum GovProposalStatus {
  PROPOSAL_STATUS_UNSPECIFIED = 0,
  PROPOSAL_STATUS_DEPOSIT_PERIOD = 1,
  PROPOSAL_STATUS_VOTING_PERIOD = 2,
  PROPOSAL_STATUS_PASSED = 3,
  PROPOSAL_STATUS_REJECTED = 4,
  PROPOSAL_STATUS_FAILED = 5
}

export type GovProposalContent = {
  '@type': string;
  title?: string;
  description?: string;
  current?: any[];
  changes?: any[];
  params?: any[];
  plan?: {
    height?: string | number;
    time?: string | number;
  };
}

export type GovProposalFinalTallyResult = {
  yes: string
  abstain: string
  no: string
  no_with_veto: string
}
export type GovProposalTotalDeposit = {
  denom: string
  amount: string
}

export type GovProposalMetadata = {
  proposal_id: string
  content: GovProposalContent
  status: string
  final_tally_result: GovProposalFinalTallyResult
  submit_time: string
  deposit_end_time: string
  total_deposit: GovProposalTotalDeposit[]
  voting_start_time: string
  voting_end_time: string
}


export type BlockchainConfigSimple = {
  chain_name: string
  coingecko: string
  chainId: string
  api: string[]
  rpc: string[]
  jsonRpc: string[]
  snapshot_provider: string
  sdk_version: string
  coin_type: string
  min_tx_fee: string
  addr_prefix: string
  logo: string
  theme_color: string
  keplr_features: string[]
  has_evm_features: boolean
  assets: Asset[]
}

export type Asset = {
  base: string
  symbol: string
  exponent: string
  coingecko_id: string
  logo: string
  isStakingAsset: boolean
  isFeeAsset: boolean
}

export type DhDialogMessageType = 'delegate'|'deposit'|'redelegate'|'send'|'unbond'|'vote'|'withdraw'|'withdraw_commission'