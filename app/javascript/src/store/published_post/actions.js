// 引入 mutations_type （引用同一個 key）
import * as types from './mutations_type.js'

export const setPublishedPosts = ({ commit }, published_posts) => {
  commit(types.PUBLISHED_POST_LIST, published_posts);
}

export const destroyPublishedPost = ({ commit }, published_post) => {
  commit(types.PUBLISHED_POST_DESTROY, published_post);
}
