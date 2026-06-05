import { useState } from "react";
import { addToCart, getCart, getTotal, removeFromCart } from "../../utils/cart";
import { BiPlus, BiMinus, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Cart() {
    const [cart, setCart] = useState(getCart());

    return (
        <div className="w-full min-h-screen h-auto flex flex-col items-center pt-4 pb-24 relative bg-[#1A1A1A]">
            
            {/* Desktop Total Sticky Card */}
            <div className="hidden w-[300px] h-[120px] bg-[#1A1A1A] border border-white/10 rounded-2xl shadow-2xl absolute bottom-1 md:top-4 right-4 md:flex flex-col justify-center items-center">
                <p className="text-2xl py-4 text-white font-bold">Total:
                    <span className="text-[#E53935] font-bold mx-2">
                        Rs {getTotal().toFixed(2)}
                    </span>
                </p>
                <Link to="/checkout" state={{ cart: cart }} 
                    className="text-white bg-[#E53935] px-6 py-2 rounded-xl font-bold hover:bg-[#E53935]/80 transition-all duration-300 shadow-[0_4px_15px_rgba(229,57,53,0.3)]"
                >
                    Checkout
                </Link>
            </div>

            {/* Cart Items List */}
            {cart.map((item) => {
                return (
                    <div key={item.productID} className="w-[70%] md:w-[600px] md:h-[100px] rounded-tl-3xl my-4 rounded-bl-3xl bg-white/[0.03] border border-white/10 shadow-2xl flex flex-col md:flex-row relative justify-center items-center p-2 md:p-0">
                        <img src={item.image} className="w-[100px] h-[100px] object-cover rounded-3xl" />
                        
                        <div className="w-[250px] h-full flex flex-col justify-center items-center pl-4">
                            <h1 className="text-xl text-white font-semibold">{item.name}</h1>
                            <h1 className="text-md text-white/40 font-semibold">{item.productID}</h1>
                            {item.labelledPrice > item.price ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-md text-white/30 line-through">Rs {item.labelledPrice.toFixed(2)}</span>
                                    <span className="text-md font-semibold text-[#E53935]">Rs {item.price.toFixed(2)}</span>
                                </div>
                            ) : (
                                <span className="text-md font-semibold text-[#E53935]">Rs {item.price.toFixed(2)}</span>
                            )}
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex flex-row items-center justify-center w-[120px] h-full gap-2">
                            <button 
                                aria-label="Decrease quantity"
                                className="flex items-center justify-center w-[30px] h-[30px] text-lg text-white transition-all duration-300 bg-[#E53935] cursor-pointer rounded-xl hover:bg-[#E53935]/80 active:scale-90" 
                                onClick={() => {
                                    addToCart(item, -1);
                                    setCart(getCart());
                                }}
                            >
                                <BiMinus />
                            </button>
                            <span className="text-xl font-semibold text-white">{item.qty}</span>
                            <button 
                                aria-label="Increase quantity"
                                className="flex items-center justify-center w-[30px] h-[30px] text-lg text-white transition-all duration-300 bg-[#E53935] cursor-pointer rounded-xl hover:bg-[#E53935]/80 active:scale-90" 
                                onClick={() => {
                                    addToCart(item, 1);
                                    setCart(getCart());
                                }}
                            >
                                <BiPlus />
                            </button>
                        </div>

                        {/* Total Calculated Item Price */}
                        <div className="w-[150px] h-full flex flex-col justify-center items-center md:items-end pr-6">
                            <h1 className="text-2xl text-white font-semibold">Rs {(item.price * item.qty).toFixed(2)}</h1>
                        </div>

                        {/* Trash Button */}
                        <button 
                            className="absolute cursor-pointer text-[#E53935] rounded-full p-2 right-[-45px] transition-all duration-300 hover:bg-[#E53935]/20 active:scale-90" 
                            onClick={() => {
                                removeFromCart(item.productID);
                                  setCart(getCart());
                            }}
                        >
                            <BiTrash className="text-xl" />
                        </button>
                    </div>
                );
            })}

            {/* Mobile Total Bottom Card */}
            <div className="z-50 w-full md:hidden h-[120px] bg-[#1A1A1A] border-t border-white/10 shadow-2xl flex flex-col justify-center items-center mt-auto fixed bottom-0 left-0">
                <p className="text-2xl py-2 text-white font-bold">Total:
                    <span className="text-[#E53935] font-bold mx-2">
                        Rs {getTotal().toFixed(2)}
                    </span>
                </p>
                <Link to="/checkout" state={{ cart: cart }} 
                    className="text-white bg-[#E53935] px-6 py-2 rounded-xl font-bold hover:bg-[#E53935]/80 transition-all duration-300 shadow-[0_4px_15px_rgba(229,57,53,0.3)]"
                >
                    Checkout
                </Link>
            </div>
        </div>
    );
}