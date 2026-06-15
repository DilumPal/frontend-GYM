import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect } from "react";

export default function Header() {
  const [sideDrawerOpened, setSideDrawerOpened] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check login status every time the route changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  // Handle logging out
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

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
        <Link to="/" className="text-secondary text-lg font-semibold hover:text-accent transition-colors duration-300">
          Home
        </Link>
        <Link to="/products" className="text-secondary text-lg font-semibold hover:text-accent transition-colors duration-300">
          Products
        </Link>
        <Link to="/search" className="text-secondary text-lg font-semibold hover:text-accent transition-colors duration-300">
          Search
        </Link>
      </div>

      {/* Cart & Desktop Actions */}
      <div className="flex items-center gap-6 md:absolute md:right-8 h-full bg-primary">
        <Link to="/cart" className="text-3xl text-secondary hover:text-accent transition-colors duration-300">
          <IoCart />
        </Link>

        {/* Desktop Conditional Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-secondary font-semibold hover:text-accent transition">
                Login
              </Link>
              <Link to="/signup" className="bg-accent text-white px-4 py-2 rounded-md font-semibold hover:bg-accent/80 transition">
                Sign Up
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="border border-accent text-accent px-4 py-2 rounded-md font-semibold hover:bg-accent hover:text-white transition">
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {sideDrawerOpened && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/60 backdrop-blur-sm">
          <div className="w-[280px] h-full bg-primary border-r border-accent/30 shadow-xl flex flex-col justify-between">
            <div>
              {/* Drawer Header */}
              <div className="w-full h-[80px] flex items-center justify-between px-4 border-b border-accent/30">
                <GiHamburgerMenu className="text-3xl text-secondary cursor-pointer" onClick={() => setSideDrawerOpened(false)} />
                <Link to="/" onClick={() => setSideDrawerOpened(false)} className="flex items-center justify-center p-1">
                  <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain" />
                </Link>
                <div className="w-6" />
              </div>

              {/* Drawer Links */}
              <div className="flex flex-col items-center py-8 gap-6">
                <Link to="/" className="text-secondary text-xl font-semibold hover:text-accent transition-colors duration-300" onClick={() => setSideDrawerOpened(false)}>
                  Home
                </Link>
                <Link to="/products" className="text-secondary text-xl font-semibold hover:text-accent transition-colors duration-300" onClick={() => setSideDrawerOpened(false)}>
                  Products
                </Link>
                <Link to="/search" className="text-secondary text-xl font-semibold hover:text-accent transition-colors duration-300" onClick={() => setSideDrawerOpened(false)}>
                  Search
                </Link>
                <Link to="/cart" className="text-secondary text-3xl hover:text-accent transition-colors duration-300" onClick={() => setSideDrawerOpened(false)}>
                  <IoCart />
                </Link>
              </div>
            </div>

            {/* Mobile Conditional Auth Buttons (Bottom of Drawer) */}
            <div className="flex flex-col items-center pb-8 px-4 gap-4 w-full">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="w-full text-center text-secondary py-2 font-semibold border border-secondary/20 rounded-md" onClick={() => setSideDrawerOpened(false)}>
                    Login
                  </Link>
                  <Link to="/signup" className="w-full text-center bg-accent text-white py-2 rounded-md font-semibold" onClick={() => setSideDrawerOpened(false)}>
                    Sign Up
                  </Link>
                </>
              ) : (
                <button onClick={() => { handleLogout(); setSideDrawerOpened(false); }} className="w-full bg-accent text-white py-2 rounded-md font-semibold">
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Click Outside to Close */}
          <div className="flex-1" onClick={() => setSideDrawerOpened(false)} />
        </div>
      )}
    </header>
  );
}