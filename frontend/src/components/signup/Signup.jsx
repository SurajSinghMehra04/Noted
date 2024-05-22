import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeadingComp from "./HeadingComp";
import "./signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${window.location.origin}/api/v1/register`, inputs);
      alert(response.data.message);

      if (response.data.message !== "User Already Exists") {
        setInputs({ email: "", username: "", password: "" });
        navigate("/signin");
      }
    } catch (error) {
      console.error("There was an error with the registration!", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <form className="d-flex flex-column w-100 p-3" onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                className="p-2 my-3 input-signup"
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                onChange={handleChange}
                value={inputs.email}
                required
              />
              <label htmlFor="username">Username</label>
              <input
                className="p-2 my-3 input-signup"
                type="text"
                id="username"
                name="username"
                placeholder="Enter Your Username"
                onChange={handleChange}
                value={inputs.username}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                className="p-2 my-3 input-signup"
                type="password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={handleChange}
                value={inputs.password}
                required
              />
              <button type="submit" className="btn-signup p-2">
                Sign Up
              </button>
            </form>
          </div>
          <div className="col-lg-4 column col-left d-lg-flex justify-content-center align-items-center d-none">
            <HeadingComp first="Sign" second="Up" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
