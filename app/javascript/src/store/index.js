import Vue from 'vue'
import Vuex from 'vuex'
import { state, mutations } from './mutations.js'
import * as getters from './getters.js'
import * as actions from './actions.js'
import published_post from './published_post';
import draft_post from './draft_post';
import comment from './comment';

Vue.use( Vuex );

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    published_post,
    draft_post,
    comment,
  },
  // 嚴格模式，禁止直接修改 state
  strict: true
});
