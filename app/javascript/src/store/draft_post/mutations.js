import * as types from './mutations_type.js'

// state
export const state = {
  draft_posts: [],
}

// mutations
export const mutations = {
  // action 發出 commit 會對應到 mutation 使用的是 Object key 方式
  [types.DRAFT_POST_LIST] (state, draft_posts) {
    // 在 mutation 改變 state（只有 mutation 可以改變！）
    state.draft_posts = draft_posts;
  },
  [types.DRAFT_POST_DESTROY] (state, draft_post) {
    let draft_posts = state.draft_posts
    let origin_draft_post = draft_posts.find(item =>{ return item.key === draft_post.key })
    let index = draft_posts.indexOf(origin_draft_post)
    draft_posts.splice(index, 1)
    state.draft_posts = draft_posts
  },
}
