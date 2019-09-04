// 引入 mutations_type （引用同一個 key）
import * as types from './mutations_type.js'

export const actionLogin = ({ commit }, isLogin) => {
  commit(types.LOGIN, isLogin);
}
export const setCurrentUser = ({ commit }, currentUser) => {
  commit(types.CURRENTUSER, currentUser);
}

