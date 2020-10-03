import React from "react";
import { Route, Switch } from "react-router-dom";
// import cookie from "react-cookie";
import { setCookie, getCookie } from "./libs/cookie";
import "../sass/main.scss";
import "../node_modules/animate.css/animate.css";
import Signin from "./Signin";
import Forgot from "./Forgot";
import CompleteProfile from "./CompleteProfile";
import Dashboard from "./Dashboard";

import dotenv from "dotenv";

// const bes = "https://avp-backend.com/";
// dotenv.config();
const bes = process.env.BES_URL;

export const AuthContext = React.createContext();

var authcookie = getCookie("token");
// how do we know if profile is complete or not?
// will there be a flag for complete in login, or do we cal dashboard?
// var usercookie = getCookie("user");
// var userarr = usercookie ? JSON.parse(usercookie) : null;

const initialLoginState = {
  isAuthenticated: authcookie ? true : false,
  token: authcookie ? authcookie : null,
  // complete: userarr ? userarr[0] : null,
  // firstName: userarr ? userarr[1] : null,
  // lastName: userarr ? userarr[2] : null,
  // email: userarr ? userarr[3] : null,
  // pic: userarr ? userarr[4] : null,
};

const removeCookie = (cname) => {
  document.cookie = cname + "=; expires=0";
};

const loginReducer = (loginState, action) => {
  switch (action.type) {
    case "LOGIN":
      // removeCookie("token");
      // console.log("token: ", action.payload.jwt);
      var upic = bes + action.payload.profilePic;

      // setCookie("token", action.payload.jwt, 1);
      // var userdata = JSON.stringify([
      //   action.payload.completeProfileStatus,
      //   action.payload.firstName,
      //   action.payload.lastName,
      //   action.payload.emailId,
      //   upic,
      // ]);
      // setCookie("user", userdata, 1);

      return {
        ...loginState,
        isAuthenticated: true,
        // user: action.payload.user,
        token: action.payload.jwt,
        // complete: action.payload.completeProfileStatus,
        // firstName: action.payload.firstName,
        // lastName: action.payload.lastName,
        // email: action.payload.emailId,
        // pic: upic,
      };
    case "LOGOUT":
      removeCookie("token");
      removeCookie("user");
      return {
        ...loginState,
        isAuthenticated: false,
        token: null,
        // complete: null,
        // firstName: null,
        // lastName: null,
        // email: null,
        // pic: null,
      };
    default:
      return loginState;
  }
};

function App() {
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  if (!loginState.isAuthenticated)
    return (
      <AuthContext.Provider
        value={{
          loginState,
          dispatch,
        }}
      >
        <div className="App">
          <div className="l-wrapper">
            <Switch>
              {/* <Forgot path="/forgot" /> */}
              <Signin path="/" />
            </Switch>
          </div>
        </div>
      </AuthContext.Provider>
    );
  if (loginState.isAuthenticated)
    return (
      <AuthContext.Provider
        value={{
          loginState,
          dispatch,
        }}
      >
        <div className="App">
          <div className="l-wrapper">
            {loginState.complete == "0" ? (
              <>
                <Nav />
                <div className="l-content__column">
                  <Header />
                  <Switch>
                    <Route path="/" component={CompleteProfile} />
                  </Switch>
                </div>
              </>
            ) : (
              <>
                <Nav />
                <div className="l-content__column">
                  <Header />

                  <LeaguesProvider>
                    <Switch>
                      <Route
                        path="/complete-profile"
                        component={CompleteProfile}
                      />
                      <Route path="/" component={Dashboard} exact />
                    </Switch>
                  </LeaguesProvider>
                </div>
              </>
            )}
          </div>
        </div>
      </AuthContext.Provider>
    );
}

export default App;
