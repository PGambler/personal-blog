<template>
  <el-popover placement="bottom"
              width="200"
              trigger="click">
    <el-avatar slot="reference"
               src="/static/image/head.png"></el-avatar>
    <el-row>
      <h3>{{user.name}}</h3>
    </el-row>
    <el-row>
      <el-col :span="8"
              style="text-align: right;">Q&nbsp;&nbsp;Q：</el-col>
      <el-col :span="16">
        <h5 style="display: inline;">{{user.qq}}</h5>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8"
              style="text-align: right;">EMAIL：</el-col>
      <el-col :span="16">
        <h5 style="display: inline;">{{user.email}}</h5>
      </el-col>
    </el-row>
  </el-popover>
</template>

<script>
export default {
  data () {
    return {
      user: {
        name: "自命不凡的赌徒",
        qq: "1013102123",
        email: "xfqing_mid@163.com"
      }
    };
  }
};
</script>

<style>
</style>