import yahooFinance from 'yahoo-finance2';

export const getNiftyData = async () => {
  try {
    const result = await yahooFinance.quote('^NSEI'); 
    return result;
  } catch (error) {
    console.error('Error fetching Nifty data:', error);
    throw error;
  }
};
