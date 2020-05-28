<template>
  <el-card class="box-card">
    <div slot="header"
         class="clearfix">
      <span>{{disTitle}}</span>
    </div>
    <el-tree :data="datas"
             :props="defaultProps"
             @node-click="selected"></el-tree>
  </el-card>
</template>

<script>
export default {
  props: ["data", "selected", "title"],
  data () {
    return {
      datas: [],
      disTitle: "分类目录",
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  created: function () {
    if (this.title) (this.disTitle = this.title);
    if (this.data) return (this.datas = this.data);
  }
};
</script>
