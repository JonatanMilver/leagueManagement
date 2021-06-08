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
// test ("successful addition of referee to Referees DB", async() => {
//     const response = await ar_utils.insertReferee(2, "International", true).then(res => {
//         return res
//     });
//     expect(response).toBe(1)
// })


test ("successful check - if referee exist", async() => {
    const response = await ar_utils.checkIfRefExist(4).then(res => {
        return res
    });
    expect(response).toBe(true)
})

test ("failure check - if referee exist", async() => {
    const response = await ar_utils.checkIfRefExist(0).then(res => {
        return res
    });
    expect(response).toBe(false)
})

test ("successful add referee to season", async() => {
    const response = await ar_utils.addRefereeToSeason(1,1).then( res => {
        return res
    });
    expect(response).toBe(true)
})


// tests of associationRepresentative.js Domain Layer in 'addReferee' route
// integrestion teating
// test("successful addition of referee to the system", async() => {
//     const response = await ar_domain.addReferee("galagas", "Master", false).then(res => {
//         return res
//     });
//     expect(response).toBe(2)
// })

test("failure addition - referee already exist", async() => {
    await ar_domain.addReferee('galagas', 'International', 1)
    .then().catch(err => {
        expect(err.status).toBe(409);
        expect(err.message).toBe('Referee already exist')
    })
})

test("failure addition - user not exist", async () => {
    await ar_domain.addReferee(0, "International", true)
    .then().catch(err => {
        expect(err.status).toBe(404);
        expect(err.message).toBe("User not found")
    })
})


test("successful addition of referee to season", async() => {
    const response = await ar_domain.addRefereeToSeason(3,2).then(res => {
        return res
    });
    expect(response).toBe(true)
})


test("failure addition of referee to season - referee already in season", async () => {
    await ar_domain.addRefereeToSeason(3,2)
    .then().catch(err => {
        expect(err.status).toBe(409);
        expect(err.message).toBe("The referee already in this season")
    })
})

test("failure addition of referee to season - referee not exist", async () => {
    await ar_domain.addRefereeToSeason(0,2)
    .then().catch(err => {
        expect(err.status).toBe(404);
        expect(err.message).toBe("Referee Not Exist")
    })
})


test("failure addition of referee to season - season not exist", async () => {
    await ar_domain.addRefereeToSeason(4,0)
    .then().catch(err => {
        expect(err.status).toBe(404);
        expect(err.message).toBe("Season Not Found")
    })
})