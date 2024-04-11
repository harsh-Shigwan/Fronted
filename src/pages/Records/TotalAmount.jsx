
// components/TotalAmount.js
import React from 'react';
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
const TotalAmount = ({ total }) => {
    return (
        <div className="font-bold text-xl mt-20 absolute top-32 right-[200px]">
            <TableContainer>
               <Table>
                Total Amount:
                Rupees {total.toFixed(2)}
                </Table>
            </TableContainer>
        </div>
    );
};
 
export default TotalAmount;