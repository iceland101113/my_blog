<template>
<div class="login">
  <AuthPanel type="login" @auth-panel-submit="handleLogin" />
</div>
</template>

<script>
import AuthPanel from "./AuthPanel.vue";
import axios from "axios";
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    AuthPanel: AuthPanel
  },
  methods: {
    ...mapActions([
      'actionLogin',
      'setCurrentUser',
    ]),
    handleLogin(payload) {
      console.log("handleLogin");
      const url = "/api/v1/login";
      axios
        .post(url, payload)
        .then(res => {
          console.log("login success!");
          let data = res.data
          //save to sessionStorage
          let authToken = data.auth_token;

          let sessionData = { authToken: authToken , user: data.user };
          sessionStorage.setItem("user-data", JSON.stringify(sessionData));

          this.actionLogin(true)
          this.setCurrentUser(data.user)
          this.$router.push("/");

        })
        .catch(err => {
          this.actionLogin(false)
          console.error(err.response.data.errors);
        });
    }
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>
