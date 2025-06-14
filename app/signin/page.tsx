"use client";
import React, { useState, useEffect } from "react";
import { Mail, Lock } from "lucide-react";

interface FormData {
  email: string;
  password: string;
}

const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  console.log("refresh")

  const [dots, setDots] = useState<Array<{ id: number; x: number; y: number; opacity: number; size: number }>>([]);

  // Generate dynamic dots
  useEffect(() => {
    const generateDots = () => {
      const newDots = [];
      const spacing = 50; // Reduced spacing for more concentrated dots
      const cols = Math.ceil(window.innerWidth / spacing);
      const rows = Math.ceil(window.innerHeight / spacing);
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          newDots.push({
            id: i * rows + j,
            x: i * spacing + Math.random() * 8 - 4,
            y: j * spacing + Math.random() * 8 - 4,
            opacity: Math.random() * 0.4 + 0.2, // Slightly higher base opacity
            size: Math.random() * 3 + 1.5 // Slightly larger dots
          });
        }
      }
      setDots(newDots);
    };

    generateDots();
    window.addEventListener('resize', generateDots);
    
    // Animate dots
    const interval = setInterval(() => {
      setDots(prevDots => 
        prevDots.map(dot => ({
          ...dot,
          opacity: Math.random() * 0.5 + 0.1,
          size: Math.random() * 3 + 1
        }))
      );
    }, 3000);

    return () => {
      window.removeEventListener('resize', generateDots);
      clearInterval(interval);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Sign in attempt:", formData);
  };

  return (
    <div className="min-h-screen dark bg-background flex items-center justify-center p-4 overflow-hidden">
      {/* Dynamic Dotted Background */}
      <div className="absolute inset-0 z-0">
        {dots.map((dot) => (
          <div
            key={dot.id}
            className="absolute rounded-full transition-all duration-1500 ease-in-out bg-purple-400"
            style={{
              left: `${dot.x}px`,
              top: `${dot.y}px`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              opacity: dot.opacity,
              boxShadow: `0 0 ${dot.size * 2}px hsl(var(--primary)/0.4)`
            }}
          />
        ))}
      </div>

      {/* Main Sign-In Card */}
      <div className="relative z-10 w-full max-w-xl">
        <div
          className="bg-transparent backdrop-blur-xl border border-gray-900 rounded-lg p-8 shadow-2xl transition-all duration-300 hover:shadow-primary/10"
          style={{
            background: `linear-gradient(135deg, hsl(var(--card)/0.95), hsl(var(--card)/0.85))`,
            boxShadow: `0 0 20px hsl(var(--primary)/0.1)`,
          }}
        >
          {/* Logo with Pulse Effect */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-background rounded-full flex items-center justify-center border border-border animate-pulse-slow">
              <svg
                className="w-7 h-7 text-primary"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.24L19.38 7v8.76L12 18.76l-7.38-3V7L12 4.24z" />
              </svg>
            </div>
          </div>

          {/* Welcome Text with Gradient */}
          <div className="text-center mb-8">
            <h1
              className="text-4xl font-bold tracking-tight"
              style={{
                background: `linear-gradient(90deg, hsl(var(--foreground)), hsl(var(--primary)))`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DownStocks AI
            </h1>
            <p className="text-muted-foreground text-sm mt-2">
              High Frequency AI Trading Model
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-primary hover:text-accent transition-colors underline"
              >
                Sign Up
              </a>
            </p>
          </div>

          {/* Form with Input Animations */}
          <div className="space-y-5">
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 transition-transform duration-300 group-focus-within:scale-110" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="w-full bg-background/30 border border-input rounded-md pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 transition-transform duration-300 group-focus-within:scale-110" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full bg-background/30 border border-input rounded-md pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-purple-600 text-white font-semibold py-3 rounded-md transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            >
              <span className="relative z-10">Sign In</span>
              <span className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </button>

            {/* Terms and Privacy */}
            <p className="text-xs text-muted-foreground text-center mt-3">
              By continuing, you agree to our{" "}
              <a
                href="#"
                className="text-primary hover:underline transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-primary hover:underline transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
              .
            </p>

            {/* Forgot Password */}
            <div className="flex justify-end mt-2">
              <a
                href="/forgot-password"
                className="text-xs text-primary hover:text-accent underline transition-colors"
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-card text-muted-foreground">OR</span>
            </div>
          </div>

          {/* Social Login Button with Hover Effect */}
          <button className="w-full flex items-center justify-center py-3 px-4 bg-background/30 hover:bg-muted/50 border border-border rounded-md transition-all duration-300 transform hover:scale-[1.01]">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="hsl(var(--chart-1))"
                d="M22.56 12.25c0-.78-.07-1.53-.20-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="hsl(var(--chart-2))"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="hsl(var(--chart-3))"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="hsl(var(--chart-4))"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-muted-foreground text-sm">
              Continue with Google
            </span>
          </button>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default SignInPage;