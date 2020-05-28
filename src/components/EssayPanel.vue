<template>
  <div>
    <el-page-header @back="goBack"
                    :content="blog.title"></el-page-header>
    <p v-html="essay.html"
       v-highlight></p>
    <el-divider content-position="right">作者：{{blog.author}}</el-divider>
  </div>
</template>

<script>
import "mavon-editor/dist/css/index.css";
export default {
  data () {
    return {
      blog: {
        calalog: "",
        title: "",
        desc: "",
        author: "",
        createTime: "",
        lastUpdateTime: "",
        tags: []
      },
      essay: {
        blog: "",
        content: "",
        html: ""
      }
    };
  },
  created: function () {
    if (!this.$route.params || !this.$route.params.blog) return;
    let blogId = this.$route.params.blog;
    this.axios.post("/blogManage/selectOne", { _id: blogId }).then(res => {
      res.data && (this.blog = res.data);
    }).catch(res => {
      this.$message.error(res.data.msg);
    });
    this.axios.post("/essay/selectOne", { blog: blogId }).then(res => {
      res.data && (this.essay = res.data);
    }).catch(res => {
      this.$message.error(res.data.msg);
    });
  },
  methods: {
    goBack: function () {
      this.$router.push({ name: "blog" });
    }
  }
};
</script>

<style>
</style>