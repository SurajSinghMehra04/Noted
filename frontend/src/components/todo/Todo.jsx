import React, { useEffect, useState } from "react";
import "./todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";
import axios from "axios";

const Todo = () => {
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [tasks, setTasks] = useState([]);
  const [toUpdateArray, setToUpdateArray] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);

  const id = sessionStorage.getItem("id");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!inputs.title || !inputs.body) {
      toast.error("Title or Body can't be empty");
      return;
    }

    if (id) {
      try {
        await axios.post(`${window.location.origin}/api/v2/addTask`, {
          title: inputs.title,
          body: inputs.body,
          id,
        });
        toast.success("Your Task Is Added");
        setInputs({ title: "", body: "" });
        fetchTasks(); // Fetch the updated tasks list
      } catch (error) {
        toast.error("Error adding task");
        console.error(error);
      }
    } else {
      setTasks((prevTasks) => [...prevTasks, inputs]);
      setInputs({ title: "", body: "" });
      toast.success("Your Task Is Added");
      toast.error("Your Task Is Not Saved! Please SignUp");
    }
  };

  const handleDelete = async (taskId) => {
    if (id) {
      try {
        await axios.delete(`${window.location.origin}/api/v2/deleteTask/${taskId}`, {
          data: { id },
        });
        toast.success("Your Task Is Deleted");
        fetchTasks(); // Fetch the updated tasks list
      } catch (error) {
        toast.error("Error deleting task");
        console.error(error);
      }
    } else {
      toast.error("Please SignUp First");
    }
  };

  const handleUpdateDisplay = (task) => {
    setToUpdateArray(task);
    setShowUpdate(true);
  };

  const fetchTasks = async () => {
    if (id) {
      try {
        const response = await axios.get(`${window.location.origin}/api/v2/getTasks/${id}`);
        setTasks(response.data.list);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
          <div className="d-flex flex-column todo-inputs-div w-lg-50 w-100 p-1">
            <input
              type="text"
              placeholder="TITLE"
              className="my-2 p-2 todo-inputs"
              name="title"
              value={inputs.title}
              onChange={handleChange}
            />
            <textarea
              type="text"
              placeholder="BODY"
              name="body"
              className="p-2 todo-inputs"
              value={inputs.body}
              onChange={handleChange}
              style={{ display: inputs.title ? "block" : "none" }}
            />
          </div>
          <div className="w-50 w-100 d-flex justify-content-end my-3">
            <button className="home-btn px-2 py-1" onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {tasks.map((item, index) => (
                <div className="col-lg-3 col-11 mx-lg-5 mx-3 my-2" key={index}>
                  <TodoCards
                    title={item.title}
                    body={item.body}
                    id={item._id}
                    delid={handleDelete}
                    display={() => handleUpdateDisplay(item)}
                    updateId={index}
                    toBeUpdate={() => setToUpdateArray(item)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showUpdate && (
        <div className="todo-update" id="todo-update">
          <div className="container update">
            <Update display={setShowUpdate} update={toUpdateArray} />
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
