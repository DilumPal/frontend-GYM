import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Loading from "../../components/loding";
import Modal from 'react-modal';

// Required for accessibility - prevents screen readers from reading 
// main content when modal is open
Modal.setAppElement('#root');

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalIsOpen, setIsModalOpen] = useState(false);
    const [activeOrder, setActiveOrder] = useState(0);

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

        axios.get(
            import.meta.env.VITE_BACKEND_URL + "/api/orders",
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        )
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
                return "bg-yellow-100 text-yellow-700";
            case "completed":
                return "bg-green-100 text-green-700";
            case "cancelled":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    }

    return (
        <div className="w-full h-full flex flex-col overflow-hidden">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4">

                {isLoading ? (
                    <Loading />
                ) : orders.length === 0 ? (
                    /* Empty State */
                    <div className="w-full h-full flex justify-center items-center text-gray-500 text-lg">
                        No orders found
                    </div>
                ) : (
                    <div className="rounded-xl border border-gray-300 overflow-hidden shadow-sm">

                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={() => setIsModalOpen(false)}
                            contentLabel="Order Details Modal"
                            // Use 'portalClassName' to ensure it's outside the restricted overflow div
                            portalClassName="absolute z-[999]"
                            className="bg-white p-6 rounded-lg shadow-xl max-w-md mx-auto mt-20 outline-none relative z-[101]"
                            overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start z-[100]"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Order Details</h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-500 hover:text-black text-2xl"
                                >
                                    &times;
                                </button>
                            </div>

                            <div className="text-gray-700">
                                {JSON.stringify(orders[activeOrder])}
                            </div>

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition"
                            >
                                Close
                            </button>
                        </Modal>

                        <table className="w-full text-sm text-left">
                            {/* Table Header */}
                            <thead className="bg-primary text-white sticky top-0 z-10">
                                <tr>
                                    <th className="p-4">Order ID</th>
                                    <th className="p-4">Customer</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Address</th>
                                    <th className="p-4">Phone</th>
                                    <th className="p-4">Total</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4 text-center">Status</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr
                                        onClick={() => {
                                            setActiveOrder(index)
                                            setIsModalOpen(true)
                                        }}
                                        key={order._id || index}
                                        className="border-b hover:bg-gray-100 transition cursor-pointer"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        <td className="p-4 font-medium">{order.orderId}</td>
                                        <td className="p-4">{order.name}</td>
                                        <td className="p-4">{order.email}</td>
                                        <td className="p-4 max-w-[250px] truncate">{order.address}</td>
                                        <td className="p-4">{order.phone}</td>
                                        <td className="p-4 font-semibold text-green-600">
                                            Rs. {order.total?.toLocaleString()}
                                        </td>
                                        <td className="p-4">
                                            {new Date(order.date).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-center">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(order.status)}`}
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