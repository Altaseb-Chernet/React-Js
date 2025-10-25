import { createContext, useState } from "react";


export const userContext = createContext();

export function userProvider({childer}){
const [user, setUser] = useState("Altaseb");
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}