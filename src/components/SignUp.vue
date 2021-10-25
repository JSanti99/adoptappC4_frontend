<template>
  <div class="signUp_user">
    <div class="container_signUp_user">
      <div class="descrip">
      <ul id="ula">
        <il id="titulo">
          Registro de Otorgante
        <br />
        <br />
        </il>
        <il>
        <img  id="imgandrea" src="../assets/Otorgante.png" alt="">
        <br />
        <br />
        </il>
        <il>
        <div id="textotorgante">
        Registra tus datos personales, de ser requerido te contactaremos para confirmar tus datos y continuar el proceso de adopción.
        </div>

        </il>      
      </ul> 
      </div>
      <div class="encabezado">
      <br /> 
      <hr />

      <h2 id="Title">Información General</h2>

      <hr />
      </div>
      <br />
      <form id="CreateForm" class="formulario" v-on:submit.prevent="processSignUp">
        <label class="etiquetas" for="name">Nombres</label>
        <input class="entradas" type="text" id="name" v-model="user.name" placeholder="Ejem: Andrea María" />
        
        <label class="etiquetas" for="lastname">Apellidos </label>
        <input class="entradas" type="text" id="lastname" v-model="user.lastname" placeholder="Ejem: Fandinho Ramirez" />
        
        <label class="etiquetas" for="idkind"> TP Identificación </label>
        <select class="entradas" name="ID" v-model="user.IDKind">
          <option value="" disable selected hidden>Tipo de Identificación</option>
          <option value="CC">Cédula de Ciudadania</option>
          <option value="CE">Cédula de Extranjería</option>
          <option value="PA">Pasaporte</option>
          <option value="NT">NIT</option>
        </select>
        
        <label class="etiquetas" for="idnumber">Numero ID&nbsp;</label>
        <input class="entradas" type="text" id="idnumber" v-model="user.IDNumber" placeholder="Sin Espacios" />
        
        <label class="etiquetas" for="address">Dirección</label>
        <input class="entradas" type="text" id="address" v-model="user.address" placeholder="Nomenclatura en Mayúscula y #" />
        
        <label class="etiquetas" for="country">País</label>
         <Select v-model="user.country" :options="countries"></Select>
        
        <label class="etiquetas" for="city">Ciudad</label>
        <Select
            v-model="user.city"
            :options="countries[user.country] ? countries[user.country] : []"
          ></Select>
                    
        <label class="etiquetas" for="landline">Teléfono Fijo </label>
        <input class="entradas" type="text" id="landline" v-model="user.landline" placeholder="Si no tiene indique Celular" />
        
        <label class="etiquetas" for="mobilephone">Celular </label>
        <input class="entradas" type="text" id="mobilephone" v-model="user.mobilephone" placeholder="Si no tiene indique fijo" />
        
        <label class="etiquetas" for="jobs">Ocupación </label>
        <input class="entradas" type="text" id="jobs" v-model="user.jobs" placeholder="Ejem: Practicante" />
        
        <label class="etiquetas" for="company">Compañía </label>
        <input class="entradas" type="text" id="company" v-model="user.company" placeholder="Ejem: Google" />
        
        <label class="etiquetas" for="username">Usuario </label>
        <input class="entradas" type="text" id="username" v-model="user.username" placeholder="Ejem: AFandinho" />
        
        <label class="etiquetas" for="email">Correo</label>
        <input class="entradas" type="text" id="email" v-model="user.email" placeholder="Ejem: afandinho@elmail.com" />
        
        <label class="etiquetas" for="password">Contraseña</label>
        <input class="entradas" type="password" id="password" v-model="user.password" placeholder="Ejem: *****" />
                      
      </form> 

    <div class="rayita">
        <hr />
    </div>
      
      
    <div class="boton1">
             <button type="submit" form="CreateForm">
                 <img src="../assets/doghead.png" style="width:20px,height:20px" alt="Registrarse">
                 <p>Registrarse</p>
             </button>
    </div>  

   <div class="boton2">
             <button type="submit" 
             @click="logIn">
                 <img src="../assets/cathead.png" style="width:20px,height:20px" alt="Retornar">
                 <p>Retornar</p>
             </button>

    <div class="rayita2">

    </div>

    </div>
              
    </div>
  </div>
</template>

<script>

import { base_url } from "../utils/environments";
import countries from "../utils/countries.json";
import jwt_decode from "jwt-decode";

import axios from "axios";
import Select from "./Select.vue";

export default {
  name: "SignUp",
  data: function() {
    return {
      user: {
        id:"",
        name: "",
        lastname: "",
        IDKind: "",
        IDNumber: "",
        address: "",
        city: "",
        country: "",
        landline: "",
        mobilephone: "",
        jobs: "",
        company: "",
        username: "",
        email: "",
        password: "",
        rol: "OT"
      },
      countries: countries,
    };
  },
    components: {
    Select,
  },

  methods: {
    processSignUp: function() {
      axios.post(
        "https://mintic-adoptapp-be.herokuapp.com/user/", 
        this.user, {
          headers: {}}
      )
        .then((result) => {
              alert("Usuario Registrado - Bienvenid@  " + this.user.name + " " + this.user.lastname);
                this.$router.push({
                  name: "logIn",
                });
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en el registro.");
        });
    },
    logIn(){
      this.$router.push(
        {name:"logIn"}
      )
    }
  },
};
</script>

<style>

  .container_signUp_user{
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    box-shadow: -1px 1px 7px 0px rgba(0, 0, 0, 0.75);
    border-style: none;    
    overflow-y: scroll;
    padding: 20px 100px;
    top: 80%;
    left: 50%;
    height:70vh;
    width: 60vw;
    margin-left:-15vw;
    margin-top: 5vh;  
    display:grid;
    grid-template:
      "descrip descrip" auto
      "encabezado encabezado" 100px
      "formulario formulario" auto
      "rayita rayita" 100px
      "boton1 boton2" 2px
    }

    .container_signUp_user::-webkit-scrollbar {
    width: 15px;
}

.container_signUp_user::-webkit-scrollbar-track {
    border-radius: 10px;   
    background-color: #fb7821;

    
}

.container_signUp_user::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px     rgba(0,0,0,0.5); 
    background-color: #440381;
    border: 3px solid #fb7821;
}


    #Title{
      color:#fb7821;
      font-size: 2vw;
      text-align: center;
      font-weight: bold;
      font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif ;
      text-shadow: 1px 1px #000000;
    }

    hr{
      border-color:#0e7174;
    }

    .descrip{
      grid-area:descrip;
      align-items: center;
      justify-content: center;
    }
    
    .descrip ul{
      display: inline-block;
    }

    #titulo{
      color:#440381;
      font-size: 2vw;
      text-align: center;
      font-weight: bold;
      font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif ;
      text-shadow: 1px 1px #000000;
      text-decoration: none;
      width: 100%;
      margin: auto;
    }

    #ula{
      margin: auto;
      text-align: center;
    }

    #imgandrea{
      width: 15vw;
      height: 35vh;
      text-decoration: none;
      display: block;
      margin: auto;
    }

    #textotorgante{
      text-decoration: none;
      width: 40vw;
      height: 5vh;
      color:#0e7174;
      font-size: 1.3vw;
      text-align: justify;
      font-weight: bold;
      font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif ;
      
    }


    .formulario{
      grid-area:formulario;
      display:inline-grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      
    }

    .encabezado{
      grid-area:encabezado;
    }

    .rayita{
      grid-area:rayita;
      width: 100%;
      padding-top: 50px;
      
    }
    
    .rayita2{
      grid-area:rayita;
      width: 100%;
      padding-top: 20px;
      
    }

    .boton1{
      grid-area:boton1;
      align-content: center;
      justify-items: center;
      text-align: center;
      margin: 0;
      align-items: end;
      padding: 0px 0px;
    }
  
    .boton2{
      grid-area:boton2;
      align-content: center;
      justify-items: center;
      margin: 0;
      align-items: end;
      padding: 0px;
      text-align: center; 
    }

    .etiquetas{
      color:#440381;
      font-size: 1.3vw;
      text-align: left;
      font-weight: bold;
      font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif ;
    }

    .entradas{
      border-radius: 4px;
      box-shadow: -1px 1px 7px 0px rgba(0, 0, 0, 0.75);
      border-style: none;
            
    }

    .signUp_user button{
      color: #440381;
      background: rgba(15, 113, 116, 0.4);
      border: 1px solid #0e7174;
      box-shadow: -1px 1px 7px 0px rgba(0, 0, 0, 0.75);
      width: 10vw;
      height: 20vh;
      border-radius: 5px;
      margin: 5px 0 25px 0;
      padding: 0px 15px;
      text-align: center;
      font-weight: bold;      
    }
    
    .signUp_user button:hover{
        color: #fb7821;
        border: 1px solid #0e7174;
        box-shadow: -1px 1px 7px 0px rgba(0, 0, 0, 0.75);
        transform: scale(1.04);
        font-style: italic;
    }

    @media (max-width: 768px){
      #titulo{
          font-size: 6vw;
        }
      
      #imgandrea{
          width: 50vw;
          height: 30vh;
        }

      #textotorgante{
          width: 78vw;
          height: 3vh;
          font-size: 3vw;
        }

      .container_signUp_user{
          padding: 15px 35px;
          height:57vh; 
        }

      #Title{
        font-size: 5vw;
      }    

      .etiquetas{
        font-size: 3.3vw;
      }

      .signUp_user button{
        width: 25vw;
        height: 20vh;
        border-radius: 5px;
        margin: 5px 0 25px 0;
        padding: 0 2px;
        font-weight: bold;
      }

    }

@media (max-width: 768px){
    .container_signUp_user{
        padding: 2px 45px;
        position: absolute;
        top: 55%;
        left: 50%;
        height:50vh;
        width: 96vw;
        margin-left:-48vw;
        margin-top: -25vh;    
      }
    
    }

</style>
