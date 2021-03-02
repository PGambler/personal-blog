<template>
  <div id="mainDiv">
    <el-container>
      <el-header>
        <el-row type="flex"
                justify="space-between">
          <el-col :span="1"
                  style="padding: 9px 0px;">
            <Avatar />
          </el-col>
          <el-col :span="3"
                  :style="{'min-width': '135px'}">
            <h3>自命不凡的赌徒</h3>
          </el-col>
          <el-col :span="6">
            <p>
              <el-button size="mini"
                         circle>
                <el-link :underline="false"
                         href="https://github.com/PGambler"
                         target="_blank">github</el-link>
              </el-button>
              <el-button size="mini"
                         circle>
                <el-link :underline="false"
                         href="https://www.npmjs.com/~pretentious-gambler"
                         target="_blank">npm</el-link>
              </el-button>
              <el-button size="mini"
                         circle>
                <el-link :underline="false"
                         href="https://github.com/PGambler/personal-blog"
                         target="_blank">fork</el-link>
              </el-button>
            </p>
          </el-col>
          <el-col :span="8" />
          <el-col :span="6"
                  style="padding: 9px 0px;">
            <el-input placeholder="搜索文章"
                      class="input-with-select"
                      clearable
                      v-model="searchWord">
              <el-button slot="append"
                         icon="el-icon-search"
                         :loading="searching"
                         @click="searchBlogList"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
    <el-container>
      <el-aside :style="{width: '50vh'}">
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
                   :click="searchBlogListByTag"
                   :dbData="true" />
            </el-card>
          </el-main>
          <!-- <el-main>
            <ToolPanel />
          </el-main> -->
          <el-footer></el-footer>
        </el-container>
      </el-aside>
      <el-container>
        <el-main class="el-scrollbar__wrap"
                 :style="{ height: wheight - 62 + 'px', overflow: 'auto'}">
          <router-view></router-view>
        </el-main>
      </el-container>
      <!-- <el-main :style="{ height: wheight - 62 + 'px', overflow: 'auto'}">
        <HotPanel />
      <ToolPanel />
      </el-main> -->
    </el-container>
    <el-backtop target=".el-scrollbar__wrap" />
  </div>
</template>

<script>
import Avatar from "@/components/tools/Avatar";
import SrollWall from "@/components/tools/SrollWall";
import TreePanel from "@/components/panel/TreePanel";
import HotPanel from "@/components/panel/HotPanel";
import ToolPanel from "@/components/panel/ToolPanel";
import Tag from "@/components/blog/Tag";
export default {
  name: "Home",
  title: "首页",
  components: {
    Avatar,
    SrollWall,
    TreePanel,
    HotPanel,
    ToolPanel,
    Tag
  },
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
    this.$store.dispatch('update_blogList')
  },
  methods: {
    searchBlogList () {
      this.searching = true;
      const param = this.searchWord ? {
        $or: [
          { 'title': this.searchWord },
          { 'desc': this.searchWord },
          { 'tags.name': this.searchWord }
        ]
      } : {};
      this.$store.dispatch('update_blogList', param).then(() => {
        this.searching = false
      })
    },
    searchBlogListByTag (tag) {
      this.$store.dispatch('update_blogList', { 'tags.name': tag.name })
    }
  }
}
</script>
<style scoped lang="less">
.el-scrollbar__wrap {
  padding: 20px 50px;
}
</style>
