<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Wallet Dashboard</h1>
      <p class="text-gray-600 mt-2">Manage your balance and view transaction history</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Balance Card -->
      <div class="lg:col-span-1">
        <div class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold">Current Balance</h2>
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          
          <div class="text-4xl font-bold mb-4">
            {{ formattedBalance }}
          </div>
          
          <button
            @click="showTopUpModal = true"
            class="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200"
          >
            Top Up Wallet
          </button>
        </div>

                  <!-- Quick Stats -->
          <div class="mt-6 grid grid-cols-2 gap-4">
            <div class="bg-white rounded-lg p-4 shadow-sm">
              <div class="text-sm text-gray-600">Total Spent</div>
              <div class="text-2xl font-bold text-gray-900">{{ totalSpent }}</div>
            </div>
            <div class="bg-white rounded-lg p-4 shadow-sm">
              <div class="text-sm text-gray-600">Transactions</div>
              <div class="text-2xl font-bold text-gray-900">{{ transactionCount }}</div>
            </div>
          </div>

          <!-- Top-up History -->
          <div class="mt-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Recent Top-ups</h3>
            <div class="bg-white rounded-lg shadow-sm">
              <div v-if="topupHistory.length === 0" class="p-4 text-center text-gray-500">
                No top-up history yet
              </div>
              <div v-else class="divide-y divide-gray-200">
                <div v-for="topup in topupHistory.slice(0, 3)" :key="topup.id" class="p-4">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <div>
                        <div class="font-medium text-gray-900">{{ topup.description }}</div>
                        <div class="text-sm text-gray-500">{{ formatDate(topup.timestamp) }}</div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="font-semibold text-green-600">+${{ topup.amount.toFixed(2) }}</div>
                      <div class="text-xs text-gray-500">{{ topup.status }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>

      <!-- Transaction History -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-xl shadow-sm">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          </div>
          
          <div class="divide-y divide-gray-200">
            <div v-if="isLoading" class="p-6 text-center">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p class="text-gray-600 mt-2">Loading transactions...</p>
            </div>
            
            <div v-else-if="recentTransactions.length === 0" class="p-6 text-center">
              <div class="text-gray-400 text-6xl mb-4">📊</div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">No transactions yet</h3>
              <p class="text-gray-600">Start shopping to see your transaction history</p>
            </div>
            
            <div v-else v-for="transaction in paginatedTransactions" :key="transaction.id" class="px-6 py-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <!-- Transaction Icon -->
                  <div class="flex-shrink-0">
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
                  </div>
                  
                  <!-- Transaction Details -->
                  <div>
                    <div class="font-medium text-gray-900">{{ transaction.description }}</div>
                    <div class="text-sm text-gray-500">{{ formatDate(transaction.timestamp) }}</div>
                  </div>
                </div>
                
                <!-- Amount -->
                <div class="text-right">
                  <div 
                    class="font-semibold"
                    :class="transaction.type === 'topup' ? 'text-green-600' : 'text-red-600'"
                  >
                    {{ transaction.type === 'topup' ? '+' : '' }}${{ Math.abs(transaction.amount).toFixed(2) }}
                  </div>
                  <div class="text-xs text-gray-500">{{ transaction.status }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Pagination -->
          <div v-if="allTransactions.length > 0" class="px-6 py-4 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-500">
                Showing {{ startIndex + 1 }}-{{ endIndex }} of {{ allTransactions.length }} transactions
              </div>
              <div class="flex items-center space-x-2">
                <button
                  @click="previousPage"
                  :disabled="currentPage === 1"
                  class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span class="text-sm text-gray-600">
                  Page {{ currentPage }} of {{ totalPages }}
                </span>
                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Up Modal -->
    <TopUpModal
      v-if="showTopUpModal"
      @close="showTopUpModal = false"
      @top-up="handleTopUp"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import TopUpModal from './TopUpModal.vue'

const store = useStore()
const showTopUpModal = ref(false)
const currentPage = ref(1)
const itemsPerPage = 5

// Computed properties
const formattedBalance = computed(() => store.getters['wallet/formattedBalance'])
const recentTransactions = computed(() => store.getters['wallet/recentTransactions'])
const isLoading = computed(() => store.getters['wallet/isLoading'])
const totalSpent = computed(() => {
  const purchases = store.getters['wallet/transactions'].filter(t => t.type === 'purchase')
  const total = purchases.reduce((sum, t) => sum + Math.abs(t.amount), 0)
  return `$${total.toFixed(2)}`
})
const transactionCount = computed(() => store.getters['wallet/transactions'].length)
const topupHistory = computed(() => {
  return store.getters['wallet/transactions'].filter(t => t.type === 'topup')
})

// Pagination computed properties
const allTransactions = computed(() => store.getters['wallet/transactions'])
const totalPages = computed(() => Math.ceil(allTransactions.value.length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, allTransactions.value.length))
const paginatedTransactions = computed(() => {
  return allTransactions.value.slice(startIndex.value, endIndex.value)
})

// Methods
const handleTopUp = (amount) => {
  store.dispatch('wallet/topUp', amount)
  showTopUpModal.value = false
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Lifecycle
// Reset to first page when transactions change
watch(allTransactions, () => {
  currentPage.value = 1
})
</script> 