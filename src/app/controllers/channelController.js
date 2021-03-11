const {pool} = require('../../../config/database');
const {logger} = require('../../../config/winston');

const channelDao = require('../dao/channelDao');


//게시글 조회(세부)
exports.default = async function (req, res) {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const user_id = req.params.user_id;
            const rows = await channelDao.defaultDao(user_id);
            console.log(rows)
            return res.json(rows);
        } catch (err) {
            logger.error(`example non transaction Query error\n: ${JSON.stringify(err)}`);
            connection.release();
            return false;
        }
    } catch (err) {
        logger.error(`example non transaction DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};

//게시글 작성
exports.createchannel = async function (req, res) {
    try{
    const {
        title, fileURL, description, user_id, views
    } = req.body;
    
    insertVideosInfoParams=[title, fileURL, description, user_id, views]
    insertVideosRows = await channelDao.createDao(insertVideosInfoParams)
    return res.json({
        isSuccess: true,
        code: 200,
        message: "동영상 추가 성공"
    });
    }
    catch(err){
        logger.error(`App - SignUp Query error\n: ${err.message}`);
        return res.status(500).send(`Error: ${err.message}`);
    }
};


//게시글 수정
exports.updatechannel = async function (req, res) {
    try{
        const {title, fileURL, description} = req.body
        const {user_id, video_id} = req.params
    
        updateVideosInfoParams=[title, fileURL, description, 
            views, user_id, video_id]
        updateVideosRows = await channelDao.updateDao(updateVideosInfoParams);
        return res.json({
        isSuccess: true,
        code: 200,
        message: "동영상 수정 성공"
        });
            }
    catch(err){
        logger.error(`App - SignUp Query error\n: ${err.message}`);
        return res.status(500).send(`Error: ${err.message}`);
    }
};

//게시글 삭제
exports.deletechannel = async function (req, res) {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const {user_id, video_id} = req.params
            deleteVideosInfoParams=[user_id, video_id]
            deleteVideosRows = await channelDao.deleteDao(deleteVideosInfoParams);
            return res.json({
                isSuccess: true,
                code: 200,
                message: "동영상 삭제 성공"
            });
        } catch (err) {
            logger.error(`example non transaction Query error\n: ${JSON.stringify(err)}`);
            connection.release();
            return false;
        }
    } catch (err) {
        logger.error(`example non transaction DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};