import React, { useState, useEffect } from "react";
import axios from "axios";
import baseURL from "../../../assets/API_URL";
import DoctorDropDown from "../../../components/DropDown/DoctorDropDown";

const VisitDetail = ({ addItem, patientId }) => {
  const [itemName, setItemName] = useState("");
  const [doctorList, setDoctorList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [doctorInput, setDoctorInput] = useState("");
  const [showDoctorDropdown, setShowDoctorDropdown] = useState(false);
  const [totalVisits, setTotalVisits] = useState("");
  const [price, setPrice] = useState("");

  const DoctorAPI = `${baseURL}/doctor/api/doctors/`;
  const VisitDoctorAPI = `${baseURL}/patient/api/patient-doctorvists/`;
  const token = JSON.parse(localStorage.getItem("Token"));

  const fetchData = async () => {
    try {
      const response = await axios.get(DoctorAPI, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setDoctorList(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDoctorInputChange = (e) => {
    setDoctorInput(e.target.value);
    setSelectedDoctor("");
    setShowDoctorDropdown(true);
  };

  const handleDoctorSelect = (doctor) => {
    setDoctorInput(doctor.name);
    setSelectedDoctor(doctor.DoctorID);
    setShowDoctorDropdown(false);
  };

  const handleAddItem = async () => {
    // Debugging: Log values before API call
    console.log("Adding item with details:", {
      patientId,
      selectedDoctor,
      totalVisits,
      price,
    });

    // Check if required fields are filled
    if (!patientId || !selectedDoctor || !totalVisits || !price) {
      console.error("Error: Missing required fields.");
      return;
    }

    const item = {
      patient: patientId,
      doctor: selectedDoctor,
      total_visits: totalVisits,
      date: new Date().toISOString().split("T")[0],
      price: price,
    };

    try {
      const response = await axios.post(VisitDoctorAPI, item, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log("Item added successfully:", response.data);
      addItem(item);
    } catch (error) {
      console.error("Error adding item:", error);
      console.log("Error response data:", error.response?.data);
    }
  };

  return (
    <div className="ml-10 mt-8">
      <div className="flex gap-5 justify-between max-md:flex-wrap">
        <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
          <div className="text-sm text-slate-600 font-medium max-md:max-w-full">
            Select Doctor Name
          </div>
          <input
            type="text"
            className="flex gap-5 justify-between p-4 mt-2 text-base leading-4 text-gray-500 rounded-md bg-slate-100"
            onChange={handleDoctorInputChange}
            onFocus={() => setShowDoctorDropdown(true)}
            onBlur={() => setTimeout(() => setShowDoctorDropdown(false), 100)}
            value={doctorInput}
            placeholder="Type or select the doctor"
          />
          {showDoctorDropdown && (
            <div
              className="flex flex-col mt-[86px] max-h-48 overflow-y-auto bg-white border border-gray-300 w-[453px] absolute text-slate-600 font-medium rounded-md"
              style={{ position: "absolute" }} // Fixed position
            >
              {doctorList
                .filter((doctor) =>
                  doctor.name.toLowerCase().includes(doctorInput.toLowerCase())
                )
                .map((doctor) => (
                  <div
                    key={doctor.DoctorID}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onMouseDown={() => handleDoctorSelect(doctor)}
                  >
                    {doctor.name}
                  </div>
                ))}
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
          <div className="text-sm text-slate-600 font-medium max-md:max-w-full">
            Total Visits
          </div>
          <input
            type="number"
            className="w-[450px] p-4 mt-2 text-base text-gray-500 border-transparent font-medium leading-4 bg-slate-100 rounded-md max-md:pr-5"
            placeholder="Enter days"
            value={totalVisits}
            onChange={(e) => setTotalVisits(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="flex gap-5 justify-between mt-8 max-md:flex-wrap">
        <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
          <div className="text-sm text-slate-600 font-medium max-md:max-w-full mt-8 ml-2">
            Medicine Price
          </div>
          <input
            type="number"
            className="w-[450px] p-4 mt-2 text-base text-gray-500 border-transparent font-medium leading-4 bg-slate-100 rounded-md max-md:pr-5"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full mt-9">
          <button
            onClick={handleAddItem}
            className="h-12 px-4 mt-8 bg-btn text-white rounded-xl items-center justify-start py-2 border-[1px] border-solid border-royalblue w-28 gap-[6px] leading-[10px] font-medium"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisitDetail;
