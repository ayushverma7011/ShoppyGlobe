// src/utils/useFetchProducts.js
import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Requirement: Fetch from the specified API endpoint [cite: 22]
        const response = await axios.get('https://dummyjson.com/products');
       
        // const data = await response.json();
        // The API returns an object; we need the 'products' array
        setProducts(response.data.products); 
       
      }
       catch(error){
            setError(error.message); 
            console.log("Error fetching products:", error);
        }
       finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, loading, error };
};

export default useFetchProducts;