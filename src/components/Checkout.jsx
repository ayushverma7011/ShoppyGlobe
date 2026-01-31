import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCart } from '../utils/cartSlice';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total one last time
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handlePlaceOrder = () => {
    // 1. Requirement: Action dispatching
    // In a real app, you'd send this to a backend. Here, we clear the state.
    dispatch(clearCart());
    navigate('/order-success');
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center p-20">
        <h2 className="text-2xl mb-4">Your cart is empty. Nothing to checkout!</h2>
        <Link to="/" className="text-blue-600 underline">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 mt-10 bg-white rounded-2xl shadow-lg border">
      <div className="text-center mb-8">
        <CheckCircle className="mx-auto text-green-500 mb-4" size={60} />
        <h1 className="text-3xl font-bold">Order Summary</h1>
      </div>

      <div className="space-y-4 mb-8">
        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between border-b pb-2">
            <span>{item.title} (x{item.quantity})</span>
            <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between text-2xl font-bold pt-4">
          <span>Total:</span>
          <span className="text-green-600">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button 
          onClick={handlePlaceOrder}
          className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-md active:scale-95"
        >
          Confirm and Pay
        </button>
        
        <button 
          onClick={() => navigate('/cart')}
          className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={18} /> Modify Cart
        </button>
      </div>
    </div>
  );
};

export default Checkout;