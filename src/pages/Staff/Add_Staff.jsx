import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../../assets/API_URL';
const Add_Staff = () => {
  const token =  JSON.parse(localStorage.getItem("Token"))
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    phoneNumber: '',
    address: '',
    email: '',
    dob: '',
    hire_datee: '',
    department: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${baseURL}/api/staff/staff/`, formData, {
      headers: {
        Authorization: `Token ${token}`,
      }
    }).then((response) => {
      console.log('API Response:', response.data);
   
      // Add logic to handle the API response, if needed
      navigate('/staff_form');
    })
    .catch((error) => {
      console.error('API Error:', error);
      console.log("Error response data:", error.response?.data);
      alert("Staff not added")
      // Add logic to handle the API error, if needed
    });
    
  };

  const navigate = useNavigate();
  const handle =()=>{
    navigate("/staff_form")
  }

  return (
    <div className="flex flex-col w-[1100px] pt-6 pb-12 font-medium bg-white">
      <div className="self-start ml-7 text-xl leading-6 whitespace-nowrap text-slate-800 max-md:ml-2.5">
        Register Hospital staff 
      </div>
      <div className="mt-6 w-full bg-slate-100 min-h-[1px] max-md:max-w-full" />
      <div className="flex flex-col px-7 mt-7 w-full text-sm max-md:px-5 max-md:max-w-full">
        <div className="flex gap-[200px] justify-between max-w-full text-slate-600 w-[962px] max-md:flex-wrap">
          <div className="flex-auto">Name</div>
          <div className="flex-auto ml-12">Gender</div>
        </div>
        <div className="flex gap-0 justify-between mt-2 text-base leading-4 max-md:flex-wrap max-md:max-w-full">
          <input
            type="text"
            className="flex gap-5 border-transparent w-[450px] justify-between h-[50px] text-[15px] p-4 text-gray-500 rounded-md bg-slate-100 max-md:flex-wrap max-md:max-w-full"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="text"
            className="flex gap-5 border-transparent w-[450px] justify-between h-[50px] text-[15px] p-4 text-gray-500 rounded-md bg-slate-100 max-md:flex-wrap max-md:max-w-full"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Gender"
          />
        </div>
        
        <div className="flex gap-[200px] justify-between mt-8 max-w-full text-slate-600 w-[962px] max-md:flex-wrap">
          <div className="flex-auto">Phone Number</div>
          <div className="flex-auto">Address</div>
        </div>
        <div className="flex gap-0 justify-between mt-2 text-base leading-4 max-md:flex-wrap max-md:max-w-full">
          <input
            type="text"
            className="flex gap-5 border-transparent w-[450px] justify-between h-[50px] text-[15px] p-4 text-gray-500 rounded-md bg-slate-100 max-md:flex-wrap max-md:max-w-full"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          <input
            type="text"
            className="flex gap-5 border-transparent w-[450px] justify-between h-[50px] text-[15px] p-4 text-gray-500 rounded-md bg-slate-100 max-md:flex-wrap max-md:max-w-full"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />
        </div>

        <div className="flex gap-[200px] justify-between mt-8 max-w-full text-slate-600 w-[962px] max-md:flex-wrap">
          <div className="flex-auto">Email</div>
          <div className="flex-auto ml-20">Date of Birth</div>
        </div>
        <div className="flex gap-0 justify-between mt-2 text-base leading-4 max-md:flex-wrap max-md:max-w-full">
          <input
            type="email"
            className="flex gap-5 border-transparent w-[450px] justify-between h-[50px] text-[15px] p-4 text-gray-500 rounded-md bg-slate-100 max-md:flex-wrap max-md:max-w-full"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="date"
            className="flex gap-5 border-transparent w-[450px] justify-between h-[50px] text-[15px] p-4 text-gray-500 rounded-md bg-slate-100 max-md:flex-wrap max-md:max-w-full"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-[200px] justify-between mt-8 max-w-full text-slate-600 w-[962px] max-md:flex-wrap">
          <div className="flex-auto">Hire Date</div>
          <div className="flex-auto ml-16">Department</div>
        </div>
        <div className="flex gap-0 justify-between mt-2 text-base leading-4 max-md:flex-wrap max-md:max-w-full">
          <input
            type="date"
            className="flex gap-5 border-transparent w-[450px] justify-between h-[50px] text-[15px] p-4 text-gray-500 rounded-md bg-slate-100 max-md:flex-wrap max-md:max-w-full"
            name="hire_datee"
            value={formData.hire_datee}
            onChange={handleChange}
          />
          <select
            className="flex gap-5 border-transparent justify-between w-[450px] p-4 text-gray-500 rounded-md bg-slate-100 max-md:flex-wrap max-md:max-w-full"
            type="select"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Select staff Department"
          >
            <option className="text-gray-500 text-base font-medium leading-4" value="">
              Select Department
            </option>
            <option className="text-gray-500 text-base font-medium leading-4" value="ICU">ICU</option>
            <option className="text-gray-500 text-base font-medium leading-4" value="IPD">IPD</option>
            <option className="text-gray-500 text-base font-medium leading-4" value="OPD">OPD</option>
          </select>
        </div>

        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
      </div>
      <button className="flex gap-5 justify-between self-end mt-40 mr-8 text-base font-semibold leading-4 whitespace-nowrap max-md:mt-10 max-md:mr-2.5" onClick={handle}>
        <div
          className="grow justify-center px-8 py-4 text-blue-700 rounded-lg border border-blue-700 border-solid max-md:px-5"
        
        >
          Cancel
        </div>
        <button
          className="grow justify-center px-10 py-4 text-white bg-blue-700 rounded-lg border border-solid border-[color:var(--Theme-Primary-Default,#4C6FFF)] max-md:px-5"
          onClick={handleSubmit}
        >
          Add
        </button>
      </button>
    </div>
  );
};

export default Add_Staff;
