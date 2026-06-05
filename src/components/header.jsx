import { Link } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

export default function Header() {
  const [sideDrawerOpened, setSideDrawerOpened] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full h-[80px] bg-primary border-b border-accent/30 shadow-[0_2px_15px_rgba(229,57,53,0.15)] flex justify-between md:justify-center items-center px-4 md:px-0">
      {/* Mobile Menu Button */}
      <GiHamburgerMenu
        className="text-3xl text-secondary cursor-pointer md:hidden"
        onClick={() => setSideDrawerOpened(true)}
      />

      {/* Modern Logo Container */}
      <Link
        to="/"
        className="flex items-center justify-center p-2 transition-all duration-300 hover:scale-105 md:absolute md:left-8"
      >
        <img
          src="/logo.png"
          alt="FitNova Logo"
          className="h-20 w-auto object-contain mix-blend-screen invert hue-rotate-180 contrast-125"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-center gap-8 h-full bg-primary">
        <Link
          to="/"
          className="text-secondary text-lg font-semibold hover:text-accent transition-colors duration-300"
        >
          Home
        </Link>

        <Link
          to="/products"
          className="text-secondary text-lg font-semibold hover:text-accent transition-colors duration-300"
        >
          Products
        </Link>

        <Link
          to="/search"
          className="text-secondary text-lg font-semibold hover:text-accent transition-colors duration-300"
        >
          Search
        </Link>
      </div>

      {/* Cart & Actions */}
      <div className="flex w-[80px] md:w-auto h-full items-center justify-center md:absolute md:right-8 bg-primary">
        <Link
          to="/cart"
          className="text-3xl text-secondary hover:text-accent transition-colors duration-300"
        >
          <IoCart />
        </Link>
      </div>

      {/* Mobile Drawer */}
      {sideDrawerOpened && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/60 backdrop-blur-sm">
          <div className="w-[280px] h-full bg-primary border-r border-accent/30 shadow-xl flex flex-col">
            {/* Drawer Header */}
            <div className="w-full h-[80px] flex items-center justify-between px-4 border-b border-accent/30">
              <GiHamburgerMenu
                className="text-3xl text-secondary cursor-pointer"
                onClick={() => setSideDrawerOpened(false)}
              />
              <Link
                to="/"
                onClick={() => setSideDrawerOpened(false)}
                className="flex items-center justify-center p-1 transition-transform duration-300 hover:scale-105"
              >
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <div className="w-6" /> {/* Spacer for symmetry */}
            </div>

            {/* Drawer Links */}
            <div className="flex flex-col items-center py-8 gap-6">
              <Link
                to="/"
                className="text-secondary text-xl font-semibold hover:text-accent transition-colors duration-300"
                onClick={() => setSideDrawerOpened(false)}
              >
                Home
              </Link>

              <Link
                to="/products"
                className="text-secondary text-xl font-semibold hover:text-accent transition-colors duration-300"
                onClick={() => setSideDrawerOpened(false)}
              >
                Products
              </Link>

              <Link
                to="/search"
                className="text-secondary text-xl font-semibold hover:text-accent transition-colors duration-300"
                onClick={() => setSideDrawerOpened(false)}
              >
                Search
              </Link>

              <Link
                to="/cart"
                className="text-secondary text-3xl hover:text-accent transition-colors duration-300"
                onClick={() => setSideDrawerOpened(false)}
              >
                <IoCart />
              </Link>
            </div>
          </div>

          {/* Click Outside to Close */}
          <div className="flex-1" onClick={() => setSideDrawerOpened(false)} />
        </div>
      )}
    </header>
  );
}
