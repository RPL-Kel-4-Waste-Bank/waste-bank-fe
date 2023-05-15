import { TimelineOutlined } from "@mui/icons-material";
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Popup from 'reactjs-popup';
import * as yup from "yup";
import Header from "../../components/Header";
import { tokens } from "../../theme";


const Transactions = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tx, setTx] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("https://hardy-mind-production.up.railway.app/transaction")
      .then((res) => {
        if (res.data.success) {
          setTx(res.data.data);
        }
      })
      .catch((err) => {
        NotificationManager.error('Error', err.message, 3000);
      })
  }, [])

  const columns = [
    { field: "id",
      headerName: "Tx ID",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "type",
      headerName: "Waste Type",
      headerAlign: "left",
      align: "left",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {params.value.map((v) => {
              return <Box 
                width="50%"
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                backgroundColor={
                  v.name === "waste1"
                    ? colors.redAccent[600]
                    : v.name === "waste2"
                    ? colors.blueAccent[700]
                    : colors.greenAccent[700]
                }
                borderRadius="4px"
                key={v.name}
              >
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                  {v.weight} Ons
                </Typography>
              </Box>
            })}
          </>
        );
      },
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          IDR {params.row.cost}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];

  const contentStyle = {
    height: "70vh",
    width: "70%",
    backgroundColor: "#00008bab",
    backdropFilter: "blur(6px)",
    borderRadius: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const handleFormSubmit = async(values) => {
    try {
      const transaction = await axios.post("https://hardy-mind-production.up.railway.app/transaction", values);
      const response = transaction.data;
      if (response.success) {
        NotificationManager.success('Success', 'Success add transaction', 3000);
      } else {
        NotificationManager.warning('Error', 'Someting Wrong', 3000);
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error('Error', 'API Error', 3000);
    }

  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TRANSACTIONS" subtitle="List of Transactions" />
        <Box>
          <Popup modal contentStyle={contentStyle} trigger={<Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <TimelineOutlined sx={{ mr: "10px" }} />
            Add Transaction
          </Button>} position="center center">
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={checkoutSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    gap="20px"
                    width="20rem"
                    sx={{
                      "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                  >
                    <TextField
                      variant="filled"
                      type="text"
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      variant="filled"
                      type="number"
                      label="Weight Waste 1 (Ons)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.waste1}
                      name="waste1"
                      error={!!touched.waste1 && !!errors.waste1}
                      helperText={touched.waste1 && errors.waste1}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      variant="filled"
                      type="number"
                      label="Weight Waste 2 (Ons)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.waste2}
                      name="waste2"
                      error={!!touched.waste2 && !!errors.waste2}
                      helperText={touched.waste2 && errors.waste2}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      variant="filled"
                      type="number"
                      label="Weight Waste 3 (Ons)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.waste3}
                      name="waste3"
                      error={!!touched.waste3 && !!errors.waste3}
                      helperText={touched.waste3 && errors.waste3}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      variant="filled"
                      type="number"
                      label="Cost Total"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.cost}
                      name="cost"
                      error={!!touched.cost && !!errors.cost}
                      helperText={touched.cost && errors.cost}
                      sx={{ gridColumn: "span 4" }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                      Submit
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Popup>
          
        </Box>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={tx} columns={columns} />
      </Box>
      <NotificationContainer/>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
});
const initialValues = {
  email: "",
  waste1: 0,
  waste2: 0,
  waste3: 0,
  cost: 0,
};

export default Transactions;
