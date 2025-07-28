# 🏦 Peassy Wallet - Modern Wallet Tracking System

A modern, responsive wallet tracking application built with Vue.js 3, Vuex, and Tailwind CSS. This application demonstrates advanced frontend development skills with a focus on user experience, component architecture, and state management.

## ✨ Features

### 🛍️ Product Catalog Interface
- **Real API Integration**: Fetches products from [Fake Store API](https://fakestoreapi.com/)
- **Responsive Grid Layout**: Modern card design with hover effects
- **Search & Filtering**: Real-time search and category filtering
- **Loading States**: Skeleton screens and loading animations
- **Error Handling**: Graceful error handling with retry mechanisms
- **Product Details**: Modal view with purchase functionality

### 💰 Wallet Management Dashboard
- **Balance Display**: Real-time wallet balance with beautiful UI
- **Top-up Interface**: Multiple payment methods with validation
- **Transaction History**: Detailed transaction logs with timestamps
- **Local Storage**: Persistent data using localStorage
- **Analytics**: Quick stats and spending overview

### 🛒 Shopping Experience
- **Add to Cart**: Seamless cart management
- **Shopping Cart**: Sidebar cart with quantity controls
- **Checkout Process**: Integrated wallet payment system
- **Purchase Flow**: Complete buy-now functionality
- **Error Handling**: Insufficient balance warnings

## 🚀 Tech Stack

- **Frontend Framework**: Vue.js 3 (Composition API)
- **State Management**: Vuex 4
- **Routing**: Vue Router 4
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite
- **Icons**: Heroicons
- **UI Components**: Headless UI

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd peassy-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── Header.vue          # Main navigation header
│   ├── product/
│   │   ├── ProductCard.vue     # Individual product card
│   │   ├── ProductGrid.vue     # Product grid with search/filter
│   │   └── ProductModal.vue    # Product details modal
│   ├── wallet/
│   │   ├── WalletDashboard.vue # Main wallet interface
│   │   └── TopUpModal.vue      # Top-up payment modal
│   └── cart/
│       └── ShoppingCart.vue    # Shopping cart sidebar
├── store/
│   ├── index.js               # Main Vuex store
│   └── modules/
│       ├── products.js        # Product catalog state
│       ├── wallet.js          # Wallet management state
│       └── cart.js            # Shopping cart state
├── views/
│   ├── Home.vue              # Landing page
│   ├── Products.vue          # Product catalog page
│   └── Wallet.vue            # Wallet dashboard page
└── router/
    └── index.js              # Vue Router configuration
```

## 🎨 Design Features

### Modern UI/UX
- **Gradient Design**: Beautiful blue-to-purple gradients
- **Smooth Animations**: CSS transitions and micro-interactions
- **Responsive Layout**: Mobile-first approach
- **Loading States**: Skeleton screens and spinners
- **Error States**: User-friendly error messages

### Component Architecture
- **Modular Design**: Reusable components
- **Props & Events**: Clean component communication
- **Computed Properties**: Reactive data handling
- **Lifecycle Hooks**: Proper component management

### State Management
- **Vuex Modules**: Organized state structure
- **Actions & Mutations**: Predictable state changes
- **Getters**: Computed state values
- **Local Storage**: Data persistence

## 🔧 Key Features Implementation

### API Integration
```javascript
// Fetch products from Fake Store API
async fetchProducts({ commit }) {
  const response = await fetch('https://fakestoreapi.com/products')
  const products = await response.json()
  commit('SET_PRODUCTS', products)
}
```

### Search & Filtering
```javascript
// Real-time search with debouncing
const handleSearch = () => {
  store.dispatch('products/setSearchQuery', searchQuery.value)
}
```

### Wallet Management
```javascript
// Top-up functionality with validation
const handleTopUp = async (amount) => {
  await store.dispatch('wallet/topUp', amount)
}
```

### Shopping Cart
```javascript
// Add to cart with quantity management
const addToCart = () => {
  store.dispatch('cart/addToCart', product)
}
```

## 🎯 User Experience Highlights

### 1. **Intuitive Navigation**
- Clean header with wallet balance display
- Responsive mobile menu
- Breadcrumb navigation

### 2. **Smart Search & Filter**
- Real-time search with instant results
- Category filtering
- Empty state handling

### 3. **Seamless Shopping**
- One-click add to cart
- Quantity controls in cart
- Checkout with wallet integration

### 4. **Wallet Management**
- Visual balance display
- Multiple payment methods
- Transaction history
- Quick top-up options

### 5. **Error Handling**
- Network error recovery
- Insufficient balance warnings
- Loading state feedback

## 🚀 Performance Optimizations

- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Responsive product images
- **State Caching**: Local storage for persistence
- **Debounced Search**: Optimized search performance
- **CSS Optimization**: Tailwind purge for production

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Responsive grid layouts
- **Desktop Experience**: Enhanced desktop features
- **Touch Friendly**: Mobile-optimized interactions

## 🔮 Future Enhancements

- **User Authentication**: Login/signup system
- **Payment Gateway**: Real payment integration
- **Order History**: Detailed order tracking
- **Wishlist**: Save favorite products
- **Reviews & Ratings**: Product reviews system
- **Push Notifications**: Real-time updates
- **Dark Mode**: Theme switching
- **PWA Support**: Progressive web app features

## 📄 License

This project is created for demonstration purposes as part of a frontend developer test.

---

**Built with ❤️ using Vue.js 3, Vuex, and Tailwind CSS**
