import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../redux";

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

const UserContainer = () => {
  return <div>UserContainer</div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
