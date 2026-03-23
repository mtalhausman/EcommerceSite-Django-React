import { useCart } from "../context/CartContext"
import { Link } from "react-router-dom"

const CartPage = () => {
    const { totalPrice, cartItems, removeFromCart, updateProductQuantity } = useCart();
    console.log("Cart Items", cartItems);
    const Base_URL = import.meta.env.VITE_DJANGO_BASE_URL;

    // Helper to format price
    const formatPrice = (price) => {
        return typeof price === 'number' ? `PKR ${price.toFixed(2)}` : `PKR ${price}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-8 sm:mb-12">
                    Shopping Cart
                </h1>

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center max-w-2xl mx-auto mt-10">
                        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
                            Looks like you haven't added anything to your cart yet. Discover our premium collection and find something you love.
                        </p>
                        <Link to="/" className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                        {/* Cart Items List */}
                        <div className="lg:col-span-8">
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                <ul role="list" className="divide-y divide-gray-100">
                                    {cartItems.map((item) => (
                                        <li key={item.id} className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 hover:bg-gray-50/50 transition-colors">
                                            <div className="flex-shrink-0 w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                                                <img
                                                    src={item.product_image?.startsWith('http') ? item.product_image : Base_URL + item.product_image}
                                                    alt={item.product_name || 'Product Image'}
                                                    className="w-full h-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="flex flex-1 flex-col justify-between">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">
                                                            {/* Assuming item.product.id or item.product_id exists based on original code, if not, product.id or something. Original maps directly to names. */}
                                                            <Link to={`/product/${item.product_id || item.product?.id || ''}`} className="hover:text-indigo-600 transition-colors">
                                                                {item.product_name}
                                                            </Link>
                                                        </h3>
                                                        <p className="text-sm text-gray-500 mb-4">In Stock</p>
                                                    </div>
                                                    <p className="text-lg font-extrabold text-gray-900 whitespace-nowrap ml-4">
                                                        {formatPrice(item.product_price)}
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between mt-auto">
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm h-10">
                                                        <button
                                                            className="px-3 md:px-4 h-full text-gray-600 hover:bg-gray-100 hover:text-indigo-600 transition-colors focus:outline-none disabled:opacity-50"
                                                            onClick={() => updateProductQuantity(item.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" /></svg>
                                                        </button>

                                                        <span className="w-10 text-center font-semibold text-gray-900 text-sm">
                                                            {item.quantity}
                                                        </span>

                                                        <button
                                                            className="px-3 md:px-4 h-full text-gray-600 hover:bg-gray-100 hover:text-indigo-600 transition-colors focus:outline-none"
                                                            onClick={() => updateProductQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                                                        </button>
                                                    </div>

                                                    {/* Remove Button */}
                                                    <button
                                                        type="button"
                                                        className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
                                                        onClick={() => removeFromCart(item.id)}
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                        <span className="hidden sm:inline">Remove</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-4 mt-8 lg:mt-0 sticky top-28">
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                                <dl className="space-y-4 text-sm text-gray-600 mb-6">
                                    <div className="flex justify-between">
                                        <dt>Subtotal</dt>
                                        <dd className="font-medium text-gray-900">{formatPrice(totalPrice)}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt>Shipping estimate</dt>
                                        <dd className="font-medium text-gray-900">Calculated at checkout</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt>Tax estimate</dt>
                                        <dd className="font-medium text-gray-900">Calculated at checkout</dd>
                                    </div>
                                </dl>

                                <div className="border-t border-gray-100 pt-6 mb-8 flex justify-between items-end">
                                    <dt className="text-base font-bold text-gray-900">Order Total</dt>
                                    <dd className="text-2xl font-extrabold text-indigo-600">{formatPrice(totalPrice)}</dd>
                                </div>

                                <Link
                                    to="/checkout"
                                    className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-md text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:-translate-y-0.5"
                                >
                                    Proceed to Checkout
                                </Link>

                                <div className="mt-6 flex justify-center text-sm text-gray-500">
                                    <p>
                                        or{' '}
                                        <Link to="/" className="text-indigo-600 font-medium hover:text-indigo-500 transition-colors">
                                            Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;