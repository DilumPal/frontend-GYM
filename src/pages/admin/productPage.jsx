import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminProductPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    function fetchProducts() {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
            .then((res) => {
                setProducts(res.data);
            })
            .catch(() => {
                toast.error("Failed to load products");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function deleteProduct(productID) {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login first");
            return;
        }

        axios
            .delete(
                import.meta.env.VITE_BACKEND_URL + "/api/products/" + productID,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            )
            .then(() => {
                toast.success("Product deleted");
                setProducts((prev) =>
                    prev.filter((item) => item.productID !== productID)
                );
            })
            .catch((e) => {
                toast.error(e?.response?.data?.message || "Delete failed");
            });
    }

    return (
        <div className="w-full h-full flex flex-col overflow-hidden relative">

            {/* Scrollable Table Area */}
            <div className="flex-1 overflow-y-auto p-4">

                {loading ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[60px] h-[60px] border-4 border-gray-300 border-t-accent rounded-full animate-spin"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20">
                        No products found
                    </div>
                ) : (
                    <div className="rounded-xl border border-gray-300 shadow-sm overflow-hidden">
                        
                        <table className="w-full text-sm text-left">
                            
                            {/* Sticky Header */}
                            <thead className="bg-primary text-white sticky top-0 z-10">
                                <tr>
                                    <th className="p-4">ID</th>
                                    <th className="p-4">Product</th>
                                    <th className="p-4">Image</th>
                                    <th className="p-4">Label Price</th>
                                    <th className="p-4">Price</th>
                                    <th className="p-4">Stock</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="border-b hover:bg-gray-100 transition"
                                    >
                                        <td className="p-4 font-medium">
                                            {item.productID}
                                        </td>

                                        <td className="p-4">
                                            {item.name}
                                        </td>

                                        <td className="p-4">
                                            <img
                                                src={item.images?.[0]}
                                                alt={item.name}
                                                className="w-12 h-12 object-cover rounded-lg border"
                                            />
                                        </td>

                                        <td className="p-4">
                                            Rs. {item.labelledPrice?.toLocaleString()}
                                        </td>

                                        <td className="p-4 font-semibold text-green-600">
                                            Rs. {item.price?.toLocaleString()}
                                        </td>

                                        <td className="p-4">
                                            {item.stock > 0 ? (
                                                <span className="text-green-600 font-semibold">
                                                    {item.stock}
                                                </span>
                                            ) : (
                                                <span className="text-red-500 font-semibold">
                                                    Out
                                                </span>
                                            )}
                                        </td>

                                        <td className="p-4">
                                            <div className="flex justify-center gap-4">
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            "/adminPage/edit-product",
                                                            { state: item }
                                                        )
                                                    }
                                                    className="text-blue-500 hover:scale-110 transition"
                                                >
                                                    <FaEdit size={18} />
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        deleteProduct(item.productID)
                                                    }
                                                    className="text-red-500 hover:scale-110 transition"
                                                >
                                                    <FaTrash size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                )}
            </div>

            {/* Floating Add Product Button */}
            <Link
                to="/adminPage/add-product"
                className="fixed bottom-6 right-6 flex items-center gap-2 
                           bg-accent text-primary font-semibold 
                           px-6 py-3 rounded-full shadow-lg 
                           hover:scale-105 hover:shadow-xl 
                           transition-all duration-200 z-50"
            >
                <span className="text-xl">+</span>
                Add Product
            </Link>
        </div>
    );
}