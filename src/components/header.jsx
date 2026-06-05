import { Link } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

export default function Header() {
    const [sideDrawerOpened, setSideDrawerOpened] = useState(false);

    return (
        <header className="sticky top-0 z-40 w-full h-[80px] bg-[#1A1A1A] border-b border-[#E53935]/30 shadow-[0_2px_15px_rgba(229,57,53,0.15)] flex justify-center items-center">

            {/* Mobile Menu Button */}
            <GiHamburgerMenu
                className="absolute left-4 text-3xl text-[#FFFFFF] cursor-pointer md:hidden"
                onClick={() => setSideDrawerOpened(true)}
            />

            {/* Logo */}
            <img
                src="/logo.png"
                alt="Logo"
                className="w-[80px] h-[80px] object-cover cursor-pointer bg-[#FFFFFF]"
                onClick={() => (window.location.href = "/")}
            />

            {/* Desktop Navigation */}
            <div className="hidden md:flex w-[calc(100%-160px)] h-full items-center justify-center gap-8 bg-[#1A1A1A]">
                <Link
                    to="/"
                    className="text-[#FFFFFF] text-lg font-semibold hover:text-[#E53935] transition-colors duration-300"
                >
                    Home
                </Link>

                <Link
                    to="/products"
                    className="text-[#FFFFFF] text-lg font-semibold hover:text-[#E53935] transition-colors duration-300"
                >
                    Products
                </Link>

                <Link
                    to="/search"
                    className="text-[#FFFFFF] text-lg font-semibold hover:text-[#E53935] transition-colors duration-300"
                >
                    Search
                </Link>
            </div>

            {/* Cart */}
            <div className="hidden md:flex w-[80px] h-full items-center justify-center bg-[#1A1A1A]">
                <Link
                    to="/cart"
                    className="text-3xl text-[#FFFFFF] hover:text-[#E53935] transition-colors duration-300"
                >
                    <IoCart />
                </Link>
            </div>

            {/* Mobile Drawer */}
            {sideDrawerOpened && (
                <div className="fixed inset-0 z-50 flex md:hidden bg-black/60 backdrop-blur-sm">
                    <div className="w-[280px] h-full bg-[#1A1A1A] border-r border-[#E53935]/30 shadow-xl">

                        {/* Drawer Header */}
                        <div className="w-full h-[80px] flex items-center justify-center relative border-b border-[#E53935]/30">
                            <GiHamburgerMenu
                                className="absolute left-4 text-3xl text-[#FFFFFF] cursor-pointer"
                                onClick={() => setSideDrawerOpened(false)}
                            />

                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="w-[80px] h-[80px] object-cover cursor-pointer bg-[#FFFFFF]"
                                onClick={() => {
                                    setSideDrawerOpened(false);
                                    window.location.href = "/";
                                }}
                            />
                        </div>

                        {/* Drawer Links */}
                        <div className="flex flex-col items-center py-8 gap-6">

                            <Link
                                to="/"
                                className="text-[#FFFFFF] text-xl font-semibold hover:text-[#E53935] transition-colors duration-300"
                                onClick={() => setSideDrawerOpened(false)}
                            >
                                Home
                            </Link>

                            <Link
                                to="/products"
                                className="text-[#FFFFFF] text-xl font-semibold hover:text-[#E53935] transition-colors duration-300"
                                onClick={() => setSideDrawerOpened(false)}
                            >
                                Products
                            </Link>

                            <Link
                                to="/search"
                                className="text-[#FFFFFF] text-xl font-semibold hover:text-[#E53935] transition-colors duration-300"
                                onClick={() => setSideDrawerOpened(false)}
                            >
                                Search
                            </Link>

                            <Link
                                to="/cart"
                                className="text-[#FFFFFF] text-3xl hover:text-[#E53935] transition-colors duration-300"
                                onClick={() => setSideDrawerOpened(false)}
                            >
                                <IoCart />
                            </Link>
                        </div>
                    </div>

                    {/* Click Outside to Close */}
                    <div
                        className="flex-1"
                        onClick={() => setSideDrawerOpened(false)}
                    />
                </div>
            )}
        </header>
    );
}