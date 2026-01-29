import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItem } from "../utils/cartSlice";

function ProductItem({product}){
    const dispatch= useDispatch();
    if (!product) return null;
    function handleAddToCart(){
        dispatch(addItem(product));
        alert(`${product.title} added to cart!`);
    }
    return(
        <div className="border rounded-lg shadow-md p-4 flex flex-col items-center bg-white hover:shadow-lg transition-shadow">
            <img src= {product.thumbnail} alt={product.title} loading="lazy" className="h-40 w-full object-cover rounded-md mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">{product.title}</h3>
            <p className="text-gray-600 mb-4">${product.price}</p>
            <div className="flex space-x-2 w-full mt-auto">
                <Link to= {`/product/${product.id}`} className="flex-1 text-center bg-gray-200 text-gray-800 py-3 rounded hover:bg-gray-300 transition">Details</Link>
                <button onClick={handleAddToCart} className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Add To Cart</button>
            </div>
        </div>
       
    )
}
export default ProductItem;