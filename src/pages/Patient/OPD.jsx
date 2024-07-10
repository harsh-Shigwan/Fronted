import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Plus from "../../Data/Plus.png";
import download from "../../Data/download.png";
import search from "../../Data/search.png";
import edit from "../../Data/edit.png";
import generatePDF from "react-to-pdf";
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
import baseURL from "../../assets/API_URL";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";

const OPD = () => {
  const API = `${baseURL}/api/opd/api/opd-register/`;
  const patientsAPI = `${baseURL}/api/patient/api/patients/`;
  const DoctorAPI = `${baseURL}/doctor/api/doctors/`;
  const [myData, setMyData] = useState([]);
  const [patients, setPatients] = useState([]);
  const [ Doctor, setDoctor] = useState([]);
  const [isError, setIsError] = useState("");
  const { pk } = useParams();
  const token = JSON.parse(localStorage.getItem("Token"));
  const navigate = useNavigate();

  const getApiData = async () => {
    try {
      const res = await axios.get(API, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const patientRes = await axios.get(patientsAPI, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const doctorRes = await axios.get(DoctorAPI, {
        headers: {
          Authorization: `Token ${token}`,
        }
      })
      setMyData(res.data);
      setPatients(patientRes.data);
      setDoctor(doctorRes.data);
    } catch (error) {
      setIsError(error.toJSON().message);
    }
  };

  async function deleteData(visit_id) {
    const deleteUrl = `${baseURL}/opd/api/opd-register/${visit_id}/`;
    try {
      const response = await axios.delete(deleteUrl, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log("Data deleted successfully:", response.data);
      setMyData((prevData) =>
        prevData.filter((row) => row.visit_id !== visit_id)
      );
    } catch (error) {
      console.error("Error deleting data:", error);
      console.log("Error response data:", error.response?.data);
    }
  }

  useEffect(() => {
    getApiData();
  }, []);

  const handleAddPatient = () => {
    navigate("/Patient/OPD/AddPatient");
  };

  const handlePDFDownload = () => {
    generatePDF(targetRef, {
      filename: "Outpatient Department List.pdf",
    });
  };

  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(6);
  const targetRef = useRef();
  const [search, setSearch] = useState("");

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Create a mapping of PatientID to FirstName
  const patientMap = patients.reduce((map, patient) => {
    map[patient.PatientID] = patient.FirstName;
    return map;
  }, {});

  const doctorMap =  Doctor.reduce((map, doctor) => {
    map[doctor.DoctorID] = doctor.name;
    return map;
  } , {})
  return (
    <div>
      <Breadcrumb></Breadcrumb>
      <div className="w-[1000px] ml-[55px] mt-0 relative bg-whitesmoke h-[984px] flex flex-col items-center justify-start pt-0 px-[30px] pb-[30px] box-border text-left text-xs text-f2d3d font-table-body-heading">
        <div className="flex flex-col items-center justify-start pt-5 px-0 pb-0">
          <div className="h-[692px] flex flex-col items-start justify-start">
            <div className="w-[1110px] relative bg-theme-white-default h-[692px] overflow-hidden shrink-0">
              <div className="absolute top-[0px] left-[0px] w-[1110px] flex flex-col items-start justify-start">
                <div className="self-stretch relative h-[60px] overflow-hidden shrink-0">
                  <div className="absolute w-full top-[60px] right-[0px] left-[0px] bg-gray-200 box-border h-0 border-t-[1px] border-solid border-border-light" />
                  <div className="absolute top-[18px] left-[22px] text-[20px] leading-[24px] font-medium">
                    Outpatient Department.
                  </div>
                  <input
                    className="absolute top-[11px] left-[588px] rounded-[30px] bg-theme-white-default box-border w-[161px] h-[38px] border-[1px] border-solid pl-5 text-[15px] border-black"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="absolute top-[18px] left-[600px] h-[23.75px] flex flex-row ml-28 items-start justify-start">
 
                  </div>
                  <button
                    className="absolute top-[11px] left-[937px] rounded-md bg-theme-primary-dark w-[156px] flex flex-col items-start justify-start py-2.5 px-5 h-10 box-border text-theme-white-default"
                    onClick={handleAddPatient}
                  >
                    <div className="w-24 my-0 mx-[!important] absolute top-[10px] left-[30px] flex flex-row items-center justify-start gap-[8px] z-[0]">
                      <img
                        className="w-5 relative h-5 object-cover"
                        alt=""
                        src={Plus}
                      />
                      <div className="relative text-[12px] font-semibold">
                        Add Patient
                      </div>
                    </div>
                  </button>
                  <button
                    className="absolute top-[11px] left-[765px] rounded-md h-10 bg-theme-white-default box-border w-[156px] flex flex-col items-start justify-start py-2.5 px-5 text-theme-primary-dark border-[1px] border-solid border-theme-primary-dark"
                    onClick={handlePDFDownload}
                  >
                    <div className="w-24 my-0 mx-[!important] absolute top-[calc(50%-_8px)] left-[calc(50%-_48px)] flex flex-row items-center justify-start gap-[8px] z-[0]">
                      <img
                        className="w-4 relative h-4 overflow-hidden shrink-0"
                        alt=""
                        src={download}
                      />
                      <div className="relative font-semibold">Download</div>
                    </div>
                  </button>
                </div>
                <div className="self-stretch h-[572px] overflow-hidden shrink-0 items-start justify-start text-text-body-light">
                  <TableContainer ref={targetRef}>
                    <Table>
                      <TableHead className="bg-indigo-100 w-full">
                        <TableRow>
                          <TableCell>Visit ID</TableCell>
                          <TableCell>Visit Date</TableCell>
                          <TableCell>Department</TableCell>
                          <TableCell>Patient Name</TableCell>
                          <TableCell>Doctor ID</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {myData.filter((item) => {
                          const searchLowerCase = search.toLowerCase();
                          const visitIdString = String(item.visit_id);
                          const visitDateString = item.visit_date;
                          const departmentString = item.department;
                          const patientName = patientMap[item.patient_id]
                            ? patientMap[item.patient_id].toLowerCase()
                            : "";
                          const doctorName = doctorMap[item.doctor_id]
                            ? doctorMap[item.doctor_id].toLowerCase()
                            : "";

                          return (
                            searchLowerCase === "" ||
                            visitIdString.includes(searchLowerCase) ||
                            visitDateString.includes(searchLowerCase) ||
                            departmentString.includes(searchLowerCase) ||
                            patientName.includes(searchLowerCase) ||
                            doctorName.includes(searchLowerCase)
                          );
                        })
                          .slice(
                            page * rowPerPage,
                            page * rowPerPage + rowPerPage
                          )
                          .map((user) => (
                            <TableRow key={user.visit_id}>
                              <TableCell>
                                {user.visit_id}
                              </TableCell>
                              <TableCell >
                                {user.visit_date}
                              </TableCell>
                              <TableCell >
                                {user.department}
                              </TableCell>
                              <TableCell >
                                {patientMap[user.patient_id]}
                              </TableCell>
                              <TableCell >
                                {doctorMap[user.doctor_id]}
                              </TableCell>
                              <TableCell >
                                <div className="w-[250px] relative bg-theme-white-default shadow-[0px_-1px_0px_#edf2f7_inset] h-[52px] overflow-hidden shrink-0">
                                  <img
                                    className="absolute top-[calc(50%-_12px)] left-[24px] w-6 h-6 hidden"
                                    alt=""
                                    src=""
                                  />
                                  <Link to={`OPD_edit/${user.visit_id}`}>
                                    <img
                                      className="absolute top-[calc(50%-_12px)] left-[21px] w-6 h-6 overflow-hidden"
                                      alt=""
                                      src={edit}
                                    />
                                  </Link>
                                  <button
                                    className="absolute top-[13px] left-[91px] rounded flex flex-col items-center justify-start py-2 px-4 border-[1px] border-solid border-royalblue"
                                    onClick={() => deleteData(user.visit_id)}
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
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                    <TablePagination
                      count={myData.length}
                      page={page}
                      rowsPerPage={rowPerPage}
                      component="div"
                      onPageChange={handlePageChange}
                      onRowsPerPageChange={handleRowsPerPageChange}
                    ></TablePagination>
                  </TableContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OPD;
