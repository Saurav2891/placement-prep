const {getTopicsByLevelId} = require("./topics.service");


const getTopicsBylevelId = async (req,res)=>{
    const level_id = req.query.levelId;
    getTopicsByLevelId(level_id,(err,results)=>{
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
    getTopicsBylevelId,
};