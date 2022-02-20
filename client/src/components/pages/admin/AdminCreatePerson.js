import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createPerson, getPerson, removePerson } from "../../functions/person";
import AdminNav from "../../layout/AdminNav";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const AdminCreatePerson = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState([]);

  useEffect(() => {
    loadPerson(user.token);
  }, []);
  const loadPerson = (authtoken) => {
    getPerson(authtoken)
      .then((res) => {
        setPerson(res.data);
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

  const handleRemove = (id) => {
    if (window.confirm("Are you sure Delete!")) {
      setLoading(true);
      removePerson(id, user.token)
        .then((res) => {
          loadPerson(user.token);
          setLoading(false);
          toast.success("Remove " + res.data.name + " Success");
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response);
        });
    }
  };

  const columns = [
    {
      title: "ชื่อ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      render: (record) => (
        <>
          <Link to={`/admin/update-person/${record._id}`}>
            <span className="btn btn-sm">
              <EditOutlined className="text-warning" />
            </span>
          </Link>
          <span
            className="btn btn-sm"
            onClick={() => handleRemove(record._id)}
          >
            <DeleteOutlined className="text-danger" />
          </span>
        </>
      ),
    },
  ];

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
          <Table columns={columns} dataSource={person} rowKey="_id" />
        </div>
      </div>
    </div>
  );
};

export default AdminCreatePerson;
