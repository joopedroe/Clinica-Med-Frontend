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
        Atualizado com sucesso!
        </v-alert>
      <h2>Editar Atendimento</h2>
      <div class="search">
          <div>
          <v-text-field
          class="cpf"
          v-model="cpf"
          :counter="14"
          v-mask="'###.###.###-##'"
          label="Buscar paciente por CPF"
        > </v-text-field>
          </div>
        <div class="button">
            <v-btn icon @click="search">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </div>
      </div>
      <div>
        <v-text-field
          v-model="name"
          label="Name"
          required
        ></v-text-field>
      </div>
      </validation-provider>
      <div class="datetime">
         <v-menu
        ref="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            :value="computedDateFormattedMomentjs"
            label="Selecione a data"
            prepend-icon="mdi-calendar"
            readonly
            required
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-spacer></v-spacer>
        <h5>Horário entrada: </h5>
        <input v-model="input" type="time" id="appt" name="appt"
       min="08:00" max="18:00" required>
       <v-spacer></v-spacer>
       <h5>Horário saída: </h5>
       <validation-provider>
       <input v-model="output" type="time" id="appt" name="appt"
       min="08:00" max="18:00" required>
       </validation-provider>
       </div>
      <validation-provider
        name="select"
      >
        <v-select
          v-model="select"
          :items="items"
          item-text="name"
          item-value="id"
          label="Medico"
          data-vv-name="select"
          required
        ></v-select>
      </validation-provider>
      <validation-provider
        name="Observações"
      >
        <v-text-field
          v-model="report"
          label="Observações"
        ></v-text-field>
      </validation-provider>
      <v-btn
        class="mr-4"
        type="submit"
        :disabled="invalid"
      >
        Atualizar
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
import medical from '../sevices/medical/index';
import attendance from '../sevices/attendance/index';

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
  name: 'Attendance',
  components: {
    ValidationProvider,

  },
  data: () => ({
    patient: {},
    name: '',
    date: '',
    cpf: '',
    input: '',
    output: '',
    report: '',
    select: null,
    invalid: false,
    alert: false,
    items: [
    ],
    checkbox: null,
  }),
  mounted() {
    medical.list()
      .then((response) => {
        if (response.status === 200) {
          const { data } = response;
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < data.length; i++) {
            this.items.push({
              name: `${data[i].name} - ${data[i].specialty}`,
              id: data[i].id,
            });
          }
        }
      });
    // eslint-disable-next-line no-undef
    attendance.get(this.$route.params.id)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data[0].datetime_input.split('T');
          this.cpf = response.data[0].patient.cpf;
          this.name = response.data[0].patient.name;
          this.select = response.data[0].medical_id;
          this.patient.id = response.data[0].patient_id;
          // eslint-disable-next-line prefer-destructuring
          this.date = data[0];
          this.report = response.data[0].report;
        }
      });
  },
  methods: {
    submit() {
      const data = {
        medical_id: this.select,
        patient_id: this.patient.id,
        status: true,
        datetime_input: `${this.date} ${this.input}`,
        datetime_output: `${this.date} ${this.output}`,
        report: this.report,
      };
      attendance.update(this.$route.params.id, data)
        .then((response) => {
          if (response.status === 200) {
            this.alertFunction();
          }
        });
    },
    alertFunction() {
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    },
    search() {
      patient.get_patient(this.cpf)
        .then((response) => {
          if (response.status === 200) {
            this.patient = response.data;
            this.name = response.data.name;
          }
        });
    },
    clear() {
      this.name = '';
      this.select = null;
      this.checkbox = null;
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
