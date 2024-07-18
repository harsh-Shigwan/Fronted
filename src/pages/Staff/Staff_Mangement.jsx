import React, { useState, useRef, useEffect } from "react";
import Plus from "../../Data/Plus.png";
//import baseURL from "../../assests/API_URL";
import { useNavigate } from "react-router-dom";
import StaffBarChart from "../../components/Graph/StaffBarChart";
import baseURL from "../../assets/API_URL";
import axios from "axios";
const Staff_Mangement = () => {
  const token =  JSON.parse(localStorage.getItem("Token"))
  const API = `${baseURL}/api/staff/staff/`;
  const [myData, setMyData] = useState([]);
const handle = () => {
  navigate("/Staff_form");
};
  const navigate = useNavigate();

 const fetchData = async(API)=>{
  try{
    const res = await axios.get(API,{
      headers:{
        Authorization: `Token ${token}`,
      }
    });
    setMyData(res.data);
  }catch(error){
    console.log(error);
  }
 };
 useEffect(()=>{
  fetchData(API);
 },[])
  return (
    <div>
    
    <div className="self-stretch relative mt-12 h-[65px] overflow-hidden shrink-0 bg-theme-white-default bottom-3  rounded-lg">
    <div className="absolute w-full top-[60px] right-[0px] left-[0px] bg-gray-200 box-border h-0 border-t-[1px] border-solid border-border-light" />
    <div className="absolute top-[18px] left-[32px] text-slate-600 text-[20px] leading-[24px] font-medium">
      Staff Mangement Dashboard
    </div>
 

    <button
      className="absolute top-[11px] left-[937px] rounded-md bg-theme-primary-dark w-[156px] flex flex-col items-start justify-start py-2.5 px-5  h-10 box-border text-theme-white-default"
      onClick={handle}
    >
      <div className="w-24 my-0 mx-[!important] absolute top-[10px] left-[10px] flex flex-row items-center justify-start gap-[8px] z-[0]">
        <img
          className="w-5 relative h-5 object-cover"
          alt=""
          src={Plus}
        />
        <div className="relative font-semibold">Attendance</div>
      </div>
    </button>
 
  </div>
    <div className="py-8 ml-[30px] ">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
        <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow justify-center px-6 py-12 mx-auto w-full whitespace-nowrap bg-white rounded-2xl shadow-md max-md:px-5 max-md:mt-10">
            <div className="flex gap-4 justify-between mt-2.5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4eec1eef119770d1bb83c740224e9595e99318c267dada1fb87f9ee35dca0531?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                className="aspect-square w-[46px]"
              />
              <div className="flex flex-col flex-1 self-start">
                <div className="text-base font-bold text-slate-500">
                  Total Employee
                </div>
                <div className="text-xl font-semibold leading-7 text-gray-900">
                  150
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow justify-center px-6 py-12 mx-auto w-full whitespace-nowrap bg-white rounded-2xl shadow-md max-md:px-5 max-md:mt-10">
            <div className="flex gap-4 justify-between mt-2.5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/edd7a949f48c5fb2a4cd943076d4b03530d4c8bb300558d84f7461e3fc61d4b2?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                className="aspect-square w-[46px]"
              />
              <div className="flex flex-col flex-1 self-start">
                <div className="text-base font-bold text-slate-500">
                  Today’s Atendance
                </div>
                <div className="text-xl font-semibold leading-7 text-gray-900">
                  120
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow justify-center px-6 py-12 mx-auto w-full whitespace-nowrap bg-white rounded-2xl shadow-md max-md:px-5 max-md:mt-10">
            <div className="flex gap-4 justify-between mt-2.5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2219aebc15fb6b3891b2ff160ae960e350b2558743e385641c519f9da78b5b18?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                className="aspect-square w-[46px]"
              />
              <div className="flex flex-col flex-1 self-start">
                <div className="text-base font-bold text-slate-500">
                  Past Attendance
                </div>
                <div className="text-xl font-semibold leading-7 text-gray-900">
                  100
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow justify-center px-6 py-12 mx-auto w-full whitespace-nowrap bg-white rounded-2xl shadow-md max-md:px-5 max-md:mt-10">
            <div className="flex gap-4 justify-between mt-2.5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb6ceb63ca4140ddaa0eac7a6ab629631e4c42eefcc34269d0568cb637f165b1?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                className="aspect-square w-[46px]"
              />
              <div className="flex flex-col flex-1 self-start">
                <div className="text-base font-bold text-slate-500">
                  Average Atendance
                </div>
                <div className="text-xl font-semibold leading-7 text-gray-900">
                  100
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col justify-end px-6 pt-9 pb-3 bg-white w-[900px] ml-32 rounded-2xl shadow-md max-md:px-5">
      
     <StaffBarChart/>
        
    </div>
    <div className=" h-20"></div>
</div>
  )
}

export default Staff_Mangement;
