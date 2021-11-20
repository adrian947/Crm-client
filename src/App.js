import React, { useState, useEffect, useMemo } from "react";
import { ApolloProvider } from "@apollo/client";

import AuthLayout from "./components/layout/authLayout/AuthLayout";
import { Navigation } from "./routes/Navigation";
import { AuthcontextUser } from "./context/authContext";
import { decodeToken } from "./helpers/auth";
import client from "./config/apollo";
import { OrderContextComponent } from "./context/OrderContext";

const App = () => {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuth(null);
    } else {
      const decoded = decodeToken(token);
      setAuth(decoded);
    }
  }, []);
  const logOut = () => {
    localStorage.removeItem("token");
    setAuth(null);
  };

  const setUser = (user) => {
    setAuth(user);
  };

  const authData = useMemo(
    () => ({
      auth,
      logOut,
      setUser,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  return (
    <div>
      <ApolloProvider client={client}>
        <AuthcontextUser.Provider value={authData}>
          <OrderContextComponent>
            <div className="app">{!auth ? <AuthLayout /> : <Navigation />}</div>
          </OrderContextComponent>
        </AuthcontextUser.Provider>
      </ApolloProvider>
    </div>
  );
};

export default App;
