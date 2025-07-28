<template>
  <div 
    v-if="isVisible"
    class="fixed top-4 right-4 z-50 max-w-sm w-full"
  >
    <div 
      class="bg-white border border-gray-200 rounded-lg shadow-lg p-4 transform transition-all duration-300"
      :class="isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'"
    >
      <div class="flex items-start">
        <!-- Success Icon -->
        <div class="flex-shrink-0">
          <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <!-- Content -->
        <div class="ml-3 flex-1">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-medium text-gray-900">
              Added to Cart! 🛒
            </h4>
            <button
              @click="closeToast"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="mt-1">
            <div class="flex items-center space-x-3">
              <img 
                :src="product.image" 
                :alt="product.title"
                class="w-12 h-12 object-contain rounded border border-gray-200"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-900 font-medium truncate">
                  {{ product.title }}
                </p>
                <p class="text-sm text-gray-500">
                  ${{ product.price.toFixed(2) }}
                </p>
              </div>
            </div>
            
            <div class="mt-3 flex items-center justify-between">
              <span class="text-sm text-gray-500">
                Cart total: {{ cartTotal }}
              </span>
              <button
                @click="viewCart"
                class="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  duration: {
    type: Number,
    default: 4000
  }
})

const emit = defineEmits(['close'])
const store = useStore()
const isVisible = ref(false)

const cartTotal = computed(() => store.getters['cart/formattedCartTotal'])

const closeToast = () => {
  isVisible.value = false
  setTimeout(() => {
    emit('close')
  }, 300)
}

const viewCart = () => {
  closeToast()
  store.dispatch('cart/openCart')
}

onMounted(() => {
  // Show toast with animation
  setTimeout(() => {
    isVisible.value = true
  }, 100)

  // Auto hide after duration
  setTimeout(() => {
    closeToast()
  }, props.duration)
})
</script> 