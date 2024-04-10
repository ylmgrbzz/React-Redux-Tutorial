import logo from "./logo.svg";
import "./App.css";
import CakeContaier from "./components/CakeContaier";
import { Provider } from "react-redux";
import store from "./redux/store";
import IceCreamContainer from "./components/IceCreamContainer";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CakeContaier />
        <IceCreamContainer />
      </div>
    </Provider>
  );
}

export default App;
