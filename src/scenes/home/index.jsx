import { MoneyOutlined } from "@mui/icons-material";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { mockDataTransactions } from "../../data/mockData";
import { tokens } from "../../theme";

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "Tx ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "wasteType",
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
                  v === 1
                    ? colors.redAccent[600]
                    : v === 2
                    ? colors.blueAccent[700]
                    : colors.greenAccent[700]
                }
                borderRadius="4px"
                key={v}
              >
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                  {v}
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

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="HOME" subtitle="Home" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <MoneyOutlined sx={{ mr: "10px" }} />
            Withdraw Balance
          </Button>
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
        <DataGrid checkboxSelection rows={mockDataTransactions} columns={columns} />
      </Box>
    </Box>
  );
};

export default Home;
