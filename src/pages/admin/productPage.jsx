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
                import.meta.env.VITE_BACKEND_URL +
                    "/api/products/" +
                    productID,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            )
            .then(() => {
                toast.success("Product deleted");

                setProducts((prev) =>
                    prev.filter(
                        (item) => item.productID !== productID
                    )
                );
            })
            .catch((e) => {
                toast.error(
                    e?.response?.data?.message || "Delete failed"
                );
            });
    }

    return (
        <div className="w-full h-full flex flex-col overflow-hidden relative bg-primary text-secondary">
            {/* Header */}
            <div className="px-6 pt-6 pb-4">
                <h1 className="text-3xl font-bold text-accent">
                    Product Management
                </h1>
                <p className="text-secondary/60 mt-1">
                    Manage all products in your store
                </p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
                {loading ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[60px] h-[60px] border-4 border-secondary/10 border-t-accent rounded-full animate-spin"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center text-secondary/50 mt-20 text-lg">
                        No products found
                    </div>
                ) : (
                    <div
                        className="
                            rounded-2xl
                            border
                            border-accent/20
                            bg-secondary/[0.02]
                            overflow-hidden
                            shadow-[0_0_20px_rgba(229,57,53,0.08)]
                        "
                    >
                        <table className="w-full text-sm text-left text-secondary">
                            <thead className="bg-primary text-accent sticky top-0 z-10 border-b border-accent/20">
                                <tr>
                                    <th className="p-4">ID</th>
                                    <th className="p-4">Product</th>
                                    <th className="p-4">Image</th>
                                    <th className="p-4">Label Price</th>
                                    <th className="p-4">Price</th>
                                    <th className="p-4">Stock</th>
                                    <th className="p-4 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map((item, index) => (
                                    <tr
                                        key={
                                            item.productID || index
                                        }
                                        className="
                                            border-b
                                            border-secondary/10
                                            hover:bg-secondary/[0.04]
                                            transition
                                        "
                                    >
                                        <td className="p-4 font-medium">
                                            {item.productID}
                                        </td>

                                        <td className="p-4">
                                            {item.name}
                                        </td>

                                        <td className="p-4">
                                            <img
                                                src={
                                                    item.images?.[0] ||
                                                    "https://via.placeholder.com/100"
                                                }
                                                alt={item.name}
                                                className="
                                                    w-12
                                                    h-12
                                                    object-cover
                                                    rounded-lg
                                                    border
                                                    border-secondary/20
                                                "
                                            />
                                        </td>

                                        <td className="p-4 text-secondary/70">
                                            Rs.{" "}
                                            {item.labelledPrice?.toLocaleString()}
                                        </td>

                                        <td className="p-4 font-semibold text-accent">
                                            Rs.{" "}
                                            {item.price?.toLocaleString()}
                                        </td>

                                        <td className="p-4">
                                            {item.stock > 0 ? (
                                                <span className="text-accent font-semibold">
                                                    {item.stock}
                                                </span>
                                            ) : (
                                                <span className="text-accent/60 font-semibold line-through">
                                                    Out
                                                </span>
                                            )}
                                        </td>

                                        <td className="p-4">
                                            <div className="flex justify-center gap-5">
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            "/adminPage/edit-product",
                                                            {
                                                                state: item,
                                                            }
                                                        )
                                                    }
                                                    className="
                                                        text-secondary
                                                        hover:text-accent
                                                        hover:scale-110
                                                        transition
                                                    "
                                                >
                                                    <FaEdit
                                                        size={18}
                                                    />
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        deleteProduct(
                                                            item.productID
                                                        )
                                                    }
                                                    className="
                                                        text-accent/70
                                                        hover:text-accent
                                                        hover:scale-110
                                                        transition
                                                    "
                                                >
                                                    <FaTrash
                                                        size={18}
                                                    />
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
                className="
                    fixed
                    bottom-6
                    right-6
                    flex
                    items-center
                    gap-2
                    bg-accent
                    text-secondary
                    font-bold
                    px-6
                    py-3
                    rounded-full
                    shadow-[0_0_20px_rgba(229,57,53,0.35)]
                    hover:scale-105
                    hover:shadow-[0_0_30px_rgba(229,57,53,0.55)]
                    transition-all
                    duration-300
                    z-50
                "
            >
                <span className="text-xl">+</span>
                Add Product
            </Link>
        </div>
    );
}