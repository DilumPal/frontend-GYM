import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"

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
        <div>
            This is Product overview Page for product {JSON.stringify(product)}
        </div>
    )
}