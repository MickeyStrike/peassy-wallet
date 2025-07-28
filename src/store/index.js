import { createStore } from 'vuex'
import products from './modules/products'
import wallet from './modules/wallet'
import cart from './modules/cart'

export default createStore({
  modules: {
    products,
    wallet,
    cart
  }
}) 