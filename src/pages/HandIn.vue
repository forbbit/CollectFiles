<template>
  <div class="fileCodeInputerDiv">
    <div v-if="IsShow" style="margin: 200px auto; width: 400px">
      <el-input
        class="fileCodeInputer"
        v-model="input"
        placeholder="请输入文件码"
        spellcheck="false"
      >
        <el-button slot="append" :disabled="isHasCode" @click="Summitfilecode"
          >进入提交</el-button
        >
      </el-input>
    </div>
    <div v-if="!IsShow" style="width: 100%; height: 100%">
      <el-page-header
        @back="goBack"
        :content="Txt"
        style="margin: 20px 0 0 10px; width: 100%"
      ></el-page-header>
      <div
        style="
          width: 400px;
          height: 100%;
          text-align: center;
          margin: 100px auto;
        "
      >
        <el-form
          label-position="left"
          label-width="80px"
          :model="ruleform"
          ref="ruleform"
        >
          <el-form-item
            v-for="(i, index) in ruleform.Rule"
            :key="index"
            :prop="`Rule.${index}.forms`"
            :rules="{ required: true, message: '不能为空', trigger: 'blur' }"
            :label="i.value"
          >
            <el-input v-model="i.forms"></el-input>
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item ref="upload_attach_item" size="small">
            <el-upload
              class="upload-demo"
              action
              :limit="1"
              :on-change="handleChange"
              :on-exceed="handleExceed"
              :file-list="fileList"
              :auto-upload="false"
            >
              <div style="width:100%">
                <el-button size="small" style="width:100%"
                  >点击上传文件,不超过50MB</el-button
                >
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="primary" @click="Summitfile">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HandIn",
  data() {
    return {
      input: "",
      IsShow: true,
      form: {
        fid: "",
        filename: "",
        files: null,
      },
      flaserule: "",
      fileList: [],
      //行头数据
      Txt: "",
      //新规则数组
      ruleform: {
        Rule: "",
      },
    };
  },
  mounted() {
    //在vue加载完成后设置绑定forms
    this.setforms();
  },
  computed: {
    isHasCode() {
      return this.input.length <= 3;
    },
  },
  methods: {
    goBack() {
      this.IsShow = !this.IsShow;
      //清空输入
      this.Txt = "";
      this.ruleform.Rule = "";
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
      console.log(file);
    },
    handleExceed() {
      this.$message.warning("当前限制最多选择 1 个文件");
    },
    setforms() {
      for (var i = 0; i < this.ruleform.Rule.length; i++) {
        // 添加forms属性并设置为""
        this.$set(this.ruleform.Rule[i], "forms", "");
      }
    },
    //输入文件码
    Summitfilecode() {
      this.$axios({
        method: "post",
        url: "/file-store/checkout",
        params: { filecode: this.input },
      })
        .then((res) => {
          console.log(res);
          if (res.data.message === "success") {
            this.IsShow = !this.IsShow;
            this.form.fid = res.data.simpleData.id;
            //console.log(this.fid);
            let rule = res.data.simpleData.jsonNameRules.rule;
            //行头显示规则
            // for (var j = 0; j < rule.length; j++) {
            //   this.Txt = this.Txt + rule[j].value;
            // }
            this.Txt = res.data.simpleData.zipName;
            // console.log(this.Txt)
            //构建changeAble为false数组
            this.flaserule = rule.filter((item) => {
              return item.changeAble === false;
            });
            //构造新数组Rule完成表单动态创建及动态绑定
            this.ruleform.Rule = rule.filter((item) => {
              return item.changeAble === true;
            });
            //console.log(this.Rule);
          } else {
            console.log(res);
            this.$message.error("输入错误!");
          }
        })
        .catch((err) => {
          console.log(err.response);
          this.$message.error(err.response.data.message);
        });
    },
    //提交文件
    Summitfile() {
      this.form.filename = "";
      //文件名整理
      for (var k = 0; k < this.ruleform.Rule.length; k++) {
        this.form.filename =
          this.form.filename +
          this.ruleform.Rule[k].forms +
          this.flaserule[0].value;
      }
      this.form.filename =
        this.form.filename + this.flaserule[this.flaserule.length - 1].value;
      console.log(this.form.filename);
      //开始上传
      this.uploadSectionFile();
    },
    //更改的上传项
    uploadSectionFile() {
      let data = new FormData();
      data.append("file", this.fileList[0].raw);
      this.$axios({
        method: "post",
        url: "/file-store/upload",
        headers: { "Content-Type": "multipart/form-data" },
        params: {
          fid: this.form.fid,
          filename: this.form.filename,
        },
        data: data,
      })
        .then((res) => {
          console.log(res);
          this.$message.success("提交成功!");
          //提交完成清空文件列表
          this.fileList = [];
        })
        .catch((err) => {
          console.log(err.response);
          this.$message.error(err.response.data.message);
        });
    },
  },
};
</script>

<style scoped>
.fileCodeInputerDiv {
  width: 100%;
}
.el-upload{
  width:100%;
}
</style>