<template>
  <div>
    <el-tag :key="tag._id"
            v-for="tag in (data || cdata)"
            :closable="cclosable"
            :disable-transitions="false"
            :color="tag.color"
            style="color: #000;cursor: pointer;"
            @click="clickEvnt(tag)"
            @close="handleClose(tag)">{{tag.name}}</el-tag>
  </div>
</template>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

<script>
export default {
  props: ["data", "allowAdd", "click", "closable", "dbData"],
  data () {
    return {
      cdata: [],
      callowAdd: false,
      cclosable: false,
      inputVisible: false,
      clickEvnt: () => { },
      inputValue: ""
    };
  },
  created () {
    if (!this.data) this.$emit("change", []);
    if (this.closable !== undefined) this.cclosable = this.closable;
    if (typeof this.click == "function") this.clickEvnt = this.click;
    if (this.dbData) {
      this.axios.get("/tag").then(res => {
        !res.data && this.$emit("change", []);
        res.data && this.$emit("change", res.data);
        res.data && (this.cdata = res.data);
      });
    }
  },
  methods: {
    handleClose (tag) {
      this.data.splice(this.data.indexOf(tag), 1);
    }
  }
};
</script>
