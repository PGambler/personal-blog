<template>
  <el-menu
    class="el-menu"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <span v-for="(menu, index) in routerList" :key="index">
      <el-menu-item v-if="!menu.submenu" :index="menu.path">
        <span>{{menu.title}}</span>
      </el-menu-item>
      <el-submenu v-else-if="menu.submenu" :index="menu.path">
        <template slot="title">{{menu.title}}</template>
        <el-menu-item-group v-for="(submenu, index1) in menu.submenu" :key="index1">
          <el-menu-item v-if="!submenu.submenu" :index="submenu.path">
            <span>{{submenu.title}}</span>
          </el-menu-item>
          <el-submenu v-else-if="submenu.submenu" :index="submenu.path">
            <template slot="title">{{submenu.title}}</template>
            <el-menu-item-group v-for="(submenu1, index2) in submenu.submenu" :key="index2">
              <el-menu-item v-if="!submenu1.submenu" :index="submenu1.path">
                <span>{{submenu1.title}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu-item-group>
      </el-submenu>
    </span>
  </el-menu>
</template>

<script>
export default {
  name: "Menu",
  props: ["routerList"],
  data() {
    return {};
  }
};
</script>

<style>
</style>