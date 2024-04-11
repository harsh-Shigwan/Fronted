import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Breadcrumb from '../../components/Breadcrumb';
const baseURL = 'http://127.0.0.1:8000';
const Appointment_form = () => {
  
 
    const [selectedPatient, setSelectedPatient] = useState('');
    const [patientsList, setPatientsList] = useState([]);
    const [ doctorList , setDoctorList ] = useState([]);
    const [ selectedDoctor , setSelectedDoctor] = useState('');
    const [docoptions, setDocOptions] = useState([]);

 
useEffect(()=>{
  
  axios.get(`${baseURL}/patient/api/patients/`)
  .then(response => {
      setPatientsList(response.data);
  })
  .catch(error => {
      console.error('Error fetching patients:', error);
  });

  axios.get(`${baseURL}/doctor/api/doctors/`).then(response => {
    setDoctorList(response.data);
  }).catch(error => {
    console.error('Error fetching patients:', error);
  })
  

},[]);

  const handleSubmit = (event) => {
    event.preventDefault();
   
    axios.post('http://127.0.0.1:8000/appointments/appointments/', {
      patient: selectedPatient,
      doctor: selectedDoctor,
    })
      .then((response) => {
        console.log('API Response:', response.data);
        console.log('Item added successfully!');
   
      })
      .catch((error) => {
        console.error('API Error:', error);
        console.log("Error response data:", error.response?.data);
    
      });
  };

  return (
    <div>
    <Breadcrumb></Breadcrumb>
  <form className="flex flex-col w-[1120px] px-6 pb-12 font-medium bg-slate-50 max-md:px-5" onSubmit={handleSubmit}>
    <div className="flex flex-col pt-6 pb-12 bg-white max-md:max-w-full">
      <div className="self-start ml-7 text-xl leading-6 whitespace-nowrap text-slate-800 max-md:ml-2.5">
        Appointment Form
      </div>
      <div className="shrink-0 mt-5 h-px bg-slate-100 max-md:max-w-full" />
      <div className="flex flex-col px-7 mt-6 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
          <div className="flex mt-1 flex-col flex-1 self-start">
            <div className="text-sm text-slate-600">Patient Name *</div>
            <select className="flex gap-5 justify-between p-4 mt-2 text-base leading-4 text-gray-500   rounded-md bg-slate-100"   onChange={(e) => setSelectedPatient(e.target.value)} value={selectedPatient} placeholder=' select the patient'>
            {
             patientsList.map((option) => (
                  <option key={option.PatientID} value={option.PatientID}>{option.FirstName}</option>
              ))
            }
              
            
            </select>
          </div>
          
          <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
          <div className="text-sm text-slate-600">Doctor Name *</div>
          <select className="flex gap-5 justify-between p-4 mt-2 text-base leading-4 text-gray-500   rounded-md bg-slate-100"   onChange={(e) => setSelectedPatient(e.target.value)}  value={selectedDoctor} placeholder=' select the doctor'>
          {
           doctorList.map((option) => (
                <option key={option.DoctorID} value={option.DoctorID}>{option.name}</option>
            ))
          }
            
          
          </select>
          </div>
        </div>
        <div className="flex gap-5 justify-between mt-8 max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
          <div className="text-sm text-slate-600 max-md:max-w-full">
            Date*
          </div>
          <input className="justify-center items-start py-4 pr-16 pl-4 mt-3 text-base leading-4 text-gray-500 whitespace-nowrap rounded-md bg-slate-100 max-md:pr-5 max-md:max-w-full" name='date' type='date' onChange={(e) => setSelectedPatient(e.target.value)}   placeholder='enter date' >
          
          </input>
        </div>
        <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
          <div className="text-sm text-slate-600 max-md:max-w-full">
            {" "}
            Time Slot*
          </div>
          <input className="justify-center items-start py-4 pr-16 pl-4 mt-2 text-base leading-4 text-gray-500 whitespace-nowrap rounded-md bg-slate-100 max-md:pr-5 max-md:max-w-full" name='time_slot' type='time'  onChange={(e) => setSelectedPatient(e.target.value)}   placeholder='enter the time slot'    >
         
          </input>
        </div>
      </div>
      
        <div className="flex gap-5 justify-between mt-8 max-md:flex-wrap  w-[500px]">
          <div className="flex flex-col flex-1 self-start max-md:max-w-full">
            <div className="text-sm text-slate-600 max-md:max-w-full">
             Status
            </div>
            <select className="flex gap-5 justify-between px-3.5 py-4 mt-2 text-base leading-4 text-gray-500 whitespace-nowrap rounded-md bg-slate-100 max-md:flex-wrap max-md:max-w-full" name='status'   onChange={(e) => setSelectedPatient(e.target.value)}   placeholder=' enter the status' >
            <option value="">select the option</option>
            <option value="pending">Pending</option>
            <option value="booked">Booked</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          
        </div>




      
      </div>
      <div className="flex gap-5 justify-between self-end mt-14 mr-8 mb-9 text-base font-semibold leading-4 whitespace-nowrap max-md:mt-10 max-md:mr-2.5">
        <div className="grow justify-center px-8 py-4 text-blue-700 rounded-lg border border-blue-700 border-solid max-md:px-5">
          Cancel
        </div>
        <button className="grow justify-center px-10 py-4 text-white bg-blue-700 rounded-lg border border-solid border-[color:var(--Theme-Primary-Default,#4C6FFF)] max-md:px-5"  type='submit'>
          Add
        </button>
      </div>
    </div>
  </form></div>
  )
}

export default Appointment_form
