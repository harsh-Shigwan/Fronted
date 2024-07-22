import React, { useEffect, useState,useRef } from 'react'
import ComingSoonPage from '../../../components/ComingSoonPage'
import { useParams } from 'react-router-dom';
import baseUrl from '../../../assets/API_URL';
import axios from 'axios';
import generatePDF from "react-to-pdf";
import download from "../../../Data/download.svg";
import HospitalHeader from '../../../components/Billing/HospitalHeader';
const Billing = () => {
  let { PatientID } = useParams();
  const [ myData, setMyData ] = useState([]);
  const targetRef = useRef();
  const PatinetAPI = `${baseUrl}/api/patient/api/patients/${PatientID}/`;
  const token = JSON.parse(localStorage.getItem("Token"));
  const getPatient = async() => {
    try{
      const response =await axios.get(PatinetAPI,{
        headers: {
          Authorization: `Token ${token}`,
        }
      })
      setMyData(response.data);
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getPatient();
  },[PatinetAPI , token]);
  return (
    <div className=' ml-10'> <div className="flex flex-col shadow-lg  pt-5 pb-20 text-sm font-medium text-black bg-white max-w-[869px]" ref={targetRef}>
    <div className="flex flex-col items-start px-9 w-full max-md:px-5 max-md:max-w-full">
     
     <div className=' w-[800px]'><HospitalHeader></HospitalHeader></div> 
      <div className="flex gap-5 py-0.5 mt-10">
      <div className="flex-auto ml-4 font-bold">Bill No </div>
      <div className=' ml-[92px] font-bold'>:</div> 
      <div className=" font-bold ml-4">    {myData.PatientID}</div>
    </div>
      <div className="flex gap-5 py-0.5 mt-2.5">
      <div className="flex-auto ml-4 font-bold">Bill Date </div>
      <div className=' ml-20 font-bold'>:</div> 
      <div className=" font-bold ml-4">    {myData.Register_Date}</div>
    </div>
      
      <div className="flex gap-5 py-0.5 mt-2.5">
      <div className="flex-auto ml-4 font-bold">Patient Name  </div>
       <div className=' ml-12 font-bold'>:</div> 
        <div className=" font-bold ml-4">    {myData.fullname}</div>
    </div>
    <div className="flex gap-5 py-0.5 mt-2.5">
    <div className="flex-auto ml-4 font-bold">Paid Amount   </div>
     <div className=' ml-[51px] font-bold'>:</div> 
        <div className=" font-bold ml-4">    {myData.initial_balance} /-</div>
  </div>
  <div className="flex gap-5 py-0.5 mt-2.5">
  <div className="flex-auto ml-4 font-bold">Payment Mode  </div>
   <div className=' ml-[39px] font-bold'>:</div> 
        <div className=" font-bold ml-4">    {myData.Register_Date}</div>
</div>
      <div
       
        className="self-stretch mt-5 w-full border border-black border-solid stroke-[1px] stroke-black max-md:max-w-full"
      />
      <div className="self-center mt-4 mb-2 text-8xl font-extrabold  tracking-wider">
        Bill Details
      </div>
    </div>
    <div className="flex flex-col px-9 mt-2 w-full max-md:px-5 max-md:max-w-full">
      <div
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/adc93c4a6eb0d9c2d483e8a7f72ee0498ad784ea45692e232aedf7c6b41c119f?apiKey=8d6992485656477797592f8415f51272&"
        className="w-full border border-black border-solid stroke-[1px] stroke-black max-md:max-w-full"
      />
      <div className="flex gap-5 justify-between mt-1.5 w-full max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-5 justify-between font-bold">
          <div className=" ml-5 ">Sr . no</div>
          <div className=" ml-8">IPD</div>
        </div>
        <div className=" mr-10 font-bold">Amount</div>
      </div>
      <div
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/adc93c4a6eb0d9c2d483e8a7f72ee0498ad784ea45692e232aedf7c6b41c119f?apiKey=8d6992485656477797592f8415f51272&"
        className="mt-1.5 w-full border border-black border-solid stroke-[1px] stroke-black max-md:max-w-full"
      />
      <div className="flex gap-5 justify-between w-full whitespace-nowrap max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between">
          <div className="flex flex-col self-start tracking-tight">
            <div className=' mt-4 ml-8 font-bold'>1.</div>
           
          </div>
          <div className="flex flex-col">
            <div className=" mt-4 mb-3 ml-11 font-bold">Deposit</div>
            
          </div>
        </div>
        <div className="flex flex-col self-start tracking-tight">
          <div className=" mr-9 font-bold mt-4"> {myData.initial_balance} /-</div>
         
        </div>
      </div>
      <div
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/adc93c4a6eb0d9c2d483e8a7f72ee0498ad784ea45692e232aedf7c6b41c119f?apiKey=8d6992485656477797592f8415f51272&"
        className="mt-1.5 w-full border border-black border-solid stroke-[1px] stroke-black max-md:max-w-full"
      />
      <div className="self-end mt-28 mr-7 text-base font-bold tracking-wider max-md:mt-10 mb-3  max-md:mr-2.5">
        Signature
      </div>
      
    </div>
    <div
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/adc93c4a6eb0d9c2d483e8a7f72ee0498ad784ea45692e232aedf7c6b41c119f?apiKey=8d6992485656477797592f8415f51272&"
      className="self-center mt-5 w-full border border-black border-solid max-w-[793px] stroke-[1px] stroke-black max-md:max-w-full"
    />
  </div>
  <button
  className="absolute top-[205px] left-[985px] rounded-md  h-10 bg-theme-white-default box-border w-[156px] flex flex-col items-start justify-start py-2.5 px-5 text-theme-primary-dark border-[1px] border-solid border-theme-primary-dark"
  onClick={() =>
    generatePDF(targetRef, {
      filename: "Deposit Amount Bill.pdf",
    })
  }
>
  <div className="w-24 pb-20 mx-[!important] absolute top-[calc(50%_-_12px)] left-[calc(50%_-_48px)] flex flex-row items-center justify-start gap-[8px] ">
    <img
      className="w-4 relative h-4 overflow-hidden shrink-0"
      alt=""
      src={download}
    />
    <div className="relative ">Download </div>
  </div>
</button>
  </div>
  )
}

export default Billing