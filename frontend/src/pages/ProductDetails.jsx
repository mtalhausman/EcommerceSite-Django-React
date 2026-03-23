import { useLoaderData, Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useState } from "react"
import { getAccessToken } from "../utils/auth"

const ProductDetails = () => {
    const product = useLoaderData();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [isAdding, setIsAdding] = useState(false);

    if (product === null) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-sm w-full">
                    <svg className="w-16 h-16 text-indigo-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Product Not Found</h2>
                    <p className="text-sm text-gray-500 mb-6">We couldn't find the product you're looking for. It might have been removed or the link is incorrect.</p>
                    <Link to="/" className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
                        ← Back to Shopping
                    </Link>
                </div>
            </div>
        );
    }

    const Base_URL = import.meta.env.VITE_DJANGO_BASE_URL;
    const imageUrl = product.image ? (product.image.startsWith('http') ? product.image : Base_URL + product.image) : "https://via.placeholder.com/600x600?text=ShopEvo";

    const formattedPrice = typeof product.price === 'number'
        ? `$${product.price.toFixed(2)}`
        : product.price;

    const handleAddtoCart = () => {
        if (!getAccessToken()) {
            navigate('/login');
            return;
        }
        setIsAdding(true);
        addToCart(product.id);
        setTimeout(() => setIsAdding(false), 600);
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb Header */}
            <div className="bg-white border-b border-gray-100 pt-20 pb-3 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto flex items-center text-xs text-gray-500">
                    <Link to="/" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        Home
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 font-medium truncate">{product.name}</span>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-10 xl:gap-x-12 items-start">
                    {/* Image Section */}
                    <div className="lg:max-w-md w-full mx-auto lg:mx-0">
                        <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm relative group">
                            <img
                                src={imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-in-out"
                            />
                            {/* Zoom prompt */}
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full cursor-pointer hover:bg-white text-gray-500 shadow-sm transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                            </div>
                        </div>
                        {/* Thumbnail gallery placeholder */}
                        <div className="mt-4 grid grid-cols-4 gap-3 hidden sm:grid">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={`aspect-square rounded-lg overflow-hidden bg-gray-50 cursor-pointer ${i === 1 ? 'ring-2 ring-indigo-500 ring-offset-1' : 'hover:opacity-80 transition-opacity border border-gray-100'}`}>
                                    <img src={imageUrl} alt="" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="mt-8 lg:mt-0">
                        <div className="flex flex-col h-full">

                            {/* Title & Price */}
                            <div className="mb-5">
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-2">{product.name}</h1>
                                <div className="flex items-center gap-3">
                                    <p className="text-2xl font-bold text-indigo-600">{formattedPrice}</p>
                                    <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-md text-xs font-semibold">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        In Stock
                                    </div>
                                </div>
                            </div>

                            {/* Reviews Snippet */}
                            <div className="flex items-center gap-1.5 mb-6">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    ))}
                                </div>
                                <a href="#reviews" className="text-xs text-indigo-600 font-medium hover:underline ml-1">128 reviews</a>
                            </div>

                            {/* Description */}
                            <div className="text-gray-600 mb-6 text-sm leading-relaxed">
                                <p>{product.description}</p>
                            </div>

                            {/* Action Area */}
                            <div className="mt-2 pt-6 border-t border-gray-100">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={handleAddtoCart}
                                        disabled={isAdding}
                                        className="flex-1 bg-indigo-600 text-white px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-all duration-200 font-semibold text-sm flex items-center justify-center gap-2 shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75 disabled:cursor-not-allowed"
                                    >
                                        {isAdding ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                Adding...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                                Add to Cart
                                            </>
                                        )}
                                    </button>

                                    <button className="px-6 py-2.5 rounded-xl bg-white text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors border border-gray-200 flex items-center justify-center gap-2 shadow-sm">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                        Save for later
                                    </button>
                                </div>

                                {/* Features/Guarantees */}
                                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs text-gray-500 font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <div className="bg-gray-100 p-1.5 rounded-md"><svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
                                        <span>Free Shipping over $50</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="bg-gray-100 p-1.5 rounded-md"><svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg></div>
                                        <span>30-Day Returns</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="bg-gray-100 p-1.5 rounded-md"><svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></div>
                                        <span>Secure Checkout</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails