<template>
  <el-container>
    <el-aside style="width: 200px;">
      <el-button-group>
        <el-button type="primary" @click="addBtnEvt" icon="el-icon-circle-plus" size="mini">添加</el-button>
        <el-button type="primary" @click="saveBtnEvt" icon="el-icon-success" size="mini">保存</el-button>
        <el-button type="primary" @click="modBtnEvt" icon="el-icon-remove" size="mini">修改</el-button>
        <el-button type="primary" @click="delBtnEvt" icon="el-icon-remove" size="mini">删除</el-button>
        <!-- <el-button type="primary" @click="sortBtnEvt" icon="el-icon-sort" size="mini">排序规则</el-button> -->
      </el-button-group>
      <el-menu v-for="(menu, index) in menuList" :key="index" @select="selected">
        <el-menu-item v-if="!menu.submenu" :index="index+''">
          <span>{{menu.name}}</span>
        </el-menu-item>
        <el-submenu v-else-if="menu.submenu" :index="index+''">
          <template slot="title">{{menu.name}}</template>
          <el-menu-item-group v-for="(submenu, index1) in menu.submenu" :key="index1">
            <el-menu-item :index="index + '-' + index1">
              <span>{{submenu.name}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <el-dialog title="新增/修改" :visible.sync="dialogVisible" width="30%">
        上级目录：
        <el-input placeholder="上级目录" v-model="menu.pnm" clearable></el-input>类型：
        <el-input placeholder="dir | menu" v-model="menu.type" clearable></el-input>名称：
        <el-input placeholder="目录或菜单名" v-model="menu.name" clearable></el-input>文件名称：
        <el-input placeholder="保存文件的名称" v-model="menu.fileName" clearable></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="closeDialog">确 定</el-button>
        </span>
      </el-dialog>
    </el-aside>
    <el-main>
      <mavon-editor v-model="value" :placeholder="'.....'" @save="save" />
    </el-main>
  </el-container>
</template>

<script>
// import _ from "lodash";
import Vue from "vue";
import setting from "../configure/setting";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

Vue.use(mavonEditor);

export default {
  data() {
    return {
      value: "hello world",
      dialogVisible: false,
      curIndex: "",
      curMenu: null,
      isModify: false,
      menu: {
        pnm: "根目录",
        path: "",
        type: "",
        name: "",
        fileName: ""
      },
      menuList: setting.menuList
    };
  },
  methods: {
    save: function(value, render) {
      let curMenu = this.curMenu || {};
      if (!curMenu.fileName) return;
      render = `<template>
  <div v-highlight>
    ${render}
  </div>
</template>
<script>
export default { name: "${curMenu.fileName}", title: "${curMenu.name}" };
<\/script>`;
      let param = {
        path: curMenu.path,
        template: render
      };
      fetch("http://localhost:7788/savePage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(param)
      }).then(
        response => {
          if (response.ok) {
            response.text().then(data => {
              console.log(data);
            });
          } else {
            console.log(response.status);
          }
        },
        err => {
          console.log(err);
        }
      );
      let param0 = {
        path: curMenu.path.replace(/\.vue/, ".md"),
        template: value
      };
      fetch("http://localhost:7788/savePageTemp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(param0)
      }).then(
        response => {
          if (response.ok) {
            response.text().then(data => {
              console.log(data);
            });
          } else {
            console.log(response.status);
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    addBtnEvt: function() {
      this.dialogVisible = true;
      this.menu = {
        pnm: "根目录",
        path: "",
        type: "",
        name: "",
        fileName: ""
      };
    },
    modBtnEvt: function() {
      this.dialogVisible = true;
      this.isModify = true;
      this.menu = this.curMenu;
    },
    closeDialog: function() {
      let that = this;
      if (that.isModify) {
        that.saveBtnEvt(res => {
          if (res == 200) {
            this.$message({ type: "success", message: "修改成功!" });
          } else {
            this.$message.error("修改失败!");
          }
        });
        return;
      }
      this.menu.type == "dir" && (this.menu.submenu = []);
      this.menu.path =
        this.menu.fileName + (this.menu.type == "dir" ? "" : ".vue");
      if (this.menu.pnm) {
        let pobj = that.recurr(that.menuList, "submenu", item => {
          return item.name == that.menu.pnm;
        })[0];
        if (pobj) {
          pobj.path && (this.menu.path = pobj.path + "/" + this.menu.path);
          pobj.submenu.push(this.menu);
        } else {
          return alert("没有这个目录");
        }
      } else {
        this.menuList.push(this.menu);
      }
      this.dialogVisible = false;
    },
    selected: function(index, indexPath) {
      if (this.curIndex == index) return;
      let indexs = index.split("-");
      let curMenu = this.menuList[indexs[0]];
      for (let i = 1, j = indexs.length; i < j; i++) {
        curMenu = curMenu.submenu[indexs[i]];
      }
      this.curMenu = curMenu;
      let path = curMenu.path;
      path = path
        .replace(/(\.vue)/g, ".md")
        .replace(/(\/)/g, "233")
        .replace(/(\.)/g, "322");
      fetch("http://localhost:7788/getPageTemp/" + path, {
        headers: {
          "Content-Type": "text/html;charset=UTF-8"
        }
      })
        .then(response => {
          if (response.ok) {
            response.text().then(data => {
              this.value = data;
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveBtnEvt: function(callback = function() {}) {
      let param = {
        config: setting
      };
      fetch("http://localhost:7788/setSettingConfig", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(param)
      }).then(
        response => {
          callback(response.status);
          if (response.ok) {
            response.text().then(data => {
              this.save();
            });
          } else {
            console.log(response.status);
          }
        },
        err => {
          callback(err);
          console.log(err);
        }
      );
    },
    delBtnEvt: function() {
      let that = this;
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let menu = that.recurr(
            that.menuList,
            "submenu",
            (item, i, source) => {
              item.name == that.curMenu.name && source.splice(i, 1);
              return item.name == that.curMenu.name;
            }
          )[0];
          if (menu) return;
          that.saveBtnEvt(res => {
            if (res == 200) {
              this.$message({ type: "success", message: "删除成功!" });
            } else {
              this.$message.error("删除失败!");
            }
          });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    sortBtnEvt: function() {},
    recurr: (function() {
      "use strict";
      return function recurr(
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
    })()
  }
};
</script>

<style>
</style>