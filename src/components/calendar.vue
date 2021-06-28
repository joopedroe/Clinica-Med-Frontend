<template>
<v-app>
  <v-main app>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Hoje
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Dia</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semana</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mês</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 Dias</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn icon :to="{path:'/home/attendance/edit/'+selectedEvent.id}">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <div class="resumecard">
                <h3>Paciente: </h3><h4 v-html="selectedEvent.name"></h4>
              </div>
              <div class="resumecard">
                <h3>CPF: </h3><h4 v-html="selectedEvent.cpf"></h4>
              </div>
              <div class="resumecard">
                <h3>Medico: </h3><h4 v-html="selectedEvent.medical"></h4>
              </div>
              <div class="resumecard">
                <h3>Especialidade: </h3><span v-html="selectedEvent.specialty"></span>
              </div>
              <div class="resumecard">
                <h3>Horario entrada: </h3><span v-html="selectedEvent.input"></span>
              </div>
              <div class="resumecard">
                <h3>Horario saida: </h3><span v-html="selectedEvent.output"></span>
              </div>
              <div class="resumecard">
                <h3>Obs: </h3><span v-html="selectedEvent.report"></span>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
  </v-main>
</v-app>
</template>
<script>
import moment from 'moment';
import attendance from '../sevices/attendance/index';

export default {
  name: 'Calendar',
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Mes',
      week: 'Semana',
      day: 'Dia',
      '4day': '4 Dias',
    },
    attendances: [],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
  }),
  mounted() {
    attendance.list()
      .then((response) => {
        if (response.status === 200) {
          const events = [];
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < response.data.length; i++) {
            events.push({
              id: response.data[i].id,
              name: response.data[i].patient.name,
              cpf: response.data[i].patient.cpf,
              specialty: response.data[i].medical.specialty,
              input: moment(response.data[i].datetime_input).format('HH:mm'),
              output: moment(response.data[i].datetime_output).format('HH:mm'),
              medical: response.data[i].medical.name,
              start: moment(response.data[i].datetime_input).format('YYYY-MM-DD HH:mm'),
              end: moment(response.data[i].datetime_output).format('YYYY-MM-DD HH:mm'),
              report: response.data[i].report,
              color: this.colors[this.rnd(0, this.colors.length - 1)],
              timed: !true,
            });
          }
          this.events = events;
          console.log(this.events);
          this.$refs.calendar.checkChange();
        }
      });
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = 'day';
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = '';
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        // eslint-disable-next-line no-return-assign
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true));
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.attendances.length; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        // eslint-disable-next-line no-unused-vars
        const second = new Date(first.getTime() + secondTimestamp);
      }
      console.log(events);
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>
<style >
.resumecard{
  display: flex;
  flex-direction: row;
}
</style>
