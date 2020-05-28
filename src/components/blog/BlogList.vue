<template>
  <div>
    <BlogCard v-for="(blog, index) in blogs"
              :key="index"
              v-bind:blog="blog"
              v-bind:showBlog="showBlog" />
  </div>
</template>

<script>
import BlogCard from "@/components/blog/BlogCard";
export default {
  data () {
    return {
      blogs: []
    };
  },
  created: function () {
    this.axios
      .post("/blogManage/selectList")
      .then(res => {
        res.data && (this.blogs = res.data);
      })
      .catch(res => {
        this.$message.error(res.data.msg);
      });
  },
  methods: {
    handleChange: function (val) {
      console.log(val);
    },
    showBlog: function (blog) {
      this.$router.push({ name: "essay", params: { blog: blog._id } });
    }
  },
  components: {
    BlogCard
  }
};
</script>

<style>
</style>