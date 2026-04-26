import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import meadiaUpload from "../../utils/meadiaUpload";

export default function AddProductPage(){

    /*
    productID : {
        type: String,
        required: true,
        unique: true
    },
    name : {
        type : String,
        required : true
    },
    altNames : [
        {
            type : String
        }
    ],
    description : {
        type : String,
        required : true
    },
    images : [
        {
            type : String
        }
    ],
    labaledPrice : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    }, 
    isAvailable : {
        type : Boolean,
        required : true,
        default : true
    }
    */

    const [productID, setProductID] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [description, setDescription] = useState("");
    const [labaledPrice, setLabaledPrice] = useState(0);
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);

    async function AddProduct(e){
        if(images.length<=0){
            toast.error("Please select at least one image")
            return
        }

        const promiseArray = []

        for(let i=0; i<images.length; i++){
            promiseArray[i] = meadiaUpload(images[i])
        }

        try {
            const imageUrls = await Promise.all(promiseArray)
            console.log(imageUrls)
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <div className="w-full h-full flex flex-col justify-center item-center">
            <input type="text" placeholder="Product ID" className="input input-bordered w-full max-w-xs" onChange={(e)=>{setProductID(e.target.value)}}/>
            <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" onChange={(e)=>{setName(e.target.value)}}/>
            <input type="text" placeholder="Alt Names (comma separated)" className="input input-bordered w-full max-w-xs" onChange={(e)=>{setAltNames(e.target.value)}}/>
            <input type="text" placeholder="Description" className="textarea textarea-bordered w-full max-w-xs" onChange={(e)=>{setDescription(e.target.value)}}/>
            <input type="file" placeholder="Images" multiple className="input input-bordered w-full max-w-xs" onChange={(e)=>{setImages(e.target.files)}}/>
            <input type="number" placeholder="Labaled Price" className="input input-bordered w-full max-w-xs" onChange={(e)=>{setLabaledPrice(e.target.value)}}/>
            <input type="number" placeholder="Price" className="input input-bordered w-full max-w-xs" onChange={(e)=>{setPrice(e.target.value)}}/>
            <input type="number" placeholder="Stock" className="input input-bordered w-full max-w-xs" onChange={(e)=>{setStock(e.target.value)}}/>
            
            <div className="flex justify-center items-center mt-4">
                <Link to="/adminPage/products" className="bg-red-500 text-white font-bold py-2 px-4 rounded mr-4">Cancel</Link>
                <button className="bg-green-400 text-white cursor-pointer font-bold py-2 px-4 rounded" onClick={AddProduct}>Add Product</button>
            </div>
        </div>
    )
}