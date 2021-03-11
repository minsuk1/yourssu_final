const { pool } = require("../../../config/database");

// index
// async function defaultDao(findVideosInfoParams) {
//   const connection = await pool.getConnection(async (conn) => conn);
//   //const user_id = req.params.user_id;
//   const selectEmailQuery = 
//                     `
//                     SELECT *
//                     FROM Videos where user_id= ?`;

//   const [rows] = await connection.query(selectEmailQuery,
//                                 findVideosInfoParams)
//   connection.release();

//   return rows;
// }




//게시글 조회(세부)
async function defaultDao(findVideosInfoParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    //const user_id = req.params.user_id;
    const selectEmailQuery = 
                      `
    select distinct v.title, v.fileURL, v.description, v.updatedat, v2.views,
    (select count(*) from Videocomments c where c.video_id = v.video_id) 댓글개수
        from User u
        left join Videos v on u.user_id = v.user_id
        left join Views v2 on u.user_id = v2.user_id
             where u.user_id = ?`;
  
    const [rows] = await connection.query(selectEmailQuery,
                                  findVideosInfoParams)
    connection.release();
  
    return rows;
  }


//게시글 작성
async function createDao(insertVideosInfoParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const insertVideosInfoQuery = `
          INSERT INTO Videos(title, fileURL, description, user_id)
          VALUES (?, ?, ?, ?);
      `;
    const createDaoRow = await connection.query(
        insertVideosInfoQuery,
        insertVideosInfoParams
    );
    connection.release();
    return createDaoRow;
  }
  

//게시글 수정
async function updateDao(updateVideosInfoParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const updateVideosInfoQuery = `
          update Videos  set title = ?,
          fileURL = ?, description = ?,
          where user_id = ? and video_id = ?  
      `;
    const updateDaoRow = await connection.query(
        updateVideosInfoQuery,
        updateVideosInfoParams
    );
    connection.release();
    return updateDaoRow;
  }


//게시글 삭제
async function deleteDao(deleteVideosInfoParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const deleteEmailQuery = 
                      `
                      DELETE from Videos 
                      where user_id= ?
                      and video_id= ?`;
  
    const deleteDaoRow = await connection.query(deleteEmailQuery,
                           deleteVideosInfoParams)
    connection.release();
  
    return deleteDaoRow;
  }
  
module.exports = {
  defaultDao,createDao,deleteDao,updateDao
};
