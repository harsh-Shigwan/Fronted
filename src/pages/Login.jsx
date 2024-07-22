import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseURL from "../assets/API_URL";
import logo from "../Data/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
   
    username: "",
    password: "",
   
  });
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
   
    if (!formData.username) {
      errors.username = "Username is required*";
    }
   
    if (!formData.password) {
      errors.password = "Password is required*";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    setErrorMessage(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    if (!validate()) {
      return;
    }

    try {
      const response = await axios.post(
        `${baseURL}/api/hos_loginlogin/`,
        formData
      );
      const token = response.data.token;
      localStorage.setItem("Token", JSON.stringify(token));
      navigate("/home");
    } catch (error) {
      alert("Invalid username or password");
      window.location.reload();
      console.log("Error response data:", error.response?.data);
    }
  };

  return (
    <div>
      <div className="flex gap-5 justify-between pr-9 bg-white max-md:flex-wrap max-md:pr-5">
        <div className="flex flex-col flex-1 py-12 bg-slate-50 max-md:max-w-full">
          <img
            loading="lazy"
            src={logo}
            className="z-10 ml-20 max-w-full aspect-[3.85] w-[249px] max-md:ml-2.5"
          />
          <div className="flex flex-col justify-center px-14 py-0 mt-0 rounded-full bg-slate-80 max-md:px-5 max-md:max-w-full">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/32d42d2b9868fc24586749bc4483de4ed04a3d2358628a6fade0637ee32ab3c1?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/32d42d2b9868fc24586749bc4483de4ed04a3d2358628a6fade0637ee32ab3c1?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/32d42d2b9868fc24586749bc4483de4ed04a3d2358628a6fade0637ee32ab3c1?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/32d42d2b9868fc24586749bc4483de4ed04a3d2358628a6fade0637ee32ab3c1?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/32d42d2b9868fc24586749bc4483de4ed04a3d2358628a6fade0637ee32ab3c1?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/32d42d2b9868fc24586749bc4483de4ed04a3d2358628a6fade0637ee32ab3c1?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/32d42d2b9868fc24586749bc4483de4ed04a3d2358628a6fade0637ee32ab3c1?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/32d42d2b9868fc24586749bc4483de4ed04a3d2358628a6fade0637ee32ab3c1?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
              className="mt-12 w-[400px]  mb-2 justify-center ml-16 aspect-[1.22] max-md:mt-10 max-md:max-w-full"
            />
          </div>
          <div className="self-center text-lg font-semibold leading-8 text-center text-slate-600 w-[408px]">
            A well-managed hospital management system is the backbone of
            quality healthcare delivery !
          </div>
        </div>
        <div className="flex flex-col flex-1 justify-center my-auto whitespace-nowrap rounded-2xl bg-slate-50 text-zinc-800 max-md:max-w-full">
          <div className="flex flex-col h-[580px] p-5 max-md:px-5 max-md:max-w-full">
            <div className="mt-8 text-3xl font-semibold leading-10 text-center">
              Welcome...!
            </div>
            <div className="mt-3 text-base leading-6 text-center">
              Let's build someting great
            </div>{" "}
            
           
            <div className="mt-16 text-sm font-medium text-slate-600">
              Username <span style={{ color: 'red' }}>*</span>
            </div>{" "}
            <p className="text-red-500 text-sm mt-1">{errorMessage.username}</p>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="  Enter Username"
              className="shrink-0 mt-3 border-transparent pl-3 bg-white rounded-md shadow h-[46px]"
            />{" "}
           
            <div className="mt-9 text-sm font-medium text-slate-600">
              Password <span style={{ color: 'red' }}>*</span>
            </div>{" "}
            <p className="text-red-500 text-sm mt-1">{errorMessage.password}</p>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="  Enter Password"
              className="shrink-0 mt-3 border-transparent pl-3 bg-white rounded-md shadow h-[46px]"
            />{" "}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              type="submit"
              onClick={handleSubmit}
              className="justify-center items-center text-[20px] px-40 py-4 mt-24  font-semibold leading-4 text-white bg-blue-500 rounded-lg max-md:px-5"
            >
              Sign in
            </button>{" "}
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Login;
