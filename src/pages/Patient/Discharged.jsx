import React, { useEffect, useRef, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../components/Breadcrumb";
import download from "../../Data/download.png";
import search from "../../Data/search.png";
const baseURL = "http://127.0.0.1:8000/";

const Discharged = () => {
  
  let { admission_id } = useParams();
  const [discharge, setDischarge] = useState({
    discharge_date: "",
    discharge_summary: "",
  });
  const targetRef = useRef();
  const [searh, setSearch] = useState("");
const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data Submitted:", discharge); 
    const token = JSON.parse(localStorage.getItem("Token"));
    const postData = {
      admission: parseInt(admission_id), 
      discharge_date: discharge.discharge_date, 
      discharge_summary: discharge.summary,
    };

    axios
      .post(`${baseURL}/ipd/ipd-discharges/`, postData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        console.log("Discharge data sent:", res.data);
        navigate("/Patient/IPD");
      })
      .catch((error) => {
        console.error("Error sending discharge data:", error);
        console.error("API Error:", error);
        console.log("Error response data:", error.response?.data);
        alert("not discharge some error occured");
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDischarge((prevDischarge) => ({
      ...prevDischarge,
      [name]: value,
    }));
  };

  return (
  
    <div>
  
      <div className="w-[1110px] relative bg-theme-white-default   h-24 overflow-hidden shrink-0">
        <div className="absolute top-[0px] left-[0px] w-[1110px]   flex flex-col items-start justify-start">
          <div className="self-stretch relative h-[70px]  overflow-hidden shrink-0">
           
            <div className="absolute top-[18px] left-[22px] mt-5 text-[30px] text-slate-700 leading-[24px] font-medium">
              Discharged Patient
            </div>
          </div>
        </div>
      </div>
      <fieldset>
        <form
          onSubmit={handleSubmit}
          className="m-0 w-[1110px] bg-theme-white-default overflow-hidden flex flex-col  py-6 pr-[22px] pl-[26px] box-border gap-[30px] mt-5"
        >
     

          <div className=" ">
            <div className="flex mt-0 flex-col flex-1 self-start">
              <div className=" text-slate-600 text-sm font-medium">
                {" "}
                Discharged Summary
              </div>
              <textarea
                className="flex gap-5 justify-between h-36 w-[800px] p-4 mt-5 text-base leading-4 text-gray-700 rounded-md bg-slate-100"
                placeholder=" Discharged Summary"
                id="summary"
                name="summary"
                value={discharge.summary}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="flex flex-col flex-1 py-0.5  mt-8 w-[300px]">
              <div className="text-sm text-slate-600 font-medium max-md:max-w-full">
                Discharge Date
              </div>
              <input
                className="justify-center items-start py-4 pr-2 pl-4 mt-5 text-base leading-4 text-gray-500 whitespace-nowrap rounded-md bg-slate-100 max-md:pr-5 max-md:max-w-full"
                placeholder="Enter dicharge date"
                type="date"
                id="discharge_date"
                name="discharge_date"
                value={discharge.discharge_date}
                onChange={handleChange}
              ></input>
            </div>
          </div>

          <div className="flex items-stretch justify-between gap-5  self-end">
            <div className="text-blue-700 text-base font-semibold leading-4 items-stretch border grow justify-center px-8 py-4 rounded-lg border-solid border-blue-700 max-md:px-5">
              Cancel
            </div>
            <button
              className="text-white text-base font-semibold leading-4 items-stretch border border-[color:var(--Theme-Primary-Default,#4C6FFF)] bg-blue-700 grow justify-center px-7 py-4 rounded-lg border-solid max-md:px-5"
              type="submit" 
            >
              Submit
            </button>
          </div>
        </form>
      </fieldset>
      
    </div>
  );
};

export default Discharged;
