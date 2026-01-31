import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

function OrderSuccess(){
    const [orderNumber] = React.useState(() => Math.floor(Math.random() * 900000) + 100000);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl text-center border border-green-100">
        <div className="mb-6 flex justify-center">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle size={64} className="text-green-600" />
          </div>
        </div>
        {/* Display Order Details */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-8">
          Thank you for your purchase. Your order <span className="font-mono font-bold text-blue-600">#{orderNumber}</span> has been received and is being processed.
        </p>
        {/* To show status of the order */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 flex items-center gap-4 text-left">
          <Package className="text-blue-500" size={32} />
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Status</p>
            <p className="text-gray-700 font-medium">Preparing for Shipment</p>
          </div>
        </div>
        {/* Redirect to the Home Page */}
        <Link 
          to="/" 
          className="group flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all"
        >
          Continue Shopping
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;