const ar_utils = require("../DataAccess/associationRepresentativeUtils")
const ar_domain = require("../Domain/associationRepresentatives");
const user_domain = require("../Domain/user")


///////////////////////////////////////////////////////// MOCK FUNCTIONS //////////////////////////////////////////////////

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


// test ("successful addition of referee to Referees DB", async() => {
//     const response = await ar_utils.insertReferee(2, "International", true).then(res => {
//         return res
//     });
//     expect(response).toBe(true)
// })

//unit test 15.4
test ("successful addition of referee to Referees DB", async() => {
    const response = await ar_utils.insertReferee("The best Referee ever", "International", true).then(res => {
        return res
    });
    expect(response).toBe(false)
})
//unit test 15.5
test ("successful check - if referee exist", async() => {
    const response = await ar_utils.checkIfRefExist(4).then(res => {
        return res
    });
    expect(response).toBe(true)
})
//unit test 15.6
test ("failure check - if referee exist", async() => {
    const response = await ar_utils.checkIfRefExist(0).then(res => {
        return res
    });
    expect(response).toBe(false)
})

//unit test 17.4
test ("successful add referee to season", async() => {
    const response = await ar_utils.addRefereeToSeason(1,1).then( res => {
        return res
    });
    expect(response).toBe(true)
})
//unit test 17.5
test ("failure add referee to season", async() => {
    const response = await ar_utils.addRefereeToSeason("referee1","season1").then( res => {
        return res
    });
    expect(response).toBe(false)
})

///////////////////////////////////////////////////////// INREGRESTION TESTING //////////////////////////////////////////////////

//integration test 15.7
test("successful addition of referee to the system", async() => {
    const response = await ar_domain.addReferee("galagas", "Master", false).then(res => {
        return res
    });
    expect(response).toBe(true);
})

//integration test 15.8
test("failure addition of referee to the system - referee already exist", async() => {
    await ar_domain.addReferee('galagas', 'Master', 1)
    .then().catch(err => {
        expect(err.status).toBe(409);
        expect(err.message).toBe('Referee already exist')
    })
})

//integration test 15.9
test("failure addition of referee to the system - user not exist", async () => {
    await ar_domain.addReferee('notExist', "notExist", true)
    .then().catch(err => {
        expect(err.status).toBe(404);
        expect(err.message).toBe("User not found")
    })
})

//integration test 17.6
test("successful addition of referee to season", async() => {
    const response = await ar_domain.addRefereeToSeason(4,2).then(res => {
        return res
    });
    expect(response).toBe(true)
})

//integration test 17.7
test("failure addition of referee to season - referee already in season", async () => {
    await ar_domain.addRefereeToSeason(4,1)
    .then().catch(err => {
        expect(err.status).toBe(409);
        expect(err.message).toBe("The referee already in this season")
    })
})

//integration test 17.8
test("failure addition of referee to season - referee not exist", async () => {
    await ar_domain.addRefereeToSeason(0,2)
    .then().catch(err => {
        expect(err.status).toBe(404);
        expect(err.message).toBe("Referee Not Exist");
    })
})

//integration test 17.9
test("failure addition of referee to season - season not exist", async () => {
    await ar_domain.addRefereeToSeason(4,0)
    .then().catch(err => {
        expect(err.status).toBe(404);
        expect(err.message).toBe("Season Not Found");
    })
})