import React, { useState, useRef, useEffect } from "react";
import Plus from "../../Data/Plus.png";
import download from "../../Data/download.png";
import AttendanceGrid from '../../components/HorizontalGrid/AttendanceGrid';
import { useNavigate } from "react-router-dom";
const  Staff_Form = () => {
const navigate = useNavigate();
const handle = () => {
  navigate("/Add_Staff");
};

const navigate1 = useNavigate();
const handle1=()=>{
  navigate1("/shift");
}
return(
 <div>

 <div className="self-stretch relative h-[60px] overflow-hidden shrink-0 bg-theme-white-default bottom-3  rounded-lg mt-12">
 <div className="absolute w-full top-[60px] right-[0px] left-[0px] bg-gray-200 box-border h-0 border-t-[1px] border-solid border-border-light" />
 <div className="absolute top-[18px] left-[22px] text-[20px] text-slate-600 leading-[24px] font-medium">
 Attendance
 </div>


 <button
   className="absolute top-[11px] left-[937px] rounded-md bg-theme-primary-dark w-[156px] flex flex-col items-start justify-start py-2.5 px-5  h-10 box-border text-theme-white-default"
   onClick={handle}
 >
   <div className="w-24 my-0 mx-[!important] absolute top-[10px] left-[20px] flex flex-row items-center justify-start gap-[8px] z-[0]">
     <img
       className="w-5 relative h-5 object-cover"
       alt=""
       src={Plus}
     />
     <div className="relative font-semibold">Add Staff</div>
   </div>
 </button>
 <button
   className="absolute top-[11px] left-[765px] rounded-md  h-10 bg-theme-white-default box-border w-[156px] flex flex-col items-start justify-start py-2.5 px-5 text-theme-primary-dark border-[1px] border-solid border-theme-primary-dark"
onClick={handle1}
 >
   <div className="w-24 my-0 mx-[!important] absolute top-[calc(50%_-_8px)] left-[calc(50%_-_48px)] flex flex-row items-center justify-start gap-[8px] z-[0]">
     <img
       className="w-4 relative h-4 overflow-hidden shrink-0"
       alt=""
       src={download}
     />
     <div className="relative font-semibold">Shifts</div>
   </div>
 </button>
</div>
 <div >

 
 
 <div className=' mt-0'>
 <AttendanceGrid />
 </div></div>

  
   
    
    </div>

  )
}

export default  Staff_Form;