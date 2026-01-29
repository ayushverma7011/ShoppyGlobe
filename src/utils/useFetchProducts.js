// src/utils/useFetchProducts.js
import { useState, useEffect } from 'react';

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Requirement: Fetch from the specified API endpoint [cite: 22]
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products'); // Requirement: Error handling [cite: 27]
        }
        const data = await response.json();
        // The API returns an object; we need the 'products' array
        setProducts(data.products); 
        setError(error.message); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, loading, error };
};

export default useFetchProducts;