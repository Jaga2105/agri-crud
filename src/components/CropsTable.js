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
// import { AllCrops } from "../Data";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditCropModal from "./EditCropModal";

const columns = [
  "Crop Name",
  "Contract Period",
  "Crop Year",
  "Price (₹)",
  "Actions",
];

const CropsTable = ({crops, setEditIdx, setOpenEditCropModal, handleDeleteCrop}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [openEditCropModal, setOpenEditCropModal]= useState(false);
//   const [editIdx, setEditIdx] = useState(-1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleEditModal = (index)=>{
    console.log("edit clicked")
    setEditIdx(index);
    setOpenEditCropModal(true)
  }
//   const handleDeleteCrop = (index) =>{
    
//   }
//   const handleCloseEditModal = ()=>{
//     setEditIdx(-1);
//     setOpenEditCropModal(false)
//   }
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: 4 }}>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "black" }}>
              {columns.map((column) => (
                <TableCell
                  key={column.name}
                  align={"center"}
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
            {crops.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            ).map((crop, index) => {
              return (
                <TableRow key={index} align={"center"}>
                  {Object.keys(crop).map((key) => {
                    return (
                      <TableCell align={"center"} sx={{ width: "80px" }}>
                        {crop[key]}
                      </TableCell>
                    );
                  })}
                  <TableCell align="start">
                    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                      <Tooltip title="Edit" placement="top" arrow>
                        <IconButton aria-label="edit" sx={{ color: "#64DF78" }}
                         onClick={()=>handleEditModal(index)}
                         >
                            {console.log(1)}
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top" arrow>
                        <IconButton
                          aria-label="delete"
                          sx={{ color: "#CD5767" }}
                          onClick={()=>handleDeleteCrop(index)}
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
        count={crops.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* <EditCropModal open={openEditCropModal} editIdx={editIdx} setOpenEditCropModal={setOpenEditCropModal}/> */}
    </Paper>
  );
};

export default CropsTable;
