import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import meadiaUpload from "../../utils/meadiaUpload";

export default function EditProductPage() {

    const [productID, setProductID] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [description, setDescription] = useState("");
    const [labaledPrice, setLabaledPrice] = useState(0);
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const navigate = useNavigate()

    async function updateProduct(e) {

        const token = localStorage.getItem("token")
        if (token == null) {
            toast.error("Please login first")
            return
        }

        if (images.length <= 0) {
            toast.error("Please select at least one image")
            return
        }

        const promiseArray = []

        for (let i = 0; i < images.length; i++) {
            promiseArray[i] = meadiaUpload(images[i])
        }

        try {
            const imageUrls = await Promise.all(promiseArray)
            console.log(imageUrls)

            const altNamesArray = altNames.split(",")

            const product = {
                productID: productID,
                name: name,
                altNames: altNamesArray,
                description: description,
                images: imageUrls,
                labaledPrice: labaledPrice,
                price: price,
                stock: stock,
            }

            axios.post(import.meta.env.VITE_BACKEND_URL + "/api/products", product, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then(() => {
                toast.success("Product added successfully")
                navigate("/adminPage/products")
            }).catch((e) => {
                toast.error(e.response.data.message)
            })

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-center item-center">
            <h1 className="text-3xl font-bold mb-4">Edit Product</h1>
            <input
                type="text"
                placeholder="Product ID"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {
                    setProductID(e.target.value)
                }}
            />
            <input
                type="text"
                placeholder="Name"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {
                    setName(e.target.value)
                }}
            />
            <input
                type="text"
                placeholder="Alt Names (comma separated)"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {
                    setAltNames(e.target.value)
                }}
            />
            <input
                type="text"
                placeholder="Description"
                className="textarea textarea-bordered w-full max-w-xs"
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
            />
            <input
                type="file"
                placeholder="Images"
                multiple className="input input-bordered w-full max-w-xs"
                onChange={(e) => {
                    setImages(e.target.files)
                }}
            />
            <input
                type="number"
                placeholder="Labaled Price"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {
                    setLabaledPrice(e.target.value)
                }}
            />
            <input
                type="number"
                placeholder="Price"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {
                    setPrice(e.target.value)
                }}
            />
            <input
                type="number"
                placeholder="Stock"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {
                    setStock(e.target.value)
                }}
            />

            <div className="flex justify-center items-center mt-4">
                <Link
                    to="/adminPage/products"
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded mr-4"
                >
                    Cancel
                </Link>
                <button
                    className="bg-green-400 text-white cursor-pointer font-bold py-2 px-4 rounded"
                    onClick={updateProduct}
                >
                    Update Product
                </button>
            </div>
        </div>
    )
}