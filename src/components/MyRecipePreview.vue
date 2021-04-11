<template>
  <b-card style="width:80%; height:80%">
    <router-link
      :to="{ name: 'myrecipesview', params: { recipeID: recipe.id } }"
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
