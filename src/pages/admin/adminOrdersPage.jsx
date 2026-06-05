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
            boxIsLoading(false);
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
                return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
            case "completed":
                return "bg-accent/10 text-accent border-accent/30";
            case "canceled":
            case "cancelled":
                return "bg-red-500/10 text-red-400 border-red-500/30";
            default:
                return "bg-secondary/10 text-secondary/80 border-secondary/20";
        }
    }

    return (
        <div className="w-full h-full flex flex-col overflow-hidden relative bg-primary text-secondary">
            
            {/* Page Header */}
            <div className="px-6 pt-6 pb-4">
                <h1 className="text-3xl font-bold text-accent">
                    Order Management
                </h1>
                <p className="text-secondary/60 mt-1">
                    Track and update customer orders
                </p>
            </div>

            {/* Scrollable Table Area */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">

                {isLoading ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[60px] h-[60px] border-4 border-secondary/10 border-t-accent rounded-full animate-spin"></div>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center text-secondary/50 mt-20 text-lg">
                        No orders found
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
                        {/* ================= MODAL ================= */}
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={() => setIsModalOpen(false)}
                            contentLabel="Order Details"
                            className="bg-primary/95 border border-accent/25 text-secondary w-[95%] md:w-[850px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 outline-none relative backdrop-blur-md"
                            overlayClassName="fixed inset-0 bg-black/75 backdrop-blur-sm flex justify-center items-center z-[999]"
                        >
                            {activeOrder && (
                                <div>
                                    {/* Modal Header */}
                                    <div className="flex justify-between items-start border-b border-secondary/10 pb-4">
                                        <div>
                                            <h2 className="text-2xl font-bold text-accent">
                                                Order Details
                                            </h2>
                                            <p className="text-secondary/60 mt-1">
                                                Order ID :{" "}
                                                <span className="font-semibold text-secondary">
                                                    {activeOrder.orderId}
                                                </span>
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="p-2 rounded-full text-secondary/60 hover:text-accent hover:bg-secondary/[0.05] transition"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>

                                    {/* Top Info Cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                                        
                                        {/* Customer Info */}
                                        <div className="border border-secondary/10 rounded-xl p-5 bg-secondary/[0.01]">
                                            <h3 className="font-bold text-lg mb-4 text-accent flex items-center gap-2">
                                                <User size={20} />
                                                Customer Information
                                            </h3>

                                            <div className="space-y-3 text-sm text-secondary/80">
                                                <div className="flex items-center gap-2">
                                                    <User size={16} className="text-accent" />
                                                    <span>{activeOrder.name}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Mail size={16} className="text-accent" />
                                                    <span>{activeOrder.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone size={16} className="text-accent" />
                                                    <span>{activeOrder.phone}</span>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <MapPin size={16} className="text-accent mt-0.5" />
                                                    <span>{activeOrder.address}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Order Summary */}
                                        <div className="border border-secondary/10 rounded-xl p-5 bg-secondary/[0.01]">
                                            <h3 className="font-bold text-lg mb-4 text-accent flex items-center gap-2">
                                                <Package size={20} />
                                                Order Summary
                                            </h3>

                                            <div className="space-y-4 text-sm">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-secondary/60 flex items-center gap-2">
                                                        <Calendar size={16} />
                                                        Order Date
                                                    </span>
                                                    <span className="font-medium text-secondary">
                                                        {new Date(activeOrder.date).toLocaleString()}
                                                    </span>
                                                </div>

                                                <div className="flex justify-between items-center gap-4">
                                                    <span className="text-secondary/60">Status</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`px-3 py-1 rounded-full text-xs border font-semibold ${getStatusStyle(activeOrder.status)}`}>
                                                            {activeOrder.status}
                                                        </span>
                                                        <select
                                                            className="bg-primary text-secondary border border-secondary/20 rounded-lg p-1 text-xs outline-none focus:border-accent"
                                                            defaultValue="default"
                                                            onChange={async (e) => {
                                                                const updateValue = e.target.value;
                                                                try {
                                                                    setIsLoading(true);
                                                                    const token = localStorage.getItem("token");

                                                                    await axios.put(
                                                                        import.meta.env.VITE_BACKEND_URL + "/api/orders/" + activeOrder.orderId + "/" + updateValue,
                                                                        {},
                                                                        { headers: { Authorization: "Bearer " + token } }
                                                                    );

                                                                    const updatedOrder = { ...activeOrder, status: updateValue };
                                                                    setActiveOrder(updatedOrder);

                                                                    setOrders((prevOrders) =>
                                                                        prevOrders.map((ord) =>
                                                                            ord.orderId === activeOrder.orderId ? { ...ord, status: updateValue } : ord
                                                                        )
                                                                    );

                                                                    toast.success("Order status updated!");
                                                                } catch (e) {
                                                                    toast.error("Error updating order status");
                                                                    console.error(e);
                                                                } finally {
                                                                    setIsLoading(false);
                                                                }
                                                            }}
                                                        >
                                                            <option value="default" disabled>Change Status</option>
                                                            <option value="pending">pending</option>
                                                            <option value="completed">completed</option>
                                                            <option value="canceled">canceled</option>
                                                            <option value="returned">returned</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <span className="text-secondary/60">Labelled Total</span>
                                                    <span className="line-through text-accent/60 font-semibold">
                                                        Rs. {activeOrder.labelledTotal?.toLocaleString()}
                                                    </span>
                                                </div>

                                                <div className="flex justify-between items-center text-lg border-t border-secondary/10 pt-3">
                                                    <span className="font-semibold text-secondary flex items-center gap-2">
                                                        <BadgeDollarSign size={18} />
                                                        Final Total
                                                    </span>
                                                    <span className="font-bold text-accent">
                                                        Rs. {activeOrder.total?.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    {/* Products List Section */}
                                    <div className="mt-8">
                                        <h3 className="text-xl font-bold mb-4 text-secondary flex items-center gap-2">
                                            <ShoppingCart size={22} className="text-accent" />
                                            Ordered Products
                                        </h3>

                                        <div className="space-y-4">
                                            {activeOrder.products?.map((item) => (
                                                <div
                                                    key={item._id}
                                                    className="border border-secondary/10 bg-secondary/[0.01] rounded-2xl p-4 flex flex-col md:flex-row gap-5 hover:border-accent/30 transition"
                                                >
                                                    {/* Product Image */}
                                                    <img
                                                        src={item.productInfo.images?.[0]}
                                                        alt={item.productInfo.name}
                                                        className="w-full md:w-[160px] h-[160px] object-cover rounded-xl border border-secondary/20"
                                                    />

                                                    {/* Product Details */}
                                                    <div className="flex-1 flex flex-col justify-between">
                                                        <div>
                                                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                                                                <div>
                                                                    <h4 className="text-xl font-bold text-secondary">
                                                                        {item.productInfo.name}
                                                                    </h4>
                                                                    <p className="text-sm text-secondary/50 mt-1">
                                                                        Product ID : {item.productInfo.productId}
                                                                    </p>
                                                                </div>

                                                                <div className="text-left md:text-right">
                                                                    <p className="text-sm text-secondary/50">Quantity</p>
                                                                    <p className="font-bold text-lg text-accent">{item.quantity}</p>
                                                                </div>
                                                            </div>

                                                            <p className="text-secondary/70 mt-3 text-sm leading-relaxed">
                                                                {item.productInfo.description}
                                                            </p>
                                                        </div>

                                                        {/* Alternative Tags & Pricing */}
                                                        <div className="mt-4 flex flex-col gap-4">
                                                            <div className="flex flex-wrap gap-2">
                                                                {item.productInfo.altNames?.map((alt, idx) => (
                                                                    <span
                                                                        key={idx}
                                                                        className="px-3 py-1 text-xs rounded-full bg-secondary/[0.04] text-secondary/70 border border-secondary/10"
                                                                    >
                                                                        {alt}
                                                                    </span>
                                                                ))}
                                                            </div>

                                                            <div className="flex flex-wrap items-center gap-6 border-t border-secondary/10 pt-3">
                                                                <div>
                                                                    <p className="text-xs text-secondary/50">Original Price</p>
                                                                    <p className="line-through text-accent/50 font-semibold text-sm">
                                                                        Rs. {item.productInfo.labelledPrice?.toLocaleString()}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-secondary/50">Selling Price</p>
                                                                    <p className="text-accent font-bold text-sm">
                                                                        Rs. {item.productInfo.price?.toLocaleString()}
                                                                    </p>
                                                                </div>
                                                                <div className="ml-auto">
                                                                    <p className="text-xs text-secondary/50 text-right">Sub Total</p>
                                                                    <p className="font-bold text-accent text-lg">
                                                                        Rs. {(item.productInfo.price * item.quantity).toLocaleString()}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Modal Actions Footer */}
                                    <div className="mt-8 flex justify-end">
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="px-6 py-2 rounded-xl bg-accent hover:bg-accent/80 text-white font-semibold transition"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}
                        </Modal>

                        {/* ================= MAIN ORDERS TABLE ================= */}
                        <table className="w-full text-sm text-left text-secondary">
                            
                            {/* Sticky Table Header */}
                            <thead className="bg-primary text-accent sticky top-0 z-10 border-b border-accent/20">
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
                                        className="
                                            border-b
                                            border-secondary/10
                                            hover:bg-secondary/[0.04]
                                            transition
                                            cursor-pointer
                                        "
                                        onClick={() => {
                                            setActiveOrder(order);
                                            setIsModalOpen(true);
                                        }}
                                    >
                                        <td className="p-4 font-semibold text-secondary">
                                            {order.orderId}
                                        </td>
                                        <td className="p-4 text-secondary/90">{order.name}</td>
                                        <td className="p-4 text-secondary/70">{order.email}</td>
                                        <td className="p-4 text-secondary/70">{order.phone}</td>
                                        <td className="p-4 font-bold text-accent">
                                            Rs. {order.total?.toLocaleString()}
                                        </td>
                                        <td className="p-4 text-secondary/80">
                                            {new Date(order.date).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs border font-semibold ${getStatusStyle(order.status)}`}>
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