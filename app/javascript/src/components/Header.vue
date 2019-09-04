<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">{{ title }}</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#" @click="HomePageClick">Home</b-nav-item>
        <b-nav-item href="#" @click="PostIndexClick" v-if="isLogin" >My Posts</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" v-if="isLogin" >
        <b-nav-item right><em>{{ currentUser.email }}</em></b-nav-item>
        <b-nav-item href="#" @click="LogOutClick" right>Log Out</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-else >
        <b-nav-item href="#" @click="SignUpClick" right>Sign up</b-nav-item>
        <b-nav-item href="#" @click="LogInClick" right>Log In</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from 'vuex';

export default {
  data: function () {
    return {
      title: "My-Blog"
    }
  },
  computed: {
    ...mapGetters({
      isLogin: 'getLogin',
      currentUser: 'getCurrentUser',
    })
  },
  methods: {
     ...mapActions([
      'actionLogin',
      'setCurrentUser',
    ]),
    SignUpClick() {
      this.$router.push("/sign_up");
    },
    LogInClick() {
      this.$router.push("/log_in");
    },
    LogOutClick() {
      console.log("logout");
      let sessionData = JSON.parse(sessionStorage.getItem("user-data"));
      if (sessionData == null) { return }
      let token = sessionData.authToken
      //1. access logout API
      const url = "/api/v1/logout";
      axios
        .post(url, { auth_token: token })
        .then(res => {
          this.actionLogin(false)
          this.setCurrentUser({})
          // clean up sessionStorage
          sessionStorage.removeItem("user-data");
          this.$router.push("/");
        })
        .catch(err => {
          console.error(err.response.data.error);
        });
    },
    handleAuthState(payload) {
      // 1. change the state of this.isLogin
      // 2. get this.userEmail for sessionStorage
      console.dir(payload);
      let action = payload.action;
      if (action == "login") {
        let sessionData = JSON.parse(sessionStorage.getItem("user-data"));
        this.actionLogin(true)
        this.setCurrentUser(sessionData.user)
      } else if (action == "logout") {
        this.actionLogin(false)
        this.setCurrentUser({})
        // this.$router.push("/login");
      }
    },
    HomePageClick() {
      this.$router.push("/");
    },
    PostIndexClick() {
      this.$router.push("/posts");
    }
  },
  mounted() {
    console.log('mounted')
    // 2. check auth state form local storage
    let sessionData = JSON.parse(sessionStorage.getItem("user-data"));
    if (sessionData) {
      this.handleAuthState({ action: "login" });
    } else {
      this.handleAuthState({ action: "logout" });
    }
  },
}
</script>

<style scoped>

</style>
