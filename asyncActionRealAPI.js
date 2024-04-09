const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
const createLogger = require("redux-logger").createLogger;

const logger = createLogger();

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

// payload, bir eylemin taşıdığı veri parçasını ifade eder.
// redux eylemleri genellikle bir tür ve bir payload içerir.Burada,
//     fetchUsersSuccess ve fetchUsersFailure adlı iki eylem oluşturma işlevi tanımlanmıştır.

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

// reducer, bir eylem ve mevcut durum alır ve yeni bir durum döndürür.

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

// store, uygulamanın durumunu tutar ve değişiklikleri dinler.

const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger));

const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(fetchUsersRequest());
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const users = await response.json();
      dispatch(fetchUsersSuccess(users));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };
};

store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchUsers());
