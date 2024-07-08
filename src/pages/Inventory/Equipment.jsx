import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Plus from "../../Data/Plus.png";
import download from "../../Data/download.png";
import search from "../../Data/search.png";
import edit from "../../Data/edit.png";
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
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";

const Equipment = () => {
  const navigate = useNavigate();
  const handle = () => {
    navigate("/Inventory");
  };

  const API = `${baseURL}/inventory/api/equipment/`;
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
    const deleteUrl = `${baseURL}/inventory/api/equipment/${id}/`;
    try {
      const response = await axios.delete(deleteUrl, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
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

  const navigate1 = useNavigate();
  const handle1 = () => {
    navigate1("/Inventory");
  };

  const navigate3 = useNavigate();
  const handle3 = () => {
    navigate3("/Inventory/Equipment/Add_Equipment");
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
  const [searchTerm, setSearchTerm] = useState(""); // Renamed from searh to searchTerm

  return (
    <div>
      <Breadcrumb></Breadcrumb>
      <div className="flex flex-col px-8 pt-5 pb-12 bg-slate-50 max-md:px-5">
        <div className="flex flex-col pt-3 text-xs font-semibold whitespace-nowrap bg-white max-md:max-w-full">
          <div className="flex gap-4 self-start ml-6 max-md:ml-2.5">
            <button
              className="flex flex-col flex-1 justify-center px-5 py-2.5 text-blue-700 bg-white rounded-md border border-blue-700 border-solid"
              onClick={handle}
            >
              <div className="flex gap-2 justify-between">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb0a99fc0ed66ee692bb13793133b769fb3944565bd01206a8e007e6e4b5e571?apiKey=8d6992485656477797592f8415f51272&"
                  className="self-start w-2.5 aspect-[0.71] fill-blue-700"
                />
                <div className="grow">Add Medicine</div>
              </div>
            </button>
            <div className="flex flex-col flex-1 justify-center px-5 py-2.5 text-white bg-blue-700 rounded-md border border-white border-solid">
              <div className="flex gap-2 justify-between">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/603a1aa13780c61e96c8fe8201e1955aff4d09be591e3cc08a41a491eff40f47?apiKey=8d6992485656477797592f8415f51272&"
                  className="self-start w-3.5 aspect-square fill-white"
                />
                <div className="grow">Add Equipment</div>
              </div>
            </div>
          </div>
          <div className="shrink-0 mt-3.5 h-px bg-slate-100 max-md:max-w-full" />
        </div>

        <div className="w-[1000px] ml-[70px] mt-0 relative bg-whitesmoke h-[984px] flex flex-col items-center justify-start pt-0 px-[30px] pb-[30px] box-border text-left text-xs text-f2d3d font-table-body-heading">
          <div className="flex flex-col items-center justify-start pt-5 px-0 pb-0">
            <div className="h-[692px] flex flex-col items-start justify-start">
              <div className="w-[1110px] relative bg-theme-white-default shrink-0">
                <div className="absolute top-[0px] left-[0px] w-[1110px] flex flex-col items-start justify-start">
                  <div className="self-stretch relative h-[60px] overflow-hidden shrink-0">
                    <div className="absolute w-full top-[60px] right-[0px] left-[0px] bg-gray-200 box-border h-0 border-t-[1px] border-solid border-border-light" />
                    <div className="absolute top-[18px] left-[22px] text-[20px] leading-[24px] font-medium">
                      Equipment
                    </div>
                    <input
                      className="absolute top-[11px] left-[588px] rounded-[30px] bg-theme-white-default box-border w-[161px] h-[38px] border-[1px] border-solid border-black pl-5"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                      placeholder="Equipment Search...."
                    />
                    <div className="absolute top-[18px] left-[600px] h-[23.75px] flex flex-row ml-28 items-start justify-start">
                     
                    </div>

                    <button
                      className="absolute top-[11px] left-[937px] rounded-md bg-theme-primary-dark w-[156px] flex flex-col items-start justify-start py-2.5 px-5  h-10 box-border text-theme-white-default"
                      onClick={handle3}
                    >
                      <div className="w-24 my-0 mx-[!important] absolute top-[10px] left-[30px] flex flex-row items-center justify-start gap-[8px] z-[0]">
                        <img
                          className="w-5 relative h-5 object-cover"
                          alt=""
                          src={Plus}
                        />
                        <div className="relative font-semibold">
                          Add Equipment
                        </div>
                      </div>
                    </button>
                    <button
                      className="absolute top-[11px] left-[765px] rounded-md  h-10 bg-theme-white-default box-border w-[156px] flex flex-col items-start justify-start py-2.5 px-5 text-theme-primary-dark border-[1px] border-solid border-theme-primary-dark"
                      onClick={() =>
                        generatePDF(targetRef, {
                          filename: "Equipment List.pdf",
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
                  <div className="self-stretch shrink-0  items-start justify-start text-text-body-light">
                    <TableContainer ref={targetRef}>
                      <Table>
                        <TableHead className=" bg-indigo-100 w-full">
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Equipment Name </TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Equipment manufacturer</TableCell>
                            <TableCell>Purchase Date</TableCell>
                            <TableCell>unit Price</TableCell>
                            <TableCell>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {myData
                            .slice(page * rowperpage, page * rowperpage + rowperpage)
                            .filter((item) =>{
                              const toSearch = searchTerm.toLowerCase();
                              const nameMatch = item.name ? item.name.toLowerCase().includes(toSearch) : false;
                              const quantityMatch = item.quantity ? String(item.quantity).includes(toSearch) : false;
                              const manufacturerMatch = item.manufacturer ? item.manufacturer.toLowerCase().includes(toSearch) : false;
                              const purchaseDateMatch = item.purchase_date ? item.purchase_date.includes(toSearch) : false;
                              const unitPriceMatch = item.unit_price ? String(item.unit_price).includes(toSearch) : false;
                            
                              return toSearch === "" ||
                                     nameMatch ||
                                     quantityMatch ||
                                     manufacturerMatch ||
                                     purchaseDateMatch ||
                                     unitPriceMatch;
                            })
                            .map((user) => (
                              <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name} </TableCell>
                                <TableCell>{user.quantity}</TableCell>
                                <TableCell>{user.manufacturer}</TableCell>
                                <TableCell>{user.purchase_date}</TableCell>
                                <TableCell>{user.unit_price}</TableCell>
                                <TableCell>
                                  <div className="w-[190px] relative my-0 mx-[!important] left-[0px] bg-theme-white-default shadow-[0px_-1px_0px_#edf2f7_inset] h-[52px] overflow-hidden shrink-0 z-[22]">
                                  <Link to={`/Inventory/Equipment/${user.id}`}>  <img
                                      className="absolute top-[calc(50%_-_12px)] left-[21px] w-6 h-6 overflow-hidden"
                                      alt=""
                                      src={edit}
                                    /></Link>
                                    <button
                                      className="absolute top-[13px] left-[71px] rounded flex flex-col items-center justify-start py-2 px-4 border-[1px] border-solid border-royalblue"
                                      onClick={() => deleteData(user.id)}
                                    >
                                      <div className="flex flex-row items-center justify-start gap-[6px]">
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
                        rowsPerPage={rowperpage}
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
    </div>
  );
};

export default Equipment;
