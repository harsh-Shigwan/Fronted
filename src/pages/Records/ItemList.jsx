import React, { useState, useRef, useEffect } from "react";
import generatePDF from "react-to-pdf";
import download from "../../Data/download.png";
import MyModal from "./MyModal";
 import jsPDF from "jspdf";
 import 'jspdf-autotable';
 import  logo_hospital from '../../Data/logo_hospital.png'
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
import TotalAmount from "./TotalAmount";
const ItemList = ({ items, selectedPatient, onDeleteItem , total }) => {
console.log(items)
    const targetRef = useRef();
    const [ showModal , setShowModel] = useState(false);
  
  

  
  return (
    <div>
    
    <div className="self-stretch  mt-16  overflow-hidden shrink-0  items-start justify-start text-text-body-light">
    <div>
	<button
	className="absolute top-[70px] left-[1065px] rounded-md  h-10 bg-theme-white-default box-border w-[156px] flex flex-col items-start justify-start py-2.5 px-5 text-theme-primary-dark border-[1px] border-solid border-theme-primary-dark"
	onClick={()=>{ setShowModel(true)}}
  >
	<div className="w-24 my-0 mx-[!important] absolute top-[calc(50%_-_8px)] left-[calc(50%_-_48px)] flex flex-row items-center justify-start gap-[8px] z-[0]">
	  <img
		className="w-4 relative h-4 overflow-hidden shrink-0"
		alt=""
		src={download}
	  />
	  <div className="relative font-semibold">Download </div>
	</div>
  </button>{showModal && <MyModal checkModel={()=>{setShowModel(false)}} />}</div>
      <TableContainer ref={targetRef}>
        <Table>
          <TableHead className=" bg-indigo-100 w-full">
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>patient</TableCell>
              <TableCell>Price</TableCell>
			  <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
		  <TableBody>
		  {items.map((item, index) => (
			  <TableRow key={index}>
			  <TableCell>{item.selectedItem}</TableCell>
			  <TableCell>{item.quantity}</TableCell>
        <TableCell>{item.selectedPatient}</TableCell>
			  <TableCell>{item.price*item.quantity}</TableCell>
			  <buttons
			  className=" top-[13px] left-[71px] rounded flex flex-col items-center justify-start py-2 px-4 border-[1px] border-solid border-royalblue  w-28 mt-3 gap-[6px] leading-[10px] bg-btn font-medium text-white "
			  onClick={() => onDeleteItem(index)}
			>
			  Delete
			</buttons>
		
			  </TableRow>
		  ))}
		  </TableBody>
		
        </Table>
		<div className=" font-bold text-[19px] mt-20 w-[350px]   ml-[650px] top-32 right-[0px] flex gap-5 justify-between h-12 p-4  text-base leading-4 text-gray-700 rounded-md bg-slate-100">
		Total Amount:
		Rupees {total.toFixed(2)}
		</div>
      </TableContainer>
    
   
    </div></div>
  );
};

export default ItemList;
