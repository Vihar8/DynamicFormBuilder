// import { redirect } from 'next/navigation';

// export default function Home() {
//   redirect('/formbuilder');
// }

// app/formbuilder/page.tsx
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
