import { useState } from "react"
import { addToCart, getCart, getTotal, removeFromCart } from "../../utils/cart"
import { BiPlus, BiMinus, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Cart() {
    const [cart, setCart] = useState(getCart())

    return (
        <div className="w-full h-full flex flex-col items-center pt-4 relative">
            <div className="z-50 hidden w-[300px] h-[120px] bg-primary rounded-2xl shadow-2xl absolute bottom-1 md:top-1 right-1 md:flex flex-col justify-center items-center">
                <p className="text-2xl py-4 text-secondary font-bold">Total:
                    <span className="text-accent font-bold mx-2">
                        {getTotal().toFixed(2)}
                    </span>
                </p>
                <Link to="/checkout" state={
                    {
                        cart: cart
                    }
                } className="text-white bg-accent px-4 py-1 rounded-lg font-bold hover:bg-accent/80 transition-all duration-300">
                    Checkout
                </Link>
            </div>
            {
                cart.map(
                    (item) => {
                        return (
                            <div key={item.productID} className="w-[70%] md:w-[600px] md:h-[100px] rounded-tl-3xl my-4 rounded-bl-3xl bg-primary shadow-2xl flex flex-col md:flex-row relative justify-center items-center p-2 md:p-0">
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
                                    <button aria-label="Decrease quantity"className="flex items-center justify-center w-[30px] h-[30px] mx-4 text-3xl text-white transition-all duration-300 bg-green-500 cursor-pointer rounded-xl hover:bg-green-600/80 active:scale-90" onClick={()=>{
                                        addToCart(item,-1)
                                        setCart(getCart())
                                    }}><BiMinus /></button>
                                    <span className="mx text-2xl font-semibold text-secondary">{item.qty}</span>
                                    <button aria-label="Increase quantity"className="flex items-center justify-center w-[30px] h-[30px] mx-4 text-3xl text-white transition-all duration-300 bg-green-500 cursor-pointer rounded-xl hover:bg-green-600/80 active:scale-90" onClick={()=>{
                                        addToCart(item,1)
                                        setCart(getCart())
                                    }}><BiPlus /></button>
                                </div>
                                <div className="w-[200px] h-full flex flex-col justify-center items-center md:items-end pr-4">
                                    <h1 className="text-2xl text-secondary font-semibold">Rs {(item.price*item.qty).toFixed(2)}</h1>
                                </div>
                                <button className="absolute cursor-pointer text-red-500 rounded-full p-2 right-[-40px] transition-all duration-300 hover:bg-red-600/80 active:scale-90 hover:text-white" onClick={()=>{
                                    removeFromCart(item.productID)
                                    setCart(getCart())
                                }}>
                                    <BiTrash/>
                                </button>
                            </div>
                        )
                    }
                )
            }
            <div className="z-50 w-full md:hidden h-[120px] bg-primary rounded-2xl shadow-2xl flex md:flex flex-col justify-center items-center">
                <p className="text-2xl py-4 text-secondary font-bold">Total:
                    <span className="text-accent font-bold mx-2">
                        {getTotal().toFixed(2)}
                    </span>
                </p>
                <Link to="/checkout" state={
                    {
                        cart: cart
                    }
                } className="text-white bg-accent px-4 py-1 rounded-lg font-bold hover:bg-accent/80 transition-all duration-300">
                    Checkout
                </Link>
            </div>
        </div>
    )
}