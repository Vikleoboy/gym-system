import { createContext, useEffect, useReducer } from 'react';
import rd from './userReducer';

const MainState = {
  data: JSON.parse(localStorage.getItem('user')) || null,
};

export const usr = createContext(MainState);

export const UsrContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rd, MainState);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.data));
  }, [state.data]);

  return <usr.Provider value={{ data: state.data, dispatch }}>{children}</usr.Provider>;
};
