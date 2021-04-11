<template>
  <div id="app" :style="{backgroundImage: 'url('+require('./assets/background.jpg')+')',backgroundSize:'cover',backgroundPosition: 'center center',}">
    <div id="page-container">
      <div id="content-wrap">
      <NavigationBar />
      <router-view />
      </div>
      <footer id="footer" style="text-align:center;font-weight:bold">© All the rights reserved for Roei Cohen and Roi Nissan </footer>
    </div>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar"
export default {
  name: "App",
  components:{
    NavigationBar
  },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
footer {
  position: relative; 
  padding: 10px 10px 0px 10px; 
  bottom: 0; 
  width: 100%; 
  /* Height of the footer*/  
  height: 40px; 
}

#page-container {
  position: relative;
  min-height: 100vh;
}

#content-wrap {
  padding-bottom: 2.5rem;    /* Footer height */
}

#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5rem;            /* Footer height */
}
</style>
