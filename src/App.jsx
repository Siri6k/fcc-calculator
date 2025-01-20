import React from "react";
import Calculator from "./components/Calculator";
import "./App.css";
import logo from "./assets/niplan.png";

class App extends React.Component {
  render() {
    return (
      <div className="container d-flex flex-column min-vh-100 min-vw-100 align-items-center justify-content-center bg-dark text-light">
        <h1>Calculator</h1>
        <Calculator logo={logo} />
        <p className="text-center">
          Coded by{" "}
          <em
            className="
        color-light"
          >
            -Sirisk
          </em>
        </p>
      </div>
    );
  }
}

export default App;
