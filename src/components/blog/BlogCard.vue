<template>
  <el-row>
    <el-card shadow="hover">
      <el-image style="width: 80px; height: 80px;"
                :src="blog.cover ? BASE_URL + blog.cover : '/static/image/default.png'"
                :preview-src-list="[blog.cover ? BASE_URL + blog.cover : '/static/image/default.png']"
                fit="cover"></el-image>
      <div style="padding: 14px;display: inline-block;">
        <el-link @click="onClickTitle">
          <h3>{{blog.title}}</h3>
        </el-link>
        <p style="color: #c0c4cc;">{{blog.desc.slice(0, 35) + "..."}}</p>
      </div>
      <div style="border-top: 1px solid #ccc;padding-top: 6px;">
        <Tag v-bind:data="blog.tags"
             style="display: inline-block;" />
        <div style="color: #999;float: right;padding: 6px;">
          <i class="el-icon-chat-dot-square"></i>
          {{Math.ceil(Math.random()*10000)}}
          <i class="el-icon-share"></i>
          {{Math.ceil(Math.random()*1000)}}
          <i class="el-icon-star-off"></i>
          {{Math.ceil(Math.random()*10000)}}
        </div>
      </div>
    </el-card>
  </el-row>
</template>

<script>
import Tag from "@/components/blog/Tag";
export default {
  props: ["blog", "showBlog"],
  data () {
    return {
      currentDate: new Date()
    };
  },
  methods: {
    onClickTitle: function () {
      this.showBlog(this.blog);
    }
  },
  components: {
    Tag
  }
};
</script>