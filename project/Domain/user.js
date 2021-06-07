const bcrypt = require("bcryptjs");
const auth_utils = require("../DataAccess/authAccess");

async function logInUser(username, password){
//     //need to check null here??
//     const user = await axios.post(
//         `http://localhost:3000/Login`,
//         {
//             username: username,
//             password: password
//         }
//       );

//     return user.data;
    const user = await auth_utils.getUserByUserName(username);
    if (!user || !bcrypt.compareSync(password, user.pswd)) {
        // throw { status: 401, message: "Username or Password incorrect" };
        return undefined;
    }
    return user;

}

exports.logInUser = logInUser;