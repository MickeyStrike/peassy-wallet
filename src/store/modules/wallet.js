const state = {
  balance: 0,
  transactions: [],
  loading: false,
  error: null
}

const mutations = {
  SET_BALANCE(state, balance) {
    state.balance = balance
  },
  ADD_TRANSACTION(state, transaction) {
    state.transactions.unshift(transaction)
  },
  SET_TRANSACTIONS(state, transactions) {
    state.transactions = transactions
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  initializeWallet({ commit }) {
    // Load from localStorage
    const savedBalance = localStorage.getItem('wallet_balance')
    const savedTransactions = localStorage.getItem('wallet_transactions')
    
    if (savedBalance) {
      commit('SET_BALANCE', parseFloat(savedBalance))
    }
    
    if (savedTransactions) {
      commit('SET_TRANSACTIONS', JSON.parse(savedTransactions))
    }
  },
  
  topUp({ commit }, amount) {
    commit('SET_LOADING', true)
    
    // Simulate API call
    setTimeout(() => {
      const newBalance = state.balance + amount
      commit('SET_BALANCE', newBalance)
      
      const transaction = {
        id: Date.now(),
        type: 'topup',
        amount: amount,
        description: 'Wallet Top-up',
        timestamp: new Date().toISOString(),
        status: 'completed'
      }
      
      commit('ADD_TRANSACTION', transaction)
      
      // Save to localStorage
      localStorage.setItem('wallet_balance', newBalance.toString())
      localStorage.setItem('wallet_transactions', JSON.stringify(state.transactions))
      
      commit('SET_LOADING', false)
    }, 1000)
  },
  
  purchase({ commit, state }, { amount, description, productId }) {
    if (state.balance < amount) {
      commit('SET_ERROR', 'Insufficient balance')
      return Promise.reject('Insufficient balance')
    }
    
    commit('SET_LOADING', true)
    
    // Simulate API call
    setTimeout(() => {
      const newBalance = state.balance - amount
      commit('SET_BALANCE', newBalance)
      
      const transaction = {
        id: Date.now(),
        type: 'purchase',
        amount: -amount,
        description: description,
        productId: productId,
        timestamp: new Date().toISOString(),
        status: 'completed'
      }
      
      commit('ADD_TRANSACTION', transaction)
      
      // Save to localStorage
      localStorage.setItem('wallet_balance', newBalance.toString())
      localStorage.setItem('wallet_transactions', JSON.stringify(state.transactions))
      
      commit('SET_LOADING', false)
      commit('SET_ERROR', null)
    }, 1000)
  },
  
  clearError({ commit }) {
    commit('SET_ERROR', null)
  }
}

const getters = {
  balance: state => state.balance,
  transactions: state => state.transactions,
  recentTransactions: state => state.transactions.slice(0, 5),
  isLoading: state => state.loading,
  hasError: state => !!state.error,
  errorMessage: state => state.error,
  formattedBalance: state => `$${state.balance.toFixed(2)}`
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
} 