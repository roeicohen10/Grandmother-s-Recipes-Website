const express = require("express");
const router = express.Router();


router.get('/about', (req, res, next) => {
    res.status(200).send({marketingDetails:"the developers are roei and roi",
    previousAssignments:["Assignment 3.1:https://github.com/SISE-Web-Development-Environments/assignment3-1-roei_roi",
                        "Assignment 2:https://github.com/SISE-Web-Development-Environments/assignment2-roi-roei"]});
});



module.exports = router;