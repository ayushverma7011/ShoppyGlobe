import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Contains <Link> tags
import OrderSuccess from './components/OrderSuccess';
import Footer from './components/Footer';

const ProductList = lazy(() => import('./components/ProductList'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const Cart = lazy(() => import('./components/Cart'));
const Checkout = lazy(() => import('./components/Checkout'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  return (
    <Router>
      <Header /> 
      <main className="min-h-screen">
        <Suspense fallback={<div className="text-center p-10">Loading ShoppyGlobe...</div>}>
          <Routes>
            {/* Creating routes for Home, Detail, Cart, and Checkout  */}
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<React.Suspense fallback={<div className="text-center p-10">Loading...</div>}><OrderSuccess /></React.Suspense>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </Router>
  );
}

export default App;