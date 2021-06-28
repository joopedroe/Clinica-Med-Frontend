<template>
 <div id="app">
   <v-app>
     <main>
       <v-container fluid fill-height >
          <v-layout flex align-center justify-center>
            <v-flex xs12 sm3 elevation-6>
              <v-toolbar  class=" blue darken-4">
                <v-toolbar-title class="white--text"><h4>CONECTE-SE</h4></v-toolbar-title>
              </v-toolbar>
              <v-card class="card">
                <v-card-text class="pt-4">
                  <div class="card-div">
                      <v-form v-model="valid" ref="form">
                        <v-text-field
                          label="Insira o email"
                          v-model="email"
                          :rules="emailRules"
                          required
                        ></v-text-field>
                        <v-text-field
                          label="Insira sua senha"
                          v-model="password"
                          min="8"
                          :append-icon-cb="() => (e1 = !e1)"
                          :type="e1 ? 'password' : 'text'"
                          :rules="passwordRules"
                          counter
                          required
                        ></v-text-field>
                        <v-layout justify-space-between>
                            <v-btn @click="submit" :class=" { 'blue darken-4 white--text'
                            : valid, disabled: !valid }"> Entrar</v-btn>
                            <a href="">Forgot Password</a>
                        </v-layout>
                        <h4 class="msg" v-if="passwordInc">Email ou senha Incorreto</h4>
                      </v-form>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
       </v-container>
     </main>
   </v-app>
 </div>
</template>
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vuetify/dist/vuetify.js"></script>

<script>
import auth from '../../sevices/user/index';
   export default{
        name: 'Login',
        data () {
          return {
            valid: false,
            passwordInc:false,
            e1: false,
            password: '',
            passwordRules: [
              (v) => !!v || 'Password is required',
            ],
            email: '',
            emailRules: [
              (v) => !!v || 'E-mail is required',
              (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                .test(v) || 'E-mail must be valid'
            ],
          }
        },
        methods: {
          submit () {
            if (this.$refs.form.validate()) {
              auth.login({"email":this.email,"password":this.password})
              .then(response=>{
                    if(response.status=200){
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('type_user', response.data.type_user);
                        this.$router.push('home');
                    }
                    else{
                        this.passwordInc=true;
                    }
                })

            }
          },
          clear () {
            this.passwordInc=false;
            this.$refs.form.reset()
          }
        },
    }
 </script>

<style>
#app {
  background-color:rgb(62, 178, 245) ;
  background-size: cover;
  overflow:hidden;
}

.photoCredit{
  position: absolute;
  bottom: 15px;
  right: 15px;
}
.card-div{
  align-content: center;
  justify-content: center;
  margin-top: 10px;
}
.card{
  height: 300px;
}
.msg{
    color: rgb(228, 32, 32);
}
</style>
