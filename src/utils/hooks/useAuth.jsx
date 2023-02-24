import { createContext, useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

export const useAuthProvider = () => {
  const [user, setUser] = useLocalStorage('user', false );

  const signup = (userData) => {
    setUser(userData);
  };

  const signout = () => {
    setUser(false);
  };

  return { user, signup, signout };
};
