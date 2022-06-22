export default {
  strict: false,
  state() {
    return {
      cartItems: [],
    }
  },
  mutations: {
      addProductToCart(state, payload) {
          let isExist = state.cartItems.find(({ id }) => id === payload[0].id);
          if (!isExist) {
               state.cartItems.push(...payload)
          }
      },
      removeProductFromCart(state, payload) {
            const requiredIndex = state.cartItems.findIndex(el => {
                return el.id === String(payload);
            });
            if(requiredIndex === -1){
                return false;
            };
          state.cartItems.splice(requiredIndex, 1);
      }
  },
  actions: {
    addProduct({ commit }, data) {
      commit('addProductToCart', data)
      },
    removeProduct({ commit }, data) {
      commit('removeProductFromCart', data)
    },
  },
}
