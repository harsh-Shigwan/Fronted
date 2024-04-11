

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams , useNavigate } from 'react-router-dom';

const baseURL = 'http://127.0.0.1:8000';

const BillDetails = ({ onAddItem }) => {
    const [quantity, setQuantity] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');
    const [itemsList, setItemsList] = useState([]);
    const [patientsList, setPatientsList] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    const [selectedItemPrice, setSelectedItemPrice] = useState( ' ');
    const [ medi , setMedi] = useState([]);

    useEffect(() => {
        axios.get(`${baseURL}/inventory/api/equipment/`)
            .then(response => {
                setItemsList(response.data);
                console.log("itemsList", itemsList)
            })
            .catch(error => {
                console.error('Error fetching items:', error);
            });

        axios.get(`${baseURL}/api/patient/api/patients/`)
            .then(response => {
                setPatientsList(response.data);
            })
            .catch(error => {
                console.error('Error fetching patients:', error);
            });

            axios.get(`${baseURL}/inventory/api/medicines/`)
            .then(response => {
                setMedi(response.data);
                console.log("itemsList", itemsList)
            })
            .catch(error => {
                console.error('Error fetching items:', error);
            });

        
    }, []);
    

  
    const handleItemChange1 = (event) => {
        const selectedItemid = parseInt(event.target.value);
        setSelectedItem(selectedItemid);
        const selectedItemData = itemsList.find(item => item.id === selectedItemid)?.unit_price || 0;
        setSelectedItemPrice(selectedItemData);
     
    };

    const handleSubmit = (event) => {
  
        if (!selectedItem || !quantity || quantity <= 0 || !selectedPatient) {
            setErrorMessage('Please select a valid item, quantity, and patient.');
            return;
        }
        const usage_date = new Date().toISOString();
        event.preventDefault();
        axios.post(`${baseURL}/inventory/api/patient-equipment-usage/`, {
            patient: selectedPatient,
            equipment: selectedItem,
            quantity_used: quantity,
            usage_date: usage_date,
            unit_price: selectedItemPrice
        })
       
        .then((response) => {
            console.log('API Response:', response.data);
           console.log('Item added successfully!');

   
        })
        .catch((error) => {
            console.error('API Error:', error);
            console.log("Error response data:", error.response?.data);
            

        });
        console.log("selectedPatient",selectedPatient)
    };
    const handleAddItem = () => {
        if (!selectedItem || !quantity ||!selectedPatient || quantity <= 0) {
            setErrorMessage('Please select a valid item and quantity.');
            return;
        }
        const newItem = { selectedItem ,selectedPatient, quantity, price: selectedItemPrice };
        onAddItem(newItem);
        console.log('Item added successfully!'); 
        // Reset fields and error message
     
        setQuantity(quantity);
        setSelectedItemPrice( selectedItemPrice);
        setErrorMessage('');

        // Post data to the API
        const usage_date = new Date().toISOString();
      
    };
    const navigate = useNavigate();
    const handleGenerateBill = () => {
        // Check if a patient is selected
        if (!selectedPatient) {
            setErrorMessage('Please select a patient before generating the bill.');
            return;
        }
        // Redirect to the bill generation page with the selected patient as a URL parameter
        navigate(`/Invoice_Generator/generate-bill/${selectedPatient}`);
    };


    return (
        <div className=' bg-slate-600'>
            <form onSubmit={handleSubmit}>
                <div className='flex'>
                    <div className='h-20 w-80 b'>
                        <div className='text-slate-600  text-sm font-medium mt-9 max-md:max-w-full ml-10'>Item</div>
                        <select className='ml-8 flex gap-5 justify-between p-3 mt-2 w-[410px] text-base leading-2 text-gray-500 rounded-md bg-slate-100' value={selectedItem} onChange={handleItemChange1}>
                            <option value="">Select Item</option>
                            {itemsList.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <div className='text-slate-600 text-sm font-medium mt-9 max-md:max-w-full ml-[210px]'>Patient</div>
                        <select className='flex ml-[200px] gap-5 justify-between p-3 w-[400px] mt-2 text-base leading-4 text-gray-500 rounded-md bg-slate-100' value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
                            <option value="">Select Patient</option>
                            {patientsList.map(patient => (
                                <option key={patient.PatientID} value={patient.PatientID}>{patient.PatientID}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='text-slate-600 text-sm font-medium mt-9 max-md:max-w-full ml-10'>Quantity</div>
                <input type="number" className='justify-center items-start py-3 pr-16 pl-4 mt-3 text-base leading-4 text-gray-500 whitespace-nowrap rounded-md bg-slate-100 max-md:pr-5 w-[400px] ml-10' value={quantity} onChange={(e) => setQuantity(e.target.value)} />

                <div className='text-slate-600 text-sm font-medium mt-9 max-md:max-w-full ml-10'>Price</div>
                <input type="number" className='justify-center items-start py-3 pr-16 pl-4 mt-3 text-base leading-4 text-gray-500 whitespace-nowrap rounded-md bg-slate-100 max-md:pr-5 w-[400px] ml-10' value={selectedItemPrice} onChange={(e) => setSelectedItemPrice(e.target.value)}  readOnly />

                <button className='top-[13px] ml-10 rounded items-center justify-start py-2 px-4 border-[1px] border-solid border-royalblue w-28 mt-3 gap-[6px] leading-[10px] font-medium bg-btn text-white' type="submit"  onClick={handleAddItem}>Add Item</button>
              
                <p style={{ color: 'red', marginLeft: '10px' }}>{errorMessage}</p>
               
            </form>
            <button className='top-[410px] ml-10 rounded items-center justify-start py-2 px-4 border-[1px] border-solid border-royalblue w-36 mt-3 gap-[6px] leading-[10px] left-[880px]  absolute font-medium bg-btn text-white' type="submit" onClick={handleGenerateBill} > Generate Bill</button>
        </div>
    );
};

export default BillDetails;
