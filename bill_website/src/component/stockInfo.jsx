import React, { useEffect, useState } from 'react';
import { getNiftyData } from '../services/stockService';

const StockInfo = () => {
  const [niftyData, setNiftyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNiftyData();
        setNiftyData(data);
      } catch (error) {
        console.error('Error fetching Nifty data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Nifty 50 Index Information</h1>
      {niftyData && (
        <div>
          <p>Symbol: {niftyData.symbol}</p>
          <p>Price: {niftyData.regularMarketPrice}</p>
          <p>Change: {niftyData.regularMarketChange}</p>
          <p>Change Percent: {niftyData.regularMarketChangePercent}%</p>
        </div>
      )}
    </div>
  );
};

export default StockInfo;
