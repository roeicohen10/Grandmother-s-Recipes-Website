<template>
  <div class="container">
    <br />
    <img src="../assets/SearchHeader.png" />
    <br />
    <b-form @reset.prevent="onReset" @submit.prevent="onSubmit" class="myForm">
      <b-form-group
        class="input-group-1"
        label="Food Name:"
        label-for="input-1"
        description="Please insert the food name you would like to search."
      >
        <b-form-input
          id="input-1"
          v-model="query"
          type="text"
          required
          placeholder="Enter food's name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        class="input-group-1"
        label="Select Cuisine:"
        label-for="cuisine"
      >
        <b-form-select
          id="cuisine"
          v-model="selectedCuisine"
          :options="optionsC"
        ></b-form-select>
      </b-form-group>

      <b-form-group class="input-group-1" label="Select Diet:" label-for="diet">
        <b-form-select
          id="diet"
          v-model="selectedDiet"
          :options="optionsD"
        ></b-form-select>
      </b-form-group>

      <b-form-group
        class="input-group-1"
        label="Select Number of recipes to return:"
        label-for="numOfRecipes"
      >
        <b-form-select
          id="numOfRecipes"
          v-model="numberOfRecipes"
          :options="optionsN"
        ></b-form-select>
      </b-form-group>

      <b-form-group
        class="input-group-1"
        label="Select Intolerance:"
        label-for="intolerance"
      >
        <b-form-select
          id="intolerance"
          v-model="selectedIntolerance"
          :options="optionsI"
        ></b-form-select>
      </b-form-group>

      <div>
        <ul class="buttons-ul">
          <li class="buttons-li">
            <a href="#" class="round green"
              >Search
              <b-button
                type="submit"
                style="background-color:transparent;border:transparent"
              >
                <span class="round">Are you ready for some Recipes?</span>
              </b-button>
            </a>
          </li>
          <li class="buttons-li">
            <a
              href="#"
              class="round red"
              style="display:flex; flex-direction:column"
              >Reset
              <b-button
                type="reset"
                style="background-color:transparent;border:transparent"
              >
                <span class="round"
                  >But only if you really, really want to.
                </span></b-button
              >
            </a>
          </li>
        </ul>
      </div>

      <div class="searchDropdown">
        <b-dropdown
          id="sorting"
          text="Sorting Options"
          variant="dark"
          class="m-md-2"
        >
          <b-dropdown-item @click="sortByPopularity"
            >Sort by Popularity</b-dropdown-item
          >
          <b-dropdown-item @click="sortByCookingTime"
            >Sort by Cooking Time</b-dropdown-item
          >
        </b-dropdown>
      </div>
    </b-form>

    <b-card-group deck>
      <RecipePreview
        v-for="(r, index) in recipes.slice(startIndex, endIndex)"
        :key="index"
        :recipe="r"
      />
    </b-card-group>
    <div v-if="searched">
      <b-pagination
        class="pagination"
        v-model="currentPage"
        :per-page="perPage"
        :total-rows="pNumberOfRecipes"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>
<script>
import RecipePreview from "../components/RecipePreview";

export default {
  components: {
    RecipePreview,
  },
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      selectedCuisine: null,
      selectedDiet: null,
      selectedIntolerance: null,
      recipes: [],
      query: null,
      optionsD: [
        { value: "", text: "" },
        { value: "Gluten Free", text: "Gluten Free" },
        { value: "Ketogenic", text: "Ketogenic" },
        { value: "Vegetarian", text: "Vegetarian" },
        { value: "Lacto-Vegetarian", text: "Lacto-Vegetarian" },
        { value: "Ovo-Vegetarian", text: "Ovo-Vegetarian" },
        { value: "Vegan", text: "Vegan" },
        { value: "Pescetarian", text: "Pescetarian" },
        { value: "Paleo", text: "Paleo" },
        { value: "Primal", text: "Primal" },
        { value: "Whole30", text: "Whole30" },
      ],
      optionsC: [
        { value: "", text: "" },
        { value: "African", text: "African" },
        { value: "American", text: "American" },
        { value: "British", text: "British" },
        { value: "Cajun", text: "Cajun" },
        { value: "Caribbean", text: "Caribbean" },
        { value: "Chinese", text: "Chinese" },
        { value: "Eastern European", text: "Eastern European" },
        { value: "European", text: "European" },
        { value: "French", text: "French" },
        { value: "German", text: "German" },
        { value: "Greek", text: "Greek" },
        { value: "Indian", text: "Indian" },
        { value: "Irish", text: "Irish" },
        { value: "Italian", text: "Italian" },
        { value: "Japanese", text: "Japanese" },
        { value: "Jewish", text: "Jewish" },
        { value: "Korean", text: "Korean" },
        { value: "Latin American", text: "Latin American" },
        { value: "Mediterranean", text: "Mediterranean" },
        { value: "Mexican", text: "Mexican" },
        { value: "Middle Eastern", text: "Middle Eastern" },
        { value: "Nordic", text: "Nordic" },
        { value: "Southern", text: "Southern" },
        { value: "Spanish", text: "Spanish" },
        { value: "Thai", text: "Thai" },
        { value: "Vietnamese", text: "Vietnamese" },
      ],
      optionsI: [
        { value: "", text: "" },
        { value: "Dairy", text: "Dairy" },
        { value: "Egg", text: "Egg" },
        { value: "Gluten", text: "Gluten" },
        { value: "Grain", text: "Grain" },
        { value: "Peanut", text: "Peanut" },
        { value: "Seafood", text: "Seafood" },
        { value: "Sesame", text: "Sesame" },
        { value: "Shellfish", text: "Shellfish" },
        { value: "Soy", text: "Soy" },
        { value: "Sulfite", text: "Sulfite" },
        { value: "Tree Nut", text: "Tree Nut" },
        { value: "Wheat", text: "Wheat" },
      ],
      numberOfRecipes: 5,
      optionsN: [5, 10, 15],
    };
  },
  mounted() {
    this.loadRecipes();
  },
  computed: {
    startIndex() {
      return this.perPage * (this.currentPage - 1);
    },
    endIndex() {
      return this.perPage * this.currentPage;
    },
    pNumberOfRecipes() {
      return this.recipes.length;
    },
    searched() {
      return this.recipes !== undefined && this.recipes.length > 0;
    },
  },
  methods: {
    onReset() {
      this.selectedCuisine = "";
      this.query = "";
      this.selectedDiet = "";
      this.selectedIntolerance = "";
      this.numberOfRecipes = 5;
    },
    async onSubmit() {
      try {
        let parameters = {};
        parameters.numberOfRecipes = this.numberOfRecipes;
        console.log(this.numberOfRecipes);
        if (this.query) {
          parameters.query = this.query;
        }
        if (this.selectedCuisine) {
          parameters.cuisine = this.selectedCuisine;
        }
        if (this.selectedDiet) {
          parameters.diet = this.selectedDiet;
        }
        if (this.selectedIntolerance) {
          parameters.intolerance = this.selectedIntolerance;
        }
        const response = await this.axios.get(
          `https://assignment3r-r.herokuapp.com/recipe/search/query/${this.query}/amount/${this.numberOfRecipes}`,
          {
            params: {
              cuisine: parameters.cuisine,
              diet: parameters.selectedDiet,
              intolerances: parameters.selectedIntolerance,
            },
          }
        );
        if (response.status != 200) {
          this.$router.replace("/NotFoundPage");
        }
        if (response.data.result.length == 0) {
          this.$root.toast(
            "Not Found",
            "No recipes found for this search.",
            "danger"
          );
        }
        this.recipes = [];
        const result = response.data.result;
        result.forEach((element) => {
          this.recipes.push(element.previewInfo);
        });
        if (this.$root.store.username) {
          this.$root.store.recentRecipes = this.recipes;
        }
      } catch (err) {
        console.log(err);
      }
    },
    loadRecipes() {
      if (this.$root.store.username) {
        this.recipes = this.$root.store.recentRecipes;
      }
    },
    sortByPopularity() {
      this.recipes.sort(function(x, y) {
        return parseFloat(y.aggregateLikes) - parseFloat(x.aggregateLikes);
      });
    },
    sortByCookingTime() {
      this.recipes.sort(function(x, y) {
        return parseFloat(y.readyInMinutes) - parseFloat(x.readyInMinutes);
      });
    },
  },
};
</script>
<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.pagination {
  margin-top: 20px;
  justify-content: center;
}

.searchButtons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.searchDropdown {
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-group-1 {
  font-weight: bold;
}

.buttons-ul {
  margin: 30px auto;
  text-align: center;
}

.buttons-li {
  list-style: none;
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
}

@-moz-keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

@-webkit-keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

@-o-keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

.round {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding-top: 30px;
  text-decoration: none;
  text-align: center;
  font-size: 25px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);
  letter-spacing: -0.065em;
  font-family: "Hammersmith One", sans-serif;
  -webkit-transition: all 0.25s ease-in-out;
  -o-transition: all 0.25s ease-in-out;
  -moz-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
  border-radius: 300px;
  z-index: 1;
  border-width: 4px;
  border-style: solid;
}

.round:hover {
  width: 130%;
  height: 130%;
  left: -15%;
  top: -15%;
  font-size: 33px;
  padding-top: 38px;
  -webkit-box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  -o-box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  z-index: 2;
  border-size: 10px;
  -webkit-transform: rotate(-360deg);
  -moz-transform: rotate(-360deg);
  -o-transform: rotate(-360deg);
  transform: rotate(-360deg);
}

a.red {
  background-color: rgba(239, 57, 50, 1);
  color: rgba(133, 32, 28, 1);
  border-color: rgba(133, 32, 28, 0.2);
}

a.red:hover {
  color: rgba(239, 57, 50, 1);
}

a.green {
  background-color: rgb(125, 228, 94);
  color: rgb(31, 145, 59);
  border-color: rgba(40, 107, 66, 0.2);
}

a.green:hover {
  color: rgb(8, 43, 21);
}

a.yellow {
  background-color: rgba(252, 227, 1, 1);
  color: rgba(153, 38, 0, 1);
  border-color: rgba(153, 38, 0, 0.2);
}

a.yellow:hover {
  color: rgba(252, 227, 1, 1);
}

.round span.round {
  display: block;
  opacity: 0;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  font-size: 1px;
  border: none;
  padding: 40% 20% 0 20%;
  color: #fff;
}

.round span:hover {
  opacity: 0.85;
  font-size: 16px;
  -webkit-text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  -moz-text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  -o-text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
}

.green span {
  background: rgba(0, 63, 71, 0.7);
}

.red span {
  background: rgba(133, 32, 28, 0.7);
}

.yellow span {
  background: rgba(161, 145, 0, 0.7);
}
</style>
