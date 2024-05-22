import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../../store";
import HeadingComp from "./HeadingComp";
import "./signup.css";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${window.location.origin}/api/v1/signin`, inputs);
      if (response.data && response.data.user && response.data.user._id) {
        sessionStorage.setItem("id", response.data.user._id);
        dispatch(authActions.login());
        navigate("/todo");
      } else {
        console.error("Response data or user ID not found in the response.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 column col-left d-none d-lg-flex justify-content-center align-items-center">
            <HeadingComp first="Sign" second="In" />
          </div>
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <form className="d-flex flex-column w-100 p-3" onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                className="p-2 my-3 input-signup"
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                value={inputs.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                className="p-2 my-3 input-signup"
                type="password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                value={inputs.password}
                onChange={handleChange}
                required
              />
              <button type="submit" className="btn-signup p-2">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
