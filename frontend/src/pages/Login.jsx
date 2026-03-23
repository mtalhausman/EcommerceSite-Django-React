import { useState } from "react";
import { saveToken } from "../utils/auth";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const Base_URL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [msg, setMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMsg('');
        try {
            const response = await axios.post(`${Base_URL}/api/tokenlogin/`, formData);
            saveToken(response.data);
            setMsg('Login successful! Redirecting...');
            setTimeout(() => {
                setIsLoading(false);
                navigate('/')
            }, 1000);
        } catch (error) {
            setIsLoading(false);
            const msg = error?.response?.data?.detail
                || error?.response?.data?.message
                || 'Invalid credentials. Please try again.';
            setMsg(msg);
        }
    };

    return (
        <div className="min-h-screen flex text-gray-900 bg-gray-50 font-sans">
            {/* Left Side - Image/Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-600 flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-indigo-700">
                    <img
                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
                        alt="Shopping background"
                        className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-indigo-900/40 to-transparent"></div>
                </div>
                <div className="relative z-10 p-12 text-center text-white flex flex-col items-center justify-center h-full max-w-2xl mx-auto">
                    <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    </div>
                    <h1 className="text-5xl font-extrabold tracking-tight mb-6">Welcome Back!</h1>
                    <p className="text-lg text-indigo-100 mb-8 leading-relaxed font-light">
                        Discover the latest trends, exclusive offers, and a seamless shopping experience. Your favorite products are just a login away.
                    </p>
                    {/* Decorative elements */}
                    <div className="flex gap-2">
                        <div className="w-12 h-1 bg-white rounded-full"></div>
                        <div className="w-4 h-1 bg-white/40 rounded-full"></div>
                        <div className="w-4 h-1 bg-white/40 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
                <div className="absolute top-8 left-8 lg:hidden">
                    <div className="text-indigo-600 font-bold text-2xl tracking-tighter flex items-center gap-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        ShopEvo
                    </div>
                </div>

                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">Sign in</h2>
                        <p className="text-sm text-gray-500 font-medium">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 transition-colors">
                                Create one here
                            </Link>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        className="appearance-none block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 shadow-sm focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm"
                                        placeholder="Enter your username"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="appearance-none block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 shadow-sm focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 cursor-pointer">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : "Sign in"}
                            </button>
                        </div>
                    </form>

                    {msg && (
                        <div className={`mt-6 p-4 rounded-xl text-sm font-medium flex items-center justify-center ${msg.includes('successful') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                            {msg.includes('successful') ? (
                                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            ) : (
                                <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            )}
                            {msg}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Login;
