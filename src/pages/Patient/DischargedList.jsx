import React, { useState , useRef, useEffect } from "react";
import axios from "axios";
import Plus from "../../Data/Plus.png";
import download from "../../Data/download.png";
import search from "../../Data/search.png";
import edit from "../../Data/edit.png";
import generatePDF from 'react-to-pdf';
import Breadcrumb from "../../components/Breadcrumb";
import { Link, useNavigate , useParams } from "react-router-dom";
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
const DischargedList = () => {
  const token =  JSON.parse(localStorage.getItem("Token"))
    const [ dischargeList , setDischargeList]=useState([])
    const [patientData, setPatientData] = useState([]);
    useEffect(()=>{
        axios.get(`${baseURL}/api/ipd/ipd-DischargeHistory`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        }).then((res)=>{
            console.log(res.data);
            setDischargeList(res.data);
        }).then((err)=>{
            console.log(err);
        })
    },[])
   
    const handlechangepage=(event,newpage)=>{
        setPage(newpage)
      }
      const handleRowPerPage=(event)=>{
        setRowPerPage(parseInt(event.target.value,10))
        setPage(0)
    
      }
       const[page , setPage]=useState(0);
       const [ rowperpage , setRowPerPage]=useState(6);
    
       const targetRef = useRef();
      const [searh, setSearch] = useState("");
      
  useEffect(() => {
    
    axios.get(`${baseURL}/api/patient/api/patients/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(response => {
        console.log(response.data);
        setPatientData(response.data);
      })
      .catch(error => {
        console.error('Error fetching equipment data:', error);
      });
  }, []);
      const getPatientName = (patient) => {
        const Patient = patientData.find(item => item.PatientID === patient);
        return Patient ? Patient.FirstName : '';
      };
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
                Discharge Patient List
                </div>
                <input
                  className="absolute top-[11px] left-[688px] rounded-[30px] bg-theme-white-default box-border w-[161px] h-[38px] border-[1px] border-solid pl-5 text-[15px]  border-black"
                  placeholder=" patinet ID"
                  defaultValue={searh}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <div className="absolute top-[18px] left-[700px] h-[23.75px] flex flex-row  ml-28 items-start justify-start">
                  <img
                    className="w-5 relative h-5  overflow-hidden shrink-0"
                    alt=""
                    src={search}
               
                  />
                </div>

               
                <button
                  className="absolute top-[11px] left-[895px] rounded-md  h-10 bg-theme-white-default box-border w-[156px] flex flex-col items-start justify-start py-2.5 px-5 text-theme-primary-dark border-[1px] border-solid border-theme-primary-dark"
                  onClick={() =>
                    generatePDF(targetRef, {
                      filename: "Discharge Patient List.pdf",
                    })
                  }
                >
                  <div className="w-24 my-0 mx-[!important] absolute top-[calc(50%-_8px)] left-[calc(50%-_48px)] flex flex-row items-center justify-start gap-[8px] z-[0]">
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
                  <TableContainer >
                    <Table ref={targetRef}>
                      <TableHead className=" bg-indigo-100 w-full">
                        <TableRow>
                          <TableCell style={{ paddingLeft:"90px"}}>Visit Id</TableCell>
                          <TableCell>Visit Date</TableCell>
                          <TableCell>Patient Full Name</TableCell>
                  
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dischargeList
                          .slice(
                            page * rowperpage,
                            page * rowperpage + rowperpage
                          ).filter((item)=>{
                            const searchLowerCase = searh.toLowerCase();
                            const IdString = item.id ? String(item.id) : '';
                            
                            return(
                                searchLowerCase === "" ||   IdString.includes(searchLowerCase)

                            )
                          })
                          .map((user) => (
                            <TableRow key={user.id}>
                              <TableCell style={{ paddingRight: "140px" , paddingLeft:"100px" }}>
                                {user.id}
                              </TableCell>
                              <TableCell style={{ paddingRight: "100px" }}>
                                {user.discharge_date}{" "}
                              </TableCell>
                              <TableCell style={{ paddingRight: "135px" }}>
                                {getPatientName(user.patient)}
                              </TableCell>
                           
                         

                              
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

export default DischargedList