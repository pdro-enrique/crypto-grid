import { useState, useEffect, useContext } from 'react';
import { produce } from 'immer';
import fetchCurrencies from '../../services/api';
import { CurrenciesTable } from '../../components';
import { MainLayoutContext } from '../../layouts';
import './styles.css';

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
  const {
    setPageTitle,
    openSnackbar,
    setShowProgressBar
  } = useContext(MainLayoutContext);

  const [currencies, setCurrencies] = useState(INITIAL_CURRENCIES);

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

  useEffect(() => {
    setPageTitle('Crypto Currencies');
  }, []);
 
  useEffect(() => {
    setShowProgressBar(currencies?.isLoading);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencies?.isLoading]);

  return (
    <div className="grid-page">
      <CurrenciesTable
        currencies={currencies.data}
        isLoading={currencies.isLoading}
        getData={getData}
        nextPage={nextPage}
      />
    </div>
  );
}

export default Grid;
