<template>
  <el-row>
    <el-card shadow="hover">
      <el-image
        style="width: 80px; height: 80px;"
        src="/static/image/header.jpg"
        :preview-src-list="['/static/image/header.jpg']"
        fit="fill"
      ></el-image>
      <div style="padding: 14px;display: inline-block;">
        <el-link @click="onClickTitle">
          <h3>{{blog.name}}</h3>
        </el-link>
        <p style="color: #c0c4cc;">{{blog.body.slice(0, 35) + "..."}}</p>
      </div>
      <div>
        <span>作者：{{blog.author}}</span>
        <el-tag>标签一</el-tag>
        <el-tag type="success">标签二</el-tag>
        <el-tag type="info">标签三</el-tag>
        <el-tag type="warning">标签四</el-tag>
        <el-tag type="danger">标签五</el-tag>
      </div>
    </el-card>
  </el-row>
</template>

<script>
export default {
  props: ["blog", "showBlog"],
  data() {
    return {
      currentDate: new Date()
    };
  },
  methods: {
    onClickTitle: function() {
      this.showBlog(this.blog);
    }
  }
};
</script>