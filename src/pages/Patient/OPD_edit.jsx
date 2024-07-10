import React, { useState, useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import baseURL from "../../assets/API_URL";

const OPD_edit = () => {
  const { pk } = useParams(); 
  const token = JSON.parse(localStorage.getItem("Token"));
  const [patientsList, setPatientsList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [patientInput, setPatientInput] = useState("");
  const [doctorInput, setDoctorInput] = useState("");
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [showDoctorDropdown, setShowDoctorDropdown] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ department: "" });

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/opd/api/opd-register/${pk}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        
        setSelectedDoctor(response.data.doctor);
        setSelectedPatient(response.data.patient);
        setFormData({ department: response.data.department });
        setPatientInput(response.data.patient.FirstName); 
        setDoctorInput(response.data.doctor.name); 
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    };
    fetchData();
  }, [pk, token]);

 
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${baseURL}/patient/api/patients/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setPatientsList(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${baseURL}/doctor/api/doctors/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setDoctorList(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchPatients();
    fetchDoctors();
  }, [token]);

  
  const handleDoctorInputChange = (e) => {
    setDoctorInput(e.target.value);
    setSelectedDoctor("");
    setShowDoctorDropdown(true);
  };

  const handlePatientInputChange = (e) => {
    setPatientInput(e.target.value);
    setSelectedPatient("");
    setShowPatientDropdown(true);
  };

  
  const handleDoctorSelect = (doctor) => {
    setDoctorInput(doctor.name);
    setSelectedDoctor(doctor.DoctorID);
    setShowDoctorDropdown(false);
  };

  const handlePatientSelect = (patient) => {
    setPatientInput(patient.FirstName);
    setSelectedPatient(patient.PatientID);
    setShowPatientDropdown(false);
  };

  
  const handleChange = (event) => {
    setFormData({ ...formData, department: event.target.value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Data Submitted:", {
      patient_id: selectedPatient,
      doctor_id: selectedDoctor,
      formData,
    });

    try {
      const response = await axios.put(
        `${baseURL}/api/opd/api/opd-register/${pk}/`,
        {
          patient_id: selectedPatient,
          doctor_id: selectedDoctor,
          department: formData.department,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      console.log("API Response:", response.data);
      navigate("/Patient/OPD");
    } catch (error) {
      console.error("API Error:", error);
      console.log("Error response data:", error.response?.data);
    }
  };

  return (
    <div>
      <Breadcrumb />
      <fieldset>
        <form
          onSubmit={handleSubmit}
          className="m-0 w-[1110px] bg-theme-white-default overflow-hidden flex flex-col py-6 pr-[22px] pl-[26px] box-border gap-[30px] mt-5"
        >
          <div className="flex flex-col px-7 mt-6 max-md:px-5 max-md:max-w-full">
            <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
              <div className="flex mt-0 mb-5 flex-col flex-1 self-start">
                <div className="text-slate-600 text-sm font-medium">Select a Patient</div>
                <input
                  type="text"
                  className="flex gap-5 justify-between p-4 mt-2 text-base leading-4 text-gray-500 rounded-md bg-slate-100"
                  onChange={handlePatientInputChange}
                  onFocus={() => setShowPatientDropdown(true)}
                  onBlur={() => setTimeout(() => setShowPatientDropdown(false), 100)}
                  value={patientInput}
                  placeholder="Type or select the patient"
                />
                {showPatientDropdown && (
                  <div className="flex flex-col max-h-48 overflow-y-auto bg-white border border-gray-300 w-[493px] position: absolute text-slate-600 font-medium mt-[86px] rounded-md">
                    {patientsList
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
                        {patient.PatientID} {patient.FirstName}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
                <div className="text-sm text-slate-600 font-medium max-md:max-w-full">Select a Doctor</div>
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
                  <div className="flex flex-col mt-[86px] max-h-48 overflow-y-auto bg-white border border-gray-300 w-[493px] position: absolute text-slate-600 font-medium rounded-md">
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
            </div>
            <div className="flex gap-5 justify-between mt-8 max-md:flex-wrap w-[500px]">
              <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
                <div className="text-sm text-slate-600 font-medium max-md:max-w-full">Department</div>
                <input
                  className="justify-center items-start py-4 pr-16 pl-4 mt-3 text-base leading-4 text-gray-500 whitespace-nowrap rounded-md bg-slate-100 max-md:pr-5 max-md:max-w-full"
                  type="text"
                  placeholder="Enter department"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex items-stretch justify-between gap-5 mt-8 self-end">
            <Link to={"/Patient/OPD"}
              className="text-blue-700 text-base font-semibold leading-4 items-stretch border grow justify-center px-8 py-4 rounded-lg border-solid border-blue-700 max-md:px-5"
            
            >
              Cancel
            </Link>
            <button
              className="text-white text-base font-semibold leading-4 items-stretch border border-[color:var(--Theme-Primary-Default,#4C6FFF)] bg-blue-700 grow justify-center px-7 py-4 rounded-lg border-solid max-md:px-5"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default OPD_edit;
