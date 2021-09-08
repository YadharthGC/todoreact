import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [list, setlist] = useState([]);
  const [task, settask] = useState([]);

  useEffect(async () => {
    fetch();
  }, []);

  let fetch = async () => {
    try {
      let products = await axios.get("http://localhost:3000/todo");
      setlist([...products.data]);
    } catch (error) {}
  };

  let handlecreate = async (e) => {
    try {
      let post = await axios.post("http://localhost:3000/create", {
        message: task,
      });
      fetch();
    } catch (error) {
      alert("error");
    }
  };

  let handlechange = async (e, id) => {
    try {
      let update = await axios.put(`http://localhost:3000/update/${id}`, {
        status: e.target.checked,
      });
      fetch();
    } catch (error) {
      alert("error");
    }
  };

  let handledelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`);
      fetch();
    } catch (error) {
      alert("error");
    }
  };

  return (
    <div className="container">
      <h3>To Do List</h3>
      <div className="row">
        <div className="col-lg-12">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Task.."
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              onChange={(e) => {
                settask(e.target.value);
              }}
            />
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={handlecreate}
            >
              Add task
            </button>
          </div>
        </div>
        <div className="col-lg-12">
          <ul className="list-group">
            {list.map((obj) => {
              return (
                <li class="list-group-item">
                  <input
                    class="form-check-input me-1"
                    type="checkbox"
                    checked={obj.status}
                    onChange={(e) => {
                      handlechange(e, obj._id);
                    }}
                  />
                  <span
                    style={{ textDecoration: obj.status ? "line-through" : "" }}
                  >
                    {obj.message}
                  </span>
                  <button
                    type="button"
                    class="btn-close"
                    aria-label="Close"
                    onClick={() => {
                      handledelete(obj._id);
                    }}
                  ></button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
