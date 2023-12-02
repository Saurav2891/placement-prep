const pool = require("../../config/database");
module.exports={
    // create:(data,callback)=>{
    //     pool.query(
    //         `insert into user_profile(first_name,last_name,mobile,college,domain,graduation_year)
    //                         values(?,?,?,?,?,?)`,
    //         [
    //             data.first_name,
    //             data.last_name,
    //             data.mobile,
    //             data.college_name,
    //             data.domain,
    //             data.graduation_year
    //         ],
    //         (error,results,fields)=>{
    //             if(error){
    //                 return callback(error);
    //             }
    //             return callback(null,results)
    //         }
    //     )
    // },
    create: (data, callback) => {
        const userQuery = `INSERT INTO user(email, password) VALUES (?, ?)`;
        const userProfileQuery = `INSERT INTO user_profile(first_name, last_name, mobile, college, domain, graduation_year,user_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
        // First query to insert user data
        pool.query(
            userQuery,
            [data.email, data.password],
            (error, userResults) => {
                if (error) {
                    return callback(error);
                }
    
                const userId = userResults.insertId; // Get the auto-generated user ID
    
                // Second query to insert user profile data, using the user ID
                pool.query(
                    userProfileQuery,
                    [data.first_name, data.last_name, data.mobile, data.college_name, data.domain, data.graduation_year, userId],
                    (error, profileResults) => {
                        if (error) {
                            return callback(error);
                        }
    
                        // Combine user ID and profile results for the callback
                        return callback(null, { userId, profileResults });
                    }
                );
            }
        );
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
            `select * from user_profile where user_id = ?`,
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
            `select * from user where email =?`,
            [email],
            (error,results,fields)=>{
                if(error){
                    return callback(error);
                }
                return callback(null,results[0]);
            }
        )
    },
    getUserLevels:(callback)=>{
        pool.query(
            `select * from levels`,
            (error,results,fields)=>{
                if(error){
                    return callback(error);
                }
                return callback(null,results);
            }
        )
    }
    
}