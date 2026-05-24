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

    function getClass(name) {
        if (path.includes(name)) {
            return "bg-primary text-accent p-4"
        } else {
            return "text-white p-4 hover:bg-primary hover:text-accent transition-all duration-300 cursor-pointer"
        }
    }

    return (
        
        <div className="w-full h-screen flex bg-primary overflow-hidden">
            {status === "Loading"? <Loading /> :
            <>
            <div className="h-full w-[300px] bg-accent text-xl text-accent font-bold flex flex-col">
                <Link className={getClass("products")} to="/adminPage/products">Products</Link>
                <Link className={getClass("orders")} to="/adminPage/orders">Orders</Link>
                <Link className={getClass("users")} to="/adminPage/users">Users</Link>

            </div>
            <div className="h-full w-[calc(100%-300px)] bg-secondary border-primary border-4 rounded-xl flex flex-col overflow-hidden">
                <Routes path="/*">
                    <Route path="/products" element={<AdminProductPage />} />
                    <Route path="/orders" element={<AdminOrdersPage />} />
                    <Route path="/users" element={<h1>Users</h1>} />
                    <Route path="/add-product" element={<AddProductPage />} />
                    <Route path="/edit-product" element={<EditProductPage />} />
                </Routes>
            </div>
            </>
        }
        </div>
        
        
    )
}
