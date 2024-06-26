import logo from "./logo.svg";
import "./App.css";
import CakeContaier from "./components/CakeContaier";
import { Provider } from "react-redux";
import store from "./redux/store";
import IceCreamContainer from "./components/IceCreamContainer";
import NewCakeContainer from "./components/NewCakeContainer";
import UserContainer from "./components/UserContainer";
import HooksCakeContainer from "./components/HooksCakeContainer";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CakeContaier />
        <IceCreamContainer />
        <NewCakeContainer />
        <HooksCakeContainer />
        <UserContainer />
      </div>
    </Provider>
  );
}

export default App;
