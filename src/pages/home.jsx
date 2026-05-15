import Header from "../components/header";
import { Routes, Route } from "react-router-dom"
import ProductPage from "./client/productPage";
import ProductOverview from "./client/productOverview";
import Cart from "./client/cart";
import CheckoutPage from "./client/checkOut";
import SearchProductPage from "./client/searchProducts";

export default function HomePage(){
    return(
        <div className="w-full h-screen flex flex-col items-center">
            <Header/>
            <div className="w-full h-[calc(100%-80px)] flex flex-col items-center">
                <Routes path="/*">
                    <Route path="/" element={<h1>Home</h1>}/>
                    <Route path="/products" element={<ProductPage/>}/>
                    <Route path="/about" element={<h1>About</h1>}/>
                    <Route path="/overview/:productId" element={<ProductOverview/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/checkout" element={<CheckoutPage/>}/>
                    <Route path="/search" element={<SearchProductPage/>}/>
                    <Route path="/contact" element={<h1>Contact</h1>}/>
                    <Route path="/*" element={<h1>404 not found</h1>}/>
                </Routes>
            </div>
        </div>
    )
}