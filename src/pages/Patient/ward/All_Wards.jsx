import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Plus from "../../../Data/Plus.png";
import download from "../../../Data/download.png";
import search from "../../../Data/search.png";
import edit from "../../../Data/edit.png";
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

import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb";

const All_Wards = () => {
    const API = "http://127.0.0.1:8000/ipd/wards/";
    const [myData, setMyData] = useState([]);
    const [isError, setIsError] = useState("");
  
    const getApiData = async (api) => {
      try {
        const res = await axios.get(api);
        setMyData(res.data);
      } catch (error) {
        setIsError(error.toJSON().message);
      }
    };
    useEffect(() => {
      getApiData(API);
    }, []);

   
      const handlechangepage = (event, newpage) => {
        setPage(newpage);
      };
      const handleRowPerPage = (event) => {
        setRowPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
      async function deleteData(id) {
        const deleteUrl = `http://127.0.0.1:8000/ipd/wards/${id}/`;
        try {
          const response = await axios.delete(deleteUrl);
          console.log("Data deleted successfully:", response.data);
          // After deletion, you can update the state to remove the deleted row from the UI
          setMyData((prevData) =>
            prevData.filter((row) => row.id !== id)
          );
        } catch (error) {
          console.error("Error deleting data:", error);
          console.log("Error response data:", error.response?.data);
        }
      }
      const [page, setPage] = useState(0);
      const [rowperpage, setRowPerPage] = useState(10);
    
      const targetRef = useRef();
    
      const [searh, setSearch] = useState("");
  return (
    <div>
   
    <div className="w-[1000px] ml-[55px] mt-0 relative bg-whitesmoke h-[984px] flex flex-col items-center justify-start pt-0 px-[30px] pb-[30px] box-border text-left text-xs text-f2d3d font-table-body-heading">
      <div className="flex flex-col items-center justify-start pt-5 px-0 pb-0">
        <div className="h-[692px] flex flex-col items-start justify-start">
          <div className="w-[1110px] relative bg-theme-white-default h-[692px] overflow-hidden shrink-0">
            <div className="absolute top-[0px] left-[0px] w-[1110px] flex flex-col items-start justify-start">
              <div className="self-stretch relative h-[60px] overflow-hidden shrink-0">
                <div className="absolute w-full top-[60px] right-[0px] left-[0px] bg-gray-200 box-border h-0 border-t-[1px] border-solid border-border-light" />
              
                <input
                  className="absolute top-[11px] left-[718px] rounded-[30px] bg-theme-white-default box-border w-[161px] h-[38px] border-[1px] border-solid border-black pl-10"
                  defaultValue={searh}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <div className="absolute top-[18px] left-[620px] h-[23.75px] flex flex-row  ml-28 items-start justify-start">
                  <img
                    className="w-5 relative h-5  overflow-hidden shrink-0"
                    alt=""
                    src={search}
                  />
                </div>

               
                 
                <button
                  className="absolute top-[11px] left-[905px] rounded-md  h-10 bg-theme-white-default box-border w-[156px] flex flex-col items-start justify-start py-2.5 px-5 text-theme-primary-dark border-[1px] border-solid border-theme-primary-dark"
                  onClick={() =>
                    generatePDF(targetRef, {
                      filename: "Ward_List.pdf",
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
                          <TableCell>Ward ID</TableCell>
                          <TableCell>Ward Name</TableCell>
                          <TableCell>Toatal Number Of Bed</TableCell>
                        
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {myData
                          .slice(
                            page * rowperpage,
                            page * rowperpage + rowperpage
                          )
                          .filter((item) => {
                            const searchLowerCase = searh.toLowerCase();
                            // Check if total_beds is defined before using includes
                            const totalBedsString = item.total_beds ? String(item.total_beds) : '';
                            const idString = item.id ? String(item.id) : '';
                            return (
                              searchLowerCase === "" ||
                              item.name.toLowerCase().includes(searchLowerCase) || 
                              totalBedsString.includes(searchLowerCase) ||  
          
                              idString.includes(searchLowerCase)
                            );
                          })
                          .map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>{user.id}</TableCell>
                              <TableCell>{user.name} </TableCell>
                              <TableCell style={{alignItems:"center"}}>{user.total_beds}</TableCell>
                           
                            
                             

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
                              
                                <button
                                  className="absolute top-[13px] left-[101px] rounded flex flex-col items-center justify-start py-2 px-4 border-[1px] border-solid border-royalblue"
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
  )
}

export default All_Wards