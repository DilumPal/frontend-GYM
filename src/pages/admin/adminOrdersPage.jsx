import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Loading from "../../components/loding";
import Modal from "react-modal";
import {
    X,
    Package,
    User,
    Phone,
    Mail,
    MapPin,
    Calendar,
    BadgeDollarSign,
    ShoppingCart,
} from "lucide-react";

Modal.setAppElement("#root");

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalIsOpen, setIsModalOpen] = useState(false);
    const [activeOrder, setActiveOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    function fetchOrders() {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login first");
            setIsLoading(false);
            return;
        }

        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            .then((res) => {
                setOrders(res.data);
            })
            .catch((e) => {
                toast.error(
                    e?.response?.data?.message || "Failed to fetch orders"
                );
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function getStatusStyle(status) {
        switch (status?.toLowerCase()) {
            case "pending":
                return "bg-yellow-100 text-yellow-700 border-yellow-300";

            case "completed":
                return "bg-green-100 text-green-700 border-green-300";

            case "cancelled":
                return "bg-red-100 text-red-700 border-red-300";

            default:
                return "bg-gray-100 text-gray-700 border-gray-300";
        }
    }

    return (
        <div className="w-full h-full flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4">

                {isLoading ? (
                    <Loading />
                ) : orders.length === 0 ? (
                    <div className="w-full h-full flex justify-center items-center text-gray-500 text-lg">
                        No orders found
                    </div>
                ) : (
                    <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-white">

                        {/* ================= MODAL ================= */}

                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={() => setIsModalOpen(false)}
                            contentLabel="Order Details"
                            className="bg-white w-[95%] md:w-[850px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 outline-none relative"
                            overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[999]"
                        >
                            {activeOrder && (
                                <div>

                                    {/* Header */}
                                    <div className="flex justify-between items-start border-b pb-4">

                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-800">
                                                Order Details
                                            </h2>

                                            <p className="text-gray-500 mt-1">
                                                Order ID :{" "}
                                                <span className="font-semibold text-primary">
                                                    {activeOrder.orderId}
                                                </span>
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="p-2 rounded-full hover:bg-gray-100 transition"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>

                                    {/* Top Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

                                        {/* Customer Info */}
                                        <div className="border rounded-xl p-5 bg-gray-50">
                                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                                <User size={20} />
                                                Customer Information
                                            </h3>

                                            <div className="space-y-3 text-sm">

                                                <div className="flex items-center gap-2">
                                                    <User size={16} className="text-gray-500" />
                                                    <span>{activeOrder.name}</span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Mail size={16} className="text-gray-500" />
                                                    <span>{activeOrder.email}</span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Phone size={16} className="text-gray-500" />
                                                    <span>{activeOrder.phone}</span>
                                                </div>

                                                <div className="flex items-start gap-2">
                                                    <MapPin
                                                        size={16}
                                                        className="text-gray-500 mt-1"
                                                    />
                                                    <span>{activeOrder.address}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Order Summary */}
                                        <div className="border rounded-xl p-5 bg-gray-50">
                                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                                <Package size={20} />
                                                Order Summary
                                            </h3>

                                            <div className="space-y-4 text-sm">

                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500 flex items-center gap-2">
                                                        <Calendar size={16} />
                                                        Order Date
                                                    </span>

                                                    <span className="font-medium">
                                                        {new Date(
                                                            activeOrder.date
                                                        ).toLocaleString()}
                                                    </span>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500">
                                                        Status
                                                    </span>

                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs border font-semibold ${getStatusStyle(
                                                            activeOrder.status
                                                        )}`}
                                                    >
                                                        {activeOrder.status}
                                                    </span>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500">
                                                        Labelled Total
                                                    </span>

                                                    <span className="line-through text-red-500 font-semibold">
                                                        Rs.{" "}
                                                        {activeOrder.labelledTotal?.toLocaleString()}
                                                    </span>
                                                </div>

                                                <div className="flex justify-between items-center text-lg">
                                                    <span className="font-semibold flex items-center gap-2">
                                                        <BadgeDollarSign size={18} />
                                                        Final Total
                                                    </span>

                                                    <span className="font-bold text-green-600">
                                                        Rs.{" "}
                                                        {activeOrder.total?.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Products Section */}
                                    <div className="mt-8">

                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                            <ShoppingCart size={22} />
                                            Ordered Products
                                        </h3>

                                        <div className="space-y-4">

                                            {activeOrder.products?.map((item) => (
                                                <div
                                                    key={item._id}
                                                    className="border rounded-2xl p-4 flex flex-col md:flex-row gap-5 hover:shadow-md transition"
                                                >

                                                    {/* Product Image */}
                                                    <img
                                                        src={
                                                            item.productInfo.images?.[0]
                                                        }
                                                        alt={item.productInfo.name}
                                                        className="w-full md:w-[160px] h-[160px] object-cover rounded-xl border"
                                                    />

                                                    {/* Product Details */}
                                                    <div className="flex-1">

                                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">

                                                            <div>
                                                                <h4 className="text-xl font-bold text-gray-800">
                                                                    {item.productInfo.name}
                                                                </h4>

                                                                <p className="text-sm text-gray-500 mt-1">
                                                                    Product ID :{" "}
                                                                    {
                                                                        item.productInfo
                                                                            .productId
                                                                    }
                                                                </p>
                                                            </div>

                                                            <div className="text-right">
                                                                <p className="text-sm text-gray-500">
                                                                    Quantity
                                                                </p>

                                                                <p className="font-bold text-lg">
                                                                    {item.quantity}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                                                            {
                                                                item.productInfo
                                                                    .description
                                                            }
                                                        </p>

                                                        {/* Alternative Names */}
                                                        <div className="flex flex-wrap gap-2 mt-4">
                                                            {item.productInfo.altNames?.map(
                                                                (alt, index) => (
                                                                    <span
                                                                        key={index}
                                                                        className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                                                                    >
                                                                        {alt}
                                                                    </span>
                                                                )
                                                            )}
                                                        </div>

                                                        {/* Price Details */}
                                                        <div className="mt-5 flex flex-col md:flex-row md:justify-between gap-3">

                                                            <div>
                                                                <p className="text-sm text-gray-500">
                                                                    Original Price
                                                                </p>

                                                                <p className="line-through text-red-500 font-semibold">
                                                                    Rs.{" "}
                                                                    {item.productInfo.labelledPrice?.toLocaleString()}
                                                                </p>
                                                            </div>

                                                            <div>
                                                                <p className="text-sm text-gray-500">
                                                                    Selling Price
                                                                </p>

                                                                <p className="text-green-600 font-bold text-lg">
                                                                    Rs.{" "}
                                                                    {item.productInfo.price?.toLocaleString()}
                                                                </p>
                                                            </div>

                                                            <div>
                                                                <p className="text-sm text-gray-500">
                                                                    Sub Total
                                                                </p>

                                                                <p className="font-bold text-primary text-lg">
                                                                    Rs.{" "}
                                                                    {(
                                                                        item.productInfo.price *
                                                                        item.quantity
                                                                    ).toLocaleString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-8 flex justify-end">
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="px-6 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}
                        </Modal>

                        {/* ================= TABLE ================= */}

                        <table className="w-full text-sm text-left">
                            <thead className="bg-primary text-white sticky top-0 z-10">
                                <tr>
                                    <th className="p-4">Order ID</th>
                                    <th className="p-4">Customer</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Phone</th>
                                    <th className="p-4">Total</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4 text-center">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map((order, index) => (
                                    <tr
                                        key={order._id || index}
                                        className="border-b hover:bg-gray-50 transition cursor-pointer"
                                        onClick={() => {
                                            setActiveOrder(order);
                                            setIsModalOpen(true);
                                        }}
                                    >
                                        <td className="p-4 font-semibold">
                                            {order.orderId}
                                        </td>

                                        <td className="p-4">{order.name}</td>

                                        <td className="p-4">{order.email}</td>

                                        <td className="p-4">{order.phone}</td>

                                        <td className="p-4 font-bold text-green-600">
                                            Rs. {order.total?.toLocaleString()}
                                        </td>

                                        <td className="p-4">
                                            {new Date(
                                                order.date
                                            ).toLocaleDateString()}
                                        </td>

                                        <td className="p-4 text-center">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs border font-semibold ${getStatusStyle(
                                                    order.status
                                                )}`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}