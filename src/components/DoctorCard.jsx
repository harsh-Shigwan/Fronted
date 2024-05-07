import React, { useState, useEffect } from "react";
import axios from "axios";


const DoctorCard = ({doctor}) => {
  return (
    <div className="w-[1090px]   flex flex-row items-start justify-start gap-[30px]   text-xs text-text-body-muted">
    <div className="w-[255px] top-0px] relative rounded-2xl shadow-[0px_3px_8px_rgba(50,_50,_71,_0.05),_0px_0px_1px_rgba(12,_26,_75,_0.24)] h-[202px] overflow-hidden shrink-0">
      <div className="flex flex-col px-4 pt-3 pb-12 bg-white rounded-2xl shadow-md max-w-[255px]">
        <div className="flex gap-5 justify-between w-full">
          <div className="flex gap-3.5 justify-between text-xs font-semibold leading-3 text-slate-500">
            <img
              loading="lazy"
              srcSet=""
              className="w-10 bg-indigo-500 rounded-full aspect-square"
            />
            <div className="my-auto">{doctor.dob}</div>
          </div>
         
        </div>
        <div className="mt-3  text-slate-600 font-medium whitespace-nowrap">
        Qualification:  {doctor.education_qualification}
       </div>
        <div className="mt-4  text-xl font-medium leading-5 text-black whitespace-nowrap">
        specialty: {doctor.specialty}
        </div>
        <div className="mt-6 text-xs font-semibold text-blue-500">
          {doctor.name}
        </div>
      </div>
    </div>
    </div>
  )
}

export default DoctorCard