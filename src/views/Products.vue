<template>
  <div>
    <ProductGrid />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import ProductGrid from '../components/product/ProductGrid.vue'

const store = useStore()

onMounted(() => {
  // Initialize wallet when products page loads
  store.dispatch('wallet/initializeWallet')
})
</script> 