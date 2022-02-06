import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Functions
import { loginHandler } from "../../functions/auth";

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { username, password } = formData;

  const roleBasedRedirect = (res) => {
    if (res === "admin") {
      history("/admin/dashboard");
    } else {
      history("/user/dashboard");
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    const newUser = {
      username,
      password,
    };
    loginHandler(newUser)
      .then((res) => {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            token: res.data.token,
            name: res.data.payload.user.name,
            role: res.data.payload.user.role,
          },
        });
        localStorage.setItem("token", res.data.token);
        setLoading(false);
        toast.success("Login Complete");
        roleBasedRedirect(res.data.payload.user.role)
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.msg);
      });
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!loading ? <h1>Login</h1> : <h1>Loading...</h1>}
          <form onSubmit={(e) => onSubmit(e)}>
            <input
              className="form-control"
              type="text"
              name="username"
              autoFocus
              placeholder="Username"
              onChange={(e) => onChange(e)}
            />
            <input
              className="form-control"
              type="password"
              name="password"
              autoFocus
              placeholder="Password"
              onChange={(e) => onChange(e)}
            />
            <button className="btn btn-success" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
