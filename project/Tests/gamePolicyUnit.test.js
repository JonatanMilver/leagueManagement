const ar = require("../Domain/associationRepresentatives")
const arUtils = require("../DataAccess/associationRepresentativeUtils")

///////////////////////////////////MOCKS//////////////////////////////////
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


/////////////////////UNIT TESTING////////////////////////////////////////

// unit 18.4
test("Successful policy set through Data Layer", async () => {
    // await arUtils.setGamePolicy(2,1,1);
    const response = await arUtils.checkGamePolicy(2,1).then(res =>{
        return res
    });
    expect(response.GamePolicyId).toBe(1);
});


// unit 18.5
test("Trying to set policy to a season that does not exist", async () => {
    // await arUtils.setGamePolicy(2,1,1);
    const response = await arUtils.checkGamePolicy(3,1).then(res =>{
        return res
    });
    expect(response).toBe(undefined);
});



//////////////////////////INTEGRATION TESTING/////////////////////////////////

// integration 18.6
test("Sucessful policy set through Domain Layer", async () => {
    const response = await ar.setGameSchedulingPolicy(3,1,2).then(res => {
        return res;
    });
    expect(response).toBe(true);
})




// integration 18.7
test("Trying to set a policy to a season that already has one", async () => {
    const response = await ar.setGameSchedulingPolicy(2,1,2).then(res => {
        return res;
    });
    expect(response).toBe(false);
})

// integration 18.8
test("Two teams can play one vs another on speficic season", async () => {
    const policy = await arUtils.checkGamePolicy(2,1).then(res => {return res});
    const answer = await ar.checkGameAddition(12,11, policy, 2).then(res=>{return res});
    expect(answer).toBe(true);
})

// integration 18.9
test("Two teams can not play one vs another on speficic season because they already played one match", async () => {
    const policy = await arUtils.checkGamePolicy(2,1).then(res => {return res});
    const answer = await ar.checkGameAddition(13,11, policy, 2).then(res=>{return res});
    expect(answer).toBe(false);
})


