import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  styled,
  makeStyles,
  TBody,
  Paper,
  TableContainer,
  TablePagination,
  Button,
  Typography,
  TextField,
} from "@mui/material";
const baseURL = 'http://127.0.0.1:8000';

const Generate_Bill = () => {
  const { patientId } = useParams(); // Extract patientId from URL parameters
  const [patientData, setPatientData] = useState(null);
  const [equip, setEquip] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [equipmentData, setEquipmentData] = useState([]);
const [ admissionID , setAdmissionID] = useState(null)
  useEffect(() => {
    
    // Fetch patient data based on patientId
    axios.get(`${baseURL}/api/patient/api/patients/`)
      .then(response => {
        // Filter the patientData array to find the patient with matching PatientID
        const patient = response.data.find(patient => patient.PatientID === parseInt(patientId));
        setPatientData(patient);
      })
      .catch(error => {
        console.error('Error fetching patient data:', error);
      });
  }, [patientId]);
  useEffect(() => {
    // Fetch IPD registration data based on patientId
    axios.get(`${baseURL}/api/ipd/ipd-registrations/`)
      .then(response => {
        // Filter the IPD registration data to find the entry for the patient
        const admission = response.data.filter(item => item.patient === parseInt(patientId));
        if (admission.length > 0) {
          // Access the first element of the filtered array to get the admission ID
          setAdmissionID(admission[0].admission_id);
        } else {
          console.error('IPD registration not found for patient ID:', patientId);
        }
        console.log("ipd" , admission);
      })
      .catch(error => {
        console.error('Error fetching IPD registration data:', error);
      });
  }, [patientId]);



  useEffect(() => {
    // Fetch equipment data
    axios.get(`${baseURL}/inventory/api/patient-equipment-usage/`)
      .then(response => {
        // Filter the equipment data to find items used by the patient
        const equipmentsUsedByPatient = response.data.filter(equipment => equipment.patient === parseInt(patientId));
        const totalPrice = equipmentsUsedByPatient.reduce((acc, curr) => acc + parseFloat(curr.unit_price * curr.quantity_used), 0);
        setTotalPrice(totalPrice);
        setEquip(equipmentsUsedByPatient);
      })
      .catch(error => {
        console.error('Error fetching equipment data:', error);
      });
  }, [patientId]);

  useEffect(() => {
    // Fetch equipment data to get the equipment names
    axios.get(`${baseURL}/inventory/api/equipment/`)
      .then(response => {
        setEquipmentData(response.data);
      })
      .catch(error => {
        console.error('Error fetching equipment data:', error);
      });
  }, []);

  const getEquipmentName = (equipmentId) => {
    const equipment = equipmentData.find(item => item.id === equipmentId);
    return equipment ? equipment.name : '';
  };

  const generateFinalBill = () => {
    // Make a POST request to store the total amount in patient-billings
    axios.post(`${baseURL}/patient/api/patient-billings/`, {
      InvoiceDetails: totalPrice.toFixed(0),
      PatientID: parseInt(patientId)
    })
    .then(response => {
      console.log('Total amount stored successfully:', response.data);
      alert("Total amount stored successfully")
      // Optionally, you can navigate to another page or show a success message here
    })
    .catch(error => {
      console.error('Error storing total amount:', error);
    });
  };

  return (
    <div className=' ml-28 w-full justify-center'>
      <h1 className=' bg-slate-700 h-10 w-40'>Generate Bill {admissionID}</h1>
      {patientData && (
        <div className=' bg-slate-800'>
          <h2>Patient Details</h2>
          <p className=''>Patient ID: {patientData.PatientID}</p>
          <p>First Name: {patientData.FirstName}</p>
          <p>Phone: {patientData.phone}</p>
          <p>Email: {patientData.email}</p>
          {/* Add more patient details as needed */}
        </div>
      )}

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
      {patientData && (
      <div className="self-stretch mt-[20px] w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[42%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-5 text-sm font-medium text-black max-md:mt-2.5">
              <div className="flex gap-2.5">
                <div>Patient </div>
                <div>UID:</div>
                <div className="flex-auto">{patientData.PatientID}</div>
              </div>
              <div className="flex gap-1.5 mt-2.5">
                <div>Name:</div>
                <div className="flex-auto uppercase">{patientData.FirstName}</div>
                <div className="flex-auto"> ({patientData.Gender})</div>
              </div>
              <div className="flex gap-1 mt-2.5">
                <div>DOB:</div>
                <div className="flex-auto">{patientData.DOB}</div>
              </div>
              <div className="flex gap-1 mt-2">
                <div>Address:</div>
                <div>{patientData.city}</div></div>
                <div className=" flex mt-2 mwhitespace-nowrap">
                  <div className="grow uppercase">Pin code,-</div>{patientData.PinCode}</div>
                  
               
                  <div className=" flex mt-2 mwhitespace-nowrap">
                  <div className="grow uppercase">Contact</div>{patientData.phone}</div>
              
           
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[58%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-sm font-medium text-black max-md:mt-3 max-md:max-w-full">
              <div className="flex flex-col items-start self-end max-w-full w-[321px]">
                <div className="flex gap-2 ml-4 whitespace-nowrap max-md:ml-2.5">
                  <div>Date:</div>
                  <div className="flex-auto tracking-tighter">19-Jan-2023</div>
                </div>
                <div className="flex gap-5 self-stretch px-4 mt-2.5">
                  <div className="grow">Admission No</div>
                  <div className="flex-auto">:000001</div>
                </div>
                <div className="flex gap-1.5 mt-2.5 ml-4 max-md:ml-2.5">
                  <div className="grow">Admission Date:</div>
                  <div className="tracking-tighter">18-Jan-2023,</div>
                  <div className="flex-auto tracking-normal">12:19 PM</div>
                </div>
              </div>
              <div className="flex gap-5 px-5 mt-2 max-md:flex-wrap">
               
                <div className="flex flex-auto gap-1">
                  <div className=" ml-[93px] grow tracking-normal">Discharge Date:</div>
                  <div className="mr-[100px] ">--/--/--</div>
                </div>
              </div>
              <div className="flex gap-1.5 self-center px-5 mt-2 tracking-normal">
                <div className="grow">Bed No(s):</div>
                <div className="flex-auto">GEN001(GENERAL)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
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
            <div className="mt-2 flex-auto ">OT Charges</div>
            <div className="mt-1.5 tracking-normal">Professional Fees</div>
          </div>
        </div>
        <div className="flex flex-col self-start tracking-tight whitespace-nowrap">
          <div className="tracking-tight">1650.00</div>
          <div className="mt-2.5">1000.00</div>
          <div className="mt-2.5">1000.00</div>
        </div>
      </div>
      <img
        loading="lazy"
        className="mt-2 w-full border border-black border-solid stroke-[1px] stroke-black max-md:max-w-full"
      />
      <div className="flex flex-col self-end px-2 mt-5">
        <div>Total Bill Amount: 3650.00</div>
        <div className="mt-2.5">Amount Payable: 3650.00</div>
        <div className="self-end mt-1.5">Amount Paid: 0.00</div>
        <div className="self-end mt-2.5">Balance: 3650.00</div>
        <div className="mt-2.5">Paid amount in words: Zero</div>
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
   
     
   
      <div className='mt-5  '>
     
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className=' border-y-2 border-black text-black'>
          <tr>
            <th scope='col' className='px-6 py-3 text-left text-xs font-medium  text-black uppercase tracking-wider'>Equipment ID</th>
            <th scope='col' className='px-6 py-3 text-left text-xs font-medium  text-black uppercase tracking-wider'>Quantity Used</th>
            <th scope='col' className='px-6 py-3 text-left text-xs font-medium  text-black uppercase tracking-wider'>Usage Date</th>
            <th scope='col' className='px-6 py-3 text-left text-xs font-medium  text-black uppercase tracking-wider'>Price</th>
            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider'>Total Price</th>
          </tr>
        </thead>
        <tbody className=' text-gray-700  divide-y  border-black divide-gray-200'>
          {equip && equip.map((equipment, index) => (
            <tr key={index}>
              <td className='px-6 py-4 whitespace-nowrap'>{getEquipmentName(equipment.equipment)}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{equipment.quantity_used}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{equipment.usage_date}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{equipment.unit_price}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{(equipment.unit_price * equipment.quantity_used).toFixed(0)}</td>
            </tr>
          ))}
          <tr className=' '>
            <td className='px-6 py-4  border-y-2 border-black' colSpan='4'>Total Price</td>
            <td className='px-6 py-4  border-y-2 border-black'>{totalPrice.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <button className='top-[40px] ml-10 rounded items-center justify-start py-2 px-4 border-[1px] border-solid border-royalblue w-48 mt-3 gap-[6px] leading-[10px] left-[880px]  absolute font-medium bg-btn text-white' type="submit" onClick={generateFinalBill}>Generate final Bill</button>
    </div>
    
    </div>
   </div>
    </div>
  );
};

export default Generate_Bill;
