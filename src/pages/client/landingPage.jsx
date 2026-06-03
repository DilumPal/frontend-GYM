import React from "react";
import { Link } from "react-router-dom";
import { BiCycling, BiDumbbell, BiBody, BiTrendingUp } from "react-icons/bi";

export default function LandingPage() {
  // Mock data for Featured Products
  const featuredProducts = [
    {
      id: 1,
      name: "Apex Pro Running Shoes",
      price: "$149.99",
      rating: "⭐⭐⭐⭐⭐",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: 2,
      name: "Elite Performance Tee",
      price: "$39.99",
      rating: "⭐⭐⭐⭐☆",
      img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: 3,
      name: "Adjustable Smart Dumbbells",
      price: "$299.99",
      rating: "⭐⭐⭐⭐⭐",
      img: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: 4,
      name: "Ultralight 2-Person Tent",
      price: "$189.99",
      rating: "⭐⭐⭐⭐☆",
      img: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=500&auto=format&fit=crop&q=60",
    },
  ];

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
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 uppercase">
            Unleash Your Potential
          </h1>
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
                <BiCycling className="text-5xl text-accent group-hover:scale-110 transition duration-300 mb-4" />
              ),
              path: "/products?category=cardio",
            },
            {
              title: "Strength Training Equipment",
              icon: (
                <BiDumbbell className="text-5xl text-accent group-hover:scale-110 transition duration-300 mb-4" />
              ),
              path: "/products?category=strength",
            },
            {
              title: "Functional Training Equipment",
              icon: (
                <BiTrendingUp className="text-5xl text-accent group-hover:scale-110 transition duration-300 mb-4" />
              ),
              path: "/products?category=functional",
            },
            {
              title: "Bodyweight & Flexibility Equipment",
              icon: (
                <BiBody className="text-5xl text-accent group-hover:scale-110 transition duration-300 mb-4" />
              ),
              path: "/products?category=flexibility",
            },
          ].map((cat, idx) => (
            <Link
              to={cat.path}
              key={idx}
              className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition duration-300 text-center group"
            >
              {cat.icon}
              <span className="font-semibold text-lg text-gray-800 group-hover:text-accent transition duration-300">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS */}
      <section className="w-full bg-gray-100 py-16 px-4 flex justify-center">
        <div className="w-full max-w-7xl">
          <h2 className="text-3xl text-secondary font-bold text-center mb-10 uppercase tracking-wide">
            Best Sellers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition duration-300 relative group flex flex-col"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  {/* Hover Action Button */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <Link
                      to={`/overview/${product.id}`}
                      className="bg-white text-gray-900 font-semibold py-2 px-4 rounded shadow-md hover:bg-gray-100 transition"
                    >
                      Quick View
                    </Link>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <span className="text-sm text-yellow-500 mb-1">
                    {product.rating}
                  </span>
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xl font-extrabold text-gray-900">
                      {product.price}
                    </span>
                    <button className="text-sm bg-gray-900 text-white py-1.5 px-3 rounded hover:bg-accent transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BRAND STORY */}
      <section className="w-full max-w-5xl py-20 px-4 text-center">
        <div className="bg-accent border border-accent rounded-2xl p-8 md:p-12 shadow-sm">
          <h2 className="text-3xl font-bold mb-4 text-accent">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Locally owned and operated since 2010. Our staff consists of active
            athletes who rigorously test every piece of gear we sell. We don't
            just sell products; we live the lifestyle. Whether you're hitting
            the pavement, the gym, or the trails, we've got your back.
          </p>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="w-full bg-gray-900 text-white py-16 px-4 flex justify-center">
        <div className="w-full max-w-7xl text-center">
          <h2 className="text-3xl font-bold mb-10 uppercase tracking-wide text-accent">
            What Our Community Says
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                quote:
                  "The Apex shoes cut 2 minutes off my 5K time. Incredible customer service too!",
                role: "Marathon Runner",
              },
              {
                name: "David K.",
                quote:
                  "Top tier gym equipment. Best investment I've made for my garage setup.",
                role: "Powerlifter",
              },
              {
                name: "Jessica T.",
                quote:
                  "The outdoor gear stood up to a full weekend of heavy rainfall perfectly.",
                role: "Backpacker",
              },
            ].map((test, idx) => (
              <div
                key={idx}
                className="bg-gray-800 p-6 rounded-lg text-left border border-gray-700"
              >
                <p className="italic text-gray-300 mb-4">"{test.quote}"</p>
                <h4 className="font-bold text-accent">{test.name}</h4>
                <span className="text-xs text-gray-400">{test.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="w-full bg-gray-950 text-gray-400 pt-16 pb-8 px-4 flex flex-col items-center border-t border-gray-800">
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Newsletter Sign-up */}
          <div className="md:col-span-1">
            <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-wider">
              Join Our Crew
            </h3>
            <p className="text-sm mb-4">
              Subscribe to get training tips, product drops, and 10% off your
              first order.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2.5 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-accent text-sm"
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent-hover text-white py-2 rounded font-semibold text-sm transition"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/returns" className="hover:text-white transition">
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link to="/sizes" className="hover:text-white transition">
                  Size Guides
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-white transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-white transition">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li>📍 123 Performance Way, Austin, TX</li>
              <li>📞 (512) 555-0199</li>
              <li>✉️ support@yourbrand.com</li>
            </ul>
          </div>

          {/* Store Hours */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-wider">
              Store Hours
            </h3>
            <ul className="space-y-2 text-sm">
              <li>Mon - Fri: 9:00 AM - 8:00 PM</li>
              <li>Saturday: 10:00 AM - 6:00 PM</li>
              <li>Sunday: 11:00 AM - 5:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="w-full max-w-7xl border-t border-gray-900 pt-6 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Athletic Edge Store. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
}
