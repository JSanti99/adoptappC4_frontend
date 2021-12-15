<template>
  <div class="card">
    <img :src="`${requestPet?.pet?.image}`" />
    <h4 class="uppercase text-3xl text-purple-base">
      {{ requestPet?.pet?.name }}
    </h4>
    <button
      @click="updatePet"
      class="text-orange-base font-bold p-2 rounded-full"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8 flex-no-shrink hover:text-orange-800  hover:fill-current"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    </button>
    <button
      @click="deleteRequestPet"
      class="text-orange-base font-bold p-2 rounded-full"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8 flex-no-shrink hover:text-orange-800  hover:fill-current"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  props: {
    requestPet: {
      type: Object,
    },
  },
  emits: ["deletePet"],

  methods: {
    deleteRequestPet: async function() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation UpdatePet($petInput: UpdatePetInput) {
              updatePet(petInput: $petInput) {
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
            }
          `,
          variables: {
            petInput: {
              ...this.computedRequestPet.pet,
              status: "RT",
            },
          },
        })
        .then((res) => {
          this.$emit("deletePet", res.data.updatePet);
        })
        .catch((err) => {});
    },
    updatePet() {
      this.$router.push({
        name: "adoption",
        params: { updatePet: this.requestPet.pet.id },
      });
    },
  },
  computed: {
    // a computed getter
    computedRequestPet: function() {
      let auxRequestPet = this.requestPet;
      let auxPet = {};
      Object.entries(auxRequestPet?.pet).forEach(([key, value]) => {
        if (key !== "__typename") {
          auxPet[key] = value;
        }
      });
      return {...auxRequestPet,pet: auxPet};
    },
  },
};
</script>

<style scoped>
.card {
  width: 300px;
  height: 250px;
  border-radius: 8px;
  box-shadow: 0 2px 2px rgba(255, 255, 255, 0.459);
  overflow: hidden;
  margin: 20px;
  text-align: center;
  transition: all 0.25s;
  background-color: rgba(255, 255, 255, 0.459);
}

.card:hover {
  transform: translateY(-15px);
  box-shadow: 0 12px 16px rgba(0, 0, 0, 0.2);
}

.card img {
  width: 300px;
  height: 150px;
  object-fit: scale-down;
  overflow: hidden;
}
.card h4 {
  font-weight: 600;
}
.card p {
  align-content: center;
  padding: 0 8rem;
  font-size: 16px;
  font-weight: 300;
}

.card button {
  margin: 2px;
  /* width: 90px;
  height: 50px; */
  background-color: white;
  @apply border-2 border-orange-base;
}
</style>