const pool = require("../../config/database");
module.exports={
    create:(data,callback)=>{
        pool.query(
            `insert into user_profile(firstName,lastName,mobile,collegeName,domain,email,graduationYear,password)
                            values(?,?,?,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.mobile,
                data.college_name,
                data.domain,
                data.email,
                data.graduation_year,
                data.password
            ],
            (error,results,fields)=>{
                if(error){
                    return callback(error);
                }
                return callback(null,results)
            }
        )
    },
    getUsers :callback =>{
        pool.query(
            `select * from user_profile`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callback(error);
                }
                return callback(null,results);
            }
        )
    },
    getUserByUserId:(id,callback)=>{
        pool.query(
            `select * from user_profile where id = ?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callback(error);
                }
                return callback(null,results[0]);
            }
        )
    },
    updateUsers:(data,callback)=>{
        pool.query(`update user_profile set firstName =?,lastName=?,mobile=?,collegeName=?,domain=?,email=?,graduationYear=?,password=? where id =?`,
            [
                data.first_name,
                data.last_name,
                data.mobile,
                data.college_name,
                data.domain,
                data.email,
                data.graduation_year,
                data.password,
                data.id
            ],
            (error,results,fields)=>{
                if(error){
                    return callback(error);
                }
                return callback(null,results[0])
            }
        
        )
    },
    deleteUsers:(data,callback)=>{
        pool.query(
            `delete from user_profile where id =?`,
            [data.id],
            (error,results,fields)=>{
                if(error){
                    return callback(error);
                }
                return callback(results[0]);
            }
        )
    },
    getUserByUserEmail:(email,callback)=>{
        pool.query(
            `select * from user_profile where email =?`,
            [email],
            (error,results,fields)=>{
                if(error){
                    return callback(error);
                }
                return callback(null,results[0]);
            }
        )
    }
    
}