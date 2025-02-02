import { div } from 'framer-motion/client';
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useParams } from 'react-router-dom';

const CompanyStocks = () => {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState({
    data: [
      {
        "date": "2025-01-31T00:00:00+0000",
        "open": 123.78,
        "high": 127.85,
        "low": 119.19,
        "close": 120.07,
        "volume": 390372899
      },
      {
        "date": "2025-01-30T00:00:00+0000",
        "open": 123.1,
        "high": 125.0,
        "low": 118.1,
        "close": 124.65,
        "volume": 392925500
      },
      {
        "date": "2025-01-29T00:00:00+0000",
        "open": 126.5,
        "high": 126.89,
        "low": 120.05,
        "close": 123.7,
        "volume": 467120594
      },
      {
        "date": "2025-01-28T00:00:00+0000",
        "open": 121.81,
        "high": 129.0,
        "low": 116.25,
        "close": 128.99,
        "volume": 579666438
      },
      {
        "date": "2025-01-27T00:00:00+0000",
        "open": 124.8,
        "high": 128.4,
        "low": 116.7,
        "close": 118.42,
        "volume": 818830938
      },
      {
        "date": "2025-01-24T00:00:00+0000",
        "open": 148.37,
        "high": 148.97,
        "low": 141.88,
        "close": 142.62,
        "volume": 234657594
      },
      {
        "date": "2025-01-23T00:00:00+0000",
        "open": 145.05,
        "high": 147.23,
        "low": 143.72,
        "close": 147.22,
        "volume": 155915500
      },
      {
        "date": "2025-01-22T00:00:00+0000",
        "open": 144.66,
        "high": 147.79,
        "low": 143.67,
        "close": 147.07,
        "volume": 237651391
      },
      {
        "date": "2025-01-21T00:00:00+0000",
        "open": 139.16,
        "high": 141.83,
        "low": 137.09,
        "close": 140.83,
        "volume": 197748984
      }
    ].reverse()
  });
  const [timeRange, setTimeRange] = useState('1D');
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchHistoricalData = (range) => {
    const mockData = [];
    const endDate = new Date();  // Current date
    let currentDate = new Date(endDate); // Clone current date
    
    // Set the start date based on range
    switch(range) {
      case '1D':
        currentDate.setDate(endDate.getDate());
        currentDate.setHours(9, 30, 0, 0); // Start at market open
        break;
      case '7D':
        currentDate.setDate(endDate.getDate() - 7);
        break;
      case '1M':
        currentDate.setMonth(endDate.getMonth() - 1);
        break;
      case '6M':
        currentDate.setMonth(endDate.getMonth() - 6);
        break;
      case '1Y':
        currentDate.setFullYear(endDate.getFullYear() - 1);
        break;
    }

    // Generate data points
    const dataPoints = range === '1D' ? 24 : 30;
    for (let i = 0; i < dataPoints; i++) {
      mockData.push({
        date: new Date(currentDate).toISOString(),
        open: 120 + Math.random() * 30,
        high: 130 + Math.random() * 30,
        low: 110 + Math.random() * 30,
        close: 125 + Math.random() * 30,
        volume: Math.floor(100000000 + Math.random() * 500000000)
      });
      
      // Increment date based on range
      if (range === '1D') {
        currentDate.setHours(currentDate.getHours() + 1);
      } else {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    // Sort data chronologically
    mockData.sort((a, b) => new Date(a.date) - new Date(b.date));
    setStockData({ data: mockData });
  };

  const handleTimeRangeChange = (range) => {
    // Prevent duplicate updates if the time range hasn't changed
    if (timeRange === range) return;
    
    setTimeRange(range);
    fetchHistoricalData(range);

    // Get the current date
    const currentDate = new Date();
    let dateToStore = new Date(currentDate);

    // Calculate the correct date based on range
    switch(range) {
      case '1D':
        // Use current date
        break;
      case '7D':
        dateToStore.setDate(currentDate.getDate() - 7);
        break;
      case '1M':
        dateToStore.setMonth(currentDate.getMonth() - 1);
        break;
      case '6M':
        dateToStore.setMonth(currentDate.getMonth() - 6);
        break;
      case '1Y':
        dateToStore.setFullYear(currentDate.getFullYear() - 1);
        break;
    }
    
    // Format date as yyyy/mm/dd
    const formattedDate = dateToStore.toLocaleDateString('en-CA');
    setSelectedDate(formattedDate);
  };

  useEffect(() => {
    handleTimeRangeChange('1D'); // Initial load
  }, []); // Empty dependency array for initial load only

  // Optional: Add useEffect to monitor selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      console.log('Selected date for analysis:', selectedDate);
      // Here you can make your API call for real-time analysis
      // fetchRealTimeAnalysis(selectedDate);
    }
  }, [selectedDate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const formatShortDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-bold">{formatDate(data.date)}</p>
          <p>Open: ${data.open.toFixed(2)}</p>
          <p>High: ${data.high.toFixed(2)}</p>
          <p>Low: ${data.low.toFixed(2)}</p>
          <p>Close: ${data.close.toFixed(2)}</p>
          <p>Volume: {data.volume.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  const getCurrentDateDisplay = () => {
    // Get the first (earliest) data point instead of the last one
    const startData = stockData.data[0];
    const date = new Date(startData.date);
    
    switch(timeRange) {
      case '1D':
        return new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: 'numeric'
        }).format(date);
      case '7D':
        return new Intl.DateTimeFormat('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        }).format(date);
      case '1M':
        return new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric'
        }).format(date);
      case '6M':
      case '1Y':
        return new Intl.DateTimeFormat('en-US', {
          month: 'short',
          year: 'numeric'
        }).format(date);
      default:
        return formatDate(startData.date);
    }
  };

  return (
    <div className='flex justify-center items-center align-middle'>
      <div className='max-w-5xl'>
        <div className="w-full rounded-lg p-6 mt-32">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">NVIDIA Corp (NVDA)</h2>
                <p className="text-gray-500">NASDAQ</p>
                <p className="text-gray-500"></p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">${stockData.data[stockData.data.length - 1].close.toFixed(2)}</p>
                <p className="text-gray-500">
                  {getCurrentDateDisplay()}
                </p>
              </div>
            </div>
            
            {/* Time Range Buttons - Moved here */}
            <div className="flex gap-2 mt-4">
              {['1D', '7D', '1M', '6M', '1Y'].map((range) => (
                <button
                  key={range}
                  onClick={() => handleTimeRangeChange(range)}
                  className={`px-4 py-2 rounded-lg ${
                    timeRange === range 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={stockData.data}
                margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date"
                  tickFormatter={formatShortDate}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  domain={['dataMin - 1', 'dataMax + 1']}
                  tickFormatter={(value) => `$${value}`}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone"
                  dataKey="close"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div>
              <p className="text-sm text-gray-500">Previous Close</p>
              <p className="font-bold">${stockData.data[stockData.data.length - 2].close.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Open</p>
              <p className="font-bold">${stockData.data[stockData.data.length - 1].open.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Day's Range</p>
              <p className="font-bold">
                ${stockData.data[stockData.data.length - 1].low.toFixed(2)} - ${stockData.data[stockData.data.length - 1].high.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Volume</p>
              <p className="font-bold">{stockData.data[stockData.data.length - 1].volume.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default CompanyStocks;