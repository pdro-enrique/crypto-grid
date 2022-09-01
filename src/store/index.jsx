import { useState, createContext } from 'react';

export const StoreContext = createContext('store');

export const initialData = {
  selectedCoins: [],
}

export const StoreProvider = ({ children }) => {
  const [store, setStore] = useState(initialData);

  return (
    <StoreContext.Provider value={{
      store, setStore
    }}>
      {children}
    </StoreContext.Provider>
  );
} 
