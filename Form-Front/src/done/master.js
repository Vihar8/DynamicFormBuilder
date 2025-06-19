import { fetcherPost } from "../utils/axios";

//admin API End Point
export const endpoints = {
  key: "master/",
//   addUpdatePortal: "addUpdatePortal",
};

//  create and update portal
// export async function createPortals(formValue) {
//   try {
//     const newData = await fetcherPost([
//       endpoints.key + endpoints.addUpdatePortal,
//       formValue,
//     ]);
//     return newData;
//   } catch (error) {
//     return error;
//   }
// }