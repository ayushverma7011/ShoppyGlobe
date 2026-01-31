import React, { Suspense, lazy, useState } from 'react';
import { useSelector } from 'react-redux';
import useFetchProducts from '../utils/useFetchProducts';
import SkeletonCard from './SkeletonCard'; // Added back for professional feel

const ProductItem = lazy(() => import('./ProductItem'));

const ProductList = () => {
  const { products, loading, error } = useFetchProducts();
  
  // 1. Grab visibility from Redux
  const isSearchVisible = useSelector((state) => state.cart.isSearchVisible);
  
  // 2. Local state for the input
  const [searchTerm, setSearchTerm] = useState("");

  // 3. Filter using the LOCAL searchTerm
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (error) return <div className="text-center mt-20 text-red-500 font-bold">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* ✅ Search Bar with Professional Styling */}
      {isSearchVisible && (
        <div className="mb-10 flex justify-center animate-fadeIn">
          <div className="relative w-full max-w-xl group">
            <input
              type="text"
              autoFocus
              placeholder="Search for items, brands..."
              className="w-full pl-6 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-slate-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Optional: Clear search button */}
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* ✅ Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <Suspense fallback={<SkeletonCard />}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-slate-400 text-xl font-medium">No results found for "{searchTerm}"</p>
              <button 
                onClick={() => setSearchTerm("")}
                className="mt-4 text-indigo-600 font-bold hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default ProductList;