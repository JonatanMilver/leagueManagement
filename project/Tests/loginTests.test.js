const { test, expect } = require("@jest/globals")
const loginUser = require("../Service/loginUser")

check = "yony"
for(let i=0; i<5;i++){
    test('Testing to see if Jest works', () => {
        expect("yony").toBe(check)
    })
}

test('login test', () => {
    return loginUser.logInUser("username", "password").then(user => {
        expect(user).toBe("login succeeded");
    });
})

// test('login test', () => {
//     return loginUser.logInUser("usename", "pasword").then(user => {
//         expect(user).toBe("Username or Password incorrect");
//     });
// })