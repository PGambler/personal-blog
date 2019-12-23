<template>
  <div>
    <BlogCard
      v-for="(blog, index) in blogs"
      :key="index"
      v-bind:blog="blog"
      v-bind:showBlog="showBlog"
    />
  </div>
</template>

<script>
import BlogCard from "@/components/blog/BlogCard";
export default {
  props: ["showBlog"],
  data() {
    return {
      blogs: [
        {
          name: "教师违规终身禁教",
          author: "富宇",
          body:
            "中新网客户端12月16日电(郎朗冷昊阳) 16日，教育部举办新闻发布会，教师工作司负责人指出，要注重日常管理，将师德师风要求融入教师管理各环节。将师德师风建设工作做在日常、严在日常，在教师的招聘引进、考核评价、日常监督与违规惩处等方面，严格师德师风要求，突出师德师风第一标准。师德考核注重对教师行为的约束和提醒。健全教师入职查询制度和有关违法犯罪人员从教限制制度，对于有严重违规行为的教师，终身禁止从教。"
        },
        {
          name: "格力股权转让获批",
          author: "老喵",
          body:
            "【TechWeb】12月16日消息，珠海格力电器股份有限公司日前对外发布公告称，珠海市人民政府和珠海市国资委已批复同意格力集团与珠海明骏投资合伙企业（有限合伙）协议转让格力电器15%股份的交易事项。"
        }
      ]
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  },
  components: {
    BlogCard
  }
};
</script>

<style>
</style>