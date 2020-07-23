<template>
  <el-tabs v-model="activeName"
           @tab-click="handleClick"
           type="border-card">
    <el-tab-pane label="推荐榜"
                 name="recommend">
      <ol>
        <li v-for="blog in recommendBlogs.slice(0, this.maxLength)"
            :key="blog._id">
          <el-link>{{blog.title}}</el-link>
        </li>
      </ol>
      <el-link v-show="recommendBlogs.length > this.maxLength"
               type="primary">更多...</el-link>
    </el-tab-pane>
    <el-tab-pane label="热评榜"
                 name="hotcomment">
      <ol>
        <li v-for="blog in hotcommentBlogs.slice(0, this.maxLength)"
            :key="blog._id">
          <el-link>{{blog.title}}</el-link>
        </li>
      </ol>
      <el-link v-show="hotcommentBlogs.length > this.maxLength"
               type="primary">更多...</el-link>
    </el-tab-pane>
    <el-tab-pane label="飙升榜"
                 name="surge">
      <ol>
        <li v-for="blog in surgeBlogs.slice(0, this.maxLength)"
            :key="blog._id">
          <el-link>{{blog.title}}</el-link>
        </li>
      </ol>
      <el-link v-show="surgeBlogs.length > this.maxLength"
               type="primary">更多...</el-link>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  props: ["active"],
  data () {
    return {
      activeName: "recommend",
      maxLength: 3,
      recommendBlogs: [],
      hotcommentBlogs: [],
      surgeBlogs: []
    };
  },
  created () {
    if (this.active) this.activeName = this.active;
    this.handleClick();
  },
  methods: {
    handleClick (tab, event) {
      if (this[this.activeName + "Blogs"].length > 0) return;
      let query = {};
      switch (this.activeName) {
        case "recommend":
          query = {};
          break;
        case "hotcomment":
          query = {};
          break;
        case "surge":
          query = {};
          break;
        default:
          query = {};
      }
      this.axios.post("/blog/selectList", query).then(res => {
        res.data && (this[this.activeName + "Blogs"] = res.data);
      })
        .catch(res => {
          this.$message.error(res.data.msg);
        });
    }
  }
};
</script>
