<template>
  <el-row>
    <el-card shadow="hover"
             class="card">
      <el-image style="width: 10vh; height: 10vh;"
                :src="blog.cover ? BASE_URL + blog.cover : '/static/image/default.png'"
                :preview-src-list="[blog.cover ? BASE_URL + blog.cover : '/static/image/default.png']"
                fit="cover"></el-image>
      <div style="padding: 14px;display: inline-block;width: 90vh;">
        <el-link @click="showEssay">
          <h3>{{blog.title}}</h3>
        </el-link>
        <div>{{blog.desc}}</div>
      </div>
      <div style="border-top: 1px solid #ccc;padding-top: 6px;">
        <Tag v-bind:data="blog.tags"
             :click="searchBlogList"
             style="display: inline-block;" />
        <div style="color: #999;float: right;padding: 6px;">
          <time class="time">{{ $moment(blog.updatedAt).format("YYYY-MM-DD HH:mm:ss").toString() }}</time>
        </div>
      </div>
    </el-card>
  </el-row>
</template>

<script>
import Tag from "@/components/blog/Tag";
export default {
  props: ["blog"],
  components: {
    Tag
  },
  methods: {
    showEssay: function () {
      this.$router.push({ name: "essay", params: { blogId: this.blog._id } });
    },
    searchBlogList (tag) {
      this.$store.dispatch('update_blogList', { 'tags.name': tag.name })
    }
  }
}
</script>
<style scoped lang="less">
.el-row {
  margin-bottom: 8px;
  .time {
    font-size: 13px;
    color: #999;
  }
}
</style>
