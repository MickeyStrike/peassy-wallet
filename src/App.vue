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
import Header from './components/layout/Header.vue'
import ShoppingCart from './components/cart/ShoppingCart.vue'
</script>
