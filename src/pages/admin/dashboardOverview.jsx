import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { 
    FiBox, 
    FiShoppingBag, 
    FiCheckCircle, 
    FiAlertCircle, 
    FiInfo, 
    FiArrowRight, 
    FiFileText 
} from "react-icons/fi";

export default function AdminDashboardOverview() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        pendingOrders: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        // Fetch numbers asynchronously to update metric displays
        Promise.all([
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products"),
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
                headers: { Authorization: "Bearer " + token }
            })
        ]).then(([productsRes, ordersRes]) => {
            const pendingCount = ordersRes.data.filter(
                (o) => o.status?.toLowerCase() === "pending"
            ).length;

            setStats({
                totalProducts: productsRes.data.length,
                totalOrders: ordersRes.data.length,
                pendingOrders: pendingCount
            });
        }).catch((err) => {
            console.error("Failed to load backend stats metrics", err);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <div className="w-full h-full flex flex-col overflow-hidden relative bg-[#1A1A1A] text-white p-6 antialiased">
            
            {/* Header block */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-[#E53935]">
                    Dashboard Overview
                </h1>
                <p className="text-white/60 mt-1">
                    Welcome back! Here is what's happening with your store today.
                </p>
            </div>

            <div className="flex-1 overflow-y-auto space-y-8 pr-1">
                
                {/* 1. Metric Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                        <div>
                            <p className="text-sm text-white/50 font-medium uppercase tracking-wider">Total Products</p>
                            <h3 className="text-3xl font-bold mt-1 text-white">
                                {loading ? "..." : stats.totalProducts}
                            </h3>
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.04] text-[#E53935]">
                            <FiBox size={24} />
                        </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                        <div>
                            <p className="text-sm text-white/50 font-medium uppercase tracking-wider">Total Orders</p>
                            <h3 className="text-3xl font-bold mt-1 text-white">
                                {loading ? "..." : stats.totalOrders}
                            </h3>
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.04] text-[#E53935]">
                            <FiShoppingBag size={24} />
                        </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                        <div>
                            <p className="text-sm text-white/50 font-medium uppercase tracking-wider">Pending Attention</p>
                            <h3 className="text-3xl font-bold mt-1 text-yellow-500">
                                {loading ? "..." : stats.pendingOrders}
                            </h3>
                        </div>
                        <div className="p-4 rounded-xl bg-yellow-500/10 text-yellow-500">
                            <FiAlertCircle size={24} />
                        </div>
                    </div>
                </div>

                {/* 2. Admin Operational Instructions / Documentation Guide */}
                <div className="bg-gradient-to-r from-white/[0.03] to-transparent border border-white/10 rounded-2xl p-6 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                        <FiInfo className="text-[#E53935]" />
                        Management Instructions
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/70">
                        <div className="space-y-3 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                            <h3 className="font-semibold text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-[#E53935] rounded-full"></span>
                                Inventory Control
                            </h3>
                            <p className="leading-relaxed text-xs">
                                Use the <b>Products</b> interface to append or terminate store stock. Keep items dynamically updated with corrected catalog pricing constraints to maintain customer alignment.
                            </p>
                        </div>

                        <div className="space-y-3 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                            <h3 className="font-semibold text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-[#E53935] rounded-full"></span>
                                Order Fulfillment Lifecycle
                            </h3>
                            <p className="leading-relaxed text-xs">
                                Check the <b>Orders</b> queue daily. Ensure processing requests shift from <span className="text-yellow-400">pending</span> to relevant completion states once logistics verify secure dispatch routes.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. Direct Navigation Action Callouts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Products Action Panel */}
                    <div 
                        onClick={() => navigate("/adminPage/products")}
                        className="group bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#E53935]/40 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_4px_25px_rgba(229,57,53,0.1)]"
                    >
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-white/[0.04] text-[#E53935] rounded-xl">
                                    <FiBox size={22} />
                                </div>
                                <span className="text-xs font-semibold text-white/40 tracking-wider uppercase bg-white/5 px-2.5 py-1 rounded-full">
                                    Catalog
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-[#E53935] transition-colors">
                                Manage Products
                            </h3>
                            <p className="text-sm text-white/60 leading-relaxed mb-6">
                                View stock listings, edit pricing tags, handle image galleries, and add items into global routing channels.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#E53935] mt-auto">
                            <span>Open Catalog Control</span>
                            <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>

                    {/* Orders Action Panel */}
                    <div 
                        onClick={() => navigate("/adminPage/orders")}
                        className="group bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#E53935]/40 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_4px_25px_rgba(229,57,53,0.1)]"
                    >
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-white/[0.04] text-[#E53935] rounded-xl">
                                    <FiShoppingBag size={22} />
                                </div>
                                <span className="text-xs font-semibold text-white/40 tracking-wider uppercase bg-white/5 px-2.5 py-1 rounded-full">
                                    Logistics
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-[#E53935] transition-colors">
                                Manage Orders
                            </h3>
                            <p className="text-sm text-white/60 leading-relaxed mb-6">
                                Track pending checkouts, review delivery data tables, inspect line item subtotals, and process status transitions.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#E53935] mt-auto">
                            <span>Open Logistics Desk</span>
                            <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}