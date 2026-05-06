import { useState } from "react"
import { BiPlus, BiMinus, BiTrash } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { removeFromCart } from "../../utils/cart";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage() {
    const location = useLocation()
    console.log(location.state.cart)

    const [cart, setCart] = useState(location.state?.cart || []);
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")

    function getTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.qty
        });
        return total
    }

    function removeFromCart(index) {
        const newCart = cart.filter((item, i) => i != index)
        setCart(newCart)
    }

    function changeQty(index, qty) {
        const newQty = cart[index].qty + qty
        if (newQty <= 0) {
            removeFromCart(index)
            return
        } else {
            const newCart = [...cart]
            cart[index].qty = newQty
            setCart(newCart)
        }
    }

    async function placeOrder() {
        const token = localStorage.getItem("token")
        if (!token) {
            toast.error("Please login to place an order")
            return
        }

        const orderInformation = {
            products : [],
            phone : phoneNumber,
            address : address
        }

        for (let i = 0; i < cart.length; i++) {
            const item = {
                productID: cart[i].productID,
                qty: cart[i].qty
            }
            orderInformation.products[i] = item
        }

        try {
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders", orderInformation, {
                headers: {
                    Authorization: "Bearer" + token
                }
            })
            toast.success("Order placed successfully")
            console.log(res.data)
        } catch (err) {
            console.log(err)
            toast.error("Error placing order")
            return
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center pt-4 relative">
            <div className="w-[300px] h-[200px] bg-primary rounded-2xl shadow-2xl absolute top-1 right-1 flex flex-col justify-center items-center p-1 gap-1">
                <p className="text-2xl py-4 text-secondary font-bold">Total:
                    <span className="text-accent font-bold mx-2">
                        Rs {getTotal().toFixed(2)}
                    </span>
                </p>
                <input 
                    type="text"
                    placeholder="phone Number"
                    className="w-full h-[40px] px-2 rounded-lg text-secondary border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                    value={phoneNumber}
                    onChange={(e)=>setPhoneNumber(e.target.value)} 
                />
                <input 
                    type="text"
                    placeholder="Address"
                    className="w-full h-[40px] px-2 rounded-lg text-secondary border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)} 
                />
                <button className="text-white bg-accent px-4 py-1 rounded-lg font-bold cursor-pointer hover:bg-accent/80 transition-all duration-300" onClick={placeOrder}>
                    Place Order
                </button>
            </div>
            {
                cart.map(
                    (item, index) => {
                        return (
                            <div key={item.productID} className="w-[600px] h-[100px] rounded-tl-3xl my-4 rounded-bl-3xl bg-primary shadow-2xl flex flex-row relative justify-center items-center">
                                <img src={item.image} className="w-[100px] h-[100px] object-cover rounded-3xl" />
                                <div className="w-[250px] h-full flex flex-col justify-center items-center pl-4">
                                    <h1 className="text-xl text-secondary font-semibold">{item.name}</h1>
                                    <h1 className="text-md text-gray-400 font-semibold">{item.productID}</h1>
                                    {
                                        item.labelledPrice > item.price ?
                                            <div>
                                                <span className="text-md mx-1 text-gray-500 line-through">{item.labelledPrice.toFixed(2)}</span>
                                                <span className="text-md mx-1 text-green-500">Rs {item.price.toFixed(2)}</span>
                                            </div>
                                            :
                                            <span className="text-md mx-1 text-green-500">Rs {item.price.toFixed(2)}</span>
                                    }
                                </div>
                                <div className="flex flex-row items-center justify-center w-[100px] h-full">
                                    <button aria-label="Decrease quantity" className="flex items-center justify-center w-[30px] h-[30px] mx-4 text-3xl text-white transition-all duration-300 bg-green-500 cursor-pointer rounded-xl hover:bg-green-600/80 active:scale-90" onClick={() => {
                                        changeQty(index, -1)
                                    }}><BiMinus /></button>
                                    <span className="mx text-2xl font-semibold text-secondary">{item.qty}</span>
                                    <button aria-label="Increase quantity" className="flex items-center justify-center w-[30px] h-[30px] mx-4 text-3xl text-white transition-all duration-300 bg-green-500 cursor-pointer rounded-xl hover:bg-green-600/80 active:scale-90" onClick={() => {
                                        changeQty(index, 1)
                                    }}><BiPlus /></button>
                                </div>
                                <div className="w-[200px] h-full flex flex-col justify-center items-end pr-4">
                                    <h1 className="text-2xl text-secondary font-semibold">Rs {(item.price * item.qty).toFixed(2)}</h1>
                                </div>
                                <button className="absolute cursor-pointer text-red-500 rounded-full p-2 right-[-40px] transition-all duration-300 hover:bg-red-600/80 active:scale-90 hover:text-white" onClick={() => {
                                    removeFromCart(index)
                                }}>
                                    <BiTrash />
                                </button>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}