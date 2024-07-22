import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button,
} from "@mui/material";

const List = ({ items, deleteItem, patientId }) => {
  console.log("item", items);
  return (
    <div className="self-stretch mt-16 overflow-hidden shrink-0 items-start justify-start text-text-body-light w-[970px] ">
      <TableContainer>
        <Table>
          <TableHead className="bg-indigo-100 w-full  pr-5">
            <TableRow>
              <TableCell>Selected Ward</TableCell>
              <TableCell>Number of days</TableCell>
              <TableCell>Daily Charge</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Price</TableCell>
             
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className=" bg-white">
            {items.reverse().map((item, idx) => (
              <TableRow key={idx} >
                <TableCell>{item.medicine}</TableCell>
                <TableCell>{item.quantity_used}</TableCell>
                <TableCell>{item.unit_price}</TableCell>
                <TableCell>{item.usage_date}</TableCell>
                <TableCell>{item.unit_price * item.quantity_used}</TableCell>
                <TableCell>
                  <Button
                    className="top-[5px] left-[0px] mr-10 rounded flex flex-col items-center justify-start py-2 border-[1px] border-solid border-royalblue w-28 mt-3 gap-[6px] leading-[10px] bg-btn font-medium text-white"
                    onClick={() => deleteItem(idx)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
      </TableContainer>
    </div>
  );
};

export default List;
