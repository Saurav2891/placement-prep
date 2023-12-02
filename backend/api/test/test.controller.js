const {getMcqByTopicId, storeTestResult} = require("./test.service");


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
const storeTestResultContoller = async (req,res)=>{
    const body = req.body;
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
    
module.exports ={
    getMcqBytopicId,
    storeTestResultContoller,
};