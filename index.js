const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First redux action",
  };
}

function buyIceCream() {
  return {
    type: BUY_ICECREAM,
    info: "Second redux action",
  };
}

const initialState = {
  numOfCakes: 10,
  numOfIceCreams: 20,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + 1,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log("Initial state", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Updated state", store.getState())
);
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe();

const cakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store2 = createStore(rootReducer);
console.log("Initial state2", store2.getState());
const unsubscribe2 = store2.subscribe(() =>
  console.log("Updated state2", store2.getState())
);
store2.dispatch(buyCake());
store2.dispatch(buyCake());
store2.dispatch(buyCake());
store2.dispatch(buyIceCream());

unsubscribe2();
