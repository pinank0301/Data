import React from 'react';
import Slider from 'react-slick';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './StockSlideshow.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockSlideshow = ({ stockData }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Stock Price - Past Week',
      },
    },
  };

  const createChartData = (symbol) => {
    const data = stockData[symbol];
    return {
      labels: data.map(d => d.date),
      datasets: [
        {
          label: symbol,
          data: data.map(d => d.price),
          borderColor: symbol === 'AAPL' ? 'rgb(255, 99, 132)' : symbol === 'MSFT' ? 'rgb(53, 162, 235)' : 'rgb(75, 192, 192)',
          backgroundColor: symbol === 'AAPL' ? 'rgba(255, 99, 132, 0.5)' : symbol === 'MSFT' ? 'rgba(53, 162, 235, 0.5)' : 'rgba(75, 192, 192, 0.5)',
        },
      ],
    };
  };

  return (
    <div className="stock-slideshow">
      <Slider {...sliderSettings}>
        {Object.keys(stockData).map((symbol) => (
          <div key={symbol} className="slide">
            <h3>{symbol}</h3>
            <Line options={chartOptions} data={createChartData(symbol)} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default StockSlideshow;
