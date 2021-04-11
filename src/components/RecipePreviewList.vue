<template>
  <div>
    <div v-for="r in recipes" :key="r.id">
      <RecipePreview class="recipePreview" :recipe="r" />
      <br />
    </div>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    recipes: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
