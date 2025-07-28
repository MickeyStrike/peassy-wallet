<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Peassy Wallet
            </h1>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-8">
          <router-link 
            to="/" 
            class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-blue-600': $route.path === '/' }"
          >
            Home
          </router-link>
          <router-link 
            to="/products" 
            class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-blue-600': $route.path === '/products' }"
          >
            Products
          </router-link>
          <router-link 
            to="/wallet" 
            class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-blue-600': $route.path === '/wallet' }"
          >
            Wallet
          </router-link>
        </nav>

        <!-- Right side -->
        <div class="flex items-center space-x-4">
          <!-- Wallet Balance -->
          <div class="hidden md:block">
            <div class="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg">
              <span class="text-sm font-medium">{{ walletBalance }}</span>
            </div>
          </div>

          <!-- Cart Button -->
          <button
            @click="toggleCart"
            class="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            
            <!-- Cart Badge -->
            <span 
              v-if="cartItemCount > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ cartItemCount }}
            </span>
          </button>

          <!-- Mobile menu button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
        <router-link 
          to="/" 
          class="block px-3 py-2 text-gray-700 hover:text-blue-600 rounded-md text-base font-medium"
          @click="mobileMenuOpen = false"
        >
          Home
        </router-link>
        <router-link 
          to="/products" 
          class="block px-3 py-2 text-gray-700 hover:text-blue-600 rounded-md text-base font-medium"
          @click="mobileMenuOpen = false"
        >
          Products
        </router-link>
        <router-link 
          to="/wallet" 
          class="block px-3 py-2 text-gray-700 hover:text-blue-600 rounded-md text-base font-medium"
          @click="mobileMenuOpen = false"
        >
          Wallet
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const mobileMenuOpen = ref(false)

const walletBalance = computed(() => store.getters['wallet/formattedBalance'])
const cartItemCount = computed(() => store.getters['cart/cartItemCount'])

const toggleCart = () => {
  store.dispatch('cart/toggleCart')
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script> 