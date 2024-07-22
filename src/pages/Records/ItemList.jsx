import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";

const ItemList = ({ items, selectedPatient, onDeleteItem , total }) => {
console.log(items)
  return (
    <div>
    
    <div className="self-stretch  mt-16  overflow-hidden shrink-0  items-start justify-start text-text-body-light ">
   
      <TableContainer >
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
		  <TableBody className=" bg-white">
		  {items.reverse().map((item, index) => (
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
