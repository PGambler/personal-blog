<template>
  <el-container>
    <el-main>
      <h1>404 很抱歉，您查看的页面找不到了...</h1>
      <el-button type="primary"
                 size="mini"
                 @click="$router.push({ path: '/'})">返回首页</el-button>
      <el-button type="primary"
                 size="mini"
                 @click="$router.go(-1)">返回上一页</el-button>
    </el-main>
  </el-container>
</template>

<script>
export default {
}
</script>

<style>
</style>