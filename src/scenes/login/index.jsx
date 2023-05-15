import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { Formik } from "formik";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import * as yup from "yup";
import { setCurrentUser } from "../../helpers/setGet";

const Login = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    try {
      const login = await axios.post(
        "https://hardy-mind-production.up.railway.app/login",
        values
      );
      const response = login.data;

      if (response.success) {
        switch (response.data.role) {
          case 0:
            window.location.href = "/";

            setCurrentUser(response.data);
            break;
          case 1:
            window.location.href = "/transactions";
            setCurrentUser(response.data);
            break;
          default:
            window.location.href = "/home";
            setCurrentUser(response.data);
            break;
        }
      } else {
        NotificationManager.warning("Error", "Someting wrong", 3000);
      }
    } catch (error) {
      NotificationManager.error("Error", "API Error", 3000);
    }
  };

  return (
    <Box m="250px">
      <div
        style={{
          fontSize: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "2rem",
          color: "#00BCD4", // Ubah warna judul
          fontFamily: "Arial, sans-serif", // Ubah font judul
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Tambahkan efek shadow
        }}
      >
        WASTE BANK
      </div>

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
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              gap="30px"
              width="10rem"
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
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="primary" variant="contained">
                LOGIN
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <NotificationContainer />
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});
const initialValues = {
  email: "",
  password: "",
};

export default Login;
