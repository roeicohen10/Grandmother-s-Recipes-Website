<template>
  <b-card>
    <router-link
      :to="{ name: 'familyRecipeView', params: { recipeID: recipe.ID } }"
      class="recipe-preview"
    >
      <b-card-img :src="recipe.image" alt="Image" class="responsive" rounded />
    </router-link>
    <br /><b-card-title>{{ recipe.title }}</b-card-title>
    <b-list-group horizontal>
      <b-list-group-item>
        Creator:
        <b-badge variant="primary" pill>{{ recipe.creator }}</b-badge>
      </b-list-group-item>
      <b-list-group-item>
        Custom Date:
        <b-badge variant="primary" pill>{{ recipe.customDate }}</b-badge>
      </b-list-group-item>
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
  name: "FamilyRecipePreview",
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
.responsive {
  min-height: 400px;
  max-height: 400px;
  height: auto;
  width: 550px;
}
.card-img,
.card-img-top,
.card-img-bottom {
  width: 100%;
  height: 200px;
}
</style>
