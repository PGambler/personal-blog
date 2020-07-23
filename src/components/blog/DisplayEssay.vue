<template>
  <div>
    <el-page-header @back="goBack"
                    class="essay-head"
                    :content="blog.title"></el-page-header>
    <transition name="el-fade-in-linear">
      <div v-html="essay.html"
           class="essay-body"
           v-highlight></div>
    </transition>
    <el-card class="essay-license"
             shadow="always">
      <h3>文档信息</h3>
      <p>作者：{{blog.author}}</p>
      <p>创建时间：{{$moment(blog.createdAt).format("YYYY-MM-DD HH:mm:ss").toString()}}</p>
      <p>最后修改时间：{{$moment(blog.updatedAt).format("YYYY-MM-DD HH:mm:ss").toString()}}</p>
      <a rel="license"
         href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="知识共享许可协议"
             style="border-width:0"
             src="https://i.creativecommons.org/l/by-nc/4.0/80x15.png" /></a><br />本作品采用<a rel="license"
         href="http://creativecommons.org/licenses/by-nc/4.0/">知识共享署名-非商业性使用 4.0 国际许可协议</a>进行许可。
    </el-card>
    <el-row class="essay-nav"
            type="flex"
            justify="space-between">
      <el-col :span="11">
        <el-link :underline="false"
                 icon="el-icon-arrow-left"
                 :disabled="!prepBlog._id"
                 @click="loadPage(prepBlog._id)">{{ prepBlog.title && prepBlog.title }}</el-link>
      </el-col>
      <el-col :span="11">
        <el-link :underline="false"
                 :disabled="!postBlog._id"
                 :style="{float: 'right'}"
                 @click="loadPage(postBlog._id)">
          {{ postBlog.title && postBlog.title }}
          <i class="el-icon-arrow-right"></i>
        </el-link>
      </el-col>
    </el-row>
    <Comment :essay="essay._id" />
  </div>
</template>

<script>
import Comment from './Comment'
import "mavon-editor/dist/css/index.css";
export default {
  data () {
    return {
      prepBlog: {},
      postBlog: {},
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
        _id: "",
        blog: "",
        content: "",
        html: ""
      }
    };
  },
  components: {
    Comment
  },
  computed: {
    blogList () {
      return this.$store.state.blog.blogList
    }
  },
  created: function () {
    this.loadPage(this.$route.params.blogId)
  },
  methods: {
    loadPage (blogId) {
      if (!blogId) return;
      const index = this.blogList.findIndex((it) => { return it._id === blogId })
      this.prepBlog = this.blogList[index - 1] ? this.blogList[index - 1] : {}
      this.postBlog = this.blogList[index + 1] ? this.blogList[index + 1] : {}
      this.axios.post("/blog/selectOne", { _id: blogId }).then(res => {
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
    goBack: function () {
      this.$router.push({ name: "blog" });
    }
  }
};
</script>

<style>
.essay-head {
  padding: 22px;
  border-bottom: 1px #ccc solid;
}
.essay-body {
  background-color: aliceblue;
  padding: 22px;
  margin: 8px 0;
  border-radius: 8px;
}
.essay-license {
  background-color: cadetblue;
}
.essay-license h3 {
  margin: 4px 0;
}
.essay-nav {
  padding: 20px;
  margin: 8px 0;
  border: 1px #ccc solid;
}
</style>