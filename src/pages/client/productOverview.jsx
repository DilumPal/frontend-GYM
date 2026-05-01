import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loding";
import { addToCart, getCart } from "../../utils/cart";

export default function ProductOverview() {
    const params = useParams();
    const productID = params.productId
    const [status, setStatus] = useState("Loading")//Loading, success, error
    const [product, setProducts] = useState(null)

    useEffect(
        () => {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productID).then(
                (res) => {
                    console.log(res.data)
                    setProducts(res.data)
                    setStatus("success")
                }
            ).catch(
                (error) => {
                    console.log(error)
                    setStatus("error")
                    toast.error("Error fetching product details")
                }
            )
        }
        , [])

    return (
        <>
            {
                status == "success" && (
                    <div className="w-full h-full flex">
                        <div className="w-[50%] h-full flex justify-center items-center">
                            <ImageSlider images={product.images} />
                        </div>
                        <div className="w-[50%] h-full flex justify-center items-center bg-green-200">
                            <div className="w-[500px] h-[600px] flex flex-col items-center">
                                <h1 className="w-full text-center text-4xl text-primary font-semibold">{product.name}
                                    {
                                        product.altNames.map((altNames, index) => {
                                            return (
                                                <span key={index} className="text-2xl text-gray-800 font-normal">{" | " + altNames}</span>
                                            )
                                        })
                                    }
                                </h1>
                                <h1 className="w-full text-center my-2 text-md text-gray-600 font-semibold">{product.productID}</h1>
                                <p className="w-full text-center my-2 text-md text-gray-600 font-semibold">{product.description}</p>
                                {
                                    product.labelledPrice > product.price ?
                                    <div>
                                        <span className="text-4xl mx-4 text-gray-500 line-through">{product.labelledPrice.toFixed(2)}</span>
                                        <span className="text-4xl mx-4 font-bold text-accent">{product.price.toFixed(2)}</span>
                                    </div>
                                    :<span className="text-4xl mx-4 font-bold text-accent">{product.price.toFixed(2)}</span>
                                }
                                <div className="w-full justify-center items-center mt-4">
                                    <button className="w-[200px] h-[50px] mx-4 bg-accent text-white font-bold rounded-md hover:bg-accent/80 transition-all duration-300 cursor-pointer"onClick={()=>{
                                        console.log("Old Cart")
                                        console.log(getCart())
                                        addToCart(product,1)
                                        console.log("New Cart")
                                        console.log(getCart())
                                    }}>Add to Cart</button>
                                    <button className="w-[200px] h-[50px] mx-4 bg-primary text-white font-bold rounded-md hover:bg-primary/80 transition-all duration-300 cursor-pointer">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                status == "Loading" && <Loading />
            }
        </>
    )
}