import { useState, useEffect } from 'react';
import { Typography, LinearProgress } from '@mui/material';
import { produce } from 'immer';
import fetchCurrencies from '../../services/api';
import { Snackbar, CurrenciesTable } from '../../components';
import './styles.css';

const INITIAL_SNACKBAR = {
  isOpen: false,
  message: null,
  severity: 'info',
};
const INITIAL_CURRENCIES = {
  isLoading: false,
  page: 1,
  data: [],
  lastServerRequest: null,
};
// TODO: add more time later
// const CACHE_TIME = 1000 * 60 * 10; // 10 minutes
const CACHE_TIME = 3000;

export const Grid = () => {
  const [feedback, setFeedback] = useState({
    isLoading: false,
    alert: {
      isOpen: false,
      message: null,
    },
    snackbar: INITIAL_SNACKBAR,
  });
  const [currencies, setCurrencies] = useState(INITIAL_CURRENCIES);

  const openSnackbar = (message, severity = 'info') => {
    const newState = produce(feedback, (draft) => {
      draft.snackbar = {
        isOpen: true,
        message: message,
        severity: severity,
      }
      return draft;
    })
    setFeedback(newState);
  }

  const closeSnackbar = () => {
    const newState = produce(feedback, (draft) => {
      draft.snackbar = INITIAL_SNACKBAR;
      return draft;
    })
    setFeedback(newState);
  }

  const getData = async () => {
    const timeSinceLastRequest = Date.now() - currencies?.lastServerRequest;

    if (timeSinceLastRequest < CACHE_TIME) return;

    setCurrencies(state => ({ ...state, isLoading: true }));

    try {
      const response = await fetchCurrencies(currencies.page);
      console.log('🚀 ~ response', response);

      const newState = produce(currencies, (draft) => {
        draft.data = response;
        draft.lastServerRequest = Date.now();
        return draft;
      });

      setCurrencies(newState);
      openSnackbar('Crypto currencies loaded successfully', 'success');
    } catch (error) {
      openSnackbar(error.message, 'error');
    } finally {
      setCurrencies(state => ({ ...state, isLoading: false }));
    }
  }

  const nextPage = () => {
    setCurrencies(state => ({
      ...state, page: state.page + 1
    }))
  }

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencies.page]);

  return (
    <div className="grid-page">
      { currencies.isLoading && <LinearProgress /> }
      <Typography variant="h3" component="h1">Crypto Currencies</Typography>

      <CurrenciesTable
        currencies={currencies.data}
        isLoading={currencies.isLoading}
        getData={getData}
        nextPage={nextPage}
      />

      <Snackbar
        {...feedback.snackbar}
        onClose={closeSnackbar}
      />
    </div>
  );
}

export default Grid;
