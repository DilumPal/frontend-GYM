import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import Loading from "../../components/loding"

export default function AdminOrdersPage(){

    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        if(isLoading){
            const token = localStorage.getItem("token")
            if(!token){
                toast.error("Please login first");
                return
            }
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
                headers: {
                    Authorization : "Bearer " + token
                }
            }).then((res)=>{
                setOrders(res.data);
                console.log(res.data);
                setIsLoading(false);
            }).catch((e)=>{
                alert("Error fetching orders: " + e.response?.data?.message || "Unknown Error")
                setIsLoading(false)
            });
        }
    },[isLoading])

    return(
        <div className="w-full h-full max-full overflow-y-scroll">
            {
                isLoading?<Loading/>:
                <table>
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>phone</th>
                            <th>total</th>
                            <th>date</th>
                            <th>status</th>
                        </tr>
                    </thead>
                </table>
            }
        </div>
    )
}