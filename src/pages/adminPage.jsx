import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import AdminProductPage from "./admin/adminProductPage";
export default function AdminPage(){
    return(
        <div className="w-full h-screen flex">
            <div className="h-full w-[300px] bg-green-800 flex flex-col">
                <Link to="/adminPage/products">Products</Link>
                <Link to="/adminPage/orders">Orders</Link>
                <Link to="/adminPage/users">Users</Link>

            </div>
            <div className="h-full w-[calc(100%-300px)] bg-green-300">
                <Routes path="/*">
                    <Route path="/products" element={<AdminProductPage/>} />
                    <Route path="/orders" element={<h1>Orders</h1>} />
                    <Route path="/users" element={<h1>Users</h1>} />
                </Routes>
            </div>
        </div>
    )
}
