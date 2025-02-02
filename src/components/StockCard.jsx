import React from 'react';
import './StockCard.css';

const StockCard = ({ symbol, name, price, change, logo, isHighlighted, onHover }) => {
  const isPositive = change >= 0;

  return (
    <div
      className={`stock-card ${isHighlighted ? 'highlighted' : ''}`} // Add highlighted class
      onMouseEnter={() => onHover(symbol)} // Trigger hover event
      onMouseLeave={() => onHover(null)} // Remove hover event
    >
      <div className="stock-card-header">
        <div className="stock-info">
          <img src={logo || "/placeholder.svg"} alt={name} className="stock-logo" />
          <span className="stock-symbol">{symbol}</span>
        </div>
        <span className={`stock-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '+' : ''}{(change * 100).toFixed(2)}%
        </span>
      </div>
      <div className="stock-price">${price.toFixed(2)}</div>
      <div className="stock-name">{name}</div>
    </div>
  );
};

export default StockCard;
