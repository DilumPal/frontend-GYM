import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import meadiaUpload from "../../utils/meadiaUpload";

export default function AddProductPage() {
    const [productID, setProductID] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [description, setDescription] = useState("");
    const [labelledPrice, setLabelledPrice] = useState(0);
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    async function AddProduct(e) {
        const token = localStorage.getItem("token");
        if (token == null) {
            toast.error("Please login first");
            return;
        }

        if (images.length <= 0) {
            toast.error("Please select at least one image");
            return;
        }

        const promiseArray = [];
        for (let i = 0; i < images.length; i++) {
            promiseArray[i] = meadiaUpload(images[i]);
        }

        try {
            const imageUrls = await Promise.all(promiseArray);
            const altNamesArray = altNames.split(",");

            const product = {
                productID: productID,
                name: name,
                altNames: altNamesArray,
                description: description,
                images: imageUrls,
                labelledPrice: labelledPrice,
                price: price,
                stock: stock,
            };

            axios.post(import.meta.env.VITE_BACKEND_URL + "/api/products", product, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then(() => {
                toast.success("Product added successfully");
                navigate("/adminPage/products");
            }).catch((e) => {
                toast.error(e.response?.data?.message || "Something went wrong");
            });

        } catch (e) {
            console.log(e);
        }
    }

    // Condensed styling for a perfect fit
    const inputStyle = "w-full bg-transparent text-secondary border border-secondary/20 rounded-md px-3 py-1.5 text-sm outline-none transition-all duration-200 focus:border-accent focus:ring-1 focus:ring-accent placeholder:text-secondary/30";

    return (
        <div className="w-full h-[calc(100vh-2rem)] flex items-center justify-center p-2 bg-primary">
            <div className="w-full max-w-xl bg-secondary/[0.02] border border-accent rounded-xl p-5 shadow-xl max-h-full overflow-y-auto">
                
                {/* Compact Header */}
                <div className="mb-4 pb-2 border-b border-secondary/10">
                    <h2 className="text-xl font-bold text-secondary tracking-wide">
                        Add New <span className="text-accent">Product</span>
                    </h2>
                    <p className="text-xs text-secondary/50">Fill in the fields below to stock your catalog.</p>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-0.5">
                        <label className="text-[11px] font-semibold text-secondary/70 uppercase tracking-wider">Product ID</label>
                        <input type="text" placeholder="e.g. PROD-102" className={inputStyle} onChange={(e) => setProductID(e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <label className="text-[11px] font-semibold text-secondary/70 uppercase tracking-wider">Product Name</label>
                        <input type="text" placeholder="e.g. Wireless Headset" className={inputStyle} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-0.5 sm:col-span-2">
                        <label className="text-[11px] font-semibold text-secondary/70 uppercase tracking-wider">Alternative Names</label>
                        <input type="text" placeholder="Separate names with commas" className={inputStyle} onChange={(e) => setAltNames(e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-0.5 sm:col-span-2">
                        <label className="text-[11px] font-semibold text-secondary/70 uppercase tracking-wider">Description</label>
                        <textarea rows="2" placeholder="Describe the item's main features..." className={`${inputStyle} resize-none`} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-0.5 sm:col-span-2">
                        <label className="text-[11px] font-semibold text-secondary/70 uppercase tracking-wider">Product Media</label>
                        <input type="file" multiple className="w-full text-xs text-secondary file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-[11px] file:font-bold file:uppercase file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20 file:cursor-pointer transition-colors" onChange={(e) => setImages(e.target.files)} />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <label className="text-[11px] font-semibold text-secondary/70 uppercase tracking-wider">Labelled Price</label>
                        <input type="number" placeholder="0.00" className={inputStyle} onChange={(e) => setLabelledPrice(e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <label className="text-[11px] font-semibold text-secondary/70 uppercase tracking-wider">Selling Price</label>
                        <input type="number" placeholder="0.00" className={inputStyle} onChange={(e) => setPrice(e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-0.5 sm:col-span-2">
                        <label className="text-[11px] font-semibold text-secondary/70 uppercase tracking-wider">Stock Available</label>
                        <input type="number" placeholder="0" className={inputStyle} onChange={(e) => setStock(e.target.value)} />
                    </div>
                </div>

                {/* Compact Actions */}
                <div className="flex justify-end items-center gap-3 mt-5 pt-4 border-t border-secondary/10">
                    <Link to="/adminPage/products" className="text-secondary/60 hover:text-secondary text-xs font-medium px-4 py-2 rounded-md transition-colors border border-secondary/20 hover:border-secondary/40">
                        Cancel
                    </Link>
                    <button className="bg-accent hover:bg-accent/90 text-secondary text-xs font-bold px-5 py-2 rounded-md shadow-md transition-all cursor-pointer" onClick={AddProduct}>
                        Add Product
                    </button>
                </div>

            </div>
        </div>
    );
}