const pool = require("../../config/database");

const getMcqByTopicId = (topic_id,callback)=>{
    pool.query(
        `select * from mcq_questions where topic_id = ?`,
        [topic_id],
        (error,results,fields)=>{
            if(error){
                return callback(error);
            }
            return callback(null,results);
        }
    );
};

const storeTestResult = (data,callback)=>{
    pool.query(
        `insert into test_result(user_id,topic_id,marks_obtained,total_marks) values(?,?,?,?)`,
        [data.user_id,data.topic_id,data.marks_obtained,data.total_marks],
        (error,results,fields)=>{
            if(error){
                return callback(error);
            }
            return callback(null,results);
        }
    );
};


module.exports={
    getMcqByTopicId,
    storeTestResult,
};