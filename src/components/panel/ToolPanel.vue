<template>
  <el-tabs type="border-card"
           v-model="activeName"
           @tab-click="handleClick">
    <el-tab-pane label="名称转换"
                 name="first">
      <HumpLineTransfer />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import HumpLineTransfer from "@/components/tools/HumpLineTransfer";
export default {
  data () {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    }
  },
  components: {
    HumpLineTransfer
  }
};
</script>