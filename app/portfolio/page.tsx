"use client"

import { useState } from 'react';
import { GeistSans } from "geist/font/sans";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Bell } from 'lucide-react';
import { Calendar as CalendarIcon } from 'lucide-react';
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

const dailyExpensesData = Array.from({ length: 12 }, (_, i) => ({
  day: (i + 1).toString(),
  expenses: Math.floor(Math.random() * 200) + 100,
  lastMonth: Math.floor(Math.random() * 150) + 80,
}));

const pieData = [
  { name: 'AAPL', value: 48, color: '#22c55e' },
  { name: 'AMZN', value: 32, color: '#8b5cf6' },
  { name: 'BTC', value: 13, color: '#ef4444' },
  { name: 'ETH', value: 7, color: '#f59e0b' },
];

const transactionsReport = [
  { id: 'R', name: 'Reliance', date: 'Jun 17', type: 'BUY', amount: '₹3,250.00', color: 'bg-blue-500' },
  { id: 'T', name: 'Tata Steel', date: 'Jun 16', type: 'SELL', amount: '₹1,120.45', color: 'bg-stone-500' },
  { id: 'I', name: 'Infosys', date: 'Jun 15', type: 'BUY', amount: '₹2,480.00', color: 'bg-green-500' },
  { id: 'H', name: 'HDFC Bank', date: 'Jun 14', type: 'SELL', amount: '₹750.25', color: 'bg-yellow-500' },
  { id: 'B', name: 'Bajaj Finserv', date: 'Jun 13', type: 'BUY', amount: '₹5,330.90', color: 'bg-indigo-500' },
  { id: 'A', name: 'Adani Ports', date: 'Jun 12', type: 'SELL', amount: '₹980.00', color: 'bg-red-500' },
  { id: 'M', name: 'Maruti Suzuki', date: 'Jun 11', type: 'BUY', amount: '₹10,450.00', color: 'bg-pink-500' },
  { id: 'S', name: 'SBI', date: 'Jun 10', type: 'SELL', amount: '₹615.70', color: 'bg-emerald-500' },
  { id: 'W', name: 'Wipro', date: 'Jun 09', type: 'BUY', amount: '₹495.00', color: 'bg-purple-500' },
  { id: 'C', name: 'Coal India', date: 'Jun 08', type: 'SELL', amount: '₹345.25', color: 'bg-orange-500' },
  { id: 'L', name: 'Larsen & Toubro', date: 'Jun 07', type: 'BUY', amount: '₹3,010.80', color: 'bg-cyan-500' },
  { id: 'D', name: 'DMart', date: 'Jun 06', type: 'SELL', amount: '₹4,350.60', color: 'bg-teal-500' },
  { id: 'Z', name: 'Zomato', date: 'Jun 05', type: 'BUY', amount: '₹148.00', color: 'bg-fuchsia-500' },
  { id: 'P', name: 'Paytm', date: 'Jun 04', type: 'SELL', amount: '₹310.00', color: 'bg-lime-500' },
];

export default function FinancialDashboard() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [calenderOpen, setCalenderOpen] = useState(false);
  const [range, setRange] = useState({
    startDate: new Date(2024, 3, 1),
    endDate: new Date(2024, 3, 12),
    key: 'selection',
  });

  const formattedRange = range.startDate && range.endDate
    ? `${format(range.startDate, 'dd MMM, yyyy')} - ${format(range.endDate, 'dd MMM, yyyy')}`
    : "Select date range";

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
      <main className="p-8 bg-stone-950">
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
                <h3 className="text-xl font-semibold text-white mb-1">Weekly Earnings</h3>
                <p className="text-stone-400 text-sm">Data from {formattedRange}</p>
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
                <h3 className="text-xl font-semibold text-white mb-1">Daily Returns</h3>
                <p className="text-stone-400 text-sm">Data from {formattedRange}</p>
              </div>
            </div>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyExpensesData} barCategoryGap="20%">
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <YAxis hide />
                  <Bar dataKey="expenses" fill="#8b5cf6" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="lastMonth" fill="#4b5563" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-stone-400">Expenses</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-stone-600 rounded-full"></div>
                <span className="text-sm text-stone-400">Compare to last month</span>
              </div>
            </div>
          </div>

          {/* Summary Pie Chart */}
          <div className="bg-stone-900 rounded-2xl p-6">
            <div className="flex items-start replenishing funds for the future mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Portfolio</h3>
                <p className="text-stone-400 text-sm">Data from {formattedRange}</p>
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
                      <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                      <span className="text-white text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-stone-400 text-sm font-semibold">{item.value}%</span>
                  </div>
                ))}
              </div>
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
                            <th className="text-left py-3">ID</th>
                            <th className="text-left py-3">Name</th>
                            <th className="text-left py-3">Date</th>
                            <th className="text-left py-3">Type</th>
                            <th className="text-right py-3">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactionsReport.map((txn, i) => (
                            <tr key={i} className="border-t border-stone-800">
                              <td className="py-3 text-white">{txn.id}</td>
                              <td className="py-3 text-white">{txn.name}</td>
                              <td className="py-3 text-stone-400">{txn.date}</td>
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
                              <td className="py-3 text-right text-white font-medium">{txn.amount}</td>
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
                    <th className="text-left py-4 font-medium">Description</th>
                    <th className="text-left py-4 font-medium">Date</th>
                    <th className="text-left py-4 font-medium">Type</th>
                    <th className="text-right py-4 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionsReport.map((transaction, index) => (
                    <tr key={index} className="border-t border-stone-800">
                      <td className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 ${transaction.color} rounded-full flex items-center justify-center`}>
                            <span className="text-white font-bold text-sm">{transaction.id}</span>
                          </div>
                          <span className="text-white font-medium">{transaction.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-stone-400 font-medium">{transaction.date}</td>
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
                      <td className="py-4 text-right font-bold text-white">{transaction.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Saving Goal */}
            <div className="bg-stone-900 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Saving Goal</h3>
              </div>
              <div className="mb-6">
                <div className="text-stone-400 text-sm mb-2 font-medium">75% Progress</div>
                <div className="text-3xl font-bold mb-2 text-white">$1052.98</div>
                <div className="text-stone-400 text-sm font-medium">of $1,200</div>
              </div>
              <div className="relative">
                <div className="w-full bg-stone-700 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full relative" style={{ width: '75%' }}>
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-emerald-500"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Blog */}
            <div className="bg-stone-900 rounded-2xl p-6 relative overflow-hidden">
              <h3 className="text-xl font-semibold mb-3 text-white">Visit our financial blog</h3>
              <p className="text-stone-400 text-sm mb-6 leading-relaxed">
                We have many articles related to financial that will help you to manage your money
              </p>
              <button className="bg-stone-800 hover:bg-stone-700 px-4 py-2 rounded-md text-sm font-semibold text-white mb-4">
                Visit Blog
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}