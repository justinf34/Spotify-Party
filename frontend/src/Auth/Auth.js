import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Spotify from "spotify-web-api-js";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("spotifyAuthToken");
    setAccessToken(token);
    setLoggedIn(true);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        accessToken,
        loggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
