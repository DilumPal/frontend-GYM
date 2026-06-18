import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiCycling, BiDumbbell, BiBody, BiTrendingUp } from "react-icons/bi";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import axios from "axios";

export default function LandingPage() {
  // Dynamic state management to replace the old mock data arrays
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]); // Stores the 3 newest live reviews
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the dynamically calculated best sellers and recent reviews on mount
  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    Promise.all([
      axios.get(`${backendUrl}/api/orders/best-sellers`),
      axios.get(`${backendUrl}/api/reviews/testimonials`),
    ])
      .then(([productsRes, testimonialsRes]) => {
        setFeaturedProducts(productsRes.data);
        setTestimonials(testimonialsRes.data);
      })
      .catch((err) => {
        console.error("Failed to sync landing page data:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="w-full flex flex-col items-center text-gray-800">
      {/* 2. HERO SECTION */}
      <section className="relative w-full h-[70vh] flex items-center justify-center bg-black">
        <img
          src="/hero.jpeg"
          alt="Athletes training"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          {/* Modern Styled Brand Name */}
          <div className="mb-2">
            <span className="text-sm font-black tracking-[0.3em] uppercase bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
              Welcome To
            </span>
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter uppercase italic leading-none bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent drop-shadow-md">
              Fit<span className="text-accent not-italic">Nova</span>
            </h1>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4 uppercase text-gray-100">
            Unleash Your Potential
          </h2>
          <p className="text-lg md:text-xl mb-8 font-light text-gray-200">
            Premium gear for every athlete, backed by experts. Engineered for
            performance, built to last.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/products"
              className="bg-accent hover:bg-accent/80 text-white font-bold py-3 px-8 rounded-md transition duration-300 shadow-lg"
            >
              Shop New Arrivals
            </Link>
            <Link
              to="/search"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold py-3 px-8 rounded-md transition duration-300"
            >
              Find Your Fit
            </Link>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY GRID */}
      <section className="w-full max-w-7xl py-16 px-4">
        <h2 className="text-3xl text-secondary font-bold text-center mb-10 uppercase tracking-wide">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Cardio Equipment",
              icon: (
                <BiCycling className="text-5xl text-red-500 group-hover:scale-110 transition duration-300 mb-4" />
              ),
              path: "/products?category=cardio",
            },
            {
              title: "Strength Training Equipment",
              icon: (
                <BiDumbbell className="text-5xl text-red-500 group-hover:scale-110 transition duration-300 mb-4" />
              ),
              path: "/products?category=strength",
            },
            {
              title: "Functional Training Equipment",
              icon: (
                <BiTrendingUp className="text-5xl text-red-500 group-hover:scale-110 transition duration-300 mb-4" />
              ),
              path: "/products?category=functional",
            },
            {
              title: "Bodyweight & Flexibility Equipment",
              icon: (
                <BiBody className="text-5xl text-red-500 group-hover:scale-110 transition duration-300 mb-4" />
              ),
              path: "/products?category=flexibility",
            },
          ].map((cat, idx) => (
            <Link
              to={cat.path}
              key={idx}
              className="relative group block h-full"
            >
              {/* Neon Glow Border */}
              <div className="absolute inset-0 rounded-xl border-2 border-red-500/80 blur-[4px] opacity-80 group-hover:opacity-100 transition duration-300"></div>

              {/* Card */}
              <div className="relative flex flex-col items-center justify-center min-h-[220px] p-6 bg-neutral-900 border-2 border-red-500/40 rounded-xl transition-all duration-300 group-hover:-translate-y-2 h-full z-10">
                {cat.icon}
                <span className="font-semibold text-base text-white text-center group-hover:text-red-400 transition duration-300 px-2">
                  {cat.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (DYNAMIC BEST SELLERS) */}
      <section className="w-full bg-[#1A1A1A] py-20 px-4 flex justify-center selection:bg-[#E53935] selection:text-white">
        <div className="w-full max-w-7xl">
          {/* Modern Section Header with Accent Bar */}
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl text-white font-extrabold text-center uppercase tracking-wider">
              Best Sellers
            </h2>
            <div className="w-16 h-1 bg-[#E53935] mt-3 rounded-full"></div>
          </div>

          {/* Conditional layout for network delays/empty states */}
          {isLoading ? (
            <div className="w-full flex justify-center items-center py-20">
              {/* Spinner styled with accent color */}
              <div className="w-12 h-12 border-4 border-white/10 border-t-[#E53935] rounded-full animate-spin"></div>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center text-gray-400 py-16 text-lg tracking-wide bg-white/5 rounded-xl border border-white/10">
              No sales recorded to generate best sellers yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <div
                  key={product.productID}
                  className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 relative group flex flex-col border border-gray-100"
                >
                  {/* Image Container with Subtle Zoom */}
                  <div className="h-72 overflow-hidden relative bg-gray-50">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Premium Hover Overlay & Quick View */}
                    <div className="absolute inset-0 bg-[#1A1A1A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <Link
                        to={`/overview/${product.productID || product._id || product.id}`}
                        className="bg-white text-[#1A1A1A] text-sm font-bold tracking-wide py-2.5 px-5 rounded-md shadow-lg hover:bg-[#E53935] hover:text-white transition-all duration-200 transform scale-95 group-hover:scale-100"
                      >
                        Quick View
                      </Link>
                    </div>

                    {/* Optional: 'Hot' Badge using accent color */}
                    <div className="absolute top-3 left-3 bg-[#E53935] text-white text-xs font-bold px-2.5 py-1 rounded shadow-sm uppercase tracking-wider">
                      Top
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="p-5 flex flex-col flex-grow bg-white">
                    <h3 className="font-bold text-[#1A1A1A] text-lg mb-3 line-clamp-1 group-hover:text-[#E53935] transition-colors duration-200">
                      {product.name}
                    </h3>

                    {/* Price & Action Container */}
                    <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-50">
                      <span className="text-xl font-black text-[#1A1A1A]">
                        {product.price}
                      </span>

                      <button className="text-xs uppercase tracking-wider bg-[#1A1A1A] text-white font-bold py-2.5 px-4 rounded-md hover:bg-[#E53935] transition-colors duration-300 shadow-sm active:scale-95 transform">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. BRAND STORY */}
      <section className="w-full max-w-5xl py-20 px-4 text-center">
        <div className="relative rounded-2xl">
          {/* Neon Border Glow */}
          <div className="absolute inset-0 rounded-2xl border-2 border-accent blur-[6px] opacity-100"></div>

          {/* Main Card */}
          <div className="relative bg-primary border-2 border-accent rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-4 text-secondary uppercase tracking-wide">
              Our Story
            </h2>

            <p className="text-lg text-secondary leading-relaxed max-w-3xl mx-auto">
              Locally owned and operated since 2010. Our staff consists of
              active athletes who rigorously test every piece of gear we sell.
              We don't just sell products; we live the lifestyle. Whether you're
              hitting the pavement, the gym, or the trails,
              <strong className="text-accent"> FitNova</strong> has got your
              back.
            </p>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS (DYNAMIC RECENT REVIEWS) */}
      <section className="w-full bg-gray-900 text-white py-16 px-4 flex justify-center">
        <div className="w-full max-w-7xl text-center">
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-3xl font-bold uppercase tracking-wide text-accent">
              What Our Community Says
            </h2>
            <div className="w-12 h-1 bg-accent mt-3 rounded-full"></div>
          </div>

          {testimonials.length === 0 ? (
            <p className="text-gray-400 italic">
              No community feedback submitted yet. Be the first to review your
              gym gear!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((test) => (
                <div
                  key={test.id}
                  className="bg-neutral-900/80 backdrop-blur-sm p-6 rounded-xl text-left border-2 border-accent/20 hover:border-accent/40 transition duration-300 flex flex-col justify-between shadow-xl"
                >
                  <div>
                    {/* Render visual star rating block */}
                    <div className="text-amber-400 mb-3 text-lg select-none">
                      {"★".repeat(test.rating)}
                      {"☆".repeat(5 - test.rating)}
                    </div>
                    <p className="italic text-gray-300 text-sm leading-relaxed mb-4">
                      "{test.comment}"
                    </p>
                  </div>

                  {/* Review Metadata Container */}
                  <div className="mt-4 pt-3 border-t border-gray-800">
                    <h4 className="font-bold text-accent text-sm">
                      {test.reviewerName}
                    </h4>
                    {test.product && (
                      <span className="text-xs text-gray-400 block mt-0.5 tracking-wide">
                        Verified Buyer of:{" "}
                        <span className="text-gray-300 font-medium">
                          {test.product.name}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="w-full bg-gray-950 text-gray-400 pt-16 pb-8 px-4 flex flex-col items-center border-t border-gray-800">
        {/* Grid Container with centered items on desktop */}
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 md:justify-items-center gap-10 mb-12">
          {/* Contact Info Column */}
          <div className="w-full max-w-xs">
            <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-widest">
              Contact Us
            </h3>
            <ul className="space-y-3.5 text-slate-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>58, Old Road, Colombo</span>
              </li>
              <li>
                <a
                  href="tel:5125550199"
                  className="flex items-center gap-3 hover:text-white transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 text-white shrink-0" />
                  <span>078 194 3979</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@fitnova.com"
                  className="flex items-center gap-3 hover:text-white transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 text-white shrink-0" />
                  <span>palawaththadilum@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Store Hours Column */}
          <div className="w-full max-w-xs">
            <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-widest">
              Store Hours
            </h3>
            <ul className="space-y-3.5 text-slate-400 text-sm">
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-white shrink-0" />
                <div className="flex justify-between w-full gap-4">
                  <span>Mon - Fri</span>
                  <span className="text-white font-medium">
                    9:00 AM - 8:00 PM
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3 pl-7">
                <div className="flex justify-between w-full gap-4">
                  <span>Saturday</span>
                  <span className="text-white font-medium">
                    10:00 AM - 6:00 PM
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3 pl-7">
                <div className="flex justify-between w-full gap-4">
                  <span>Sunday</span>
                  <span className="text-white font-medium">
                    11:00 AM - 5:00 PM
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Footer Line */}
        <div className="w-full max-w-7xl border-t border-gray-900 pt-6 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} FitNova Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
