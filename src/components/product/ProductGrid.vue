<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Search and Filter Section -->
    <div class="mb-8">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Search Bar -->
        <div class="flex-1">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @input="handleSearch"
            />
            <svg class="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- Category Filter -->
        <div class="md:w-64">
          <select
            v-model="selectedCategory"
            @change="handleCategoryChange"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ formatCategory(category) }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="n in 8" :key="n" class="bg-white rounded-xl shadow-md p-4 animate-pulse">
        <div class="bg-gray-200 h-48 rounded-lg mb-4"></div>
        <div class="bg-gray-200 h-4 rounded mb-2"></div>
        <div class="bg-gray-200 h-6 rounded mb-2"></div>
        <div class="bg-gray-200 h-4 rounded w-1/2"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="hasError" class="text-center py-12">
      <div class="text-red-500 text-6xl mb-4">⚠️</div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
      <p class="text-gray-600 mb-4">{{ errorMessage }}</p>
      <button
        @click="retryFetch"
        class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>

    <!-- Products Grid -->
    <div v-else-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @view-details="showProductDetails"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="text-gray-400 text-6xl mb-4">🔍</div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
      <p class="text-gray-600">Try adjusting your search or filter criteria</p>
    </div>

    <!-- Product Details Modal -->
    <ProductModal
      v-if="selectedProduct"
      :product="selectedProduct"
      @close="closeProductDetails"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import ProductCard from './ProductCard.vue'
import ProductModal from './ProductModal.vue'

const store = useStore()
const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedProduct = ref(null)

// Computed properties
const isLoading = computed(() => store.getters['products/isLoading'])
const hasError = computed(() => store.getters['products/hasError'])
const errorMessage = computed(() => store.getters['products/errorMessage'])
const filteredProducts = computed(() => store.getters['products/filteredProducts'])
const categories = computed(() => store.getters['products/categories'])

// Methods
const handleSearch = () => {
  store.dispatch('products/setSearchQuery', searchQuery.value)
}

const handleCategoryChange = () => {
  store.dispatch('products/setSelectedCategory', selectedCategory.value)
}

const retryFetch = () => {
  store.dispatch('products/fetchProducts')
}

const showProductDetails = (product) => {
  selectedProduct.value = product
}

const closeProductDetails = () => {
  selectedProduct.value = null
  store.dispatch('products/clearSelectedProduct')
}

const formatCategory = (category) => {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

// Lifecycle
onMounted(() => {
  store.dispatch('products/fetchProducts')
})

// Watch for route changes to reset filters
watch(() => store.state.products.searchQuery, (newQuery) => {
  searchQuery.value = newQuery
})

watch(() => store.state.products.selectedCategory, (newCategory) => {
  selectedCategory.value = newCategory
})
</script> 