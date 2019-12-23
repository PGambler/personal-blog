<template>
  <div>
    <el-container>
      <el-header>
        <el-row type="flex" justify="space-between">
          <el-col :span="6">
            <el-link type="primary">
              <h3>首页</h3>
            </el-link>
          </el-col>
          <el-col :span="6" style="padding: 9px 0px;">
            <el-input placeholder="请输入内容" class="input-with-select" clearable v-model="searchWord">
              <el-button slot="append" icon="el-icon-search" :loading="searching" @click="search"></el-button>
            </el-input>
          </el-col>
          <el-col :span="6" style="padding: 9px 0px;">
            <Avatar />
          </el-col>
        </el-row>
      </el-header>
    </el-container>
    <el-container>
      <el-aside>
        <Menu v-bind:routerList="routerList" />
      </el-aside>
      <el-container>
        <el-main>
          <MainPanel />
        </el-main>
      </el-container>
      <el-aside>
        <HotPanel />
        <ToolPanel />
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import router from "@/router";
import Setting from "@/components/Setting";
import SrollWall from "@/components/SrollWall";
import HotPanel from "@/components/HotPanel";
import ToolPanel from "@/components/ToolPanel";
import MainPanel from "@/components/MainPanel";
import Menu from "@/components/Menu";
import Avatar from "@/components/Avatar";

router.addRoutes([
  {
    path: "/Setting",
    name: "Setting",
    component: Setting
  }
]);

export default {
  name: "Home",
  title: "首页",
  data() {
    return {
      catalog: "homePageSrollWall",
      searchWord: "",
      searching: false,
      routerList: router.options.menuList
    };
  },
  methods: {
    search: function() {
      this.searching = true;
      window.setTimeout(() => {
        this.searching = false;
      }, 1000);
    }
  },
  router,
  components: {
    SrollWall,
    Menu,
    HotPanel,
    ToolPanel,
    MainPanel,
    Avatar
  }
};
</script>

<style>
</style>