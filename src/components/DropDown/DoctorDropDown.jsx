import React, { useEffect, useState } from 'react'
import axios from "axios";
import baseURL from '../../assets/API_URL';
const DoctorDropDown = ({ selectedDoctor, setSelectedDoctor, doctorInput, setDoctorInput, showDoctorDropdown, setShowDoctorDropdown }) => {
    const token = JSON.parse(localStorage.getItem("Token"));
    const [doctorList, setDoctorList] = useState([]);
    const DoctorAPI = `${baseURL}/doctor/api/doctors/`;

    const handleDoctorInputChange = (e) => {
        setDoctorInput(e.target.value);
        setSelectedDoctor("");
        setShowDoctorDropdown(true);
      };
    
      const handleDoctorSelect = (doctor) => {
        setDoctorInput(doctor.name);
        setSelectedDoctor(doctor.DoctorID);
        setShowDoctorDropdown(false);
      };

      const FetchData= async()=>{
        try {
            const response = await axios.get(DoctorAPI, {
              headers: {
                Authorization: `Token ${token}`,
              },
            });
            setDoctorList(response.data);
          } catch (error) {
            console.error("Error fetching doctors:", error);
          }}
          useEffect(()=>{
            FetchData();
          },[]);
            
  return (
    <div className="flex flex-col flex-1 py-0.5  w-[500px]">  <input
    type="text"
    className="flex gap-5 justify-between p-4 mt-2 text-base leading-4 text-gray-500  rounded-md bg-slate-100 "
    onChange={handleDoctorInputChange}
    onFocus={() => setShowDoctorDropdown(true)}
    onBlur={() => setTimeout(() => setShowDoctorDropdown(false), 100)}
    value={doctorInput}
    placeholder="Type or select the doctor"
  />
  {showDoctorDropdown && (
    <div className="flex flex-col mt-[70px]  max-h-48 overflow-y-auto bg-white border border-gray-300  w-[493px]	position: absolute text-slate-600 font-medium rounded-md">
      {doctorList
        .filter((doctor) =>
          doctor.name.toLowerCase().includes(doctorInput.toLowerCase())
        )
        .map((doctor) => (
          <div
            key={doctor.DoctorID}
            className="p-2 cursor-pointer hover:bg-gray-200"
            onMouseDown={() => handleDoctorSelect(doctor)}
          >
            {doctor.name}
          </div>
        ))}
    </div>
  )}</div>
  )
}

export default DoctorDropDown