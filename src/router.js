import { createRouter, createWebHistory } from "vue-router";
import gql from "graphql-tag";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";

import App from "./App.vue";
import LogIn from "./components/LogIn.vue";
import SignUp from "./components/SignUp.vue";
import Home from "./components/Home.vue";
import Conditions from "./components/Conditions.vue";
import PetAdoption from "./components/PetAdoption.vue";
import MyPets from "./components/MyPets.vue";
const routes = [
  {
    path: "/",
    name: "root",
    component: App,
    meta: { requiresAuth: false },
  },
  {
    path: "/user/logIn",
    name: "logIn",
    component: LogIn,
    meta: { requiresAuth: false },
  },
  {
    path: "/user/signUp",
    name: "signUp",
    component: SignUp,
    meta: { requiresAuth: false },
  },
  {
    path: "/user/home",
    name: "home",
    component: MyPets,
    meta: { requiresAuth: true },
  },
  {
    path: "/user/conditions",
    name: "conditions",
    component: Conditions,
    meta: { requiresAuth: true },
  },
  {
    path: "/user/adoption",
    name: "adoption",
    component: PetAdoption,
    props: true,
    meta: { requiresAuth: true },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
const apolloClient = new ApolloClient({
  link: createHttpLink({ uri: "https://adoptapp-apigateway.herokuapp.com/" }),
  cache: new InMemoryCache(),
});
async function isAuth() {
  if (
    localStorage.getItem("token_access") === null ||
    localStorage.getItem("token_refresh") === null
  ) {
    return false;
  }
  try {
    var result = await apolloClient.mutate({
      mutation: gql`
        mutation($refresh: String!) {
          refreshToken(refresh: $refresh) {
            access
          }
        }
      `,
      variables: {
        refresh: localStorage.getItem("token_refresh"),
      },
    });
    localStorage.setItem("token_access", result.data.refreshToken.access);
    return true;
  } catch {
    localStorage.clear();
    alert("Su sesi??n expir??, por favor vuelva a iniciar sesi??n");
    return false;
  }
}
router.beforeEach(async (to, from) => {
  var is_auth = await isAuth();
  if (is_auth == to.meta.requiresAuth) return true;
  if (is_auth) return { name: "home" };
  return { name: "logIn" };
});

export default router;