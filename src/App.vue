<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Header -->
    <Header />
    
    <!-- Main Content -->
    <main>
      <router-view />
    </main>
    
    <!-- Shopping Cart Sidebar -->
    <ShoppingCart />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import Header from './components/layout/Header.vue'
import ShoppingCart from './components/cart/ShoppingCart.vue'

const store = useStore()

onMounted(() => {
  // Initialize wallet when app loads
  store.dispatch('wallet/initializeWallet')
})
</script>
