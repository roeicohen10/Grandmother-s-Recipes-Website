<template>
  <RecipePreviewList
    title="last three recipes"
    :recipes="recipes"
  ></RecipePreviewList>
</template>
<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  name: "LastThreeRecipes",
  data() {
    return {
      recipes: [],
    };
  },
  components: {
    RecipePreviewList,
  },
  mounted() {
    this.lastViewed();
  },
  methods: {
    async lastViewed() {
      try {
        const response = await this.axios.get(
          `https://assignment3r-r.herokuapp.com/user/lastWatch/3`
        );
        const firstID = response.data.result[0].RecipeID;
        const secID = response.data.result[1].RecipeID;
        const thirdID = response.data.result[2].RecipeID;
        const firstRecipe = await this.axios.get(
          `https://assignment3r-r.herokuapp.com/recipe/preview/${firstID}`
        );
        const secRecipe = await this.axios.get(
          `https://assignment3r-r.herokuapp.com/recipe/preview/${secID}`
        );
        const thirdRecipe = await this.axios.get(
          `https://assignment3r-r.herokuapp.com/recipe/preview/${thirdID}`
        );
        this.recipes.push(
          firstRecipe.data.result,
          secRecipe.data.result,
          thirdRecipe.data.result
        );
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style></style>
