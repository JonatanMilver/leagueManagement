const axios = require("axios");

async function logInUser(username, password){
    //need to check null here??
    const user = await axios.post(
        `http://localhost:3000/Login`,
        {
            username: username,
            password: password
        }
      );

    return user.data;
}
exports.logInUser = logInUser;