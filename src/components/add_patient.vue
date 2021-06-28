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
      <h2>Cadastrar Paciente</h2>
      <div>
        <v-text-field
          v-model="name"
          label="Nome"
          :rules="nameRules"
          required
        ></v-text-field>
      </div>
      <div class="search">
          <div>
          <v-text-field
          class="cpf"
          v-model="cpf"
          :counter="14"
          v-mask="'###.###.###-##'"
          label="CPF"
          :rules="nameRules"
          required
        > </v-text-field>
          </div>
      </div>
      </validation-provider>
      <validation-provider
        name="Telefone"
      >
        <v-text-field
          v-model="numberTel"
          label="Telefone"
          v-mask="'(NN)NNNNN-NNNN'"
          :rules="nameRules"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider
        name="Email"
      >
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
import moment from 'moment';
import patient from '../sevices/patient/index';
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
    cpf: '',
    numberTel: '',
    invalid: false,
    alert: false,
    items: [
    ],
    checkbox: null,
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
        type_user: 'patient',
      };
      user.new_user(dataUser)
        .then((response) => {
          if (response.status === 200) {
            patient.new_patient({
              user_id: response.data.id,
              name: this.name,
              cpf: this.cpf,
              num_registry: 10,
            }).then((res) => {
              if (res.status === 200) {
                this.alertFunction();
              }
            });
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
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format('DD/MM/YYYY') : '';
    },
  },
};
</script>
<style >
.form{
    width: 80%;
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
