"use client"

import { useState } from 'react';
import { GeistSans } from "geist/font/sans";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Tooltip } from 'recharts';
import PnLCommits from '@/components/PnL';
import { Bell, Calendar as CalendarIcon } from 'lucide-react';
import { DateRangePicker } from 'react-date-range';
import { format } from "date-fns";
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css'; // Theme CSS file
import '@/styles/daterange-custom.css';

const revenueData = [
  { day: 'Mon', returns: 1200, losses: 600 },
  { day: 'Tue', returns: 1500, losses: 800 },
  { day: 'Wed', returns: 800, losses: 1000 },
  { day: 'Thu', returns: 1900, losses: 700 },
  { day: 'Fri', returns: 1700, losses: 900 },
  { day: 'Sat', returns: 2100, losses: 500 },
  { day: 'Sun', returns: 1300, losses: 1100 },
];


const pieData = [
  { name: 'AAPL', value: 48, color: '#22c55e' },
  { name: 'AMZN', value: 32, color: '#155DFC' },
  { name: 'BTC', value: 13, color: '#ef4444' },
  { name: 'ETH', value: 7, color: '#f59e0b' },
  { name: 'OTHERS', value: 3, color: '#8b5cf6' }
];

const transactionsReport = [
  { name: 'Reliance', quantity: 10, type: 'BUY', price: '₹3,250.00', timestamp: 'Jun 17', status: 'Completed' },
  { name: 'Tata Steel', quantity: 5, type: 'SELL', price: '₹1,120.45', timestamp: 'Jun 16', status: 'Completed' },
  { name: 'Infosys', quantity: 8, type: 'BUY', price: '₹2,480.00', timestamp: 'Jun 15', status: 'Completed' },
  { name: 'HDFC Bank', quantity: 12, type: 'SELL', price: '₹750.25', timestamp: 'Jun 14', status: 'Completed' },
  { name: 'Bajaj Finserv', quantity: 3, type: 'BUY', price: '₹5,330.90', timestamp: 'Jun 13', status: 'Completed' },
  { name: 'Adani Ports', quantity: 7, type: 'SELL', price: '₹980.00', timestamp: 'Jun 12', status: 'Completed' },
  { name: 'Maruti Suzuki', quantity: 2, type: 'BUY', price: '₹10,450.00', timestamp: 'Jun 11', status: 'Completed' },
  { name: 'SBI', quantity: 15, type: 'SELL', price: '₹615.70', timestamp: 'Jun 10', status: 'Completed' },
  { name: 'Wipro', quantity: 9, type: 'BUY', price: '₹495.00', timestamp: 'Jun 09', status: 'Completed' },
  { name: 'Coal India', quantity: 11, type: 'SELL', price: '₹345.25', timestamp: 'Jun 08', status: 'Completed' },
  { name: 'Larsen & Toubro', quantity: 4, type: 'BUY', price: '₹3,010.80', timestamp: 'Jun 07', status: 'Completed' },
  { name: 'DMart', quantity: 6, type: 'SELL', price: '₹4,350.60', timestamp: 'Jun 06', status: 'Completed' },
  { name: 'Zomato', quantity: 20, type: 'BUY', price: '₹148.00', timestamp: 'Jun 05', status: 'Completed' },
  { name: 'Paytm', quantity: 13, type: 'SELL', price: '₹310.00', timestamp: 'Jun 04', status: 'Completed' },
];

const newsItems = [
  {
    headline: "Stock market update: Nifty Bank index falls 0.06% in a weak market",
    timeAgo: "2 hours ago",
    source: "Economic Times"
  },
  {
    headline: "Stock market update: Nifty Pharma index falls 0.34% in a weak market",
    timeAgo: "2 hours ago",
    source: "Economic Times"
  },
  {
    headline: "Stock market update: Sugar stocks up as market falls",
    timeAgo: "2 hours ago",
    source: "Economic Times"
  },
  {
    headline: "Share market update: Most active stocks of the day in terms of total traded value",
    timeAgo: "2 hours ago",
    source: "Economic Times"
  },
  {
    headline: "Stock market update: Nifty IT index advances 0.08% in a weak market",
    timeAgo: "2 hours ago",
    source: "Economic Times"
  },
  {
    headline: "Share market update: Most active stocks on D-Street today in terms of volume",
    timeAgo: "2 hours ago",
    source: "Economic Times"
  },
  {
    headline: "Sensex Today | Stock Market LIVE Updates: GIFT Nifty signals a muted start; Asian shares trade lower",
    timeAgo: "2 hours ago",
    source: "Economic Times"
  },
  {
    headline: "Stock market update: Nifty Auto index advances 0.18%",
    timeAgo: "2 hours ago",
    source: "Economic Times"
  },
  {
    headline: "Stock market update: Mining stocks up as market rises",
    timeAgo: "2 hours ago",
    source: "Economic Times"
  },
  {
    headline: "Stock market update: Sugar stocks down as market falls",
    timeAgo: "2 hours ago",
    source: "Economic Times"
  }
];

const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = ['rose', 'blue', 'green', 'purple', 'yellow', 'cyan', 'indigo'];
  return colors[Math.abs(hash) % colors.length];
};

export default function FinancialDashboard() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isTradingActive, setIsTradingActive] = useState(false);
  const [calenderOpen, setCalenderOpen] = useState(false);
  const [range, setRange] = useState({
    startDate: new Date(2024, 3, 1),
    endDate: new Date(2024, 3, 12),
    key: 'selection',
  });

  const formattedRange = range.startDate && range.endDate
    ? `${format(range.startDate, 'dd MMM, yyyy')} - ${format(range.endDate, 'dd MMM, yyyy')}`
    : "Select date range";

  // Calculate the number of days in the selected range (inclusive)
  const rangeLength =
    range.startDate && range.endDate
      ? Math.ceil(
        (range.endDate.getTime() - range.startDate.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1
      : 0;

  const dailyExpensesData = Array.from({ length: rangeLength }, (_, i) => ({
    day: (i + 1).toString(),
    returns: i < rangeLength ? Math.floor(Math.random() * 200) + 100 : undefined,
    investment: i < rangeLength ? Math.floor(Math.random() * 150) + 80 : undefined,
  }));


  const toggleTrading = () => {
    setIsTradingActive(!isTradingActive);
  };


  const handleSelect = (ranges: any) => {
    setRange(ranges.selection);
    setCalenderOpen(false); // Close dropdown on select
  };

  return (
    <div className={`min-h-screen bg-stone-950 text-white ${GeistSans.className}`}>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 bg-stone-950 border-b border-stone-800 sticky top-0 z-30">
        <div className="flex items-center space-x-12">
          <div className="text-xl font-semibold text-white">Downstocks</div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-white font-medium">Jonathan Hope</span>
          <div className="relative">
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-9 h-9 cursor-pointer bg-stone-700 rounded-full flex items-center justify-center"
            >
              <span className="text-sm font-medium text-white">JH</span>
            </div>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-stone-900 border border-stone-800 rounded-lg shadow-lg z-10">
                <ul className="py-2 text-sm text-stone-300">
                  <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-stone-800">
                      View Profile
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-stone-800">
                      Settings
                    </button>
                  </li>
                  <li>
                    <hr className="my-1 border-stone-700" />
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 text-red-400 hover:bg-stone-800 hover:text-red-300">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative focus:outline-none"
            >
              <Bell className="w-5 h-5 text-stone-400" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-stone-900 border border-stone-800 rounded-lg shadow-lg z-10">
                <div className="p-4 text-stone-400 text-sm text-center">
                  You don't have any current notifications
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        onClick={() => {
          if(calenderOpen) {setCalenderOpen(false)}
          setNotifOpen(false)
          setProfileOpen(false)
        }}
        className="p-8 bg-stone-950"
      >
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-10 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-4xl font-bold mb-3 text-white">Dashboard</h1>
            <p className="text-stone-400 text-base">
              Hi Jonathan, here are your financial stats
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 text-stone-400 space-y-2 sm:space-y-0">
            <span className="text-sm">Showing data</span>

            <div className="relative inline-block">
              <button
                onClick={() => setCalenderOpen(!calenderOpen)}
                className="flex items-center space-x-2 bg-stone-900 px-4 py-2.5 rounded-lg border border-stone-700"
              >
                <CalendarIcon className="w-4 h-4 text-stone-400" />
                <span className="text-white text-sm font-medium">{formattedRange}</span>
              </button>

              {calenderOpen && (
                <div className="absolute right-0 mt-2 z-50 bg-stone-900 border border-stone-700 rounded-lg shadow-xl w-fit max-w-[90vw] overflow-hidden">

                  <DateRangePicker
                    ranges={[range]}
                    onChange={handleSelect}
                    className="bg-stone-900 text-white"
                    rangeColors={['#22c55e']}
                    direction="horizontal"
                    showDateDisplay={false}
                    minDate={new Date(2020, 0, 1)}
                    maxDate={new Date()}
                    calendarFocus="forwards"
                  />
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Top Row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-stone-900 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Top Movers</h3>
                <p className="text-stone-400 text-sm">Top Stocks From Your Portfolio Today</p>
              </div>

            </div>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#9ca3af' }}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }}
                    labelStyle={{ color: '#9ca3af' }}
                    formatter={(value: number, name: string) => [`₹${value}`, name === 'returns' ? 'Returns' : 'Losses']}
                  />
                  <Line
                    type="monotone"
                    dataKey="returns"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={false}
                    strokeDasharray="0"
                  />
                  <Line
                    type="monotone"
                    dataKey="losses"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={false}
                    strokeDasharray="0"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-sm text-stone-400">Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-stone-400">Losses</span>
              </div>
            </div>
          </div>

          {/* Daily Expenses Chart */}
          <div className="bg-stone-900 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Total Returns</h3>
                <p className="text-stone-400 text-sm">Data from {formattedRange}</p>
              </div>
              <div className='text-end'>
                <h3 className="text-xl font-semibold  mb-1">Returns: <span className='text-emerald-400'>₹1234</span></h3>
                <p className="text-stone-400 text-sm">Invested: $1234</p>
              </div>
            </div>
            <div
              className={`h-48 mb-4 ${rangeLength > 12 ? "overflow-x-auto scrollbar-stone-600" : ""}`}
              style={{
                maxWidth: "100%",
                overflowX: rangeLength > 12 ? "auto" : "visible",
              }}
            >
              <ResponsiveContainer
                width={rangeLength > 12 ? rangeLength * 40 : "100%"}
                height="100%"
              >
                <BarChart
                  data={dailyExpensesData}
                  barCategoryGap="20%"
                >
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                  />
                  <YAxis hide />
                  <Bar dataKey="returns" fill="#155DFC" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="investment" fill="#4b5563" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-stone-400">Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-stone-600 rounded-full"></div>
                <span className="text-sm text-stone-400">Investment</span>
              </div>
            </div>
          </div>

          {/* Summary Pie Chart */}
          <div className="bg-stone-900 rounded-2xl p-6">
            <div className="flex items-start replenishing funds for the future mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Today's Returns</h3>
                <p className="text-stone-400 text-sm">Data for today's returns</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="relative mr-8">
                <div className="h-36 w-36">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={62}
                        outerRadius={70}
                        dataKey="value"
                        startAngle={90}
                        endAngle={450}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold text-white">$8,295</div>
                  <div className="text-emerald-400 text-sm font-semibold">↑ 21%</div>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-white text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-stone-400 text-sm font-semibold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 text-center">
              {isTradingActive ? (
                <div className="flex items-center justify-center space-x-2 text-stone-400 text-sm">
                  <div className="w-4 h-4 border-2 border-t-transparent border-stone-400 rounded-full animate-spin"></div>
                  <span>Trading stocks currently...</span>
                </div>
              ) : (
                <button
                  onClick={toggleTrading}
                  className="px-4 py-2 bg-stone-700 text-white text-sm font-medium rounded-md hover:bg-stone-600 transition-colors"
                >
                  Prompt Bot to Activate Trades
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Daily Transactions */}
          <div className="col-span-2 bg-stone-900 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Daily Transactions</h3>
                <p className="text-stone-400 text-sm">Data from 1–12 Apr, 2024</p>
              </div>
              <button
                onClick={() => setShowReportModal(true)}
                className="bg-stone-800 hover:bg-stone-700 px-4 py-1.5 rounded-md text-sm text-white font-medium"
              >
                View Report
              </button>
              {showReportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                  <div className="bg-stone-900 rounded-2xl p-6 max-w-2xl w-full shadow-xl border border-stone-700">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-semibold text-white">Detailed Report</h2>
                        <p className="text-sm text-stone-400">Full breakdown of your transactions</p>
                      </div>
                      <button
                        onClick={() => setShowReportModal(false)}
                        className="text-stone-400 hover:text-white text-xl leading-none"
                      >
                        ×
                      </button>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-stone-600">
                      <table className="min-w-full">
                        <thead>
                          <tr className="text-stone-400 text-sm border-b border-stone-800">
                            <th className="text-left py-3">Stock Name</th>
                            <th className="text-left py-3">Quantity</th>
                            <th className="text-left py-3">Type</th>
                            <th className="text-left py-3">Price</th>
                            <th className="text-left py-3">Timestamp</th>
                            <th className="text-left py-3">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactionsReport.map((txn, i) => (
                            <tr key={i} className="border-t border-stone-800">
                              <td className="py-3 text-white">{txn.name ?? "--"}</td>
                              <td className="py-3 text-white">{txn.quantity ?? "--"}</td>
                              <td className="py-3">
                                <span
                                  className={`px-2 py-0.5 rounded text-xs font-medium ${txn.type === 'BUY'
                                    ? 'bg-emerald-900/50 text-emerald-300'
                                    : 'bg-red-900/50 text-red-300'
                                    }`}
                                >
                                  {txn.type}
                                </span>
                              </td>
                              <td className="py-3 text-white">{txn.price ?? "--"}</td>
                              <td className="py-3 text-stone-400">{txn.timestamp ?? "--"}</td>
                              <td className="py-3 text-white">{txn.status ?? "--"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => setShowReportModal(false)}
                        className="bg-stone-700 hover:bg-stone-600 px-4 py-2 rounded-md text-sm text-white"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-stone-600">
              <table className="min-w-full">
                <thead>
                  <tr className="text-stone-400 text-sm">
                    <th className="text-left py-4 font-medium">Stock Name</th>
                    <th className="text-left py-4 font-medium">Quantity</th>
                    <th className="text-left py-4 font-medium">Type</th>
                    <th className="text-left py-4 font-medium">Price</th>
                    <th className="text-left py-4 font-medium">Timestamp</th>
                    <th className="text-left py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionsReport.map((transaction, index) => (
                    <tr key={index} className="border-t border-stone-800">
                      <td className="py-4">
                        <div className="flex items-center space-x-4">

                          <span className="text-white font-medium">{transaction.name ?? "--"}</span>
                        </div>
                      </td>
                      <td className="py-4 text-white font-medium">{transaction.quantity ?? "--"}</td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${transaction.type === 'BUY'
                            ? 'bg-emerald-900/50 text-emerald-300'
                            : 'bg-red-900/50 text-red-300'
                            }`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td className="py-4 text-white font-medium">{transaction.price ?? "--"}</td>
                      <td className="py-4 text-stone-400 font-medium">{transaction.timestamp ?? "--"}</td>
                      <td className="py-4 text-white font-medium">{transaction.status ?? "--"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Trending News */}
            <div className="bg-stone-900/90 rounded-2xl p-6 sm:p-8
    backdrop-blur-md shadow-xl shadow-stone-950/20">
              <div className="flex items-start justify-between mb-6">
                <div className="space-y-4 max-h-96 overflow-y-auto pr-3 scrollbar-stone-600 scrollbar-thin 
        scrollbar-thumb-stone-500/80 scrollbar-track-stone-800/50">
                  <h1 className="text-3xl sm:text-4xl font-bold text-transparent 
          bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">
                    Trending News
                  </h1>
                  <br />
                  {newsItems.map((item, index) => (
                    <div
                      key={index}
                      className="border-b border-stone-700/40 pb-4 last:border-b-0 
              hover:bg-stone-800/40 hover:scale-[1.01] hover:shadow-md 
              rounded-lg px-3 py-2 transition-all duration-200 ease-out cursor-pointer"
                    >
                      <h4 className="text-sm sm:text-base font-medium text-gray-100 
              leading-6 mb-2 hover:text-white transition-colors duration-150">
                        {item.headline}
                      </h4>
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-300">
                        <span className="opacity-80">{item.timeAgo}</span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium 
                bg-${stringToColor(item.source)}-500/20 text-${stringToColor(item.source)}-400`}>
                          {item.source}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="space-y-8">
          <PnLCommits />
        </div> */}
      </main>
    </div>
  );
}