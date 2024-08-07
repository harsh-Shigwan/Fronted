import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Plus from "../../Data/Plus.svg";
import download from "../../Data/download.svg";
import wow from "../../Data/carbon_search.svg";
import edit from "../../Data/edit.svg";
import baseURL from "../../assets/API_URL";
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
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";

const Inventory = () => {
  const API = `${baseURL}/inventory/api/medicines/`;
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");
  const token = JSON.parse(localStorage.getItem("Token"));

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

  async function deleteData(id) {
    const deleteUrl = `${baseURL}/inventory/api/medicines/${id}/`;
    try {
      const response = await axios.delete(deleteUrl, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log("Data deleted successfully:", response.data);
      setMyData((prevData) => prevData.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
      console.log("Error response data:", error.response?.data);
    }
  }

  const navigate = useNavigate();
  const handle = () => {
    navigate("/Inventory/Add_Medicine_Inventory");
  };
  const navigate1 = useNavigate();
  const handle1 = () => {
    navigate1("/Inventory/Equipment");
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
  const [searchTerm, setSearchTerm] = useState("");

  const totalItems = myData.length;
  const startIndex = page * rowperpage;

  return (
    <div>
      <Breadcrumb></Breadcrumb>
      <div className="flex flex-col px-8 pt-5 pb-12 bg-slate-50 max-md:px-5">
        <div className="flex flex-col pt-3 text-xs font-semibold whitespace-nowrap bg-white max-md:max-w-full">
          <div className="flex gap-4 self-start ml-6 max-md:ml-2.5">
            <button className="flex flex-col flex-1 justify-center px-5 py-2.5 text-white bg-blue-700 rounded-md">
              <div className="flex gap-2 justify-between">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/664eea8faccff020e391200fb7ea74ef1669b35756bd9c9b7d4632c24ef130ab?apiKey=8d6992485656477797592f8415f51272&"
                  className="self-start w-2.5  fill-white"
                />
                <div className="grow">Add Medicine</div>
              </div>
            </button>
            <button
              className="flex flex-col flex-1 justify-center px-5 py-2.5 text-blue-700 rounded-md border border-blue-700 border-solid"
              onClick={handle1}
            >
              <div className="flex gap-2 justify-between">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/7f79e9ad022f7a34408f51b0f6bd7a97e9397dafde87b80d155aceaa13f5cbcd?apiKey=8d6992485656477797592f8415f51272&"
                  className="self-start w-3.5 aspect-square fill-blue-700"
                />
                <div className="grow">Add Equipment</div>
              </div>
            </button>
          </div>
          <div className="shrink-0 mt-3.5 h-px bg-slate-100 max-md:max-w-full" />
        </div>

        <div className="w-[1000px] ml-[70px] mt-0 relative bg-whitesmoke h-[984px] flex flex-col items-center justify-start pt-0 px-[30px] pb-[30px] box-border text-left text-xs text-f2d3d font-table-body-heading">
          <div className="flex flex-col items-center justify-start pt-5 px-0 pb-0">
            <div className="h-[692px] flex flex-col items-start justify-start">
              <div className="w-[1110px] relative bg-theme-white-default  shrink-0">
                <div className="absolute top-[0px] left-[0px] w-[1110px] flex flex-col items-start justify-start">
                  <div className="self-stretch relative h-[60px] overflow-hidden shrink-0">
                    <div className="absolute w-full top-[60px] right-[0px] left-[0px] bg-gray-200 box-border h-0 border-t-[1px] border-solid border-border-light" />
                    <div className="absolute top-[18px] left-[22px] text-[20px] leading-[24px] font-medium">
                      Inventory
                    </div>
                    <input
                      className="absolute top-[11px] left-[588px] rounded-[30px] bg-theme-white-default box-border w-[161px] h-[38px] border-[1px] border-solid border-black pl-5"
                      value={searchTerm}
                      placeholder="Search ..."
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                      }}
                    />
                    <div className="absolute top-[8px] left-[600px] h-[23.75px] flex flex-row  ml-28 items-start justify-start">
                    <img
                    className="w-5 relative h-10  overflow-hidden shrink-0"
                    alt=""
                    src={wow}
                  />
                    </div>

                    <button
                      className="absolute top-[11px] left-[937px] rounded-md bg-theme-primary-dark w-[156px] flex flex-col items-start justify-start py-2.5 px-5  h-10 box-border text-theme-white-default"
                      onClick={handle}
                    >
                      <div className="w-36 my-0 mx-[!important] absolute top-[10px] left-[10px] flex flex-row items-center justify-start gap-[0px]  z-[0]">
                        <img
                          className="w-5 relative  h-5 object-cover"
                          alt=""
                          src={Plus}
                        />
                        <div className="relative  ml-3 font-semibold">
                          Add Medicines
                        </div>
                      </div>
                    </button>
                    <button
                      className="absolute top-[11px] left-[765px] rounded-md  h-10 bg-theme-white-default box-border w-[156px] flex flex-col items-start justify-start py-2.5 px-5 text-theme-primary-dark border-[1px] border-solid border-theme-primary-dark"
                      onClick={() =>
                        generatePDF(targetRef, {
                          filename: "Medicine List.pdf",
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
                  <div className="self-stretch   shrink-0  items-start justify-start text-text-body-light">
                    <page>
                      <TableContainer ref={targetRef}>
                        <Table>
                          <TableHead className=" bg-indigo-100 w-full">
                            <TableRow>
                              <TableCell>ID</TableCell>
                              <TableCell>Medicine Name </TableCell>
                              <TableCell>Quantity</TableCell>
                              <TableCell>Medicine Manufacturer</TableCell>
                              <TableCell>Expiration Date</TableCell>
                              <TableCell>Amount</TableCell>
                              <TableCell>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody className=" bg-white">
                            {myData
                              .slice(
                                page * rowperpage,
                                page * rowperpage + rowperpage
                              )
                              .reverse().filter(
                                (item) =>
                                  {
                                    const toSearch = searchTerm.toLowerCase();
                                    const nameMatch = item.name.toLowerCase().includes(toSearch);
                                    const quantityMatch = item.quantity.toString().includes(toSearch);
                                    const manufacturerMatch = item.manufacturer.toLowerCase().includes(toSearch);
                                    const expirationDateMatch = item.expiration_date.toLowerCase().includes(toSearch);
                                    const unitPriceMatch = item.unit_price.toString().includes(toSearch);
                                  
                                    return toSearch === "" ||
                                           nameMatch ||
                                           quantityMatch ||
                                           manufacturerMatch ||
                                           expirationDateMatch ||
                                           unitPriceMatch;
                                  }
                                  
                              )
                              .map((user , index) => (
                                <TableRow key={user.id}>
                                  <TableCell>{totalItems - (startIndex + index)}</TableCell>
                                  <TableCell>{user.name} </TableCell>
                                  <TableCell>{user.quantity}</TableCell>
                                  <TableCell>{user.manufacturer}</TableCell>
                                  <TableCell>
                                    {user.expiration_date}
                                  </TableCell>
                                  <TableCell>{user.unit_price}</TableCell>

                                  <div className="w-[190px] relative my-0 mx-[!important] left-[0px] bg-theme-white-default shadow-[0px_-1px_0px_#edf2f7_inset] h-[52px] overflow-hidden shrink-0 z-[22]">
                                    <img
                                      className="absolute top-[calc(50%_-_12px)] left-[24px] w-6 h-6 hidden"
                                      alt=""
                                      src=""
                                    />
                                    <Link to={`/Inventory/${user.id}`}>
                                    <img
                                      className="absolute top-[calc(50%_-_12px)] left-[21px] w-6 h-6 overflow-hidden"
                                      alt=""
                                      src={edit}
                                    /></Link>
                                    <button
                                      className="absolute top-[13px] left-[71px] rounded flex flex-col items-center justify-start py-2 px-4 border-[1px] border-solid border-royalblue"
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
                          rowsPerPage={rowperpage}
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
    </div>
  );
};

export default Inventory;
