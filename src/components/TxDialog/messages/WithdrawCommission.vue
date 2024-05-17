<script lang="ts" setup>
import { Ref, computed, inject, ref, type ComputedRef } from 'vue';
import { getActiveValidators, getDelegateRewards } from '../../../lib/utils/http';

import { useWalletStore } from '../../../lib/stores/wallet';
import { useBlockchainStore } from '../../../lib/stores/blockchain';
import { storeToRefs } from 'pinia';

import { useI18n } from 'vue-i18n';
import { messages } from '../../../lib/i18n/index';
import { decimal2percent } from '../../../lib/utils/format';
import { fromBech32, toBech32 } from '@cosmjs/encoding';
import { WalletName } from '../../../lib/wallet/Wallet';

const { t } = useI18n({
    messages
})

const { connectedWallet } = storeToRefs(useWalletStore())
const { selectedBlockchain } = storeToRefs(useBlockchainStore())

const props = defineProps({
    params: Object as any
})
const walletName: Ref<WalletName> = inject('walletName') || ref(WalletName.Keplr)

const activeValidators = ref([])
const inactiveValidators = ref([])

const list: ComputedRef<{
    operator_address: string,
    consensus_pubkey: any,
    description: {moniker: string}
    commission: { commission_rates: {rate: string}}
    status: string
}[]> = computed(() => {
    return [...activeValidators.value, ...inactiveValidators.value]
})

const validatorList = computed(() => {
    return list.value
        .map(v => ({
                value: v.operator_address, 
                title: v.description.moniker + ' (' + decimal2percent(v.commission.commission_rates.rate) +'%)' + (v.status !== 'BOND_STATUS_BONDED' ? (v.status == 'BOND_STATUS_JAILED' ? ' [!! JAILED !!]' : ' [ INACTIVE ]' ) : '')
            }))
})

const validator = computed(() => {
  return validatorList.value.find(v => v.value == toBech32(selectedBlockchain.value?.bech32Config.bech32PrefixValAddr || '', fromBech32(connectedWallet.value[walletName.value]?.cosmosAddress || '').data))
})
// const params = computed(() => JSON.parse(props.params || "{}"))
const rewards = ref([] as { reward: { amount: string, denom: string }, validator_address: string }[])

const msgs = computed(() => {
  const delegations = rewards.value?.map(x => {
    return {
      typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
      value: {
        delegatorAddress: connectedWallet.value[walletName.value]?.cosmosAddress,
        validatorAddress: x.validator_address,
      },
    }
  })
  return [
    ...delegations,
    {
      typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
      value: {
        validatorAddress: validator.value?.value,
      },
    },
  ]
})

const isValid = computed(() => {
  let ok = true
  let error = ""
  if (!connectedWallet.value[walletName.value]?.cosmosAddress) {
    ok = false
    error = "Sender is empty"
  }
  else if (!validator.value?.value) {
    ok = false
    error = t('dhWidget.dhTxDialog.walletIsNoOperator')
  }
  else if (!rewards.value || rewards.value?.length < 0) {
    ok = false
    error = "No delegation found"
  }
  else if (rewards.value?.findIndex(x => x.validator_address === validator.value?.value) === -1) {
    ok = false
    error = "You are not the validator!"
  }
  return { ok, error }
})


async function initial() {
  if(props.params) {
    //
  }
  getDelegateRewards(selectedBlockchain.value?.rest || '', connectedWallet.value[walletName.value]?.cosmosAddress || '').then(x => {
    rewards.value = x.rewards
  })
  await getActiveValidators(selectedBlockchain.value?.rest || '').then(x => {
      activeValidators.value = x.validators
  })
}

defineExpose({ msgs, isValid, initial })
</script>
<template>
  <v-row no-gutters class="font-caption">
      <v-col>
          <v-text-field
              :disabled="true"
              density="compact"
              :model-value="connectedWallet?.cosmosAddress"
              :label="t('dhWidget.dhTxDialog.sender')"
          ></v-text-field>
      </v-col>
  </v-row>
  <v-row no-gutters class="font-caption">
      <v-col>
          <v-text-field
              :disabled="true"
              density="compact"
              :model-value="validator?.title"
              :label="t('dhWidget.dhTxDialog.validator')"
          ></v-text-field>
      </v-col>
  </v-row>
</template>