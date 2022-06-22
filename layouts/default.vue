<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
      width="375px"
    >
      <div class="text-left ml-5 mt-5">
        <h2>Cart ({{ $store.state.cartItems.length }}) item</h2>
      </div>

      <v-list three-line>
        <v-list-item v-for="(item, i) in $store.state.cartItems" :key="i">
          <v-list-item-avatar>
            <v-img :src="item.image"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="item.name" />
            <v-list-item-subtitle v-text="'$' + item.price" />
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="removeCart(item.id)">
              <v-icon color="red lighten-1">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      right: true,
      rightDrawer: false,
      title: "eCommerce Application",
    };
  },
  methods: {
    removeCart(id) {
      this.$store.dispatch("removeProduct", id);
    },
  },
  created() {
    this.$root.$on("show-sidebar", (event) => {
      this.rightDrawer = event;
    });
  },
};
</script>
