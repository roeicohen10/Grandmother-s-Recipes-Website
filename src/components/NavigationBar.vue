<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <router-link tag="b-navbar-brand" :to="{ name: 'main' }"
      ><img
        src="../assets/burger.png"
        width="40"
        height="47"
        style="cursor:pointer;"
    /></router-link>
    <b-navbar-nav>
      <router-link tag="b-nav-item" :to="{ name: 'about' }">About</router-link>
      <router-link tag="b-nav-item" :to="{ name: 'search' }"
        >Search</router-link
      >
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-text v-if="!$root.store.username">
        Hello Guest |
      </b-nav-text>
      <b-nav-text v-else> Hi {{ $root.store.username }} | </b-nav-text>
      <b-nav-item-dropdown v-if="$root.store.username" text="Personal">
        <router-link tag="b-dropdown-item" :to="{ name: 'favourite' }"
          >Favourite Recipes</router-link
        >
        <router-link tag="b-dropdown-item" :to="{ name: 'myrecipes' }"
          >My Recipes</router-link
        >
        <router-link tag="b-dropdown-item" :to="{ name: 'family' }"
          >Family Recipes</router-link
        >
      </b-nav-item-dropdown>
      <b-nav-item-dropdown right v-else text="User">
        <router-link tag="b-dropdown-item" :to="{ name: 'register' }"
          >Register</router-link
        >
        <router-link tag="b-dropdown-item" :to="{ name: 'login' }"
          >Login</router-link
        >
      </b-nav-item-dropdown>
      <b-nav-item v-if="$root.store.username" @click="Logout()"
        >Logout</b-nav-item
      >
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.store.recentRecipes = this.recipes;
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
  },
};
</script>

<style></style>
