<template>
  <b-card-group>
    <RecipePreviewList
      title="Random Recipes"
      :recipes="recipes"
    ></RecipePreviewList>
  </b-card-group>
</template>
<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  data() {
    return {
      recipes: [],
    };
  },
  components: {
    RecipePreviewList,
  },
  mounted() {
    this.randomRecipes();
  },
  methods: {
    async randomRecipes() {
      try {
        const response = await this.axios.get(
          "https://assignment3r-r.herokuapp.com/recipe/randomize",
          {
            numOfRecipes: 3,
          }
        );
        const returnedRecipes = response.data.result;
        this.recipes.push(...returnedRecipes);
        console.log(recipes);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style></style>
