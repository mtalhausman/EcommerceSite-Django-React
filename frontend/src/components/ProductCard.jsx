import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const Base_URL = import.meta.env.VITE_DJANGO_BASE_URL;

  // Create a fallback image handling
  const imageUrl = product.image
    ? Base_URL + product.image
    : "https://via.placeholder.com/400x400?text=ShopEvo";

  // Format price purely for display
  const formattedPrice =
    typeof product.price === "number"
      ? `$${product.price.toFixed(2)}`
      : product.price;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />

        {/* Optional Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {/* Add conditional rendering here if data supports it e.g., product.isNew */}
          {/* <div className="bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase font-bold text-indigo-600 rounded-full shadow-sm tracking-wider">New</div> */}
        </div>

        {/* Quick View Overlay (appears on hover) */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out bg-gradient-to-t from-gray-900/80 to-transparent flex justify-center">
          <span className="bg-white text-gray-900 text-sm font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-indigo-50 transition-colors transform scale-95 group-hover:scale-100 opacity-0 group-hover:opacity-100 delay-100">
            View Details
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Header: Title & Price */}
        <div className="flex justify-between items-start gap-4 mb-2">
          <h2 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h2>
          <p className="text-lg font-extrabold text-indigo-600 whitespace-nowrap">
            PKR {formattedPrice}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4 flex-grow">
          {product.description ||
            "Experience the premium quality of our carefully selected products designed for your lifestyle."}
        </p>

        {/* Footer Ratings (Visual Only for UI Enhancement) */}
        <div className="flex items-center text-xs text-gray-400 font-medium mt-auto pt-4 border-t border-gray-50">
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-gray-500">4.9</span>
          </div>
          <span className="mx-2 text-gray-300">•</span>
          <span>In Stock</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
