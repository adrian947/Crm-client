import React, { useState, useEffect } from "react";
import { routes } from "./routes";
import { useMutation } from "@apollo/client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { VERIFY_TOKEN } from "../gql/auth";
import Login from "./../pages/Login";
import { useApolloClient } from "@apollo/client";

export const Navigation = () => {
  const [verifyTokenAuth, setVerifyTokenAuth] = useState(false);

  const [verifyToken] = useMutation(VERIFY_TOKEN);
  const client = useApolloClient();

  useEffect(() => {
    const verify = async () => {
      const { data } = await verifyToken({
        variables: {
          token: localStorage.getItem("token"),
        },
      });

      if (data.verifyToken) {
        setVerifyTokenAuth(true);
      } else {
        setVerifyTokenAuth(false);
        client.clearStore();
        localStorage.removeItem("token");
      }
    };
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!verifyTokenAuth) {
    return <Login />;
  }

  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <Route
            exact={route.exact}
            path={route.path}
            key={index}
            render={(props) => (
              <route.layout>
                <route.component {...props} />
              </route.layout>
            )}
          />
        ))}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
