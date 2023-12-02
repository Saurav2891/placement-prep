const { createUser,getUserByUserId,getUsers,updateUsers,deleteUsers,login,levels} = require("./user.controller");
const router = require("express").Router();
const {checkToken} = require("../../auth/token_validation");


router.post("/",createUser);
router.get("/",checkToken,getUsers);
router.get("/levels",levels);
router.get("/:id",checkToken,getUserByUserId);
router.patch("/",checkToken,updateUsers);
router.delete("/",checkToken,deleteUsers); 
router.post("/login",login);


module.exports = router;