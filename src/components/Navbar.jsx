import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

// Custom debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();
  
  // Use the debounce hook with 500ms delay
  const debouncedSearch = useDebounce(searchQuery, 1000);

  // API call in useEffect
  useEffect(() => {
    const fetchStocks = async () => {
      if (debouncedSearch) {  // Only check if search query exists
        try {
          const response = await axios.get(`https://api.marketstack.com/v1/tickers`, {
            params: {
              access_key: "0150b745d21452b863f6c09d32a6edd7",
              search: debouncedSearch,
            },
          });

          if (response.data.data) {
            setStocks(response.data.data);
          } else {
            setStocks([]);
          }
        } catch (error) {
          console.error("Error fetching stock data", error);
          setStocks([]);
        }
      } else {
        setStocks([]);
      }
    };

    fetchStocks();
  }, [debouncedSearch]);

  
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClick = async(symbol) => {
    navigate(`/company/stocks/${symbol}`);


  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span>FinovateX</span>
        </div>
        <div className="navbar-items">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search stocks..."
              className="search-input"
              value={searchQuery}
              onChange={handleSearch}
            />
            <Search className="search-icon" />
            {stocks.length > 0 && (
              <ul className="search-results-dropdown">
                {stocks.map((stock, index) => (
                  <li onClick={() => handleClick(stock.symbol) } key={index} className="search-item">
                    {stock.symbol} - {stock.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="export-button">Export Report</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
