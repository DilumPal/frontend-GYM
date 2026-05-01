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
                        <div className="w-[50%] h-full">
                            <ImageSlider images={product.images} />
                        </div>
                        <div className="w-[50%] h-full bg-accent">

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