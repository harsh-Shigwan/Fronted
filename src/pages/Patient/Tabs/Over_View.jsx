import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import sourceData from "../../../Data/sourceData.json";
import month from "../../../Data/month.json";
import baseURL from "../../../assests/API_URL";
const Over_View = () => {
  // defaults.responsive = true;

  // defaults.plugins.title.display = true;
  // defaults.plugins.title.align = "center";
  //defaults.plugins.title.font.size = 15;
  // defaults.plugins.title.color = "black";

  const [myData, setMyData] = useState([]);
  let { PatientID } = useParams();
  const token = JSON.parse(localStorage.getItem("Token"));
  useEffect(() => {
    getPatient();
  },[PatientID]);
console.log(myData)
  const getPatient = () => {
    fetch(`${baseURL}/api/patient/api/patients/`, {
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("Token")),
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("Error");
        }
      })
      .then((data) => {
        const newPatient = data.find(
          (item) => item.PatientID === parseInt(PatientID)
        );
        setMyData(newPatient);
      })
      .catch((err) => console.log(err));
  };

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
                  <input
                    type="checkbox"
                    className="my-auto bg-transparent w-5 h-5 rounded-sm bg-neutral-300"
                  />
                  <div className="grow">{myData.allergy}</div>
                </div>
              </div>
              <div className="flex flex-col mt-[40px] ml-[25px] items-start text-sm leading-6 whitespace-nowrap max-w-[666px] text-slate-600">
                <div className="self-stretch ml-[20px] w-full text-[25px] font-semibold leading-7 text-zinc-700 max-md:max-w-full">
                  Insurance :
                </div>
                <div className="flex gap-2.5 justify-center px-5 mt-3">
                  <input
                    type="checkbox"
                    className="my-auto w-5 h-5 rounded-sm bg-neutral-300"
                  />
                  <div className="grow">{myData.Insurance_Provider}</div>
                </div>
              </div>
              <div className="flex flex-col mt-[40px] ml-[30px] items-start text-sm leading-6 max-w-[666px] text-slate-600">
                <div className="self-stretch ml-[20px] w-full text-[25px] font-semibold leading-7 text-zinc-700 max-md:max-w-full">
                  Consultant Doctor
                </div>
                <div className="flex gap-2.5 px-5 mt-3">
                  <input
                    type="checkbox"
                    className="my-auto w-5 h-5 rounded-sm bg-neutral-200"
                  />
                  <div>{myData.referred}</div>
                </div>
              </div>

              <img
                className="w-[430px] bg-black relative max-h-full"
                alt=""
                src="/line-125.svg"
              />

              <div className="items-stretch flex gap-3 mr-4 mt-10 self-end max-md:mr-2.5">
                <div className="items-stretch bg-blue-500 flex flex-col justify-center px-5 py-3 rounded-md flex-1">
                  <div className="items-stretch flex justify-between gap-2">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9a62c9a07cf6354ed17d0a801c5c8adb1f3a70bd454ca26b4f578094a382c28?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                      className="aspect-square object-contain object-center w-3 shrink-0"
                    />
                    <div className="text-white text-xs font-semibold leading-3">
                      Edit{" "}
                    </div>
                  </div>
                </div>
                <div className="items-stretch border flex flex-col justify-center px-5 py-3 rounded-md border-solid border-red-600 flex-1">
                  <div className="items-stretch flex justify-between gap-2">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c9d3067589df479d524a4b960dd776eaa6d5c8afb5b4ac70e32eb874e5aa216?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                      className="aspect-square object-contain object-center w-3 shrink-0"
                    />
                    <div className="text-red-600 text-xs font-semibold leading-3">
                      Delete
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 max-md:max-w-full">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
                  <div className="items-stretch shadow-md bg-white flex w-full grow flex-col text-base font-semibold mx-auto px-6 py-7 rounded-2xl max-md:mt-7 max-md:px-5">
                    <div className="text-gray-900 leading-[156%]">
                      Treatment History
                    </div>
                    <div className="text-slate-600 leading-[156%] mt-5">
                      IPD
                    </div>
                    <div className="items-stretch flex justify-between gap-2 text-sm text-slate-500 whitespace-nowrap mt-1.5">
                      <div className="leading-[164%] grow">2024</div>
                      <div className="text-right leading-[164%] grow">2</div>
                    </div>
                    <div className="bg-slate-200 flex flex-col justify-center items-stretch mt-1 pr-16 rounded-3xl max-md:pr-5">
                      <div className="bg-blue-500 flex w-[239px] shrink-0 h-2 flex-col rounded-3xl max-md:mr-1" />
                    </div>
                    <div className="text-slate-600 leading-[156%] mt-5">
                      OPD
                    </div>
                    <div className="items-stretch flex justify-between gap-2 text-sm text-slate-500 whitespace-nowrap mt-1.5">
                      <div className="leading-[164%] grow">2024</div>
                      <div className="text-right leading-[164%] grow">6</div>
                    </div>
                    <div className="bg-slate-200 flex flex-col justify-center items-stretch mt-1 pr-16 rounded-3xl max-md:pr-5">
                      <div className="bg-orange-600 flex w-[239px] shrink-0 h-2 flex-col rounded-3xl max-md:mr-1" />
                    </div>
                    <div className="dataCard customerCard">
                      <Bar
                        data={{
                          labels: sourceData.map((data) => data.label),
                          datasets: [
                            {
                              label: "Count",
                              data: sourceData.map((data) => data.value),
                              backgroundColor: [
                                "rgba(43, 63, 229, 0.8)",
                                "rgba(250, 192, 19, 0.8)",
                                "rgba(234 ,88, 12,0.8)",
                              ],
                              barThickness: 8,
                              borderWidth: 0,
                              borderRadius: 10,
                            },
                          ],
                        }}
                        options={{
                          indexAxis: "y", // Rotate into horizontal bar chart
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
                                display: false,
                              },
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
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
                </div>
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
                        1
                      </div>
                    </div>
                    <div className="text-slate-500 text-xs whitespace-nowrap">
                      Upcoming appointments
                    </div>
                    <div className="items-stretch flex justify-between gap-2 mt-6">
                      <div className="flex bg-red-400  w-[9px] h-[9px] shrink-0flex-col my-auto rounded-full" />
                      <div className="text-zinc-800 text-sm font-semibold leading-4 grow shrink basis-auto">
                        5
                      </div>
                    </div>
                    <div className="text-slate-500 text-xs whitespace-nowrap">
                      Past appointments
                    </div>
                    <div className="items-stretch flex justify-between gap-2 mt-6">
                      <div className="flex bg-slate-300 w-[9px] shrink-0 h-[9px] flex-col my-auto rounded-full" />

                      <div className="text-zinc-800 text-sm font-semibold leading-4 grow shrink basis-auto">
                        1
                      </div>
                    </div>
                    <div className="text-slate-500 text-xs whitespace-nowrap">
                      Cancelled appointments
                    </div>
                  </div>
                  <div className="dataCard revenueCard w-48">
                    <Doughnut
                      style={{ maxWidth: "200px" }}
                      data={{
                        datasets: [
                          {
                            label: "Count",
                            data: sourceData.map((data) => data.value),
                            backgroundColor: [
                              "rgba(43, 63, 229, 0.8)",
                              "rgba(203 ,213 ,225)",
                              "rgba(248, 113 ,113 )",
                            ],
                            borderColor: [
                              "rgba(43, 63, 229, 0.8)",
                              "rgba(203 ,213 ,225)",
                              "rgba(253, 135, 135, 0.8)",
                            ],
                          },
                        ],
                      }}
                      options={{
                        cutout: "80%", // Adjust the cutout value to minimize inner width
                        radius: "100%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="items-stretch shadow-md bg-white flex w-full flex-col mt-8 pt-8 pb-3.5 px-6 rounded-2xl max-md:px-5">
              <div className="text-gray-900 text-base font-semibold leading-6">
                Lab Investigation
              </div>
              <div
                className="dataCard h-44
          customerCard"
              >
                <Bar
                  style={{ height: "320px" }}
                  data={{
                    labels: month.map((data) => data.label),
                    datasets: [
                      {
                        label: "Count",
                        data: month.map((data) => data.value),
                        backgroundColor: ["rgba(248, 113 ,113,0.8 )"],
                        barThickness: 8,
                        borderWidth: 0,
                        borderRadius: 10,
                      },
                    ],
                  }}
                  options={{
                    indexAxis: "x",
                    plugins: {
                      title: {
                        text: "Revenue Source",
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
                          display: false,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className="items-stretch shadow-md bg-white flex flex-col mt-8 px-6 py-5 rounded-2xl max-md:px-5">
              <div className="text-gray-900 text-base font-semibold leading-6 whitespace-nowrap">
                Document Details
              </div>
              <div className="items-stretch bg-slate-100 flex w-full flex-col mt-4 pt-4 pb-2 px-6 rounded-2xl max-md:px-5">
                <div className="items-stretch flex justify-between gap-3.5">
                  <div className="fill-orange-600 fill-opacity-60 flex w-[46px] shrink-0 h-[46px] flex-col self-start" />
                  <div className="items-stretch flex flex-col font-semibold flex-1">
                    <div className="text-zinc-800 text-sm leading-6">
                      Pathology
                    </div>
                    <div className="text-blue-500 text-xs leading-6">
                      Dr. Seema Ragi
                    </div>
                  </div>
                </div>
              </div>
              <div className="items-stretch bg-slate-100 flex w-full flex-col mt-4 pt-4 pb-2 px-6 rounded-2xl max-md:px-5">
                <div className="items-stretch flex justify-between gap-3.5">
                  <div className="fill-orange-600 fill-opacity-60 flex w-[46px] shrink-0 h-[46px] flex-col self-start" />
                  <div className="items-stretch flex flex-col font-semibold flex-1">
                    <div className="text-zinc-800 text-sm leading-6">
                      Prescription
                    </div>
                    <div className="text-blue-500 text-xs leading-6">
                      Dr. Riddhi Mehta
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-white text-sm font-semibold leading-4 whitespace-nowrap items-center bg-blue-500 justify-center mt-4 px-16 py-4 rounded-lg max-md:px-5">
                See all
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Over_View;
