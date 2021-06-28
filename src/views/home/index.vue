<template>
    <v-app>
  <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item to="/home">
            <v-list-item-title><h3>Agenda</h3></v-list-item-title>
          </v-list-item>

          <v-list-item to="/home/attendance">
            <v-list-item-title><h3>Novo atendimento</h3></v-list-item-title>
          </v-list-item>

          <v-list-item to="/home/new/patient">
            <v-list-item-title><h3>Cadastrar Paciente</h3></v-list-item-title>
          </v-list-item>

          <v-list-item to="/home/employee/new">
            <v-list-item-title><h3>Cadastrar Funcionário</h3></v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title><h2>Medical Center</h2></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 60px;">
      </v-container>
    </v-sheet>
  </v-card>
  <!-- Sizes your content based upon application components -->
  <v-main>
    <!-- Provides the application the proper gutter -->
    <v-container fluid>
        <router-view/>
      <!-- If using vue-router -->
    </v-container>
  </v-main>

</v-app>
</template>
<script>

export default {
  name: 'Home',
  components: {
  },
  data: () => ({
    drawer: false,
    group: null,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
};

</script>
