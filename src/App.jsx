// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Contains <Link> tags

// Requirement: Performance Optimization via Lazy Loading 
const ProductList = lazy(() => import('./components/ProductList'));
// const ProductDetail = lazy(() => import('./components/ProductDetail'));
// const Cart = lazy(() => import('./components/Cart'));
// const Checkout = lazy(() => import('./components/Checkout'));
// const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  return (
    // ✅ FIX: Router must wrap everything that uses <Link>
    <Router>
      <Header /> 
      <main className="min-h-screen">
        <Suspense fallback={<div className="text-center p-10">Loading ShoppyGlobe...</div>}>
          <Routes>
            {/* Requirement: Create routes for Home, Detail, Cart, and Checkout  */}
            <Route path="/" element={<ProductList />} />
            
            {/* Requirement: Use dynamic route parameters for product details [cite: 42] */}
            {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
            
            {/* <Route path="/cart" element={<Cart />} /> */}
            {/* <Route path="/checkout" element={<Checkout />} /> */}
            
            {/* Requirement: Display a 404 page for unknown routes [cite: 14] */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
}

export default App;