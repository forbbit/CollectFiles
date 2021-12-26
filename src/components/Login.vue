<template>
  <div style="margin:20px">
    <el-form
      label-position="left"
      label-width="80px"
      ref="form"
      :model="form"
      :rules="rules"
      v-loading="loading"
      v-show="formshow"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="CaptchaCode">
        <div>
          <el-input
            v-model="form.CaptchaCode"
            style="display: inline-block; width: 65%; vertical-align: middle"
          ></el-input>
          <el-image
            style="
              display: inline-block;
              width: 30%;
              height: 40px;
              margin-left: 2.5%;
              margin-right: 2.5%;
              vertical-align: middle;
            "
            :src="url"
            @click="getCode"
          ></el-image>
        </div>
      </el-form-item>

      <el-form-item style="text-align: right">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "LoginIn",
  props: ["drawer"],
  data() {
    return {
      loading: false,
      formshow: true,
      url: "",
      errtitle: "",
      id: "",
      form: {
        CaptchaCode: "",
        username: "",
        password: "",
      },
      rules: {
        //输入数据验证
        CaptchaCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    //点击重置
    reset() {
      this.$refs.form.resetFields();
    },
    getCode() {
      //获取验证码
      this.$axios({
        method: "get",
        url: "/captcha/captchaImage",
        responseType: "blob",
        params: { type: "char" },
      }).then(
        (res) => {
          console.log(res);
          let blob = new Blob([res.data]);
          let src = window.URL.createObjectURL(blob);
          this.url = src;
          console.log(this.url);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    login() {
      //点击登录对表单进行预验证并进行加载
      this.loading = !this.loading;
      this.$refs.form.validate((vaild) => {
        //预验证通过进行数据传送
        if (vaild) {
          //验证通过，开始传数据
          this.$axios({
            method: "post",
            url: "/login",
            data: {
              CaptchaCode: this.form.CaptchaCode,
              username: this.form.username,
              password: this.form.password,
            },
          })
            .then((res) => {
              console.log(res);
              //登录成功
              if (res.data.message === "success") {
                //停止加载
                this.loading = !this.loading;
                //方案二
                //保留用户id
                this.id = res.data.simpleData.principal.id;
                //关闭登录页并传出用户id及用户名
                this.$emit("changed2", false, this.id, this.form.username);
                //重置表单
                this.$refs.form.resetFields();
                //成功提示信息，1000ms自动关闭
                this.$message.success("登录成功")
                this.$router.push({name:"CollectList"})
              } else {
                //方案二
                this.loading = !this.loading;
                //this.$emit("changed2", false);
                //重置登录表单
                //this.$refs.form.resetFields();
                //失败提示信息，1500ms自动关闭
                this.$message.error(res.data.message)
              }
            }).catch((err) => {
              //请求失败
              //console.log(err.response);
              this.errtitle = err.response.data.message;
              //停止加载
              this.loading = !this.loading;
              //方案二
              //this.$emit("changed2", false);
              //重置登录表单
              //this.$refs.form.resetFields();
              //失败提示信息，1500ms自动关闭
              this.$message.error(this.errtitle)

            });
        } else {
          //预验证未通过
          this.loading = !this.loading;
          //重置登录表单
          this.$refs.form.resetFields();
          //失败提示信息，1500ms自动关闭
          this.$message.error("预验证失败，请检查登录信息")
        }
      });
    },
  },
};
</script>
<style scoped>
</style>
