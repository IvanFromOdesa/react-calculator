import React, { Component } from "react";
import { Provider } from "react-redux";
import Buttons from './containers/buttons'
import store from "./store/store";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Provider store = {store}>
          <Buttons/>
        </Provider>
      </React.Fragment>
    );
  }
}

export default App;