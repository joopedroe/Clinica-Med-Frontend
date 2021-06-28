<template>
  <v-card class="card">
    <form @submit.prevent="submit"  class="form">
      <validation-provider
        name="Name"
        rules="required|max:14"
      >
      <v-alert
        type="success"
        v-model="alert"
        text>
        Cadastrado com sucesso!
        </v-alert>
      <h2>Cadastrar Funcionário</h2>
      <div>
        <v-text-field
          v-model="name"
          label="Nome"
          :rules="nameRules"
          required
        ></v-text-field>
      </div>
      <div v-if="!expansionM" class="search">
          <div >
          <v-text-field
          class="cpf"
          v-model="admission"
          v-mask="'##-##-####'"
          placeholder="DD-MM-AAAA"
          label="Data de admissão"
          :rules="nameRules"
          required
        > </v-text-field>
          </div>
      </div>
      </validation-provider>
      <v-select
          @change="onChange($event)"
          v-model="select"
          :items="items"
          item-text="name"
          item-value="id"
          label="Tipo de funcionário"
          data-vv-name="select"
          required
        ></v-select>
        <validation-provider
        name="Email"
      >
      <div v-if="expansionM">
          <div>
        <v-text-field
          v-model="specialty"
          label="Especialidade"
          :rules="nameRules"
          required
        ></v-text-field>
      </div>
      <div class="search">
          <div>
          <v-text-field
          class="cpf"
          v-model="registry"
          label="Número de registro"
          :rules="nameRules"
          required
        > </v-text-field>
          </div>
      </div>
      </div>
        <v-text-field
          v-model="email"
          label="Email"
          :rules="emailRules"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider
        name="password"
      >
        <v-text-field
          v-model="password"
          label="Senha"
          :rules="nameRules"
          type="password"
          required
        ></v-text-field>
      </validation-provider>
      <v-btn
        class="mr-4"
        type="submit"
        :disabled="invalid"
        required
      >
        Enviar
      </v-btn>
      <v-btn @click="clear">
        Limpar
      </v-btn>
    </form>
  </v-card>
</template>
<script>
import {
  required, digits, max, regex,
} from 'vee-validate/dist/rules';
import {
  extend, ValidationProvider, setInteractionMode,
} from 'vee-validate';
import secretary from '../sevices/secretary/index';
import medical from '../sevices/medical/index';
import user from '../sevices/user/index';

setInteractionMode('eager');

extend('digits', {
  ...digits,
  message: '{_field_} needs to be {length} digits. ({_value_})',
});

extend('required', {
  ...required,
  message: 'Campo obrigatório',
});

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
});

extend('regex', {
  ...regex,
  message: '{_field_} {_value_} does not match {regex}',
});

export default {
  name: 'add_patient',
  components: {
    ValidationProvider,

  },
  data: () => ({
    name: '',
    password: '',
    select: null,
    admission: '',
    invalid: false,
    alert: false,
    registry: '',
    specialty: '',
    expansionM: false,
    items: [{
      name: 'Médico (a)',
      id: 'medical',
    },
    {
      name: 'Secretário (a)',
      id: 'secretary',
    },
    ],
    email: '',
    nameRules: [
      (v) => !!v || 'Campo obrigatório',
    ],
    emailRules: [
      (v) => !!v || 'Email é obrigatório',
      (v) => /.+@.+/.test(v) || 'Email Inválido',
    ],
  }),
  methods: {
    submit() {
      // eslint-disable-next-line no-unused-vars
      const dataUser = {
        username: this.name,
        email: this.email,
        password: this.password,
        type_user: this.select,
      };
      user.new_user(dataUser)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            if (response.data.type_user === 'medical') {
              medical.new_medical({
                user_id: response.data.id,
                name: this.name,
                registry: this.registry,
                specialty: this.specialty,
                isAdmin: false,
              }).then((res) => {
                if (res.status === 200) {
                  this.alertFunction();
                }
              });
            } else {
              this.DateFormatted();
              console.log({
                user_id: response.data.id,
                name: this.name,
                admission: this.admission,
              });
              secretary.new_secretary({
                user_id: response.data.id,
                name: this.name,
                admission: this.admission,
              }).then((res) => {
                if (res.status === 200) {
                  this.alertFunction();
                }
              });
            }
          }
        });
    },
    alertFunction() {
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
        this.clear();
      }, 3000);
    },
    clear() {
      this.name = '';
      this.cpf = '';
      this.numberTel = '';
      this.email = '';
      this.password = '';
    },
    onChange(e) {
      console.log(e);
      if (this.select !== 'medical') {
        this.expansionM = false;
      } else {
        this.expansionM = true;
      }
    },
    DateFormatted() {
      const date = this.admission.split('-');
      this.admission = `${date[2]}-${date[1]}-${date[0]}`;
    },
  },
};
</script>
<style >
.form{
    width: 70%;
    align-items: center;
    justify-content: center;
}
.card{
    height: 570px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.search{
    display: flex;
    height: 50px;
    align-items: center;

}
.cpf{
    width: 300px;
    flex-direction: row;

}
.date{
    width: 200px;
    flex-direction: row;
}
.datetime{
    display: flex;
    height: 50px;
    align-items: center;

}

</style>
