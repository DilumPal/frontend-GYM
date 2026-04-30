export default function ProductCard({ product }) {
    return (
        <div className="w-[300px] h-[420px] bg-white shadow-lg rounded-2xl m-3 flex flex-col overflow-hidden hover:shadow-xl transition duration-300">
            
            <img
                src={product.images?.[0] || "https://via.placeholder.com/300"}
                alt={product.name}
                className="w-full h-[180px] object-cover"
            />

            <div className="flex flex-col justify-between flex-grow p-4">
                
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {product.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {product.description}
                </p>

                <div className="mt-3">
                    <span className="text-gray-400 line-through text-sm mr-2">
                        Rs. {product.labaledPrice}
                    </span>
                    <span className="text-lg font-bold text-green-600">
                        Rs. {product.price}
                    </span>
                </div>

                <p className={`text-sm mt-1 ${product.isAvailable ? "text-green-500" : "text-red-500"}`}>
                    {product.isAvailable ? "In Stock" : "Out of Stock"}
                </p>

                <button
                    disabled={!product.isAvailable}
                    className={`mt-3 py-2 rounded-lg font-medium transition ${
                        product.isAvailable
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}