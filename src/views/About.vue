<template>
<v-app>
<navdrawer/>
<navbar/>
  <calendar/>
</v-app>
</template>

<script>
import Calendar from '../components/calendar.vue';
import Navbar from '../components/nav-bar.vue';
import Navdrawer from '../components/nav-drawer.vue';

export default {
  name: 'Home',

  components: {
    Calendar,
    Navbar,
    Navdrawer,
  },
};
</script>
