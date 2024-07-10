import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useFormik } from "formik";
import * as yup from "yup";
import { formattedDate } from "../helpers/formattedDate";
import { useDispatch, useSelector } from "react-redux";
import { addCrop, editCrop } from "../store/reducers/cropSlice";
import { AllCrops } from "../Data";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useState } from "react";
// import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = yup.object({
  cropName: yup.string().required("Crop Name is required"),
  cropYear: yup
    .number()
    // .required("Crop Year is required")
    .oneOf([2022, 2023, 2024, 2025, 2026, 2027], "Invalid Crop Year"),
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price must be a positive number"),
  startDate: yup.date().required("Start Date is required"),
  endDate: yup
    .date()
    .required("End Date is required")
    .min(yup.ref("startDate"), "End Date cannot be before Start Date"),
});

const EditCropModal = ({ open, editIdx, handleCloseEditModal }) => {
  const dispatch = useDispatch();
  const crops = useSelector((state) => state.crops);
  //   const [crops, setCrops] = useState(allCrops);
  const formatDateObject = (date) => {
    const format = "DD MMM YYYY";
    const dateObject = dayjs(date, format);
    return dateObject;
  };

  const editableIndexCrop = crops.find((ele, idx) => idx === editIdx);
  const editingCrop = {
    cropName: editableIndexCrop.cropName,
    cropYear: editableIndexCrop.cropYear,
    price: editableIndexCrop.price,
    startDate: formatDateObject(editableIndexCrop.contractPeriod.slice(0, 11)),
    endDate: formatDateObject(editableIndexCrop.contractPeriod.slice(14, 26)),
  };

  const handleClosePopup = () => {
    // setOpenEditCropModal(false);
    handleCloseEditModal();
  };

  const formik = useFormik({
    initialValues: editingCrop,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
        const editedObj = {
          cropName: values.cropName,
          contractPeriod: `${formattedDate(values.startDate)} - ${formattedDate(
            values.endDate
          )}`,
          cropYear: values.cropYear,
          price: values.price,
        };
        // crops[editIdx]= values;
        // console.log(crops)
        // dispatch(editCrop(crops));
        // handleClosePopup();
      const editedCrops = crops.map((crop, idx) =>
        idx === editIdx ? editedObj : crop
      );

      console.log("Updated crops array:", editedCrops);
      dispatch(editCrop(editedCrops));
      handleClosePopup();
      toast.success('Item edited successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
        });
    },
  });

  //   useEffect(()=>{
  //     setCrops()
  //   },[dispatch]);

  return (
    <Dialog
      open={open}
      onClose={handleClosePopup}
      PaperProps={{
        component: "form",
        // onSubmit: formik.handleSubmit,
        onSubmit: (e) => {
          e.preventDefault(); // Prevent default form submission
          // console.log("Form is being submitted"); // Debugging log
          // console.log("Formik Values:", formik.values); // Debugging log
          formik.handleSubmit(e); // Call Formik's handleSubmit
          // console.log("Formik Errors:", formik.errors); // Debugging log
        },
      }}
      fullWidth
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <DialogTitle sx={{ fontSize: 20 }}>
          Edit Crop contract details
        </DialogTitle>
        <CloseOutlined
          sx={{ marginRight: 3, marginTop: 2, cursor: "pointer", color: "red" }}
          onClick={handleClosePopup}
        />
      </Box>

      <DialogContent>
        <Stack spacing={2}>
          {/* Crop Name */}
          <FormControl>
            <FormLabel>Crop Name</FormLabel>
            <TextField
              // label="Crop Name"
              name="name"
              autoComplete="off"
              variant="outlined"
              value={formik.values.cropName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.cropName && Boolean(formik.errors.cropName)}
              helperText={formik.touched.cropName && formik.errors.cropName}
            />
          </FormControl>

          {/* Contract Period */}
          <FormControl>
            <FormLabel sx={{ mb: 1 }}>Contract Period</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <DatePicker
                  label="Start Date"
                  value={formik.values.startDate}
                  onChange={(date) => formik.setFieldValue("startDate", date)}
                  components={{
                    TextField: (params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={
                          formik.touched.startDate &&
                          Boolean(formik.errors.startDate)
                        }
                        helperText={
                          formik.touched.startDate && formik.errors.startDate
                        }
                      />
                    ),
                  }}
                  sx={{ width: "100%" }}
                  inputFormat="dd/MM/yyyy"
                />
                <Box fontSize={"20px"}>&#x2010;</Box>
                <Box sx={{ width: "100%" }}>
                  <DatePicker
                    label="End Date"
                    value={formik.values.endDate}
                    onChange={(date) => formik.setFieldValue("endDate", date)}
                    components={{
                      TextField: (params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={
                            formik.touched.endDate &&
                            Boolean(formik.errors.endDate)
                          }
                          helperText={
                            formik.touched.endDate && formik.errors.endDate
                          }
                        />
                      ),
                    }}
                    sx={{ width: "100%" }}
                    minDate={formik.values.startDate}
                  />
                  {formik.touched.endDate && formik.errors.endDate && (
                    <Box sx={{ color: "red", fontSize: "12px", mt: 1 }}>
                      {"End Date cannot be before Start Date"}
                    </Box>
                  )}
                </Box>
              </Box>
            </LocalizationProvider>
          </FormControl>

          {/*  Crop Year & Price*/}
          <Box display={"flex"} gap={2}>
            <FormControl fullWidth>
              <FormLabel sx={{ marginBottom: "4" }}>Crop Year</FormLabel>
              <Select
                value={formik.values.cropYear}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                variant="outlined"
                error={
                  formik.touched.cropYear && Boolean(formik.errors.cropYear)
                }
                name="cropYear"
              >
                <MenuItem value="Select Crop Year">Select Crop Year</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2024}>2024</MenuItem>
                <MenuItem value={2025}>2025</MenuItem>
                <MenuItem value={2026}>2026</MenuItem>
                <MenuItem value={2026}>2027</MenuItem>
              </Select>
              {formik.touched.cropYear && formik.errors.cropYear && (
                <Box sx={{ color: "red", fontSize: "12px", mt: 1 }}>
                  {"Select a valid year"}
                </Box>
              )}
            </FormControl>
            <FormControl fullWidth>
              <FormLabel>Price</FormLabel>
              <TextField
                // label="Price"
                variant="outlined"
                type="number"
                inputProps={{ min: 0, step: 0.01 }}
                fullWidth
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                name="price"
              />
            </FormControl>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ m: 1, width: "25ch" }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCropModal;
