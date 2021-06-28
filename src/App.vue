<template>
  <v-app>
      <router-view/>
    <v-footer padless>
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>joopedroe</strong>
    </v-col>
  </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    //
  }),
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Baloo+Tammudu+2&family=Mandali&display=swap');

*{
  font-family: 'Mandali', sans-serif;
}
</style>
