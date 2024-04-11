import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000';

const Generate_Bill = () => {
  const { patientId } = useParams(); // Extract patientId from URL parameters
  const [patientData, setPatientData] = useState(null);
  const [equip, setEquip] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [equipmentData, setEquipmentData] = useState([]);

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
    <div>
      <h1>Generate Bill</h1>
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

      <div className='mt-8 bg-slate-500'>
        <h2>Equipment Used by Patient</h2>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Equipment ID</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Quantity Used</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Usage Date</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Price</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Total Price</th>
            </tr>
          </thead>
          <tbody className='bg-neutral-400 divide-y divide-gray-200'>
            {equip && equip.map((equipment, index) => (
              <tr key={index}>
                <td className='px-6 py-4 whitespace-nowrap'>{getEquipmentName(equipment.equipment)}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{equipment.quantity_used}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{equipment.usage_date}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{equipment.unit_price}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{(equipment.unit_price * equipment.quantity_used).toFixed(0)}</td>
              </tr>
            ))}
            <tr>
              <td className='px-6 py-4' colSpan='4'>Total Price</td>
              <td className='px-6 py-4'>{totalPrice.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <button className='top-[410px] ml-10 rounded items-center justify-start py-2 px-4 border-[1px] border-solid border-royalblue w-48 mt-3 gap-[6px] leading-[10px] left-[880px]  absolute font-medium bg-btn text-white' type="submit" onClick={generateFinalBill}>Generate final Bill</button>
      </div>
    </div>
  );
};

export default Generate_Bill;
