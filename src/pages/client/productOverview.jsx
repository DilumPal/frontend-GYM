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

    // Review States
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch Product Details and associated Reviews
    const fetchProductData = () => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productID)
            .then((res) => {
                setProducts(res.data);
                setStatus("success");
            })
            .catch((error) => {
                console.log(error);
                setStatus("error");
                toast.error("Error fetching product details");
            });

        // Fetching reviews for this product
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/reviews/" + productID)
            .then((res) => {
                setReviews(res.data.reviews || []);
            })
            .catch((err) => {
                console.error("Error fetching reviews:", err);
            });
    };

    useEffect(() => {
        fetchProductData();
    }, [productID]);

    // Handle Review Submission
    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) return toast.error("Please add a comment");

        setIsSubmitting(true);

        const token = localStorage.getItem("token");

        axios
            .post(
                import.meta.env.VITE_BACKEND_URL + "/api/reviews",
                { productId: productID, rating, comment },
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                } // Keeps cookie/token handling intact if needed
            )
            .then(() => {
                toast.success("Review submitted successfully!");
                setIsModalOpen(false);
                setComment("");
                setRating(5);
                fetchProductData(); // Refresh list immediately
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response?.data?.message || "Failed to submit review");
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <>
            {status === "success" && (
                <div className="w-full h-[calc(100vh-80px)] flex flex-col md:flex-row bg-primary overflow-y-auto">
                    {/* Left Column: Image Slider */}
                    <div className="w-full md:w-[50%] md:h-full flex flex-col justify-center items-center p-4">
                        {/* Mobile Product Title */}
                        <h1 className="w-full md:hidden block my-8 text-center text-4xl text-secondary font-semibold">
                            {product.name}
                            {product.altNames?.map((altName, index) => (
                                <span key={index} className="text-2xl text-secondary/60 font-normal">
                                    {" | " + altName}
                                </span>
                            ))}
                        </h1>
                        <ImageSlider images={product.images} />
                    </div>

                    {/* Right Column: Information Panel & Reviews */}
                    <div className="w-full md:w-[50%] h-full bg-primary p-4 flex flex-col items-center">
                        <div className="w-full max-w-[500px] flex flex-col items-center py-8">
                            
                            {/* Desktop Product Title */}
                            <h1 className="w-full hidden md:block text-center text-4xl text-secondary font-semibold">
                                {product.name}
                                {product.altNames?.map((altName, index) => (
                                    <span key={index} className="text-2xl text-secondary/60 font-normal">
                                        {" | " + altName}
                                    </span>
                                ))}
                            </h1>

                            <h1 className="w-full text-center my-2 text-md text-secondary/50 font-semibold">
                                {product.productID}
                            </h1>
                            
                            <p className="w-full text-center my-4 text-md text-secondary/70 font-normal px-4">
                                {product.description}
                            </p>

                            {/* Price Blocks */}
                            {product.labelledPrice > product.price ? (
                                <div className="flex items-center justify-center my-4">
                                    <span className="text-3xl mx-4 text-secondary/40 line-through">
                                        Rs {product.labelledPrice.toFixed(2)}
                                    </span>
                                    <span className="text-4xl mx-4 font-bold text-accent">
                                        Rs {product.price.toFixed(2)}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-4xl my-4 font-bold text-accent">
                                    Rs {product.price.toFixed(2)}
                                </span>
                            )}

                            {/* Interactive Buttons */}
                            <div className="w-full flex flex-wrap justify-center items-center mt-6 gap-4">
                                <button
                                    className="w-[150px] h-[50px] bg-accent text-secondary font-bold rounded-xl hover:bg-accent/80 shadow-[0_4px_20px_rgba(229,57,53,0.2)] transition-all duration-300 cursor-pointer"
                                    onClick={() => {
                                        addToCart(product, 1);
                                        toast.success("Added to cart");
                                    }}
                                >
                                    Add to Cart
                                </button>

                                <button
                                    className="w-[150px] h-[50px] bg-transparent border border-secondary/20 text-secondary font-bold rounded-xl hover:bg-secondary/5 transition-all duration-300 cursor-pointer"
                                    onClick={() => {
                                        navigate("/checkout", {
                                            state: {
                                                cart: [{
                                                    productID: product.productID,
                                                    name: product.name,
                                                    image: product.images[0],
                                                    price: product.price,
                                                    labelledPrice: product.labelledPrice,
                                                    qty: 1,
                                                }],
                                            },
                                        });
                                    }}
                                >
                                    Buy Now
                                </button>

                                {/* Trigger Review Modal */}
                                <button
                                    className="w-[150px] h-[50px] bg-neutral-800 border border-accent/40 text-white font-bold rounded-xl hover:bg-neutral-700 transition-all duration-300 cursor-pointer"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Write Review
                                </button>
                            </div>

                            {/* --- REVIEWS DISPLAY LIST --- */}
                            <div className="w-full mt-12 border-t border-secondary/10 pt-6 px-2">
                                <h3 className="text-xl font-bold text-secondary mb-4 uppercase tracking-wider">
                                    Customer Reviews ({reviews.length})
                                </h3>
                                {reviews.length === 0 ? (
                                    <p className="text-sm text-secondary/40 italic">No reviews yet for this product.</p>
                                ) : (
                                    <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2">
                                        {reviews.map((rev) => (
                                            <div key={rev._id} className="bg-neutral-900/40 p-4 rounded-xl border border-secondary/5">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="font-semibold text-secondary text-sm">{rev.reviewerName}</span>
                                                    <span className="text-amber-400 text-xs">{"★".repeat(rev.rating)}</span>
                                                </div>
                                                <p className="text-xs text-secondary/70 leading-relaxed">"{rev.comment}"</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* --- ADD REVIEW MODAL --- */}
                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                            <div className="w-full max-w-md bg-neutral-900 border-2 border-accent/30 rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                                    Share Your Review
                                </h3>
                                <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
                                    <div>
                                        <label className="text-xs text-gray-400 block mb-1 uppercase font-bold tracking-wider">Rating</label>
                                        <select
                                            value={rating}
                                            onChange={(e) => setRating(Number(e.target.value))}
                                            className="w-full p-3 bg-black border border-gray-700 rounded-xl text-white outline-none focus:border-accent"
                                        >
                                            {[5, 4, 3, 2, 1].map((num) => (
                                                <option key={num} value={num}>{num} Star{num > 1 ? "s" : ""}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-xs text-gray-400 block mb-1 uppercase font-bold tracking-wider">Your Experience</label>
                                        <textarea
                                            rows="4"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="What did you like or dislike about this gear?"
                                            className="w-full p-3 bg-black border border-gray-700 rounded-xl text-white outline-none focus:border-accent text-sm resize-none"
                                            required
                                        />
                                    </div>

                                    <div className="flex gap-3 justify-end mt-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="px-5 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:bg-white/5 transition-all text-sm font-semibold"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-5 py-2.5 rounded-xl bg-accent text-white hover:bg-accent/80 transition-all text-sm font-bold shadow-md disabled:opacity-50"
                                        >
                                            {isSubmitting ? "Posting..." : "Submit"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {status === "Loading" && <Loading />}
        </>
    );
}