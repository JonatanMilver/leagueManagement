const users_utils = require("../DataAccess/users_utils")
const ar_utils = require("../DataAccess/associationRepresentativeUtils")
const ar_domain = require("../Domain/associationRepresentatives");
const user_domain = require("../Domain/user")
const league_utils = require("../DataAccess/league_utils")
///////////////////////////////////////////////////////// MOCK FUNCTIONS //////////////////////////////////////////////////


// mock registr
users_utils.registerUser = jest.fn(async (username, password, firstName, lastName, email) => {
    if((typeof username) == 'string' && (typeof password) == 'string' && (typeof firstName) == 'string'
    && (typeof lastName) == 'string' && (typeof email) == 'string'){
        return true;
    }
    return false;
})

// mock add referee to DB
ar_utils.insertReferee = jest.fn(async (userID, qualification, isHeadReferee) => {
    if((typeof userID) == 'number' && (typeof qualification) == 'string' && (typeof isHeadReferee) == 'boolean'){
        return true;
    }
    return false;
})


//mock addition of referee to season
ar_utils.addRefereeToSeason = jest.fn(async (refereeID, seasonID) => {
    if((typeof refereeID) == 'number' && (typeof seasonID) == 'number'){
        return true;
    }
    return false;
})

///////////////////////////////////////////////////////// UNIT TESTING //////////////////////////////////////////////////

test("successful register user", async() => {
    const response = await users_utils.registerUser("shachar", "password", "shachar", "wild", "wildsha@post.bgu.ac.il").then(res => {
        return res
    });
    expect(response).toBe(true);
})

test("failure register user", async() => {
    const response = await users_utils.registerUser(123, "password", "shachar", "wild", "wildsha@post.bgu.ac.il").then(res => {
        return res
    });
    expect(response).toBe(false);
})

// test ("successful addition of referee to Referees DB", async() => {
//     const response = await ar_utils.insertReferee(2, "International", true).then(res => {
//         return res
//     });
//     expect(response).toBe(true)
// })

test ("successful addition of referee to Referees DB", async() => {
    const response = await ar_utils.insertReferee("The best Referee ever", "International", true).then(res => {
        return res
    });
    expect(response).toBe(false)
})

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

test ("failure add referee to season", async() => {
    const response = await ar_utils.addRefereeToSeason("referee1","season1").then( res => {
        return res
    });
    expect(response).toBe(false)
})

///////////////////////////////////////////////////////// INREGRESTION TESTING //////////////////////////////////////////////////

test("successful register user", async() => {
    const response = await user_domain.registerUser("shachar", "password", "shachar", "wild", "wildsha@post.bgu.ac.il").then(res => {
        return res
    });
    expect(response).toBe(true);
})

test("failure register user - user already exist", async() => {
    await user_domain.registerUser("tomerkel", "password", "tomer", "kelner", "tomerkel@post.bgu.ac.il")
    .then().catch(err =>{
        expect(err.status).toBe(409);
        expect(err.message).toBe("User already exist");
    });
    
})

test("successful addition of referee to the system", async() => {
    const response = await ar_domain.addReferee("galagas", "Master", false).then(res => {
        return res
    });
    expect(response).toBe(true);
})

test("failure addition of referee to the system - referee already exist", async() => {
    await ar_domain.addReferee('galagas', 'Master', 1)
    .then().catch(err => {
        expect(err.status).toBe(409);
        expect(err.message).toBe('Referee already exist')
    })
})

test("failure addition of referee to the system - user not exist", async () => {
    await ar_domain.addReferee('notExist', "notExist", true)
    .then().catch(err => {
        expect(err.status).toBe(404);
        expect(err.message).toBe("User not found")
    })
})

test("successful addition of referee to season", async() => {
    const response = await ar_domain.addRefereeToSeason(4,2).then(res => {
        return res
    });
    expect(response).toBe(true)
})

test("failure addition of referee to season - referee already in season", async () => {
    await ar_domain.addRefereeToSeason(4,1)
    .then().catch(err => {
        expect(err.status).toBe(409);
        expect(err.message).toBe("The referee already in this season")
    })
})

test("failure addition of referee to season - referee not exist", async () => {
    await ar_domain.addRefereeToSeason(0,2)
    .then().catch(err => {
        expect(err.status).toBe(404);
        expect(err.message).toBe("Referee Not Exist");
    })
})

test("failure addition of referee to season - season not exist", async () => {
    await ar_domain.addRefereeToSeason(4,0)
    .then().catch(err => {
        expect(err.status).toBe(404);
        expect(err.message).toBe("Season Not Found");
    })
})