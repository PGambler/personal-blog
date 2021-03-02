<template>
  <div>
    <el-container>
      <el-header>
        <el-row type="flex"
                justify="space-between">
          <el-col :span="6">
            <h3>博文管理</h3>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
    <el-container>
      <el-aside width="340px"
                :style="{height: wheight - 100 + 'px'}">
        <el-button-group style="padding: 8px;">
          <el-button type="primary"
                     @click="addCalalogBtnEvt"
                     icon="el-icon-circle-plus"
                     size="mini">添加目录</el-button>
          <el-button type="primary"
                     @click="modCalalogBtnEvt"
                     icon="el-icon-edit"
                     size="mini"
                     :disabled="!curCalalog">修改目录</el-button>
          <el-button type="primary"
                     @click="delCalalogBtnEvt"
                     icon="el-icon-remove"
                     size="mini"
                     :disabled="!curCalalog">删除目录</el-button>
        </el-button-group>
        <TreePanel v-bind:data="calalogs"
                   v-bind:selected="selectCalalog" />
        <el-button-group style="padding: 8px;">
          <el-button type="primary"
                     @click="addBlogBtnEvt"
                     icon="el-icon-circle-plus"
                     size="mini"
                     :disabled="!curCalalog">添 加</el-button>
          <el-button type="primary"
                     @click="modBlogBtnEvt"
                     icon="el-icon-edit"
                     size="mini"
                     :disabled="!curBlog">修 改</el-button>
          <el-button type="primary"
                     @click="saveBlogBtnEvt()"
                     icon="el-icon-success"
                     size="mini"
                     :disabled="!curBlog">保 存</el-button>
          <el-button type="primary"
                     @click="delBlogBtnEvt"
                     icon="el-icon-remove"
                     size="mini"
                     :disabled="!curBlog">删 除</el-button>
        </el-button-group>
        <TreePanel v-bind:data="blogs"
                   v-bind:selected="selectBlog"
                   v-bind:title="'博文列表'" />
        <el-button-group style="padding: 8px;">
          <el-button type="primary"
                     @click="dialogVisibleTag = true"
                     icon="el-icon-circle-plus"
                     size="mini">标签管理</el-button>
        </el-button-group>
        <el-card class="box-card">
          <div slot="header"
               class="clearfix">
            <span>标签</span>
          </div>
          <Tag v-bind:data="tags"
               v-bind:click="tagToggleEvnt"
               v-bind:dbData="true"
               @change="(data)=> {tags = data}" />
        </el-card>
      </el-aside>
      <el-container>
        <el-main :style="{height: wheight - 210 + 'px'}">
          <mavon-editor ref="md"
                        v-model="essay.content"
                        @save="saveEssay"
                        :editable="!!curBlog"
                        @imgAdd="uploadImage" />
        </el-main>
        <el-footer id="tag-footer">
          <el-card class="box-card">
            <div slot="header"
                 class="clearfix">
              <span>博文标签</span>
            </div>
            <Tag width="100%"
                 v-bind:data="blog.tags"
                 v-bind:closable="true" />
          </el-card>
        </el-footer>
      </el-container>
    </el-container>
    <el-dialog title="新增/修改"
               :visible.sync="dialogVisible"
               width="30%">
      <el-form ref="form"
               :model="calalog"
               label-width="80px">
        <el-form-item label="上级目录">
          <el-select v-model="calalog.pcode"
                     filterable
                     placeholder="请选择"
                     style="width: 100%;">
            <el-option v-for="item in calalogList"
                       :key="item.code"
                       :label="item.name"
                       :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目录名称">
          <el-input v-model="calalog.name"
                    clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="submitCalalog">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="新增/修改"
               :visible.sync="dialogVisibleBlog"
               width="30%">
      <el-form ref="form"
               :model="blog"
               label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="blog.title"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea"
                    v-model="blog.desc"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-input type="text"
                    v-model="blog.cover">
            <el-upload action="/image/store"
                       :http-request="uploadCoverEvnt"
                       :show-file-list="false"
                       slot="append">
              <i class="el-icon-upload"></i>
            </el-upload>
          </el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="blog.author"
                    clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisibleBlog = false">取 消</el-button>
          <el-button type="primary"
                     @click="submitBlog">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="标签管理"
               :visible.sync="dialogVisibleTag"
               width="50%">
      <el-button-group style="padding: 8px;">
        <el-button type="primary"
                   @click="newTag={name:'',color:''};innerVisible = true;"
                   icon="el-icon-circle-plus"
                   size="mini">添 加</el-button>
        <el-button type="primary"
                   @click="innerVisible = true;isModifyTag = true;"
                   icon="el-icon-edit"
                   size="mini"
                   :disabled="!curTag">修 改</el-button>
        <el-button type="primary"
                   @click="delTagBtnEvt"
                   icon="el-icon-remove"
                   size="mini"
                   :disabled="!curTag">删 除</el-button>
      </el-button-group>
      <el-table :data="tags"
                border
                editable
                highlight-current-row
                style="width: 100%;"
                @current-change="tagTableSelectEvnt">
        <el-table-column prop="name"
                         label="标签名称"></el-table-column>
        <el-table-column prop="color"
                         label="标签颜色"></el-table-column>
      </el-table>
      <el-dialog width="25%"
                 title="新增"
                 :visible.sync="innerVisible"
                 append-to-body>
        <el-form :model="newTag"
                 label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="newTag.name"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="颜色">
            <el-input v-model="newTag.color"
                      clearable>
              <el-color-picker slot="append"
                               size="mini"
                               v-model="newTag.color"
                               :predefine="['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585',]">
              </el-color-picker>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="innerVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="innerVisible = false;saveTagBtnEvt();">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
// import _ from "lodash";
import Vue from "vue";
import mavonEditor from "mavon-editor";
import TreePanel from "@/components/panel/TreePanel";
import Tag from "@/components/blog/Tag";
import "mavon-editor/dist/css/index.css";

Vue.use(mavonEditor);

export default {
  data () {
    return {
      wwidth: window.innerWidth,
      wheight: window.innerHeight,
      dialogVisible: false,
      dialogVisibleBlog: false,
      dialogVisibleTag: false,
      innerVisible: false,
      curCalalog: null,
      curBlog: null,
      isModify: false,
      isModifyBlog: false,
      isModifyTag: false,
      calalogs: [],
      blogs: [],
      tags: [],
      curTag: null,
      newTag: {
        name: "",
        color: ""
      },
      calalogList: [],
      blogList: [],
      calalog: {
        pcode: "",
        code: "",
        name: ""
      },
      blog: {
        calalog: "",
        title: "",
        desc: "",
        cover: "",
        author: "自命不凡的赌徒",
        createTime: "",
        lastUpdateTime: "",
        publish: false,
        tags: []
      },
      essay: {
        blog: "",
        content: "",
        html: ""
      }
    }
  },
  components: {
    TreePanel,
    Tag
  },
  created: function () {
    window.onresize = () => {
      this.wwidth = window.innerWidth;
      this.wheight = window.innerHeight;
    }
    this.axios.get("/catalog").then(res => {
      [].push.apply(this.calalogs, res.data);
      this.calalogList = res.data;
      this.formatCalalogs();
    });
  },
  mounted: function () {
    $ ? $("#tag-footer").removeAttr("style") : document.querySelector("#tag-footer").removeAttribute("style");
  },
  methods: {
    addCalalogBtnEvt: function () {
      this.dialogVisible = true;
      this.calalog = {
        pcode: "",
        code: "",
        name: ""
      };
    },
    addBlogBtnEvt: function () {
      this.dialogVisibleBlog = true;
      this.blog = {
        calalog: "",
        title: "",
        desc: "",
        author: "自命不凡的赌徒",
        cover: "",
        createTime: "",
        lastUpdateTime: "",
        publish: false,
        tags: []
      };
    },
    modCalalogBtnEvt: function () {
      this.dialogVisible = true;
      this.isModify = true;
      this.calalog = this.curCalalog;
    },
    modBlogBtnEvt: function () {
      this.dialogVisibleBlog = true;
      this.isModifyBlog = true;
      this.blog = this.curBlog;
    },
    submitCalalog: function () {
      let that = this;
      if (!that.isModify) {
        if (!this.calalog.code) {
          const maxCalalog = this.calalogList.filter(it => { return it.code.length == 3 }).reduce((pre, cur) => {
            return +pre.code > +cur.code ? pre : cur
          });
          const maxCode = (maxCalalog && maxCalalog.code) || 0
          this.calalog.code = (+maxCode + 1 + "").padStart(3, 0);
        } else {
          let num = this.calalog.code.length + 3;
          let pcode = this.calalog.code;
          let exp = new RegExp(`^${this.calalog.code}`);
          this.calalog.code = this.calalogList.filter(it => { return it.code.length == num && exp.test(it.code) }).length + 1;
          this.calalog.code = pcode + (this.calalog.code + "").padStart(3, 0);
        }
        this.calalogList.push(this.calalog);
      }
      that.saveBtnEvt(res => {
        if (res == 200) {
          this.$message({ type: "success", message: "操作成功!" });
          this.formatCalalogs();
        } else {
          this.$message.error("操作失败!");
        }
      });
      this.dialogVisible = false;
    },
    submitBlog: function () {
      let that = this;
      this.blog.calalog = this.curCalalog.code;
      if (!that.isModifyBlog) {
        this.blogList.push(this.blog);
      }
      that.saveBlogBtnEvt(success => {
        if (success) {
          this.$message({ type: "success", message: "操作成功!" });
          this.formatCalalogs();
        } else {
          this.$message.error("操作失败!");
        }
      });
      this.dialogVisibleBlog = false;
    },
    selectCalalog: function (calalog, node) {
      let curCalalog = this.calalogList.filter((item) => { return item.code == calalog.code })[0];
      if (this.curCalalog == curCalalog) return;
      this.curCalalog = curCalalog;
      this.curBlog = null;
      this.essay = this.getEmptyEssay();
      this.axios({
        url: "/blog",
        type: 'get',
        params: { calalog: this.curCalalog.code }
      }).then(res => {
        this.blogList = res.data;
        this.formatBlogs();
      });
    },
    selectBlog: function (blog, node) {
      let curBlog = this.blogList.filter((item) => { return item._id == blog.code })[0];
      if (this.curBlog == curBlog) return;
      this.blog = this.curBlog = curBlog;
      this.essay = this.getEmptyEssay();
      this.axios({
        url: "/essay",
        type: 'get',
        params: { blog: this.curBlog._id }
      }).then(res => {
        if (res.data[0]) this.essay = res.data[0];
      });
    },
    saveBtnEvt: function (callback = function () { }) {
      this.axios.put("/catalog/" + this.calalog._id, this.calalog).then(res => {
        callback(res.success);
        this.$message({ message: "保存成功", type: "success" });
      }).catch(callback);
    },
    saveBlogBtnEvt: function (callback = function () { }) {
      this.axios.put("/blog/" + this.blog._id, this.blog).then(res => {
        callback(res.success);
        if (res.success) {
          this.$message({ message: "保存成功", type: "success" });
        }
      }).catch(err => {
        callback();
      });
    },
    delCalalogBtnEvt: function () {
      let that = this;
      if (this.blogList.length) {
        return this.$message.error("该目录下存在博文，不允许删除");
      }
      this.$confirm("此操作将永久删除该目录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let calalog = that.recurr(
          that.calalogList,
          "children",
          (item, i, source) => {
            (item.code == that.curCalalog.code) && source.splice(i, 1);
            return item.code == that.curCalalog.code;
          }
        )[0];
        if (!calalog) return;
        that.formatCalalogs();
        this.axios.delete("/catalog/" + calalog._id).then(res => {
          if (res.success) {
            this.$message({ message: "删除成功!", type: "success" });
          } else {
            this.$message.error("删除失败!");
          }
        });
      }).catch(() => {
        that.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },
    delBlogBtnEvt: function () {
      let that = this;
      if (!this.curBlog) return;
      this.$confirm("此操作将永久删除该博文, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.axios.delete("/blog/" + this.curBlog._id).then(res => {
          if (res.success) {
            let index = this.blogList.findIndex(it => { return it == this.curBlog });
            this.blogList.splice(index, 1);
            this.blogs.splice(index, 1);
            this.$message({ message: "删除成功!", type: "success" });
          } else {
            this.$message.error("删除失败!");
          }
        });
      }).catch(() => {
        that.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },
    tagToggleEvnt: function (tag) {
      this.blog.tags = this.blog.tags || [];
      let index = this.blog.tags.findIndex((it) => { return it == tag; });
      index == -1 && this.blog.tags.push(tag);
      index > -1 && this.blog.tags.splice(index, 1);
    },
    tagTableSelectEvnt: function (currentRow, oldCurrentRow) {
      this.newTag = this.curTag = currentRow;
    },
    delTagBtnEvt: function () {
      let that = this;
      if (!this.curTag) return;
      this.$confirm("此操作将永久删除该标签, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.axios.delete("/tag/" + this.curTag._id).then(res => {
          if (res.success) {
            let index = this.tags.findIndex(it => { return it.name == this.curTag.name });
            this.tags.splice(index, 1);
            this.$message({ message: "删除成功!", type: "success" });
          } else {
            this.$message.error("删除失败!");
          }
        });
      }).catch(() => {
        that.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },
    saveTagBtnEvt: function () {
      this.axios.post("/tag/addOrUpdate", this.newTag).then(res => {
        this.$message({ message: "保存成功!", type: "success" });
        if (this.isModifyTag) {
          this.isModifyTag = !this.isModifyTag;
        } else {
          this.tags.push(this.newTag);
        }
      });
    },
    recurr: (function () {
      "use strict";
      return function recurr (
        target = [],
        attr = "",
        fn = () => {
          return true;
        },
        res = []
      ) {
        target.forEach((item, i) => {
          fn(item, i, target) && res.push(item);
          item[attr] && recurr(item[attr], attr, fn, res);
        });
        return res;
      };
    })(),
    formatCalalogs: function () {
      let map = {};
      this.calalogList.forEach((calalog) => {
        map[calalog.code] = {
          code: calalog.code,
          label: calalog.name
        };
      });
      for (let code in map) {
        if (code.length > 3) {
          let parentCode = code.slice(0, code.length - 3);
          map[parentCode]["children"] = map[parentCode]["children"] ? map[parentCode]["children"] : [];
          map[parentCode]["children"].push(map[code]);
        }
      }
      this.calalogs.splice(0);
      for (let code in map) {
        if (code.length == 3) {
          this.calalogs.push(map[code]);
        }
      }
    },
    formatBlogs: function () {
      this.blogs.splice(0);
      this.blogList.forEach((blog) => {
        this.blogs.push({
          code: blog._id,
          label: blog.title
        });
      });
    },
    saveEssay: function (value, render) {
      this.essay.blog = this.curBlog._id;
      this.essay.html = render;
      this.blog.lastUpdateTime = this.$moment().format("YYYY-MM-DD HH:mm:ss");
      this.blog.createTime || (this.blog.createTime = this.blog.lastUpdateTime);
      this.saveBlogBtnEvt();
      this.axios.post("/essay/addOrUpdate", this.essay).then(res => {
        this.$message({ message: "保存成功!", type: "success" });
      });
    },
    getEmptyEssay: function () {
      return {
        blog: "",
        content: "",
        html: ""
      };
    },
    uploadCoverEvnt: function (upload) {
      var formdata = new FormData();
      let that = this;
      formdata.append('image', upload.file);
      this.axios({
        url: upload.action,
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((response) => {
        if (response.success && response.data) {
          that.blog.cover = "/file/" + response.data;
        }
      });
    },
    uploadImage: function (pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('image', $file);
      this.axios({
        url: '/image/store',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((response) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
       * $vm 指为mavonEditor实例，可以通过如下两种方式获取
       * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
       * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
       */
        if (response.success && response.data) {
          this.$refs.md.$img2Url(pos, "/file/" + response.data);
        }
      });
    }
  }
};
</script>

<style>
</style>
