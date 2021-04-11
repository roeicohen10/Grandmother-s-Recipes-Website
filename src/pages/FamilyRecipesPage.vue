<template>
  <div class="family">
    <br />
    <img src="../assets/FamilyHeader.png" />
    <br />
    <b-card-group deck>
      <FamilyRecipePreview
        v-for="(r, index) in recipes.slice(startIndex, endIndex)"
        :key="index"
        :recipe="r.previewInfo"
      />
    </b-card-group>
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
import FamilyRecipePreview from "../components/FamilyRecipePreview";
export default {
  mounted() {
    this.updateRecipes();
  },
  components: {
    FamilyRecipePreview,
  },
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      recipes: [],
      slide: 0,
      sliding: null,
    };
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
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          "https://assignment3r-r.herokuapp.com/user/familyRecipes"
        );
        this.recipes = response.data.result;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.pagination {
  margin-top: 10px;
  justify-content: center;
}
.family {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
  margin: 0 auto;
}
</style>
