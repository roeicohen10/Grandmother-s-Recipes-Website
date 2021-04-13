const express = require("express");
const router = express.Router();
const profile = require('../controllers/user');

router.use(function requireLogin(req, res, next) {
    if (!req.userID) {
      next({ status: 401, message: "unauthorized" });
    } else {
      next();
    }
  });

router.get("/recipeFavoriteWatch/:recipesIDs", async function (req, res, next ) {
    try{
        let userID =  req.userID;
        let recipesIDs = JSON.parse(req.params.recipesIDs);
        let result = await profile.getUserSaveWatchRecipes(userID,recipesIDs)
        res.status(200).send({result:result, success:true})
    }catch(error){
        console.log(error)
        next(error)
    }
 });


router.get("/favorites", async function (req, res, next) {
    try {
    let userID =  req.userID;
    let result = await profile.getUserFavourites(userID)
    res.status(200).send({result:result, success:true})
    } catch (error) {
        console.log(error)
        next(error)
    }
});

router.get("/watched", async function (req, res, next) {
    try {
      let userID =  req.userID;
      let result = await profile.getUserWatch(userID)
      res.status(200).send({result:result, success:true})
    } catch (error) {
        console.log(error)
        next(error)
    }
});

router.get("/lastWatch/:numOfRecpies", async function (req, res, next) {
    try {
      let userID = req.userID;
      let numOfRecpies = req.params.numOfRecpies;
      let result = await profile.getUserLastWatch(userID,numOfRecpies)
      res.status(200).send({result:result, success:true})
    } catch (error) {
        console.log(error)
        next(error)
    }
});

router.get("/selfRecipes", async function (req, res,next) {
    try {
      let userID =  req.userID;
      let result = await profile.getUserSelfRecipes(userID)
      res.status(200).send({result:result, success:true})
    } catch (error) {
        console.log(error)
        next(error)
    }
});

router.get("/familyRecipes", async function (req, res,next) {
    try {
      let userID = req.userID;
      let result = await profile.getUserFamilyRecipes(userID)
      res.status(200).send({result:result, success:true})
    } catch (error) {
        console.log(error)
        next(error)
    }
});

router.put("/addWatchedRecipe/", async function (req, res ,next) {
  try {
    if(req.body && req.body.recipeID){
      let userID = req.userID;
      await profile.addUserWatchedRecipe(userID,req.body.recipeID,1)
      res.status(200).send({result:["success"], success:true})
  }else{

  }    
  }catch(error) {
      console.log(error)
      next(error)
  }
});

router.put("/addFavouriteRecipe/", async function (req, res, next) {
  try {
    if(req.body && req.body.recipeID){
      let userID = req.userID;
      await profile.addUserLikedRecipe(userID,req.body.recipeID,1)
      res.status(200).send({result:["success"], success:true})
    }else{
      let addError = new Error("Could Not Updated")
      addError.status = 404;
      next(addError)
      }    
  }catch(error) {
      console.log(error)
      next(error)
  }
});



module.exports = router;