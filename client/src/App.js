import React from "react";
import "../sass/main.scss";
import "../node_modules/animate.css/animate.css";
import Signin from "./components/Signin";
// import Example from "./components/Example";
import Dashboard from "./components/Dashboard";

export const AuthContext = React.createContext();

const initialLoginState = {
  isAuthenticated: false,
  user: null,
  token: null
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(loginReducer, initialLoginState);
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <div className="App">
        <div className="l-wrapper">
          {!state.isAuthenticated ? <Signin /> : <Dashboard />}
          {/* <Example /> */}
          {/* <Dashboard /> */}
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
