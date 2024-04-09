<script lang="ts" setup>
import { ComputedRef, PropType, computed, ref } from 'vue';
import {
    getActiveValidators,
    getInactiveValidators,
    getStakingParam,
} from '../../../lib/utils/http';
import { decimal2percent } from '../../../lib/utils/format';
import { DelegateParams } from '../../../lib/utils/type';
import { TokenUnitConverter } from '../../../lib/utils/TokenUnitConverter';

import { useWalletStore } from '../../../stores/wallet';
import { useBlockchainStore } from '../../../stores/blockchain';
import { storeToRefs } from 'pinia';


import { useI18n } from 'vue-i18n';
import { messages } from '../../../lib/i18n/index';

const { t } = useI18n({
    messages
})

const props = defineProps({
    params: Object as PropType<DelegateParams>,
});

const { connectedWallet, accountBalances } = storeToRefs(useWalletStore())
const { selectedBlockchain, coinMetadatas } = storeToRefs(useBlockchainStore())

const validator = ref('');

const activeValidators = ref([]);
const inactiveValidators = ref([]);
const stakingDenom = ref('');
const unbondingTime = ref('');
const amount = ref(0);
const amountDenom = ref('');

const msgs = computed(() => {
    const convert = new TokenUnitConverter(coinMetadatas.value);
    return [
        {
            typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
            value: {
                delegatorAddress: connectedWallet.value?.cosmosAddress,
                validatorAddress: validator.value,
                amount: convert.displayToBase(stakingDenom.value, {
                    amount: String(amount.value),
                    denom: amountDenom.value
                }),
            },
        },
    ];
});

const list: ComputedRef<
    {
        operator_address: string;
        description: { moniker: string };
        commission: { commission_rates: { rate: string } };
        status: string;
    }[]
> = computed(() => {
    return [...activeValidators.value, ...inactiveValidators.value];
});

const available = computed(() => {
    const convert = new TokenUnitConverter(coinMetadatas.value);
    const base = accountBalances.value?.find(
        (x) => x.denom === stakingDenom.value
    ) || { amount: '0', denom: stakingDenom.value, base: stakingDenom.value };
    return {
        base,
        display: convert.baseToUnit(base, amountDenom.value),
    };
});

function loadInactiveValidators() {
    getInactiveValidators(selectedBlockchain.value?.api[0] || '').then((x) => {
        inactiveValidators.value = x.validators;
    });
}

function setAmountDenom(denom: string) {
    amountDenom.value = denom   
}

const units = computed(() => {
    if (!coinMetadatas.value || !coinMetadatas.value[stakingDenom.value]) {
        setAmountDenom(stakingDenom.value)
        return [{ denom: stakingDenom.value, exponent: 0, aliases: [] }];
    }
    let list = coinMetadatas.value[stakingDenom.value].denom_units;
    list = list.sort(
        (a, b) => b.exponent - a.exponent
    );
    if (list.length > 0) setAmountDenom(list[0].denom);
    return list;
});

const isValid = computed(() => {
    let ok = true;
    let error = '';
    if (!validator.value) {
        ok = false;
        error = 'Validator is empty';
    }
    if (!(Number(amount.value) > 0)) {
        ok = false;
        error = 'Amount should be great than 0';
    }
    if (!amountDenom.value) {
        ok = false;
        error = 'Amount Denom is empty';
    }
    return { ok, error };
});

const validatorList = computed(() => {
    return list.value.map(v => ({value: v.operator_address, title: v.description.moniker + ' (' + decimal2percent(v.commission.commission_rates.rate) +'%)' + (v.status !== 'BOND_STATUS_BONDED' ? (v.status == 'BOND_STATUS_JAILED' ? ' [!! JAILED !!]' : ' [ INACTIVE ]' ) : '')}))
})

function initial() {
    activeValidators.value = [];
    if(props.params?.validator) {
        validator.value = props.params.validator;
    }
    getStakingParam(selectedBlockchain.value?.api[0] || '').then((x) => {
        stakingDenom.value = x.params.bond_denom;
        unbondingTime.value = x.params.unbonding_time;
    });
    getActiveValidators(selectedBlockchain.value?.api[0] || '').then((x) => {
        activeValidators.value = x.validators;
        if (!validator.value) {
            validator.value = x.validators.find(
                (v) => v.description.identity === '32BEA58DE3D6EDB7'
            )?.operator_address;
        }
    });
}

defineExpose({ msgs, isValid, initial });
initial()
</script>
<template>
    <v-row no-gutters>
        <v-col>
            <v-text-field
                :disabled="true"
                density="compact"
                :model-value="connectedWallet?.cosmosAddress"
                :label="t('dhWidget.dhTxDialog.delegator')"
            ></v-text-field>
        </v-col>
    </v-row>
    <v-row no-gutters class="font-caption">
        <v-col cols="7">
            <v-select
                density="compact"
                v-model="validator"
                :label="t('dhWidget.dhTxDialog.validator')"
                :items="validatorList"
                class="text-caption">
            </v-select>
        </v-col>
        <v-col cols="5" class="d-flex pb-6 d-flex justify-end">
            <div class="d-flex align-center" role="button" >
                <v-btn @click="loadInactiveValidators" size="small" color="primary">
                    {{ t('dhWidget.dhTxDialog.loadInactive') }}
                </v-btn>
            </div>
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
                :label="t('dhWidget.dhTxDialog.stakingDenom')">
            </v-select>
        </v-col>
    </v-row>
</template>
