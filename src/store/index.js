import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    btnLoading:false
  },
  mutations: {
    setBtnLoading(state,status) {
      state.btnLoading = status
    }
  },
  actions: {

  },
  modules: {
    
  }
});

export default store;