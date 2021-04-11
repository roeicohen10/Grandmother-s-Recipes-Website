<template>
  <b-card style="width:80%; height:80%">
    <b-card-header v-if="$root.store.username">
      <b-icon
        v-if="favWatch && favWatch.saved"
        v-b-tooltip.hover.top="'Dislike'"
        icon="star-fill"
        variant="warning"
        font-scale="2"
        class="icon"
        style="cursor:pointer"
        v-on:click="likeRecipe(0)"
      ></b-icon>
      <b-icon
        v-else
        v-b-tooltip.hover.top="'Like'"
        icon="star"
        variant="warning"
        font-scale="2"
        class="icon"
        style="cursor:pointer"
        v-on:click="likeRecipe(1)"
      ></b-icon>
      <b-icon
        v-if="favWatch && favWatch.watched"
        v-b-tooltip.hover.top="'Watched'"
        icon="bookmark-fill"
        variant="dark"
        font-scale="2"
        class="icon"
      ></b-icon>
      <b-icon
        v-else
        v-b-tooltip.hover.top="'Unwatched'"
        icon="bookmark"
        variant="dark"
        font-scale="2"
        class="icon"
      ></b-icon>
    </b-card-header>

    <router-link
      :to="{ name: 'recipe', params: { recipeID: recipe.id } }"
      class="recipe-preview"
    >
      <b-card-img :src="recipe.image" alt="Image" rounded />
    </router-link>
    <b-card-title>{{ recipe.title }}</b-card-title>
    <b-list-group horizontal>
      <b-list-group-item>
        Time to Cook:
        <b-badge variant="primary" pill>{{ recipe.readyInMinutes }}</b-badge>
      </b-list-group-item>
      <b-list-group-item>
        Likes:
        <b-badge variant="primary" pill>{{ recipe.aggregateLikes }}</b-badge>
      </b-list-group-item>
    </b-list-group>

    <b-card-footer
      v-if="recipe.vegan || recipe.vegetarian"
      style="display:flex"
    >
      <div v-if="recipe.vegan">
        <img
          src="../assets/vegan.jpeg"
          alt="Girl in a jacket"
          width="50"
          height="50"
        />
      </div>
      <div v-if="recipe.vegetarian">
        <img
          src="../assets/vegetarian.jpeg"
          alt="Girl in a jacket"
          width="50"
          height="50"
        />
      </div>
    </b-card-footer>
  </b-card>
</template>

<script>
export default {
  mounted() {
    if (this.$root.store.username) {
      this.updateFavWatch();
    }
  },
  methods: {
    async likeRecipe(like) {
      try {
        const response = await this.axios.put(
          "https://assignment3r-r.herokuapp.com/user/addFavouriteRecipe/",
          {
            recipeID: this.recipe.id,
          }
        );
        this.favWatch.saved = 1;
      } catch (error) {
        console.log(error);
      }
    },
    async updateFavWatch() {
      let url = `https://assignment3r-r.herokuapp.com/user/recipeFavoriteWatch/[${this.recipe.id}]`;
      console.log(url);
      try {
        const response = await this.axios.get(url);
        console.log(response.data);
        this.favWatch = response.data.result[this.recipe.id];
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      favWatch: {},
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.icon {
  margin-left: 5px;
  margin-right: 5px;
}
.card-img,
.card-img-top,
.card-img-bottom {
  width: 100%;
  height: 200px;

}
</style>
