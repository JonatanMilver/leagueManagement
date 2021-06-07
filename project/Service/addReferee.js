const associationRepresentatives = require("../Domain/associationRepresentatives");



/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
    if (req.session && req.session.user_id) {
        associationRepresentatives.getUsersFromAssRepTable()
        .then((reprs) => {
            if (reprs.find((x) => x.userID === req.session.user_id)) {
            req.user_id = req.session.user_id;
            next();
            }
            else {
            throw { status: 401, message: "You don't have the right permissions"};
            }
        })
        .catch((err) => next(err));
    } else {
        res.status(401).send("You are not logged in");
    }
});


router.post("/addReferee", async (req, res, next) => {
    try{
    const {username, qualification, isHeadReferee} = req.body;
    if (username == undefined || qualification == undefined || isHeadReferee == undefined){
        throw {status: 400, message: "Missing one or more parameters"};
        }
        const refID = associationRepresentatives.addReferee(username, qualification, isHeadReferee);
        res.status(201).send("Referee added successfully! The referee ID is: "+ refID);
    }
    catch(error){
    next(error);
    }
})


router.post("/registerReferee", async (req, res, next) => {
    try{
        const {username, password, firstName, lastName, country, email, image, qualification, isHeadReferee} = req.body;
        if (username == undefined || password == undefined || firstName == undefined || lastName == undefined || country == undefined || email == undefined || image == undefined){
            throw {status: 400, message: "Missing one or more parameters"};
        }
        const suc = await associationRepresentatives.registerReferee(username, password, firstName, lastName, country, email, image);
        if (suc){
            const refID = associationRepresentatives.addReferee(username, qualification, isHeadReferee);
            res.status(201).send("Referee added successfully! The referee ID is: "+ refID);
        }
    }
    catch(error){
        next(error);
    }
})

router.post("/addRefereeToSeason", async (req, res, next) => {
    try{
        const {refereeID, seasonID} = req.body;
        if (refereeID == undefined || seasonID == undefined){
            throw {status: 400, message: "Missing one or more parameters"};
        }
        await associationRepresentatives.addRefereeToSeason(refereeID, seasonID);
        res.status(201).send("Referee added successfully to season");
    }
    catch(error){
        next(error);
    }
})
