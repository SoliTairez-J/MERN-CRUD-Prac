import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import LoadingToRedirect from "./LoadingToRedirect";

// const UserRoute = ({ children, redirectTo }) => {
const UserRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? children : <LoadingToRedirect />;
  //   return user && user.token ?  children : <LoadingToRedirect to={redirectTo}  />;
};

export default UserRoute;
