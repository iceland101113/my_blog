<template>
  <div>
    <Header />
    <br>
    <router-view/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Header from "./Header.vue";

export default {
  name: 'App',
  components: {
    Header: Header,
  },
  data: function () {
    return {
      message: "Hello Vue!"
    }
  }
}
</script>

<style scoped>
body,
html {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
