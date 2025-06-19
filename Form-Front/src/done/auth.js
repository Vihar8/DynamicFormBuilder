import {  fetcherPost } from "../utils/axios";

export const endpoints = {
    key: "auth/",
    // updatePassword: "changePassword", 
};

// get portal DropDown list
// export async function updatePassword(formValue) {
//     try {
//       const newData = await fetcherPost([
//         endpoints.key + endpoints.updatePassword,
//         formValue,
//       ]);
//       return newData;
//     } catch (error) {
//       return error;
//     }
//   }