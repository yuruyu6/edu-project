import { createContext, useContext } from 'react';
import { useLocalStorage } from '@mantine/hooks';

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

export const useAuthProvider = () => {
  const [user, setUser] = useLocalStorage({ key: 'user', defaultValue: false });

  const signup = (userData) => {
    setUser(userData);
  };

  const signout = () => {
    setUser(false);
  };

  const getUser = () => { 
    return user;
  }

  return { user, getUser, signup, signout };
};
