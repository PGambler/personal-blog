<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="" name="list">
      <BlogList v-bind:showBlog="showBlog"/>
    </el-tab-pane>
    <el-tab-pane label="" name="blog">
      <DisplayBlog v-bind:blog="blog" v-bind:goBack="goBack"/>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import BlogList from "@/components/blog/BlogList";
import DisplayBlog from "@/components/blog/DisplayBlog";
export default {
  data() {
    return {
      activeName: "list",
      blog: {}
    };
  },
  components: {
    BlogList,
    DisplayBlog
  },
  methods: {
    showBlog: function(blog) {
      this.blog = blog;
      this.activeName = "blog";
    },
    goBack: function() {
      this.activeName = "list";
    }
  }
};
</script>