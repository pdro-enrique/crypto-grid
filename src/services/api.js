export const fetchCurrencies = (page, currenciesPerPage = 10) => {
  // return fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${currenciesPerPage}&page=${page}&sparkline=false`)
  return fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        return data;
      })
      .catch(error => {
        throw new Error(error);
      })
}

export default fetchCurrencies;
