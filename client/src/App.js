import React from "react";
import "../sass/main.scss";
import "../node_modules/animate.css/animate.css";
// import Example from "./components/Example";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <div className="l-wrapper">
        <header className="App-header">
          <h1>AVP</h1>
          {/* <Example /> */}
          <Dashboard />
        </header>
      </div>
    </div>
  );
}

export default App;
