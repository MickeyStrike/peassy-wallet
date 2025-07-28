<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Welcome to <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Peassy Wallet</span>
      </h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Your modern digital wallet for seamless shopping and secure transactions
      </p>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <div class="text-sm font-medium text-gray-500">Current Balance</div>
            <div class="text-2xl font-bold text-gray-900">{{ walletBalance }}</div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <div class="text-sm font-medium text-gray-500">Cart Items</div>
            <div class="text-2xl font-bold text-gray-900">{{ cartItemCount }}</div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <div class="text-sm font-medium text-gray-500">Total Transactions</div>
            <div class="text-2xl font-bold text-gray-900">{{ transactionCount }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-8 text-white">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-2xl font-bold">Shop Products</h3>
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <p class="text-blue-100 mb-6">
          Browse our extensive catalog of products from the Fake Store API. Find amazing deals and add items to your cart.
        </p>
        <router-link
          to="/products"
          class="inline-flex items-center px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg font-medium transition-all duration-200"
        >
          Start Shopping
          <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>

      <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-8 text-white">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-2xl font-bold">Manage Wallet</h3>
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
        <p class="text-purple-100 mb-6">
          Top up your wallet, view transaction history, and manage your balance securely.
        </p>
        <router-link
          to="/wallet"
          class="inline-flex items-center px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg font-medium transition-all duration-200"
        >
          View Wallet
          <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>
    </div>

    <!-- Recent Transactions -->
    <div class="mt-12">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Recent Transactions</h2>
        <router-link
          to="/wallet"
          class="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          View All
        </router-link>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm">
        <div v-if="recentTransactions.length === 0" class="p-8 text-center">
          <div class="text-gray-400 text-4xl mb-4">📊</div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">No transactions yet</h3>
          <p class="text-gray-600">Start shopping to see your transaction history</p>
        </div>
        
        <div v-else class="divide-y divide-gray-200">
          <div v-for="transaction in recentTransactions.slice(0, 3)" :key="transaction.id" class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div 
                  class="w-10 h-10 rounded-full flex items-center justify-center"
                  :class="transaction.type === 'topup' ? 'bg-green-100' : 'bg-red-100'"
                >
                  <svg 
                    class="w-5 h-5"
                    :class="transaction.type === 'topup' ? 'text-green-600' : 'text-red-600'"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      v-if="transaction.type === 'topup'"
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                    <path 
                      v-else
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <div>
                  <div class="font-medium text-gray-900">{{ transaction.description }}</div>
                  <div class="text-sm text-gray-500">{{ formatDate(transaction.timestamp) }}</div>
                </div>
              </div>
              <div 
                class="font-semibold"
                :class="transaction.type === 'topup' ? 'text-green-600' : 'text-red-600'"
              >
                {{ transaction.type === 'topup' ? '+' : '' }}${{ Math.abs(transaction.amount).toFixed(2) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

// Computed properties
const walletBalance = computed(() => store.getters['wallet/formattedBalance'])
const cartItemCount = computed(() => store.getters['cart/cartItemCount'])
const transactionCount = computed(() => store.getters['wallet/transactions'].length)
const recentTransactions = computed(() => store.getters['wallet/recentTransactions'])

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  store.dispatch('wallet/initializeWallet')
})
</script> 