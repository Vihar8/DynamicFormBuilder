import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Avatar, Button, Stack } from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import classes from "./CommonDialog.module.scss";

export default function CommonDialog({
  open=false,
  onClose,
  content,
  variant,
  id,
  actionById
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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
      backgroundColor:'#e9fee7 !important'
    },
    "& .MuiBackdrop-root": {
      backgroundColor: "rgba(0, 0, 0, 0) !important", // Forcefully set the background to transparent
    },
  }}
    >
      <Stack alignItems="center" spacing={3.5} className={`${classes.AvatarBox}`}>
        <Avatar className={`${classes.modalAvatar} 
        ${variant === "update"?classes.update:classes.delete}`}>
          {variant === "update" ?  <EditOutlined className={`${classes.update}`}/>: variant === "delete" ?<DeleteOutlined className={`${classes.delete}`} /> :"" }
        </Avatar>
      </Stack>
      <DialogContent>
        <DialogContentText className={`${classes.modalContent}`}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={`${classes.modalActions}`}>
        <Button type="button" variant="outlined" className="!mr-1" color="primary" size="small" onClick={() => onClose(false)}> No </Button>
        <Button type="button" variant="contained" color="success" size="small" onClick={() => actionById(id)} > Yes, sure </Button>
      </DialogActions>
    </Dialog>
  );
}
