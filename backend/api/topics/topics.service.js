const pool = require("../../config/database");

const getTopicsByLevelId = (level_id, callback) => {
    pool.query(
        `select * from topics where level_id = ?`,
        [level_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
}

module.exports={
    getTopicsByLevelId,
};