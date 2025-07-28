const state = {
  products: [],
  categories: [],
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategory: 'all',
  selectedProduct: null
}

const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_SEARCH_QUERY(state, query) {
    state.searchQuery = query
  },
  SET_SELECTED_CATEGORY(state, category) {
    state.selectedCategory = category
  },
  SET_SELECTED_PRODUCT(state, product) {
    state.selectedProduct = product
  }
}

const actions = {
  async fetchProducts({ commit }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      if (!response.ok) throw new Error('Failed to fetch products')
      
      const products = await response.json()
      commit('SET_PRODUCTS', products)
      
      // Extract unique categories
      const categories = [...new Set(products.map(p => p.category))]
      commit('SET_CATEGORIES', categories)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  async fetchProductById({ commit }, id) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`)
      if (!response.ok) throw new Error('Failed to fetch product')
      
      const product = await response.json()
      commit('SET_SELECTED_PRODUCT', product)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  setSearchQuery({ commit }, query) {
    commit('SET_SEARCH_QUERY', query)
  },
  
  setSelectedCategory({ commit }, category) {
    commit('SET_SELECTED_CATEGORY', category)
  },
  
  clearSelectedProduct({ commit }) {
    commit('SET_SELECTED_PRODUCT', null)
  }
}

const getters = {
  filteredProducts: (state) => {
    let filtered = state.products
    
    // Filter by category
    if (state.selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === state.selectedCategory)
    }
    
    // Filter by search query
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase()
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      )
    }
    
    return filtered
  },
  
  isLoading: state => state.loading,
  hasError: state => !!state.error,
  errorMessage: state => state.error,
  selectedProduct: state => state.selectedProduct,
  categories: state => state.categories
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
} 