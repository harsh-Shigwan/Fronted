import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Plus from "../../../Data/Plus.png";
import download from "../../../Data/download.png";
import search from "../../../Data/search.png";
import edit from "../../../Data/edit.png";

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
const Cashbook = () => {
 
  const API = "http://127.0.0.1:8000/api/accounts/cashbooks/";
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


  const navigate1 = useNavigate();
  const handle1 = () => {
    navigate1("/Inventory");
  };

  const navigate3 = useNavigate();
  const handle3 =()=>{
      navigate3("/Accounts/Account_Profile/CashBook");
  }
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
  const [searh, setSearch] = useState("");
  return (
    <div><div className="flex flex-col  w-[1000px] px-0 py-0 bg-slate-50 max-md:px-5">
    <div className="mt-9 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow px-8 py-7 w-full bg-white rounded-xl border border-gray-200 border-solid max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 justify-between pr-1.5 w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex-auto self-start mt-4 text-2xl font-semibold text-slate-800">
                All Expenses
              </div>
              <div className="flex gap-2 px-3.5 py-2.5 text-base font-medium rounded-xl border border-gray-200 border-solid text-zinc-400">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5232de7e9deb289af4c728cdd6ae9966222d34f995a0162315b627a9eb029da7?apiKey=8d6992485656477797592f8415f51272&"
                  className="w-6 aspect-square"
                />
                <div>6 Month</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/61d4931de1a0ccb0f6fe96d6c31c509f916561d7521b1f56ee466b4bd34381e8?apiKey=8d6992485656477797592f8415f51272&"
                  className="w-6 aspect-square"
                />
              </div>
            </div>
            <div className="flex gap-5 justify-between pr-1.5 mt-5 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
              <div className="flex flex-col">
                <div className="text-base text-zinc-400">Daily</div>
                <div className="text-xl font-semibold text-slate-800">
                  $475
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-base text-zinc-400">Weekly</div>
                <div className="text-xl font-semibold text-slate-800">
                  $3,327
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-base text-zinc-400">Monthly</div>
                <div className="text-xl font-semibold text-slate-800">
                  $12.131
                </div>
              </div>
            </div>
            <div className="mt-8 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                <div className="flex flex-col w-[29%] max-md:ml-0 max-md:w-full">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e229523c7735844da218aa1c727b60a6284b818a3f77941ce877aae37a96b39f?apiKey=8d6992485656477797592f8415f51272&"
                    className="max-w-full aspect-square w-[109px] max-md:mt-10"
                  />
                </div>
                <div className="flex flex-col ml-5 w-[71%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow text-base text-zinc-400 max-md:mt-10">
                    <div className="flex gap-3 justify-between whitespace-nowrap">
                      <div className="my-auto w-3 h-3 rounded-full" />
                      <div className="flex-auto">Medicines</div>
                    </div>
                    <div className="flex gap-3 justify-between mt-1 whitespace-nowrap">
                      <div className="my-auto w-3 h-3 rounded-full" />
                      <div className="flex-auto">Equipments</div>
                    </div>
                    <div className="flex gap-3 justify-between mt-1">
                      <div className="my-auto w-3 h-3 rounded-full" />
                      <div className="flex-auto">Lab expense</div>
                    </div>
                    <div className="flex gap-3 justify-between mt-1">
                      <div className="my-auto w-3 h-3 rounded-full" />
                      <div className="flex-auto">Other </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="grow px-8 py-9 w-full bg-white rounded-xl border border-gray-200 border-solid max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
              <div className="flex flex-col w-[84%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow text-base text-slate-800 max-md:mt-10">
                  <div className="text-2xl font-semibold whitespace-nowrap">
                    Quick Transaction View
                  </div>
                  <div className="flex gap-4 justify-between mt-10 max-md:mt-10">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/81fa6d12501abf806b56592c63419fd6e6ab060a8f943a3288e25028588220d3?apiKey=8d6992485656477797592f8415f51272&"
                      className="aspect-square w-[54px]"
                    />
                    <div className="flex flex-col flex-1 my-auto">
                      <div className="font-medium">Order Revenue</div>
                      <div className="mt-3 font-light">Apr 27, 22</div>
                    </div>
                  </div>
                  <div className="flex gap-4 justify-between mt-3.5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/03f82d02468424126785e8f751f0a5a78809737aca6b1fdf7e978149938c2661?apiKey=8d6992485656477797592f8415f51272&"
                      className="aspect-square w-[54px]"
                    />
                    <div className="flex flex-col flex-1 my-auto">
                      <div className="font-medium whitespace-nowrap">
                        Withdrawal Initiated
                      </div>
                      <div className="mt-3 font-light">Apr 25, 22</div>
                    </div>
                  </div>
                  <div className="flex gap-4 justify-between mt-3.5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ecafa1d3a442a9eedb605d3c5955eff0c8e9c43e07399d896e5ae549a5b03e4?apiKey=8d6992485656477797592f8415f51272&"
                      className="aspect-square w-[54px]"
                    />
                    <div className="flex flex-col flex-1 my-auto">
                      <div className="font-medium">Order Revenue</div>
                      <div className="mt-3 font-light">Mar 1, 22</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[16%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col mt-1 text-base font-medium text-emerald-400 whitespace-nowrap max-md:mt-10">
                  <div className="text-sky-500">View all</div>
                  <div className="mt-16 text-right max-md:mt-10">+ $874</div>
                  <div className="mt-14 text-right text-red-500 max-md:mt-10">
                    - $2490
                  </div>
                  <div className="self-start mt-14 ml-3.5 text-right max-md:mt-10 max-md:ml-2.5">
                    + $126
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col justify-center pb-10 mt-6 font-medium whitespace-nowrap bg-white max-md:max-w-full">
     
      <div className="flex flex-col pt-6 text-base leading-6 bg-white text-slate-800 max-md:max-w-full">
        <div className="self-start ml-6 max-md:ml-2.5">Transactions</div>
        <div className="shrink-0 mt-6 h-px bg-slate-100 max-md:max-w-full" />
      </div>
      <div className="w-[1000px] ml-[70px] mt-0 relative bg-whitesmoke h-[984px] flex flex-col items-center justify-start pt-0 px-[30px] pb-[30px] box-border text-left text-xs text-f2d3d font-table-body-heading">
    <div className="flex flex-col items-center justify-start pt-5 px-0 pb-0">
      <div className="h-[692px] flex flex-col items-start justify-start">
        <div className="w-[1110px] relative bg-theme-white-default h-[692px] overflow-hidden shrink-0">
          <div className="absolute top-[0px] left-[0px] w-[1110px] flex flex-col items-start justify-start">
            <div className="self-stretch relative h-[60px] overflow-hidden shrink-0">
              <div className="absolute w-full top-[60px] right-[0px] left-[0px] bg-gray-200 box-border h-0 border-t-[1px] border-solid border-border-light" />
              <div className="absolute top-[18px] left-[22px] text-[20px] leading-[24px] font-medium">
             CashBook
              </div>
              <input className="absolute top-[11px] left-[588px] rounded-[30px] bg-theme-white-default box-border w-[161px] h-[38px] border-[1px] border-solid border-black pl-5"  defaultValue={searh} onChange={(e)=>{ setSearch(e.target.value)}}/>
              <div className="absolute top-[18px] left-[600px] h-[23.75px] flex flex-row  ml-28 items-start justify-start">
                <img
                  className="w-5 relative h-5  overflow-hidden shrink-0"
                  alt=""
                  src={search}
                />
              </div>

              <button
                className="absolute top-[11px] left-[937px] rounded-md bg-theme-primary-dark w-[156px] flex flex-col items-start justify-start py-2.5 px-5  h-10 box-border text-theme-white-default"
                onClick={handle3}
              >
                <div className="w-24 my-0 mx-[!important] absolute top-[10px] left-[20px] flex flex-row items-center justify-start gap-[8px] z-[0]">
                  <img
                    className="w-5 relative h-5 object-cover"
                    alt=""
                    src={Plus}
                  />
                  <div className="relative font-semibold">Add CashBook </div>
                </div>
              </button>
              <button
                className="absolute top-[11px] left-[765px] rounded-md  h-10 bg-theme-white-default box-border w-[156px] flex flex-col items-start justify-start py-2.5 px-5 text-theme-primary-dark border-[1px] border-solid border-theme-primary-dark"
                onClick={() =>
                  generatePDF(targetRef, {
                    filename: "Dishcharged_Patient_List.pdf",
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
                      <TableCell>ID</TableCell>
                      <TableCell>Date </TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Transaction Type</TableCell>
                     
                      <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {myData
                        .slice(
                          page * rowperpage,
                          page * rowperpage + rowperpage
                        ).filter((item)=>
                        searh.toLowerCase() === '' ||
                        item.transaction_type.toLowerCase().includes(searh)
                      )
                        .map((user) => (
                          <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{user.date} </TableCell>
                          <TableCell>{user.amount}</TableCell>
                          <TableCell>{user.transaction_type}</TableCell>
                            
                        

                            <div className="w-[190px] relative my-0 mx-[!important] left-[0px] bg-theme-white-default shadow-[0px_-1px_0px_#edf2f7_inset] h-[52px] overflow-hidden shrink-0 z-[22]">
                              <img
                                className="absolute top-[calc(50%_-_12px)] left-[24px] w-6 h-6 hidden"
                                alt=""
                                src=""
                              />
                              <img
                                className="absolute top-[calc(50%_-_12px)] left-[21px] w-6 h-6 overflow-hidden"
                                alt=""
                                src={edit}
                              />
                              <div
                                className="absolute top-[13px] left-[71px] rounded flex flex-col items-center justify-start py-2 px-4 border-[1px] border-solid border-royalblue"
                                to={`/Patient/Patient_Details/${user.PatientID}`}                                 >
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
                              </div>
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
    
      <div className="flex gap-5 justify-between self-end mt-36 mr-7 text-base font-semibold leading-4 max-md:mt-10 max-md:mr-2.5">
        <div className="grow justify-center px-7 py-4 text-blue-700 rounded-lg border border-blue-700 border-solid max-md:px-5">
          Cancel
        </div>
        <div className="grow justify-center px-9 py-4 text-white bg-blue-700 rounded-lg border border-solid border-[color:var(--Theme-Primary-Default,#4C6FFF)] max-md:px-5">
          Save
        </div>
      </div>
    </div>
  </div></div>
  )
}

export default Cashbook