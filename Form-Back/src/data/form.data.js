const db = require("../../config/database.js");
// const { encryptDataWithoutSlash, decryptDataWithoutSlash } = require("../helpers/utility.js");



class FormData {
  async addForm(req) {
    const p_form_id = req.body.id || "";
    const { formTitle, formType, formUrl, fields, created_by } = req.body;
    const procedureName = "usp_dup_save_form";

    try {
      const result = await db.execute(
        `CALL ${procedureName}(?, ?, ?, ?, ?, ?)`,
        [
          p_form_id || 0, // pass 0 if no id (to trigger insert)
          formTitle,
          formUrl,
          formType,
          JSON.stringify(fields),
          created_by 
        ]
      );
      return result[0][0];
    } catch (error) {
      console.error('Error adding Form:', error);
      throw error;
    }
  }

  async getFormList(req) {
    const search = req.body.search || "";
    const page = req.body.page || 1;
    const size = req.body.size || 10;

    const procedureName = "usp_get_form_list";

    try {
      const [result] = await db.execute(
        `CALL ${procedureName}(?, ?, ?)`,
        [search, page, size]
      );
      const totalRecords = result[0][0].totalRecords; // First SELECT
      const forms = result[1];   
       return {
      totalRecords,
      forms
    };  
    } catch (error) {
      console.error('Error adding Form:', error);
      throw error;
    }
  }
  async getFormId(req) {
    const p_form_id = req.body.id || "";

    const procedureName = "usp_get_form_id";

    try {
      const result = await db.execute(
        `CALL ${procedureName}(?)`,
        [p_form_id]
      );
      return result[0][0];
    } catch (error) {
      console.error('Error get details of Form:', error);
      throw error;
    }
  }
async delteformid(req) {
  const P_form_id = req.body.form_id || "";

  const procedureName = "usp_soft_delete_form";

  try {
    await db.execute(`CALL ${procedureName}(?)`, [P_form_id]);
    return { success: true, message: "Form deleted successfully" };
  } catch (error) {
    console.error('Error deleting Form:', error);
    throw error;
  }
}
async updateformid(req) {
  const P_form_id = req.body.form_id || "";

  const procedureName = "usp_form_active_status";

  try {
    await db.execute(`CALL ${procedureName}(?)`, [P_form_id]);
    return { success: true, message: "Form Status Updated Successfully" };
  } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
}
async publishformid(req) {
  const P_form_id = req.body.form_id || "";

  const procedureName = "usp_toggle_publish_form";

  try {
    await db.execute(`CALL ${procedureName}(?)`, [P_form_id]);
    return { success: true, message: "Form Published Updated Successfully" };
  } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
}
async publishformurlid(req) {
  const p_form_url = req.body.form_url || "";

  const procedureName = "usp_get_form_by_url";

  try {
    const result = await db.execute(`CALL ${procedureName}(?)`, [p_form_url]);
    return result[0][0];
  } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
}
async submitformurl(req) {
  const form_url = req.body.payload?.form_url || "";
  const form_data = req.body.form_data || {}; // JSON object

  const procedureName = "usp_dup_submit_form_data";

 try {
    const [rows] = await db.execute(
      `CALL ${procedureName}(?, ?)`,
      [form_url, JSON.stringify(form_data)]
    );

    // Most stored procedures return a result set as rows[0]
    return rows?.[0]?.[0] || {};
  } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
}
  async formresponse(req) {
    const p_form_id = req.body.form_id || "";

    const procedureName = "usp_get_form_responses";

    try {
      const result = await db.execute(
        `CALL ${procedureName}(?)`,
        [p_form_id]
      );
      return result[0][0];
    } catch (error) {
      console.error('Error get details of Form:', error);
      throw error;
    }
  }
}


module.exports = FormData;
