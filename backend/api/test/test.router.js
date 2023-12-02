const {getMcqBytopicId, storeTestResultContoller} = require("./test.controller");
const router = require("express").Router();
const {checkToken} = require("../../auth/token_validation");

router.get("/quiz",checkToken,getMcqBytopicId);
router.post("/test-result",checkToken,storeTestResultContoller);

module.exports = router;