import { AddCircleOutline } from "@mui/icons-material";
import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";
import AddCropModal from "./components/AddCropModal";
import { useState } from "react";
import CropsTable from "./components/CropsTable";

function App() {

  const [open, setOpen] = useState(false);

  const handleOpenAddCropModal = () =>{
    setOpen(true)
  }
  const handleCloseAddCropModal = () =>{
    setOpen(false)
  }
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
        <AddCropModal open={open} handleCloseAddCropModal={handleCloseAddCropModal}/>

        {/* Table */}
        <CropsTable/>
      </Container>
    </div>
  );
}

export default App;
