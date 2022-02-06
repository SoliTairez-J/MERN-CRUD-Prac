import React, { useEffect, useState } from "react";

// CSS
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Notify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Component
import Navbar from "./components/layout/Navbar";

// Router
import { Routes, Route } from "react-router-dom";
import UserRoute from "./components/routes/UserRoute";

// Pages
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Home from "./components/pages/Home";
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import UserDashboard from "./components/pages/user/UserDashboard";

//Redux
import { useDispatch } from "react-redux";

// Functions
import { currentUser } from "./components/functions/auth";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const idTokenResult = localStorage.token;
    // console.log('App',idTokenResult);
    if (idTokenResult) {
      currentUser(idTokenResult)
        .then((res) => {
          // console.log("App", res);
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.username,
              token: idTokenResult,
              role: res.data.role,
              id: res.data._id,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch]);
  return (
    <div className="App">
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route
          path="user/dashboard"
          element={
            <UserRoute>
              <UserDashboard />
            </UserRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
