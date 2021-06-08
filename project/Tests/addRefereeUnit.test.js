const users_utils = require("../DataAccess/users_utils")
const ar_utils = require("../DataAccess/associationRepresentativeUtils")
const ar_domain = require("../Domain/associationRepresentatives");




// test("successful register user through Data Layer", async() => {
//     const response = await users_utils.registerUser("shachar", "password", "shachar", "wild", "wildsha@post.bgu.ac.il").then(res => {
//         return res
//     });
//     expect(response).toBe(true);
// })



// test of associationRepresentativeUtils.js Data Layer in 'addReferee' route
// test("successful addition of referee to Referees DB", async() => {
//     const response = await ar_utils.insertReferee(4, "International", true).then(res => {
//         return res
//     });
//     expect(response).toBe(5);
// })

// test ("successful check - if referee exist", async() => {
//     const response = await ar_utils.checkIfRefExist(1).then(res => {
//         return res
//     });
//     expect(response).toBe(true)
// })

// test ("failure check - if referee exist", async() => {
//     const response = await ar_utils.checkIfRefExist(0).then(res => {
//         return res
//     });
//     expect(response).toBe(false)
// })

// test ("successful add referee to season", async() => {
//     const response = await ar_utils.addRefereeToSeason(3,3).then( res => {
//         return res
//     });
//     expect(response).toBe(true)
// })

//tests of associationRepresentative.js Domain Layer in 'addReferee' route
test("successful addition of referee to the system", async() => {
    const response = await ar_domain.addReferee("shachar", "Master", false).then(res => {
        return res
    });
    expect(response).toBe(true)
})

// test("failure addition - referee already exist", async() => {
//     await expect(ar_domain.addReferee(8, "Master", false)).rejects.toThrow();
// })

// test("failure addition - user not exist", async() => {
//     await expect(ar_domain.addReferee(0, "International", true)).rejects.toThrow();
// })

// test("successful addition of referee to season", async() => {
//     const response = await ar_domain.addRefereeToSeason(4,4).then(res => {
//         return res
//     });
//     expect(response).toBe(true)
// })

// test("failure addition of referee to season - referee already exist", async() => {
//     await expect(ar_domain.addRefereeToSeason(3,2)).rejects.toThrow();
// })

// test("failure addition of referee to season - referee not exist", async() => {
//     await expect(ar_domain.addRefereeToSeason(0,1)).rejects.toThrow();
// })

// test("failure addition of referee to season - season not exist", async() => {
//     await expect(ar_domain.addRefereeToSeason(3,0)).rejects.toThrow(); 
// });
