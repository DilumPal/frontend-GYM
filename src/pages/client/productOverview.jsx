import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loding";
import { addToCart, getCart } from "../../utils/cart";

export default function ProductOverview() {
    const params = useParams();
    const productID = params.productId;
    const [status, setStatus] = useState("Loading"); //Loading, success, error
    const [product, setProducts] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productID)
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
                setStatus("success");
            })
            .catch((error) => {
                console.log(error);
                setStatus("error");
                toast.error("Error fetching product details");
            });
    }, [productID]); // Added productID dependency here

    return (
        <>
            {status === "success" && (
                /* CHANGED: Swapped 'w-full h-full min-h-screen' for 'w-screen h-[calc(100vh-80px)]' to perfectly respect the header space */
                <div className="w-full h-[calc(100vh-80px)] flex flex-col md:flex-row bg-primary overflow-y-auto md:overflow-hidden">
                    {/* Mobile Product Title */}
                    <h1 className="w-full md:hidden block my-8 text-center text-4xl text-secondary font-semibold">
                        {product.name}
                        {product.altNames.map((altName, index) => {
                            return (
                                <span key={index} className="text-2xl text-secondary/60 font-normal">
                                    {" | " + altName}
                                </span>
                            );
                        })}
                    </h1>

                    {/* Left Column: Image Slider */}
                    <div className="w-full md:w-[50%] h-full flex justify-center items-center p-4">
                        <ImageSlider images={product.images} />
                    </div>

                    {/* Right Column: Information Panel */}
                    <div className="w-full md:w-[50%] h-full flex justify-center items-center bg-primary p-4">
                        <div className="w-[500px] h-[600px] flex flex-col items-center justify-center">
                            
                            {/* Desktop Product Title */}
                            <h1 className="w-full hidden md:block text-center text-4xl text-secondary font-semibold">
                                {product.name}
                                {product.altNames.map((altName, index) => {
                                    return (
                                        <span key={index} className="text-2xl text-secondary/60 font-normal">
                                            {" | " + altName}
                                        </span>
                                    );
                                })}
                            </h1>

                            <h1 className="w-full text-center my-2 text-md text-secondary/50 font-semibold">
                                {product.productID}
                            </h1>
                            
                            <p className="w-full text-center my-4 text-md text-secondary/70 font-normal px-4">
                                {product.description}
                            </p>

                            {/* Price Blocks using updated Accent */}
                            {product.labelledPrice > product.price ? (
                                <div className="flex items-center justify-center my-4">
                                    <span className="text-3xl mx-4 text-secondary/40 line-through">
                                        ${product.labelledPrice.toFixed(2)}
                                    </span>
                                    <span className="text-4xl mx-4 font-bold text-accent">
                                        ${product.price.toFixed(2)}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-4xl my-4 font-bold text-accent">
                                    ${product.price.toFixed(2)}
                                </span>
                            )}

                            {/* Interactive Buttons */}
                            <div className="w-full flex justify-center items-center mt-6 gap-4">
                                {/* Add To Cart - Accent Option */}
                                <button
                                    className="w-[200px] h-[50px] bg-accent text-secondary font-bold rounded-xl hover:bg-accent/80 shadow-[0_4px_20px_rgba(229,57,53,0.2)] transition-all duration-300 cursor-pointer"
                                    onClick={() => {
                                        console.log("Old Cart");
                                        console.log(getCart());
                                        addToCart(product, 1);
                                        console.log("New Cart");
                                        console.log(getCart());
                                        toast.success("Added to cart");
                                    }}
                                >
                                    Add to Cart
                                </button>

                                {/* Buy Now - Primary Option (with border contrast) */}
                                <button
                                    className="w-[200px] h-[50px] bg-transparent border border-secondary/20 text-secondary font-bold rounded-xl hover:bg-secondary/5 transition-all duration-300 cursor-pointer"
                                    onClick={() => {
                                        navigate("/checkout", { // Fixed potential typo to match your /checkout route lowercase convention
                                            state: {
                                                cart: [
                                                    {
                                                        productID: product.productID,
                                                        name: product.name,
                                                        image: product.images[0],
                                                        price: product.price,
                                                        labelledPrice: product.labelledPrice,
                                                        qty: 1,
                                                    },
                                                ],
                                            },
                                        });
                                    }}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {status === "Loading" && <Loading />}
        </>
    );
}