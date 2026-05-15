import { Link, useNavigate } from "react-router-dom";
import UserData from "./userData";
import { IoCart } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi"
import { useState } from "react";

export default function Header(){
    const [sideDrawerOpened, setSideDrawerOpened] = useState(false)
    const navigate = useNavigate()

    return(
        <header className="w-full h-[80px] shadow-2xl flex justify-center relative" >
            <GiHamburgerMenu className="h-full mx-2 text-3xl md:hidden absolute left-2" onClick={()=>{
                setSideDrawerOpened(true)
            }}/>
            <img src="/logo.png" alt="Logo" className="w-[80px] h-[80px] object-cover cursor-pointer top-0 left-0 m-2" />
            <div className="w-[calc(100%-160px)] h-full bg-accent hidden md:flex justify-center items-center">
                <Link to="/" className= "text-[20px] font-bold mx-2">Home</Link>
                <Link to="/products" className="text-[20px] font-bold mx-2">Products</Link>
                <Link to="/about" className="text-[20px] font-bold mx-2">About</Link>
                <Link to="/contact" className="text-[20px] font-bold mx-2">Contact</Link>
                <Link to="/search" className="text-[20px] font-bold mx-2">Search</Link>
            </div>
            <div className="w-[80px] bg-green-300 hidden md:flex justify-center items-center">
                <Link to="/cart" className="text-[20px] font-bold mx-2">
                    <IoCart/>
                </Link>
            </div>
            {
                sideDrawerOpened&&
                <div className="fixed h-screen w-full bg-[#00000060] flex md:hidden">
                    <div className="w-[250px] bg-white h-full">
                        <div className="w-full h-[80px] shadow-2xl flex justify-center items-center relative">
                            <GiHamburgerMenu className="h-full text-3xl absolute left-2 cursor-pointer" onClick={()=>{
                                setSideDrawerOpened(false)
                            }}/>
                            <img onClick={()=>{
                                window.location.href = "/"
                            }} src="/logo.png" alt="Logo" className="w-[80px] h-[80px] object-cover cursor-pointer"/>
                        </div>
                        <div className="w-full h-[calc(100%-80px)] flex flex-col items-center gap-2">
                            <a href="/" className="text-[20px] font-bold mx-2 my-4">Home</a>
                            <a href="/products" className="text-[20px] font-bold mx-2 my-4">Products</a>
                            <a href="/about" className="text-[20px] font-bold mx-2 my-4">About</a>
                            <a href="/contact" className="text-[20px] font-bold mx-2 my-4">Contact</a>
                            <a href="/cart" className="text-[20px] font-bold mx-2 my-4"><IoCart/></a>
                        </div>
                    </div>
                </div>
            }
        </header>
    )
}