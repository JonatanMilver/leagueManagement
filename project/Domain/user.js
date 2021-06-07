const bcrypt = require("bcryptjs");
const auth_utils = require("../DataAccess/authAccess");
const users_utils = require("../DataAccess/users_utils")

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

async function registerUser(username, password, firstName, lastName, email){
    const user = await users_utils.checkIfUserExist(username);
    if (user){
        throw { status: 400, message: "User already exist"};
    }
    //hash the password
    let hash_password = bcrypt.hashSync(
        password,
        parseInt("2")
      );

    return await users_utils.registerUser(username, hash_password, firstName, lastName, email);
}


exports.registerUser = registerUser;
exports.logInUser = logInUser;