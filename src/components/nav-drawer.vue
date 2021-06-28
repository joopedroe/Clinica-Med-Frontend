<template>
    <v-app>
      <v-navigation-drawer
      v-model="drawer"
      :expand-on-hover="expandOnHover"
      absolute
      bottom
      temporary
      app
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    </v-app>
</template>
<script>
import {
  mapState,
} from 'vuex';

export default {
  name: 'Navdrawer',
  components: {

  },
  props: {
    expandOnHover: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState(['barColor', 'barImage']),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit('SET_DRAWER', val);
      },
    },
    computedItems() {
      return this.items.map(this.mapItem);
    },
  },
};

</script>
