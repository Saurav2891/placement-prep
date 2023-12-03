const {getMcqByTopicId, storeTestResult,getTestRecord} = require("./test.service");


const getMcqBytopicId = async (req,res)=>{
    const topic_id = req.query.topicId;
    getMcqByTopicId(topic_id,(err,results)=>{
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
const storeTestResultController = async (req,res)=>{
    const body = req.body;
    console.log(body);
    storeTestResult(body,(err,results)=>{
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
const getTestRecordByUserId = async (req,res)=>{
    const user_id = req.query.userId;
    getTestRecord(user_id,(err,results)=>{
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
    
module.exports ={
    getMcqBytopicId,
    storeTestResultController,
    getTestRecordByUserId,
};