import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Functions
import { registerHandler } from "../../functions/auth";

const Register = () => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
  });

  const [loading, setLoading] = useState(false);

  const { username, password, password2 } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (password !== password2) {
      toast.error("password not match");
      setLoading(false);
    } else {
      const newUser = {
        username,
        password,
      };
      registerHandler(newUser)
        .then(() => {
          setLoading(false);
          toast.success("Register Complete");
          history("/");
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.msg);
        });
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!loading ? <h1>Register</h1> : <h1>Loading...</h1>}
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
            <input
              className="form-control"
              type="password"
              name="password2"
              autoFocus
              placeholder="Confirm Password"
              onChange={(e) => onChange(e)}
            />
            <button
              className="btn btn-success"
              type="submit"
              disabled={password.length < 6}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
