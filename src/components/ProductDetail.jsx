import axios from "axios";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addItem } from '../utils/cartSlice';

function ProductDetail(){
    const { id }= useParams();
    const navigate= useNavigate();
    const dispatch= useDispatch();

    const [product, setProduct]= useState(null);
    const [loading, setLoading]= useState(true);
    const [error, setError]= useState(null);

    useEffect(()=>{
        async function fetchProduct(){
            try{
                const response= await axios.get(`https://dummyjson.com/products/${id}`);
                setProduct(response.data);
            }
            catch(err){
                console.log("Error fetching product details:", err);
                setError(err.response?.data?.message || "Product Not Found");
            }
            finally{
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);
    
    if(loading) return <div className="text-center mt-20 text-xl">Loading Product Details...</div>
    if(error) return(
        <div className="text-center mt-20 border p-10 max-w-md mx-auto rounded-lg shadow-lg">
            <h2 className="text-2xl text-red-600 font-bold mb-4">Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button onClick= {()=> navigate('/')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-lue-700">Back to Products</button>
        </div>
    );
    if(!product) return null;
    return(
        <div className="max-w-6xl mx-auto p-6">
      {/* Back Button for UX */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        {/* Product Image Section */}
        <div className="flex justify-center items-center bg-gray-50 rounded-xl p-4">
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="max-h-96 object-contain rounded-lg shadow-md"
          />
        </div>

        {/* Product Information Section */}
        <div className="flex flex-col justify-center">
          <span className="text-sm font-semibold text-blue-500 uppercase tracking-widest">{product.category}</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">{product.title}</h1>
          
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-bold">
              <Star size={14} fill="white" className="mr-1" /> {product.rating}
            </div>
            <span className="text-gray-400 text-sm">| {product.brand}</span>
          </div>

          <p className="text-gray-600 mt-6 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="mt-8">
            <span className="text-5xl font-extrabold text-gray-900">${product.price}</span>
            <span className="ml-4 text-green-600 font-medium">{product.discountPercentage}% OFF</span>
          </div>

          {/* Requirement: Add to Cart functionality */}
          <button 
            onClick={() => dispatch(addItem(product))}
            className="mt-10 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-transform active:scale-95"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
          
          <p className="text-sm text-gray-500 mt-6">
            Delivery: {product.shippingInformation || 'Standard shipping available'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;