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
    <div className="self-stretch mt-16 overflow-hidden shrink-0 items-start justify-start text-text-body-light  w-[1000px] ">
      <TableContainer>
        <Table>
          <TableHead className="bg-indigo-100 w-full mr-5">
            <TableRow>
              <TableCell>Doctor</TableCell>
              <TableCell>Total Visit</TableCell>
             
              <TableCell>Price</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
             
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className=" bg-white">
            {items.reverse().map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.doctor}</TableCell>
                <TableCell>{item.total_visits}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.price * item.total_visits}</TableCell>
                <TableCell>
                  <Button
                    className="top-[5px]  rounded flex flex-col items-center justify-start  right-7 px-4 border border-solid  border-blue-600 w-28 mt-3 gap-[6px] leading-[10px] bg-btn font-medium text-white"
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
