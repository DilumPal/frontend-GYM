import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header(){
    return(
        <header className="w-full h-[80px] shadow-2xl flex" >
            <img src="/logo.png" alt="Logo" className="w-[80px] h-[80px] object-cover cursor-pointer top-0 left-0 m-2" />
            <div className="w-[calc(100%-160px)] h-full bg-accent flex justify-center items-center">
                <Link to="/" className= "text-[20px] font-bold mx-2">Home</Link>
                <Link to="/products" className="text-[20px] font-bold mx-2">Products</Link>
                <Link to="/about" className="text-[20px] font-bold mx-2">About</Link>
                <Link to="/contact" className="text-[20px] font-bold mx-2">Contact</Link>
            </div>
            <div className="w-[80px] bg-green-300">
                
            </div>
        </header>
    )
}