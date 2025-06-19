const FormData = require("../data/form.data");
const formData = new FormData();

class FormManager {

	 async addForm(req) {
        try {
           const result = await formData.addForm(req);  
            return result 
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            console.log(errorLog)
        }
    }
	 async getFormList(req) {
        try {
           const result = await formData.getFormList(req);  
        return result 
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            console.log(errorLog)
        }
    }
	 async getFormId(req) {
        try {
           const result = await formData.getFormId(req);  
        return result 
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            console.log(errorLog)
        }
    }
	 async delteformid(req) {
        try {
           const result = await formData.delteformid(req);  
        return result 
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            console.log(errorLog)
        }
    }
	 async updateformid(req) {
        try {
           const result = await formData.updateformid(req);  
        return result 
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            console.log(errorLog)
        }
    }
	 async publishformid(req) {
        try {
           const result = await formData.publishformid(req);  
            return result 
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            console.log(errorLog)
        }
    }
	 async publishformurlid(req) {
        try {
           const result = await formData.publishformurlid(req);  
            return result 
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            console.log(errorLog)
        }
    }
	 async submitformurl(req) {
        try {
           const result = await formData.submitformurl(req);  
            return result 
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            console.log(errorLog)
        }
    }
    	 async formresponse(req) {
        try {
           const result = await formData.formresponse(req);  
        return result 
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            console.log(errorLog)
        }
    }
}

module.exports = FormManager;
