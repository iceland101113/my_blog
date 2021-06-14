<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div style="text-align: center;">
            publish posts count<br>
            <h1 style="display: inline-block;">{{ post_counts }}</h1>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div style="text-align: center;">
            user counts<br>
            <h1 style="display: inline-block;">{{ user_counts }}</h1>
          </div>
        </div>
      </div>
    </div>
    <div>
      <b-table striped hover :items="items" :fields="fields">
        <template v-slot:cell(fid)="data">
          <b-button variant="dark" @click="ShowPostClick(data)"><font-awesome-icon icon="eye"/></b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      fields: [
        { key: 'title', label: 'Title' },
        { key: 'user', label: 'Author Account' },
        { key: 'comment_counts', label: 'Comment Counts'},
        { key: 'updated_at', label: 'Updated Time' },
        { key: 'fid', label: '#' },
      ],
      items: [],
      post_counts: '',
      user_counts: ''
    }
  },
  methods: {
    ShowPostClick(data) {
      const id = data.item.id;
      this.$router.push("/posts/show/" + id);
    },
  },
  mounted() {
    const GetPostsUrl = "api/v1/get_all_posts";
    axios
      .get(GetPostsUrl)
      .then(res => {
        let data = res.data;
        this.items = data.data
        this.post_counts = data.post_counts
        this.user_counts = data.user_counts
      })
  },
}
</script>

<style scoped>
.card {
  border-radius: 6px;
  box-shadow: 0 2px 2px hsla(38,16%,76%,.5);
  margin-bottom: 20px;
  padding: 15px 15px 10px;
}
</style>
