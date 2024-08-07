import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseURL from "../../assets/API_URL";

const BillDetails = ({ onAddItem }) => {
  const [quantity, setQuantity] = useState(1);
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [itemsList, setItemsList] = useState([]);
  const [patientsList, setPatientsList] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemPrice, setSelectedItemPrice] = useState("");
  const [patientInput, setPatientInput] = useState("");
  const [itemsInput, setItemInput] = useState("");
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [showItemDropdown, setShowItemDropdown] = useState(false);
  const [medi, setMedi] = useState([]);
  const token = JSON.parse(localStorage.getItem("Token"));

  const EquipmentAPI = `${baseURL}/inventory/api/equipment/`;
  const FetchData = async () => {
    if (selectedItem) {
      try {
        const response = await axios.get(`${EquipmentAPI}${selectedItem}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setAvailableQuantity(response.data.quantity); // Set available quantity
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }
  };

  useEffect(() => {
    FetchData();
  }, [selectedItem]);

  useEffect(() => {
    axios
      .get(`${baseURL}/inventory/api/equipment/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => setItemsList(response.data))
      .catch((error) => console.error("Error fetching items:", error));

    axios
      .get(`${baseURL}/api/patient/api/patients/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => setPatientsList(response.data))
      .catch((error) => console.error("Error fetching patients:", error));

    axios
      .get(`${baseURL}/inventory/api/medicines/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => setMedi(response.data))
      .catch((error) => console.error("Error fetching medicines:", error));
  }, [token]);

  const handleItemInputChange = (event) => {
    setItemInput(event.target.value);
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item.id);
    setItemInput(item.name);
    setSelectedItemPrice(item.unit_price);
    setShowItemDropdown(false);
  };

  const handlePatientInputChange = (event) => {
    setPatientInput(event.target.value);
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient.PatientID);
    setPatientInput(patient.fullname);
    setShowPatientDropdown(false);
  };

  // const handleSubmit = (event) => {
   
  //   if (quantity > availableQuantity) {
  //     alert(`Quantity cannot be more than available quantity (${availableQuantity})`);
  //     return;
  //   }

  //   if (!selectedItem || !quantity || quantity <= 0 || !selectedPatient) {
  //     setErrorMessage("Please select a valid item, quantity, and patient.");
  //     return;
  //   }

  //   const usage_date = new Date().toISOString();
  //   axios
  //     .post(
  //       `${baseURL}/inventory/api/patient-equipment-usage/`,
  //       {
  //         patient: selectedPatient,
  //         equipment: selectedItem,
  //         quantity_used: quantity,
  //         usage_date: usage_date,
  //         unit_price: selectedItemPrice,
  //       },
  //       {
  //         headers: { Authorization: `Token ${token}` },
  //       }
  //     )
  //     .then((response) => console.log("Item added successfully!"))
  //     .catch((error) => {
  //       console.error("API Error:", error);
  //       console.log("Error response data:", error.response?.data);
  //     });
  // };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!selectedItem || !quantity || !selectedPatient || quantity < 0) {
      setErrorMessage("*Please select an item and patient !!");
      return;
    }
    if (quantity > availableQuantity) {
      alert(`Quantity cannot be more than available quantity (${availableQuantity})`);
      setQuantity(1);
    setAvailableQuantity(0);
   
      return;
    }
    const newItem = {
      patient: selectedPatient,
      equipment: selectedItem,
      quantity_used: quantity,
      purchase_date: new Date().toISOString(),
      unit_price: selectedItemPrice,
    };
    try {
      const response = await axios.post(`${baseURL}/inventory/api/patient-equipment-usage/`, newItem, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      console.log("Item added successfully:", response.data);
    onAddItem(newItem);
   
  } catch (error) {
    console.error("Error adding item:", error);
    console.log("Error response data:", error.response?.data);
  }
  setQuantity(1);
  setAvailableQuantity(0);
 
  
  
  
}

  const navigate = useNavigate();
  const handleGenerateBill = () => {
    if (!selectedPatient) {
      setErrorMessage("*Please select a patient before Proceed further !");
      return;
    }
    navigate(`/Invoice_Generator/medi/${selectedPatient}`);
  };

  return (
    <div>
      <div>
        <div className="flex">
          <div className="h-20 w-80">
            <div className="text-slate-600 text-sm font-medium mt-9 ml-12">
              Select Item
            </div>
            <input
              type="text"
              className="flex gap-5 justify-between font-medium p-4 mt-2 text-base leading-4 text-gray-500 rounded-md bg-slate-100 ml-10 w-[400px]"
              onChange={handleItemInputChange}
              onFocus={() => setShowItemDropdown(true)}
              onBlur={() => setShowItemDropdown(false)}
              value={itemsInput}
              placeholder="Type or select the Items"
            />
            {showItemDropdown && (
              <div className="flex flex-col max-h-48 overflow-y-auto bg-white border border-gray-300 w-[400px] absolute text-slate-600 mt-[8px] rounded-md ml-10 font-medium">
                {itemsList
                  .filter((item) =>
                    item.name.toLowerCase().includes(itemsInput.toLowerCase())
                  )
                  .map((item) => (
                    <div
                      key={item.id}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onMouseDown={() => handleItemSelect(item)}
                    >
                      {item.name}
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div>
            <div className="text-slate-600 text-sm font-medium mt-9 ml-[210px]">
              Select Patient*
            </div>
            <input
              type="text"
              className="flex gap-5 justify-between font-medium p-4 mt-2 text-base leading-4 text-gray-500 rounded-md bg-slate-100 ml-[200px] w-[400px]"
              onChange={handlePatientInputChange}
              onFocus={() => setShowPatientDropdown(true)}
              onBlur={() => setTimeout(() => setShowPatientDropdown(false), 100)}
              value={patientInput}
              placeholder="Type or select the patient"
            />
            {showPatientDropdown && (
              <div className="flex flex-col max-h-48 overflow-y-auto bg-white border border-gray-300 w-[400px] absolute text-slate-600 mt-[8px] rounded-md ml-[200px] font-medium">
                {patientsList
                  .filter((patient) =>
                    patient.fullname.toLowerCase().includes(patientInput.toLowerCase()) ||
                    patient.PatientID.toString().toLowerCase().includes(patientInput.toLowerCase())
                  )
                  .map((patient) => (
                    <div
                      key={patient.PatientID}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onMouseDown={() => handlePatientSelect(patient)}
                    >
                      {patient.PatientID} {patient.fullname}
                    </div>
                  ))}
              </div>
            )}
            <p style={{ color: "red", marginLeft: "210px", marginTop: "5px" }}>
              {errorMessage}
            </p>
          </div>
        </div>
        <div className="flex flex-row">
          <div>
            <div className="text-slate-600 text-sm font-medium mt-9 ml-10">
              Quantity
              <h1 className='text-sm font-normal text-gray-500 ml-[300px]'>
                Available: {availableQuantity}
              </h1>
            </div>
            <input
              type="number"
              className="py-3 pr-16 pl-4 mt-3 font-medium text-base text-gray-500 rounded-md bg-slate-100 w-[400px] ml-10"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <div>
            <div className="text-slate-600 text-sm font-medium mt-9 ml-[92px]">
              Price
            </div>
            <input
              type="number"
              className="py-3 pr-16 pl-4 mt-7 font-medium text-base text-gray-500 rounded-md bg-slate-100 w-[400px] ml-[83px]"
              value={selectedItemPrice}
              onChange={(e) => setSelectedItemPrice(e.target.value)}
              placeholder="Select the Item ->"
              readOnly
            />
          </div>
        </div>
        <div className="flex flex-row mt-9">
          <button
            className="ml-10 rounded-xl h-12 py-2 px-4 border border-royalblue w-28 mt-0 font-medium bg-btn text-white"
            type="submit"
            onClick={handleAddItem}
          >
            Add Item
          </button>
          <button
            className="ml-[8px] h-12 py-2 pr-5 px-4 border border-royalblue rounded-xl w-36 mt-0 font-medium bg-btn text-white"
            type="button"
            onClick={handleGenerateBill}
          >
            Proceed ->
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillDetails
