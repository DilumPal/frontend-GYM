import { useState } from "react";
import { BiPlus, BiMinus, BiTrash } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage() {
    const location = useLocation();
    console.log(location.state?.cart);

    const [cart, setCart] = useState(location.state?.cart || []);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    function getTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.qty;
        });
        return total;
    }

    function removeFromCart(index) {
        const newCart = cart.filter((item, i) => i !== index);
        setCart(newCart);
    }

    function changeQty(index, qty) {
        const newQty = cart[index].qty + qty;
        if (newQty <= 0) {
            removeFromCart(index);
            return;
        } else {
            const newCart = [...cart];
            // Properly shallow copy the object to avoid direct state mutation
            newCart[index] = { ...newCart[index], qty: newQty };
            setCart(newCart);
        }
    }

    async function placeOrder() {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to place an order");
            return;
        }

        const orderInformation = {
            products: [],
            phone: phoneNumber,
            address: address,
        };

        for (let i = 0; i < cart.length; i++) {
            const item = {
                productId: cart[i].productID,
                qty: cart[i].qty,
            };
            orderInformation.products[i] = item;
        }

        try {
            const res = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/orders",
                orderInformation,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            toast.success("Order placed successfully");
            console.log(res.data);
        } catch (err) {
            console.log(err);
            toast.error("Error placing order");
            return;
        }
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center pt-4 pb-24 relative bg-primary">
            
            {/* Sticky Order Placement Card */}
            <div className="w-[300px] h-[250px] bg-secondary/[0.03] border border-secondary/10 rounded-2xl shadow-2xl absolute top-4 right-4 flex flex-col justify-center items-center p-4 gap-3 backdrop-blur-md">
                <p className="text-2xl text-secondary font-bold">Total:
                    <span className="text-accent font-bold mx-2">
                        Rs {getTotal().toFixed(2)}
                    </span>
                </p>
                <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full h-[40px] px-3 rounded-lg text-secondary bg-secondary/5 border border-secondary/10 placeholder:text-secondary/30 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Address"
                    className="w-full h-[40px] px-3 rounded-lg text-secondary bg-secondary/5 border border-secondary/10 placeholder:text-secondary/30 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <button
                    className="w-full text-secondary bg-accent py-2 rounded-lg font-bold cursor-pointer hover:bg-accent/80 transition-all duration-300 shadow-[0_4px_15px_rgba(229,57,53,0.3)]"
                    onClick={placeOrder}
                >
                    Place Order
                </button>
            </div>

            {/* Checkout Items List */}
            {cart.map((item, index) => {
                return (
                    <div key={item.productID} className="w-[600px] h-[100px] rounded-tl-3xl my-4 rounded-bl-3xl bg-secondary/[0.03] border border-secondary/10 shadow-2xl flex flex-row relative justify-center items-center">
                        <img src={item.image} className="w-[100px] h-[100px] object-cover rounded-3xl" alt={item.name} />
                        
                        <div className="w-[250px] h-full flex flex-col justify-center items-center pl-4">
                            <h1 className="text-xl text-secondary font-semibold">{item.name}</h1>
                            <h1 className="text-md text-secondary/40 font-semibold">{item.productID}</h1>
                            {item.labelledPrice > item.price ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-md text-secondary/30 line-through">Rs {item.labelledPrice.toFixed(2)}</span>
                                    <span className="text-md font-semibold text-accent">Rs {item.price.toFixed(2)}</span>
                                </div>
                            ) : (
                                <span className="text-md font-semibold text-accent">Rs {item.price.toFixed(2)}</span>
                            )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-row items-center justify-center w-[120px] h-full gap-2">
                            <button
                                aria-label="Decrease quantity"
                                className="flex items-center justify-center w-[30px] h-[30px] text-lg text-secondary transition-all duration-300 bg-accent cursor-pointer rounded-xl hover:bg-accent/80 active:scale-90"
                                onClick={() => {
                                    changeQty(index, -1);
                                }}
                            >
                                <BiMinus />
                            </button>
                            <span className="text-xl font-semibold text-secondary">{item.qty}</span>
                            <button
                                aria-label="Increase quantity"
                                className="flex items-center justify-center w-[30px] h-[30px] text-lg text-secondary transition-all duration-300 bg-accent cursor-pointer rounded-xl hover:bg-accent/80 active:scale-90"
                                onClick={() => {
                                    changeQty(index, 1);
                                }}
                            >
                                <BiPlus />
                            </button>
                        </div>

                        {/* Row Price Total */}
                        <div className="w-[200px] h-full flex flex-col justify-center items-end pr-6">
                            <h1 className="text-2xl text-secondary font-semibold">Rs {(item.price * item.qty).toFixed(2)}</h1>
                        </div>

                        {/* Item Removal Action Button */}
                        <button
                            className="absolute cursor-pointer text-accent rounded-full p-2 right-[-45px] transition-all duration-300 hover:bg-accent/20 active:scale-90"
                            onClick={() => {
                                removeFromCart(index);
                            }}
                        >
                            <BiTrash className="text-xl" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}