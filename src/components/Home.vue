<template>
  <div>
    <el-container>
      <el-header>
        <el-row type="flex"
                justify="space-between">
          <el-col :span="1"
                  style="padding: 9px 0px;">
            <Avatar />
          </el-col>
          <el-col :span="3">
            <h3>自命不凡的赌徒</h3>
          </el-col>
          <el-col :span="14" />
          <el-col :span="6"
                  style="padding: 9px 0px;">
            <el-input placeholder="搜索文章"
                      class="input-with-select"
                      clearable
                      v-model="searchWord">
              <el-button slot="append"
                         icon="el-icon-search"
                         :loading="searching"
                         @click="search"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
    <el-container>
      <el-aside :style="{width: '300px', height: wheight - 100 + 'px'}">
        <el-container style="border: 1px solid #eee">
          <el-main>
            <SrollWall v-bind:catalog="'homePageSrollWall'" />
          </el-main>
          <el-main>
            <el-card class="box-card">
              <div slot="header"
                   class="clearfix">
                <span>标签</span>
              </div>
              <Tag width="100%"
                   :dbData="true" />
            </el-card>
          </el-main>
          <el-footer></el-footer>
        </el-container>
      </el-aside>
      <el-container>
        <el-main :style="{width: wwidth - 600 + 'px', height: wheight - 100 + 'px', 'min-width': '500px'}">
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-main :style="{width: '300px', height: wheight - 100 + 'px'}">
        <!-- <HotPanel /> -->
        <ToolPanel />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import SrollWall from "@/components/SrollWall";
import TreePanel from "@/components/TreePanel";
import HotPanel from "@/components/HotPanel";
import ToolPanel from "@/components/ToolPanel";
import Tag from "@/components/blog/Tag";
export default {
  name: "Home",
  title: "首页",
  data () {
    return {
      wwidth: window.innerWidth,
      wheight: window.innerHeight,
      catalog: "homePageSrollWall",
      searchWord: "",
      searching: false
    };
  },
  created: function () {
    window.onresize = () => {
      this.wwidth = window.innerWidth;
      this.wheight = window.innerHeight;
    };
  },
  methods: {
    search: function () {
      this.searching = true;
      window.setTimeout(() => {
        this.searching = false;
      }, 1000);
    }
  },
  components: {
    Avatar,
    SrollWall,
    TreePanel,
    HotPanel,
    ToolPanel,
    Tag
  }
};
</script>

<style>
</style>
