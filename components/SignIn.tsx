import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";

interface FormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Email:", formData.email);
        console.log("Password:", formData.password);
        // TODO: Call your sign-in logic here
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="relative z-10 w-full flex rounded-xl items-center justify-center bg-gradient-to-br from-[#18181b] via-[#232336] to-[#0f0f14]">
            <div
                className="bg-[#18181b]/90 backdrop-blur-xl p-6 border border-gray-800 rounded-xl shadow-2xl transition-all duration-300 hover:shadow-primary/10 flex flex-col justify-center w-full max-w-sm"
                style={{
                    boxShadow: `0 0 20px #7c3aed22`,
                    maxHeight: "100vh",
                    minHeight: "340px",
                }}
            >
                {/* Logo with Pulse Effect */}
                <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-[#232336] rounded-full flex items-center justify-center border border-[#27272a] animate-pulse-slow">
                        <svg
                            className="w-6 h-6 text-purple-400"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.24L19.38 7v8.76L12 18.76l-7.38-3V7L12 4.24z" />
                        </svg>
                    </div>
                </div>

                {/* Welcome Text with Gradient */}
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold text-purple-600 tracking-tight">
                        DownStocks AI
                    </h1>
                    <p className="text-gray-500 text-xs mt-1">
                        Don't have an account?{" "}
                        <a
                            href="/signup"
                            className="text-purple-400 hover:text-purple-300 transition-colors underline"
                        >
                            Sign Up
                        </a>
                    </p>
                </div>

                {/* Form with Input Animations */}
                <form className="space-y-3" onSubmit={handleSubmit}>
                    <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 transition-transform duration-300 group-focus-within:scale-110" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email Address"
                            className="w-full bg-[#232336]/70 border border-[#27272a] rounded-md pl-10 pr-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm"
                        />
                    </div>

                    <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 transition-transform duration-300 group-focus-within:scale-110" />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className="w-full bg-[#232336]/70 border border-[#27272a] rounded-md pl-10 pr-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group text-sm"
                    >
                        <span className="relative z-10">Sign In</span>
                        <span className="absolute inset-0 bg-purple-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    </button>

                    {/* Terms and Privacy */}
                    <p className="text-xs text-gray-500 text-center mt-1">
                        By continuing, you agree to our{" "}
                        <a
                            href="#"
                            className="text-purple-400 hover:underline transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                            href="#"
                            className="text-purple-400 hover:underline transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Privacy Policy
                        </a>
                        .
                    </p>

                    {/* Forgot Password */}
                    <div className="flex justify-end mt-1">
                        <a
                            href="/forgot-password"
                            className="text-xs text-purple-400 hover:text-purple-300 underline transition-colors"
                        >
                            Forgot password?
                        </a>
                    </div>
                </form>

                {/* Divider */}
                <div className="relative my-3">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[#27272a]"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="px-2 bg-[#18181b] text-gray-500">OR</span>
                    </div>
                </div>

                {/* Social Login Button with Hover Effect */}
                <button className="w-full flex items-center justify-center py-2 px-3 bg-[#232336]/70 hover:bg-[#232336]/90 border border-[#27272a] rounded-md transition-all duration-300 transform hover:scale-[1.01] text-sm">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.20-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    <span className="text-gray-300 text-xs">
                        Continue with Google
                    </span>
                </button>
            </div>
        </div>
    );
};

export default SignIn;
