import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Plus from "../../Data/Plus.svg";
import download from "../../Data/download.svg";
import searchIcon from "../../Data/carbon_search.svg";
import edit from "../../Data/edit.svg";
import baseURL from "../../assets/API_URL";
import generatePDF from "react-to-pdf";
import { format } from "date-fns";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";

const Appointment = () => {
  const appointmentsAPI = `${baseURL}/api/appointment/appointments/`;
  const patientsAPI = `${baseURL}/api/patient/api/patients/`;
  const DoctorAPI = `${baseURL}/doctor/api/doctors/`;
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [isError, setIsError] = useState("");
  const token = JSON.parse(localStorage.getItem("Token"));

  const fetchData = async () => {
    try {
      const appointmentsResponse = await axios.get(appointmentsAPI, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const patientsResponse = await axios.get(patientsAPI, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const doctorResponse = await axios.get(DoctorAPI, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });

      // Check each appointment and update status if necessary
      const now = new Date();
      const updatedAppointments = appointmentsResponse.data.map(appointment => {
        const timeSlotDate = new Date(appointment.time_slot);
        if (timeSlotDate < now && appointment.status !== "completed") {
          // Update status to "completed"
          axios.put(`${appointmentsAPI}${appointment.id}/`, 
            { ...appointment, status: "completed" },
            { headers: { Authorization: `Token ${token}` } }
          ).catch(error => console.error("Error updating status:", error));
          return { ...appointment, status: "completed" };
        }
        return appointment;
      });

      setDoctor(doctorResponse.data);
      setAppointments(updatedAppointments);
      setPatients(patientsResponse.data);
    } catch (error) {
      setIsError(error.toJSON().message);
    }
  };

  async function deleteData(id) {
    const deleteUrl = `${baseURL}/api/appointment/appointments/${id}/`;
    try {
      const response = await axios.delete(deleteUrl, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      alert("Data deleted successfully:", response.data);
      setAppointments((prevData) =>
        prevData.filter((row) => row.id !== id)
      );
    } catch (error) {
      console.error("Error deleting data:", error);
      console.log("Error response data:", error.response?.data);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();
  const handle = () => {
    navigate("/Appointment/Appointment_form");
  };

  const handlechangepage = (event, newpage) => {
    setPage(newpage);
  };

  const handleRowPerPage = (event) => {
    setRowPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [page, setPage] = useState(0);
  const [rowperpage, setRowPerPage] = useState(10);
  const targetRef = useRef();
  const [search, setSearch] = useState("");
  const DoctorMap = doctor.reduce((map, doctor) => {
    map[doctor.DoctorID] = doctor.name;
    return map;
  }, {})
  const patientMap = patients.reduce((map, patient) => {
    map[patient.PatientID] = patient.fullname;
    return map;
  }, {});

  return (
    <div>
      <Breadcrumb />
      <div className="w-[1000px] ml-[70px] mt-0 relative bg-whitesmoke h-[984px] flex flex-col items-center justify-start pt-0 px-[30px] pb-[30px] box-border text-left text-xs text-f2d3d font-table-body-heading">
        <div className="flex flex-col items-center justify-start pt-5 px-0 pb-0">
          <div className="h-[692px] flex flex-col items-start justify-start">
            <div className="w-[1110px] relative bg-theme-white-default shrink-0">
              <div className="absolute top-[0px] left-[0px] w-[1110px] flex flex-col items-start justify-start">
                <div className="self-stretch relative h-[60px] overflow-hidden shrink-0">
                  <div className="absolute w-full top-[60px] right-[0px] left-[0px] bg-gray-200 box-border h-0 border-t-[1px] border-solid border-border-light" />
                  <div className="absolute top-[18px] left-[22px] text-[20px] leading-[24px] font-medium">
                    Appointment
                  </div>
                  <input
                    className="absolute top-[11px] pl-3 left-[588px] rounded-[30px] bg-theme-white-default box-border w-[161px] h-[38px] border-[1px] border-solid border-black"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="absolute top-[18px] left-[600px] h-[23.75px] flex flex-row ml-28 items-start justify-start">
                    <img
                      className="w-5 relative h-5 overflow-hidden shrink-0"
                      alt="Search"
                      src={searchIcon}
                    />
                  </div>

                  <button
                    className="absolute top-[11px] left-[937px] rounded-md bg-theme-primary-dark w-[156px] flex flex-col items-start justify-start py-2.5 px-5 h-10 box-border text-theme-white-default"
                    onClick={handle}
                  >
                    <div className="w-40 my-0 mx-[!important] absolute top-[10px] left-[10px] flex flex-row items-center justify-start gap-[8px] z-[0]">
                      <img className="w-5 relative h-5 object-cover" alt="Add" src={Plus} />
                      <div className="relative font-semibold">Add Appointment</div>
                    </div>
                  </button>
                  <button
                    className="absolute top-[11px] left-[765px] rounded-md h-10 bg-theme-white-default box-border w-[156px] flex flex-col items-start justify-start py-2.5 px-5 text-theme-primary-dark border-[1px] border-solid border-theme-primary-dark"
                    onClick={() =>
                      generatePDF(targetRef, {
                        filename: "Appointment list.pdf",
                      })
                    }
                  >
                    <div className="w-24 my-0 mx-[!important] absolute top-[calc(50%_-_8px)] left-[calc(50%_-_48px)] flex flex-row items-center justify-start gap-[8px] z-[0]">
                      <img className="w-4 relative h-4 overflow-hidden shrink-0" alt="Download" src={download} />
                      <div className="relative font-semibold">Download</div>
                    </div>
                  </button>
                </div>
                <div className="self-stretch h-[572px] bg-white overflow-hidden shrink-0 items-start justify-start text-text-body-light">
                  <page>
                    <TableContainer ref={targetRef}>
                      <Table>
                        <TableHead className="bg-indigo-100 w-full">
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Patient</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time Slot</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Doctor</TableCell>
                            <TableCell></TableCell>
                            <TableCell>Action</TableCell> 
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {appointments
                            .slice(page * rowperpage, page * rowperpage + rowperpage)
                            .reverse().filter((item) => {
                              const tosearch = search.toLowerCase();
                              const idString = item.id ? String(item.id) : '';
                              const timeSlotString = item.time_slot ? String(item.time_slot).toLowerCase() : '';
                              const statusString = item.status ? String(item.status).toLowerCase() : '';
                              const patientName = patientMap[item.patient] ? patientMap[item.patient].toLowerCase() : '';
                              const doctorString = DoctorMap[item.doctor] ? String(item.doctor).toLowerCase() : '';

                              return (
                                tosearch === "" ||
                                idString.includes(tosearch) ||
                                timeSlotString.includes(tosearch) ||
                                statusString.includes(tosearch) ||
                                patientName.includes(tosearch) ||
                                doctorString.includes(tosearch)
                              );
                            })
                            .map((user , index) => (
                              <TableRow key={user.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{patientMap[user.patient] || 'Unknown'}</TableCell>
                                <TableCell>{format(new Date(user.time_slot), 'dd-MM-yyyy')}</TableCell>
                                <TableCell>{format(new Date(user.time_slot), 'HH:mm')}</TableCell>
                                <TableCell>{user.status}</TableCell>
                                <TableCell>{DoctorMap[user.doctor]}</TableCell>
                                <TableCell></TableCell>
                                <div className="w-[250px] relative  bg-white h-[52px] overflow-hidden shrink-0 shadow-[0px_-1px_0px_#edf2f7_inset] ">
                                  <img
                                    className="absolute top-[calc(50%_-_12px)] left-[24px] w-6 h-6 hidden"
                                    alt=""
                                    src=""
                                  />
                                  <Link to={`Appointment_form/Appoointment_schedule/${user.id}`}>
                                    <img
                                      className="absolute top-[calc(50%_-_12px)] left-[21px] w-6 h-6 overflow-hidden"
                                      alt=""
                                      src={edit}
                                    />
                                  </Link>
                                  <button
                                    className="absolute top-[13px] left-[91px] rounded flex flex-col items-center justify-start py-2 px-4 border-[1px] border-solid border-royalblue"
                                    onClick={() => deleteData(user.id)}
                                  >
                                    <div className="flex flex-row items-center justify-start gap-[6px]">
                                      <img
                                        className="w-2.5 relative h-2.5 hidden"
                                        alt=""
                                        src="/icon.svg"
                                      />
                                      <div className="relative leading-[10px] font-medium">
                                        Delete
                                      </div>
                                    </div>
                                  </button>
                                </div>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                      <TablePagination
                        count={appointments.length}
                        page={page}
                        rowsPerPage={rowperpage}
                        component="div"
                        onPageChange={handlechangepage}
                        onRowsPerPageChange={handleRowPerPage}
                      />
                    </TableContainer>
                  </page>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
