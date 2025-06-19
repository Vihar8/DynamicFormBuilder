import { fetcherPost, fetcherPostFormData } from "../utils/axios";

export const endpoints = {
    key: "form/",
    submitform: "submitform",
    formlist: "form-list",
    formbyid: "formbyid",
    formdelete: "formdelete",
    formstatus: "formstatus",
    publishstatus: "publishstatus",
    publishformurlbyid: "publishformurlbyid",
    submitformclient: "submitformclient",
    formresponses: "formresponses"
};

// Post form 
export async function submitform(formValue) {
  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.submitform,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}

// get form list
export async function formlist(formValue) {
  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.formlist,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}
// get form list by id
export async function formbyid(formValue) {
  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.formbyid,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}
// delete by id
export async function formdelete(formValue) {
  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.formdelete,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}
// update by id
export async function formstatus(formValue) {
  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.formstatus,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}

// update by id
export async function publishstatus(formValue) {
  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.publishstatus,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}
// update by id
export async function publishformurlbyid(formValue) {
  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.publishformurlbyid,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}
// submit form by url
export async function submitformclient(formValue) {
  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.submitformclient,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}

// get form response list by id
export async function formresponses(formValue) {
  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.formresponses,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}