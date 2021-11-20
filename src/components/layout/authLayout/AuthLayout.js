import React, { useState } from "react";
import Login from "./../../../pages/Login";
import Register from "./../../../pages/Register";

const AuthLayout = ({setUser}) => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="containerAuth">
      <div className="login__form">
        {showLogin ? <Login setUser={setUser}/> : <Register setShowLogin={setShowLogin} />}
      </div>
      <div className="login__banner">
        {showLogin ? (
          <p
            style={{ cursor: "pointer" }}
            onClick={() => setShowLogin(!showLogin)}
          >
            You do not have an account?
          </p>
        ) : (
          <>
            <div className="login__containerbutton">
              <span>I already have an account!</span>
              <input
                className="login_inputbutton"
                type="button"
                onClick={() => setShowLogin(!showLogin)}
                value="Sing in"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
