import { jwtDecode } from "jwt-decode";
import React, { useEffect, useContext } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Context } from ".";
import { checkToken, UserClaims } from "./Admin/Auth/http/authApi";
import { AppRouter } from "./components/AppRouter/AppRouter";
import "./styles/App.css";
import mapJwtClaims from "./utils/mapJwtClaims";

const App = (() => {
  const contextValue = useContext(Context);
  const user = contextValue!.user;

  useEffect(() => {
    checkToken().then(() => {
      const token = localStorage.getItem('token');
      if (token !== null) {
        const decodedToken = jwtDecode(token) as UserClaims;
        user.setUser(mapJwtClaims(decodedToken));
        user.setIsAuth(true)
      }
    }).catch((error) => console.error(error))
}, [user])

  return (
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>
  );
});

export default App;
