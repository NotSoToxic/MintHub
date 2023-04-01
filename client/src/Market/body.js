import { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('wss://stream.binance.com:9443/ws');

export const Body = () => {
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    // Load initial market data
  axios.get('https://api.binance.com/api/v3/ticker/24hr')
  .then(response => setMarketData(response.data.filter(item => item.symbol.endsWith('USDT')).map(item => ({
    ...item,
    symbol: item.symbol.replace('USDT', ''),
    lastPrice: Number(item.lastPrice).toFixed(4),
    priceChangePercent: Number(item.priceChangePercent).toFixed(2),
    volume: Number(item.volume).toFixed(2),
  }))))
  .catch(error => console.log(error));

    // Subscribe to the WebSocket stream for live price updates
    socket.on('message', message => {
      const data = JSON.parse(message);
      setMarketData(prevMarketData => {
        const index = prevMarketData.findIndex(item => item.symbol === data.s);
        if (index !== -1) {
          const newMarketData = [...prevMarketData];
          newMarketData[index] = {
            ...newMarketData[index],
            lastPrice: Number(data.c).toFixed(4),
            priceChangePercent: Number(data.P).toFixed(2),
            volume: Number(data.v).toFixed(2),
          };
          return newMarketData;
        }
        return prevMarketData;
      });
    });

    // Reload market data every 10 seconds
    const intervalId = setInterval(() => {
      axios.get('https://api.binance.com/api/v3/ticker/24hr')
        .then(response => setMarketData(response.data.filter(item => item.symbol.endsWith('USDT') && item.volume > 1).map(item => ({
          ...item,
          symbol: item.symbol.replace('USDT', ''),
          lastPrice: Number(item.lastPrice).toFixed(4),
          priceChangePercent: Number(item.priceChangePercent).toFixed(2),
          volume: Number(item.volume).toFixed(2),
        }))))
        .catch(error => console.log(error));
    }, 10000);

    return () => {
      clearInterval(intervalId);
      socket.off('message');
    };
  }, []);

  return (
    <div className="container">
      <table >
        <thead>
          <tr className='column'>
            <th>Symbol</th>
            <th>Last Price</th>
            <th>Price Change</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {marketData.map(data => (
            <tr key={data.symbol}>
              <td>{data.symbol}</td>
              <td>{(data.lastPrice*82.12).toFixed(4)}</td>
              <td>{data.priceChangePercent}%</td>
              <td>{data.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}