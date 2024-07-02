import React, { createContext, useContext, useState } from 'react';

const TotalContext = createContext();

export const useTotal = () => useContext(TotalContext);

export const TotalProvider = ({ children }) => {
  const [total, setTotal] = useState(0);

  const updateTotal = (items) => {
    const newTotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    setTotal(newTotal);
  };

  return (
    <TotalContext.Provider value={{ total, updateTotal }}>
      {children}
    </TotalContext.Provider>
  );
};
