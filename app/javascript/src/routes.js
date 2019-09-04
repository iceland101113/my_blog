import Home from './components/Home.vue'
import SignUp from './components/SignUp.vue'
import LogIn from './components/LogIn.vue'
import PostIndex from './components/post/Index.vue'
import PostNew from './components/post/New.vue'
import PostUpdate from './components/post/Update.vue'
import PostShow from './components/post/Show.vue'

export const routes = [
  { path: '/', component: Home },
  { path: '/sign_up', component: SignUp },
  { path: '/log_in', component: LogIn },
  { path: '/posts', component: PostIndex },
  { path: '/posts/new', component: PostNew },
  { path: '/posts/update/:id', component: PostUpdate },
  { path: '/posts/show/:id', component: PostShow },
];
