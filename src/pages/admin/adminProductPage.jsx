import { useState } from "react"
import { sampleProducts } from "../../assets/sampleData"

export default function AdminProductPage(){

    const [products, setProducts] = useState(sampleProducts);

    return(

        /*
        {
        "isAvailable": true,
        "_id": "69cf70cc9ed94c049364f9d0",
        "productID": "GYM003",
        "name": "Stationary Exercise Bike",
        "altNames": [
            "Fitness Bike",
            "Indoor Cycle"
        ],
        "description": "Compact stationary bike ideal for cardio workouts and endurance training.",
        "images": [
            "https://example.com/images/bike1.jpg"
        ],
        "labaledPrice": 65000,
        "price": 58000,
        "isAvailabale": true,
        "__v": 0
    }
        */

        <div className="w-full h-full bg-red-400 max-h-full overflow-y-scroll">
            <table className="w-full">
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
                    <tr>
                        <td>GYM003</td>
                        <td>Stationary Exercise Bike</td>
                        <td><img src="https://example.com/images/bike1.jpg" className="w-[50px] h-[50px]" /></td>
                        <td>₹65,000</td>
                        <td>₹58,000</td>
                        <td>10</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}