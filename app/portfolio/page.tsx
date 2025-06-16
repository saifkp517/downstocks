"use client"

import React from 'react';
import { GeistSans } from "geist/font/sans";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Bell, Calendar } from 'lucide-react';

const revenueData = [
  { month: 'Jan', income: 2000, expense: 1800 },
  { month: 'Feb', income: 3200, expense: 2100 },
  { month: 'Mar', income: 1800, expense: 2800 },
  { month: 'Apr', income: 3800, expense: 2200 },
  { month: 'May', income: 2200, expense: 3200 },
  { month: 'Jun', income: 4200, expense: 1900 },
  { month: 'Jul', income: 3600, expense: 2600 },
];

const dailyExpensesData = Array.from({ length: 12 }, (_, i) => ({
  day: (i + 1).toString(),
  expenses: Math.floor(Math.random() * 200) + 100,
  lastMonth: Math.floor(Math.random() * 150) + 80,
}));

const pieData = [
  { name: 'Food & Drink', value: 48, color: '#22c55e' },
  { name: 'Grocery', value: 32, color: '#8b5cf6' },
  { name: 'Shopping', value: 13, color: '#ef4444' },
  { name: 'Transport', value: 7, color: '#f59e0b' },
];

const transactions = [
  { id: 'S', name: 'Samantha William', date: 'Apr 11', type: 'Income', amount: '$1,640.26', color: 'bg-pink-500' },
  { id: 'G', name: 'Grocery at Shop', date: 'Apr 10', type: 'Expenses', amount: '$72.64', color: 'bg-emerald-500' },
  { id: 'C', name: 'Coffee', date: 'Apr 09', type: 'Expenses', amount: '$8.65', color: 'bg-orange-500' },
  { id: 'K', name: 'Karen Smith', date: 'Apr 09', type: 'Income', amount: '$842.50', color: 'bg-purple-500' },
  { id: 'T', name: 'Transportation', date: 'Apr 07', type: 'Expenses', amount: '$18.52', color: 'bg-red-500' },
];

export default function FinancialDashboard() {
  return (
    <div className={`min-h-screen bg-gray-950 text-white ${GeistSans.className}`}>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 bg-gray-950 border-b border-gray-800">
        <div className="flex items-center space-x-12">
          <div className="text-xl font-semibold text-white">.wallet</div>
          <nav className="flex space-x-8">
            <div className="relative">
              <a href="#" className="text-purple-400 font-medium pb-3 block">Dashboard</a>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400"></div>
            </div>
            <a href="#" className="text-gray-400 hover:text-white font-medium">Saving Plan</a>
            <a href="#" className="text-gray-400 hover:text-white font-medium">Credit Cards</a>
            <a href="#" className="text-gray-400 hover:text-white font-medium">Settings</a>
            <a href="#" className="text-gray-400 hover:text-white font-medium">Account</a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-white font-medium">Jonathan Hope</span>
          <div className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">JH</span>
          </div>
          <div className="relative">
            <Bell className="w-5 h-5 text-gray-400" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8 bg-gray-950">
        {/* Page Title */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold mb-3 text-white">Dashboard</h1>
            <p className="text-gray-400 text-base">Hi Jonathan, here are your financial stats</p>
          </div>
          <div className="flex items-center space-x-3 text-gray-400">
            <span className="text-sm">Showing data</span>
            <div className="flex items-center space-x-2 bg-gray-900 px-4 py-2.5 rounded-lg border border-gray-700">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-white text-sm font-medium">01 Apr, 2024 - 12 Apr, 2024</span>
            </div>
          </div>
        </div>

        {/* Top Row */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-gray-900 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Revenue</h3>
                <p className="text-gray-400 text-sm">Data from 1-12 Apr, 2024</p>
              </div>
              <button className="bg-gray-800 hover:bg-gray-700 px-4 py-1.5 rounded-md text-sm text-white font-medium">
                View Report
              </button>
            </div>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <YAxis hide />
                  <Line 
                    type="monotone" 
                    dataKey="income" 
                    stroke="#22c55e" 
                    strokeWidth={3} 
                    dot={false} 
                    strokeDasharray="0"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expense" 
                    stroke="#8b5cf6" 
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
                <span className="text-sm text-gray-400">Income</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-400">Expense</span>
              </div>
            </div>
          </div>

          {/* Daily Expenses Chart */}
          <div className="bg-gray-900 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Daily Expenses</h3>
                <p className="text-gray-400 text-sm">Data from 1-12 Apr, 2024</p>
              </div>
              <button className="bg-gray-800 hover:bg-gray-700 px-4 py-1.5 rounded-md text-sm text-white font-medium">
                View Report
              </button>
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
                <span className="text-sm text-gray-400">Expenses</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                <span className="text-sm text-gray-400">Compare to last month</span>
              </div>
            </div>
          </div>

          {/* Summary Pie Chart */}
          <div className="bg-gray-900 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Summary</h3>
                <p className="text-gray-400 text-sm">Data from 1-12 Apr, 2024</p>
              </div>
              <button className="bg-gray-800 hover:bg-gray-700 px-4 py-1.5 rounded-md text-sm text-white font-medium">
                View Report
              </button>
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
                    <span className="text-gray-400 text-sm font-semibold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-3 gap-8">
          {/* Daily Transactions */}
          <div className="col-span-2 bg-gray-900 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Daily Transactions</h3>
                <p className="text-gray-400 text-sm">Data from 1-12 Apr, 2024</p>
              </div>
              <button className="bg-gray-800 hover:bg-gray-700 px-4 py-1.5 rounded-md text-sm text-white font-medium">
                View Report
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400 text-sm">
                    <th className="text-left py-4 font-medium">Description</th>
                    <th className="text-left py-4 font-medium">Date</th>
                    <th className="text-left py-4 font-medium">Type</th>
                    <th className="text-right py-4 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={index} className="border-t border-gray-800">
                      <td className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 ${transaction.color} rounded-full flex items-center justify-center`}>
                            <span className="text-white font-bold text-sm">{transaction.id}</span>
                          </div>
                          <span className="text-white font-medium">{transaction.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-400 font-medium">{transaction.date}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          transaction.type === 'Income' 
                            ? 'bg-emerald-900/50 text-emerald-300' 
                            : 'bg-red-900/50 text-red-300'
                        }`}>
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
            <div className="bg-gray-900 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Saving Goal</h3>
                <button className="bg-gray-800 hover:bg-gray-700 px-4 py-1.5 rounded-md text-sm text-white font-medium">
                  View Report
                </button>
              </div>
              <div className="mb-6">
                <div className="text-gray-400 text-sm mb-2 font-medium">75% Progress</div>
                <div className="text-3xl font-bold mb-2 text-white">$1052.98</div>
                <div className="text-gray-400 text-sm font-medium">of $1,200</div>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full relative" style={{ width: '75%' }}>
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-emerald-500"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Blog */}
            <div className="bg-gray-900 rounded-2xl p-6 relative overflow-hidden">
              <h3 className="text-xl font-semibold mb-3 text-white">Visit our financial blog</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                We have many articles related to financial that will help you to manage your money
              </p>
              <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm font-semibold text-white mb-4">
                Visit Blog
              </button>
              <div className="absolute bottom-4 right-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center opacity-80">
                  <div className="text-2xl">📊</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}