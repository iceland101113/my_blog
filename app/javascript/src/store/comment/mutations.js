import * as types from './mutations_type.js'

// state
export const state = {
  comments: [],
}

// mutations
export const mutations = {
  // action 發出 commit 會對應到 mutation 使用的是 Object key 方式
  [types.COMMENT_LIST] (state, comments) {
    // 在 mutation 改變 state（只有 mutation 可以改變！）
    state.comments = comments;
  },
  [types.COMMENT_ADD] (state, comment) {
    let comments = state.comments
    comments.unshift(comment);
    state.comments = comments;
  },
}
