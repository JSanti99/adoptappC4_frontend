<template>
  <div class="generalcontainer transform -translate-y-12">
    <div class="flex justify-between items-center gap-10">
      <img
        class="object-center w-40 h-30 hidden md:block"
        src="../assets/mypets.png"
      />
      <div class="">
        <h1 class="title font-bold text-purple-base">QUIERO DAR EN ADOPCIÓN</h1>
        <p class="text-justify font-sans text-green-base">
          ESTOS SON LOS ANIMALES DE COMPAÑIA QUE QUIERES ENTREGAR EN ADOPCION
          REVISA QUE ESTÉ TODA LA INFORMACIÓN NECESARIA PARA DARLES UNA MAYOR
          OPORTUNIDAD DE SER ADOPTADOS
        </p>
      </div>
    </div>
    <div :class="`container ${requestPets.length && 'relative'}`">
      <Pet
        :requestPet="requestPet"
        v-for="requestPet in requestPets"
        :key="requestPet.id"
        @deletePet="handleDeletePet"
      />
    </div>
    <button
      :class="
        `text-green-base p-2 rounded-full ${requestPets.length &&
          'absolute bottom-0 right-1'}`
      "
      @click="loadConditions"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-24 w-24 flex-no-shrink"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import Pet from "./Pet.vue";
import gql from "graphql-tag";

export default {
  data: function() {
    return {
      requestPets: [],
    };
  },
  components: {
    Pet,
  },
  methods: {
    loadPets: async function() {
      await this.$apollo
        .query({
          query: gql`
            query GetRequestPetByUserId($userId: Int!) {
              getRequestPetByUserId(userId: $userId) {
                _id
                user
                pet {
                  id
                  updated_at
                  created_at
                  image
                  status
                  history
                  dewormer
                  deworming
                  vaccines
                  vaccinated
                  sterilized
                  pathologies
                  diseases_drugs
                  cohabitation_kids
                  cohabitation_animals
                  city
                  country
                  age
                  size
                  species
                  name  
                }
                created_at
                request_kind
              }
            }
          `,
          variables: {
            userId: JSON.parse(localStorage.getItem("id_user")),
          },
        })
        .then((res) => {
          this.requestPets = res.data.getRequestPetByUserId.filter(
            (requestPet) => requestPet.pet.status !== "RT"
          );
        });
    },
    loadConditions: function() {
      this.$router.push({ name: "conditions" });
    },
    handleDeletePet: function(pet) {
      this.requestPets = this.requestPets.filter(
        (requestPet) => requestPet.pet.id !== pet.id
      );
    },
  },
  mounted: function() {
    this.loadPets();
  },
};
</script>

<style>
.generalcontainer {
  text-align: center;
  background-color: rgba(255, 255, 255, 0.4);
  width: 60vw;
  height: 71vh;
  position: absolute;
  top: 22%;
  left: 15%;
  padding: 15px;
  overflow: auto !important;
}

.generalcontainer::-webkit-scrollbar {
  width: 15px;
}

.generalcontainer::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fb7821;
}

.generalcontainer::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  background-color: #440381;
  border: 3px solid #fb7821;
}

.title {
  text-align: center;
  font-size: 40px;
  color: #000;
  /* margin-top: 100px; */
  font-weight: 100;
}

.container {
  width: 100%;
  max-width: 1200px;
  height: max-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
}
</style>
