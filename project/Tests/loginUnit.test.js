const user = require("../Domain/user")
const userUtils = require("../DataAccess/users_utils")

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

for(const usern of usernames){
    test("Successful user retrieval from database", async () => {
        const response = await userUtils.checkIfUserExist(usern).then(res => {
            return res
        });
        expect(usernames.includes(response.username)).toBe(true);
        // expect(response.body.message).toBe("No game policy for this season or game doesn't stand by policy.");
    })
}


for(const userPswd of usersPswds){
    test("Login Successful", async () => {
        const response = await user.logInUser(userPswd.username, userPswd.password).then(res => {
            return res
        });
        expect(usernames.includes(response.username)).toBe(true);
        // expect(response.body.message).toBe("No game policy for this season or game doesn't stand by policy.");
    })
}

test("Wrong Credentials", async () => {
    const response = await user.logInUser("notsignedin", "none").then(res => {
        return res
    });
    expect(response).toBe(undefined);
})

