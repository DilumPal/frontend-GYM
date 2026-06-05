import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/productCard";
import toast from "react-hot-toast";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category"); // e.g., 'cardio', 'strength'

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        toast.error("Failed to load products");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // 1. Map the URL category query parameter to your productID prefixes
  const getPrefixForCategory = (category) => {
    switch (category?.toLowerCase()) {
      case "cardio":
        return "CARDIO";
      case "strength":
        return "STRENGTH";
      case "functional":
        return "FUNC";
      case "flexibility":
        return "BODY";
      default:
        return null;
    }
  };

  // 2. Filter products dynamically using .startsWith()
  const targetPrefix = getPrefixForCategory(categoryFilter);
  
  const displayedProducts = targetPrefix
    ? products.filter((product) => product.productID?.startsWith(targetPrefix))
    : products;

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-primary flex justify-center items-center">
        <div className="w-[60px] h-[60px] border-4 border-secondary/10 border-t-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-primary p-6">
      {categoryFilter && (
        <h2 className="text-2xl font-bold text-center mb-6 capitalize text-secondary">
          {categoryFilter} Equipment
        </h2>
      )}

      <div className="flex flex-wrap justify-center gap-6">
        {displayedProducts.length === 0 ? (
          <div className="text-center text-secondary/50 mt-20 text-lg">
            No products found in this category
          </div>
        ) : (
          displayedProducts.map((product) => (
            <ProductCard key={product.productID} product={product} />
          ))
        )}
      </div>
    </div>
  );
}