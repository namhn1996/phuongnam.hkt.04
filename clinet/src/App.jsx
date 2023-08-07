import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState({
    name: "",
    description: "",
  });
  const [users, setUsers] = useState([]);
  const { name, description } = user;
  const handleLoading = () => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    handleLoading();
  }, [users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async () => {
    await axios
      .post("http://localhost:3000/users", user)
      .then((res) => {
        alert("Thêm thành công");
        handleLoading();
        setUser({ name: "", description: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = async (id) => {
    await axios
      .get(`http://localhost:3000/users/${id}`)
      .then((res) => {
        setUser(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSave = () => {
    axios.put(`http://localhost:3000/users/${user.user_id}`, user);
    alert("Cập nhật thành công");
    handleLoading();
  };
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/users/${id}`);
    alert("Xóa thành công");
    handleLoading();
  };

  return (
    <>
      <div className="container mt-5">
        <button
          type="button"
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Create a new
        </button>
        <h1 className="mt-3 text-center">STUDENT LISH</h1>
        <table className="table mt-4 table-hover table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th
                scope="col"
                style={{ width: "140px" }}
                className="text-center"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, e) => (
              <tr key={e}>
                <th scope="row">{user.user_id}</th>
                <td>{user.name}</td>
                <td>{user.description}</td>
                <td className="d-flex gap-3">
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal1"
                    onClick={(id) => handleUpdate(user.user_id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={(id) => handleDelete(user.user_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* New student */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5 " id="exampleModalLabel">
                  Create a new student
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form action="">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Name
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Vui lòng nhập tên"
                      name="name"
                      value={name}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows={3}
                      name="description"
                      value={description}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                {/* <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  >
                  Close
                </button> */}
                <button
                  type="submit"
                  className="btn btn-success w-100"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* update student */}
        <div
          className="modal fade"
          id="exampleModal1"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5 " id="exampleModalLabel">
                  Update student
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form action="">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Name
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Vui lòng nhập tên"
                      name="name"
                      value={user.name}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows={3}
                      name="description"
                      value={user.description}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                {/* <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  >
                  Close
                </button> */}
                <button
                  type="submit"
                  className="btn btn-success w-100"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    handleSave();
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
