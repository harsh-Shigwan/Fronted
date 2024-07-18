import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../../assets/API_URL';
import CustomDropdown from '../../components/CustomDropdown';
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
  const [ gender , setGender]= useState('');
  const [ dept , setDepart] = useState('');
    const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const validate =()=>{
    const NewErrors = {};

    if (!formData.name) NewErrors.name = "This field is required.";
    if (!formData.gender) NewErrors.gender = "This field is required.";
    if (!formData.phoneNumber) NewErrors.phoneNumber = "This field is required.";
    else if (!/^\d{10}$/.test(formData.phoneNumber)) NewErrors.phoneNumber = 'Phone number is invalid.';
    if (!formData.address) NewErrors.address = "This field is required.";
    if (!formData.email) NewErrors.email = "This field is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) NewErrors.email = 'Email is invalid.';
    if (!formData.dob) NewErrors.dob = "This field is required.";else if (new Date(formData.dob) > new Date()) {
      NewErrors.dob = " Wrong date.";
    }
    if (!formData.hire_datee) NewErrors.hire_datee = "This field is required.";
    if (!formData.department) NewErrors.department = "This field is required.";

    setErrors(NewErrors);
    return Object.keys(NewErrors).length === 0;
  }

  const handleSubmit = () => {
    if(!validate()){
    
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
    
     
    });
    
  };
  }
  const navigate = useNavigate();
  const handle =()=>{
    navigate("/staff_form")
  }
  const options = [
    { value: '', label: 'Select the option' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' }
  ];
  const DepartmentOptions = [
    { value: '', label: 'Select an option' },
    { value: 'Nursing', label: 'Nursing Staff' },
    { value: 'Pharmacy', label: 'Pharmacy Staff' },
    { value: 'Laboratory', label: 'Laboratory Staff' },
    { value: 'Radiology', label: 'Radiology Staff' },
    { value: 'Physical_Therapy', label: 'Physical Therapy Staff' },
    { value: 'Occupational_Therapy', label: 'Occupational Therapy Staff' },
    { value: 'Respiratory_Therapy', label: 'Respiratory Therapy Staff' },
    { value: 'Medical_Social_Work', label: 'Medical Social Work Staff' },
    { value: 'Dietetics', label: 'Dietetics Staff' },
    { value: 'Administration', label: 'Administration Staff' }
  ];

  const handlechangeDept = (selectedDepartment) => {
    setDepart(selectedDepartment);
    setFormData({
      ...formData,
      department: selectedDepartment
    });
  };
  const handleGenderChange=(selectedGender)=>{
    setGender(selectedGender);
    setFormData({
      ...formData,
      gender: selectedGender
    });
  };
  return (
    <div className="flex flex-col w-[1100px] pt-6 pb-12 font-medium bg-white">
      <div className="self-start ml-7 text-xl leading-6 whitespace-nowrap text-slate-800 max-md:ml-2.5">
        Register Hospital staff 
      </div>
      <div className="mt-4 w-full bg-slate-100 min-h-[1px] max-md:max-w-full" />
      <div className="flex flex-col px-7 mt-2 w-full text-sm max-md:px-5 max-md:max-w-full">
        <div className="flex gap-[200px] justify-between max-w-full text-slate-600 w-[962px] max-md:flex-wrap">
          <div className="flex-auto">Name <span style={{ color: 'red' }}>*</span></div>
          <div className="flex-auto ml-12">Gender <span style={{ color: 'red' }}>*</span></div>
        </div>
        <div className="flex gap-0 justify-between mt-2 text-base leading-4 max-md:flex-wrap max-md:max-w-full">
        <input
          type="text"
          className="flex gap-5 border-transparent w-[450px] justify-between h-[50px] text-[15px] p-4 text-gray-500  rounded-md bg-slate-100 max-md:flex-wrap "
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        
        {errors.Gender && <span style={{ color: 'red' }}>{errors.Gender}</span>}
      </div>
      <div className='w-[450px] absolute top-[98px] left-[850px] '>
      <CustomDropdown
        options={options}
        onChange={handleGenderChange}
        value={gender}
      
      /></div>
      
        <div className="flex gap-[200px] justify-between mt-8 max-w-full text-slate-600 w-[962px] max-md:flex-wrap">
          <div className="flex-auto">Phone Number <span style={{ color: 'red' }}>*</span></div>
          <div className="flex-auto">Address <span style={{ color: 'red' }}>*</span></div>
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
          <div className="flex-auto">Email <span style={{ color: 'red' }}>*</span></div>
          <div className="flex-auto ml-20">Date of Birth <span style={{ color: 'red' }}>*</span></div>
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
          <div className="flex-auto">Hire Date <span style={{ color: 'red' }}>*</span></div>
          <div className="flex-auto ml-16">Department <span style={{ color: 'red' }}>*</span></div>
        </div>
        <div className="flex gap-0 justify-between mt-2 text-base leading-4 max-md:flex-wrap max-md:max-w-full">
          <input
            type="date"
            className="flex gap-5 border-transparent w-[450px] justify-between h-[50px] text-[15px] p-4 text-gray-500 rounded-md bg-slate-100 max-md:flex-wrap max-md:max-w-full"
            name="hire_datee"
            value={formData.hire_datee}
            onChange={handleChange}
          />
          <div className='w-[450px] absolute top-[425px] left-[850px] '>
          <CustomDropdown
            options={ DepartmentOptions}
            onChange={handlechangeDept}
            value={dept}
            className=" "
          /></div>
          {errors.department && <span style={{ color: 'red' }}>{errors.department}</span>}
        </div>

        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
      </div>
      <button className="flex gap-5 justify-between self-end mt-8 mr-8 text-base font-semibold leading-4 whitespace-nowrap max-md:mt-10 max-md:mr-2.5" >
        <div
          className="grow justify-center px-8 py-4 text-blue-700 rounded-lg border border-blue-700 border-solid max-md:px-5" onClick={handle}
        
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
