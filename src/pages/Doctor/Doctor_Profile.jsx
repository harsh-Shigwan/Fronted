import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Bar, Doughnut, Line } from "react-chartjs-2";
import sourceData from "../../Data/sourceData.json";
const Doctor_Profile = () => {
    const[ myData , setMyData]= useState([]);
    let { DoctorID} = useParams();
    useEffect(()=>{

        getDoctor()

    },[DoctorID]) 
console.log(myData)
    const getDoctor=()=>{
        fetch("http://127.0.0.1:8000/doctor/api/doctors/", {
          headers: {
            "Content-Type": "application/json",
            authorization: JSON.parse(localStorage.getItem("Token")),
          },
        }).then(
            res =>{
                if(res.ok){
                    return res.json()
                }else {
                    console.log("Error")
                }
            }
        ).then( (data)=>{
            const doctor = data.find((item)=> item.DoctorID === parseInt(DoctorID))
            setMyData(doctor)
        }).catch((err) => console.error("Fetch error:", err));
    }
  return (
    <div className="justify-end px-8 pt-6 pb-12 bg-slate-50 max-md:px-5">
    <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
      <div className="flex flex-col w-[68%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col items-start py-8 w-full bg-white rounded-2xl shadow max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-4 items-center ml-8 font-semibold whitespace-nowrap max-md:ml-2.5">
            <div className="grow self-stretch ml-10  text-2xl leading-8 text-gray-900">
              {myData.name}
            </div>
            <div className="flex gap-2.5 self-stretch py-0.5 my-auto text-sm leading-6 text-emerald-300">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d4aabbb0cbd087ee9e688b3df414d9d42c8184b8c5ebeab84969324603a5719?"
                className="my-auto w-4 aspect-square"
              />
              <div>Verified</div>
            </div>
           
          </div>
          <div className="flex flex-wrap gap-5 justify-between content-center items-start self-center pr-10 mt-6 text-sm font-semibold max-md:pr-5 max-md:max-w-full">
            <div className="flex flex-col flex-1 self-stretch">
              <div className="flex gap-5 justify-between whitespace-nowrap leading-[143%] text-slate-500">
                <div className="flex gap-2.5 py-0.5 my-auto">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c5dfd2fb3af444c462b60db257c48f18b6b97b4874baf5d38e4440c00ddfca57?"
                    className="my-auto w-4 aspect-square"
                  />
                  <div>{myData.specialty}</div>
                </div>
                <div className="flex gap-2.5 justify-between py-1">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/aed63ab2b9a89ff7f1a20f9c62906e38a5ef5f599a5a9170d6fb7b99d6344c9b?"
                    className="my-auto w-4 aspect-square"
                  />
                  <div className="grow">{myData.phone_number}</div>
                </div>
                <div className="flex gap-2.5 self-start py-0.5 leading-[164%] text-slate-500">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/62fb1a8ba8002e1d6690f3a9daa5a7f75316d3f146b1a3d29b9cde3a941e1b27?"
                    className="my-auto w-4 aspect-square"
                  />
                  <div className="grow">{myData.PinCode}</div>
                </div>
              </div>
              <div className="flex gap-5 justify-between mt-3 leading-[164%] text-slate-500">
                <div className="flex gap-2.5 justify-between py-0.5 whitespace-nowrap">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b8af9285666812cfc44515f12ec7ef27ef9d19f81222346ecbe0efbff99ef40?"
                    className="my-auto w-4 aspect-square"
                  />
                  <div className="grow">{myData.email}</div>
                </div>
                <div className="flex gap-2.5 justify-between py-0.5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ddbfb0e7760dfbe73ad7da4d0182257c6e3b82719ba8b4a90ad3ed93118f7e37?"
                    className="my-auto w-4 aspect-square"
                  />
                  <div className="flex-auto">{myData.dob}</div>
                </div>
              </div>
            </div>
            <div className="flex gap-2.5 py-1 whitespace-nowrap leading-[143%] text-slate-500">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/af86e28d909b2f94f2ceb5df9755e14d48d47891c5cc22cc5c9e741ab526d099?"
                className="my-auto w-4 aspect-square"
              />
              <div>B+</div>
            </div>
            <div className="flex gap-2.5 py-1 whitespace-nowrap leading-[143%] text-slate-500">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/19600974ad972c21c177e32c9189fc827b865834b406b48e21baa68e234e060d?"
                className="my-auto w-4 aspect-square"
              />
              <div className="grow">{myData.Gender}</div>
            </div>
          </div>
          <div
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8d40df40df6b96c10c423aaa6d103f60d21ab19b2f5cf0332eebd010d343cc2?"
            className=" mt-5 stroke-[1px] stroke-stone-300 max-md:max-w-full"
          />
          <div className="mt-10 ml-8 text-xl font-semibold leading-7 text-zinc-700 max-md:ml-2.5">
            Educational Qualifications:
          </div>
          <div className="flex gap-2.5 justify-center mt-3 ml-8 max-w-full w-[315px] max-md:ml-2.5">
            <div className="flex flex-col justify-center my-auto aspect-square">
              <div className="shrink-0 h-5 rounded-sm bg-neutral-200" />
            </div>
            <div className="grow text-sm leading-6 whitespace-nowrap text-slate-600">
              Mattis vel amet dui arcu turpis malesuada.
            </div>
          </div>
          <div className="flex gap-2.5 justify-center mt-2 ml-8 text-sm leading-6 whitespace-nowrap text-slate-600 max-md:ml-2.5">
            <div className="my-auto w-5 h-5 fill-neutral-200" />
            <div className="grow">
              Mattis vel amet dui arcu turpis malesuada.
            </div>
          </div>
          <div className="flex gap-2.5 justify-center mt-2 ml-8 text-sm leading-6 whitespace-nowrap text-slate-600 max-md:ml-2.5">
            <div className="my-auto w-5 h-5 fill-neutral-200" />
            <div className="grow">
              Mattis vel amet dui arcu turpis malesuada.
            </div>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8d40df40df6fb96c10c423aaa6d103f60d21ab19b2f5cf0332eebd010d343cc2?"
            className=" mt-5 stroke-[1px] mb-10 stroke-stone-300 max-md:max-w-full"
          />
          <div className="mt-5 ml-8 text-xl font-semibold leading-7 text-zinc-700 max-md:ml-2.5">
            Other Working Places
          </div>
          <div className="flex gap-2.5 justify-center mt-3 ml-8 max-w-full w-[315px] max-md:ml-2.5">
            <div className="flex flex-col justify-center my-auto aspect-square">
              <div className="shrink-0 h-5 rounded-sm bg-neutral-200" />
            </div>
            <div className="grow text-sm leading-6 whitespace-nowrap text-slate-600">
              Mattis vel amet dui arcu turpis malesuada.
            </div>
          </div>
          <div className="flex gap-2.5 justify-center mt-2 ml-8 text-sm leading-6 whitespace-nowrap text-slate-600 max-md:ml-2.5">
            <div className="my-auto w-5 h-5 fill-neutral-200" />
            <div className="grow">
              Mattis vel amet dui arcu turpis malesuada.
            </div>
          </div>
          <div className="flex gap-3 self-end mt-10 mr-4 text-xs font-semibold leading-3 max-md:mr-2.5">
            <div className="flex flex-col flex-1 justify-center px-5 py-3 text-white bg-blue-500 rounded-md">
              <div className="flex gap-2 justify-between">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9a62c9a07cf6354ed17d0a801c5c8adb1f3a70bd454ca26b4f578094a382c28?"
                  className="w-3 aspect-square"
                />
                <div>Edit </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 justify-center px-5 py-3 text-red-600 whitespace-nowrap rounded-md border border-red-600 border-solid">
              <div className="flex gap-2 justify-between">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c9d3067589df479d524a4b960dd776eaa6d5c8afb5b4ac70e32eb874e5aa216?"
                  className="w-3 aspect-square"
                />
                <div>Delete</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col ml-5 w-[32%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col font-semibold max-md:mt-10">
          <div className="flex flex-col p-6 w-full bg-white rounded-2xl shadow-md max-md:px-5">
            <div className="text-base leading-6 text-gray-900">
              Scheduled Appointments
            </div>
            <div className="flex gap-2 justify-between mt-6 text-sm leading-4 whitespace-nowrap text-zinc-800">
              <div className="flex flex-col flex-1">
                <div className="flex gap-2 justify-between">
                  <div className="my-auto w-2 h-2 bg-blue-500 rounded-full" />
                  <div className="flex-auto">7</div>
                </div>
                <div className="text-xs text-slate-500">
                  Upcoming appointments
                </div>
                <div className="flex gap-2 justify-between mt-5">
                  <div className="my-auto w-2 h-2 bg-rose-300 rounded-full" />
                  <div className="flex-auto">54</div>
                </div>
                <div className="text-xs text-slate-500">
                  Past appointments
                </div>
                <div className="flex gap-2 justify-between mt-5">
                  <div className="my-auto w-2 h-2 rounded-full bg-slate-400" />
                  <div className="flex-auto">12</div>
                </div>
                <div className="text-xs text-slate-500">
                  Cancelled appointments
                </div>
              </div>
              <div className="dataCard revenueCard  mb-10 w-48 " >
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
          <div className="flex flex-col px-6 py-3.5 mt-8 bg-white rounded-2xl shadow-md max-md:px-5">
            <div className="text-base leading-6 text-gray-900">
              Department
            </div>
            <div className="flex flex-col px-6 pt-4 pb-2 mt-4 w-full rounded-2xl bg-slate-100 max-md:px-5">
              <div className="flex gap-3.5 justify-between">
                <div className="self-start fill-orange-600 fill-opacity-60 h-[46px] w-[46px]" />
                <div className="flex flex-col flex-1">
                  <div className="text-sm leading-6 whitespace-nowrap text-zinc-800">
                    Surgery Ward
                  </div>
                  <div className="text-xs leading-6 text-blue-500">
                    1A - Ground floor
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col px-6 pt-4 pb-2 mt-4 w-full rounded-2xl bg-slate-100 max-md:px-5">
              <div className="flex gap-3.5 justify-between">
                <div className="self-start fill-orange-600 fill-opacity-60 h-[46px] w-[46px]" />
                <div className="flex flex-col flex-1">
                  <div className="text-sm leading-6 whitespace-nowrap text-zinc-800">
                    ICU Ward
                  </div>
                  <div className="text-xs leading-6 text-blue-500">
                    1B - Ground floor
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-center items-center px-16 py-4 mt-4 text-sm leading-4 text-white whitespace-nowrap bg-blue-500 rounded-lg max-md:px-5">
              See all
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Doctor_Profile