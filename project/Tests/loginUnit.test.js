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

////////////////////////////MOCK FUNCTION////////////////////////////

// mock registr
userUtils.registerUser = jest.fn(async (username, password, firstName, lastName, email) => {
    if((typeof username) == 'string' && (typeof password) == 'string' && (typeof firstName) == 'string'
    && (typeof lastName) == 'string' && (typeof email) == 'string'){
        return true;
    }
    return false;
})

////////////////////////UNIT////////////////////////////////////

//unit test 1.3
test("successful register user", async() => {
    const response = await userUtils.registerUser("shachar", "password", "shachar", "wild", "wildsha@post.bgu.ac.il").then(res => {
        return res
    });
    expect(response).toBe(true);
})

//unit test 1.4
test("failure register user", async() => {
    const response = await userUtils.registerUser(123, "password", "shachar", "wild", "wildsha@post.bgu.ac.il").then(res => {
        return res
    });
    expect(response).toBe(false);
})

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

//integration test 1.5
test("successful register user", async() => {
    const response = await user.registerUser("shachar", "password", "shachar", "wild", "wildsha@post.bgu.ac.il").then(res => {
        return res
    });
    expect(response).toBe(true);
})

//integration test 1.6
test("failure register user - user already exist", async() => {
    await user.registerUser("tomerkel", "password", "tomer", "kelner", "tomerkel@post.bgu.ac.il")
    .then().catch(err =>{
        expect(err.status).toBe(409);
        expect(err.message).toBe("User already exist");
    });  
})
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

