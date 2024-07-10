import { AddCircleOutline } from "@mui/icons-material";
import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";
import AddCropModal from "./components/AddCropModal";
import { useEffect, useState } from "react";
import CropsTable from "./components/CropsTable";
import { useDispatch, useSelector } from "react-redux";
import { AllCrops } from "./Data";
import EditCropModal from "./components/EditCropModal";
import { deleteCrop } from "./store/reducers/cropSlice";

function App() {

  const [openAddCropModal, setOpenAddCropModal] = useState(false);
  const allCrops = useSelector((state) => state.crops);
  console.log(allCrops)
  const [crops, setCrops] =useState(allCrops)
  const [openEditCropModal, setOpenEditCropModal]= useState(false);
  const [editIdx, setEditIdx] = useState(-1);
  const dispatch= useDispatch();

  const handleOpenAddCropModal = () =>{
    setOpenAddCropModal(true)
  }

  const handleCloseAddCropModal = () =>{
    setOpenAddCropModal(false)
  }
  const handleCloseEditModal = ()=>{
    console.log("edit closed")
    setEditIdx(-1);
    setOpenEditCropModal(false)
  }
  const handleDeleteCrop = (index) =>{
    // setDeleteIndex(index)
    const updatedArr = crops.filter((crop,idx)=>idx!=index);
    dispatch(deleteCrop(updatedArr));
    setCrops(updatedArr)
  }
  useEffect(()=>{
    setCrops(allCrops);
  },[openAddCropModal, editIdx, dispatch])
  console.log(crops)

  return (
    <div>
      {/* <CssBaseline /> */}
      {/* <Container maxWidth="sm" sx={{ bgcolor: "#cfe8fc", height: "100vh" }}> */}
      <Container maxWidth="sm">
        <Box  sx={{mb:4}}>
          <Box
            mt={4}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" my={1} color="primary">
              Crop Details
            </Typography>
            <Button variant="outlined" endIcon={<AddCircleOutline />} onClick={handleOpenAddCropModal}>
              Add New
            </Button>
          </Box>
          {/* <Box  /> */}
        </Box>
        <AddCropModal open={openAddCropModal} handleCloseAddCropModal={handleCloseAddCropModal}/>

        {/* Table */}
        <CropsTable crops={crops} setEditIdx={setEditIdx} setOpenEditCropModal={setOpenEditCropModal} handleDeleteCrop={handleDeleteCrop}/>
        {openEditCropModal && (
          <EditCropModal open={openEditCropModal} editIdx={editIdx} handleCloseEditModal={handleCloseEditModal}/>
        )}
        {/* <EditCropModal open={openEditCropModal} editIdx={editIdx} setOpenEditCropModal={setOpenEditCropModal}/> */}

      </Container>
    </div>
  );
}

export default App;
