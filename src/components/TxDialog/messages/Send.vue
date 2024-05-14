<script lang="ts" setup>
import { type PropType, computed, ref } from 'vue';
import {
    getStakingParam,
} from '../../../lib/utils/http';
import type { SendParams } from '../../../lib/utils/type';
import { TokenUnitConverter } from '../../../lib/utils/TokenUnitConverter';

import { useWalletStore } from '../../../lib/stores/wallet';
import { useBlockchainStore } from '../../../lib/stores/blockchain';
import { storeToRefs } from 'pinia';

import { useI18n } from 'vue-i18n';
import { messages } from '../../../lib/i18n/index';

const { t } = useI18n({
    messages
})

const props = defineProps({
    params: Object as PropType<SendParams>,
});

const { connectedWallet, accountBalances } = storeToRefs(useWalletStore())
const { selectedBlockchain, coinMetadatas } = storeToRefs(useBlockchainStore())

const amount = ref('');
const recipient = ref('');
const amountDenom = ref('')

const msgs = computed(() => {
    const convert = new TokenUnitConverter(coinMetadatas.value)
    const meta = Object.values(coinMetadatas.value).find(m => m.denom_units.map(u => u.denom).includes(amountDenom.value))
    return [
        {
            typeUrl: '/cosmos.bank.v1beta1.MsgSend',
            value: {
                fromAddress: connectedWallet.value?.cosmosAddress,
                toAddress: recipient.value,
                amount: [
                convert.displayToBase(meta?.base || '', {
                        amount: String(amount.value),
                        denom: amountDenom.value
                    })
                ],
            },
        },
    ];
});

const available = computed(() => {
    const base  = (
        accountBalances.value?.find((x) => x.denom === amountDenom.value) || {
            amount: '0',
            denom: '-',
        }
    )
    const convert = new TokenUnitConverter(coinMetadatas.value)
    return {
        base,
        display: convert.baseToUnit(base, amountDenom.value)
    };
});

const units = computed(() => {
    return accountBalances.value.map(b => {
        if(amountDenom.value == '') {
            // setAmountDenom(b.denom)
        }
        return {
            denom: b.denom,
            amount: b.amount
        }
    })
});

const isValid = computed(() => {
    let ok = true
    let error = ""
    if(recipient.value == '') {
        ok = false
        error = "Recipient is empty"
    }
    if(!(Number(amount.value) > 0)) {
        ok = false
        error = "Amount must be greater than 0"
    }
    if((Number(amount.value) > Number(available.value.display.amount))) {
        ok = false
        error = "Amount cannot be greater than balance"
    }
    return { ok, error }
})


function initial() {
    if(props.params?.receiver) {
        recipient.value = props.params.receiver
    }
    if(props.params?.amount) {
        amount.value = props.params.amount
    }
    if(props.params?.denom) {
        amountDenom.value = props.params.denom
    }
    if(amountDenom.value == '') {
        getStakingParam(selectedBlockchain.value?.rest ||'').then((x) => {
            amountDenom.value = x.params?.bond_denom;
        });
    }
}

defineExpose({msgs, isValid, initial})
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
                density="compact"
                v-model="recipient"
                :label="t('dhWidget.dhTxDialog.receiver')"
            ></v-text-field>
        </v-col>
    </v-row>
    <v-row no-gutters class="text-caption">
        <v-col cols="7">
            <v-text-field
                type="float"
                density="compact"
                v-model="amount"
                persistent-hint
                :hint="t('dhWidget.dhTxDialog.available') + ': ' + available?.display.amount + ' '+ available?.display.denom"
                :label="t('dhWidget.dhTxDialog.amount')"
            ></v-text-field>
        </v-col>
        <v-col cols="5" class="pl-2">
            <v-select
                density="compact"
                v-model="amountDenom"
                :items="units.filter(u => u.denom).map(u => u.denom)"
                :label="t('dhWidget.dhTxDialog.denom')">
            </v-select>
        </v-col>
    </v-row>
</template>