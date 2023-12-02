const {create,getUserByUserId,getUsers,updateUsers,deleteUsers,getUserByUserEmail,getUserLevels} = require("./user.service");
const {genSaltSync,has, hashSync,compareSync} = require("bcrypt");
const { sign }=require("jsonwebtoken");
module.exports ={
    createUser:(req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);
        create(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                message : "user created successfullly"
            });
        });
    },
    getUserByUserId:(req,res)=>{
        const id = req.params.id; 
        getUserByUserId(id,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results) {
                return res.json({
                    success :0,
                    message :"Record not Found"
                });
            }
            return res.json({
                success :1,
                data : results
            });
        });
    },
    getUsers:(req,res)=>{
        getUsers((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success : 1,
                data:results
            });
        });
    },
    updateUsers:(req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);
        updateUsers(body,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success :0,
                    message : "failed to update user"
                })
            }
            res.json({
                success : 1,
                message:"update successfully"
            });
        });
    },
    deleteUsers:(req,res)=>{
        const data = req.body;
        deleteUsers(data,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success : 0,
                    message : "Record not found"
                });
            }
            return res.json({
                success :1,
                message:"user deleted successfully"
            })
        })
    },
    login:(req,res)=>{
        const body = req.body;
        getUserByUserEmail(body.email,(err,results)=>{
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success :0,
                    data : "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsontoken = sign({result:results},process.env.SECRET_KEY,{
                    expiresIn:"1h"
                });
                return res.json({
                    success :1,
                    message : "login successfully",
                    token:jsontoken,
                    userId: results.user_id,
                });
            }else{
                return res.json({
                    success :0,
                    data : "Invalid email or passworddd",
                   
                });
            }
        })
    },
    levels:(req,res)=>{
        getUserLevels((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success : 1,
                data:results
            });
        });
    }
}
