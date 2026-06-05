import { Routes, Route, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import AdminProductPage from "./admin/productPage";
import AddProductPage from "./admin/addProduct";
import EditProductPage from "./admin/editProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/loding";
import { FiBox, FiShoppingBag, FiUsers, FiLogOut } from "react-icons/fi"; // Added clean modern outline icons

export default function AdminPage() {
    const location = useLocation();
    const path = location.pathname;
    const [status, setStatus] = useState("Loading");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setStatus("Unauthorized");
            window.location.href = "/login";
            return;
        } else {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                console.log("Frontend received user data:", response.data);
                if (response.data.role !== "admin") {
                    setStatus("Unauthorized");
                    toast.error("You are not authorized to access this page");
                    window.location.href = "/login";
                } else {
                    setStatus("Authorized");
                }
            }).catch((error) => {
                setStatus("Unauthorized");
                window.location.href = "/login";
            });
        }
    }, []);

    // Clear modern styling variations for active vs inactive tabs
    function getClass(name) {
        const baseStyle = "flex items-center gap-4 px-6 py-4 mx-3 my-1 rounded-xl font-medium transition-all duration-300 relative group";
        if (path.includes(name)) {
            return `${baseStyle} bg-[#E53935] text-white shadow-[0_4px_20px_rgba(229,57,53,0.3)]`;
        } else {
            return `${baseStyle} text-white/70 hover:bg-white/5 hover:text-white`;
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <div className="w-full h-screen flex bg-[#1A1A1A] overflow-hidden antialiased">
            {status === "Loading" ? <Loading /> :
            <>
                {/* Modernized Sidebar */}
                <div className="h-full w-[280px] bg-[#1A1A1A] border-r border-white/10 flex flex-col justify-between py-6">
                    <div>
                        {/* Brand Header */}
                        <div className="px-7 mb-10 flex items-center gap-2">
                            <div className="w-3 h-6 bg-[#E53935] rounded-full"></div>
                            <span className="text-white text-2xl font-bold tracking-tight">
                                Control Panel
                            </span>
                        </div>

                        {/* Navigation Options */}
                        <nav className="flex flex-col gap-1">
                            <Link className={getClass("products")} to="/adminPage/products">
                                <FiBox className="text-xl" />
                                <span>Products</span>
                                {!path.includes("products") && <div className="absolute left-0 w-1 h-5 bg-[#E53935] rounded-r-md scale-y-0 group-hover:scale-y-100 transition-transform origin-center"></div>}
                            </Link>
                            
                            <Link className={getClass("orders")} to="/adminPage/orders">
                                <FiShoppingBag className="text-xl" />
                                <span>Orders</span>
                                {!path.includes("orders") && <div className="absolute left-0 w-1 h-5 bg-[#E53935] rounded-r-md scale-y-0 group-hover:scale-y-100 transition-transform origin-center"></div>}
                            </Link>
                            
                            <Link className={getClass("users")} to="/adminPage/users">
                                <FiUsers className="text-xl" />
                                <span>Users</span>
                                {!path.includes("users") && <div className="absolute left-0 w-1 h-5 bg-[#E53935] rounded-r-md scale-y-0 group-hover:scale-y-100 transition-transform origin-center"></div>}
                            </Link>
                        </nav>
                    </div>

                    {/* Footer Actions (Logout Button) */}
                    <div className="px-3">
                        <button 
                            onClick={handleLogout}
                            className="w-full flex items-center gap-4 px-6 py-4 rounded-xl font-medium text-white/50 hover:bg-red-500/10 hover:text-[#E53935] transition-all duration-300"
                        >
                            <FiLogOut className="text-xl" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>

                {/* Main Dynamic Content Display Panel */}
                <div className="h-full w-[calc(100%-280px)] p-5 bg-[#1A1A1A]">
                    <div className="h-full w-full bg-white text-[#1A1A1A] rounded-2xl flex flex-col overflow-y-auto shadow-inner border border-white/5">
                        <Routes path="/*">
                            <Route path="/products" element={<AdminProductPage />} />
                            <Route path="/orders" element={<AdminOrdersPage />} />
                            <Route path="/users" element={<h1 className="p-6 text-2xl font-bold">Users Management</h1>} />
                            <Route path="/add-product" element={<AddProductPage />} />
                            <Route path="/edit-product" element={<EditProductPage />} />
                        </Routes>
                    </div>
                </div>
            </>
            }
        </div>
    );
}