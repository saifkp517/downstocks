import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"

export default function DownstocksLanding() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Downstocks AI</span>
              </div>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Home
                </a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Live Charts
                </a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Open Source
                </a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Pricing
                </a>
              </div>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Combined Hero and Demo Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div>
              <Badge variant="secondary" className="mb-6 bg-purple-900/30 text-purple-300 border-purple-700">
                AI-POWERED TRADING
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Downstocks, your AI Trader.
              </h1>
              <p className="text-xl text-slate-400 mb-8">
                Downstocks by Kortix AI is a generative AI Agent that acts on your behalf in financial markets. Simply
                prompt what you want to trade, and our AI handles the rest.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-md mb-8">
                <Input
                  placeholder="Buy 100 shares of AAPL when it drops 5%"
                  className="bg-slate-900 border-slate-700 text-white placeholder-slate-500 pr-12 h-12 rounded-xl"
                />
                <Button size="icon" className="absolute right-1 top-1 h-10 w-10 bg-purple-600 hover:bg-purple-700">
                  <Search className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Start Trading Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
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
      <footer className="border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Downstocks AI</span>
              </div>
              <p className="text-slate-400 text-sm">
                Downstocks by Kortix AI is a generative AI Agent that acts on your behalf in financial markets.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
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
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
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
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
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
            <p className="text-slate-400 text-sm">© 2024 Kortix AI. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
