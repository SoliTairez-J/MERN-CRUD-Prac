import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createPerson, getPerson } from "../../functions/person";
import AdminNav from "../../layout/AdminNav";

const AdminUpdatePerson = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPerson(user.token);
  }, []);
  const loadPerson = (authtoken) => {
    getPerson(authtoken)
      .then((res) => {
        //
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createPerson({ name }, user.token)
      .then((res) => {
        loadPerson(user.token);
        setLoading(false);
        toast.success("Create " + res.data.name + " Success");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response);
      });
  };


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? <h4>Loading...</h4> : <h4>Admin Create Person</h4>}
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>ชื่อ</label>
              <input
                type="text"
                className="form-control"
                autoFocus
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button className="btn btn-outline-primary">Save</button>
          </form>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default AdminUpdatePerson;
