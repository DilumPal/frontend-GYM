import { Link } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

export default function Header() {
    const [sideDrawerOpened, setSideDrawerOpened] = useState(false);

    return (
        <header className="w-full h-[80px] bg-black border-b border-[#08CB00]/20 shadow-lg flex justify-center items-center relative">

            {/* Mobile Menu Button */}
            <GiHamburgerMenu
                className="absolute left-4 text-3xl text-[#EEEEEE] cursor-pointer md:hidden"
                onClick={() => setSideDrawerOpened(true)}
            />

            {/* Logo */}
            <img
                src="/logo.png"
                alt="Logo"
                className="w-[80px] h-[80px] object-cover cursor-pointer bg-white"
                onClick={() => (window.location.href = "/")}
            />

            {/* Desktop Navigation */}
            <div className="hidden md:flex w-[calc(100%-160px)] h-full items-center justify-center gap-8 bg-black">
                <Link
                    to="/"
                    className="text-[#EEEEEE] text-lg font-semibold hover:text-[#08CB00] transition-colors"
                >
                    Home
                </Link>

                <Link
                    to="/products"
                    className="text-[#EEEEEE] text-lg font-semibold hover:text-[#08CB00] transition-colors"
                >
                    Products
                </Link>

                <Link
                    to="/search"
                    className="text-[#EEEEEE] text-lg font-semibold hover:text-[#08CB00] transition-colors"
                >
                    Search
                </Link>
            </div>

            {/* Cart */}
            <div className="hidden md:flex w-[80px] h-full items-center justify-center bg-black">
                <Link
                    to="/cart"
                    className="text-3xl text-[#EEEEEE] hover:text-[#08CB00] transition-colors"
                >
                    <IoCart />
                </Link>
            </div>

            {/* Mobile Drawer */}
            {sideDrawerOpened && (
                <div className="fixed inset-0 z-50 flex md:hidden bg-black/70 backdrop-blur-sm">
                    <div className="w-[280px] h-full bg-[#111111] border-r border-[#08CB00]/20 shadow-xl">

                        {/* Drawer Header */}
                        <div className="w-full h-[80px] flex items-center justify-center relative border-b border-[#08CB00]/20">
                            <GiHamburgerMenu
                                className="absolute left-4 text-3xl text-[#EEEEEE] cursor-pointer"
                                onClick={() => setSideDrawerOpened(false)}
                            />

                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="w-[80px] h-[80px] object-cover cursor-pointer bg-white"
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
                                className="text-[#EEEEEE] text-xl font-semibold hover:text-[#08CB00] transition-colors"
                                onClick={() => setSideDrawerOpened(false)}
                            >
                                Home
                            </Link>

                            <Link
                                to="/products"
                                className="text-[#EEEEEE] text-xl font-semibold hover:text-[#08CB00] transition-colors"
                                onClick={() => setSideDrawerOpened(false)}
                            >
                                Products
                            </Link>

                            <Link
                                to="/search"
                                className="text-[#EEEEEE] text-xl font-semibold hover:text-[#08CB00] transition-colors"
                                onClick={() => setSideDrawerOpened(false)}
                            >
                                Search
                            </Link>

                            <Link
                                to="/cart"
                                className="text-[#EEEEEE] text-3xl hover:text-[#08CB00] transition-colors"
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