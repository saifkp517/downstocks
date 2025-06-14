"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import React, { useState, useEffect, useRef } from "react";
import { GeistSans } from "geist/font/sans";
import SignIn from "@/components/SignIn"
import {
  TrendingUp,
  BarChart3,
  Shield,
  Zap,
  ArrowRight,
  Play,
  Check,
  Github,
  Twitter,
  Linkedin,
  Search,
  X,
  Menu
} from "lucide-react"

export default function DownstocksLanding() {


  const [dots, setDots] = useState<Array<{ id: number; x: number; y: number; opacity: number; size: number }>>([]);
  const [showSignIn, setShowSignIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  //navbar scroll animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const screenHeight = window.innerHeight;
      setScrolled(scrollY > screenHeight / 2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate dynamic dots
  useEffect(() => {
    const generateDots = () => {
      if (!sectionRef.current) return;
      const section = sectionRef.current.getBoundingClientRect();
      const spacing = 50;
      const cols = Math.ceil(section.width / spacing);
      const rows = Math.ceil(section.height / spacing);
      const newDots = [];

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          newDots.push({
            id: i * rows + j,
            x: i * spacing + Math.random() * 8 - 4,
            y: j * spacing + Math.random() * 8 - 4,
            opacity: Math.random() * 0.4 + 0.2,
            size: Math.random() * 3 + 1.5,
          });
        }
      }
      setDots(newDots);
    };

    // Debounce resize handler
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const debouncedGenerateDots = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(generateDots, 200);
    };

    generateDots();
    window.addEventListener('resize', debouncedGenerateDots);

    // Animate dots
    const interval = setInterval(() => {
      setDots(prevDots =>
        prevDots.map(dot => ({
          ...dot,
          opacity: Math.random() * 0.5 + 0.1,
          size: Math.random() * 3 + 1,
        }))
      );
    }, 3000);

    return () => {
      window.removeEventListener('resize', debouncedGenerateDots);
      clearTimeout(resizeTimeout);
      clearInterval(interval);
    };
  }, []);


  const [inputValue, setInputValue] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  return (
    <div className={`min-h-screen bg-black text-white ${GeistSans.className}`} >
      {/* Navigation */}

      {/* Hovering SignIn */}
      {showSignIn && (
        <div onClick={() => setShowSignIn(false)} className="fixed inset-0 z-[200] flex items-center justify-center backdrop-blur-lg">
          <div className="rounded-xl mx-24">
            <SignIn />
          </div>
        </div>
      )}


      <nav
        className={`border border-gray-900 rounded-xl backdrop-blur-sm transition-all duration-500 sticky z-[110] mx-auto 
        ${scrolled ? 'top-4 max-w-6xl' : 'top-2 max-w-full'} 
        px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6 flex justify-center items-center`}
      >
        <div className="flex flex-col items-center w-full gap-4 sm:flex-row sm:justify-between sm:gap-6 max-w-7xl">
          {/* Logo */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="sm:text-sm md:text-md lg:text-lg font-bold">Downstocks AI</span>
            </div>
            {/* Hamburger Menu Button */}
            <button
              className="sm:hidden text-slate-300 hover:text-white"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Nav Links */}
          <div
            className={`${isMenuOpen ? 'flex' : 'hidden'
              } sm:flex flex-col items-center gap-2 sm:flex-row sm:gap-4 md:gap-6 w-full sm:w-auto transition-all duration-300`}
          >
            <a
              href="#"
              className="text-slate-300 hover:text-white transition-colors px-3 py-1.5 text-sm sm:text-base sm:px-4 sm:py-2 border border-gray-800 rounded-2xl w-full sm:w-auto text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#"
              className="text-slate-300 hover:text-white transition-colors px-3 py-1.5 text-sm sm:text-base sm:px-4 sm:py-2 w-full sm:w-auto text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Live Charts
            </a>
            <a
              href="#"
              className="text-slate-300 hover:text-white transition-colors px-3 py-1.5 text-sm sm:text-base sm:px-4 sm:py-2 w-full sm:w-auto text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Open Source
            </a>
          </div>

          {/* Get Started */}
          <div className="flex-shrink-0">
            <button
              onClick={() => (window.location.href = '/signin')}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-3xl px-4 py-1.5 text-sm sm:text-base sm:px-6 sm:py-2 w-full sm:w-auto"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>


      {/* Combined Hero and Demo Section */}
      <section
        ref={sectionRef}
        className="pt-56 pb-16 px-4 sm:px-6 lg:px-8 relative"
      >
        {/* Dot Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {dots.map((dot) => (
            <div
              key={dot.id}
              className="absolute rounded-full bg-purple-400 animate-pulse-slow"
              style={{
                left: `${dot.x}px`,
                top: `${dot.y}px`,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                opacity: dot.opacity,
                boxShadow: `0 0 ${dot.size * 2}px hsl(var(--primary)/0.3)`,
              }}
            />
          ))}
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-center">
              <div className="flex justify-center">
                <Badge
                  variant="secondary"
                  className="py-2 px-4 mb-8 bg-purple-900/30 text-purple-300 hover:text-purple-100 text-md"
                >
                  AI-POWERED TRADING
                </Badge>
              </div>
              <h1 className="text-5xl md:text-6xl font-medium tracking-tighter mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                <span className="text-purple-500 relative">
                  <span
                    className="absolute inset-0 blur-md opacity-50 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }}
                    aria-hidden="true"
                  />
                  <span className="relative z-10">Downstocks</span>
                </span>
                , your AI Trader.
              </h1>
              <p className="text-xl text-slate-400 mb-8 font-medium">
                Downstocks by Kortix AI is a generative AI Agent that acts on your behalf in financial markets. Simply prompt
                what you want to trade, and our AI handles the rest.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mb-8 mx-auto flex justify-center">
                <Input
                  placeholder="Buy 100 shares of AAPL when it drops 5%"
                  className="bg-transparent border-slate-700 text-white placeholder-slate-500 px-6 py-8 rounded-2xl focus:border-purple-800 focus:ring-0 focus:outline-none"
                  style={{ boxShadow: 'none' }}
                  onFocus={(e) => {
                    e.currentTarget.classList.add('border-purple-800');
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.classList.remove('border-purple-800');
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue || ''}
                />
                <Button
                  size="icon"
                  className={`absolute right-1 top-1/2 mr-2 -translate-y-1/2 h-10 w-10 ${inputValue ? 'bg-purple-500 hover:bg-purple-600' : 'bg-slate-800 hover:bg-slate-900'
                    } transition-colors`}
                  disabled={!inputValue}
                  onClick={() => setShowSignIn(true)}
                  style={{ transform: 'translateY(-50%)' }}
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-col justify-center sm:flex-row gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Start Trading Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Watch Demo
                  <Play className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Right side - Demo Video */}
            <div className="relative">
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold">Live Trading Dashboard</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-6 h-80">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-700 rounded p-3">
                      <div className="text-xs text-slate-400 mb-1">Portfolio Value</div>
                      <div className="text-lg font-bold text-green-400">$127,543.21</div>
                      <div className="text-xs text-green-400">+12.4% today</div>
                    </div>
                    <div className="bg-slate-700 rounded p-3">
                      <div className="text-xs text-slate-400 mb-1">Active Trades</div>
                      <div className="text-lg font-bold text-white">23</div>
                      <div className="text-xs text-purple-400">AI managed</div>
                    </div>
                  </div>
                  <div className="bg-slate-700 rounded-lg h-32 flex items-center justify-center mb-4">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                      <p className="text-xs text-slate-400">Real-time Market Analysis</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Last update: 2s ago</span>
                    <span className="text-green-400">● Live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Animations */}
        <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.6;
          }
        }
      `}</style>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Proven Performance Results</h2>
            <p className="text-slate-400 text-lg">
              Our AI-driven trading system delivers consistent returns for our users
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-400 mb-2">87.3%</div>
              <div className="text-slate-300 font-medium mb-1">Success Rate</div>
              <div className="text-sm text-slate-400">Average winning trades</div>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-400 mb-2">24.7%</div>
              <div className="text-slate-300 font-medium mb-1">Average Annual Return</div>
              <div className="text-sm text-slate-400">Compound growth rate</div>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-400 mb-2">2.1%</div>
              <div className="text-slate-300 font-medium mb-1">Maximum Drawdown</div>
              <div className="text-sm text-slate-400">Risk management</div>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl font-bold text-orange-400 mb-2">0.3s</div>
              <div className="text-slate-300 font-medium mb-1">Execution Speed</div>
              <div className="text-sm text-slate-400">Average trade time</div>
            </div>
          </div>

          {/* Additional Stats Bar */}
          <div className="mt-16 bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">$2.4M+</div>
                <div className="text-slate-400">Total Volume Traded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">15,000+</div>
                <div className="text-slate-400">Active Traders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">99.9%</div>
                <div className="text-slate-400">Uptime Reliability</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How to Use Downstocks AI</h2>
            <p className="text-slate-400 text-lg">Get started with AI-powered trading in just three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card className="bg-slate-900 border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-violet-600"></div>
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Connect Your Account</h3>
                </div>
                <div className="mb-6">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Connect Account"
                    className="rounded-lg w-full opacity-80"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-slate-300">
                    Securely link your brokerage account to Downstocks AI. We support major brokers including:
                  </p>
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Interactive Brokers
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      TD Ameritrade
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      E*TRADE
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Robinhood
                    </li>
                  </ul>
                  <p className="text-sm text-slate-400">
                    Your credentials are encrypted and stored securely. We never store your login information.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="bg-slate-900 border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-violet-600"></div>
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Set Your Strategy</h3>
                </div>
                <div className="mb-6">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Set Strategy"
                    className="rounded-lg w-full opacity-80"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-slate-300">
                    Configure your trading preferences and risk tolerance. Choose from pre-built strategies or create
                    custom ones:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-slate-800 rounded p-2 text-center">
                      <div className="text-purple-400 font-medium">Conservative</div>
                      <div className="text-slate-400">Low risk, steady growth</div>
                    </div>
                    <div className="bg-slate-800 rounded p-2 text-center">
                      <div className="text-purple-400 font-medium">Aggressive</div>
                      <div className="text-slate-400">High risk, high reward</div>
                    </div>
                    <div className="bg-slate-800 rounded p-2 text-center">
                      <div className="text-purple-400 font-medium">Balanced</div>
                      <div className="text-slate-400">Moderate risk/reward</div>
                    </div>
                    <div className="bg-slate-800 rounded p-2 text-center">
                      <div className="text-purple-400 font-medium">Custom</div>
                      <div className="text-slate-400">Your own rules</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400">
                    Set stop-loss limits, profit targets, and maximum position sizes to control your risk exposure.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="bg-slate-900 border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-violet-600"></div>
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Start Trading</h3>
                </div>
                <div className="mb-6">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Start Trading"
                    className="rounded-lg w-full opacity-80"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-slate-300">
                    Simply type your trading instructions in natural language. Our AI understands and executes complex
                    strategies:
                  </p>
                  <div className="bg-slate-800 rounded-lg p-4">
                    <div className="text-sm text-slate-400 mb-2">Example prompts:</div>
                    <div className="space-y-2 text-sm">
                      <div className="bg-slate-700 rounded p-2 text-slate-300">
                        "Buy $1000 worth of TSLA if it drops below $200"
                      </div>
                      <div className="bg-slate-700 rounded p-2 text-slate-300">
                        "Sell my AAPL position when it gains 15%"
                      </div>
                      <div className="bg-slate-700 rounded p-2 text-slate-300">
                        "Diversify my portfolio across tech stocks"
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400">
                    Monitor your trades in real-time through our dashboard. Get instant notifications for all executed
                    trades and market alerts.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-slate-400 text-sm mt-4">Start with paper trading to test strategies risk-free</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-purple-600 to-violet-700 border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-4 text-white">Start Using Downstocks AI Today</h2>
              <p className="text-purple-100 text-lg mb-8">
                Join thousands of traders who trust AI to optimize their trading strategies
              </p>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-slate-100 font-semibold">
                Get Started for Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-purple-200 text-sm mt-4">No commitment required. Start with our free plan today.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8 min-h-[50vh]">
        <div className="max-w-7xl mx-auto text-base md:text-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl md:text-2xl font-bold">Downstocks AI</span>
              </div>
              <p className="text-slate-400 text-sm md:text-base">
                Downstocks by Kortix AI is a generative AI Agent that acts on your behalf in financial markets.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm md:text-base">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Resources</h4>
              <ul className="space-y-2 text-slate-400 text-sm md:text-base">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm md:text-base">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    License Activity 2.0
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm md:text-base">© 2024 Kortix AI. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

      </footer>
    </div>
  )
}
