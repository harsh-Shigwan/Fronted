import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import baseURL from "../../assets/API_URL";
import EquipmentTable from "../../components/Billing/EquipmentTable";
import MedicineTable from "../../components/Billing/MedinceTable";
import download from "../../Data/download.svg";
import generatePDF from "react-to-pdf";
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import HospitalHeader from "../../components/Billing/HospitalHeader";

const Generate_Bill = () => {
  const { patientId, totalAmount } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [equip, setEquip] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [equipmentData, setEquipmentData] = useState([]);
  const [admissionID, setAdmissionID] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mediTotal, setMediTotal] = useState(0);
  const [mediData, setMediData] = useState([]);
  const [visitData , setVisitData] = useState([]);
  const [visitTotal , setVisitTotal] = useState(0);
  const [balanceAmount, setBalanceAmount] = useState(null);
  const [patientMedicineUsages, setPatientMedicineUsages] = useState([]);
  const [showTables, setShowTables] = useState(true);
  const [hospitalInfo, setHospitalInfo] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const targetRef = useRef();
  const token = JSON.parse(localStorage.getItem("Token"));
  const gstAmount = (totalAmount * 0.05).toFixed(2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          dischargeRes,
          patientRes,
          admissionRes,
          equipmentRes,
          mediRes,
          visitRes
          
        ] = await axios.all([
          axios.get(`${baseURL}/api/ipd/ipd-DischargeHistory`, {
            headers: { Authorization: `Token ${token}` },
          }),
          axios.get(`${baseURL}/api/patient/api/patients/`, {
            headers: { Authorization: `Token ${token}` },
          }),
          axios.get(`${baseURL}/api/ipd/ipd-registrations/`, {
            headers: { Authorization: `Token ${token}` },
          }),
          axios.get(`${baseURL}/inventory/api/patient-equipment-usage/`, {
            headers: { Authorization: `Token ${token}` },
          }),
          axios.get(`${baseURL}/inventory/api/patient-medicine-usage/`, {
            headers: { Authorization: `Token ${token}` },
          }),
          
          axios.get(`${baseURL}/patient/api/patient-doctorvists/`,{
            headers:  { Authorization: `Token ${token}` },
          })
         
        ]);

        // Process patient data
        const patient = patientRes.data.find(
          (p) => p.PatientID === parseInt(patientId)
        );
        setPatientData(patient);
        setBalanceAmount(patient.initial_balance);

        // Process admission data
        const admissionData = admissionRes.data.filter(
          (item) => item.patient === parseInt(patientId)
        );
        setAdmissionID(admissionData);

       
        const equipmentsUsedByPatient = equipmentRes.data.filter(
          (equipment) => equipment.patient === parseInt(patientId)
        );
        const totalPrice = equipmentsUsedByPatient.reduce(
          (acc, curr) => acc + parseFloat(curr.unit_price * curr.quantity_used),
          0
        );
        setTotalPrice(totalPrice);
        setEquip(equipmentsUsedByPatient);

        
        const medicineUsedByPatient = mediRes.data.filter(
          (item) => item.patient === parseInt(patientId)
        );
        const mediTotalPrice = medicineUsedByPatient.reduce(
          (acc, curr) => acc + parseFloat(curr.unit_price * curr.quantity_used),
          0
        );
        setMediTotal(mediTotalPrice);
        setMediData(medicineUsedByPatient);
       
       const VisitbyDoctor = visitRes.data.filter(
          (item) => item.patient === parseInt(patientId)
       ) ;
       const TotalVisitbyDoctors = VisitbyDoctor.reduce(
          (acc, curr) => acc + parseInt(curr.price * curr.total_visits),
          0
       );
       setVisitTotal(TotalVisitbyDoctors);
       setVisitData(VisitbyDoctor);
     

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [patientId, token]);

 
  useEffect(() => {
    axios
      .get(`${baseURL}/inventory/api/equipment/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setEquipmentData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching equipment data:", error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getEquipmentName = (equipmentId) => {
    const equipment = equipmentData.find((item) => item.id === equipmentId);
    return equipment ? equipment.name : "";
  };
  const generateFinalBill = async (event) => {
    event.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("Token"));
      
      // Calculate new amount
      const newAmount = parseFloat(totalPrice) + parseFloat(mediTotal) + parseFloat(totalAmount) + parseFloat(visitTotal);
      await axios.post(
        `${baseURL}/patient/api/patient-billings/`,
        {
          InvoiceDetails: newAmount.toFixed(0),
          PatientID: parseInt(patientId),
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
  
      console.log("Total amount stored successfully");
      alert("Total amount stored successfully");
  
      // Fetch and process patient medicine usages
      const medicineUsageResponse = await axios.get(
        `${baseURL}/inventory/api/patient-medicine-usage/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
  
      const patientMedicineUsages = medicineUsageResponse.data.filter(
        (usage) => usage.patient === parseInt(patientId)
      );
  
      // Deduct quantity from medicines API
      for (const usage of patientMedicineUsages) {
        // Fetch the current medicine details
        const medicineDetails = await axios.get(
          `${baseURL}/inventory/api/medicines/${usage.medicine}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
  
        const { expiration_date, manufacturer, name, unit_price, quantity } = medicineDetails.data;
  
        // Update the medicine quantity
        await axios.put(
          `${baseURL}/inventory/api/medicines/${usage.medicine}/`,
          {
            expiration_date,
            manufacturer,
            name,
            unit_price,
            quantity: quantity - usage.quantity_used,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
      }
  
      // Delete patient medicine usages
      for (const usage of patientMedicineUsages) {
        await axios.delete(
          `${baseURL}/inventory/api/patient-medicine-usage/${usage.id}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
      }
  
      console.log("Medicine usage data deleted successfully");
  
      // Fetch and delete patient equipment usages
      const equipmentUsageResponse = await axios.get(
        `${baseURL}/inventory/api/patient-equipment-usage/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
  
      const patientEquipmentUsages = equipmentUsageResponse.data.filter(
        (usage) => usage.patient === parseInt(patientId)
      );
  
      for (const usage of patientEquipmentUsages) {
       const equipmentDetails = await axios.get(
         `${baseURL}/inventory/api/equipment/${usage.equipment}/`,{
           headers: {
             Authorization: `Token ${token}`,
           }
         }
       );

       const { purchase_date,manufacturer ,name ,unit_price ,quantity } = equipmentDetails.data;

       await axios.put(
         `${baseURL}/inventory/api/equipment/${usage.equipment}/`,
         {
           purchase_date,
           manufacturer,
           name,
           unit_price,
           quantity: quantity - usage.quantity_used,
         },
         {
           headers: {
             Authorization: `Token ${token}`,
           },
         }
       )

      }
      for( const usage of patientEquipmentUsages){
        await axios.delete(
          `${baseURL}/inventory/api/patient-equipment-usage/${usage.id}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
      }
  
      console.log("Equipment usage data deleted successfully");
  
      // Fetch and delete patient doctor visits
      const VisitDocResponse = await axios.get(
        `${baseURL}/patient/api/patient-doctorvists/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
  
      const VisitDocUsages = VisitDocResponse.data.filter(
        (usage) => usage.patient === parseInt(patientId)
      );
  
      for (const usage of VisitDocUsages) {
        await axios.delete(
          `${baseURL}/patient/api/patient-doctorvists/${usage.id}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
      }
  
      // Fetch patient data and update initial balance
      const patientDataResponse = await axios.get(
        `${baseURL}/patient/api/patients/${patientId}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
  
      const { DOB, fullname, Gender, Register_Date } = patientDataResponse.data;
  
      await axios.put(
        `${baseURL}/patient/api/patients/${patientId}/`,
        {
          ...patientDataResponse.data,
          initial_balance: 0,
          DOB,
          fullname,
          Gender,
          Register_Date,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
  
      console.log("Patient's initial balance updated to 0");
  
    } catch (error) {
      console.error("Error storing or updating total amount:", error);
      console.log("Error response data:", error.response?.data);
      alert("Error storing or updating !!");
    }
  };
  
  

  useEffect(() => {
    const fetchMedicineUsage = async () => {
      try {
        const medicineUsageResponse = await axios.get(
          `${baseURL}/inventory/api/patient-medicine-usage/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const filteredUsages = medicineUsageResponse.data.filter(
          (usage) => usage.patient === parseInt(patientId)
        );

        setPatientMedicineUsages(filteredUsages);
        console.log("patientMedicineUsages", filteredUsages);
      } catch (error) {
        console.error("Error fetching medicine usage:", error);
      }
    };

    fetchMedicineUsage();
  }, [patientId, token, baseURL]);

  const totalSum =
    parseFloat(totalPrice) + parseFloat(mediTotal) + parseFloat(totalAmount ) + parseFloat(visitTotal);
    const afterGstAmount =  parseFloat(totalPrice) + parseFloat(mediTotal) + parseFloat(totalAmount ) ;
  const balancetotal = (parseFloat(totalSum) - parseFloat(balanceAmount)).toFixed(2);
 // const amountAfterGST = totalSum + gstAmount;
  const groupEquipments = (equipments) => {
    const groupedEquipments = {};

    equipments.forEach((equipment) => {
      const name = getEquipmentName(equipment.equipment);
      const key = `${equipment.unit_price}-${name}`;

      if (!groupedEquipments[key]) {
        groupedEquipments[key] = {
          name: name,
          unit_price: equipment.unit_price,
          quantity_used: 0,
          total_price: 0,
          usage_date: equipment.usage_date,
        };
      }

      groupedEquipments[key].quantity_used += equipment.quantity_used;
      groupedEquipments[key].total_price +=
        equipment.unit_price * equipment.quantity_used;
    });

    return Object.values(groupedEquipments);
  };

  const groupedEquipments = groupEquipments(equip || []);
  const totalGroupedPrice = groupedEquipments.reduce(
    (acc, curr) => acc + curr.total_price,
    0
  );
  

  return (
    <div className=" ml-20 w-[800px]   mx-auto  ">
      <div>
     
        <div ref={targetRef} className=" mt-10 ml-24  mx-auto">
          <div className="flex flex-col items-start   ">
          <div className=" w-[710px]"><HospitalHeader ></HospitalHeader></div>
            <div className="self-stretch mt-[20px] w-full max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                {patientData && (
                  <div className="flex flex-col w-[42%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow px-5 text-sm font-medium text-black max-md:mt-2.5">
                      <div className="flex gap-2.5">
                        <div>Patient </div>
                        <div>UID:</div>
                        <div className="flex-auto">{patientData.PatientID}</div>
                      </div>
                      <div className="flex gap-1.5 mt-2.5">
                        <div>Name:</div>
                        <div className="flex-auto uppercase">
                          {patientData.fullname}
                        </div>
                        <div className="flex-auto"> ({patientData.Gender})</div>
                      </div>
                      <div className="flex gap-1 mt-2.5">
                        <div>DOB:</div>
                        <div className="flex-auto">{patientData.DOB}</div>
                      </div>
                      <div className="flex gap-1 mt-2">
                        <div>Address:</div>
                        <div>{patientData.city}</div>
                      </div>
                      <div className=" flex mt-2  mr-[145px] whitespace-nowrap">
                        <div className="grow uppercase">Pin code :</div>
                        {patientData.PinCode}
                      </div>

                      <div className=" flex mt-2 mwhitespace-nowrap">
                        <div className="grow uppercase">Contact:</div>
                        <div className=" mr-32">{patientData.phone}</div>
                      </div>
                    </div>
                  </div>
                )}
                {admissionID.length > 0 && (
                  <div className="flex flex-col ml-5 w-[58%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col text-sm font-medium text-black max-md:mt-3 max-md:max-w-full">
                      <div className="flex flex-col items-start self-end max-w-full w-[321px]">
                        <div className="flex gap-2 ml-4 whitespace-nowrap max-md:ml-2.5">
                          <div>Date:</div>
                          <div className="flex-auto tracking-tighter">
                            {currentDate.toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex gap-5 self-stretch px-4 mt-2.5">
                          <div className="grow">
                            Admission No : {admissionID[0].admission_id}
                          </div>
                        </div>
                        <div className="flex gap-1.5 mt-2.5 ml-4 max-md:ml-2.5">
                          <div className="grow">Admission Date:</div>
                          <div className="tracking-tighter">
                            {admissionID[0].admission_date}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-5 px-5 mt-2 max-md:flex-wrap">
                        <div className="flex flex-auto gap-1">
                          <div className=" ml-[100px] grow tracking-normal ">
                            {" "}
                            Discharge Date:
                          </div>
                          <div className="mr-[100px] ">
                            {admissionID[0].discharge_date}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1.5 self-center px-5 mt-2 tracking-normal">
                        <div className="grow mr-[60px]">
                          Bed No. : {admissionID[0].bed}
                        </div>
                        <div className="">Ward : {admissionID[0].ward} </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-1 px-5 mt-3 text-sm font-medium text-black whitespace-nowrap">
              <div className="grow">Address:</div>
              <div>Pune,</div>
              <div className="flex gap-0.5">
                <div className="grow uppercase">Pune,-</div>
                <div>411051,</div>
              </div>
            </div>
            <div className="flex gap-2.5 px-5 mt-2.5 text-sm font-medium text-black">
              <div className="grow tracking-wide">Consulting Doctors:</div>
              <div className="flex-auto tracking-normal">
                Dr. Akshara Raje (General Physician)
              </div>
            </div>
          </div>
          <div className="flex flex-col pb-1.5 text-sm font-medium text-black max-w-[793px]">
            <img
              loading="lazy"
              className="w-full border mt-[22px] border-black border-solid stroke-[1px] stroke-black max-md:max-w-full"
            />
            <div className="self-center mt-6 text-base font-bold tracking-wider">
              PROVISIONAL BILL
            </div>
            <img
              loading="lazy"
              className="mt-2 w-full border border-black border-solid stroke-[1px] stroke-black max-md:max-w-full"
            />
            <div className="flex gap-5 justify-between mt-1 w-full max-md:flex-wrap max-md:max-w-full ml-7">
              <div className="flex gap-5">
                <div className="flex-auto tracking-wider">Sr. No.</div>
                <div className="tracking-wide ml-7">Particulars</div>
              </div>
              <div className="tracking-wide mr-16">Amount</div>
            </div>
            <img
              loading="lazy"
              className="w-full border mt-[10px] border-black border-solid stroke-[1px] stroke-black max-md:max-w-full"
            />
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-5 justify-between">
                <div className="flex flex-col self-start tracking-tight whitespace-nowrap ml-7">
                  <div>1.</div>
                  <div className="mt-2.5">2.</div>
                  <div className="mt-2.5">3.</div>
                  <div className="mt-2.5">4.</div>
                </div>
                <div className="flex flex-col ml-16">
                  <div className="tracking-tight">Rooms & Nursing Charges</div>
                  <div className="mt-2 flex-auto ">Equipment Charges</div>
                  <div className="mt-2 tracking-normal">Pharmacy Charges</div>
                  <div className="mt-2 tracking-normal">Doctor's Visit</div>
                </div>
                
              </div>
              <div className="flex flex-col self-start tracking-tight whitespace-nowrap mr-12">
                <div className="tracking-tight">{totalAmount}</div>
                <div className="mt-2.5">{totalPrice}</div>
                <div className="mt-2.5">{mediTotal}</div>
                <div className="mt-2.5">{visitTotal}</div>
              </div>
            </div>
            <img
              loading="lazy"
              className="mt-2 w-full border border-black border-solid stroke-[1px] stroke-black max-md:max-w-full"
            />
            <div className="flex flex-col self-end px-2 mt-5 mr-12">
              <div className="self-end mt-2.5">
                Total Bill Amount : {totalSum.toFixed(2)}
              </div>
             {/*} <div className="self-end mt-2.5">
                GST ( 5%) : {gstAmount}
              </div>
              <div className="self-end mt-2.5">
               After GST Total Bill Amount : {afterGstAmount}
              </div>*/}
              <div className="self-end mt-2.5">
                Deposit Amount : {balanceAmount}
              </div>
              <div className="self-end mt-3 mb-3 font-bold">
                Final Paid amount : {balancetotal}
              </div>
            </div>
          </div>
          {showTables && (<div>
          <div className="flex flex-col px-5 max-w-[793px] ">
            <img
              loading="lazy"
              className="w-full border border-black border-solid stroke-[1px] stroke-black max-md:max-w-full"
            />
            <div className="self-center mt-5 text-base font-bold tracking-wider text-black uppercase">
              Detailed Breakup
            </div>
          </div>
        
          <EquipmentTable
            groupedEquipments={groupedEquipments}
            totalPrice={totalPrice}
            
          />
          <MedicineTable
            mediData={mediData}
            mediTotal={mediTotal}
          ></MedicineTable>
          </div>)}
        </div>
        <div className="  ml-40">
       
        <div className="flex items-center justify-center absolute top-[35px]  left-[722px]">
        <button className="rounded-md h-[39px] bg-theme-white-default box-border w-16 flex flex-col items-center justify-center py-2.5 px-5 text-theme-primary-dark border-[1px] border-solid border-theme-primary-dark" onClick={() => setShowTables(!showTables)}>
          <div className="cursor-pointer ">
            {showTables ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
          </div>
        </button>
      </div>
      
      
               
          <button
            className="top-[23px] ml-10 rounded-md items-center justify-start py-2 px-4 border-[1px] border-solid border-royalblue w-48 mt-3 gap-[6px] leading-[10px] left-[940px] absolute font-medium bg-btn h-10 text-white"
            type="submit"
            onClick={generateFinalBill}
          >
            Generate final Bill
          </button>
          <button
            className="absolute top-[35px] left-[805px] rounded-md  h-10 bg-theme-white-default box-border w-[156px] flex flex-col items-start justify-start py-2.5 px-5 text-theme-primary-dark border-[1px] border-solid border-theme-primary-dark"
            onClick={() =>
              generatePDF(targetRef, {
                filename: "Final Bill.pdf",
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
    </div>
  );
};

export default Generate_Bill;
