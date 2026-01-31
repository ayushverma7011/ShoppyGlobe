import React, { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import useFetchProducts from '../utils/useFetchProducts'; // Double-check this folder name!


const ProductItem = lazy(() => import('./ProductItem'));

const ProductList = () => {
  const { products, loading, error } = useFetchProducts();
 
    // Connecting to Redux Search State
  const searchQuery = useSelector((state) => state.search?.query || "");

   // Filtering products based on Search Query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="text-center mt-10">Loading Products...</div>;
  
  // Error Handling in UI
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Suspense fallback={<div>Loading item...</div>}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">No products found.</div>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default ProductList;