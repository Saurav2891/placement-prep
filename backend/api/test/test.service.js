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
        `insert into user_test_records(user_id,topic_id,level_id,test_start_time,test_end_time,score) values(?,?,?,?,?,?)`,
        [data.user_id,data.topic_id,data.level_id,data.test_start_time,data.test_end_time,data.score],
        (error,results,fields)=>{
            if(error){
                return callback(error);
            }
            return callback(null,results);
        }
    );
};

const getTestRecord = (user_id,callback)=>{
    pool.query(
        `SELECT
        utr.*,
        u.*,
        l.level_name,
        t.topic_name
      FROM user_test_records utr
      JOIN user_profile u ON utr.user_id = u.user_id
      JOIN levels l ON utr.level_id = l.level_id
      JOIN topics t ON utr.topic_id = t.topic_id
      WHERE utr.user_id = ?;`,
        [user_id],
        (error,results,fields)=>{
            if(error){
                return callback(error);
            }
            return callback(null,results);
        }
    );
}

module.exports={
    getMcqByTopicId,
    storeTestResult,
    getTestRecord,
};