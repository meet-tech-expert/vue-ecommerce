<template>
  <div class="flicking-viewport d-flex">
    <v-sheet
      color="transparent"
      height="387px"
      class="d-flex align-center justify-center flex-column"
    >
      <v-btn
        color="transparent"
        class="controls prev mr-2"
        depressed
        fab
        @click="slide('prev')"
      >
        <svg
          width="35"
          height="36"
          viewBox="0 0 35 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="v-icon__component theme--light"
          style="font-size: 35px; height: 35px; width: 35px"
        >
          <circle
            cx="17.5"
            cy="18.1387"
            r="16.5"
            transform="rotate(-180 17.5 18.1387)"
            fill="white"
            stroke=""
            stroke-width="2"
          ></circle>
          <path
            d="M21 12.1143L15.2428 18.1387L21 24.163L19.2189 26.0137L11.6932 18.1387L19.2189 10.2637L21 12.1143Z"
            fill="#000"
          ></path>
        </svg>
      </v-btn>
    </v-sheet>
    <Flicking
      class="px-5"
      ref="carousel"
      :options="{
        moveType: 'freeScroll',
        bound: true,
        align: 'prev',
        horizontal: true,
        circular: false,
      }"
      @changed="updateNavigation"
    >
      <v-card
        class="mx-auto my-12"
		:class="[i === 0 ? 'ml-7' : 'ml-5']"
        :key="i"
        v-for="(item, i) in carouselItem"
      >
        <v-img height="250" :src="item.image"></v-img>

        <v-card-title class="pb-0">{{ item.name }}</v-card-title>

        <v-card-text>
          <div class="my-1 text-subtitle-1">${{ item.price }}</div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>
        <v-card-actions>
          <v-btn color="primary" dark @click="addToCart(item.id)">
            ADD TO CART
          </v-btn>
        </v-card-actions>
      </v-card>
    </Flicking>
    <v-sheet
      height="387px"
      color="transparent"
      class="d-flex align-center justify-center flex-column"
    >
      <v-btn
        color="transparent"
        class="controls next ml-2"
        depressed
        fab
        @click="slide('next')"
      >
        <svg
          width="35"
          height="36"
          viewBox="0 0 35 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="v-icon__component theme--light"
          style="font-size: 35px; height: 35px; width: 35px"
        >
          <circle
            cx="17.5"
            cy="18.1387"
            r="16.5"
            fill="white"
            stroke=""
            stroke-width="2"
          ></circle>
          <path
            d="M14 24.163L19.7572 18.1387L14 12.1143L15.7811 10.2637L23.3068 18.1387L15.7811 26.0137L14 24.163Z"
            fill="#000"
          ></path>
        </svg>
      </v-btn>
    </v-sheet>
  </div>
</template>
<script>
import { Flicking } from "@egjs/vue-flicking";
import "@egjs/vue-flicking/dist/flicking.css";
export default {
  components: {
    Flicking,
  },
  data() {
    return {
      currentIndex: 0,
      carouselItem: [
        {
          id: "1",
          name: "Product 1",
          price: "100",
          image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        },
        {
          id: "2",
          name: "Product 2",
          price: "200",
          image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        },
        {
          id: "3",
          name: "Product 3",
          price: "300",
          image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        },
        {
          id: "4",
          name: "Product 4",
          price: "400",
          image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        },
        {
          id: "5",
          name: "Product 5",
          price: "500",
          image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        },
      ],
    };
  },
  methods: {
    addToCart(id) {
      let item = this.carouselItem.filter(function (item) {
        return item.id == id;
      });
      this.$store.dispatch("addProduct", item);
      this.$root.$emit("show-sidebar", "true");
    },
    updateNavigation(nav) {
      this.currentIndex = nav.index;
      console.log(this.currentIndex);
    },
    slide(type) {
      if (type === "next") {
        if (this.currentIndex < this.carouselItem.length - 1) {
          this.$refs.carousel.next();
        }
      }
      if (type === "prev") {
        if (this.currentIndex > 0) {
          this.$refs.carousel.prev();
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.controls {
  box-shadow: rgb(0 0 0 / 30%) 0px 0px 2px;
}
</style>