import {
  Box,
  Button,
  Dialog,
  DialogProps,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataDetailsExport } from "../../data/mockData";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import ChiTietDonHang from "./ChiTietDonHang";
import usePreserveQueryNavigate from "../../hooks/usePreserveQueryNavigate";

const HoanThanh = () => {
  const navigate = usePreserveQueryNavigate();
  const { importRequestId } = useParams();
  const [startValue, setStartValue] = React.useState<Dayjs | null>(
    dayjs("2022-04-07")
  );
  const [endValue, setEndValue] = React.useState<Dayjs | null>(
    dayjs("2022-04-07")
  );

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("lg");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    { field: "id", headerName: "Mã Đơn Hàng", flex: 0.35 },
    { field: "doanhthu", headerName: "Doanh thu", flex: 1 },
    { field: "createdAt", headerName: "Ngày tạo", flex: 1 },
    { field: "status", headerName: "Trạng thái", flex: 1 },
    {
      field: "edit",
      headerName: "Xem thêm",
      flex: 0.3,
      renderCell: () => {
        return (
          <Button
            onClick={handleClickOpen}
            variant="text"
            startIcon={<RemoveRedEyeIcon style={{ color: "white" }} />}
          ></Button>
        );
      },
    },
  ];

  return (
    <Box>
      <Box
        marginTop={"40px"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Thống Kê Từ Ngày"
            value={startValue}
            minDate={dayjs("2017-01-01")}
            onChange={(newValue) => {
              setStartValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Thống Kê Tới Ngày"
            value={endValue}
            minDate={dayjs("2017-01-01")}
            onChange={(newValue) => {
              setEndValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          Tim Kiếm
        </Button>
      </Box>

      <Box m="20px">
        <Header title="" subtitle="Danh sách đơn hàng đã giao thành công" />
        <Box
          m="40px 0 0 0"
          height="58vh"
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
          <DataGrid
            rows={mockDataDetailsExport.filter((v) => v.status == "ACCEPT")}
            columns={columns}
            disableSelectionOnClick
          />
        </Box>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
        >
          <Box>
            <ChiTietDonHang />
          </Box>
        </Dialog>
      </Box>
    </Box>
  );
};

export default HoanThanh;
