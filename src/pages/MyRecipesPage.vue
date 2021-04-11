<template>
  <div class="self">
    <br />
    <img src="../assets/MyRecipeHeader.png" />
    <br />
    <b-card-group deck>
      <MyRecipePreview
        v-for="(r, index) in recipes.slice(startIndex, endIndex)"
        :key="index"
        :recipe="r.previewInfo"
      />
    </b-card-group>
    <br /><br />
    <div v-if="recipes.length > 0">
      <b-pagination
        v-model="currentPage"
        :per-page="perPage"
        :total-rows="numberOfRecipes"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>
<script>
import MyRecipePreview from "../components/MyRecipePreview";
export default {
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      recipes: [],
      slide: 0,
      sliding: null,
    };
  },
  components: {
    MyRecipePreview,
  },
  mounted() {
    this.getMyRecipes();
  },
  computed: {
    startIndex() {
      return this.perPage * (this.currentPage - 1);
    },
    endIndex() {
      return this.perPage * this.currentPage;
    },
    numberOfRecipes() {
      return this.recipes.length;
    },
  },
  methods: {
    async getMyRecipes() {
      try {
        const response = await this.axios.get(
          "https://assignment3r-r.herokuapp.com/user/selfRecipes"
        );
        if (response.status != 200) {
          this.$router.replace("/NotFoundPage");
        }
        this.recipes = [];
        this.recipes = response.data.result;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style>
.self {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
  margin: 0 auto;
}
</style>
