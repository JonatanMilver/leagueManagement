const user = require("../Domain/user")
const userUtils = require("../DataAccess/users_utils")
require("dotenv").config();

const usersPswds = [
    {
        username: "guyzaid", password: "guyzaid",
    },
    {
        username: "galagas", password: "galagas",
    },
    {
        username: "tomerkel", password: "tomerkel",
    },
    {
        username: "milver", password: "milver",
    }
]

const usernames = ["guyzaid", "galagas", "tomerkel", "milver"]

////////////////////////UNIT////////////////////////////////////

//unit test 4.4-4.7
for(const usern of usernames){
    test("Successful user retrieval from database", async () => {
        const response = await userUtils.checkIfUserExist(usern).then(res => {
            return res
        });
        expect(usernames.includes(response.username)).toBe(true);
    })
}

//////////////////////INTEGRATION//////////////////////////
//integration test 4.8-4.11
for(const userPswd of usersPswds){
    test("Login Successful", async () => {
        const response = await user.logInUser(userPswd.username, userPswd.password).then(res => {
            return res
        });
        expect(usernames.includes(response.username)).toBe(true);
    })
}

test("Wrong Credentials", async () => {
    const response = await user.logInUser("notsignedin", "none").then(res => {
        return res
    });
    expect(response).toBe(undefined);
})

