import * as types from './mutations_type.js'

// state
export const state = {
  published_posts: [],
}

// mutations
export const mutations = {
  // action 發出 commit 會對應到 mutation 使用的是 Object key 方式
  [types.PUBLISHED_POST_LIST] (state, published_posts) {
    // 在 mutation 改變 state（只有 mutation 可以改變！）
    state.published_posts = published_posts;
  },
  [types.PUBLISHED_POST_DESTROY] (state, published_post) {
    let published_posts = state.published_posts
    let origin_published_post = published_posts.find(item =>{ return item.key === published_post.key })
    let index = published_posts.indexOf(origin_published_post)
    published_posts.splice(index, 1)
    state.published_posts = published_posts
  },
}
