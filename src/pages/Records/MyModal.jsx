import React, { useState, useRef, useEffect } from "react";
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
const MyModal = ({checkModel , item}) => {
    useEffect(() => {
      document.body.style.overflowY = "hidden";
      return () => {
        document.body.style.overflowY = "auto";
      };
    }, []);
  
    return (
      <div>
        <div
          className="fixed inset-0  bg-sky-50 bg-opacity-80"
          onClick={checkModel}
        ></div>
        <div className="fixed top-2/4 left-2/4  transform -translate-x-2/4 -translate-y-2/4   rounded-md shadow-lg">
          <div className="max-h-[80vh] overflow-y-auto no-scrollbar">
            <div className="bg-theme-white-default box-border border-2  h-100 w-[850px]">
            <div className=" h-28 bg-slate-400"></div>
            </div>
          </div>
        <Table>
        <TableBody>
        {item.map((it, index) => (
            <TableRow key={index}>
            <TableCell>{it.selectedItem}</TableCell>
            <TableCell>{it.quantity}</TableCell>
      <TableCell>{it.selectedPatient}</TableCell>
            <TableCell>{it.price}</TableCell>
    
      
            </TableRow>
        ))}
        </TableBody>
        </Table>
        </div>
      </div>
    );
  };
  

export default MyModal