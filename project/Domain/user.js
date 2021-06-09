const bcrypt = require("bcryptjs");
const users_utils = require("../DataAccess/users_utils")

async function logInUser(username, password){
    const user = await users_utils.checkIfUserExist(username);
    if (!user || !bcrypt.compareSync(password, user.pswd)) {
        // throw { status: 401, message: "Username or Password incorrect" };
        return undefined;
    }
    return user;

}

async function registerUser(username, password, firstName, lastName, email){
    const user = await users_utils.checkIfUserExist(username);
    if (user){
        throw { status: 409, message: "User already exist"};
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