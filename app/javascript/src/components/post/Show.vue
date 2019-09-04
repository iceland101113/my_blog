<template>
  <div class="container">
    <div class="card">
      <div class="col-md-12">
        <h1>{{ post.title }}</h1>
      </div>
      <div class="col-md-12">
        <p>{{ post.content }}</p>
      </div>
    </div>
    <div v-if="this.post.status == 'published'">
      <b-form @submit="onPublish" v-if="show">
        <b-form-group id="input-group-1">
          <b-form-textarea
            v-model="new_comment.content"
            required
            placeholder="leave some message..."
            rows="8"
          ></b-form-textarea>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
    <br>
    <div class="card" v-for="comment in comments">
      <p>{{ comment.content }}</p><br>
      <p>{{ comment.created_at }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      post: {},
      // comments: [],
      new_comment: {},
      show: true,
    }
  },
  computed: {
    ...mapGetters({
      comments: 'getComments',
    })
  },
  methods: {
    ...mapActions([
      'setComments',
      'addComment',
    ]),
    onPublish(evt) {
      evt.preventDefault()
      // alert(JSON.stringify(this.form))

      const params = this.post;
      const CreateCommentUrl = "api/v1/posts/" + this.post.id + "/comments";

      axios
        .post(CreateCommentUrl, this.new_comment)
        .then(res => {
          let comment = res.data.data
          this.addComment(comment)
        })
        .catch(err => {
          console.error(err.response.data);
        });

    },
  },
  mounted() {
    const id = this.$route.params.id;

    axios.all([
        axios.get('api/v1/posts/' + id),
        axios.get('/api/v1/posts/' + id + '/comments')
      ])
      .then(axios.spread((post_response, comments_response) => {
        // do something with both responses
        let post = post_response.data.data
        this.post = post
        console.log(post);

        let comments = comments_response.data.data.comments
        this.setComments(comments)

        let new_comment = comments_response.data.data.new_comment
        console.log(new_comment);
        this.new_comment = new_comment
      }))
  },
}
</script>

<style scoped>
.card {
  border-radius: 6px;
  box-shadow: 0 2px 2px hsla(38,16%,76%,.5);
  margin-bottom: 20px;
  padding: 15px 15px 10px;
  background-color: lightgrey;
}
</style>
