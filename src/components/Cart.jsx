import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, clearCart, setCartItems } from '../utils/cartSlice';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // 1. Fetch Cart from MongoDB
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/cart", config);
        const formattedItems = data.items.map((item) => ({
          id: item.productId._id,      
          title: item.productId.title, 
          price: item.productId.price,
          thumbnail: item.productId.thumbnail,
          quantity: item.quantity,
        }));
        dispatch(setCartItems(formattedItems));
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    if (token) fetchCart();
  }, [dispatch, token]);

  // 2. Sync Quantity with Backend (Added /api to URL)
  const handleQuantityUpdate = async (item, newQuantity) => {
    const quantityDifference = newQuantity - item.quantity;
    try {
      await axios.post("http://localhost:8080/api/cart", 
        { productId: item.id, quantity: quantityDifference }, 
        config
      );
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update quantity");
    }
  };

  // 3. Remove Item from Backend (NEW: Persistence Fix)
  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/${productId}`, config);
      dispatch(removeItem(productId));
    } catch (err) {
      alert("Error removing item from database", err);
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <ShoppingBag size={80} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-600">Your cart is empty</h2>
        <Link to="/" className="mt-4 text-blue-600 hover:underline">Go back to shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-6 py-4 border-b last:border-0">
            <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-contain bg-gray-50 rounded" />
            
            <div className="flex-1">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-gray-500">${item.price}</p>
            </div>

            <div className="flex items-center gap-3 border rounded-lg px-2 py-1">
              <button 
                onClick={() => handleQuantityUpdate(item, Math.max(1, item.quantity - 1))}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button 
                onClick={() => handleQuantityUpdate(item, item.quantity + 1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <div className="text-right min-w-20">
              <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>

            <button 
              onClick={() => handleRemoveItem(item.id)} // Updated to handle DB delete
              className="text-red-500 hover:text-red-700 p-2"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}

        <div className="mt-8 pt-6 border-t">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl text-gray-600">Total Amount:</span>
            <span className="text-3xl font-extrabold text-gray-900">${totalPrice.toFixed(2)}</span>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => dispatch(clearCart())}
              className="flex-1 py-3 px-6 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors"
            >
              Clear Cart
            </button>
            <Link 
              to="/checkout" 
              className="flex-1 py-3 px-6 bg-blue-600 text-white text-center rounded-xl hover:bg-blue-700 transition-colors font-bold"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;