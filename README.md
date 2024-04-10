# The Diamondhand Wallet Widget Vue Plugin

Use this Vue Plugin to access Blockchain easily on your DApp or Website.

## 💿 Prerequsited

- Your Project must use the Vue-18n Plugin

[VueI18n](https://vue-i18n.intlify.dev/guide/installation.html)

```
import { createI18n } from 'vue-i18n'
import { messages } from './messages'

const i18n = createI18n({
    locale: navigator.language.substring(0,2), // set locale
    fallbackLocale: 'en', // set fallback locale
    legacy: false,
    messages,
    // If you need to specify other options, you can set other options
    // ...
})

app.use(i18n)
```
- Your App must have Vuetify installed

[Vuetify](https://vuetifyjs.com/)

```
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify, components, directives } from 'vuetify/dist/vuetify.js'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
  },
})
app.use(vuetify)

```

## 💿 Install

1. Clone the Repository outside of your project

``` git clone https://github.com/MortelliGaming/diamondhand-widget ```

2. Install The Cloned Repository as Package in your Project

``` npm install <PathToClonedRepository> --save ```

3. Add The Plugin To Your Project

```

import { DiamondhandWidgetPlugin } from 'dh-widget'

// do this after i18n and vuetify
app.use(DiamondhandWidgetPlugin)

```

## 💿 Usage

### Connect Wallet Icon

- Show The Wallet Connect Icon

```

<dh-connect-wallet
    @connect="handleWalletConnected"
    :blockchain-config="bConfig"
/>

```
- Blockchain Config (bConfig) Object:

```

{
  "chain_name": "crossfi testnet",
  "coingecko": "crossfi",
  "chainId": "crossfi-evm-testnet-1",
  "api": ["https://your-rest-api.net"],
  "rpc": ["https://your-rpc.net"],
  "jsonRpc": [],
  "snapshot_provider": "",
  "sdk_version": "0.46.1",
  "coin_type": "60",
  "min_tx_fee": "800",
  "addr_prefix": "mx",
  "logo": "<someLogo>",
  "theme_color": "#812cd6",
  "keplr_features": ["eth-address-gen", "eth-key-sign", "ibc-transfer", "ibc-go"],
  "has_evm_features": true,
  "assets": [{
      "base": "xfi",
      "symbol": "XFI",
      "exponent": "18",
      "coingecko_id": "xfi", 
      "logo": "/logos/xfi.jpeg",
      "isFeeAsset": true,
      "isStakingAsset": false,
  },{
      "base": "mpx",
      "symbol": "MPX",
      "exponent": "18",
      "coingecko_id": "xfi_mpx", 
      "logo": "/logos/xfi.jpeg",
      "isFeeAsset": true,
      "isStakingAsset": true,
  }]
}

```

### Transaction Dialog

- Add To Project (AnyWhere)

```
<script setup lang="ts">
import type { TxDialogParams } from 'dh-widget/src/lib/utils/type';
import DhTxDialog from 'dh-widget'

const dhTxDialog = ref<InstanceType<typeof DhTxDialog>>();

</script>

<template>
    <dh-tx-dialog
        ref="dhTxDialog"
        :blockchain-config="bConfig"
        :type="'deposit'"/>
</template>

```

## ✨ Dialog Types

### Delegate

- Delegate Tokens

```
dhTxDialog.value.show('delegate', {
    fees: {
      amount: '2000',
      denom: 'mpx',
      gasLimit: '125000000000000000',
    },
    validator: 'mxvaloper1dr8v4vkuex4umggv7mxlxh5s6h38pkrpwvctjx',
    amount: '100',
    denom: 'MPX',
  })
```

### Deposit

- Deposit Tokens to a governance Proposal

```

dhTxDialog.value.show('deposit', {
    fees: {
      amount: '2000',
      denom: 'mpx',
      gasLimit: '125000000000000000',
    },
    proposalId: '2',
    amount: '100',
    denom: 'MPX'
  })

```

### Redelegate

- Redelegate from one Validator to another

```

dhTxDialog.value.show('redelegate', {
    fees: {
            amount: '2000',
            denom: 'mpx',
            gasLimit: '125000000000000000',
        },
        amount: '100',
        denom: 'MPX',
        sourceValidator: 'mxvaloper1dr8v4vkuex4umggv7mxlxh5s6h38pkrpwvctjx',
        destinationValidator: 'mxvaloper1dr8v4vkuex4umggv7mxlxh5s6h38pkrpwvctjx',
})

```

### Send

- Send Tokens

```

dhTxDialog.value.show('send', {
    fees: {
        amount: '2000',
        denom: 'mpx',
        gasLimit: '125000000000000000',
    },
    receiver: 'mx1yfm6yzyu9kgv6dptrmfkwrksaucrp6hglfawlw',
    amount: '100',
    denom: 'MPX'
})

```

### Unbond

- Unbond from a Validator

```

dhTxDialog.value.show('unbond', {
    fees: {
        amount: '2000',
        denom: 'mpx',
        gasLimit: '125000000000000000',
    },
    validator: 'mxvaloper1dr8v4vkuex4umggv7mxlxh5s6h38pkrpwvctjx',
    amount: '100',
    denom: 'MPX'
})

```

### Vote

- vote for a proposal

```

dhTxDialog.value.show('vote', {
    fees: {
        amount: '2000',
        denom: 'mpx',
        gasLimit: '125000000000000000'
    },
    proposalId: '2',
    option: '1'
})

```

### Withdraw Rewards

- Withdraw Staking Rewards from all Delegations

```

dhTxDialog.value.show('withdraw', {
    fees: {
        amount: '2000',
        denom: 'mpx',
        gasLimit: '125000000000000000'
    },
})

```

### Withdraw Comission

- This Message does not work correctly at the moment

```

dhTxDialog.value.show('withdraw_commission', {
    fees: {
        amount: '2000',
        denom: 'mpx',
        gasLimit: '125000000000000000'
    },
})

```

### Development

 - start and run the project like a vue project

 ```

 npm install
 npm run dev

 ```

### Contribution

 - Feel free To Create A Pull Request

### ❗️ Powered By

- 📄 [Vuetify](https://vuetifyjs.com/)
- 🏬 [Vue3](https://vuejs.org/)
- 🧩 [Ping.Pub](https://ping.pub)

### 🛠️ Contact

- [diamondhand](mailto:info@diamondhand.capital)