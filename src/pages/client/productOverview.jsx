import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loding";

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
                        <div className="w-[50%] h-full flex justify-center items-center bg-accent">
                            <div className="w-[500px] h-[600px] flex flex-col items-center">
                                <h1 className="w-full text-center text-4xl text-primary font-semibold">{product.name}
                                    {
                                        product.altNames.map((altNames,index)=>{
                                            return(
                                                <span key={index} className="text-2xl text-secondary font-normal">({altNames})</span>
                                            )
                                        })
                                    }
                                </h1>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                status == "Loading" && <Loading/>
            }
        </>
    )
}