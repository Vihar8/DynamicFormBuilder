import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Avatar, Stack } from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { InfoCircleOutlined, CheckOutlined } from "@ant-design/icons";
import { red, green } from "@mui/material/colors";

export default function CommonDialog({
  open,
  onClose,
  content,
  actions,
  errorAlert,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const getAvatarColor = () => {
    if (errorAlert === "error") {
      return red[50];
    } else if (errorAlert === "success") {
      return green[100];
    }
    return undefined; // Handle other cases or default color if needed
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="common-dialog-title"
      sx={{
    "& .MuiDialog-paper": {
      width: "430px",
      maxWidth: "100%",
      height: "auto",
      boxShadow: "0px 0px 0px 0px rgba(0.1, 0.1, 0.1, 0.1)",
      borderRadius:"12px",
      backgroundColor:'#fdf3e7 !important'
    },
    "& .MuiBackdrop-root": {
      backgroundColor: "rgba(0, 0, 0, 0) !important", // Forcefully set the background to transparent
    },
  }}
    >
      <Stack alignItems="center" spacing={3.5} className="px-5 pt-7 pb-2">
        <Avatar
          className="!w-[60px] !h-[60px] !min-w-[60px] !min-h-[60px]"
          sx={{
            fontSize: "1.75rem",
            bgcolor: green[500],
          }}
        >
          {errorAlert === "error" ? (
            <InfoCircleOutlined style={{ color: red[500] }} />
          ) : errorAlert === "success" ? (
            <CheckOutlined style={{ color: "white" }} />
          ) : errorAlert === "delete" ? (
            <DeleteOutlined style={{ color: red[500] }} />
          ) : (
            <EditOutlined />
          )}
        </Avatar>
      </Stack>
      {/* <DialogTitle id="common-dialog-title" className='!text-largetext !font-bold text-center !text-primary-Color2'>
                {title}
            </DialogTitle> */}
      <DialogContent>
        <DialogContentText className="!text-mediumtext !font-bold text-center !text-primary-Color2">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions className="!px-5 !pb-5">{actions}</DialogActions>
    </Dialog>
  );
}
