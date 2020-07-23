<template>
  <div>
    <BlogCard v-for="(blog, index) in blogList"
              :key="index"
              :blog="blog" />
  </div>
</template>

<script>
import BlogCard from "@/components/blog/BlogCard";
export default {
  components: {
    BlogCard
  },
  computed: {
    blogList () {
      return this.$store.state.blog.blogList
    }
  }
};
</script>

<style>
</style>