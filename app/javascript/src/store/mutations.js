import * as types from './mutations_type.js'

// state
export const state = {
  login: false,
  currentUser: {},
}

// mutations
export const mutations = {
  // action 發出 commit 會對應到 mutation 使用的是 Object key 方式
  [types.LOGIN] (state, isLogin) {
    // 在 mutation 改變 state（只有 mutation 可以改變！）
    state.login = isLogin;
  },
  [types.CURRENTUSER] (state, currentUser) {
    state.currentUser = currentUser;
  },
}
