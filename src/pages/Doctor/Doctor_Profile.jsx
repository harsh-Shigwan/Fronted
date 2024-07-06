import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import sourceData from "../../Data/sourceData.json";
import baseURL from '../../assests/API_URL';
import axios from 'axios';
import { Bar, Doughnut, Line } from "react-chartjs-2";
const Doctor_Profile = () => {
    const[ myData , setMyData]= useState([]);
    const token =  JSON.parse(localStorage.getItem("Token"))
    let { DoctorID} = useParams();
    const [appointments, setAppointments] = useState([]);
    const [pastCount, setPastCount] = useState(1);
    const [futureCount, setFutureCount] = useState(1);
    const [todayCount, setTodayCount] = useState(1);
    useEffect(() => {
      const fetchAppointments = async () => {
          try {
              const response = await axios.get('http://127.0.0.1:8000/api/appointment/appointments/',
                {
                  headers: {
                    Authorization: `Token ${token}`,
                  },
                }
              );
              const filteredAppointments = response.data.filter(appointment => appointment.doctor === parseInt(DoctorID));
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
  }, [DoctorID]);

 const PieData = [pastCount, futureCount, todayCount];
  const PieDataSum = parseFloat(pastCount)+parseFloat(futureCount)+parseFloat(todayCount);
  
    useEffect(()=>{

        getDoctor()

    },[DoctorID]) 

    const getDoctor=()=>{
        fetch(`${baseURL}/doctor/api/doctors/`, {
          headers: {
            Authorization: `Token ${token}`,
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
    <div className="flex gap-0 max-md:flex-col max-md:gap-0 max-md:">
      <div className="flex flex-col w-[68%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col items-start py-8 w-full bg-white rounded-2xl shadow max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-4 items-center ml-8 font-semibold whitespace-nowrap max-md:ml-2.5">
            <div className="grow self-stretch ml-5 p-2 px-5  text-3xl bg-blue-50 border-l-4 border-blue-800 text-2xl font-bold leading-8 text-gray-900  shadow-md rounded-md">
             Dr. {myData.name}
            </div>
            <div className="flex gap-2.5 self-stretch py-0.5 my-auto text-sm leading-6 text-emerald-500">
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
          <div className="flex gap-2.5 ml-[52px] mt-5 self-start py-0.5 leading-[164%] text-slate-500 w-[400px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/62fb1a8ba8002e1d6690f3a9daa5a7f75316d3f146b1a3d29b9cde3a941e1b27?"
            className="my-auto w-4 aspect-square"
          />
          <div className="grow">{myData.Address}</div>
        </div>
          <div
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8d40df40df6b96c10c423aaa6d103f60d21ab19b2f5cf0332eebd010d343cc2?"
            className=" mt-5 stroke-[1px] stroke-stone-300 max-md:max-w-full"
          />
          <div className="mt-10 ml-8 text-xl font-semibold leading-7 text-zinc-700 max-md:ml-2.5">
          <span className="bg-blue-50 ml-5 px-2 py-1 rounded-md">Educational Qualifications:</span>
        </div>
        <div className="flex gap-2.5 justify-center mt-3 ml-8 max-w-full w-[315px] max-md:ml-2.5">
          <div className="flex flex-col justify-center my-auto aspect-square">
            <div className="shrink-0 h-5 rounded-sm bg-neutral-200" />
          </div>
          <div className="grow text-sm ml-5 leading-6 whitespace-nowrap text-slate-600">
            {myData.education_qualification}
          </div>
        </div>
        
        
         
        
          <div className="mt-5 ml-12 bg-blue-50    px-2 py-1 rounded-md text-sm font-semibold leading-7 text-zinc-700 max-md:ml-2.5">
            Other Working Places
          </div>
          <div className="flex gap-2.5 justify-center mt-3 ml-8 max-w-full w-[315px] max-md:ml-2.5">
            <div className="flex flex-col justify-center my-auto aspect-square">
              <div className="shrink-0 h-5 rounded-sm bg-neutral-200" />
            </div>
            <div className="grow text-sm ml-5 leading-6 whitespace-nowrap text-slate-600">
              Mattis vel amet dui arcu turpis malesuada.
            </div>
          </div>
     
        </div>
      </div>
      <div className="flex flex-col ml-20 w-[500px] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col font-semibold max-md:mt-10">
          <div className="flex flex-col p-6 w-full bg-white rounded-2xl shadow-md max-md:px-5">
            <div className="text-base leading-6 text-gray-900">
              Scheduled Appointments
            </div>
            <div className="flex gap-2 justify-between mt-6 text-sm leading-4 whitespace-nowrap text-zinc-800">
              <div className="flex flex-col flex-1">
                <div className="flex gap-2 justify-between">
                  <div className="my-auto w-2 h-2 bg-blue-500 rounded-full" />
                  <div className="flex-auto">{futureCount}</div>
                </div>
                <div className="text-xs text-slate-500">
                  Upcoming appointments
                </div>
                <div className="flex gap-2 justify-between mt-5">
                  <div className="my-auto w-2 h-2 bg-rose-300 rounded-full" />
                  <div className="flex-auto">{pastCount}</div>
                </div>
                <div className="text-xs text-slate-500">
                  Past appointments
                </div>
                <div className="flex gap-2 justify-between mt-5">
                  <div className="my-auto w-2 h-2 rounded-full bg-slate-400" />
                  <div className="flex-auto">{todayCount}</div>
                </div>
                <div className="text-xs text-slate-500">
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
            <div className='text-slate-500 h-10 w-10 absolute inset-0 flex items-center justify-center z-40 top-[180px] left-[1150px] bg-slate-100 text-lg font-bold rounded-full shadow-md'>
            {PieDataSum}
          </div>
          
            </div>
          </div>
       
        </div>
      </div>
    </div>
  </div>
  )
}

export default Doctor_Profile