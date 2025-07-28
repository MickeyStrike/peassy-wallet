<template>
  <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
    <!-- Product Image -->
    <div class="relative overflow-hidden">
      <img 
        :src="product.image" 
        :alt="product.title"
        class="w-full h-48 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
      />
      
      <!-- Quick Add Button -->
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
        <button
          @click="addToCart"
          class="opacity-0 group-hover:opacity-100 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <!-- Category Badge -->
      <div class="mb-2">
        <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
          {{ product.category }}
        </span>
      </div>

      <!-- Product Title -->
      <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {{ product.title }}
      </h3>

      <!-- Rating -->
      <div class="flex items-center mb-3">
        <div class="flex items-center">
          <svg 
            v-for="star in 5" 
            :key="star"
            class="w-4 h-4"
            :class="star <= Math.round(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'"
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <span class="text-sm text-gray-600 ml-1">({{ product.rating.count }})</span>
      </div>

      <!-- Price -->
      <div class="flex items-center justify-between">
        <div class="text-2xl font-bold text-gray-900">
          ${{ product.price.toFixed(2) }}
        </div>
        
        <!-- View Details Button -->
        <button
          @click="viewDetails"
          class="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
        >
          View Details
        </button>
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
import { useStore } from 'vuex'
import { ref } from 'vue'
import ToastNotification from '../ui/ToastNotification.vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['view-details'])
const showToast = ref(false)

const store = useStore()

const addToCart = () => {
  store.dispatch('cart/addToCart', props.product)
  
  // Show toast notification
  showToast.value = true
}

const closeToast = () => {
  showToast.value = false
}

const viewDetails = () => {
  emit('view-details', props.product)
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