import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { clearToken, getAccessToken } from "../utils/auth";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const cartCount =
    cartItems?.reduce((count, item) => count + item.quantity, 0) || 0;
  const isLoggedIn = !!getAccessToken();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Brand / Logo */}
          <div className="flex-shrink-0 flex items-center">
            {/* {isLoggedIn && ( */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="bg-indigo-600 text-white p-2 rounded-xl group-hover:bg-indigo-700 transition-colors shadow-sm">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
                ShopEvo
              </span>
            </Link>
            {/* )} */}
          </div>

          {/* Navigation & Actions */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Auth Links */}
            <div
              className={`flex items-center gap-3 sm:gap-4 ${
                isLoggedIn
                  ? "border-r border-gray-200 pr-3 sm:pr-6 mr-1 sm:mr-0"
                  : ""
              }`}
            >
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="hidden sm:inline-flex text-sm font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2.5 rounded-xl transition-colors"
                  >
                    Create account
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1.5"
                >
                  <svg
                    className="w-4 h-4 hidden sm:block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign out
                </button>
              )}
            </div>

            {/* Cart Button */}
            {isLoggedIn && (
              <Link to="/cart" className="relative group p-1 sm:p-2">
                <div className="flex items-center gap-2 bg-gray-50 group-hover:bg-gray-100 text-gray-700 px-3 py-2.5 rounded-xl font-medium transition-all border border-gray-200 group-hover:border-gray-300">
                  <svg
                    className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="hidden sm:block text-sm">Cart</span>
                </div>

                {/* Badge */}
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-0 sm:right-0 flex items-center justify-center min-w-[20px] h-5 px-1 text-[11px] font-bold text-white bg-indigo-600 rounded-full ring-2 ring-white transform scale-100 group-hover:scale-110 transition-transform">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
