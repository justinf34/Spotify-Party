import React, { useEffect, useState } from "react";
import { getHashParams } from "../Utils/Helper";
import Cookies from "js-cookie";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const params = getHashParams();
    window.history.replaceState({}, null, "/"); // Replace the history entry to remove the auth code from the url bar
    const access_token = params.access_token;
    console.log(access_token);
    const refresh_token = params.refresh_token;

    // Set the cookies
    Cookies.set("spotifyAuthToken", access_token, { expires: 1 / 12 });
    Cookies.set("spotifyRefreshToken", refresh_token);

    if (access_token) {
      setLoggedIn(true);
      setUser(params.user);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
