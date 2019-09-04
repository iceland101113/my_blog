<template>
<div class="signup">
  <AuthPanel type="signup"  @auth-panel-submit="handleSignUp" />
</div>
</template>

<script>
import AuthPanel from "./AuthPanel.vue";
import axios from "axios";

export default {
  components: {
    AuthPanel: AuthPanel
  },
  methods: {
    handleSignUp(payload) {
      const signupUrl = "api/v1/users";
      console.log(payload);
      axios
        .post(signupUrl, payload)
        .then(res => {
          console.log("Signup Success");
          console.log(res.data);
          this.$router.push("/log_in");
        })
        .catch(err => {
          console.error(err.response.data.errors);
        });
    }
  }
};
</script>

<style scoped>
.signup {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>
