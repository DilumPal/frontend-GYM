import { Routes, Route, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import AdminProductPage from "./admin/productPage";
import AddProductPage from "./admin/addProduct";
import EditProductPage from "./admin/editProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";

export default function AdminPage(){
    const location = useLocation();
    const path = location.pathname;

    function getClass(name){
        if(path.includes(name)){
            return "bg-primary text-accent p-4"
        }else{
            return "text-white p-4 hover:bg-primary hover:text-accent transition-all duration-300 cursor-pointer"
        }
    }

    return(
        <div className="w-full h-screen flex bg-primary overflow-hidden">
            <div className="h-full w-[300px] bg-accent text-xl text-accent font-bold flex flex-col">
                <Link className={getClass("products")} to="/adminPage/products">Products</Link>
                <Link className={getClass("orders")} to="/adminPage/orders">Orders</Link>
                <Link className={getClass("users")} to="/adminPage/users">Users</Link>

            </div>
            <div className="h-full w-[calc(100%-300px)] bg-secondary border-primary border-4 rounded-xl flex flex-col overflow-hidden">
                <Routes path="/*">
                    <Route path="/products" element={<AdminProductPage/>} />
                    <Route path="/orders" element={<AdminOrdersPage/>} />
                    <Route path="/users" element={<h1>Users</h1>} />
                    <Route path="/add-product" element={<AddProductPage/>}/>
                    <Route path="/edit-product" element={<EditProductPage/>}/>
                </Routes>
            </div>
        </div>
    )
}
