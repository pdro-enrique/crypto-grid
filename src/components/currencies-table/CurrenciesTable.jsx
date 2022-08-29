import { Button, Typography, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import columns from './columns.json';

export const CurrenciesTable = ({
  currencies,
  isLoading,
  getData,
  setCurrencies
}) => {
  const onPageChange = (page) => {
    setCurrencies(state => ({ ...state, page }))
  }

  const onSelectionModelChange = (selected) => {
    setCurrencies(state => ({ ...state, selected }))
  }

  if (currencies?.length) {
    return (
      <div className="currencies-table">
        <Box>
          <DataGrid
            rows={currencies.map(coin => ({
              id: coin.id,
              name: coin.name,
              symbol: coin.symbol,
              current_price: coin.current_price,
              price_change_percentage_24h: coin.price_change_percentage_24h,
              market_cap: coin.market_cap,
            }))}
            columns={columns}
            pageSize={10}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            density="comfortable"
            loading={isLoading}
            onPageChange={onPageChange}
            showColumnRightBorder
            showCellRightBorder
            autoHeight
            onSelectionModelChange={onSelectionModelChange}
          />
        </Box>
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
