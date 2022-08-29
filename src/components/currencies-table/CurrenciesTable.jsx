import { Button, Typography } from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

export const CurrenciesTable = ({
  currencies,
  isLoading,
  getData,
  nextPage
}) => {
  if (currencies?.length) {
    return (
      <div className="currencies-table">
        <table>
          <thead>
            <tr>
              <td>Coin</td>
              <td>Symbol</td>
              <td>Price</td>
              <td>24h</td>
              <td>Mkt Cap</td>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency) => (
              <tr key={currency.id}>
                <td>{currency.name}</td>
                <td>{currency.symbol}</td>
                <td>{currency.current_price}</td>
                <td>{currency.price_change_percentage_24h}</td>
                <td>{currency.market_cap}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Button onClick={nextPage} variant="contained" disabled={isLoading}>
          Next <ArrowForwardIcon/>
        </Button>
      </div>
    );
  }

  return (
    <div className="load-currencies">
      <Typography variant="h3">No currencies available</Typography>
      <Button onClick={getData} variant="contained" disabled={isLoading}>
        Load Currencies
      </Button>
    </div>
  );
}

export default CurrenciesTable;
