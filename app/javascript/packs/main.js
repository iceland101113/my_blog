import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../src/components/App.vue'
import { routes } from '../src/routes'
import store from '../src/store'
import BootstrapVue from "bootstrap-vue"
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt, faPencilAlt, faEye} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrashAlt, faPencilAlt, faEye);
Vue.component('font-awesome-icon', FontAwesomeIcon);
// document.addEventListener('DOMContentLoaded', () => {
//   const app = new Vue({
//     router,
//     render: h => h(App)
//   }).$mount()
//   document.body.appendChild(app.$el)

//   console.log(app)
// })

Vue.use(VueRouter);
Vue.use(BootstrapVue);

const router = new VueRouter({
  routes
});

// request 攔截器：每個 axios request 自動加上加上 CSRF 和 token 的設定
axios.interceptors.request.use(
  config => {
    // config.baseURL = '/'
    config.withCredentials = true // 允許攜帶token ,這是解決 CSRF 相關的問題
    config.timeout = 6000
    let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
    let sessionData = JSON.parse(sessionStorage.getItem("user-data"));

    config.headers = {
      'X-CSRF-Token': token,
      'Accept': 'application/json',
    }

    if (token && sessionData) {
      config.headers = {
        ...config.headers,
        'access-token': sessionData.authToken,
      }
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response 攔截器：每個 axios response 自動檢查 token 是否失效，失效重新登入
axios.interceptors.response.use(
  response => {
    if (response.data.error === 'token invalid') {
      store.dispatch('actionLogin', false)
      store.dispatch('setCurrentUser', {})
      sessionStorage.removeItem("user-data");
      router.push("/Login");
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)


document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(App)
  })
})
