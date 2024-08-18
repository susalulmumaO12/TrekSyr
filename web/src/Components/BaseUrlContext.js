import React, { createContext, useContext } from 'react';

const BaseUrlContext = createContext();

export const useBaseUrl = () => useContext(BaseUrlContext);

export const BaseUrlProvider = ({ children }) => {
  const baseURL = 'http://192.168.199.198:5000';

  return (
    <BaseUrlContext.Provider value={baseURL}>
      {children}
    </BaseUrlContext.Provider>
  );
};
