<template>
  <div class="container">
    <b-form @submit="onPublish" @reset="onDraft" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Title"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="post.title"
          required
          placeholder="Enter title"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Content" label-for="input-2">
        <b-form-textarea
          id="input-2"
          v-model="post.content"
          required
          placeholder="Enter something..."
          rows="8"
        ></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary">Publish</b-button>
      <b-button type="reset" variant="danger">Draft</b-button>
    </b-form>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      post: {},
      show: true
    }
  },
  methods: {
    onPublish(evt) {
      evt.preventDefault()
      // alert(JSON.stringify(this.form))
      console.log(this.post);

      this.post.status = 1;

      const params = this.post;
      const UpdateUrl = "api/v1/posts/" + this.post.id;

      axios
        .put(UpdateUrl, params)
        .then(res => {
          this.$router.push("/posts");
        })
        .catch(err => {
          console.error(err.response.data);
        });

    },
    onDraft(evt) {
      evt.preventDefault()

      this.post.status = 2;

      const params = this.post;
      const UpdateUrl = "api/v1/posts/" + this.post.id;

      axios
        .put(UpdateUrl, params)
        .then(res => {
          this.$router.push("/posts");
        })
        .catch(err => {
          console.error(err.response.data);
        });
    }
  },
  mounted() {
    const id = this.$route.params.id;
    console.log(id)
    const GetPostUrl = "api/v1/posts/" + id;
    axios
      .get(GetPostUrl)
      .then(res => {
        let post = res.data.data;
        this.post = post
        // this.setUsers(users);
      })
  },
}
</script>

<style scoped>

</style>
