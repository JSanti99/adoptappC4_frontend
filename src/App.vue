<template>
  <div>
    <div class="Concuchara">
      <div class="arriba">
        <img id="head" src="./assets/bannerhead.png" alt="" />
      </div>

      <div class="jooter">
        <img id="fott" src="./assets/banerfooter.png" alt="" />
      </div>
    </div>

    <nav class="nav">
      <img id="logoa" src="./assets/logo.png" alt="" />
      <img id="namea" src="./assets/Adoptapp.png" alt="" />
    </nav>

    <footer class="Lupe">
      <img id="lupea" src="./assets/Any2.png" alt="" />
    </footer>

    <footer class="footer">
      <img id="mintic" src="./assets/MinticLogo.png" alt="" />
      <img id="unal" src="./assets/UnalLogo.png" alt="" />
    </footer>

    <nav class="noptions">
      <button
        v-if="is_auth"
        @click="loadHome"
        class="hover:text-purple-500 font-bold"
      >
        Inicio
      </button>

      <button
        v-if="is_auth"
        v-on:click="logOut"
        class="hover:text-red-500 font-bold"
      >
        Cerrar Sesión
      </button>

      <button
        v-if="!is_auth"
        @click="loadLogIn"
        class="hover:text-gray-50 font-bold"
      >
        Iniciar Sesión
      </button>

      <button
        v-if="!is_auth"
        v-on:click="loadSignUp"
        class="hover:text-gray-50 font-bold"
      >
        Registrarse
      </button>
    </nav>

    <div
      class="col-span-3 flex flex-col row-span-3 justify-center items-center main-component"
    >
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:logOut="logOut"
      >
      </router-view>
    </div>
  </div>
</template>

<script>
import Wave from "./components/Wave.vue";
export default {
  name: "App",

  computed: {
    is_auth: {
      get: function() {
        return this.$route.meta.requiresAuth;
      },
      set: function() {},
    },
  },

  // data: function() {
  //   return {
  //     is_auth: false,
  //     d_top:
  //       "M-0.90,135.49 C150.00,150.00 277.88,-21.41 508.12,121.68 L500.00,0.00 L0.00,0.00 Z",
  //     d_bottom:
  //       "M0.00,49.99 C150.00,150.00 349.20,-49.99 500.00,49.99 L500.00,150.00 L0.00,150.00 Z",
  //   };
  // },
  // components: {
  //   Wave,
  // },

  methods: {

    loadLogIn: function() {
      this.$router.push({ name: "logIn" });
    },
    loadSignUp: function() {
      this.$router.push({ name: "signUp" });
    },
    loadHome: function() {
      this.$router.push({ name: "home" });
    },
    loadPetAdoption: function() {
      this.$router.push({ name: "adoption" });
    },
    completedLogIn: function(data) {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("id_user", data.id_user);
      localStorage.setItem("username", data.username);
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("token_refresh", data.token_refresh);

      alert("Autenticación Exitosa");
      this.loadHome();
    },

    completedSignUp: function(data) {
      alert("Registro Exitoso");
      this.completedLogIn(data);
    },

    logOut: function() {
      localStorage.clear();
      alert("Sesión Cerrada");
      this.loadLogIn();
    },
  },
  created: function() {
    this.loadHome();  
  }
};
</script>

<style>
* {
  margin: 0;
  box-sizing: border-box;
}

body {
  background-image: url("./assets/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 auto;
  background-attachment: fixed;
  min-height: 100%;
  max-width: 100%;
  margin: 0 auto;
}

.arriba {
  left: 0;
  top: 0;
  flex-basis: 20%;
  position: absolute;
}

#head {
  height: 100%;
  width: 100%;
  z-index: 2;
}

.noptions {
  position: absolute;
  top: 20%;
  right: 5.8%;
  background-color: #fb7821;
  color: #440381;
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  width: 15rem;
  height: 7vh;
}

button {
  margin: 0 10px;
  gap: 4px;
}

.nav {
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 159753;
  width: 100%;
  height: 10vh;
}

#logoa {
  width: 12vw;
  height: 15vh;
}

#namea {
  width: 30vw;
  height: 18vh;
}

.Lupe {
  position: absolute;
  bottom: 1%;
  right: 1%;
}

#lupea {
  width: 15w;
  height: 35vh;
}

.jooter {
  left: 0;
  bottom: 0;
  flex-basis: 20%;
  /*height:12%;*/
  position: absolute;
}

.footer {
  display: flex;
  justify-content: left;
  position: absolute;
  bottom: 0%;
  left: 0%;
  z-index: 159753;
  width: 25%;
  height: 16%;
  margin: 0 auto;
  align-items: flex-end;
}

#mintic {
  height: 10vh;
}

#unal {
  height: 10vh;
}

.Concuchara {
  width: 100%;
  height: 100%;
}

@supports (object-fit: cover) {
  .box img {
    height: 100%;
    object-fit: cover;
  }
}
</style>
