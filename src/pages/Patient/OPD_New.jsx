import React, { useState, useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import baseURL from "../../assets/API_URL";
import DoctorDropDown from "../../components/DropDown/DoctorDropDown";

const OPD_New = () => {
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
  const [formData, setFormData] = useState({
    department: "",
  });

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
    setPatientInput(patient.fullname);
    setSelectedPatient(patient.PatientID);
    setShowPatientDropdown(false);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, department: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Data Submitted:", { patient_id: selectedPatient, doctor_id: selectedDoctor, formData });

    try {
      const response = await axios.post(
        `${baseURL}/api/opd/api/opd-register/`,
        { patient_id: selectedPatient, doctor_id: selectedDoctor, department: formData.department },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log("API Response:", response.data);
      navigate("/Patient/OPD");
     
    } catch (error) {
      console.error("API Error:", error);
      console.log("Error response data:", error.response?.data);
    }
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/patient/api/patients/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setPatientsList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      });

    axios.get(`${baseURL}/doctor/api/doctors/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }).then((response) => {
      setDoctorList(response.data);
    }).catch((error) => {
      console.error('Error fetching doctors:', error);
    });
  }, [token]);
 
  // console.log("Selected Patient:", selectedPatient);
  // console.log("patient input " , patientInput);
  return (
    <div className="">
      <Breadcrumb />

      <fieldset>
        <form
          onSubmit={handleSubmit}
          className="m-0 w-[1110px] bg-theme-white-default overflow-hidden flex flex-col  py-6 pr-[22px] pl-[26px] box-border gap-[30px] mt-5 "
        >

          <div className="flex flex-col px-7 mt-6 max-md:px-5 max-md:max-w-full">
            <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
              <div className="flex mt-0 mb-5 flex-col flex-1 self-start">
                <div className=" text-slate-600 text-sm font-medium">Select a Patient</div>
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
                  <div className="flex flex-col  max-h-48 overflow-y-auto bg-white border border-gray-300  w-[493px]	position: absolute text-slate-600  font-medium  mt-[86px]  rounded-md">
                    {patientsList
                      .filter((patient) =>
                        patient.fullname.toLowerCase().includes(patientInput.toLowerCase())||
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
              </div>

              <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
                <div className="text-sm text-slate-600 font-medium max-md:max-w-full">
                  Select a Doctor
                </div>
                <div className="flex flex-col flex-1 py-0.5  w-[500px]">
                <DoctorDropDown
                selectedDoctor={selectedDoctor}
                setSelectedDoctor={setSelectedDoctor}
                doctorInput={doctorInput}
                setDoctorInput={setDoctorInput}
                showDoctorDropdown={showDoctorDropdown}
                setShowDoctorDropdown={setShowDoctorDropdown}
              />
              </div>
              </div>
            </div>
            <div className="flex gap-5 justify-between mt-8 max-md:flex-wrap  w-[500px]">
              <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
                <div className="text-sm text-slate-600 font-medium max-md:max-w-full">
                  Department
                </div>
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
            <Link to={"/Patient/OPD"} className="text-blue-700 text-base font-semibold leading-4 items-stretch border grow justify-center px-8 py-4 rounded-lg border-solid border-blue-700 max-md:px-5">
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

export default OPD_New;
