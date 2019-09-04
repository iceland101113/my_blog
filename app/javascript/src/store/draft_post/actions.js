// 引入 mutations_type （引用同一個 key）
import * as types from './mutations_type.js'

export const setDraftPosts = ({ commit }, draft_posts) => {
  commit(types.DRAFT_POST_LIST, draft_posts);
}

export const destroyDraftPost = ({ commit }, draft_post) => {
  console.log(draft_post);
  commit(types.DRAFT_POST_DESTROY, draft_post);
}
