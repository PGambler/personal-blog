<template>
  <el-row>
    <el-col>
      <el-switch
        style="display: block"
        v-model="transWay"
        @change="transfer"
        active-color="#409eff"
        inactive-color="#409eff"
        active-text="下划线转驼峰"
        inactive-text="驼峰转下划线"
      ></el-switch>
    </el-col>
    <el-col>
      <el-input type="textarea" v-model="input" @change="transfer" @keyup.native="transfer"></el-input>
    </el-col>
    <el-col>
      <el-input type="textarea" v-model="output" readonly="readonly"></el-input>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      output: "",
      transWay: false
    };
  },
  methods: {
    hump2Line: function(str) {
      str = str || "";
      return str.replace(/([A-Z])/g, "_$1").toLowerCase();
    },
    line2Hump: function(str) {
      str = str || "";
      return str.replace(/_\w/g, (mac, i) => {
        return mac.slice(1).toUpperCase();
      });
    },
    transfer: function(str) {
      this.output = this.transWay
        ? this.line2Hump(this.input)
        : this.hump2Line(this.input);
    }
  }
};
</script>

<style>
</style>