import { useState } from "react"
import { sampleProducts } from "../../assets/sampleData"
import { useEffect } from "react"
import axios from "axios"

export default function AdminProductPage() {

    const [products, setProducts] = useState(sampleProducts);

    useEffect(
        () => {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then(
                (res) => {
                    console.log(res.data);
                    setProducts(res.data);
                }
            );
        }, []);

    return (

        <div className="w-full h-full bg-red-400 max-h-full overflow-y-scroll">
            <table className="w-full text-center">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Labelled Price</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(
                            (item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.productID}</td>
                                        <td>{item.name}</td>
                                        <td><img src={item.images[0]} className="w-[50px] h-[50px]" /></td>
                                        <td>₹{item.labaledPrice.toLocaleString()}</td>
                                        <td>₹{item.price.toLocaleString()}</td>
                                        <td>{item.stock}</td>
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}