import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { AllCrops } from "../Data";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const columns = [
  "Crop Name",
  "Contract Period",
  "Crop Year",
  "Price",
  "Action",
];

const CropsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: 4 }}>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "black" }}>
              {columns.map((column) => (
                <TableCell
                  key={column.name}
                  align={"start"}
                  style={{
                    width: "130px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#3e85d5",
                  }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {AllCrops.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            ).map((crop, index) => {
              return (
                <TableRow key={index} align={"center"}>
                  {Object.keys(crop).map((key) => {
                    return (
                      <TableCell align={"start"} sx={{ width: "130px" }}>
                        {crop[key]}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">
                    <Box display={"flex"}>
                      <Tooltip title="Edit" placement="top" arrow>
                        <IconButton aria-label="edit" sx={{ color: "#64DF78" }}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top" arrow>
                        <IconButton
                          aria-label="delete"
                          sx={{ color: "#CD5767" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={AllCrops.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CropsTable;
