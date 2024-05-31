import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Plus from "../../Data/Plus.png";
import download from "../../Data/download.png";
import searh from "../../Data/search.png";
import edit from "../../Data/edit.png";
import { useParams } from "react-router-dom";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import generatePDF from "react-to-pdf";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  styled,
  makeStyles,
  TBody,
  Paper,
  TableContainer,
  TablePagination,
  Button,
  Typography,
} from "@mui/material";
import baseURL from "../../assests/API_URL";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
const Patient_Detail = () => {
  const { pk } = useParams();
  const API = `${baseURL}/api/patient/api/patients/`;
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");
  const token =  JSON.parse(localStorage.getItem("Token"))
  const getApiData = async (api) => {
   
    try {
      const res = await axios.get(api, {
        headers: {
         
          Authorization: `Token ${token}`,
        },
      });
      setMyData(res.data);
    } catch (error) {
      setIsError(error.toJSON().message);
    }
    console.log("token: ", token)
  };
  useEffect(() => {
    getApiData(API);
  }, []);

  const navigate = useNavigate();
  const handle = () => {
    navigate("/Patient/Patient_Details/Add_Patient");
  };
 const navigate1 = useNavigate();
 const handle1 = () => {
   navigate1("/Patient/Ward/Add_Ward")
 }
  const handlechangepage = (event, newpage) => {
    setPage(newpage);
  };
  const handleRowPerPage = (event) => {
    setRowPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  async function deleteData(PatientID) {
    const deleteUrl = `${baseURL}/api/patient/api/patients/${PatientID}/`;
    try {
      const response = await axios.delete(deleteUrl, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log("Data deleted successfully:", response.data);
      // After deletion, you can update the state to remove the deleted row from the UI
      setMyData((prevData) =>
        prevData.filter((row) => row.PatientID !== PatientID)
      );
    } catch (error) {
      console.error("Error deleting data:", error);
      console.log("Error response data:", error.response?.data);
    }
  }
  const [page, setPage] = useState(0);
  const [rowperpage, setRowPerPage] = useState(10);

  const targetRef = useRef();

  const [search, setSearch] = useState("");
  //const urlName = user.FirstName.replace(/\s+/g, "-").toLowerCase();
  defaults.responsive = true;
  defaults.plugins.title.display = true;
  defaults.plugins.title.align = "center";
  defaults.plugins.title.font.size = 15;
  defaults.plugins.title.color = "black";
  return (
    <div>
      <Breadcrumb></Breadcrumb>
      <div className="w-[1000px] ml-[70px] mt-0 relative bg-whitesmoke h-[984px] flex flex-col items-center justify-start pt-0 px-[30px] pb-[30px] box-border text-left text-xs text-f2d3d font-table-body-heading">
        <div className="flex flex-col items-center justify-start pt-5 px-0 pb-0">
          <div className="h-[692px] flex flex-col items-start justify-start">
            <div className="w-[1110px] relative bg-theme-white-default h-[692px] overflow-hidden shrink-0">
              <div className="absolute top-[0px] left-[0px] w-[1110px] flex flex-col items-start justify-start">
                <div className="self-stretch relative h-[60px] overflow-hidden shrink-0">
                  <div className="absolute w-full top-[60px] right-[0px] left-[0px] bg-gray-200 box-border h-0 border-t-[1px] border-solid border-border-light" />
                  <div className="absolute top-[18px] left-[22px] text-[20px] leading-[24px] font-medium">
                    Patients
                  </div>
                  <input
                    className="absolute top-[11px] left-[405px] rounded-[30px] bg-theme-white-default box-border w-[161px] h-[38px] border-[1px] border-solid border-black pl-5"
                    defaultValue={ search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <div className="absolute top-[18px] left-[425px] h-[23.75px] flex flex-row  ml-28 items-start justify-start">
                    <img
                      className="w-5 relative h-5  overflow-hidden shrink-0"
                      alt=""
                      src={searh}
                    />
                  </div>

                  <button
                    className="absolute top-[11px] left-[757px] rounded-md bg-theme-primary-dark w-[156px] flex flex-col items-start justify-start py-2.5 px-5  h-10 box-border text-theme-white-default"
                    onClick={handle}
                  >
                    <div className="w-24 my-0 mx-[!important] absolute top-[10px] left-[30px] flex flex-row items-center justify-start gap-[8px] z-[0]">
                      <img
                        className="w-5 relative h-5 object-cover"
                        alt=""
                        src={Plus}
                      />
                      <div className="relative font-semibold">Add Patient</div>
                    </div>
                  </button>
                  <button
                  className="absolute top-[11px] left-[927px] rounded-md bg-theme-primary-dark w-[156px] flex flex-col items-start justify-start py-2.5 px-5  h-10 box-border text-theme-white-default"
                  onClick={handle1}
                >
                  <div className="w-24 my-0 mx-[!important] absolute top-[10px] left-[30px] flex flex-row items-center justify-start gap-[8px] z-[0]">
                    <img
                      className="w-5 relative h-5 object-cover"
                      alt=""
                      src={Plus}
                    />
                    <div className="relative font-semibold">Add Wards</div>
                  </div>
                </button>
                  <button
                    className="absolute top-[11px] left-[585px] rounded-md  h-10 bg-theme-white-default box-border w-[156px] flex flex-col items-start justify-start py-2.5 px-5 text-theme-primary-dark border-[1px] border-solid border-theme-primary-dark"
                    onClick={() =>
                      generatePDF(targetRef, {
                        filename: "Patient_List.pdf",
                      })
                    }
                  >
                    <div className="w-24 my-0 mx-[!important] absolute top-[calc(50%_-_8px)] left-[calc(50%_-_48px)] flex flex-row items-center justify-start gap-[8px] z-[0]">
                      <img
                        className="w-4 relative h-4 overflow-hidden shrink-0"
                        alt=""
                        src={download}
                      />
                      <div className="relative font-semibold">Download </div>
                    </div>
                  </button>
                </div>
                <div className="self-stretch  h-[572px] overflow-hidden shrink-0  items-start justify-start text-text-body-light">
                  <page>
                    <TableContainer ref={targetRef}>
                      <Table>
                        <TableHead className=" bg-indigo-100 w-full">
                          <TableRow>
                            <TableCell>Patient ID</TableCell>
                            <TableCell>Name </TableCell>
                            <TableCell>Sex</TableCell>
                            <TableCell>Blood</TableCell>
                            <TableCell>Date Of Birth</TableCell>
                            <TableCell>Contact Number</TableCell>
                            <TableCell>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {myData
                            .slice(
                              page * rowperpage,
                              page * rowperpage + rowperpage
                            )
                            .filter(
                              (item) =>{
                                const tosearch = search.toLowerCase();
                                const patientIdString = item.PatientID ? String(item.PatientID) : '';
                                const phoneNoString = item.phone_no ? String(item.phone_no) : '';
                                const dobString = item.DOB ? String(item.DOB) : '';
                                return (
                                tosearch=== "" ||
                                item.fullname.toLowerCase().includes(tosearch) || 
                                item.Gender.toLowerCase().includes(tosearch)||
                                item.blood.toLowerCase().includes(tosearch) ||
                                patientIdString.includes(tosearch) ||  
                                phoneNoString.includes(tosearch) ||
                                dobString.includes(tosearch) 
                                )
                              }
                            )
                            .map((user) => (
                              <TableRow key={user.PatientID}>
                                <TableCell>{user.PatientID}</TableCell>
                                <TableCell>{user.fullname} </TableCell>
                                <TableCell>{user.Gender}</TableCell>
                                <TableCell>{user.blood}</TableCell>
                                <TableCell>{user.DOB}</TableCell>
                                <TableCell>{user.phone_no}</TableCell>

                                <div className="w-[250px] relative my-0 mx-[!important] left-[0px] bg-theme-white-default shadow-[0px_-1px_0px_#edf2f7_inset] h-[52px] overflow-hidden shrink-0 z-[22]">
                                  <img
                                    className="absolute top-[calc(50%_-_12px)] left-[24px] w-6 h-6 hidden"
                                    alt=""
                                    src=""
                                  />
                                  <Link
                                    to={`/Patient/Patient_Details/EditPatient/${user.PatientID}`}
                                  >
                                    <img
                                      className="absolute top-[calc(50%_-_12px)] left-[21px] w-6 h-6 overflow-hidden"
                                      alt=""
                                      src={edit}
                                    />
                                  </Link>
                                  <Link
                                    className="absolute top-[13px] left-[71px] rounded flex flex-col items-center justify-start py-2 px-4 border-[1px] border-solid border-royalblue"
                                    to={`/Patient/Patient_Details/${user.PatientID}`}
                                  >
                                    <div className="flex flex-row items-center justify-start gap-[6px]">
                                      <img
                                        className="w-2.5 relative h-2.5 hidden"
                                        alt=""
                                        src="/icon.svg"
                                      />
                                      <div className="relative leading-[10px] font-medium">
                                        View
                                      </div>
                                    </div>
                                  </Link>
                                  <button
                                    className="absolute top-[13px] left-[151px] rounded flex flex-col items-center justify-start py-2 px-4 border-[1px] border-solid border-royalblue"
                                    onClick={() => deleteData(user.PatientID)}
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
                        count={20}
                        page={page}
                        rowperpage={rowperpage}
                        component="div"
                        onPageChange={handlechangepage}
                        onRowsPerPageChange={handleRowPerPage}
                      ></TablePagination>
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

export default Patient_Detail;
