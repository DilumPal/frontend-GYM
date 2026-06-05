import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";
import toast from "react-hot-toast"; // Optional: for error handling

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Run once on component mount
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      })
      .finally(() => {
        setIsLoading(false); // Turn off loading regardless of success/fail
      });
  }, []); // <--- Empty array means "Run only once when page loads"

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-primary flex justify-center items-center">
        <div className="w-[60px] h-[60px] border-4 border-secondary/10 border-t-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-primary p-6">
      <div className="flex flex-wrap justify-center gap-6">
        {products.length === 0 ? (
          <div className="text-center text-secondary/50 mt-20表达 text-lg">
            No products found
          </div>
        ) : (
          products.map((product) => (
            <ProductCard key={product.productID} product={product} />
          ))
        )}
      </div>
    </div>
  );
}