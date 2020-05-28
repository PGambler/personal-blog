<template>
  <div>
    <div class="block"
         style="background-color: #ccc;">
      <el-carousel v-bind:height="wallHeight">
        <el-carousel-item v-for="item in imgs"
                          :key="item">
          <img :src="item"
               v-bind:style="{width: wallWidth}" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
const images = require
  .context("../../static/", true, /\.(png|jpg)$/)
  .keys()
  .map(item => {
    return item.replace(/\.\//, "../static/");
  });
export default {
  props: ["catalog", "width", "height"],
  data () {
    let catalog = this.catalog || "";
    let exp = new RegExp("/" + catalog + "/");
    return {
      wallWidth: this.width || "100%",
      wallHeight: this.height || "160px",
      imgs: images.filter(path => {
        return exp.test(path);
      })
    };
  },
  name: "SrollWall"
};
</script>

<style>
</style>