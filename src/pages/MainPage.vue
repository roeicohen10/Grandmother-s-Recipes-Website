<template>
  <div class="container" fluid>
    <b-container class="cols-container">
      <b-row style="width:100%">
        <b-col id="left-col" cols="6" class="col">
          <br />
          <img src="../assets/RandomHeader.png" />
          <b-button
            variant="outline-dark"
            v-on:click="getNewRandomRecipes"
            class="randomButton"
            >New Random Recipes</b-button
          >
          <br />
          <RandomRecipes
            title="Randome Recipes"
            class="RandomRecipes center"
            style="max-width=30%"
          ></RandomRecipes>
        </b-col>
        <b-col id="right-col" cols="6" class="col">
          <br />
          <img v-if="!$root.store.username" src="../assets/LoginHeader.png" />
          <img v-else src="../assets/LastWatchedHeader.png" />
          <LoginPage
            v-if="!$root.store.username"
            class="RandomRecipes center"
            :header="false"
            style="max-width=30%"
          ></LoginPage>
          <LastThreeRecipes v-else></LastThreeRecipes>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import RandomRecipes from "../components/RandomRecipes";
import LoginPage from "../pages/LoginPage";
import LastThreeRecipes from "../components/LastThreeRecipes";
export default {
  components: {
    RandomRecipes,
    LoginPage,
    LastThreeRecipes,
  },
  methods: {
    getNewRandomRecipes() {
      window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

.container {
  max-width: 100%;
}

.col {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.randomButton {
  width: 30%;
  margin-right: 12%;
  background-color: rgb(183, 187, 181);
  border:2px solid rgb(182, 86, 86);
  color:white;
}

.randomButton:hover {
  background-color: rgb(134, 136, 133);
}
</style>
