import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseURL from "../../assets/API_URL";
import Breadcrumb from "../../components/Breadcrumb";
import generatePDF from "react-to-pdf";
import download from "../../Data/download.svg";
import HospitalHeader from "../../components/Billing/HospitalHeader";

const DoctorPdf = () => {
  const { pk } = useParams();
  const targetRef = useRef();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({});
  const DoctorAPI = `${baseURL}/doctor/api/doctors/${pk}/`;
  const token = JSON.parse(localStorage.getItem("Token"));

  const FetchData = async () => {
    try {
      const response = await axios.get(DoctorAPI, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setDoctor(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        console.log(error.response.data);
      }
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  const handle=()=>{
    navigate("/Doctor/Details");
  }

  return (
    <div className=" w-[1100px]">
      <Breadcrumb></Breadcrumb>
      <div className=" mt-5 ml-32">
        <div className="flex flex-col pt-5 pb-10 bg-white max-w-[880px]" ref={targetRef}>
          <div className="flex flex-col px-9 w-full text-black max-md:px-5 max-md:max-w-full">
            <div>
              <HospitalHeader></HospitalHeader>
            </div>

            <div className="self-center mt-3.5 text-base font-bold tracking-wider">
              Doctor Details
            </div>
          </div>
          <div className="flex flex-col items-center px-9 mt-4 w-full max-md:pl-5 max-md:max-w-full">
            <img
              loading="lazy"
              src=""
              className="w-full border border-black border-solid max-w-[793px] stroke-[1px] stroke-black max-md:max-w-full"
            />
            <div className="self-stretch mt-6 max-md:max-w-full">
              <div className="flex gap-8 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-[66%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col text-sm font-medium text-black max-md:mt-10">
                    <div className="flex gap-5 py-1 pr-20 w-full max-md:pr-5">
                      <div className="flex gap-5 py-0.5 mt-2.5">
                        <div className="flex-auto ml-4 ">Doctor ID </div>
                        <div className=" ml-[31px] font-bold">:</div>
                        <div className="  ml-4"> {doctor.DoctorID}</div>
                      </div>
                    </div>
                    <div className="flex gap-5 py-0.5 mt-2.5">
                      <div className="flex gap-5 py-0.5 ">
                        <div className="flex-auto ml-4 ">Name </div>
                        <div className=" ml-[55px] font-bold">:</div>
                        <div className="  ml-4">Dr. {doctor.name}</div>
                      </div>
                    </div>
                    <div className="flex gap-5 py-0.5 mt-3 w-[425px]">
                      <div className="flex gap-5 py-0.5 ">
                        <div className="flex-auto ml-4 ">Address </div>
                        <div className=" ml-[42px] font-bold">:</div>
                        <div className="  ml-4"> {doctor.Address}</div>
                      </div>
                    </div><div className="flex gap-5 py-0.5 mt-3 w-[425px]">
                    <div className="flex gap-5 py-0.5 ">
                      <div className="flex-auto ml-4 ">Email </div>
                      <div className=" ml-[58px] font-bold">:</div>
                      <div className="  ml-4"> {doctor.email}</div>
                    </div>
                  </div>
                  </div>
                </div>
                <div className="flex flex-col ml-0 w-[34%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow text-sm font-medium text-black whitespace-nowrap max-md:mt-10">
                    <div className="flex gap-0 py-0.5 mt-3 ">
                      <div className="flex-auto ml-0 ">Contact </div>
                      <div className=" mr-[10px] font-bold">:</div>
                      <div className="  ml-4"> {doctor.phone_number}</div>
                    </div>

                  <div className=" absolute flex gap-5 py-0.5 mt-[83px] ">
                  <div className="flex-auto ml-0">Gender </div>
                  <div className=" ml-[100px] font-bold">:</div>
                  <div className="  ml-4"> {doctor.Gender}</div>
                </div>
                <div className="flex gap-5 py-0.5 mt-3 ">
                <div className="flex-auto ml-0">Date of Birth </div>
                <div className=" ml-[65px] font-bold">:</div>
                <div className="  ml-3"> {doctor.dob}</div>
              </div>
                  </div>
                </div>
              </div>
            </div>
            <img
              loading="lazy"
              src=""
              className="mt-24 w-full border border-black border-solid max-w-[793px] stroke-[1px] stroke-black max-md:mt-10 max-md:max-w-full"
            />
            <div className="mt-3.5 text-base font-bold tracking-wider text-black">
              Qualification Details
            </div>
          </div>
          <div className="flex flex-col items-start px-9 mt-3.5 w-full text-sm font-medium text-black max-md:px-5 max-md:max-w-full">
            <img
              loading="lazy"
              src=""
              className="self-stretch w-full border border-black border-solid stroke-[1px] stroke-black max-md:max-w-full"
            />
            <div className="flex gap-5 justify-between mt-4 max-w-full whitespace-nowrap w-[154px]">
            <div className="flex gap-5 py-0.5 ">
            <div className="flex-auto ml-4 ">Experience </div>
            <div className=" ml-[133px] font-bold">:</div>
            <div className="  ml-4"> {doctor.experince}</div>
          </div>
            </div>
            <div className="flex gap-5 mt-4">
            <div className="flex gap-5 py-0.5 ">
            <div className="flex-auto ml-4 ">Education Qualification </div>
            <div className=" ml-[55px] font-bold">:</div>
            <div className="  ml-4"> {doctor.education_qualification}</div>
          </div>
            </div>
            <div className="flex gap-5 mt-4">
            <div className="flex gap-5 py-0.5 ">
            <div className="flex-auto ml-4 ">Working Details  </div>
            <div className=" ml-[102px] font-bold">:</div>
            <div className="  ml-4"> {doctor.working_details}</div>
          </div>
            </div>
            <div className="flex gap-5 justify-between mt-4 w-48 max-w-full whitespace-nowrap">
            <div className="flex gap-5 py-0.5 ">
            <div className="flex-auto ml-4 "> Specialty  </div>
            <div className=" ml-[147px] font-bold">:</div>
            <div className="  ml-4"> {doctor.specialty}</div>
          </div>
            </div>
            <div className="self-center text-base font-extralight leading-7 text-center mt-[380px] max-md:mt-10">
              Copyright © 2024 Created by CareChainAI
            </div>
          </div>
        </div>
        <button
          className="top-[138px] ml-10 rounded-md items-center justify-start py-2 px-4 border-[1px] border-solid border-royalblue w-[116px] mt-3 gap-[6px] leading-[10px] left-[850px] absolute font-medium bg-btn h-10 text-white"
          type="submit"
          onClick={handle}
        >
          Cancel
        </button>
        <button
          className="absolute top-[150px] left-[1020px] rounded-md  h-10 bg-theme-white-default box-border w-[156px] flex flex-col items-start justify-start py-2.5 px-5 text-theme-primary-dark border-[1px] border-solid border-theme-primary-dark"
          onClick={() =>
            generatePDF(targetRef, {
              filename: "Doctor Information.pdf",
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
    </div>
  );
};

export default DoctorPdf;
