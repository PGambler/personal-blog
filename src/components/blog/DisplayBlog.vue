<template>
  <div>
    <el-page-header @back="goBack" :content="blog.name"></el-page-header>
    <p>{{blog.body}}</p>
    <el-divider content-position="right">作者：{{blog.author}}</el-divider>
  </div>
</template>

<script>
export default {
  props: ["blog", "goBack"]
};
</script>

<style>
</style>