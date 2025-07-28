<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div 
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        @click="closeModal"
      ></div>

      <!-- Modal panel -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Top Up Wallet</h3>
            <button
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Amount Input -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <div class="relative">
              <span class="absolute left-3 top-3 text-gray-500">$</span>
              <input
                v-model="amount"
                type="number"
                min="1"
                step="0.01"
                placeholder="0.00"
                class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @input="validateAmount"
              />
            </div>
            <div v-if="amountError" class="text-red-600 text-sm mt-1">{{ amountError }}</div>
          </div>

          <!-- Quick Amount Buttons -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Quick Amount</label>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="quickAmount in quickAmounts"
                :key="quickAmount"
                @click="setAmount(quickAmount)"
                class="py-2 px-3 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                :class="{ 'bg-blue-50 border-blue-500 text-blue-700': amount == quickAmount }"
              >
                ${{ quickAmount }}
              </button>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <div class="space-y-2">
              <label 
                v-for="method in paymentMethods" 
                :key="method.id"
                class="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                :class="{ 'border-blue-500 bg-blue-50': selectedPaymentMethod === method.id }"
              >
                <input
                  type="radio"
                  :value="method.id"
                  v-model="selectedPaymentMethod"
                  class="mr-3"
                />
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-gray-200 rounded flex items-center justify-center mr-3">
                    {{ method.icon }}
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">{{ method.name }}</div>
                    <div class="text-sm text-gray-500">{{ method.description }}</div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-3">
            <button
              @click="closeModal"
              class="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="handleTopUp"
              :disabled="!isValid || isLoading"
              class="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="isLoading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
              <span v-else>Top Up ${{ parseFloat(amount || 0).toFixed(2) }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['close', 'top-up'])

const amount = ref('')
const amountError = ref('')
const selectedPaymentMethod = ref('card')
const isLoading = ref(false)

const quickAmounts = [10, 25, 50, 100, 200, 500]

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, American Express',
    icon: '💳'
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    description: 'Direct bank transfer',
    icon: '🏦'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'PayPal account',
    icon: '📧'
  }
]

const isValid = computed(() => {
  return amount.value && parseFloat(amount.value) > 0 && !amountError.value
})

const validateAmount = () => {
  const numAmount = parseFloat(amount.value)
  if (!amount.value) {
    amountError.value = ''
  } else if (isNaN(numAmount) || numAmount <= 0) {
    amountError.value = 'Please enter a valid amount greater than $0'
  } else if (numAmount > 10000) {
    amountError.value = 'Maximum top-up amount is $10,000'
  } else {
    amountError.value = ''
  }
}

const setAmount = (value) => {
  amount.value = value.toString()
  validateAmount()
}

const closeModal = () => {
  emit('close')
}

const handleTopUp = async () => {
  if (!isValid.value) return

  isLoading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    emit('top-up', parseFloat(amount.value))
  } catch (error) {
    console.error('Top-up failed:', error)
  } finally {
    isLoading.value = false
  }
}
</script> 