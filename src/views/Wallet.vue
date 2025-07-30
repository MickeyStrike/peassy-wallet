<template>
  <div>
    <WalletDashboard />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import WalletDashboard from '../components/wallet/WalletDashboard.vue'

const store = useStore()

onMounted(() => {
  // Initialize wallet when wallet page loads
  store.dispatch('wallet/initializeWallet')
})
</script> 