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

const WardPrice = ({ items, deleteItem, patientId }) => {
  console.log("item", items);
  return (
    <div className="self-stretch mt-16 overflow-hidden shrink-0 items-start justify-start text-text-body-light ">
      <TableContainer>
        <Table>
          <TableHead className="bg-indigo-100 w-full">
            <TableRow>
              <TableCell>Selected Ward</TableCell>
              <TableCell>Number of days</TableCell>
              <TableCell>Daily Charge</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className=" bg-white">
            {items.reverse().map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.itemName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.price * item.quantity}</TableCell>
                <TableCell>
                  <Button
                    className="top-[5px] mr-12  rounded flex flex-col items-center justify-start py-2 px-4 border-[1px] border-solid border-royalblue w-28 mt-3 gap-[6px] leading-[10px] bg-btn font-medium text-white"
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

export default WardPrice;
