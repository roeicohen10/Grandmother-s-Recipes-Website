<template>
  <div class="container">
    <b-card>
      <b-card-title>{{ recipe.previewInfo.title }}</b-card-title>
      <b-card-img
        :src="recipe.previewInfo.image"
        alt="Image"
        rounded
        width="50%"
      />
      <div class="lists">
        <b-list-group class="aList" style="border: none" vertical>
          <b-list-group-item style="border: none">
            <strong>Creator:</strong>
            <b-badge variant="primary" pill>{{
              recipe.previewInfo.creator
            }}</b-badge>
          </b-list-group-item>
          <b-list-group-item style="border: none">
            <strong>Custom Date:</strong>
            <b-badge variant="primary" pill>{{
              recipe.previewInfo.customDate
            }}</b-badge>
          </b-list-group-item>
          <b-list-group-item style="border: none">
            <strong>Time to Cook:</strong>
            <b-badge variant="primary" pill
              >{{ recipe.previewInfo.readyInMinutes }} minutes</b-badge
            >
          </b-list-group-item>
          <b-list-group-item style="border: none">
            <strong>Number Of Plates:</strong>
            <b-badge variant="primary" pill>{{ recipe.numOfPlates }}</b-badge>
          </b-list-group-item>
          <b-list-group-item style="border: none">
            <strong>Ingredients:</strong>
            <b-list-group-item
              v-for="(ing, index) in recipe.ingridients"
              :key="index"
              style="border: none"
            >
              {{ ing.amount }} {{ ing.name }}
            </b-list-group-item>
          </b-list-group-item>
        </b-list-group>
        <b-list-group class="aList" style="border: none" vertical>
          <b-list-group-item style="border: none">
            <strong>Instructions:</strong>
            <b-list-group>
              <b-list-group-item style="border: none">
                {{ recipe.instructions }}
              </b-list-group-item>
            </b-list-group>
          </b-list-group-item>
        </b-list-group>
      </div>
      <b-card-footer
        v-if="recipe.previewInfo.vegan || recipe.previewInfo.vegetarian"
        style="display:flex"
      >
        <div v-if="recipe.previewInfo.vegan">
          <img
            src="../assets/vegan.jpeg"
            alt="Girl in a jacket"
            width="50"
            height="50"
          />
        </div>
        <div v-if="recipe.previewInfo.vegetarian">
          <img
            src="../assets/vegetarian.jpeg"
            alt="Girl in a jacket"
            width="50"
            height="50"
          />
        </div>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getRecipeData();
  },
  methods: {
    async getRecipeData() {
      try {
        const response = await this.axios.get(
          `https://assignment3r-r.herokuapp.com/user/familyRecipes/${this.$route.params.recipeID}`
        );
        this.recipe = response.data.result;
        let ingridients = this.recipe.ingredients.map((element) => {
          if (typeof element.amount === "number" && !!(element.amount % 1)) {
            element.amount = Math.round(element.amount * 100) / 100;
            return element;
            console.log(element);
          } else {
            console.log(element);
            return element;
          }
        });
        if (this.$root.store.username)
          this.updateFavWatch(this.recipe.previewInfo.id);
        console.log(ingridients);
        this.recipe.ingridients = ingridients;
        console.log("dsadas");
      } catch (error) {
        console.log(error);
      }
    },
    async updateFavWatch(recipeID) {
      let url = `http://localhost:3003/user/recipeFavoriteWatch/[${recipeID}]`;
      console.log(url);
      try {
        const response = await this.axios.get(url);
        console.log(response.data);
        this.favWatch = response.data.result[this.recipe.previewInfo.id];
      } catch (error) {
        console.log(error);
      }
    },
    async likeRecipe(like) {
      try {
        const response = await this.axios.put(
          "http://localhost:3003/user/addFavouriteRecipe/",
          {
            recipeID: this.recipe.previewInfo.id,
          }
        );
        this.favWatch.saved = 1;
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return { recipe: {}, favWatch: {} };
  },
};
</script>

<style>
.container {
  width: 50%;
  height: 50%;
}
.image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
}
.lists {
  display: flex;
  flex-direction: row;
}
.aList {
  width: 50%;
}
</style>
