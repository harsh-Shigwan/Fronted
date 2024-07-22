import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseURL from "../../assets/API_URL";
import axios from "axios";
import generatePDF from "react-to-pdf";
import download from "../../Data/download.svg";
import Breadcrumb from "../../components/Breadcrumb";
import HospitalHeader from "../../components/Billing/HospitalHeader";
const PatientPdf = () => {
  const { pk } = useParams();
  const targetRef = useRef();
  const navigate = useNavigate();
  const [patient, setPatient] = useState([]);
  const PatientAPI = `${baseURL}/api/patient/api/patients/${pk}/`;
  const token = JSON.parse(localStorage.getItem("Token"));
  const getPatient = async () => {
    try {
      const response = await axios.get(PatientAPI, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setPatient(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatient();
  }, []);

  const handle = () => {
    navigate("/Patient/Patient_Details");
  };
  return (
    <div className=" w-[1100px]">
      <Breadcrumb></Breadcrumb>
      <div className=" mt-5 ml-32">
        <div
          className="flex flex-col pt-5 pb-10 bg-white max-w-[869px]"
          ref={targetRef}
        >
          <div className="flex flex-col px-9 w-full text-black max-md:px-5 max-md:max-w-full">
            <HospitalHeader></HospitalHeader>
            <div className="self-center mt-1.5 text-base font-bold tracking-wider">
              Patient Details
            </div>
          </div>
          <div className="flex flex-col px-9 mt-2 w-full max-md:px-5 max-md:max-w-full">
            <img
              loading="lazy"
              src=""
              className="w-full border border-black border-solid stroke-[1px] stroke-black max-md:max-w-full"
            />
            <div className="flex gap-5 mt-5 text-sm font-medium text-black max-md:flex-wrap max-md:max-w-full">
              <div className="flex flex-col flex-1">
                <div className="flex gap-5 justify-between py-1 pr-2.5 w-full">
                  <div className="flex gap-5 py-0.5 mt-2.5">
                    <div className="flex-auto ml-4 ">Patient ID </div>
                    <div className=" ml-[55px] font-bold">:</div>
                    <div className="  ml-4"> {patient.PatientID}</div>
                  </div>
                </div>
                <div className="flex gap-5 justify-between py-0.5 mt-2.5">
                  <div className="flex gap-5">
                    <div className="flex-auto ml-4 ">Patient Name </div>
                    <div className=" ml-8 font-bold">:</div>
                    <div className="  ml-4"> {patient.fullname}</div>
                  </div>
                </div>
                <div className="flex gap-5 justify-between self-start py-1 mt-2.5">
                  <div className="flex gap-5">
                    <div className="flex-auto ml-4 ">Contact No. </div>
                    <div className=" ml-11 font-bold">:</div>
                    <div className="  ml-4">{patient.phone}</div>
                  </div>
                </div>
                <div className="flex gap-5 justify-between py-1 mt-2.5 whitespace-nowrap">
                  <div className="flex gap-5">
                    <div className="flex-auto ml-4 ">Male </div>
                    <div className=" ml-[89px] font-bold">:</div>
                    <div className="  ml-4"> {patient.Gender}</div>
                  </div>
                </div>
                <div className="flex gap-5 justify-between pt-2 mt-2.5">
                  <div className="flex gap-5">
                    <div className="flex-auto ml-4 ">Blood Group </div>
                    <div className=" ml-[40px] font-bold">:</div>
                    <div className="  ml-4"> {patient.blood}</div>
                  </div>
                </div>
                <div className="flex gap-5 justify-between self-start py-1 mt-2.5">
                  <div className="flex gap-5">
                    <div className="flex-auto ml-4 ">Date of Birth </div>
                    <div className=" ml-10 font-bold">:</div>
                    <div className="  ml-4"> {patient.DOB}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-1 pr-1.5 mt-2.5">
                <div className="flex gap-4 py-0.5">
                  <div className="flex gap-5">
                    <div className="flex-auto ml-4 ">Registration Date </div>
                    <div className=" ml-12 font-bold">:</div>
                    <div className="  ml-4"> {patient.Register_Date}</div>
                  </div>
                </div>
                <div className="flex gap-5 pt-2 mt-2.5">
                  <div className="flex gap-5">
                    <div className="flex-auto ml-4 ">Referred By </div>
                    <div className=" ml-[85px] font-bold">:</div>
                    <div className="  ml-4"> {patient.referred}</div>
                  </div>
                </div>
                <div className="flex gap-5 justify-between py-0.5 mt-2.5">
                  <div className="flex gap-5">
                    <div className="flex-auto ml-4 ">Allergy </div>
                    <div className=" ml-[114px] font-bold">:</div>
                    <div className="  ml-4"> {patient.allergy}</div>
                  </div>
                </div>
                <div className="flex gap-5 justify-between py-0.5 mt-2.5 whitespace-nowrap">
                  <div className="flex gap-5">
                    <div className="flex-auto ml-4 ">City </div>
                    <div className=" ml-[134px] font-bold">:</div>
                    <div className="  ml-4"> {patient.city}</div>
                  </div>
                </div>
                <div className="flex gap-5 justify-between py-0.5 mt-2.5 whitespace-nowrap">
                  <div className="flex gap-5">
                    <div className="flex-auto ml-4 ">Pincode </div>
                    <div className=" ml-[108px] font-bold">:</div>
                    <div className="  ml-4"> {patient.PinCode}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" w-full bg-slate-500 flex overflow-hidden relative flex-col justify-center mt-14 border border-black border-solid min-h-[1px] stroke-[1px] stroke-black max-md:mt-10 max-md:max-w-full"></div>
            <div className="self-center mt-1.5 text-base font-bold tracking-wider text-black">
              Emergency Contact Details
            </div>
          </div>
          <div className="flex flex-col items-start px-9 mt-2 w-full max-md:px-5 max-md:max-w-full">
            <div className="flex overflow-hidden relative flex-col justify-center self-stretch border border-black border-solid min-h-[1px] stroke-[1px] stroke-black max-md:max-w-full">
              <img
                loading="lazy"
                src=""
                className="object-cover absolute inset-0 size-full"
              />
            </div>
            <div className="flex gap-5  justify-between py-0.5 mt-5 max-w-full text-sm font-medium text-black w-[526px]">
              <div className="flex gap-5">
                <div className="flex-auto ml-4 ">Name </div>
                <div className=" ml-[88px] font-bold">:</div>
                <div className="  ml-4"> {patient.Relative_Name}</div>
              </div>
            </div>
            <div className="flex gap-5 justify-between py-1 mt-2.5 max-w-full text-sm font-medium text-black w-[526px]">
              <div className="flex gap-5">
                <div className="flex-auto ml-4 ">Contact </div>
                <div className=" ml-[78px] font-bold">:</div>
                <div className="  ml-4"> {patient.phone_no}</div>
              </div>
            </div>

            <div className="flex gap-5 justify-between py-0.5 mt-2.5 max-w-full text-sm font-medium text-black whitespace-nowrap w-[526px]">
              <div className="flex gap-5">
                <div className="flex-auto ml-4 ">RelationShip </div>
                <div className=" ml-[48px] font-bold">:</div>
                <div className="  ml-4"> {patient.Relationship}</div>
              </div>
            </div>
            <img
              loading="lazy"
              src=""
              className="self-stretch mt-14 w-full border border-black border-solid stroke-[1px] stroke-black max-md:mt-10 max-md:max-w-full"
            />
            <div className="self-center mt-1.5 text-base font-bold tracking-wider text-black">
              Insurance Details
            </div>
          </div>
          <div className="flex flex-col items-start px-9 mt-2 w-full text-sm font-medium text-black max-md:px-5 max-md:max-w-full">
            <img
              loading="lazy"
              src=""
              className="self-stretch w-full border border-black border-solid stroke-[1px] stroke-black max-md:max-w-full"
            />
            <div className="flex gap-5 py-0.5 mt-5 w-[500px]">
              <div className="flex gap-5">
                <div className="flex-auto ml-4 ">Insurance Name </div>
                <div className=" ml-[30px] font-bold">:</div>
                <div className="  ml-4"> {patient.Insurance_name}</div>
              </div>
            </div>
            <div className="flex gap-5 py-1 mt-2.5">
              <div className="flex gap-5">
                <div className="flex-auto ml-4 ">Insurance Number </div>
                <div className=" ml-[16px] font-bold">:</div>
                <div className="  ml-4"> {patient.membernum}</div>
              </div>
            </div>
            <div className="flex gap-5 py-1 mt-2.5 max-w-full w-[541px]">
              <div className="flex gap-5">
                <div className="flex-auto ml-4 ">Provider </div>
                <div className=" ml-[80px] font-bold">:</div>
                <div className="  ml-4"> {patient.Insurance_Provider}</div>
              </div>
            </div>
            <div className="flex gap-5 py-1.5 mt-2.5 max-w-full w-[547px]">
              <div className="flex gap-5">
                <div className="flex-auto ml-4 ">Card Number </div>
                <div className=" ml-[48px] font-bold">:</div>
                <div className="  ml-4"> {patient.card_num}</div>
              </div>
            </div>
            <div className="flex gap-5 py-0.5 mt-2.5 max-w-full w-[647px]">
              <div className="flex gap-5">
                <div className="flex-auto ml-4 ">Facility Code </div>
                <div className=" ml-[55px] font-bold">:</div>
                <div className="  ml-4"> {patient.facility_code}</div>
              </div>
            </div>
            <img
              loading="lazy"
              src=""
              className="self-stretch mt-14 w-full border border-black border-solid stroke-[1px] stroke-black max-md:mt-10 max-md:max-w-full"
            />
            <div className="self-center mt-2.5 text-base font-bold tracking-wider">
              Deposit Details
            </div>
          </div>
          <div className="flex flex-col px-9 mt-2 w-full text-sm font-medium text-black max-md:px-5 max-md:max-w-full">
            <img
              loading="lazy"
              src=""
              className="w-full border border-black border-solid stroke-[1px] stroke-black max-md:max-w-full"
            />
            <div className="flex gap-5 self-start py-0.5 mt-5">
              <div className="flex gap-5">
                <div className="flex-auto ml-4 ">Deposit Amount </div>
                <div className=" ml-[35px] font-bold">:</div>
                <div className="  ml-4"> {patient.initial_balance}</div>
              </div>
            </div>
            <div className="flex gap-5 self-start py-0.5 mt-2.5">
              <div className="flex gap-5">
                <div className="flex-auto ml-4 ">payment Mode </div>
                <div className=" ml-[43px] font-bold">:</div>
                <div className="  ml-4"> {patient.PAYMENT_MODE}</div>
              </div>
            </div>
            <div className="self-center mt-8 text-base font-extralight leading-7 text-center max-md:mt-10">
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
              filename: "Patient Information.pdf",
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

export default PatientPdf;
