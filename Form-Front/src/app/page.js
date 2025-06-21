'use client';
import FormBuilder from "./formbuilder/page.js";
import { Box } from "@mui/material";
import LoaderCommon from "./commoncomponents/Loader/LoaderCommon";

export default function Home() {
  return (
    <>
      <FormBuilder />
      <Box id='appCommonLoader'>
        <LoaderCommon />
      </Box>
    </>
  );
}
