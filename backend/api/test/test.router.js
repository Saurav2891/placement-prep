const {getMcqBytopicId, storeTestResultController,getTestRecordByUserId} = require("./test.controller");
const router = require("express").Router();
const {checkToken} = require("../../auth/token_validation");

router.get("/quiz",checkToken,getMcqBytopicId);
router.post("/test-result",checkToken,storeTestResultController);
router.get("/test-record",checkToken,getTestRecordByUserId);

module.exports = router;