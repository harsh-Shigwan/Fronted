import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseURL from "../assests/API_URL";
import logo from "../Data/logo.png"
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hospital: "",
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [ errorMessage , setErrorMessage] = useState("");
  const [ isSubmit , setIsSubmit] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 const validate =(val)=>{
   const error = {};
   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!formData.hospital) {
    error.hospital = "Hospital name is required*";
  }
  if (!formData.username) {
    error.username = "Username is required*";
  }
  if (!formData.email) {
    error.email = "Email is required*";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email)) {
    error.email = "Invalid email address";
  }
  if (!formData.password) {
    error.password = "Password is required*";
  } else if (formData.password.length < 8) {
    error.password = "Password must be at least 8 characters long";
  }
    return error;
  
 };  
 useEffect(()=>{
if (Object.keys(error).length === 0 && isSubmit){
}
 },[formData])
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(validate(formData));
    setIsSubmit(true);
    try {
      const response = await axios.post(
        `${baseURL}/api/hos_loginlogin/`,
        formData
      );
      const token = response.data.token; 
      localStorage.setItem("Token", JSON.stringify(token));
      navigate("/home");
 
    } catch (error) {
      setError(error.response.data.message || "Login failed");
      console.log("Error response data:", error.response?.data);
      alert("Login failed")
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
              className="mt-12 mb-9 w-full aspect-[1.22] max-md:mt-10 max-md:max-w-full"
            />
          </div>
          <div className="self-center text-lg font-semibold leading-8 text-center text-slate-600 w-[408px]">
            Lets see what we have new, check it out! So maybe write here
            something more.
          </div>

       
        </div>
        <div className="flex flex-col flex-1 justify-center my-auto whitespace-nowrap rounded-2xl bg-slate-50 text-zinc-800 max-md:max-w-full">
          <div className="flex flex-col h-[1000px] p-5 max-md:px-5 max-md:max-w-full">
            
            <div className="mt-8 text-3xl font-semibold leading-10 text-center">
              Welcome...!
            </div>
            <div className="mt-3 text-base leading-6 text-center">
              Let's build someting great
            </div>{" "}
            <div className="mt-12 text-sm font-medium text-slate-600 max-md:mt-10">
              Hospital Name
            </div>{" "}
            <p className="text-red-500  text-sm mt-1">{ errorMessage.hospital}</p>
            <input
              type="text"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              placeholder="  Enter Hospital Name"
              className="shrink-0 mt-2 border-transparent bg-white pl-3 rounded-md shadow h-[46px]"
            />{" "}
            <div className="mt-9 text-sm font-medium text-slate-600">
              Username
            </div>{" "}
            <p className="text-red-500  text-sm mt-1">{ errorMessage.username}</p>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="  Enter Username"
              className="shrink-0  mt-3 border-transparent  pl-3 bg-white rounded-md shadow h-[46px]"
            />{" "}
            <div className="mt-9 text-sm font-medium text-slate-600">Email</div>{" "}
            <p className="text-red-500  text-sm mt-1">{ errorMessage.email}</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="  Enter email"
              className="shrink-0 mt-3 border-transparent  pl-3 bg-white rounded-md shadow h-[46px]"
            />{" "}
            <div className="mt-9 text-sm font-medium text-slate-600">
               Password
            </div>{" "}
            <p className="text-red-500  text-sm mt-1">{ errorMessage.password}</p>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="  Enter Paswword"
              className="shrink-0 mt-3 border-transparent pl-3
               bg-white rounded-md shadow h-[46px]"
            />{" "}
           
            <button type="submit"
              onClick={handleSubmit}
              className="justify-center items-center text-[20px] px-40 py-4 mt-8  font-semibold leading-4 text-white bg-blue-500 rounded-lg max-md:px-5"
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