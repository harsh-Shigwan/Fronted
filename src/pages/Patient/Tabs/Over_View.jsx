import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import sourceData from "../../../Data/sourceData.json";
import month from "../../../Data/month.json";
import baseURL from "../../../assets/API_URL";
import { MdArrowBackIos } from "react-icons/md";
import { isBefore } from 'date-fns';
import axios from 'axios';
const Over_View = () => {
  const [myData, setMyData] = useState([]);
  const [ipdData, setIpdData] = useState([]);
  const [opdData, setOpdData] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [pastCount, setPastCount] = useState(1);
  const [futureCount, setFutureCount] = useState(1);
  const [todayCount, setTodayCount] = useState(1);
  const today = new Date();
  let { PatientID } = useParams();
  console.log(PatientID);
  const token = JSON.parse(localStorage.getItem("Token"));
  const navigate = useNavigate();
  const handle =()=>{
    navigate("/Patient/Patient_Details")
  }
  useEffect(() => {
    getPatient();
  }, [PatientID]);

  const getPatient = () => {
    fetch(`${baseURL}/api/patient/api/patients/`, {
      headers: {
      
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        const newPatient = data.find(
          (item) => item.PatientID === parseInt(PatientID)
        );
        setMyData(newPatient);
        
      })
      .catch((err) => console.log("Fetch error: ", err));
  };

  console.log(myData);

  useEffect(() => {
    axios.get(`${baseURL}/api/ipd/ipd-DischargeHistory` , {
      headers: {
        Authorization: `Token ${token}`,
      }
    })
      .then(response => {
        
        const filteredData = response.data.filter(item => {
          const dischargeDate = new Date(item.discharge_date);
          return item.patient === parseInt(PatientID) && isBefore(dischargeDate, today);
        });
        setIpdData(filteredData);
      })
      .catch(error => console.error('Error fetching IPD data:', error));
console.log("ipd",ipdData)
   
    axios.get(`${baseURL}/api/opd/api/opd-register/`,{
      headers: {
        Authorization: `Token ${token}`,
      }
    })
      .then(response => {
        
        const filteredData = response.data.filter(item => {
          const visitDate = new Date(item.visit_date);
          return item.patient_id === parseInt(PatientID) && isBefore(visitDate, today);
        });
        setOpdData(filteredData);
      })
      .catch(error => console.error('Error fetching OPD data:', error));
  }, [PatientID]);
console.log("opd",opdData)
  const ipdCount = ipdData.length;
  const opdCount = opdData.length;
  console.log(ipdCount, opdCount);


 
 
  const horizontalBarData = {
    labels: ["Department"],
    datasets: [
      {
        label: "IPD",
        data: [ipdCount],
        backgroundColor: "rgba(120, 149, 255, 1)",
        barThickness: 20,
        borderWidth: 0,
        borderRadius: 10,
        categoryPercentage: 0.8, // Adjusted for spacing
      },
      {
        label: "OPD",
        data: [opdCount],
        backgroundColor: "rgba(243, 221, 24, 1)",
        barThickness: 20,
        borderWidth: 0,
        borderRadius: 10,
        categoryPercentage: 0.8, 
      },
    ],
  };

  const horizontalBarOptions = {
    indexAxis: "y", 
    barPercentage: 0.7, 
    plugins: {
      title: {
        display: true,
        text: "Visit Type Count",
      },
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, 
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: true,
        },
      },
    },
  };

  useEffect(() => {
    const fetchAppointments = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/appointment/appointments/`,
              {
                headers: {
                  Authorization: `Token ${token}`,
                },
              }
            );
            const filteredAppointments = response.data.filter(appointment => appointment.patient === parseInt(PatientID));
            setAppointments(filteredAppointments);
            const today = new Date().toISOString().split('T')[0];
            console.log(today)
            let past = 0, future = 0, todayAppointments = 0;
            filteredAppointments.forEach(appointment => {
              if (appointment.date < today) {
                  past++;
              } else if (appointment.date > today) {
                  future++;
              } else if (appointment.date === today) {
                  todayAppointments++;
              }
          });
          setPastCount(past);
          setFutureCount(future);
          setTodayCount(todayAppointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    fetchAppointments();
}, [PatientID]);

const PieData = [pastCount, futureCount, todayCount];
const PieDataSum = parseFloat(pastCount)+parseFloat(futureCount)+parseFloat(todayCount);


  return (
    <div>
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="flex flex-col items-stretch w-[68%] max-md:w-full max-md:ml-0">
          <div className="flex grow flex-col items-stretch max-md:max-w-full max-md:mt-7">
            <div className="shadow bg-white flex flex-col py-7 rounded-2xl items-start max-md:max-w-full">
              <div className="flex flex-col ml-[45px] items-start pr-5 font-semibold whitespace-nowrap max-w-[666px]">
                <div className="flex gap-4">
                  <div className="grow text-[25px] leading-8 text-gray-900">
                    {myData.fullname}
                  </div>
                </div>
                <div className="flex gap-5 justify-between self-stretch mt-6 text-sm leading-5 text-slate-500 max-md:flex-wrap max-md:max-w-full">
                  <div className="flex gap-2.5 py-0.5 my-auto">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/27950ccdeee2ee0720019f912d84b3ddc8cdab6cc9970dc960b9f62f32075776?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                      className="my-auto w-4 aspect-square"
                    />
                    <div className="grow">{myData.PatientID}</div>
                  </div>
                  <div className="flex gap-2.5 justify-between py-1">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/aed63ab2b9a89ff7f1a20f9c62906e38a5ef5f599a5a9170d6fb7b99d6344c9b?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                      className="my-auto w-4 aspect-square"
                    />
                    <div className="grow">{myData.phone}</div>
                  </div>
                  <div className="flex gap-2.5 self-start py-0.5 leading-[164%] text-slate-500">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/896cc6b699d114f0ba19496ec002775bba916133049db5aa45f844894015e63c?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                      className="my-auto w-4 aspect-square"
                    />
                    <div className="grow">{myData.city}</div>
                  </div>
                  <div className="flex gap-2.5 justify-between py-1">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/af86e28d909b2f94f2ceb5df9755e14d48d47891c5cc22cc5c9e741ab526d099?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                      className="my-auto w-4 aspect-square"
                    />
                    <div>{myData.blood}</div>
                  </div>
                  <div className="flex gap-2.5 justify-between py-1">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/19600974ad972c21c177e32c9189fc827b865834b406b48e21baa68e234e060d?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                      className="my-auto w-4 aspect-square"
                    />
                    <div>{myData.Gender}</div>
                  </div>
                </div>
                <div className="flex gap-5 justify-between mt-3 text-sm leading-6 text-slate-500">
                  <div className="flex gap-2.5 justify-between py-0.5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e4c9d3db4fcd8ba093755bca4c0012660246269efefe2e4f192c09a7c1d2af3?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                      className="my-auto w-4 aspect-square"
                    />
                    <div className="grow">{myData.email}</div>
                  </div>
                  <div className="flex gap-2.5 justify-between py-0.5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/ddbfb0e7760dfbe73ad7da4d0182257c6e3b82719ba8b4a90ad3ed93118f7e37?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                      className="my-auto w-4 aspect-square"
                    />
                    <div className="grow">{myData.DOB}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col mt-[50px] ml-[25px] items-start text-sm leading-6 whitespace-nowrap max-w-[666px] text-slate-600">
                <div className="self-stretch ml-[20px] w-full text-[25px] font-semibold leading-7 text-zinc-700 max-md:max-w-full">
                  Allergy:
                </div>
                <div className="flex gap-2.5 justify-center px-5 mt-3">
                 
                  <div className="grow">{myData.allergy}</div>
                </div>
              </div>
              <div className="flex flex-col mt-[40px] ml-[25px] items-start text-sm leading-6 whitespace-nowrap max-w-[666px] text-slate-600">
                <div className="self-stretch ml-[20px] w-full text-[25px] font-semibold leading-7 text-zinc-700 max-md:max-w-full">
                  Insurance :
                </div>
                <div className="flex gap-2.5 justify-center px-5 mt-3">
                
                  <div className="grow">{myData.Insurance_Provider}</div>
                </div>
              </div>
              <div className="flex flex-col mt-[40px] ml-[30px] items-start text-sm leading-6 max-w-[666px] text-slate-600">
                <div className="self-stretch ml-[20px] w-full text-[25px] font-semibold leading-7 text-zinc-700 max-md:max-w-full">
                  Consultant Doctor :
                </div>
                <div className="flex gap-2.5 px-5 mt-3">
                
                  <div>{myData.referred}</div>
                </div>
              </div>

              <img
                className="w-[430px] bg-black relative max-h-full"
                alt=""
                src="/line-125.svg"
              />

              <div className="items-stretch flex gap-3 mr-4 mt-10 self-end max-md:mr-2.5">
                <button className="items-stretch bg-blue-500 flex flex-col justify-center px-5 py-3 rounded-md flex-1" onClick={handle}>
                  <div className="items-stretch flex justify-between gap-2">
                  <MdArrowBackIos />
                    <div className="text-white mt-1 text-xs font-semibold leading-3" onClick={handle}>
                      Back
                    </div>
                  </div>
                </button>
                
              </div>
            </div>
            <div className="mt-8 max-md:max-w-full">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                
             { /*  <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
                  <div className="items-stretch shadow-md bg-white flex w-full grow flex-col mx-auto pt-6 pb-11 px-6 rounded-2xl max-md:mt-7 max-md:px-5">
                    <div className="text-gray-900 text-base font-semibold leading-6">
                      Billing
                    </div>
                    <div className="items-stretch flex justify-between gap-2 mt-6">
                      <div className="items-stretch flex flex-col flex-1">
                        <div className="items-stretch flex justify-between gap-2">
                          <div className="flex w-2 shrink-0 h-2 flex-col rounded-full self-start" />
                          <div className="text-zinc-800 text-sm font-semibold leading-4 grow shrink basis-auto">
                            5
                          </div>
                        </div>
                        <div className="text-slate-500 text-xs whitespace-nowrap">
                          Completed Bills
                        </div>
                        <div className="items-stretch flex justify-between gap-2 mt-6">
                          <div className="flex w-2 shrink-0 h-2 flex-col my-auto rounded-full" />
                          <div className="text-zinc-800 text-sm font-semibold leading-4 grow shrink basis-auto">
                            1
                          </div>
                        </div>
                        <div className="text-slate-500 text-xs whitespace-nowrap">
                          Pending Bills
                        </div>
                        <div className="items-stretch flex justify-between gap-2 mt-6">
                          <div className="flex w-2 shrink-0 h-2 flex-col my-auto rounded-full" />
                          <div className="text-zinc-800 text-sm font-semibold leading-4 grow shrink basis-auto">
                            6
                          </div>
                        </div>
                        <div className="text-slate-500 text-xs whitespace-nowrap">
                          Total Bills
                        </div>
                      </div>
                      <div className="dataCard  revenueCard w-48 mb-0">
                        <Doughnut
                          className="mb-10"
                          style={{ maxWidth: "200px" }}
                          data={{
                            datasets: [
                              {
                                label: "Count",
                                data: sourceData.map((data) => data.value),
                                backgroundColor: [
                                  "rgba(43, 63, 229, 0.8)",
                                  "rgba(203 ,213 ,225 ,0.8)",
                                  "rgba(248, 113 ,113,0.8 )",
                                ],
                                borderColor: [
                                  "rgba(43, 63, 229, 0.8)",
                                  "rgba(203 ,213 ,225 ,0.8)",
                                  "rgba(253, 135, 135, 0.8)",
                                ],
                              },
                            ],
                          }}
                          options={{
                            cutout: "70%",
                            radius: "100%",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>*/}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-stretch w-[32%] ml-5 max-md:w-full max-md:ml-0">
          <div className="items-stretch flex grow flex-col max-md:mt-7">
            <div className="flex flex-col w-[350px] ml-0 max-md:w-full max-md:ml-0">
              <div className="items-stretch shadow-md bg-white flex w-full grow flex-col mx-auto pt-6 pb-11 px-6 rounded-2xl max-md:mt-7 max-md:px-5">
                <div className="text-gray-900 text-base font-semibold leading-6">
                  Visits
                </div>
                <div className="items-stretch flex justify-between gap-2 mt-6">
                  <div className="items-stretch flex flex-col flex-1">
                    <div className="items-stretch flex justify-between gap-2">
                      <div className="flex  bg-blue-500  w-[9px] h-[9px] shrink-0 mt-[4px]  flex-col rounded-full self-start" />
                      <div className="text-zinc-800 text-sm font-semibold leading-4 grow shrink basis-auto">
                      {futureCount}
                      </div>
                    </div>
                    <div className="text-slate-500 text-xs whitespace-nowrap">
                      Upcoming appointments
                    </div>
                    <div className="items-stretch flex justify-between gap-2 mt-6">
                      <div className="flex bg-red-400  w-[9px] h-[9px] shrink-0flex-col my-auto rounded-full" />
                      <div className="text-zinc-800 text-sm font-semibold leading-4 grow shrink basis-auto">
                      {pastCount}
                      </div>
                    </div>
                    <div className="text-slate-500 text-xs whitespace-nowrap">
                      Past appointments
                    </div>
                    <div className="items-stretch flex justify-between gap-2 mt-6">
                      <div className="flex bg-slate-300 w-[9px] shrink-0 h-[9px] flex-col my-auto rounded-full" />

                      <div className="text-zinc-800 text-sm font-semibold leading-4 grow shrink basis-auto">
                        {todayCount}
                      </div>
                    </div>
                    <div className="text-slate-500 text-xs whitespace-nowrap">
                    today's appointments
                    </div>
                  </div>
                  <div className="dataCard revenueCard  mb-10 w-48 " >
                  <Doughnut
                    style={{ maxWidth: "200px" }}
                    data={{
                      datasets: [
                        {
                          labels: ['mt', 'bb', 'cc'],
                          data: PieData,
                          backgroundColor: [
                            "rgba(253, 164, 174, 1 )",//pink
                            "rgba(43, 63, 229, 0.8)",//blue
                            "rgba(203 ,213 ,225)",//grey
                         
                          ],
                          borderColor: [
                            "rgba(253, 155, 155, 1)",//pink
                            "rgba(43, 63, 229, 0.8)",//blue
                            "rgba(203 ,213 ,225 ,1)",//grey
                            
                          ],
                        },
                      ],
                    }}
                    options={{
                      cutout: "65%", // Adjust the cutout value to minimize inner width
                      radius: "90%",
                    }}
                  />
                </div>
                <div className='text-slate-500 h-10 w-10 absolute inset-0 flex items-center justify-center z-40 top-[333px] left-[1130px] bg-slate-100 text-lg font-bold rounded-full shadow-md'>
                {PieDataSum}
              </div>




                </div>
              </div>
            </div>
            <div className="items-stretch  =shadow-md bg-white flex w-[350px] flex-col mt-8 pt-8 pb-3.5 px-6 rounded-2xl max-md:px-5">
             
              <div className="dataCard customerCard">
              <Bar
        data={horizontalBarData}
        options={horizontalBarOptions}
      />
            </div>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Over_View;
