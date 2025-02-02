import { useState, useEffect } from "react";
import StockCard from "./StockCard";
import StockSlideshow from "./StockSlideshow";
import "./Dashboard.css";

const Dashboard = () => {
  const [topStocks, setTopStocks] = useState([]);
  const [stockData, setStockData] = useState({});

  useEffect(() => {
    // Mocking the stock data for AAPL, MSFT, GOOGL for one week
    setTimeout(() => {
      const mockData = {
        AAPL: [
          { date: '2025-01-25', price: 193.36 },
          { date: '2025-01-26', price: 195.12 },
          { date: '2025-01-27', price: 192.45 },
          { date: '2025-01-28', price: 191.10 },
          { date: '2025-01-29', price: 190.85 },
          { date: '2025-01-30', price: 193.75 },
          { date: '2025-01-31', price: 195.22 },
        ],
        MSFT: [
          { date: '2025-01-25', price: 403.93 },
          { date: '2025-01-26', price: 407.12 },
          { date: '2025-01-27', price: 405.20 },
          { date: '2025-01-28', price: 406.85 },
          { date: '2025-01-29', price: 404.60 },
          { date: '2025-01-30', price: 408.15 },
          { date: '2025-01-31', price: 410.12 },
        ],
        GOOGL: [
          { date: '2025-01-25', price: 142.65 },
          { date: '2025-01-26', price: 144.20 },
          { date: '2025-01-27', price: 141.95 },
          { date: '2025-01-28', price: 140.85 },
          { date: '2025-01-29', price: 142.10 },
          { date: '2025-01-30', price: 143.65 },
          { date: '2025-01-31', price: 142.80 },
        ],
      };
      setStockData(mockData);

      const mockTopStocks = [
        {
          symbol: "AAPL",
          name: "Apple Inc.",
          price: mockData.AAPL[mockData.AAPL.length - 1].price,
          change: ((mockData.AAPL[mockData.AAPL.length - 1].price - mockData.AAPL[0].price) / mockData.AAPL[0].price) * 100,
          logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
        },
        {
          symbol: "MSFT",
          name: "Microsoft Corporation",
          price: mockData.MSFT[mockData.MSFT.length - 1].price,
          change: ((mockData.MSFT[mockData.MSFT.length - 1].price - mockData.MSFT[0].price) / mockData.MSFT[0].price) * 100,
          logo: "https://www.microsoft.com/favicon.ico",
        },
        {
          symbol: "GOOGL",
          name: "Alphabet Inc.",
          price: mockData.GOOGL[mockData.GOOGL.length - 1].price,
          change: ((mockData.GOOGL[mockData.GOOGL.length - 1].price - mockData.GOOGL[0].price) / mockData.GOOGL[0].price) * 100,
          logo: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
        },
      ];
      setTopStocks(mockTopStocks);
    }, 1000); // Simulate API response delay
  }, []);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="stock-grid">
        {topStocks.map((stock) => (
          <StockCard key={stock.symbol} {...stock} />
        ))}
      </div>
      <div className="market-overview">
        <h2 className="market-overview-title">Market Overview</h2>
        <StockSlideshow stockData={stockData} />
      </div>
    </div>
  );
};

export default Dashboard;
