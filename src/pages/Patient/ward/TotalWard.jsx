import axios from "axios";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import All_Wards from "./All_Wards";
import Breadcrumb from "../../../components/Breadcrumb";
import download from "../../../Data/download.png";
import search from "../../../Data/search.png";
import generatePDF from "react-to-pdf";
import baseURL from "../../../assets/API_URL";
const TotalWard = () => {
  const [formData, setFormData] = useState({
    name: "",
    total_beds: "",
    daily_charge: "",
  });
  const token = JSON.parse(localStorage.getItem("Token"));
  const navigate = useNavigate();
  const handle = () => {
    navigate("/Patient/Patient_Details");
  };
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data Submitted:", formData);
    axios
      .post(`${baseURL}/ipd/wards/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log("API Response:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("API Error:", error);
        console.log("Error response data:", error.response?.data);
      });
  };
  const targetRef = useRef();
  const [searh, setSearch] = useState("");
  return (
    <div>
      <Breadcrumb></Breadcrumb>
      <div className="w-[1110px] relative bg-theme-white-default  h-20 overflow-hidden shrink-0">
        <div className="absolute top-[0px] left-[0px] w-[1110px] flex flex-col items-start justify-start">
          <div className="self-stretch relative h-[60px] overflow-hidden shrink-0">
            <div className="absolute w-full top-[60px] right-[0px] left-[0px] bg-gray-200 box-border h-0 border-t-[1px] border-solid border-border-light" />
            <div className="absolute top-[18px] left-[22px] text-[20px] text-slate-700 leading-[24px] font-medium">
              Add Ward
            </div>
          </div>
        </div>
      </div>
      <fieldset>
        <form
          onSubmit={handleSubmit}
          className="m-0 w-[1110px] bg-theme-white-default overflow-hidden flex flex-col  py-6 pr-[22px] pl-[26px] box-border gap-[30px] mt-5"
        >
          {/*input field */}
          <div className="flex flex-col px-7 mt-6 max-md:px-5 max-md:max-w-full">
            <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
              <div className="flex mt-1 flex-col flex-1 self-start">
                <div className=" text-sm text-slate-600 font-medium">
                  {" "}
                  Ward Name
                </div>
                <input
                  className="flex gap-5 justify-between p-4 mt-2 text-base leading-4 text-gray-500 rounded-md bg-slate-100"
                  type="text"
                  placeholder="Enter Ward Name"
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                ></input>
              </div>

              <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
                <div className="text-sm text-slate-600 font-medium max-md:max-w-full">
                  Total Beds
                </div>
                <input
                  className="justify-center items-start py-4 pr-16 pl-4 mt-3 text-base leading-4 text-gray-500 whitespace-nowrap rounded-md bg-slate-100 max-md:pr-5 max-md:max-w-full"
                  type="text"
                  placeholder="Enter Number of beds"
                  value={formData.total_beds}
                  onChange={handleChange}
                  name="total_beds"
                ></input>
              </div>
              <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
                <div className="text-sm text-slate-600 font-medium max-md:max-w-full">
                  Daily Charges
                </div>
                <input
                  className="justify-center items-start py-4 pr-16 pl-4 mt-3 text-base leading-4 text-gray-500 whitespace-nowrap rounded-md bg-slate-100 max-md:pr-5 max-md:max-w-full"
                  type="text"
                  placeholder="Enter The daily charge of ward"
                  value={formData.daily_charge}
                  onChange={handleChange}
                  name="daily_charge"
                ></input>
              </div>
            </div>
          </div>

          <div className="flex items-stretch justify-between gap-5 mt-8 self-end">
            <button
              onClick={handle}
              className="text-blue-700 text-base font-semibold leading-4 items-stretch border grow justify-center px-8 py-4 rounded-lg border-solid border-blue-700 max-md:px-5"
            >
              Cancel
            </button>
            <button className="text-white text-base font-semibold leading-4 items-stretch border border-[color:var(--Theme-Primary-Default,#4C6FFF)] bg-blue-700 grow justify-center px-7 py-4 rounded-lg border-solid max-md:px-5">
              Submit
            </button>
          </div>
        </form>
      </fieldset>
      <All_Wards></All_Wards>
    </div>
  );
};

export default TotalWard;