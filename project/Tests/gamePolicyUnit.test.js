const ar = require("../Domain/associationRepresentatives")
const arUtils = require("../DataAccess/associationRepresentativeUtils")


// unit Testing 18.4
test("Successful policy set through Data Layer", async () => {
    // await arUtils.setGamePolicy(2,1,1);
    const response = await arUtils.checkGamePolicy(2,1).then(res =>{
        return res
    });
    expect(response.GamePolicyId).toBe(1);
});

arUtils.setGamePolicy = jest.fn(async (seasonId, leagueId, policyId) => {
    //mock of setting policy in DB.
    return;
})

arUtils.checkGamePolicy = jest.fn(async (seasonId, leagueId) => {
    //mock of checking game policy
    if(seasonId === 3){
        return undefined;
    }
    else{
        return {GamePolicyId:1};
    }

})

arUtils.checkOneGamePolicy = jest.fn(async (homeTeam, awayTeam, seasonId) => {
    if(homeTeam == 13 && awayTeam == 11){
        return false;
    }
    return true;
})

// integration / unint? test 18.5
test("Sucessful policy set through Domain Layer", async () => {
    const response = await ar.setGameSchedulingPolicy(3,1,2).then(res => {
        return res;
    });
    expect(response).toBe(true);
})

// integration test 18.6
test("Trying to set a policy to a season that already has one", async () => {
    const response = await ar.setGameSchedulingPolicy(2,1,2).then(res => {
        return res;
    });
    expect(response).toBe(false);
})

// integration test 18.7
test("Two teams can play one vs another on speficic season", async () => {
    const policy = await arUtils.checkGamePolicy(2,1).then(res => {return res});
    const answer = await ar.checkGameAddition(12,11, policy, 2).then(res=>{return res});
    expect(answer).toBe(true);
})

// integration test 18.8
test("Two teams can not play one vs another on speficic season because they already played one match", async () => {
    const policy = await arUtils.checkGamePolicy(2,1).then(res => {return res});
    const answer = await ar.checkGameAddition(13,11, policy, 2).then(res=>{return res});
    expect(answer).toBe(false);
})






// for(const userPswd of usersPswds){
//     test("Login Successful", async () => {
//         const response = await user.logInUser(userPswd.username, userPswd.password).then(res => {
//             return res
//         });
//         expect(usernames.includes(response.username)).toBe(true);
//         // expect(response.body.message).toBe("No game policy for this season or game doesn't stand by policy.");
//     })
// }

// test("Wrong Credentials", async () => {
//     const response = await user.logInUser("notsignedin", "none").then(res => {
//         return res
//     });
//     expect(response).toBe(undefined);
// })

