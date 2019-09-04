<template>
  <div class="container">
    <div>
      <b-button @click="NewPostClick">new post</b-button>
    </div>
    <br>
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="Published" active>
          <b-table striped hover :items="published_posts" :fields="fields">
            <template slot="fid" slot-scope="data">
              <b-button variant="dark" @click="ShowPostClick(data)"><font-awesome-icon icon="eye"/></b-button>
              <b-button variant="primary" @click="UpdatePostClick(data)"><font-awesome-icon icon="pencil-alt"/></b-button>
              <b-button variant="danger" @click="DeletePostClick(data)"><font-awesome-icon icon="trash-alt" /></b-button>
            </template>
          </b-table>
        </b-tab>
        <b-tab title="Draft">
          <b-table striped hover :items="draft_posts" :fields="fields">
            <template slot="fid" slot-scope="data">
              <b-button variant="dark" @click="ShowPostClick(data)"><font-awesome-icon icon="eye"/></b-button>
              <b-button variant="primary" @click="UpdatePostClick(data)"><font-awesome-icon icon="pencil-alt"/></b-button>
              <b-button variant="danger" @click="DeletePostClick(data)"><font-awesome-icon icon="trash-alt" /></b-button>
            </template>
          </b-table>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from 'vuex';

export default {
  data: function () {
    return {
      fields: [
        { key: 'title', label: 'Title' },
        { key: 'comment_counts', label: 'Comment Counts'},
        { key: 'updated_at', label: 'Updated Time' },
        { key: 'fid', label: '#' },
      ],
    }
  },
  computed: {
    ...mapGetters({
      published_posts: 'getPublishedPosts',
      draft_posts: 'getDraftPosts',
    })
  },
  methods: {
    ...mapActions([
      'setPublishedPosts',
      'setDraftPosts',
      'destroyPublishedPost',
      'destroyDraftPost',
    ]),
    NewPostClick() {
      this.$router.push("/posts/new");
    },
    ShowPostClick(data) {
      const id = data.item.id;
      this.$router.push("/posts/show/" + id);
    },
    UpdatePostClick(data) {
      const id = data.item.id;
      this.$router.push("/posts/update/" + id);
    },
    DeletePostClick(data) {
      const id = data.item.id;
      const DeleteUrl = "api/v1/posts/" + id;
      axios
        .delete(DeleteUrl)
        .then(res => {
          let post = res.data.data.post;
          if ( res.data.data.status == 'published' ) {
            this.destroyPublishedPost(post)
          } else {
            this.destroyDraftPost(post)
          }
        })
        .catch(err => {
          console.error(err.response.data);
        });
    },
  },
  mounted() {
    const indexUrl = "api/v1/posts";
    axios
      .get(indexUrl)
      .then(res => {
        let published_posts = res.data.data.published_posts;
        this.published_items = published_posts
        this.setPublishedPosts(published_posts)

        let draft_posts = res.data.data.draft_posts;
        this.draft_items = draft_posts
        this.setDraftPosts(draft_posts)
      })
  },
}
</script>

<style scoped>

</style>
