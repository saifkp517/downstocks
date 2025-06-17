import { useMemo } from 'react';

// Generate random PnL data for 5 weeks (7 days x 5 rows)
const generatePnLData = () => {
  const weeks = 5;
  const days = 7;
  const data = [];
  for (let week = 0; week < weeks; week++) {
    for (let day = 0; day < days; day++) {
      const isProfit = Math.random() > 0.5;
      const value = isProfit ? Math.floor(Math.random() * 1000) : -Math.floor(Math.random() * 1000);
      data.push({ week, day, value, isProfit });
    }
  }
  return data;
};

const PnLCommits = () => {
  const pnlData = useMemo(() => generatePnLData(), []);

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* PnL Commits Section */}
      <div className="bg-stone-900/90 rounded-2xl p-6 sm:p-8 border border-stone-700/40 
        backdrop-blur-sm shadow-lg shadow-stone-950/20">
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-semibold text-white">
            Daily PnL Activity
          </h3>
          <p className="text-stone-400 text-sm sm:text-base mt-1">
            Profit and Loss over the last 5 weeks
          </p>
        </div>
        <div className="flex flex-col items-start">
          {/* Commits Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 w-full">
            {pnlData.map((item, index) => (
              <div
                key={index}
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-sm 
                  ${item.isProfit ? 'bg-emerald-500/80 hover:bg-emerald-400' : 'bg-red-500/80 hover:bg-red-400'} 
                  transition-colors duration-200 cursor-pointer`}
                title={`Week ${item.week + 1}, Day ${item.day + 1}: ${item.value > 0 ? '+' : ''}${item.value} USD`}
              ></div>
            ))}
          </div>
          {/* Legend */}
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-sm bg-emerald-500/80"></div>
              <span className="text-sm text-stone-300">Profit</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-sm bg-red-500/80"></div>
              <span className="text-sm text-stone-300">Loss</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PnLCommits;