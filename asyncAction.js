const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const logger = require("redux-logger").createLogger();

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

const store = createStore(reducer, applyMiddleware(logger));
console.log("Initial state", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Updated state", store.getState())
);
store.dispatch(fetchUsersRequest());
store.dispatch(fetchUsersSuccess(["user1", "user2", "user3"]));
store.dispatch(fetchUsersFailure("Error occurred"));
unsubscribe();
// Output:
// Initial state { loading: false, users: [], error: '' }
// Updated state { loading: true, users: [], error: '' }
// Updated state { loading: false, users: [ 'user1', 'user2', 'user3' ], error: '' }
// Updated state { loading: false, users: [], error: 'Error occurred' }
