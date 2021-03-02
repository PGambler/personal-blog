<template>
  <div class="comment">
    <h3>评论：</h3>
    <el-row v-for="(comm,index) in comms"
            :key="index">
      <el-col :span="24">
        <el-card shadow="hover"
                 class="card">
          <div slot="header"
               class="clearfix">
            <span>{{ comm.author }}</span>
          </div>
          <div>
            <span v-html="comm.content"></span>
            <div class="bottom clearfix">
              <time class="time">{{ $moment(comm.createdAt).format("YYYY-MM-DD HH:mm:ss").toString() }}</time>
              <el-tooltip class="item"
                          effect="dark"
                          content="引用"
                          placement="top-start">
                <el-button icon="el-icon-paperclip"
                           class="button"
                           @click="quoteEvnt(comm)" />
              </el-tooltip>
              <el-tooltip class="item"
                          effect="dark"
                          content="你还是别抽了"
                          placement="top-start">
                <el-button icon="el-icon-no-smoking"
                           class="button" />
              </el-tooltip>
              <el-tooltip class="item"
                          effect="dark"
                          content="给大佬递烟"
                          placement="top-start">
                <el-button icon="el-icon-smoking"
                           class="button" />
              </el-tooltip>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <h3>我要发表看法</h3>
    <el-form ref="commForm"
             :model="newComm"
             label-width="80px">
      <el-form-item label="大名：">
        <el-input v-model="newComm.author"
                  style="width: 50%"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input type="textarea"
                  v-model="newComm.content"
                  :autosize="{ minRows: 3, maxRows: 6}"
                  style="width: 90%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">评论</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    essay: {
      type: String,
      required: true,
      default () {
        return ""
      }
    }
  },
  watch: {
    essay: {
      handler (nv, ov) {
        this.axios({ url: "/comment", params: { essay: nv } }).then(res => {
          this.comms = res.data || []
        });
      },
      immediate: true
    }
  },
  data () {
    return {
      comms: [],
      newComm: {
        author: "",
        content: ""
      }
    }
  },
  methods: {
    quoteEvnt (comm) {
      this.newComm.content = `<blockquote><pre>引用${comm.author}的发言：</pre>${comm.content}</blockquote>` + this.newComm.content
    },
    onSubmit () {
      const comm = { ...this.newComm }
      comm.essay = this.essay
      comm.createdAt = this.$moment().format("YYYY-MM-DD HH:mm:ss").toString()
      this.axios.post("/comment", comm).then(res => {
        this.$message({ message: "保存成功!", type: "success" });
        this.newComm.author = ""
        this.newComm.content = ""
        this.comms.push(comm)
      });
    }
  }
}
</script>
<style scoped lang="less">
.comment {
  background-color: darkseagreen;
  padding: 22px;
  margin: 8px 0;
  border-radius: 8px;
  .el-row {
    margin-bottom: 8px;
    .time {
      font-size: 13px;
      color: #999;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .button {
      padding: 4px;
      margin: 0 4px;
      float: right;
    }

    .image {
      width: 100%;
      display: block;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both;
    }

    .card {
      background-color: aliceblue;
    }
  }
}
</style>
