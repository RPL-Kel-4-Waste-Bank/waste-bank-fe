import { LogoutOutlined } from "@mui/icons-material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, IconButton, useTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { useContext } from "react";
import { logoutUser } from "../../helpers/setGet";
import { ColorModeContext, tokens } from "../../theme";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "10px",
              fontWeight: "bold",
              padding: "5px 10px",
            }}
            onClick={logoutUser}
          >
            <LogoutOutlined sx={{ mr: "10px" }} />
            Logout
          </Button>
      </Box>
    </Box>
  );
};

export default Topbar;
