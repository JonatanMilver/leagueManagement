const db_utils =  require('./DButils');

async function getUserByUserName(username){
    const user = (await db_utils.execQuery(
        `SELECT * FROM dbo.Users WHERE username = '${username}'`
      )
    )[0];

    return user;
}

exports.getUserByUserName = getUserByUserName;