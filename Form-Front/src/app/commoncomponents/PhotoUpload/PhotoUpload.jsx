import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CameraOutlined } from "@ant-design/icons";
import classes from "./PhotoUpload.module.scss";

const PhotoUpload = ({ defaultImage, onImageSelect }) => {
  const [avatar, setAvatar] = useState(defaultImage);
  const [selectedImage, setSelectedImage] = useState(undefined);

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
      if (onImageSelect) onImageSelect(selectedImage);
    }
  }, [selectedImage, onImageSelect]);

  return (
    <Stack spacing={2} alignItems="center">
      <FormLabel
        htmlFor="change-avatar"
        className={`${classes.formLabel}`}
        sx={{
          "&:hover .MuiBox-root": { opacity: 1 },
        }}
      >
        <Avatar alt="Avatar" src={avatar} className={`${classes.imgStyle}`} />
        <Box className={`${classes.imgHoverBox}`}>
          <Stack spacing={0.5} alignItems="center">
            <CameraOutlined className={`${classes.uploadIcon}`} />
            <Typography className={`${classes.uploadText}`}>Upload</Typography>
          </Stack>
        </Box>
      </FormLabel>
      <TextField
        type="file"
        id="change-avatar"
        placeholder="Outlined"
        variant="outlined"
        sx={{ display: "none" }}
        onChange={(e) => setSelectedImage(e.target.files?.[0])}
      />
    </Stack>
  );
};

export default PhotoUpload;
