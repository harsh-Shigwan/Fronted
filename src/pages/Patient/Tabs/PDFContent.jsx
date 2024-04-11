import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
} from "@mui/material";

const PDFContent = ({ hospitalName, hospitalAddress, data, page, rowPerPage, searchTerm, handlechangepage, handleRowPerPage }) => (
  <div className=" mt-10">
    <div className=" bg-slate-900 mt-5">Hospital Name: {hospitalName}</div>
    <div className=" bg-yellow-800  mt-5">Address: {hospitalAddress}</div>
    <br />
    <div>Billing Information:</div>
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Sex</TableCell>
              <TableCell>Blood</TableCell>
              <TableCell>Date Of Birth</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
              .filter(
                (item) =>
                  searchTerm.toLowerCase() === "" ||
                  item.FirstName.toLowerCase().includes(searchTerm)
              )
              .map((user) => (
                <TableRow key={user.PatientID}>
                  <TableCell>{user.PatientID}</TableCell>
                  <TableCell>{user.FirstName}</TableCell>
                  <TableCell>{user.Gender}</TableCell>
                  <TableCell>{user.blood}</TableCell>
                  <TableCell>{user.DOB}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>Action Button</TableCell> {/* Add your action button here */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        count={20}
        page={page}
        rowsPerPage={rowPerPage}
        onPageChange={handlechangepage}
        onRowsPerPageChange={handleRowPerPage}
      />
    </div>
  </div>
);

export default PDFContent;
