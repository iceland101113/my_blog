import * as types from './mutations_type.js'

export const setComments = ({ commit }, comments) => {
  commit(types.COMMENT_LIST, comments);
}

export const addComment = ({ commit }, comment) => {
  commit(types.COMMENT_ADD, comment);
}
