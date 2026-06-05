import axios from "axios";
import { useState } from "react";
import ProductCard from "../../components/productCard";
import toast from "react-hot-toast";

export default function SearchProductPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState("");

    return (
        <div className="w-full min-h-screen bg-primary text-secondary flex flex-col items-center p-8 gap-6">

            {/* Title - Changed from Green to Red */}
            <h1 className="text-3xl font-bold text-accent">
                Search Products
            </h1>

            <div className="w-full max-w-2xl">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={async (e) => {
                        setQuery(e.target.value);
                        setIsLoading(true);

                        if (e.target.value.length === 0) {
                            setProducts([]);
                            setIsLoading(false);
                            return;
                        }

                        try {
                            const response = await axios.get(
                                import.meta.env.VITE_BACKEND_URL +
                                    "/api/products/search/",
                                {
                                    params: { q: e.target.value },
                                }
                            );

                            setProducts(response.data);
                        } catch (error) {
                            toast.error(
                                "Failed to search products. Please try again."
                            );
                            console.error(
                                "Error searching products:",
                                error
                            );
                        } finally {
                            setIsLoading(false);
                        }
                    }}
                    className="
                        w-full
                        px-5
                        py-3
                        rounded-xl
                        bg-primary/60
                        border-2
                        border-secondary/10
                        text-secondary
                        placeholder:text-secondary/40
                        focus:outline-none
                        focus:border-accent
                        focus:ring-2
                        focus:ring-accent/30
                        transition-all
                    "
                />
            </div>

            <div className="w-full flex flex-wrap justify-center gap-6 py-4">
                {query.length === 0 ? (
                    <div className="text-center mt-10">
                        <p className="text-lg text-secondary/50">
                            Start typing to search for products...
                        </p>
                    </div>
                ) : isLoading ? (
                    <div className="flex flex-col items-center gap-3 mt-10">
                        {/* Spinner - Changed accent border from Green to Red */}
                        <div className="w-10 h-10 border-4 border-secondary/10 border-t-accent rounded-full animate-spin"></div>
                        <p className="text-accent">Searching...</p>
                    </div>
                ) : products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard
                            key={product.productID}
                            product={product}
                        />
                    ))
                ) : (
                    <div className="text-center mt-10">
                        <p className="text-secondary/50">
                            No products found.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}