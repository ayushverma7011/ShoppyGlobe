import React, { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import useFetchProducts from '../utils/useFetchProducts';

// Requirement: Performance Optimization (Lazy Loading) 
const ProductItem = lazy(() => import('./ProductItem'));

function ProductList() {
  // Use the custom hook to fetch data 
  const { products, loading, error } = useFetchProducts();

  // Requirement: Implement search feature using Redux state 
  // Note: Ensure your Redux store has a 'search' slice with a 'query' field
  const searchQuery = useSelector((state) => state.search?.query || "");

  // Filter products based on the search query from Redux 
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Requirement: Manage loading and error states gracefully [cite: 27]
  if (loading) return <div className="text-center p-10">Loading Products...</div>;
  if (error) return <div className="text-center p-10 text-red-600">Error: {error}</div>; 

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Explore Our Products</h2>
      
      {/* Requirement: Render the list of products [cite: 44] */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Suspense fallback={<div>Loading item...</div>}> 
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              // Requirement: Provide a unique key to each list item [cite: 46]
              <ProductItem key={product.id} product={product} /> 
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              No products found matching "{searchQuery}".
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}

export default ProductList;