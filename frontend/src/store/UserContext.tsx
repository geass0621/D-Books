import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { User } from "../models/UserModel";
import { getAuthToken, getUser } from "../utils/auth";


interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
};

interface UserProviderProps {
  children: ReactNode
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const userId = localStorage.getItem('userId');
  const token = getAuthToken();

  useEffect(() => {
    if (!userId) {
      return
    }
    if (!token || token === 'EXPIRED') {
      return
    }
    getUser(userId).then(user => {
      setUser(user);
      console.log(user);
    });

  }, [userId])


  return (
    <>
      <UserContext.Provider value={{ user, setUser, loading }}>
        {children}
      </UserContext.Provider>
    </>
  );
}