import { defineStore } from 'pinia';

import { type Ref, ref, watch, computed } from 'vue';
import { type BlockchainConfigSimple, type CoinMetadata, type GovProposalMetadata, GovProposalStatus } from '../utils/type';
import { getCoinMetadata, getGovProposals } from '../utils/http';

export const useBlockchainStore = defineStore('dh-blockchain', () => {
  const selectedBlockchain: Ref<BlockchainConfigSimple|null> = ref(null)
  const coinMetadatas: Ref<{[denom: string]: CoinMetadata}> = ref({})

  const endpoint = computed(() => {
    return selectedBlockchain.value?.api[0] || ''
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
    selectedBlockchain.value?.assets.map(a => {
      try {
        getCoinMetadata(endpoint.value, a.base).then(metadata => {
          if(metadata.metadata) {
            coinMetadatas.value[a.base] = metadata.metadata
          }
        })
      } catch(err: any) {
        // 
      }
      // manual add from config
      if(!coinMetadatas.value[a.base]) {
        coinMetadatas.value[a.base] = {
          description: a.symbol,
          base: a.base,
          display: a.symbol,
          name: a.symbol,
          symbol: a.symbol,
          denom_units: [{
            denom: a.base,
            exponent: 1,
            aliases: []
          },{
            denom: a.symbol,
            exponent: parseInt(a.exponent),
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