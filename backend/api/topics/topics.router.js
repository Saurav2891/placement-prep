const {getTopicsBylevelId} = require("./topics.controller");
const router = require("express").Router();
const {checkToken} = require("../../auth/token_validation");

router.get("/topics",checkToken,getTopicsBylevelId);

module.exports = router;