import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../utils/cartSlice';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    altPhone: '',
    address: '',
    city: '',
    pincode: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    console.log('Order placed for:', formData);
    dispatch(clearCart());
    navigate('/order-success');
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold dark:text-white">
          Your cart is empty!
        </h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-indigo-600 font-bold"
        >
          Back to Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      
      {/* LEFT — SHIPPING FORM */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 border border-slate-200 dark:border-slate-800">
        <h2 className="text-3xl font-extrabold mb-8 text-slate-800 dark:text-white">
          Shipping Details
        </h2>

        <form onSubmit={handlePlaceOrder} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-600 dark:text-slate-400">
              Full Name
            </label>
            <input
              required
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 
                         bg-white dark:bg-slate-900 text-slate-800 dark:text-white
                         focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900/40"
            />
          </div>

          {/* Phone Numbers */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              required
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 
                         bg-white dark:bg-slate-900 text-slate-800 dark:text-white
                         focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900/40"
            />
            <input
              name="altPhone"
              value={formData.altPhone}
              onChange={handleInputChange}
              placeholder="Alternate Phone"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 
                         bg-white dark:bg-slate-900 text-slate-800 dark:text-white
                         focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900/40"
            />
          </div>

          {/* Address */}
          <textarea
            required
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows="4"
            placeholder="Complete Address"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 
                       bg-white dark:bg-slate-900 text-slate-800 dark:text-white
                       focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900/40 resize-none"
          />

          {/* City & Pincode */}
          <div className="grid grid-cols-2 gap-6">
            <input
              required
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 
                         bg-white dark:bg-slate-900 text-slate-800 dark:text-white
                         focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900/40"
            />
            <input
              required
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              placeholder="Pin Code"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 
                         bg-white dark:bg-slate-900 text-slate-800 dark:text-white
                         focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900/40"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-8 py-4 rounded-2xl text-lg font-bold text-white
                       bg-indigo-600 hover:bg-indigo-700 shadow-lg active:scale-95 transition"
          >
            Confirm & Pay ${totalPrice.toFixed(2)}
          </button>
        </form>
      </div>

      {/* RIGHT — ORDER SUMMARY */}
      <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 sticky top-24 h-fit">
        <h3 className="text-2xl font-extrabold mb-6 dark:text-white">
          Order Summary
        </h3>

        <div className="space-y-4 max-h-80 overflow-y-auto">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white dark:bg-slate-800 p-3 rounded-xl text-sm"
            >
              <span className="text-slate-600 dark:text-slate-300">
                {item.title} × {item.quantity}
              </span>
              <span className="font-bold dark:text-white">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-between text-lg font-black dark:text-white">
          <span>Total</span>
          <span className="text-indigo-600">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;