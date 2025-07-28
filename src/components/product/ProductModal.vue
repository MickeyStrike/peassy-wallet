<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div 
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        @click="closeModal"
      ></div>

      <!-- Modal panel -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <!-- Close button -->
          <div class="absolute top-4 right-4">
            <button
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="flex flex-col md:flex-row gap-6">
            <!-- Product Image -->
            <div class="md:w-1/2">
              <img 
                :src="product.image" 
                :alt="product.title"
                class="w-full h-64 object-contain rounded-lg"
              />
            </div>

            <!-- Product Details -->
            <div class="md:w-1/2">
              <!-- Category -->
              <div class="mb-3">
                <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                  {{ product.category }}
                </span>
              </div>

              <!-- Title -->
              <h2 class="text-2xl font-bold text-gray-900 mb-3">
                {{ product.title }}
              </h2>

              <!-- Rating -->
              <div class="flex items-center mb-4">
                <div class="flex items-center">
                  <svg 
                    v-for="star in 5" 
                    :key="star"
                    class="w-5 h-5"
                    :class="star <= Math.round(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'"
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span class="text-sm text-gray-600 ml-2">{{ product.rating.rate }} ({{ product.rating.count }} reviews)</span>
              </div>

              <!-- Description -->
              <p class="text-gray-600 mb-6 leading-relaxed">
                {{ product.description }}
              </p>

              <!-- Price -->
              <div class="text-3xl font-bold text-gray-900 mb-6">
                ${{ product.price.toFixed(2) }}
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-3">
                <button
                  @click="addToCart"
                  class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  @click="buyNow"
                  class="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Buy Now
                </button>
              </div>

              <!-- Wallet Balance Info -->
              <div class="mt-4 p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Your Balance:</span>
                  <span class="font-semibold text-gray-900">{{ walletBalance }}</span>
                </div>
                <div v-if="insufficientBalance" class="mt-2 text-sm text-red-600">
                  Insufficient balance for this purchase
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Toast Notification -->
  <ToastNotification
    v-if="showToast"
    :product="product"
    @close="closeToast"
  />
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import ToastNotification from '../ui/ToastNotification.vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])
const showToast = ref(false)

const store = useStore()

const walletBalance = computed(() => store.getters['wallet/formattedBalance'])
const insufficientBalance = computed(() => {
  return store.getters['wallet/balance'] < props.product.price
})

const closeModal = () => {
  emit('close')
}

const addToCart = () => {
  store.dispatch('cart/addToCart', props.product)
  closeModal()
  
  // Show toast notification
  showToast.value = true
}

const closeToast = () => {
  showToast.value = false
}

const buyNow = async () => {
  if (insufficientBalance.value) {
    alert('Insufficient balance. Please top up your wallet.')
    return
  }

  try {
    await store.dispatch('wallet/purchase', {
      amount: props.product.price,
      description: `Purchase: ${props.product.title}`,
      productId: props.product.id
    })
    
    // Clear cart after successful purchase
    store.dispatch('cart/clearCart')
    closeModal()
    
    // Show success message
    alert('Purchase successful!')
  } catch (error) {
    alert(error)
  }
}
</script> 