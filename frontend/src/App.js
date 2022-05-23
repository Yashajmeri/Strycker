import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import User from "./Users/Pages/User";
import NewPlace from "./Places/Components/NewPlace";
import MainHeader from "./Shared/componetns/Navigation/MainHeader";
import UserPlaces from "./Places/Pages/UserPlaces";
import UpdatePlaces from "./Places/Pages/UpdatePlaces";
import Auth from "./Places/Pages/Auth";
import { AuthConetxt } from "./Shared/componetns/context/auth-context";
import Footer from "./Shared/componetns/Navigation/Footer";

let logerTimeOut;
function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpirationDate,setTokenExpirsationDate]=useState()

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirsationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirsationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(()=>{
    if(token && tokenExpirationDate) {
      const remianingTime = tokenExpirationDate.getTime()-new Date().getTime();
     logerTimeOut= setTimeout(logout,remianingTime)
    }else {
      clearTimeout(logerTimeOut);
    }
  },[token,logout,tokenExpirationDate])
  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem("userData"));
    if (
      storageUser &&
      storageUser.token &&
      new Date(storageUser.expiration) > new Date()
    ) {
      login(storageUser.userId, storageUser.token, new Date(storageUser.expiration) );
    }
  }, [login]);
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <User />
        </Route>

        <Route path="/:usedId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlaces />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <User />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Route path="/:usedId/places" exact>
          <UserPlaces />
        </Route>

        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthConetxt.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        userId: userId,
        logout: logout,
      }}
    >
      <Router>
        <MainHeader />
        <main>{routes}</main>
        <Footer />
      </Router>
    </AuthConetxt.Provider>
  );
}

export default App;
