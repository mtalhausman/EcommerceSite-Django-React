import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authFetch } from "../utils/auth";
import axios from "axios";

const CheckOutPage = () => {
    const { clearCart, cartItems, totalPrice } = useCart();
    const navigate = useNavigate();
    const Base_URL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        payment_method: "",
    });

    // Helper to format price
    const formatPrice = (price) => {
        return typeof price === 'number' ? `PKR ${price.toFixed(2)}` : `PKR ${price}`;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const response = await authFetch(`${Base_URL}/api/order/create/`,
                { method: 'POST', body: JSON.stringify(formData) });
            console.log(response.data);
            setLoading(false);
            setIsSuccess(true);
            setMessage("Order created successfully!");
            axios.get(`${Base_URL}/api/cart/`);
            clearCart();
            setTimeout(() => {
                navigate("/");
            }, 2500);
        } catch (error) {
            setLoading(false);
            setIsSuccess(false);
            setMessage("Failed to create order. Please try again.");
            console.error("Error creating order:", error);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-20">
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 max-w-md w-full text-center transform animate-fade-in-up">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{message}</h2>
                    <p className="text-gray-500 mb-8">Thank you for your purchase. We are redirecting you to the home page shortly.</p>
                    <div className="animate-pulse flex justify-center">
                        <div className="h-2 w-24 bg-indigo-200 rounded-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Checkout</h1>
                    <p className="mt-2 text-sm text-gray-500">Please provide your details to complete your order.</p>
                </div>

                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start flex flex-col-reverse gap-y-10">

                    {/* Checkout Form */}
                    <div className="lg:col-span-7 xl:col-span-8">
                        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10">

                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                Shipping Information
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 shadow-sm focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 shadow-sm focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1.5">Shipping Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 shadow-sm focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm"
                                        placeholder="123 Main St, Apt 4B, City, State, VIP"
                                    />
                                </div>
                            </div>

                            <hr className="my-8 border-gray-100" />

                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                Payment Details
                            </h2>

                            <div className="mb-8">
                                <label htmlFor="payment_method" className="block text-sm font-medium text-gray-700 mb-1.5">Payment Method</label>
                                <select
                                    id="payment_method"
                                    name="payment_method"
                                    value={formData.payment_method}
                                    onChange={handleChange}
                                    required
                                    className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 shadow-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm cursor-pointer"
                                >
                                    <option value="" disabled>Select your payment method</option>
                                    <option value="COD">Cash On Delivery</option>
                                    <option value="Online">Online / Credit Card</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-4 pt-4 border-t border-gray-100">
                                {message && !isSuccess && (
                                    <div className="p-4 rounded-xl text-sm font-medium bg-red-50 text-red-800 border border-red-100 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {message}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading || (!cartItems || cartItems.length === 0)}
                                    className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-md text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            Processing Order...
                                        </>
                                    ) : (
                                        "Place Order"
                                    )}
                                </button>
                                <p className="text-center text-xs text-gray-500 mt-2">
                                    By placing your order, you agree to our Terms and Privacy Notice.
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-5 xl:col-span-4 sticky top-28">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="max-h-64 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                                <ul role="list" className="divide-y divide-gray-100">
                                    {cartItems && cartItems.map((item) => (
                                        <li key={item.id} className="py-4 flex gap-4">
                                            <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-100">
                                                <img
                                                    src={item.product_image?.startsWith('http') ? item.product_image : Base_URL + item.product_image}
                                                    alt={item.product_name}
                                                    className="w-full h-full object-cover object-center"
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col">
                                                <div className="flex justify-between text-sm font-medium text-gray-900">
                                                    <h3 className="line-clamp-2">{item.product_name}</h3>
                                                    <p className="ml-4 whitespace-nowrap">{formatPrice(item.product_price)}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                {(!cartItems || cartItems.length === 0) && (
                                    <p className="text-sm text-gray-500 text-center py-4">Your cart is empty.</p>
                                )}
                            </div>

                            <dl className="space-y-4 text-sm text-gray-600 mb-6 border-t border-gray-100 pt-6">
                                <div className="flex justify-between">
                                    <dt>Subtotal</dt>
                                    <dd className="font-medium text-gray-900">{formatPrice(totalPrice)}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt>Shipping</dt>
                                    <dd className="font-medium text-green-600">Free</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt>Tax</dt>
                                    <dd className="font-medium text-gray-900">{formatPrice(0)}</dd>
                                </div>
                            </dl>

                            <div className="border-t border-gray-100 pt-6 flex justify-between items-end">
                                <dt className="text-base font-bold text-gray-900">Total</dt>
                                <dd className="text-2xl font-extrabold text-indigo-600">{formatPrice(totalPrice)}</dd>
                            </div>

                            <div className="mt-6 flex justify-center text-sm">
                                <Link to="/cart" className="text-indigo-600 font-medium hover:text-indigo-500 transition-colors flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                    Back to Cart
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOutPage;