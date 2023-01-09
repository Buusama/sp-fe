import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, FormControl, FormControlLabel, InputLabel, Modal, Select, SelectChangeEvent, Switch, Typography, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataDetailsExport } from "../../data/mockData";
import Header from "../../components/Header";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import React from "react";
import ChiTietDonHang from "./ChiTietDonHang";
import { MenuItem } from "react-pro-sidebar";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const ChoXacNhan = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('lg');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event: SelectChangeEvent<typeof maxWidth>) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const columns = [

    { field: "id", headerName: "Mã Đơn Hàng", flex: 0.1 },
    {
      field: "image", headerName: "", flex: 0.05, renderCell: () => {
        return (
          <Avatar alt="ANH1" src="https://www.google.com.vn/imgres?imgurl=https%3A%2F%2Fcf.shopee.vn%2Ffile%2F796fe3d9f55db5170b6b9f4954faf2ee&imgrefurl=https%3A%2F%2Fshopee.vn%2F%25C3%2581o-kho%25C3%25A1c-th%25E1%25BB%2583-thao-3-s%25E1%25BB%258Dc-ch%25E1%25BA%25A5t-thun-poly-d%25C3%25A0y-d%25E1%25BA%25B7n-i.36052264.4847991977&tbnid=wirxl8DTfyWNSM&vet=12ahUKEwjm8Knigrj8AhUkBKYKHW7dAfIQMygAegUIARC5AQ..i&docid=TjhKRgocfrVx1M&w=1024&h=1024&q=%C3%A1o%20adidas&ved=2ahUKEwjm8Knigrj8AhUkBKYKHW7dAfIQMygAegUIARC5AQ" />
        )
      }
    },
    { field: "name", headerName: "Tên Sản Phẩm", flex: 0.3 },
    { field: "count", headerName: "Số Lượng", flex: 0.1 },
    { field: "money", headerName: "Tổng Tiền", flex: 0.1 },
    { field: "status", headerName: "Trạng Thái", flex: 0.1 },
    {
      field: "edit",
      headerName: "",
      flex: 0.025,
      renderCell: (v: any) => {
        return (
          <Button
          onClick={handleClickOpen}
          variant="text"
          startIcon={<RemoveRedEyeIcon style={{ color: "white" }}
          />}
          ></Button >
        );
      },
    },
    {
      field: "refuse",
      headerName: "",
      flex: 0.06,
      renderCell: () => {
        return (
          <Button
            onClick={() => {

            }}
            sx={{
              backgroundColor: colors.redAccent[700],
              color: colors.grey[100],
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px 20px",
              margin: "0 10px",

            }}
          >
            Từ Chối
          </Button>
        );
      },
    },
    {
      field: "accept",
      headerName: "",
      flex: 0.06,
      renderCell: () => {
        return (

          <Button
            onClick={() => {

            }}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px 20px",
              margin: "0 10px",

            }}
          >
            Xác Nhận
          </Button>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="" subtitle="Danh sách đơn hàng chưa xác nhận" />
      <Typography m="40px 0 10px 10px">

      </Typography>
      <Box
        height="30vh"
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

          rows={mockDataDetailsExport}
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
  );
};

export default ChoXacNhan;
