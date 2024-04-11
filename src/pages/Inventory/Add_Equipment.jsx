import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb';
import axios from 'axios';
const Add_Equipment = () => {
    const navigate = useNavigate();
    const handle =()=>{
        navigate("/Inventory/Equipment")
    }
  const [ formData , setFormData ]= useState({
    purchase_date:"",
    name:"",
    quantity:"",
    unit_price:"",
    manufacturer:""

  });
  const handleChange = (event)=>{
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data Submitted:', formData);
    axios.post('http://127.0.0.1:8000/inventory/api/equipment/', formData)
      .then((response) => {
        console.log('API Response:', response.data);
        navigate('/Inventory/Equipment');
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
        Medicine Inventory
      </div>
      <div className="shrink-0 mt-5 h-px bg-slate-100 max-md:max-w-full" />
      <div className="flex flex-col px-7 mt-6 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
          <div className="flex mt-1 flex-col flex-1 self-start">
            <div className="text-sm text-slate-600">Medicine manufacturer *</div>
            <input className="flex gap-5 justify-between p-4 mt-2 text-base leading-4 text-gray-500 rounded-md bg-slate-100" name='manufacturer' type='text' onChange={handleChange} value={formData.manufacturer} placeholder='enter the medincine category'>
              
            
            </input>
          </div>
          
          <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
            <div className="text-sm text-slate-600 max-md:max-w-full">
              Medicine Name*
            </div>
            <input className="justify-center items-start py-4 pr-16 pl-4 mt-3 text-base leading-4 text-gray-500 whitespace-nowrap rounded-md bg-slate-100 max-md:pr-5 max-md:max-w-full" name='name' type='text' onChange={handleChange} value={formData.name} placeholder='enter the medincine name'>
             
            </input>
          </div>
        </div>
        <div className="flex gap-5 justify-between mt-8 max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
          <div className="text-sm text-slate-600 max-md:max-w-full">
          Unit Price*
          </div>
          <input className="justify-center items-start py-4 pr-16 pl-4 mt-3 text-base leading-4 text-gray-500 whitespace-nowrap rounded-md bg-slate-100 max-md:pr-5 max-md:max-w-full" name='unit_price' type='number' onChange={handleChange} value={formData.unit_price} placeholder='enter the unit price' >
          
          </input>
        </div>
        <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
          <div className="text-sm text-slate-600 max-md:max-w-full">
            {" "}
            Quantity*
          </div>
          <input className="justify-center items-start py-4 pr-16 pl-4 mt-2 text-base leading-4 text-gray-500 whitespace-nowrap rounded-md bg-slate-100 max-md:pr-5 max-md:max-w-full" name='quantity' type='number' onChange={handleChange} value={formData.quantity} placeholder='enter the quantity'    >
         
          </input>
        </div>
      </div>
      
        <div className="flex gap-5 justify-between mt-8  w-[500px]">
          <div className="flex flex-col flex-1 self-start max-md:max-w-full">
            <div className="text-sm text-slate-600 max-md:max-w-full">
            Purchase Date
            </div>
            <input className="flex gap-5 justify-between px-3.5 py-4 mt-2 text-base leading-4 text-gray-500 whitespace-nowrap rounded-md bg-slate-100 max-md:flex-wrap max-md:max-w-full" name='purchase_date' type='date' onChange={handleChange} value={formData.purchase_date} placeholder=' enter the expiry date' >
            
            </input>
          </div>
         
        </div>
        
      </div>
      <div className="flex gap-5 justify-between self-end mt-14 mr-8 mb-9 text-base font-semibold leading-4 whitespace-nowrap max-md:mt-10 max-md:mr-2.5">
        <div className="grow justify-center px-8 py-4 text-blue-700 rounded-lg border border-blue-700 border-solid max-md:px-5">
          Cancel
        </div>
        <button className="grow justify-center px-10 py-4 text-white bg-blue-700 rounded-lg border border-solid border-[color:var(--Theme-Primary-Default,#4C6FFF)] max-md:px-5"   type='submit'>
          Add
        </button>
      </div>
    </div>
  </form></div>
  )
}

export default Add_Equipment