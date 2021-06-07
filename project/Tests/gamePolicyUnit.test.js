const ar = require("../Domain/associationRepresentatives")
const arUtils = require("../DataAccess/associationRepresentativeUtils")

const dummyGames = [
    {
        homeTeam : 10,
        awayTeam : 11,
        gameDateTime : "02/03/2021 19:30",
        field : "BS",
        refereeId : 1,
        seasonId : 1,
        leagueId : 1
    },
    {
        homeTeam : 11,
        awayTeam : 12,
        gameDateTime : "02/03/2021 19:30",
        field : "BS",
        refereeId : 1,
        seasonId : 1,
        leagueId : 1
    }
]

test("Sucessful policy set through Data Layer", async () => {
    // await arUtils.setGamePolicy(2,1,1);
    const response = await arUtils.checkGamePolicy(2,1).then(res =>{
        return res
    });
    expect(response.GamePolicyId).toBe(1);
});


// test("Sucessful policy set through Domain Layer", async () => {
//     const response = await ar.setGameSchedulingPolicy(3,1,2).then(res => {
//         return res;
//     });
//     expect(response).toBe(true);
// })

test("Trying to set a policy to a season that already has one", async () => {
    const response = await ar.setGameSchedulingPolicy(3,1,2).then(res => {
        return res;
    });
    expect(response).toBe(false);
})


test("Two teams can play one vs another on speficic season", async () => {
    const policy = await arUtils.checkGamePolicy(2,1).then(res => {return res});
    const answer = await ar.checkGameAddition(12,11, policy, 2).then(res=>{return res});
    expect(answer).toBe(true);
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

