<template>
  <div 
    v-if="isCartOpen"
    class="fixed inset-0 z-50 overflow-hidden"
  >
    <!-- Background overlay -->
    <div 
      class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      @click="closeCart"
    ></div>

    <!-- Cart sidebar -->
    <div class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
      <div class="w-screen max-w-md">
        <div class="h-full flex flex-col bg-white shadow-xl">
          <!-- Header -->
          <div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
            <div class="flex items-start justify-between">
              <h2 class="text-lg font-medium text-gray-900">Shopping Cart</h2>
              <button
                @click="closeCart"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Cart Items -->
            <div class="mt-8">
              <div v-if="cartItems.length === 0" class="text-center py-12">
                <div class="text-gray-400 text-6xl mb-4">🛒</div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                <p class="text-gray-600">Start shopping to add items to your cart</p>
              </div>

              <div v-else class="flow-root">
                <ul class="-my-6 divide-y divide-gray-200">
                  <li v-for="item in cartItems" :key="item.id" class="py-6 flex">
                    <div class="flex-shrink-0 w-24 h-24">
                      <img
                        :src="item.image"
                        :alt="item.title"
                        class="w-full h-full object-contain rounded-md"
                      />
                    </div>

                    <div class="ml-4 flex-1 flex flex-col">
                      <div>
                        <div class="flex justify-between text-base font-medium text-gray-900">
                          <h3 class="line-clamp-2">{{ item.title }}</h3>
                        </div>
                        <p class="mt-1 text-sm text-gray-500">{{ item.category }}</p>
                      </div>
                      <div class="flex-1 flex items-end justify-between text-sm">
                        <p class="text-gray-900 font-medium">${{ item.price.toFixed(2) }}</p>
                        
                        <div class="flex items-center space-x-2">
                          <button
                            @click="updateQuantity(item.id, item.quantity - 1)"
                            class="text-gray-500 hover:text-gray-700"
                          >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                            </svg>
                          </button>
                          
                          <span class="text-gray-900 font-medium">{{ item.quantity }}</span>
                          
                          <button
                            @click="updateQuantity(item.id, item.quantity + 1)"
                            class="text-gray-500 hover:text-gray-700"
                          >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                          
                          <button
                            @click="removeFromCart(item.id)"
                            class="text-red-500 hover:text-red-700 ml-2"
                          >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div v-if="cartItems.length > 0" class="border-t border-gray-200 py-6 px-4 sm:px-6">
            <div class="flex justify-between text-base font-medium text-gray-900 mb-4">
              <p>Subtotal</p>
              <p>{{ formattedCartTotal }}</p>
            </div>
            
            <!-- Wallet Balance Info -->
            <div class="mb-4 p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Your Balance:</span>
                <span class="font-semibold text-gray-900">{{ walletBalance }}</span>
              </div>
              <div v-if="insufficientBalance" class="mt-1 text-sm text-red-600">
                Insufficient balance for checkout
              </div>
            </div>
            
            <div class="flex space-x-3">
              <button
                @click="clearCart"
                class="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Clear Cart
              </button>
              <button
                @click="checkout"
                :disabled="insufficientBalance || isLoading"
                class="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span v-if="isLoading" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
                <span v-else>Checkout</span>
              </button>
            </div>
            
            <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <button
                  @click="closeCart"
                  class="text-blue-600 font-medium hover:text-blue-500 ml-1"
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Success Modal -->
  <SuccessModal
    :is-open="showSuccessModal"
    :order-summary="orderSummary"
    @close="closeSuccessModal"
  />
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import SuccessModal from '../ui/SuccessModal.vue'

const store = useStore()
const showSuccessModal = ref(false)
const orderSummary = ref({})

// Computed properties
const isCartOpen = computed(() => store.getters['cart/isCartOpen'])
const cartItems = computed(() => store.getters['cart/cartItems'])
const formattedCartTotal = computed(() => store.getters['cart/formattedCartTotal'])
const cartTotal = computed(() => store.getters['cart/cartTotal'])
const walletBalance = computed(() => store.getters['wallet/formattedBalance'])
const walletBalanceValue = computed(() => store.getters['wallet/balance'])
const insufficientBalance = computed(() => walletBalanceValue.value < cartTotal.value)
const isLoading = computed(() => store.getters['cart/isLoading'])
const cartItemCount = computed(() => store.getters['cart/cartItemCount'])

// Methods
const closeCart = () => {
  store.dispatch('cart/closeCart')
}

const updateQuantity = (productId, quantity) => {
  store.dispatch('cart/updateQuantity', { productId, quantity })
}

const removeFromCart = (productId) => {
  store.dispatch('cart/removeFromCart', productId)
}

const clearCart = () => {
  store.dispatch('cart/clearCart')
}

const checkout = async () => {
  if (insufficientBalance.value) {
    alert('Insufficient balance. Please top up your wallet.')
    return
  }

  try {
    // Process each item in cart
    for (const item of cartItems.value) {
      await store.dispatch('wallet/purchase', {
        amount: item.price * item.quantity,
        description: `Purchase: ${item.title} (${item.quantity}x)`,
        productId: item.id
      })
    }
    
    // Prepare order summary
    orderSummary.value = {
      itemCount: cartItemCount.value,
      total: formattedCartTotal.value,
      newBalance: store.getters['wallet/formattedBalance'],
      items: [...cartItems.value]
    }
    
    // Clear cart after successful checkout
    store.dispatch('cart/clearCart')
    closeCart()
    
    // Show success modal
    showSuccessModal.value = true
  } catch (error) {
    alert(`Checkout failed: ${error}`)
  }
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 