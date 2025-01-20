import React from "react";
import { numkeyPads, signkeyPads } from "./constants";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      result: "",
      lastResult: 0,
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.calculateResult = this.calculateResult.bind(this);
    this.cleanOperators = this.cleanOperators.bind(this);
  }

  handleButtonClick = (keyTrigger) => {
    if (keyTrigger === "=") {
      this.calculateResult(this.state.input);

      this.setState((prevState) => ({
        input: prevState.input + keyTrigger + prevState.result,
        lastResult: prevState.result,
      }));
    } else if (keyTrigger === "clear") {
      this.setState({ input: "", result: "" });
    } else if (["+", "-", "*", "/"].includes(keyTrigger)) {
      if (this.state.input.includes("=")) {
        this.setState((prevState) => ({
          input: prevState.lastResult + keyTrigger,
          result: "" + keyTrigger,
        }));
        return;
      }

      this.setState((prevState) => ({
        input: prevState.input + keyTrigger,
        result: "" + keyTrigger,
      }));
    } else {
      if (this.state.input === "0" && keyTrigger === "0") {
        return;
      }
      if (Array.from(this.state.result).includes(".") && keyTrigger === ".") {
        return;
      }
      if (Array.from(this.state.result).includes("+" || "-" || "*" || "/")) {
        this.setState((prevState) => ({
          input: prevState.input + keyTrigger,
          result: "" + keyTrigger,
        }));
        return;
      }
      this.setState((prevState) => ({
        input: prevState.input + keyTrigger,
        result: prevState.result + keyTrigger,
      }));
    }
  };

  cleanOperators(expression) {
    // Replace consecutive operators with the last operator, but keep the negative sign if it follows another operator
    return expression.replace(
      /([+\-*/])(?=[+\-*/])/g,
      (match, p1, offset, string) => {
        if (
          p1 === "-" &&
          (offset === 0 || /[+\-*/]/.test(string[offset - 1]))
        ) {
          return p1;
        }
        return "";
      }
    );
  }

  calculateResult = (input) => {
    const inputCleaned = this.cleanOperators(input);
    try {
      const result = Function('"use strict";return (' + inputCleaned + ")")();
      this.setState({ result });
    } catch (error) {
      this.setState({ result: "Error" });
    }
  };

  render() {
    return (
      <div
        className="container d-flex flex-column gap-2 bg-white text-dark rounded"
        style={{ width: "300px", padding: "10px" }}
      >
        <p
          className="text-center"
          style={{ color: "blue", marginLeft: "auto" }}
        >
          Niplan{" "}
          <img
            src={this.props.logo}
            alt="logo"
            className="align-self-center text-center"
            style={{ maxHeight: "15px", marginTop: "-10px", marginLeft: "2px" }}
          />
        </p>

        <div className="display">
          <div className="input">{this.state.input || ""}</div>
          <div className="output" id="display">
            {this.state.result || "0"}
          </div>
        </div>
        <div className="keypad-container">
          <button
            id="clear"
            className="keypad btn btn-danger"
            onClick={() => this.handleButtonClick("clear")}
          >
            AC
          </button>
          {signkeyPads.map((keyPad) => (
            <button
              key={keyPad.id}
              id={keyPad.id}
              className="keypad btn btn-secondary"
              onClick={() => this.handleButtonClick(keyPad.keyTrigger)}
            >
              {keyPad.keyTrigger}
            </button>
          ))}
          {numkeyPads.reverse().map((keyPad) => (
            <button
              key={keyPad.id}
              id={keyPad.id}
              className="keypad btn btn-secondary"
              onClick={() => this.handleButtonClick(keyPad.keyTrigger)}
            >
              {keyPad.keyTrigger}
            </button>
          ))}
          <button
            id="equals"
            className="keypad btn btn-primary"
            onClick={() => this.handleButtonClick("=")}
          >
            =
          </button>
        </div>
      </div>
    );
  }
}

export default Calculator;
