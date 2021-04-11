import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeID",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/favourite",
    name: "favourite",
    component: () => import("./pages/FavouriteRecipesPage"),
  },
  {
    path: "/family",
    name: "family",
    component: () => import("./pages/FamilyRecipesPage"),
  },
  {
    path: "/FamilyRecipeView/:recipeID",
    name: "familyRecipeView",
    component: () => import("./pages/FamilyRecipeViewPage"),
  },
  {
    path: "/myrecipes",
    name: "myrecipes",
    component: () => import("./pages/MyRecipesPage"),
  },
  {
    path: "/myrecipesview/:recipeID",
    name: "myrecipesview",
    component: () => import("./pages/MyRecipeViewPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
