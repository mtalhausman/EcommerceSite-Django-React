import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const Base_URL = import.meta.env.VITE_DJANGO_BASE_URL;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${Base_URL}/api/products/`);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 pb-12 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
                <p className="text-gray-500 font-medium">Loading amazing products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 pb-12 flex items-center justify-center px-4">
                <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full border border-red-100">
                    <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
                    <p className="text-gray-500">{error.message}</p>
                    <button onClick={() => window.location.reload()} className="mt-6 w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-indigo-700 transition">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-16">
            {/* Hero Section */}
            <div className="bg-indigo-900 text-white py-16 px-4 sm:px-6 lg:px-8 mb-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-500 blur-3xl"></div>
                    <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-purple-500 blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                        Discover the Extraordinary
                    </h1>
                    <p className="text-lg md:text-xl text-indigo-200 max-w-2xl mx-auto font-light leading-relaxed">
                        Explore our curated collection of premium products designed to elevate your everyday life.
                    </p>
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

                {/* Header/Filter Row */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Featured Collection <span className="text-sm font-medium text-gray-400 ml-2 bg-gray-100 px-2 py-1 rounded-md">{products.length} Items</span></h2>

                    <div className="flex items-center gap-2">
                        <select className="bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 shadow-sm outline-none cursor-pointer hover:border-gray-300 transition-colors">
                            <option defaultValue>Sort by: Featured</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="newest">Newest Arrivals</option>
                        </select>
                    </div>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
                        <p className="text-gray-500">We're adding new items soon. Check back later!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductList;
