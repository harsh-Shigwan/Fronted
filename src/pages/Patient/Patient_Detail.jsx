import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Plus from "../../Data/Plus.png";
import download from "../../Data/download.png";
import search from "../../Data/search.png";
import edit from "../../Data/edit.png";
import { BsSearch } from "react-icons/bs";
import { useParams } from "react-router-dom";
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
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import generatePDF from "react-to-pdf";
const Patient_Detail = () => {
  const { pk } = useParams();
  const API = `${baseURL}/api/patient/api/patients/`;
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc"); // or "desc"
  const token = JSON.parse(localStorage.getItem("Token"));
  const navigate = useNavigate();
  const targetRef = useRef();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);

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
  };

  useEffect(() => {
    getApiData(API);
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      // If already sorting by this column, reverse direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // If sorting by a new column, set it as the sort column
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = [...myData].sort((a, b) => {
    const column = sortColumn || "PatientID"; // Default sorting by PatientID
    const aValue = a[column];
    const bValue = b[column];
    if (typeof aValue === "string" && typeof bValue === "string") {
      // Sort alphabetically
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      // Sort numerically
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
  });

  const handle = () => {
    navigate("/Patient/Patient_Details/Add_Patient");
  };

  const handle1 = () => {
    navigate("/Patient/Ward/Add_Ward");
  };

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
                    className="absolute top-[11px] left-[405px] rounded-[30px] bg-theme-white-default box-border w-[161px] h-[38px] border-[1px] border-solid  border-black pl-8"
                    defaultValue={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    placeholder="Search...."
                  />
                  <div className="absolute top-[25px] left-[305px] h-[23.75px] flex flex-row  ml-28 items-start justify-start">
                  <div
                  className="w-5 relative h-10  overflow-hidden shrink-0 "
                  ><BsSearch/>
                </div>
                  </div>

                  <button
                    className="absolute top-[11px] left-[757px] rounded-md bg-theme-primary-dark w-[156px] flex flex-col items-start justify-start py-2.5 px-5  h-10 box-border text-theme-white-default"
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
                    className="absolute top-[11px] left-[927px] rounded-md bg-theme-primary-dark w-[156px] flex flex-col items-start justify-start py-2.5 px-5  h-10 box-border text-theme-white-default"
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
                    className="absolute top-[11px] left-[585px] rounded-md  h-10 bg-theme-white-default box-border w-[156px] flex flex-col items-start justify-start py-2.5 px-5 text-theme-primary-dark border-[1px] border-solid border-theme-primary-dark"
                    onClick={() =>
                      generatePDF(targetRef, {
                        filename: "Patient_List.pdf",
                      })
                    }
                  >
                    <div className="w-24 my-0 mx-[!important] absolute top-[calc(50% - 8px)] left-[calc(50% - 48px)] flex flex-row items-center justify-start gap-[8px] z-[0]">
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
                  <TableContainer ref={targetRef}>
                    <Table>
                      <TableHead className=" bg-indigo-100 w-full">
                        <TableRow>
                          <TableCell
                            onClick={() => handleSort("PatientID")}
                          >
                            Patient id{" "}
                            {sortColumn === "PatientID" && (
                              <span>
                                {sortDirection === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </TableCell>
                          <TableCell onClick={() => handleSort("fullname")}>
                            Name{" "}
                            {sortColumn === "fullname" && (
                              <span>
                                {sortDirection === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </TableCell>
                          <TableCell onClick={() => handleSort("Gender")}>
                            Sex{" "}
                            {sortColumn === "Gender" && (
                              <span>
                                {sortDirection === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </TableCell>
                          <TableCell onClick={() => handleSort("blood")}>
                            Blood{" "}
                            {sortColumn === "blood" && (
                              <span>
                                {sortDirection === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </TableCell>
                          <TableCell onClick={() => handleSort("DOB")}>
                            Date Of Birth{" "}
                            {sortColumn === "DOB" && (
                              <span>
                                {sortDirection === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </TableCell>
                          <TableCell
                            onClick={() => handleSort("phone_no")}
                          >
                            Contact Number{" "}
                            {sortColumn === "phone_no" && (
                              <span>
                                {sortDirection === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sortedData
                          .slice(
                            page * rowPerPage,
                            page * rowPerPage + rowPerPage
                          )
                          .filter((item) => {
                            const toSearch = search.toLowerCase();
                            const patientIdString = item.PatientID
                              ? String(item.PatientID)
                              : "";
                            const phoneNoString = item.phone_no
                              ? String(item.phone_no)
                              : "";
                            const dobString = item.DOB
                              ? String(item.DOB)
                              : "";
                            return (
                              toSearch === "" ||
                              item.fullname
                                .toLowerCase()
                                .includes(toSearch) ||
                              item.Gender.toLowerCase().includes(toSearch) ||
                              item.blood.toLowerCase().includes(toSearch) ||
                              patientIdString.includes(toSearch) ||
                              phoneNoString.includes(toSearch) ||
                              dobString.includes(toSearch)
                            );
                          }).reverse()
                          .map((user) => (
                            <TableRow key={user.PatientID}>
                              <TableCell>{user.PatientID}</TableCell>
                              <TableCell>{user.fullname} </TableCell>
                              <TableCell>{user.Gender}</TableCell>
                              <TableCell>{user.blood}</TableCell>
                              <TableCell>{user.DOB}</TableCell>
                              <TableCell>{user.phone_no}</TableCell>

                              <TableCell>
                                <div className="w-[250px] relative my-0 mx-[!important] left-[0px] bg-theme-white-default shadow-[0px_-1px_0px_#edf2f7_inset] mt-2 h-[52px] overflow-hidden shrink-0 z-[22]">
                                  <img
                                    className="absolute top-[calc(50% - 12px)] left-[24px] w-6 h-6 hidden"
                                    alt=""
                                    src=""
                                  />
                                  <Link
                                    to={`/Patient/Patient_Details/EditPatient/${user.PatientID}`}
                                  >
                                    <img
                                      className="absolute top-[13px] left-[21px] w-6 h-6 overflow-hidden"
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
                                    onClick={() =>
                                      deleteData(user.PatientID)
                                    }
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
                      count={20}
                      page={page}
                      rowsPerPage={rowPerPage}
                      component="div"
                      onPageChange={handlechangepage}
                      onRowsPerPageChange={handleRowPerPage}
                    />
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

export default Patient_Detail;
