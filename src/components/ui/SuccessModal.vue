<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div 
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        @click="closeModal"
      ></div>

      <!-- Modal panel -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <!-- Success Icon -->
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <!-- Content -->
          <div class="text-center">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-2">
              Checkout Successful! 🎉
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500 mb-4">
                Your order has been processed successfully. Thank you for your purchase!
              </p>
              
              <!-- Order Summary -->
              <div class="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 class="font-medium text-gray-900 mb-2">Order Summary</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Total Items:</span>
                    <span class="font-medium">{{ orderSummary.itemCount }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Total Amount:</span>
                    <span class="font-medium text-green-600">{{ orderSummary.total }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">New Balance:</span>
                    <span class="font-medium">{{ orderSummary.newBalance }}</span>
                  </div>
                </div>
              </div>

              <!-- Purchased Items -->
              <div class="text-left">
                <h4 class="font-medium text-gray-900 mb-2">Purchased Items:</h4>
                <div class="space-y-2 max-h-32 overflow-y-auto">
                  <div 
                    v-for="item in orderSummary.items" 
                    :key="item.id"
                    class="flex items-center space-x-3 text-sm"
                  >
                    <img 
                      :src="item.image" 
                      :alt="item.title"
                      class="w-8 h-8 object-contain rounded"
                    />
                    <div class="flex-1 min-w-0">
                      <p class="text-gray-900 truncate">{{ item.title }}</p>
                      <p class="text-gray-500">Qty: {{ item.quantity }} × ${{ item.price.toFixed(2) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            @click="closeModal"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
          >
            Continue Shopping
          </button>
          <button
            @click="viewWallet"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
          >
            View Wallet
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  orderSummary: {
    type: Object,
    default: () => ({
      itemCount: 0,
      total: '$0.00',
      newBalance: '$0.00',
      items: []
    })
  }
})

const emit = defineEmits(['close'])
const router = useRouter()

const closeModal = () => {
  emit('close')
}

const viewWallet = () => {
  closeModal()
  router.push('/wallet')
}
</script> 