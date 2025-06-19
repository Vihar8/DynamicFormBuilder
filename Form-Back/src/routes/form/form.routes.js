const express = require("express");
const formController = require("../../controllers/form.controller")
const router = express.Router()

router.post("/submitform", formController.addForm);
router.post('/form-list', formController.getFormList);
router.post('/formbyid', formController.getFormId);
router.post('/formdelete', formController.delteformid);
router.post('/formstatus', formController.updateformid);
router.post('/publishstatus', formController.publishformid);
router.post('/publishformurlbyid', formController.publishformurlid);
router.post('/submitformclient', formController.submitformurl);
router.post('/formresponses', formController.formresponse);

module.exports = router