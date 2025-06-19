const FormManager = require('../manager/form.manager');
const apiResponse = require("../helpers/apiResponse");
const formManager = new FormManager();

class FormController {
  async addForm(req, res) {
  try {
    const result = await formManager.addForm(req);

    if (result[0].flag === 1) {
      return apiResponse.successResponseWithData(res, "Form inserted successfully", result);
    } else if (result[0].flag === 2) {
      return apiResponse.successResponseWithData(res, "Form updated successfully", result);
    } else if (result[0].flag === 3) {
      return apiResponse.ErrorResponse(res, "Duplicate form URL on insert");
    } else if (result[0].flag === 4) {
      return apiResponse.ErrorResponse(res, "Duplicate form URL on update");
    } else {
      return apiResponse.ErrorResponse(res, "Unknown error occurred");
    }
  } catch (error) {
    console.error("Form submission error:", error);
    return apiResponse.expectationFailedResponse(res, "Failed to save form");
  }
}

  async getFormList(req, res) {
    try {
      const result = await formManager.getFormList(req);
      return apiResponse.successResponseWithData(res, "Form List Fecthed Successfully", result);
    } catch (error) {
      console.error("Form Fetch error:", error);
      return apiResponse.expectationFailedResponse(res, "Failed to Fetch form");
    }
  }
  async getFormId(req, res) {
    try {
      const result = await formManager.getFormId(req);
      return apiResponse.successResponseWithData(res, "Form id Fecthed Successfully", result);
    } catch (error) {
      console.error("Form Fetch error:", error);
      return apiResponse.expectationFailedResponse(res, "Failed to Fetch form");
    }
  }
  async delteformid(req, res) {
    try {
      const result = await formManager.delteformid(req);
      return apiResponse.successResponseWithData(res, "Form deleted successfully", result);
    } catch (error) {
      console.error("Form Fetch error:", error);
      return apiResponse.expectationFailedResponse(res, "Failed to Fetch form");
    }
  }
  async updateformid(req, res) {
    try {
      const result = await formManager.updateformid(req);
      return apiResponse.successResponseWithData(res, "Form Status Updated Successfully", result);
    } catch (error) {
      console.error("Form Fetch error:", error);
      return apiResponse.expectationFailedResponse(res, "Failed to Updated Status");
    }
  }
  async publishformid(req, res) {
    try {
      const result = await formManager.publishformid(req);
      return apiResponse.successResponseWithData(res, "Form Status Updated Successfully", result);
    } catch (error) {
      console.error("Form Fetch error:", error);
      return apiResponse.expectationFailedResponse(res, "Failed to Updated Status");
    }
  }
  async publishformurlid(req, res) {
    try {
      const result = await formManager.publishformurlid(req);
      return apiResponse.successResponseWithData(res, "Form Status Updated Successfully", result);
    } catch (error) {
      console.error("Form Fetch error:", error);
      return apiResponse.expectationFailedResponse(res, "Failed to Updated Status");
    }
  }
  async submitformurl(req, res) {
  try {
    // Normalize field names before passing to formManager
    const raw_data = req.body.payload?.form_data || {};
    const normalized_data = {};

    for (const key in raw_data) {
      const normalizedKey = key.toLowerCase().replace(/\s+/g, '_');
      normalized_data[normalizedKey] = raw_data[key];
    }

    // Replace raw form_data with normalized one
    req.body.form_data = normalized_data;

    const result = await formManager.submitformurl(req);

   const flag = result?.flag;

    if (flag === 1) {
      return apiResponse.successResponseWithData(res, "Form inserted successfully", result);
    } else if (flag === 2) {
      return apiResponse.notFoundResponse(res, "Insert failed due to SQL error");
    } else if (flag === 3) {
      return apiResponse.notFoundResponse(res, "Form URL not found");
    } else if (flag === 4) {
      return apiResponse.notFoundResponse(res, "Target table for form not found");
    } else {
      return apiResponse.ErrorResponse(res, "Unknown error occurred");
    }
  } catch (error) {
    console.error("Form Fetch error:", error);
    return apiResponse.expectationFailedResponse(res, "Failed to update status");
  }
}
 async formresponse(req, res) {
  try {
    const result = await formManager.formresponse(req);

    // Since result is directly an array
    if (!Array.isArray(result) || result[0].flag === 4) {
      return apiResponse.notFoundResponse(res, "No data found", []);
    }
    else if( !Array.isArray(result) || result[0].flag === 3){
       return apiResponse.notFoundResponse(res, "You have not publish ever", []);
    }
    return apiResponse.successResponseWithData(res, "Form id Fecthed Successfully", result);
  } catch (error) {
    console.error("Form Fetch error:", error);
    return apiResponse.expectationFailedResponse(res, "Failed to Fetch form");
  }
}
}

module.exports = new FormController();
