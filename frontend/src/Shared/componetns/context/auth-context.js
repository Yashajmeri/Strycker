import { createContext } from "react";
export const AuthConetxt = createContext({
  isLoggedIn: false,
  userId:null,
  token:null,
  login: () => {},
  logout: () => {},
});
