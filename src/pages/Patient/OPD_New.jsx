import React, { useState, useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OPD_New = () => {
  const [patient_id, setPatientId] = useState("");
  const [doctor_id, setDoctorId] = useState("");
  const token =  JSON.parse(localStorage.getItem("Token"))
  const [patientData, setPatientData] = useState([]);
  const [doctorData, setDoctorData] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ddepartment: [],
  });
  const handleChange = (event) => {
    setFormData({ ...formData, ddepartment: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Data Submitted:", { patient_id, doctor_id, formData });

    try {
      // Use Axios to send a POST request with the form data
      const response = await axios.post(
        "http://127.0.0.1:8000/api/opd/api/opd-register/",
        { patient_id, doctor_id, ddepartment: formData.ddepartment }
        , {
          headers: {
            Authorization: `Token ${token}`,
          },
        } );
      console.log("API Response:", response.data);
      // Add logic to handle the API response, if needed
      navigate("/Patient/OPD");
    } catch (error) {
      console.error("API Error:", error);
      console.log("Error response data:", error.response?.data);
      // Add logic to handle the API error, if needed
    }
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        if (patient_id) {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/patient/api/patients/${patient_id}/`
            , {
              headers: {
                Authorization: `Token ${token}`,
              },
            } );
          setPatientData(response.data);
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
        console.log("Error response data:", error.response?.data);
      }
    };

    const fetchDoctorData = async () => {
      try {
        if (doctor_id) {
          const response = await axios.get(
            `http://127.0.0.1:8000/doctor/api/doctors/${doctor_id}/`
            , {
              headers: {
                Authorization: `Token ${token}`,
              },
            } );
          setDoctorData(response.data);
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        console.log("Error response data:", error.response?.data);
      }
    };

    fetchPatientData();
    fetchDoctorData();
  }, [patient_id, doctor_id]);

  return (
    <div className="">
      <Breadcrumb />
 

      <fieldset>
        <form
          onSubmit={handleSubmit}
          className="m-0 w-[1110px] bg-theme-white-default overflow-hidden flex flex-col  py-6 pr-[22px] pl-[26px] box-border gap-[30px] mt-5 "
        >
         
      <div className="flex flex-col px-7 mt-6 max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
        <div className="flex mt-1 flex-col flex-1 self-start">
          <div className=" text-slate-600 text-sm font-medium"> Patient ID *</div>
          <input className="flex gap-5 justify-between p-4 mt-2 text-base leading-4 text-gray-500 rounded-md bg-slate-100"  type="text"
          placeholder="Enter patient ID"
          value={patient_id}
          onChange={(e) => setPatientId(e.target.value)} >
            
          
          </input>
        </div>
        
        <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
          <div className="text-sm text-slate-600 font-medium max-md:max-w-full">
             Doctor Id
          </div>
          <input className="justify-center items-start py-4 pr-16 pl-4 mt-3 text-base leading-4 text-gray-500 whitespace-nowrap rounded-md bg-slate-100 max-md:pr-5 max-md:max-w-full"  type="text"
          placeholder="Enter doctor ID"
          value={doctor_id}
          onChange={(e) => setDoctorId(e.target.value)}>
           
          </input>
        </div>
      </div>
      <div className="flex gap-5 justify-between mt-8 max-md:flex-wrap  w-[500px]">
      <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
        <div className="text-sm text-slate-600 font-medium max-md:max-w-full">
          Select department
        </div>
        <input className="justify-center items-start py-4 pr-16 pl-4 mt-3 text-base leading-4 text-gray-500 whitespace-nowrap rounded-md bg-slate-100 max-md:pr-5 max-md:max-w-full"  type="text"
        placeholder="Enter department"
        value={formData.ddepartment}
        onChange={handleChange} >
        
        </input>
      </div>
     
    </div>


    </div>
          

         

          
      
    <div className="flex items-stretch justify-between gap-5 mt-8 self-end">
    <div className="text-blue-700 text-base font-semibold leading-4 items-stretch border grow justify-center px-8 py-4 rounded-lg border-solid border-blue-700 max-md:px-5">
      Cancel
    </div>
    <button
      className="text-white text-base font-semibold leading-4 items-stretch border border-[color:var(--Theme-Primary-Default,#4C6FFF)] bg-blue-700 grow justify-center px-7 py-4 rounded-lg border-solid max-md:px-5"
      type="submit"
      onClick={() => {
        handleSubmit(); // Manually call the submit function
       
      }}
    >
      Submit
    </button>
  </div>
        </form>
      </fieldset>
<div className=" flex ">
      {/* Display fetched patient and doctor data */}
      <div className="bg-blue-50 w-2/4 text-slate-600 p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2">Patient Data:</h2>
      <pre className="overflow-x-auto">{JSON.stringify(patientData, null, 2)}</pre>
    </div>
    
      <div className=" bg-blue-50 w-[600px] text-slate-600 p-4 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-2">Doctor Data:</h2>
        <pre className="overflow-x-auto">{JSON.stringify(doctorData, null, 2)}</pre>
      </div>
      </div>
    </div>
  );
};

export default OPD_New;