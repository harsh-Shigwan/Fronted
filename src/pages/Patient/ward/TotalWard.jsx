import axios from 'axios'; 
import React, { useState  , useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import All_Wards from './All_Wards';
import Breadcrumb from '../../../components/Breadcrumb';
import download from "../../../Data/download.png";
import search from "../../../Data/search.png";
import generatePDF from "react-to-pdf";
const TotalWard = () => {
    const[ formData , setFormData] = useState({
        name:"",
        total_beds:""
    })
    const navigate = useNavigate()
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };
    const handleSubmit = (event) => {
    
        console.log('Form Data Submitted:', formData);
        axios.post('http://127.0.0.1:8000/ipd/wards/', formData).then((response) => {
            console.log('API Response:', response.data);
           
        }).catch((error)=>{
            console.error('API Error:', error);
           
        })
    }
    const targetRef = useRef(); 
    const [searh, setSearch] = useState("");   
  return (
    <div>
    <Breadcrumb></Breadcrumb>
    <div className='w-[1110px] relative bg-theme-white-default  h-20 overflow-hidden shrink-0'>
    <div className='absolute top-[0px] left-[0px] w-[1110px] flex flex-col items-start justify-start'>
    <div className="self-stretch relative h-[60px] overflow-hidden shrink-0">
    <div className="absolute w-full top-[60px] right-[0px] left-[0px] bg-gray-200 box-border h-0 border-t-[1px] border-solid border-border-light" />
    <div className="absolute top-[18px] left-[22px] text-[20px] text-slate-700 leading-[24px] font-medium">
      Add Ward
    </div>
    <input
      className="absolute top-[11px] left-[700px] rounded-[30px] bg-theme-white-default box-border w-[161px] h-[38px] border-[1px] border-solid border-black pl-8 text-slate-700"
      defaultValue=""
      onChange={(e) => {
        setSearch(e.target.value);
      }}
    />
    <div className="absolute top-[18px] left-[600px] h-[23.75px] flex flex-row  ml-28 items-start justify-start">
      <img
        className="w-5 relative h-5  overflow-hidden shrink-0"
        alt=""
        src={search}
      />
    </div>

   
     
    <button
      className="absolute top-[11px] left-[905px] rounded-md  h-10 bg-theme-white-default box-border w-[156px] flex flex-col items-start justify-start py-2.5 px-5 text-theme-primary-dark border-[1px] border-solid border-theme-primary-dark"
      onClick={() =>
        generatePDF(targetRef, {
          filename: "Dishcharged_Patient_List.pdf",
        })
      }
    >
      <div className="w-24 my-0 mx-[!important] absolute top-[calc(50%_-_8px)] left-[calc(50%_-_48px)] flex flex-row items-center justify-start gap-[8px] z-[0]">
        <img
          className="w-4 relative h-4 overflow-hidden shrink-0"
          alt=""
          src={download}
        />
        <div className="relative font-semibold">Download </div>
      </div>
    </button>
  </div>

  </div>
  </div>
    <fieldset>
    <form onSubmit={handleSubmit} className='m-0 w-[1110px] bg-theme-white-default overflow-hidden flex flex-col  py-6 pr-[22px] pl-[26px] box-border gap-[30px] mt-5'>
    {/*input field */}
    <div className="flex flex-col px-7 mt-6 max-md:px-5 max-md:max-w-full">
    <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
      <div className="flex mt-1 flex-col flex-1 self-start">
        <div className=" text-slate-400 text-sm font-medium"> Ward Name</div>
        <input className="flex gap-5 justify-between p-4 mt-2 text-base leading-4 text-gray-500 rounded-md bg-slate-100"  type="text"
        placeholder="Enter Ward Name"
        value={formData.name}
        onChange={handleChange} name='name' >
          
        
        </input>
      </div>
      
      <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
        <div className="text-sm text-slate-600 font-medium max-md:max-w-full">
        Total Beds
        </div>
        <input className="justify-center items-start py-4 pr-16 pl-4 mt-3 text-base leading-4 text-gray-500 whitespace-nowrap rounded-md bg-slate-100 max-md:pr-5 max-md:max-w-full"  type="text"
        placeholder="Enter Number of beds"
        value={formData.total_beds}
        onChange={handleChange} name='total_beds'>
         
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
    <All_Wards></All_Wards>
    </div>
  )
}

export default TotalWard