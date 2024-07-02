import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Plus from "../../Data/Plus.png";
import download from "../../Data/download.png";
import search from "../../Data/search.png";
import edit from "../../Data/edit.png";
import { Link, useNavigate } from "react-router-dom";
import baseURL from "../../assests/API_URL";
import generatePDF from "react-to-pdf";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
} from "@mui/material";
import Breadcrumb from "../../components/Breadcrumb";

const IPD = () => {
  const IPDAPI = `${baseURL}/api/ipd/ipd-registrations/`;
  const patientsAPI = `${baseURL}/api/patient/api/patients/`;
  const WardAPI = `${baseURL}/ipd/wards/`;
  const [myData, setMyData] = useState([]);
  const [patients, setPatients] = useState([]);
  const [ ward , setWard ] = useState([]);
  const token = JSON.parse(localStorage.getItem("Token"));

  const fetchData = async () => {
    try {
      const IpdRes = await axios.get(IPDAPI, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const patinetRes = await axios.get(patientsAPI, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const wardRes = await axios.get(WardAPI, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      setWard(wardRes.data);
      setMyData(IpdRes.data);
      setPatients(patinetRes.data);
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const navigate = useNavigate();
  const handleAddPatient = () => {
    navigate("/Patient/IPD/Add_Patient");
  };

  const handleViewDischargedList = () => {
    navigate("/patient/IPD/Discharged_List/");
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const targetRef = useRef();

  // Create patientMap
  const patientMap = patients.reduce((map, patient) => {
    map[patient.PatientID] = patient.FirstName;
    return map;
  }, {});
  const wardMap = ward.reduce((map, patient) => {
    map[patient.id] = patient.name;
    return map;
  } , {})
  return (
    <div>
      <Breadcrumb />
      <div className="w-[1000px] ml-[70px] mt-0 relative bg-whitesmoke h-[984px] flex flex-col items-center justify-start pt-0 px-[30px] pb-[30px] box-border text-left text-xs text-f2d3d font-table-body-heading">
        <div className="flex flex-col items-center justify-start pt-5 px-0 pb-0">
          <div className="h-[692px] flex flex-col items-start justify-start">
            <div className="w-[1110px] relative bg-theme-white-default h-[692px] overflow-hidden shrink-0">
              <div className="absolute top-[0px] left-[0px] w-[1110px] flex flex-col items-start justify-start">
                <div className="self-stretch relative h-[60px] overflow-hidden shrink-0">
                  <div className="absolute w-full top-[60px] right-[0px] left-[0px] bg-gray-200 box-border h-0 border-t-[1px] border-solid border-border-light" />
                  <div className="absolute top-[18px] left-[22px] text-[20px] leading-[24px] font-medium">
                    In Patient Department
                  </div>
                  <input
                    className="absolute top-[11px] left-[358px] rounded-[30px] bg-theme-white-default box-border w-[161px] h-[38px] border-[1px] border-solid pl-5 border-black"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <div className="absolute top-[18px] left-[500px] h-[23.75px] flex flex-row ml-28 items-start justify-start">
                    <img
                      className="w-5 relative h-5 overflow-hidden shrink-0"
                      alt=""
                      src={search}
                    />
                  </div>

                  <button
                    className="absolute top-[11px] left-[937px] rounded-md bg-theme-primary-dark w-[146px] flex flex-col items-start justify-start py-2.5 px-5 h-10 box-border text-theme-white-default"
                    onClick={handleAddPatient}
                  >
                    <div className="w-22 my-0 mx-[!important] absolute top-[10px] left-[15px] flex flex-row items-center justify-start gap-[8px] z-[0]">
                      <img
                        className="w-5 relative h-5 object-cover"
                        alt=""
                        src={Plus}
                      />
                      <div className="relative font-semibold">
                        Add IPD Patient
                      </div>
                    </div>
                  </button>
                  <button
                    className="absolute top-[11px] left-[717px] rounded-md bg-theme-primary-dark w-[206px] flex flex-col items-start justify-start py-2.5 px-5 h-10 box-border text-theme-white-default"
                    onClick={handleViewDischargedList}
                  >
                    <div className="w-22 my-0 mx-[!important] absolute top-[10px] left-[15px] flex flex-row items-center justify-start gap-[8px] z-[0]">
                      <img
                        className="w-5 relative h-5 object-cover"
                        alt=""
                        src={Plus}
                      />
                      <div className="relative font-semibold">
                        List of Discharged Patient
                      </div>
                    </div>
                  </button>
                  <button
                    className="absolute top-[11px] left-[545px] rounded-md h-10 bg-theme-white-default box-border w-[156px] flex flex-col items-start justify-start py-2.5 px-5 text-theme-primary-dark border-[1px] border-solid border-theme-primary-dark"
                    onClick={() =>
                      generatePDF(targetRef, {
                        filename: "In Patient Department List.pdf",
                      })
                    }
                  >
                    <div className="w-24 my-0 mx-[!important] absolute top-[calc(50% - 8px)] left-[calc(50% - 48px)] flex flex-row items-center justify-start gap-[8px] z-[0]">
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
                  <page>
                    <TableContainer ref={targetRef}>
                      <Table>
                        <TableHead className="bg-indigo-100 w-full">
                          <TableRow>
                            <TableCell>Admission Id</TableCell>
                            <TableCell>Admission Date</TableCell>
                            <TableCell>Ward</TableCell>
                            <TableCell>Bed Number</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {myData
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .filter((item) => {
                              const searchLowerCase = search.toLowerCase();
                              const admissionIdString = item.admission_id
                                ? String(item.admission_id)
                                : "";
                              const admissionDateString = item.admission_date
                                ? item.admission_date
                                : "";
                              const wardString = wardMap[item.ward]
                                ? wardMap[item.ward].toLowerCase() : "";
                              const bedNumberString = item.bed_number
                                ? String(item.bed_number)
                                : "";
                                const patientName = patientMap[item.patient] ? patientMap[item.patient].toLowerCase() : '';
                              return (
                                searchLowerCase === "" ||
                                admissionIdString.includes(searchLowerCase) ||
                                admissionDateString.includes(searchLowerCase) ||
                                wardString.includes(searchLowerCase) ||
                                bedNumberString.includes(searchLowerCase) || patientName.includes(searchLowerCase)
                              );
                            })
                            .map((user, index) => (
                              <TableRow key={index}>
                                <TableCell>{user.admission_id}</TableCell>
                                <TableCell>{user.admission_date}</TableCell>
                                <TableCell>{wardMap[user.ward]}</TableCell>
                                <TableCell>{user.bed}</TableCell>
                                <TableCell>
                                  {patientMap[user.patient]}
                                </TableCell>
                                <TableCell>
                                  <div className="w-[260px] relative my-0 mx-[!important] left-[0px] bg-theme-white-default shadow-[0px_-1px_0px_#edf2f7_inset] h-[52px] overflow-hidden shrink-0 z-[22]">
                                    <Link
                                      to={`EditIPD/${user.admission_id}`}
                                    >
                                      <img
                                        className="absolute top-[calc(50% - 12px)] left-[21px] w-6 h-6 overflow-hidden"
                                        alt=""
                                        src={edit}
                                      />
                                    </Link>
                                    <Link
                                      className="absolute top-[13px] left-[81px] rounded flex flex-col items-center justify-start py-2 px-4 border-[1px] border-solid border-royalblue"
                                      to={`/IPD/IPD_Dishcharged/${user.admission_id}`}
                                    >
                                      <div className="flex flex-row items-center justify-start gap-[6px]">
                                        <div className="relative leading-[10px] font-medium">
                                          Discharged
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                      <TablePagination
                        count={20}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        component="div"
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
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

export default IPD;