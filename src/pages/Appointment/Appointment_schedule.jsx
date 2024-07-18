import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumb from '../../components/Breadcrumb';
import baseURL from '../../assets/API_URL';
import CustomDropdown from '../../components/CustomDropdown';
import { Link, useParams } from 'react-router-dom';

const AppointmentSchedule = () => {
  const { pk } = useParams();
  const [selectedPatient, setSelectedPatient] = useState('');
  const [patientInput, setPatientInput] = useState('');
  const [patientsList, setPatientsList] = useState([]);
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [doctorInput, setDoctorInput] = useState('');
  const [doctorList, setDoctorList] = useState([]);
  const [showDoctorDropdown, setShowDoctorDropdown] = useState(false);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [status, setStatus] = useState('');
  const token = JSON.parse(localStorage.getItem('Token'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/appointment/appointments/${pk}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const patientResponse = await axios.get(`${baseURL}/patient/api/patients/${response.data.patient}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setSelectedPatient(response.data.patient);
        setPatientInput(patientResponse.data.fullname);
        setSelectedDoctor(response.data.doctor);
        setDate(response.data.date);
        setTimeSlot(response.data.time_slot);
        setStatus(response.data.status);
      } catch (error) {
        console.error('Error fetching appointment data:', error);
      }
    };

    fetchData();
  }, [pk]);

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

    axios
      .get(`${baseURL}/doctor/api/doctors/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setDoctorList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  }, [token]);

  const handlePatientInputChange = (e) => {
    setPatientInput(e.target.value);
  };

  const handleDoctorInputChange = (e) => {
    setDoctorInput(e.target.value);
    setSelectedDoctor('');
  };

  const handlePatientSelect = (patient) => {
    setPatientInput(patient.fullname);
    setSelectedPatient(patient.PatientID);
    setShowPatientDropdown(false);
  };

  const handleDoctorSelect = (doctor) => {
    setDoctorInput(doctor.name);
    setSelectedDoctor(doctor.DoctorID);
    setShowDoctorDropdown(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(
        `${baseURL}/api/appointment/appointments/${pk}/`,
        {
          patient: selectedPatient,
          doctor: selectedDoctor,
          date: date,
          time_slot: timeSlot, // Ensure formattedTimeSlot is correctly defined if needed
          status: status,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log('Appointment updated successfully!');
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  // Function to add minutes to a given time string (HH:mm)
  

  const statusOptions = [
    { value: '', label: 'Select the option' },
    { value: 'pending', label: 'Pending' },
    { value: 'booked', label: 'Booked' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div>
      <Breadcrumb />
      <form className="flex flex-col w-[1120px] px-6 pb-12 font-medium bg-slate-50 max-md:px-5" onSubmit={handleSubmit}>
        <div className="flex flex-col pt-6 pb-12 bg-white max-md:max-w-full">
          <div className="self-start ml-7 text-xl leading-6 whitespace-nowrap text-slate-800 max-md:ml-2.5">
            Appointment Form
          </div>
          <div className="shrink-0 mt-5 h-px bg-slate-100 max-md:max-w-full" />
          <div className="flex flex-col px-7 mt-6 max-md:px-5 max-md:max-w-full">
            <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
              <div className="flex mt-1 flex-col flex-1 self-start">
                <div className="text-sm text-slate-600">Patient Name *</div>
                <input
                  type="text"
                  className="flex gap-5 justify-between p-4 mt-2 text-base leading-4 text-gray-500 rounded-md bg-slate-100"
                  onChange={handlePatientInputChange}
                  onFocus={() => setShowPatientDropdown(true)}
                  value={patientInput}
                  placeholder="Type or select the patient"
                />
                {showPatientDropdown && (
                  <div className="flex flex-col max-h-48 overflow-y-auto bg-white border border-gray-300 w-[500px] position: absolute text-slate-600 mt-[86px] rounded-md">
                    {patientsList
                      .filter((patient) =>
                        patient.fullname.toLowerCase().includes(patientInput.toLowerCase())||
                      patient.PatientID.toString().toLowerCase().includes(patientInput.toLowerCase())
                      )
                      .map((patient) => (
                        <div
                          key={patient.PatientID}
                          className="p-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handlePatientSelect(patient)}
                        >
                        {patient.PatientID} {patient.fullname}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
                <div className="text-sm text-slate-600">Doctor Name *</div>
                <input
                  type="text"
                  className="flex gap-5 justify-between p-4 mt-2 text-base leading-4 text-gray-500  rounded-md bg-slate-100 "
                  onChange={handleDoctorInputChange}
                  onFocus={() => setShowDoctorDropdown(true)}
               //   onBlur={() => setTimeout(() => setShowDoctorDropdown(false), 100)}
                  value={doctorInput}
                  placeholder="Type or select the doctor"
                />
                {showDoctorDropdown && (
                  <div className="flex flex-col mt-[86px]  max-h-48 overflow-y-auto bg-white border border-gray-300  w-[500px]	position: absolute text-slate-600  rounded-md">
                    {doctorList
                      .filter((doctor) =>
                        doctor.name.toLowerCase().includes(doctorInput.toLowerCase())
                      )
                      .map((doctor) => (
                        <div
                          key={doctor.DoctorID}
                          className="p-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleDoctorSelect(doctor)}
                        >
                          {doctor.name}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-5 justify-between mt-8 max-md:flex-wrap max-md:max-w-full">
              <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
                <div className="text-sm text-slate-600 max-md:max-w-full">Date*</div>
                <input
                  className="justify-center items-start py-4 pr-16 pl-4 mt-3 text-base leading-4 text-gray-500 whitespace-nowrap rounded-md bg-slate-100 max-md:pr-5 max-md:max-w-full"
                  name="date"
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  placeholder="enter date"
                />
              </div>
              <div className="flex flex-col flex-1 py-0.5 max-md:max-w-full">
                <div className="text-sm text-slate-600 max-md:max-w-full">Time Slot*</div>
                <input
                  className="justify-center items-start py-4 pr-16 pl-4 mt-2 text-base leading-4 text-gray-500 whitespace-nowrap rounded-md bg-slate-100 max-md:pr-5 max-md:max-w-full"
                  name="time_slot"
                  type="text"
                  onChange={(e) => setTimeSlot(e.target.value)}
                  value={timeSlot}
                  placeholder="enter the time slot"
                />
              </div>
            </div>

            <div className="flex gap-5 justify-between mt-8 max-md:flex-wrap w-[500px]">
              <div className="flex flex-col flex-1 self-start max-md:max-w-full">
                <div className="text-sm text-slate-600 max-md:max-w-full">Status</div>
                <CustomDropdown
              options={statusOptions}
              value={status}
              onChange={setStatus}
            />
              </div>
            </div>
          </div>
          <div className="flex gap-5 justify-between self-end mt-14 mr-8 mb-9 text-base font-semibold leading-4 whitespace-nowrap max-md:mt-10 max-md:mr-2.5">
            <Link to="/Appointment" className="grow justify-center px-8 py-4 text-blue-700 rounded-lg border border-blue-700 border-solid max-md:px-5">Cancel</Link>
            <button className="grow justify-center px-10 py-4 text-white bg-blue-700 rounded-lg border border-solid border-[color:var(--Theme-Primary-Default,#4C6FFF)] max-md:px-5" type="submit">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppointmentSchedule;
