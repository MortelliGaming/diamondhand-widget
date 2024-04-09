<script setup lang="ts">
import { VBtn, VList, VListItem, VListItemTitle } from 'vuetify/components';
</script>
<template>
    <v-btn>
        test
    </v-btn>
    <v-list>
        <v-list-item
        v-for="(i, index) in [{wallet: 'keplr', logo: 'what'}, {wallet: 'keplr2', logo: 'what2'}]"
        :value="index"
        :prepend-avatar="i.logo"
        :key="index"
        >
            <v-list-item-title>{{ i.wallet }}</v-list-item-title>
        </v-list-item>
        <v-list-item class="text-center">
            <v-btn color="primary">connect</v-btn>
        </v-list-item>
    </v-list>
</template>

<style scoped></style>
