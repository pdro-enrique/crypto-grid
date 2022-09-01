import { COIN_LIST } from './constants';

export const getList = () => {
  const data = localStorage.getItem(COIN_LIST);
  return JSON.parse(data) || {};
}
export const saveList = (data) => {
  localStorage.setItem(COIN_LIST, JSON.stringify(data));
}

