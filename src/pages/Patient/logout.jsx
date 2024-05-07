import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientGraph from "../PatientGraph";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import sourceData from "../../Data/sourceData.json";
import Bars from "../../components/Charts/Bars";
import month from "../../Data/month.json";
const Home = () => {
  //  defaults.maintainAspectRatio = false;
  defaults.responsive = true;
  // defaults.plugins.title.display = true;
  //  defaults.plugins.title.align = "center";
  //  defaults.plugins.title.font.size = 15;
  //  defaults.plugins.title.color = "black";
  const token =  JSON.parse(localStorage.getItem("Token"))
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalDoc, setTotalDoc] = useState(0);
  const [totalIPD, setTotalIPD] = useState(0);
  const [ medi , setmedi] =useState(0);
  const [ totalBeds , setTotalBeds] = useState([]);
  const [data, setData] = useState({
    admissionData: [],
    registrationData: []
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch admission data
        const admissionResponse = await axios.get('http://127.0.0.1:8000/api/patient/api/patients/', {
          headers: {
           Authorization: `Token ${token}`,
          },
        });
        const admissionData = admissionResponse.data;

        // Fetch registration data
        const registrationResponse = await axios.get('http://127.0.0.1:8000/api/ipd/ipd-registrations/', {
          headers: {
           Authorization: `Token ${token}`,
          },
        });
        const registrationData = registrationResponse.data;

        // Process data to calculate monthly summation
        const admissionMonthlySum = calculateMonthlySumad(admissionData);
        const registrationMonthlySum = calculateMonthlySum(registrationData);

        // Update state with the processed data
        setData({
          admissionData: admissionMonthlySum,
          registrationData: registrationMonthlySum
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateMonthlySum = (data) => {
    const monthlySum = Array.from({ length: 12 }, () => 0); // Initialize array for monthly sum

    // Iterate over data and accumulate monthly sums
    data.forEach(item => {
      const month = new Date(item.admission_date).getMonth();
     // Extract month from admission date
      monthlySum[month] += 1; // Increase count for the corresponding month
    });

    return monthlySum;
  };
  const calculateMonthlySumad = (data) => {
    const monthlySum = Array.from({ length: 12 }, () => 0); // Initialize array for monthly sum
  
    // Iterate over data and accumulate monthly sums
    data.forEach(item => {
      const month = new Date(item.Register_Date).getMonth(); // Extract month from Register_Date
      monthlySum[month] += 1; // Increase count for the corresponding month
    });
  
    return monthlySum;
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/patient/api/patients/"
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
          "http://127.0.0.1:8000/doctor/api/doctors/"
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
          "http://127.0.0.1:8000/api/ipd/ipd-registrations/"
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
          "http://127.0.0.1:8000/inventory/api/medicines/"
          , {
            headers: {
              Authorization: `Token ${token}`,
            },
          });

        setmedi(response.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchTotalBeds = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/ipd/wards/',  {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
        // Assuming the response data is an array with one object
   // Assuming you want to get the total beds for the first ward
          setTotalBeds(response.data.length);
        console.log('Total beds:', response.data);
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
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Admission Count',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.8)',
        hoverBorderColor: 'rgba(255, 99, 132, 1)',
        data: data.admissionData
      },
      {
        label: 'Registration Count',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        data: data.registrationData
      }
    ]
  };
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
          <div className="top-[100px] ">
            <div className="dataCard w-[800px] customerCard rounded-2xl shadow-[0px_3px_8px_rgba(50,_50,_71,_0.05),_0px_0px_1px_rgba(12,_26,_75,_0.24)]">
            <Bar data={chartData}  options={{
                indexAxis: "x", // Rotate into horizontal bar chart
                plugins: {
                  title: {
                    text: "Revenue Source",
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false, // Remove grid background bars in x-axis
                    },
                  },
                  y: {
                    grid: {
                      display: false, // Remove grid background bars in y-axis
                    },
                    ticks: {
                      display: true,
                    },
                  },
                },
              }}/>
            </div>
          </div>

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
                    <div className="w-[207px] rounded-md bg-theme-primary-dark flex flex-col items-center justify-start py-4 px-6 box-border">
                      <div className="flex flex-row items-center justify-start gap-[10px]">
                        <div className="relative leading-[14px] font-semibold">
                          Notifications
                        </div>
                      </div>
                    </div>
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
                        label: "Count",
                        data: sourceData.map((data) => data.value),
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
                  }}
                  options={{
                    plugins: {
                      title: {
                        text: "Revenue Sources",
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
        <div className="self-stretch relative h-[22px] text-right text-theme-primary-default">
          <div className="absolute top-[0px] left-[0px] w-[1110px] h-[22px]">
            <div className="absolute w-[6.31%] top-[120px] left-[92.05%] font-medium inline-block">
              Show all
            </div>
            <div className="absolute w-[9.91%] top-[90px] left-[5%] text-lg font-semibold text-text-heading-dark text-left inline-block">
              Visits
            </div>
          </div>
        </div>
        <div className="w-[1090px]  flex flex-row items-start justify-start gap-[30px] text-xs text-text-body-muted">
          <div className="w-[255px] top-[100px] relative rounded-2xl shadow-[0px_3px_8px_rgba(50,_50,_71,_0.05),_0px_0px_1px_rgba(12,_26,_75,_0.24)] h-[202px] overflow-hidden shrink-0">
            <div className="flex flex-col px-4 pt-3 pb-12 bg-white rounded-2xl shadow-md max-w-[255px]">
              <div className="flex gap-5 justify-between w-full">
                <div className="flex gap-3.5 justify-between text-xs font-semibold leading-3 text-slate-500">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/32c24cbad50e6b407141c764523ec128b351e8f67f43c7adedaf5546c0485d32?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/32c24cbad50e6b407141c764523ec128b351e8f67f43c7adedaf5546c0485d32?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/32c24cbad50e6b407141c764523ec128b351e8f67f43c7adedaf5546c0485d32?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/32c24cbad50e6b407141c764523ec128b351e8f67f43c7adedaf5546c0485d32?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/32c24cbad50e6b407141c764523ec128b351e8f67f43c7adedaf5546c0485d32?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/32c24cbad50e6b407141c764523ec128b351e8f67f43c7adedaf5546c0485d32?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/32c24cbad50e6b407141c764523ec128b351e8f67f43c7adedaf5546c0485d32?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/32c24cbad50e6b407141c764523ec128b351e8f67f43c7adedaf5546c0485d32?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                    className="w-10 bg-indigo-500 rounded-full aspect-square"
                  />
                  <div className="my-auto">24 April ‘24</div>
                </div>
                <div className="flex gap-1 my-auto">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ca3817529e6c340a83dcd243ccf7fa540897be818e7e2039496eaad4edf99f9?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                    className="w-1 aspect-square fill-slate-600"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ca3817529e6c340a83dcd243ccf7fa540897be818e7e2039496eaad4edf99f9?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                    className="w-1 aspect-square fill-slate-600"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ca3817529e6c340a83dcd243ccf7fa540897be818e7e2039496eaad4edf99f9?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                    className="w-1 aspect-square fill-slate-600"
                  />
                </div>
              </div>
              <div className="mt-10 text-sm font-medium leading-5 text-black whitespace-nowrap">
                Complete Blood Count (CBC)
              </div>
              <div className="mt-6 text-xs font-semibold text-blue-500">
                Dr. Shimron Hetmyer
              </div>
            </div>
          </div>
          <div className="w-[255px] top-[100px] relative rounded-2xl shadow-[0px_3px_8px_rgba(50,_50,_71,_0.05),_0px_0px_1px_rgba(12,_26,_75,_0.24)] h-[202px] overflow-hidden shrink-0">
            <div className="flex flex-col px-4 pt-2.5 pb-12 bg-white rounded-2xl shadow-md max-w-[255px]">
              <div className="flex gap-5 justify-between w-full">
                <div className="flex gap-4 justify-between text-xs font-semibold leading-3 text-slate-500">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/61d679a8764d9b13940afe4dd30347aa1efe1632bccef35d735cb407392e189d?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/61d679a8764d9b13940afe4dd30347aa1efe1632bccef35d735cb407392e189d?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/61d679a8764d9b13940afe4dd30347aa1efe1632bccef35d735cb407392e189d?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/61d679a8764d9b13940afe4dd30347aa1efe1632bccef35d735cb407392e189d?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/61d679a8764d9b13940afe4dd30347aa1efe1632bccef35d735cb407392e189d?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/61d679a8764d9b13940afe4dd30347aa1efe1632bccef35d735cb407392e189d?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/61d679a8764d9b13940afe4dd30347aa1efe1632bccef35d735cb407392e189d?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/61d679a8764d9b13940afe4dd30347aa1efe1632bccef35d735cb407392e189d?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                    className="w-10 bg-orange-600 rounded-full aspect-square"
                  />
                  <div className="my-auto">31 April ‘24</div>
                </div>
                <div className="flex gap-1 my-auto">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ca3817529e6c340a83dcd243ccf7fa540897be818e7e2039496eaad4edf99f9?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                    className="w-1 aspect-square fill-slate-600"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ca3817529e6c340a83dcd243ccf7fa540897be818e7e2039496eaad4edf99f9?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                    className="w-1 aspect-square fill-slate-600"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ca3817529e6c340a83dcd243ccf7fa540897be818e7e2039496eaad4edf99f9?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                    className="w-1 aspect-square fill-slate-600"
                  />
                </div>
              </div>
              <div className="mt-10 text-sm font-medium leading-5 text-black whitespace-nowrap">
                Clinic Visit Appointment
              </div>
              <div className="mt-6 text-xs font-semibold text-blue-500">
                Dr. Shilpa Rao
              </div>
            </div>
          </div>
          <div className="w-[255px] top-[100px] relative rounded-2xl shadow-[0px_3px_8px_rgba(50,_50,_71,_0.05),_0px_0px_1px_rgba(12,_26,_75,_0.24)] h-[202px] overflow-hidden shrink-0">
            <div className="flex flex-col px-4 pt-2 pb-12 bg-white rounded-2xl shadow-md max-w-[255px]">
              <div className="flex gap-5 justify-between w-full">
                <div className="flex gap-4 justify-between text-xs font-semibold leading-3 text-slate-500">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/656a7bf2bc85a38bb35a6f4dee5ae3ccb79b756d1616bc407e02f972ac529ce6?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/656a7bf2bc85a38bb35a6f4dee5ae3ccb79b756d1616bc407e02f972ac529ce6?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/656a7bf2bc85a38bb35a6f4dee5ae3ccb79b756d1616bc407e02f972ac529ce6?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/656a7bf2bc85a38bb35a6f4dee5ae3ccb79b756d1616bc407e02f972ac529ce6?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/656a7bf2bc85a38bb35a6f4dee5ae3ccb79b756d1616bc407e02f972ac529ce6?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/656a7bf2bc85a38bb35a6f4dee5ae3ccb79b756d1616bc407e02f972ac529ce6?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/656a7bf2bc85a38bb35a6f4dee5ae3ccb79b756d1616bc407e02f972ac529ce6?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/656a7bf2bc85a38bb35a6f4dee5ae3ccb79b756d1616bc407e02f972ac529ce6?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                    className="w-10 bg-indigo-500 rounded-full aspect-square"
                  />
                  <div className="my-auto">2 June ‘24</div>
                </div>
                <div className="flex gap-1 my-auto">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ca3817529e6c340a83dcd243ccf7fa540897be818e7e2039496eaad4edf99f9?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                    className="w-1 aspect-square fill-slate-600"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ca3817529e6c340a83dcd243ccf7fa540897be818e7e2039496eaad4edf99f9?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                    className="w-1 aspect-square fill-slate-600"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ca3817529e6c340a83dcd243ccf7fa540897be818e7e2039496eaad4edf99f9?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                    className="w-1 aspect-square fill-slate-600"
                  />
                </div>
              </div>
              <div className="mt-11 text-sm font-medium leading-5 text-black whitespace-nowrap">
                Video Consultation Chat
              </div>
              <div className="mt-6 text-xs font-semibold text-blue-500">
                Dr. Kartik Shukla
              </div>
            </div>
          </div>
          <div className="w-[255px] top-[100px] relative rounded-2xl shadow-[0px_3px_8px_rgba(50,_50,_71,_0.05),_0px_0px_1px_rgba(12,_26,_75,_0.24)] h-[202px] overflow-hidden shrink-0">
            <div className="flex flex-col px-4 pt-2 pb-12 bg-white rounded-2xl shadow-md max-w-[255px]">
              <div className="flex gap-5 justify-between w-full">
                <div className="flex gap-4 justify-between text-xs font-semibold leading-3 text-slate-500">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/a618c1a2b93838c6a6f367c3283ed2474487322d2a0e0c0e45ba584b6622e134?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a618c1a2b93838c6a6f367c3283ed2474487322d2a0e0c0e45ba584b6622e134?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a618c1a2b93838c6a6f367c3283ed2474487322d2a0e0c0e45ba584b6622e134?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a618c1a2b93838c6a6f367c3283ed2474487322d2a0e0c0e45ba584b6622e134?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a618c1a2b93838c6a6f367c3283ed2474487322d2a0e0c0e45ba584b6622e134?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a618c1a2b93838c6a6f367c3283ed2474487322d2a0e0c0e45ba584b6622e134?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a618c1a2b93838c6a6f367c3283ed2474487322d2a0e0c0e45ba584b6622e134?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a618c1a2b93838c6a6f367c3283ed2474487322d2a0e0c0e45ba584b6622e134?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                    className="w-10 bg-orange-600 rounded-full aspect-square"
                  />
                  <div className="my-auto">24 April ‘24</div>
                </div>
                <div className="flex gap-1 my-auto">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ca3817529e6c340a83dcd243ccf7fa540897be818e7e2039496eaad4edf99f9?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                    className="w-1 aspect-square fill-slate-600"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ca3817529e6c340a83dcd243ccf7fa540897be818e7e2039496eaad4edf99f9?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                    className="w-1 aspect-square fill-slate-600"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ca3817529e6c340a83dcd243ccf7fa540897be818e7e2039496eaad4edf99f9?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                    className="w-1 aspect-square fill-slate-600"
                  />
                </div>
              </div>
              <div className="mt-11 text-sm font-medium leading-5 text-black whitespace-nowrap">
                Magnetic Resonance Imaging{" "}
              </div>
              <div className="mt-6 text-xs font-semibold text-blue-500">
                Dr. Shirya Dutta
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
