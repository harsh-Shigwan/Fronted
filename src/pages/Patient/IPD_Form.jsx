import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate , useParams } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../../assets/API_URL';
import Breadcrumb from '../../components/Breadcrumb';
import { colors } from '@mui/material';
const IPD_Form = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [beds, setBeds] = useState([]);
  const [selectedWardId, setSelectedWardId] = useState(""); 
  const [selectedPatient, setSelectedPatient] = useState("");
  const [ wardInput , setWardInput] = useState("");
  const [ patientInput , setPatientInput] = useState("");
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [ showBedDropdown, setShowBedDropdown] = useState(false);
  const [showWardDropdown, setShowWardDropdown] = useState(false);
  const [wardsData, setWardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { pk } = useParams();
  const [error, setError] = useState(null);
  const token =  JSON.parse(localStorage.getItem("Token"))
  const [ formData , setFormData]= useState({
    patient: "",
    admission_id: "",
    ward_type: "",
    bed: "",
    number: "",
    doctor: "",
    ward: "",
    admission_date: "",
    discharge_date:" ",
    is_discharged:""

  }); //1st
  const navigate = useNavigate(); //2nd
  const handle =()=>{
    navigate("/Patient/IPD")
  }
  const handleChange = (event) => {
    setShowBedDropdown(true);
    console.log("Selected bed value:", event.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };
  const handlePatientInputChange = (e) => {
    setPatientInput(e.target.value);
    setSelectedPatient("");
    setShowPatientDropdown(true);
  };
  const handleWardInputChange = (e) => {
    setWardInput(e.target.value);
    setSelectedWardId("");
    setShowWardDropdown(true);
  }
  const handlePatientSelect = (patient) => {
    setPatientInput(patient.FirstName);
    setSelectedPatient(patient.PatientID);
    setShowPatientDropdown(false);
  };

  const handleWardSelect = (event) => {
    setWardInput(event.name);
    setSelectedWardId(event.id);
    setShowWardDropdown(false);
  }
  const handleSubmit = () => {
    console.log('Form Data Submitted:', formData);
    axios.post(`${baseURL}/api/ipd/ipd-registrations/`, formData , {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        console.log('API Response:', response.data);
        navigate('/Patient/IPD');
      })
      .catch((error) => {
        console.error('API Error:', error);
        console.log("Error response data:", error.response?.data);
      });
  };
  useEffect(() => {
    const fetchBeds = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await fetch(`${baseURL}/api/ipd/beds/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("bed data:", data);
  
        // Filter the data based on wardInput
        const filteredBeds = data.filter(bed => bed.ward.name === wardInput);
  
        setBeds(filteredBeds);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
  
    if (wardInput) {
      fetchBeds();
    } else {
      setBeds([]);
    }
  }, [wardInput]);

  console.log("beds:", beds);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        if (selectedPatient.length > 0) {
          const response = await axios.get(
            `${baseURL}/api/patient/api/patients/?search=${selectedPatient}`
            , {
              headers: {
                Authorization: `Token ${token}`,
              },
            });
          setPatients(response.data);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
        console.log("Error response data:", error.response?.data);
      }
    };
    fetchPatients();
  }, [selectedPatient]);
  console.log(selectedPatient)
  console.log(selectedWardId)
  console.log(wardInput)
  useEffect(() => {
    const fetchPatients = async () => {
      try {
         {
          const response = await axios.get(
            `${baseURL}/api/patient/api/patients/`
            , {
              headers: {
                Authorization: `Token ${token}`,
              },
            });
          setPatients(response.data);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
        console.log("Error response data:", error.response?.data);
      }
    };
    fetchPatients();
  }, [selectedPatient]);
  

  useEffect(() => {
    const fetchWards = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/ipd/wards/`
          , {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
        console.log("ward data:", response.data);
        setWardsData(response.data);
      } catch (error) {
        console.error("Error fetching wards:", error);
      }
    };

    fetchWards();
  }, []);
  formData.patient=selectedPatient;
  formData.ward = selectedWardId;
  // const handleWardSelect = (event) => {
  //   setSelectedWardId(event.target.value);
  //   console.log(event.target.value);
  // };
  
  console.log('patient',patients)
return(
  <div>
  <fieldset>
    <form
      className="items-stretch w-[1100px] bg-slate-50 flex flex-col pt-5 pb-12 px-8 max-md:px-5"
      onSubmit={handleSubmit}
    >
      <div className="items-stretch bg-white flex flex-col justify-center py-1.5 max-md:max-w-full">
        <div className="flex flex-col justify-center pl-7 pr-16 py-2 items-start max-md:max-w-full max-md:px-5">
          <div className="backdrop-blur-[5px]  flex   max-w-full items-stretch justify-between gap-5 pl-4 pr-1 py-1.5  rounded-xl">
          <input
          type="text"
          className="flex gap-5 justify-between w-[500px] p-4 mt-2 text-base leading-4 text-gray-500 rounded-md bg-slate-100"
          onChange={handlePatientInputChange}
          onFocus={() => setShowPatientDropdown(true)}
          onBlur={() => setTimeout(() => setShowPatientDropdown(false), 100)}
          value={patientInput}
          placeholder="Type or select the patient"
        /> {showPatientDropdown && (
          <div className="flex flex-col  max-h-48 overflow-y-auto bg-white border border-gray-300  w-[493px]	position: absolute text-slate-600  font-medium  mt-[86px]  rounded-md">
            {patients
              .filter((patient) =>
                patient.FirstName.toLowerCase().includes(patientInput.toLowerCase())||
              patient.PatientID.toString().toLowerCase().includes(patientInput.toLowerCase())
              )
              .map((patient) => (
                <div
                  key={patient.PatientID}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onMouseDown={() => handlePatientSelect(patient)}
                >
                 {patient.PatientID}   {patient.FirstName}
                </div>
              ))}
          </div>
        )}
          </div>
        </div>
      </div>
      <div className="items-stretch bg-white flex flex-col mt-8 pb-7 px-7 max-md:max-w-full max-md:px-5">
        <div className="max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
              <div className="items-stretch flex grow flex-col pt-7 max-md:max-w-full max-md:mt-10">
                <div className="text-slate-600 text-sm font-medium max-md:max-w-full mt-8">
                  Full name
                </div>
                <div className=" ">
                  <div className=" text-gray-500 border-transparent text-base font-medium leading-4 bg-slate-100 justify-center mt-3 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full h-[50px] max-md:pr-5">
                   {patientInput}
                  </div>
                </div>

                <div className="text-slate-600 text-sm font-medium mt-8 max-md:max-w-full">
                  Bed number
                </div>
                {beds.length === 0 ? (
                  <div className="text-gray-500 border-transparent text-base font-medium leading-4 bg-slate-100 justify-center mt-4 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5">Please select the ward  --> </div>
                ):(
                  <select
                    className="flex gap-5 justify-between w-[500px] p-4 mt-2 text-base leading-4 text-gray-500 rounded-md bg-slate-100"
                    name="bed"
                    onChange={handleChange}
                    value={formData.bed}
                  >
                    {beds.map(
                      (bed, index) =>
                        bed.is_available && (
                          <option className='className="flex flex-col  max-h-48 overflow-y-auto bg-white border border-gray-300  w-[493px]	position: absolute text-slate-600  font-medium  mt-[86px]  rounded-md"' key={bed.id} value={bed.id}>
                            {index + 1}
                          </option>
                        )
                    )}
                  </select>
                )}
                
              </div>
            </div>
            <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
              <div className="items-stretch flex flex-col pt-7 max-md:max-w-full max-md:mt-10"><div className="text-slate-600 text-sm font-medium mt-8 max-md:max-w-full">
              Date of arrival
            </div>
            <input
              className="text-gray-500 border-transparent text-base font-medium leading-4 bg-slate-100 justify-center mt-3 pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5"
              type="date"
              name="admission_date"
              onChange={handleChange}
              placeholder="Enter date"
              value={formData.admission_date}
            ></input>
                <div className="text-slate-600 text-sm font-medium mt-8 max-md:max-w-full">
                  Ward number
                </div>
                <input
          type="text"
          className="flex gap-5 justify-between w-[500px] p-4 mt-2 text-base letext-gray-500 border-transparent text-base font-medium leading-4 bg-slate-100 text-slate-600     pl-4 pr-16 py-4 rounded-md items-start max-md:max-w-full max-md:pr-5"
          onChange={handleWardInputChange}
          onFocus={() => setShowWardDropdown(true)}
          onBlur={() => setTimeout(() => setShowWardDropdown(false), 100)}
          value={wardInput}
          placeholder="Type or select the ward"
        /> {showWardDropdown && (
          <div className="flex flex-col  max-h-48 overflow-y-auto bg-white border border-gray-300  w-[493px]	position: absolute text-slate-600  font-medium  mt-[230px]  rounded-md">
            {wardsData
              .filter((ward) =>
                ward.name.toLowerCase().includes(wardInput.toLowerCase())
              )
              .map((ward) => (
                <div
                  key={ward.id}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onMouseDown={() => handleWardSelect(ward)}
                >
                  {ward.name}
                </div>
              ))}
          </div>
        )}
               
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-stretch justify-between gap-5 mt-32 self-end">
          <Link to={"/Patient/IPD"} className="text-blue-700 text-base font-semibold leading-4 items-stretch border grow justify-center px-8 py-4 rounded-lg border-solid border-blue-700 max-md:px-5">
            Cancel
          </Link>
          <button
            className="text-white text-base font-semibold leading-4 items-stretch border border-[color:var(--Theme-Primary-Default,#4C6FFF)] bg-blue-700 grow justify-center px-7 py-4 rounded-lg border-solid max-md:px-5"
            type="submit"
            onClick={() => {
              handleSubmit(); // Manually call the submit function
              handle(); // Call any other functions if needed
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  </fieldset>
</div>
  )
}

export default IPD_Form
