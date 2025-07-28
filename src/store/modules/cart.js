const state = {
  items: [],
  isOpen: false,
  loading: false
}

const mutations = {
  ADD_TO_CART(state, product) {
    const existingItem = state.items.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      state.items.push({
        ...product,
        quantity: 1
      })
    }
  },
  
  REMOVE_FROM_CART(state, productId) {
    state.items = state.items.filter(item => item.id !== productId)
  },
  
  UPDATE_QUANTITY(state, { productId, quantity }) {
    const item = state.items.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        state.items = state.items.filter(item => item.id !== productId)
      } else {
        item.quantity = quantity
      }
    }
  },
  
  CLEAR_CART(state) {
    state.items = []
  },
  
  TOGGLE_CART(state) {
    state.isOpen = !state.isOpen
  },
  
  SET_CART_OPEN(state, isOpen) {
    state.isOpen = isOpen
  },
  
  SET_LOADING(state, loading) {
    state.loading = loading
  }
}

const actions = {
  addToCart({ commit }, product) {
    commit('ADD_TO_CART', product)
  },
  
  removeFromCart({ commit }, productId) {
    commit('REMOVE_FROM_CART', productId)
  },
  
  updateQuantity({ commit }, { productId, quantity }) {
    commit('UPDATE_QUANTITY', { productId, quantity })
  },
  
  clearCart({ commit }) {
    commit('CLEAR_CART')
  },
  
  toggleCart({ commit }) {
    commit('TOGGLE_CART')
  },
  
  openCart({ commit }) {
    commit('SET_CART_OPEN', true)
  },
  
  closeCart({ commit }) {
    commit('SET_CART_OPEN', false)
  }
}

const getters = {
  cartItems: state => state.items,
  cartItemCount: state => state.items.reduce((total, item) => total + item.quantity, 0),
  cartTotal: state => state.items.reduce((total, item) => total + (item.price * item.quantity), 0),
  formattedCartTotal: state => {
    const total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    return `$${total.toFixed(2)}`
  },
  isCartOpen: state => state.isOpen,
  isLoading: state => state.loading,
  hasItems: state => state.items.length > 0
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
} 