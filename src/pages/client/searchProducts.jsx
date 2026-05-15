import axios from "axios";
import { useState } from "react";
import ProductCard from "../../components/productCard";
import toast from "react-hot-toast";

export default function SearchProductPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");

    
    return (
        <div className="w-full h-full flex flex-col items-center p-4">
            <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={async (e) => {
                    setQuery(e.target.value);
                    setIsLoading(true);
                    if(e.target.value.length === 0){
                        setProducts([]);
                        setIsLoading(false);
                        return;
                    }
                    try {
                        const response = await axios.get(
                        import.meta.env.VITE_BACKEND_URL + "/api/products/search/", {
                            params: { q: e.target.value }
                        }
                    );
                        setProducts(response.data);
                    } catch (error) {
                        toast.error("Failed to search products. Please try again.");
                        console.error("Error searching products:", error);
                        return;
                    }finally {
                        setIsLoading(false);
                    }
                }}
            />
            <div className="w-full h-full flex flex-row flex-wrap justify-center items-center">
                {
                    query.length === 0 ?
                        <p>Start typing to search for products...</p>
                        :
                        <>
                            {isLoading ? (
                                <p>Loading...</p>
                            ) : (
                                products.map((product) => {
                                    return (
                                        <ProductCard key={product.productID} product={product} />
                                    )
                                })
                            )}
                        </>
                }

            </div>
        </div>
    )
}

