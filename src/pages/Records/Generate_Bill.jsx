import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import baseURL from "../../assests/API_URL";
import EquipmentTable from "../../components/Billing/EquipmentTable";

const Generate_Bill = () => {
  const { patientId, totalAmount } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [equip, setEquip] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [equipmentData, setEquipmentData] = useState([]);
  const [admissionID, setAdmissionID] = useState([]);
  const [admissionDate, setAdmissionDate] = useState(null);
  const [dischargeDate, setDischargeDate] = useState(null);
  const token = JSON.parse(localStorage.getItem("Token"));
  const [daysBetweenDates, setDaysBetweenDates] = useState(null);
  const [ward, setWard] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mediTotal, setMediTotal] = useState(0);
  const [balanceAmount, setBalanceAmount] = useState(null);
  console.log("totalAmount", totalAmount);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dischargeRes, patientRes, admissionRes, equipmentRes, mediRes] = await axios.all([
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
        ]);

        const dischargeData = dischargeRes.data.filter(
          (item) => item.patient === parseInt(patientId)
        );
        if (dischargeData.length > 0) {
          setDischargeDate(dischargeData[0].discharge_date);
          setAdmissionDate(dischargeData[0].admission_date);
        }

        const patient = patientRes.data.find(
          (p) => p.PatientID === parseInt(patientId)
        );
        setPatientData(patient);
        setBalanceAmount(patient.initial_balance);

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

        const mediTotalPrice = mediRes.data.reduce(
          (acc, curr) => acc + parseFloat(curr.unit_price * curr.quantity_used),
          0
        );
        setMediTotal(mediTotalPrice);
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

  const generateFinalBill = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("Token"));
      const newAmount = parseFloat(totalPrice) + parseFloat(mediTotal) + parseFloat(totalAmount);
  
      // Fetch the existing billings
      const response = await axios.get(`${baseURL}/patient/api/patient-billings/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
  
      const existingBillings = response.data.filter(
        (billing) => billing.PatientID === parseInt(patientId)
      );
  
      if (existingBillings.length > 0) {
        const previousTotal = parseFloat(existingBillings[0].InvoiceDetails);
        const updatedInvoiceDetails = previousTotal + newAmount;
  
        // Update the existing billing with the new amount
        const updateResponse = await axios.put(
          `${baseURL}/patient/api/patient-billings/${existingBillings[0].BillingID}/`,
          {
            InvoiceDetails: updatedInvoiceDetails.toFixed(0),
            PatientID: parseInt(patientId),
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
  
        console.log("Total amount updated successfully:", updateResponse.data);
        alert("Total amount updated successfully");
      } else {
        // Create a new billing record if none exists
        const createResponse = await axios.post(
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
  
        console.log("Total amount stored successfully:", createResponse.data);
        alert("Total amount stored successfully");
      }
    } catch (error) {
      console.error("Error storing or updating total amount:", error);
      alert("Total amount not stored or updated successfully");
    }
  };
  
  const totalSum = parseFloat(totalPrice) + parseFloat(mediTotal) + parseFloat(totalAmount);
  const balancetotal = parseFloat(totalSum) - parseFloat(balanceAmount);
  useEffect(() => {
    const calculateDaysBetweenDates = () => {
      if (admissionDate && dischargeDate) {
        const admission = new Date(admissionDate);
        const discharge = new Date(dischargeDate);

        const differenceInTime = discharge.getTime() - admission.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        setDaysBetweenDates(Math.round(differenceInDays));
      }
    };

    calculateDaysBetweenDates();
  }, [admissionDate, dischargeDate]);

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
    <div className=" ml-28 w-full justify-center">
      <div>
        <div className="flex flex-col items-start max-w-[793px]  ">
          <div className="flex gap-5 text-sm font-medium tracking-tight text-black max-md:flex-wrap">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/701f1459f8665cbf7b9e5c66bc1a73eb5653f41aa2edeb0fc27459ba1f1d173d?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/701f1459f8665cbf7b9e5c66bc1a73eb5653f41aa2edeb0fc27459ba1f1d173d?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/701f1459f8665cbf7b9e5c66bc1a73eb5653f41aa2edeb0fc27459ba1f1d173d?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/701f1459f8665cbf7b9e5c66bc1a73eb5653f41aa2edeb0fc27459ba1f1d173d?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/701f1459f8665cbf7b9e5c66bc1a73eb5653f41aa2edeb0fc27459ba1f1d173d?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/701f1459f8665cbf7b9e5c66bc1a73eb5653f41aa2edeb0fc27459ba1f1d173d?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/701f1459f8665cbf7b9e5c66bc1a73eb5653f41aa2edeb0fc27459ba1f1d173d?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/701f1459f8665cbf7b9e5c66bc1a73eb5653f41aa2edeb0fc27459ba1f1d173d?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
              className="shrink-0 aspect-[0.67] w-[66px]"
            />
            <div className="flex flex-col grow shrink-0 self-end px-5 mt-5 basis-0 w-fit">
              <div className="text-base font-bold tracking-wider">
                Jeevan Hospital
              </div>
              <div className="mt-2">Reg. No. DR86486</div>
              <div className="mt-2">DP Road, Pune - 411056</div>
              <div className="mt-2">
                Ph : 0208064299, Timings : AVAILABE 24 HOURS & 7 DAYS{" "}
              </div>
            </div>
          </div>
          <img
            loading="lazy"
            className="w-full  bg-slate-700 border mt-[22px] border-black border-solid stroke-[1px] stroke-black max-md:max-w-full"
          />

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
                        {patientData.FirstName}
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
                      <div className="grow uppercase">Contact</div>
                      {patientData.phone}
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
          <div className="flex gap-5 justify-between mt-1 w-full max-md:flex-wrap max-md:max-w-full">
            <div className="flex gap-5">
              <div className="flex-auto tracking-wider">Primary Code</div>
              <div className="tracking-wide">Particulars</div>
            </div>
            <div className="tracking-wide">Amount</div>
          </div>
          <img
            loading="lazy"
            className="w-full border mt-[10px] border-black border-solid stroke-[1px] stroke-black max-md:max-w-full"
          />
          <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
            <div className="flex gap-5 justify-between">
              <div className="flex flex-col self-start tracking-tight whitespace-nowrap">
                <div>100000</div>
                <div className="mt-2.5">300000</div>
                <div className="mt-2.5">500000</div>
              </div>
              <div className="flex flex-col">
                <div className="tracking-tight">Rooms & Nursing Charges</div>
                <div className="mt-2 flex-auto ">Equipment Charges</div>
                <div className="mt-1.5 tracking-normal">Professional Fees</div>
              </div>
            </div>
            <div className="flex flex-col self-start tracking-tight whitespace-nowrap">
              <div className="tracking-tight">
               {totalAmount}
               
              </div>
              <div className="mt-2.5">
               {totalPrice}
              </div>
              <div className="mt-2.5">{mediTotal}</div>
            </div>
          </div>
          <img
            loading="lazy"
            className="mt-2 w-full border border-black border-solid stroke-[1px] stroke-black max-md:max-w-full"
          />
          <div className="flex flex-col self-end px-2 mt-5">
            <div className="self-end mt-2.5">Total Bill Amount: {totalSum}</div>
            <div className="self-end mt-2.5">Amount Paid:  {balanceAmount}</div>
            <div className="mt-2.5 mb-2.5">Paid amount in words: {balancetotal}</div>
          </div>
        </div>

        <div className="flex flex-col px-5 max-w-[793px] ">
          <img
            loading="lazy"
            className="w-full border border-black border-solid stroke-[1px] stroke-black max-md:max-w-full"
          />
          <div className="self-center mt-5 text-base font-bold tracking-wider text-black uppercase">
            Detailed Breakup
          </div>

         <EquipmentTable  groupedEquipments={groupedEquipments} totalPrice={totalPrice} generateFinalBill={generateFinalBill}/>
        </div>
      </div>
    </div>
  );
};

export default Generate_Bill;
