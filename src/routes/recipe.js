const express = require("express");
const router = express.Router();
const recipe = require('../controllers/recipe');


router.get('/full/:recipeID', async(req,res,next)=>{
    try{

        if(req.params && req.params.recipeID){
            let fullRecipe = await recipe.getRecipeInformation(req.params.recipeID,req.userID)
            res.status(200).send({result:fullRecipe, success:true});
        }else{
            let preErr = new Error("missing recipeID parameter");
            next(preErr)
        }
    }catch(error){
        next(error);
    }
});

router.get('/preview/:recipeID', async(req, res, next)=>{
    try{
        if(req.params && req.params.recipeID){
            let previewRecipe = await recipe.getRecipePreview(req.params.recipeID)
            res.status(200).send({result:previewRecipe, success:true});
        }else{
            let preErr = new Error("C");
            next(preErr)
        }
    }catch(err){
        next(err)
    }
});

router.get('/randomize', async (req, res, next) => {
    try{
        let numberOfRecipes = null;
        if(req.query && req.query.numOfRecipes){
            numberOfRecipes = req.query.numOfRecipes;
        }else{
            numberOfRecipes = 3;
        }
        let randomRecepies = await recipe.getRandomRecipes(numberOfRecipes)
        res.status(200).send({result:randomRecepies, success:true});
    }catch(err){
        next(err)
    }
});

router.get('/search/query/:searchQuery/amount/:searchAmount', async (req, res, next) => {
    try{
        let searchParams = {};
        searchParams.instructionsRequired = true;
        searchParams.query = req.params.searchQuery;
        searchParams.number = req.params.searchAmount;
        if(req.query){
            if(req.query.cuisine)
                searchParams.cuisine = req.query.cuisine;
            if(req.query.diet)
                searchParams.diet = req.query.diet;
            if(req.query.intolerances)
                searchParams.intolerances = req.query.intolerances;
        }
        let result = await recipe.getSearchedRecipes(searchParams);
        if(result)
            res.status(200).send({result:result, success:true});
        else{
            let preErr = new Error("Could not find result to the search");
            preErr.status = 404;
            next(preErr)
        }
    }catch(err){
        next(err)
    }
});


module.exports = router;