import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          setProducts(res.data);
          setIsLoading(false);
        });
    }
  }, [isLoading]);
  return (
    <div className="w-full min-h-screen bg-primary p-6">
      <div className="flex flex-wrap justify-center gap-6">
        {products.map((product) => {
          return <ProductCard key={product.productID} product={product} />;
        })}
      </div>
    </div>
  );
}
