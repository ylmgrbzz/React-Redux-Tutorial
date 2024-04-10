import axios from "axios";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./userTypes";

export const fethUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};
export const fethUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};
export const fethUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

export const fetchUser = () => {
  return (dispatch) => {
    dispatch(fethUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data;
        dispatch(fethUsersSuccess(users));
      })
      .catch((error) => {
        dispatch(fethUsersFailure(error));
      });
  };
};
