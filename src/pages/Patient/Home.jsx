import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientGraph from "../PatientGraph";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import sourceData from "../../Data/sourceData.json";
import Bars from "../../components/Charts/Bars";
import month from "../../Data/month.json";
import DoctorCard from "../../components/DoctorCard";
import baseURL from "../../assests/API_URL";
import DateChart from "../../components/Graph/DateChart";

const Home = () => {
   
  defaults.responsive = true;
  defaults.plugins.title.display = true;
    defaults.plugins.title.align = "center";
  defaults.plugins.title.font.size = 15;
   defaults.plugins.title.color = "black";
  const token =  JSON.parse(localStorage.getItem("Token"))
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalDoc, setTotalDoc] = useState(0);
  const [totalIPD, setTotalIPD] = useState(0);
  const [ medi , setmedi] =useState(0);
  const [ totalBeds , setTotalBeds] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [ admissionData , setAdmissionData] = useState([])
  const [ ipdDate ,  setIpdDate] = useState([])
  const [ opdDate , setOpdDate] = useState([])
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${baseURL}/doctor/api/doctors/`,{
            headers: {
             Authorization: `Token ${token}`,
            },
          }
        );
        setDoctors( response.data);
        console.log("Doctors data:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const admissionResponse = await axios.get(`${baseURL}/api/patient/api/patients/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const admissionDate = admissionResponse.data.map(patient => ({
          Register_Date: patient.Register_Date,
        }));
        setAdmissionData(admissionDate);
        console.log("Admission date data:", admissionDate);
  
      
        const registrationResponse = await axios.get(`${baseURL}/api/ipd/ipd-registrations/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const registrationData = registrationResponse.data.map(ipdPatient => ({
          admission_date: ipdPatient.admission_date,
        }));
        setIpdDate(registrationData);
        console.log("registrationDate data:", registrationData);
  
        
        const opdpatient = await axios.get(`${baseURL}/api/opd/api/opd-register/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const opdData = opdpatient.data.map(opdPatient => ({
          visit_date: opdPatient.visit_date,
        }));
        setOpdDate(opdData);
        console.log("opdDate data:", opdData);
  
      } catch (error) {
        console.error('Error fetching data:', error);
        console.log("Error response data:", error.response?.data);
        alert('Error fetching data');
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/patient/api/patients/`
          , {
            headers: {
              Authorization: `Token ${token}`,
            },
          });

        setTotalPatients(response.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchdoctor = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/doctor/api/doctors/`
          , {
            headers: {
              Authorization: `Token ${token}`,
            },
          });

        setTotalDoc(response.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchIPD = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/ipd/ipd-registrations/`
          , {
            headers: {
              Authorization: `Token ${token}`,
            },
          });

        setTotalIPD(response.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchMedi = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/inventory/api/medicines/`
          , {
            headers: {
              Authorization: `Token ${token} `,
            },
          });

        setmedi(response.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchTotalBeds = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/ipd/wards/`,  {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
       
          setTotalBeds(response.data);
       
      } catch (error) {
        console.error('Error fetching total beds:', error);
      }
    };
    fetchTotalBeds();
    fetchMedi();
    fetchIPD();
    fetchdoctor();
    fetchData();
  }, []);

  
  const noti=()=>{
    alert("Coming Soon...")
  }
  return (
    <div>
      <div className="w-[1100px] relative bg-whitesmoke h-[870px] flex flex-col items-start justify-start p-[30px] box-border gap-[30px] text-left text-sm text-black font-text-small">
        <div className="flex w-[1090px] gap-5 justify-between whitespace-nowrap max-md:flex-wrap">
          <div className="flex flex-col flex-1 justify-center p-6 bg-white rounded-2xl shadow-md max-md:px-5">
            <div className="flex gap-4 justify-between">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/99202057085f6f91af2056bc6d19d1a40ad9473cdb467d174061ab4e51150410?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                className="aspect-square w-[46px]"
              />
              <div className="flex flex-col flex-1 self-start">
                <div className="text-sm font-medium text-slate-500">
                  Patients on-board
                </div>
                <div className="text-xl font-semibold leading-7 text-gray-900">
                  {totalPatients}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-center p-6 bg-white rounded-2xl shadow-md max-md:px-5">
            <div className="flex gap-4 justify-between">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2b0d4a25ded797bf0cd0de5ce2cc280a1b3050c300deb67e46af3f5e3179fa1c?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                className="aspect-square w-[46px]"
              />
              <div className="flex flex-col flex-1 self-start">
                <div className="text-sm font-medium text-slate-500">
                  Doctors on-board
                </div>
                <div className="text-xl font-semibold leading-7 text-gray-900">
                  {totalDoc}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-center p-6 bg-white rounded-2xl shadow-md max-md:px-5">
            <div className="flex gap-4 justify-between">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b7aadeb46d60ef7147ca9e984f588045ad1cb3b24949c7200303f1adf7875caa?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                className="aspect-square w-[46px]"
              />
              <div className="flex flex-col flex-1 self-start">
                <div className="text-sm font-medium text-slate-500">
                  IPD Patient on-board
                </div>
                <div className="text-xl font-semibold leading-7 text-gray-900">
                  {totalIPD}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-center p-6 bg-white rounded-2xl shadow-md max-md:px-5">
            <div className="flex gap-4 justify-between">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ecbfb9469c216331a1f2af47ee338c1c0da4d53c207edb23ea2e32cd0cca7df4?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                className="aspect-square w-[46px]"
              />
              <div className="flex flex-col flex-1 self-start">
                <div className="text-sm font-medium text-slate-500">
                  Medicine Stocks
                </div>
                <div className="text-xl font-semibold leading-7 text-gray-900">
                 {medi}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch relative h-[402px] text-table-body-strong">
          <div className="absolute top-[255.73px] left-[858.54px] w-[251.46px] h-[146.27px]">
            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] hidden">
              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_1px_rgba(12,26,_75,_0.24),_0px_3px_8px-1px_rgba(50,_50,_71,_0.05)]">
                <div className="absolute h-[calc(100%-_0.27px)] w-[calc(100%-_0.46px)] top-[0px] right-[0.46px] bottom-[0.27px] left-[0px] rounded-2xl bg-theme-white-default" />
              </div>
            </div>
            <div className="absolute bottom-[19.27px] left-[19.28px] leading-[23px] hidden">
              Follow your statistics.
            </div>
            <div className="absolute w-[calc(100%_-_35.46px)] top-[20px] right-[16.46px] left-[19px] h-[46px] hidden text-smi text-input-muted-placeholder">
              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-2xl">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-3xs bg-gray-200 [backdrop-filter:blur(10px)]" />
              </div>
              <div className="absolute top-[calc(50%_-_6px)] left-[16px] leading-[13px] font-medium inline-block w-[81px] h-[11px]">
                E-mail
              </div>
              <div className="absolute h-[calc(100%_-_10px)] top-[5px] right-[4px] bottom-[5px] flex flex-col items-start justify-start text-xs text-theme-white-default">
                <div className="flex flex-col items-start justify-start">
                  <div className="rounded-md bg-theme-primary-default flex flex-col items-center justify-start py-3 px-5">
                    <div className="flex flex-row items-center justify-start gap-[8px]">
                      <img
                        className="w-3 relative h-3 hidden"
                        alt=""
                        src="/icon.svg"
                      />
                      <div className="relative leading-[12px] font-semibold">
                        Subscribe
                      </div>
                      <img
                        className="w-2.5 relative h-2.5 hidden"
                        alt=""
                        src="/chevronright.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
       <DateChart dates={admissionData} dates1={ipdDate} dates2={opdDate}/>

          <div className="absolute top-[0px] left-[831.51px] w-[253.04px] h-[402px] flex flex-col items-start justify-start gap-[30px] text-smi text-input-muted-placeholder">
            <div className="self-stretch rounded-2xl bg-theme-white-default shadow-[0px_0px_1px_rgba(12,26,_75,_0.24),_0px_3px_8px-1px_rgba(50,_50,_71,_0.05)] flex flex-col items-start justify-start p-6 gap-[24px]">
              <div className="w-[162px] relative h-12">
                <div className="absolute h-[95.83%] w-[101.85%] top-[2.08%] right-[-2.17%] bottom-[2.08%] left-[0.31%] rounded-2xl hidden">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-3xs bg-gray-200 [backdrop-filter:blur(10px)]" />
                </div>
                <div className="absolute top-[calc(50%_-_6px)] left-[16.51px] leading-[13px] font-medium hidden w-[81px] h-[11px]">
                  E-mail
                </div>
                <div className="absolute h-full top-[0px] right-[0.51px] bottom-[0px] w-[161px] flex flex-col items-start justify-start text-sm text-theme-white-default">
                  <div className="w-[218px] flex flex-col items-start justify-start">
                    <button className="w-[207px] rounded-md bg-theme-primary-dark flex flex-col items-center justify-start py-4 px-6 box-border " onClick={noti}>
                      <div className="flex flex-row items-center justify-start gap-[10px]">
                        <div className="relative leading-[14px] font-semibold">
                          Notifications
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-[217px] relative text-sm leading-[23px] text-table-body-strong inline-block">
                Check updates, notifications etc
              </div>
            </div>
            <div className="self-stretch rounded-2xl bg-theme-white-default shadow-[0px_0px_1px_rgba(12,26,_75,_0.24),_0px_3px_8px-1px_rgba(50,_50,_71,_0.05)] flex flex-col items-start justify-start p-0 gap-[24px] text-base text-theme-dark-default">
              <div className="dataCard revenueCard w-56">
                <Doughnut
                  style={{ maxWidth: "500px" }}
                  data={{
                    datasets: [
                      {
                        label: "",
                        data:totalBeds.map((data) => data.total_beds),
                        backgroundColor: [
                          "rgba(120, 149, 255, 1)",
                          "rgba(255, 146, 174, 1)",
                          "rgba(255, 239, 94, 1)",
                        ],
                        borderColor: [
                          "rgba(120, 149, 255, 1)",
                          "rgba(255, 146, 174, 1)",
                          "rgba(255, 239, 94, 1)",
                        ],
                      },
                    ],
                    labels: totalBeds.map(data => data.name),
                  }}
                  options={{
                    plugins: {
                      title: {
                        text: "Total Department Beds",
                      },
                    },
                    cutout: "60%", // Adjust the cutout value to minimize inner width
                    radius: "80%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch relative h-[12px] text-right text-theme-primary-default">
          <div className="absolute w-[20.91%] top-[70px]  mt-5 left-[10px] text-lg font-semibold text-text-heading-dark text-left inline-block">
            Available Doctors
      
        </div>
      </div>
        <div className="">
         
        <div className="flex   w-[1090px] flex-nowrap overflow-x-auto mt-24">
        {doctors.slice(0, 4).map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} />
        ))}
      </div>
         
        </div>
        <div>
    
        </div>
      </div>
    </div>
  );
};

export default Home;
