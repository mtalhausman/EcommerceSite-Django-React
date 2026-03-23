import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
    const Base_URL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
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
            await axios.post(`${Base_URL}/api/register/`, formData);
            setMsg('Sign up successful! Redirecting to login...');
            setTimeout(() => {
                setIsLoading(false);
                navigate('/login');
            }, 1000);
        } catch (error) {
            setIsLoading(false);
            const errors = error?.response?.data;
            if (typeof errors === 'object') {
                const firstError = Object.values(errors)[0];
                setMsg(Array.isArray(firstError) ? firstError[0] : firstError);
            } else {
                setMsg('Signup failed. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen flex text-gray-900 bg-gray-50 font-sans">
            {/* Left Side - Image/Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-600 flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-indigo-700">
                    <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
                        alt="Shopping background"
                        className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-indigo-900/40 to-transparent"></div>
                </div>
                <div className="relative z-10 p-12 text-center text-white flex flex-col items-center justify-center h-full max-w-2xl mx-auto">
                    <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    </div>
                    <h1 className="text-5xl font-extrabold tracking-tight mb-6">Join Us Today!</h1>
                    <p className="text-lg text-indigo-100 mb-8 leading-relaxed font-light">
                        Create an account to unlock exclusive deals, personalized recommendations, and a faster checkout experience.
                    </p>
                    {/* Decorative elements */}
                    <div className="flex gap-2">
                        <div className="w-4 h-1 bg-white/40 rounded-full"></div>
                        <div className="w-12 h-1 bg-white rounded-full"></div>
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
                        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">Create an account</h2>
                        <p className="text-sm text-gray-500 font-medium">
                            Already have an account?{' '}
                            <Link to="/login" className="text-indigo-600 hover:text-indigo-500 transition-colors">
                                Sign in here
                            </Link>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <div className="space-y-4">
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
                                        placeholder="Choose a username"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="appearance-none block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 shadow-sm focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                                <div>
                                    <label htmlFor="password2" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <input
                                            type="password"
                                            id="password2"
                                            name="password2"
                                            value={formData.password2}
                                            onChange={handleChange}
                                            required
                                            className="appearance-none block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 shadow-sm focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-sm border-t border-gray-100 pt-4 mt-2">
                            <label className="flex items-start cursor-pointer group">
                                <div className="flex items-center h-5">
                                    <input type="checkbox" required className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div className="ml-3 text-xs text-gray-500">
                                    By creating an account, you agree to our <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Terms of Service</a> and <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
                                </div>
                            </label>
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
                                        Creating account...
                                    </span>
                                ) : "Sign up"}
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
};

export default SignUp;