<template>
  <div style="margin:20px">
    <!-- 方案一 -->
    <!-- <div v-if="trueshow">
      <el-result
        icon="success"
        title="注册成功！"
        subTitle="请根据提示进行操作"
      >
        <template slot="extra">
          <el-button type="primary" size="medium" @click="trueclose"
            >返回首页</el-button
          >
        </template>
      </el-result>
    </div>
    <div v-if="falseshow">
      <el-result icon="error" title="注册失败！" :subTitle="errtitle">
        <template slot="extra">
          <el-button type="primary" size="medium" @click="falseclose"
            >重新注册</el-button
          >
        </template>
      </el-result>
    </div> -->
    <el-form
      label-position="left"
      label-width="80px"
      ref="form"
      :model="form"
      :rules="rules"
      v-loading="loading"
      v-show="formshow"
    >
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pas">
        <el-input type="password" v-model="form.pas"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="pas2">
        <el-input type="password" v-model="form.pas2"></el-input>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button type="primary" @click="reg">注册</el-button>
        <el-button type="info" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "RegisTer",
  props: ["drawer2"],
  data() {
    //昵称、用户名验证
    var usecheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("名称不能为空"));
      }
      callback();
    };
    //密码数据验证
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        if (this.form.pas2 !== "") {
          this.$refs.form.validateField("pas2");
        }
        callback();
      }
    };
    //再次输入密码数据验证
    var checkpas = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pas) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      trueshow: false,
      falseshow: false,
      formshow: true,
      errtitle: "",
      form: {
        nickname: "",
        name: "",
        pas: "",
        pas2: "",
      },
      rules: {
        //输入数据验证
        nickname: [{ validator: usecheck, trigger: "blur" }],
        name: [{ validator: usecheck, trigger: "blur" }],
        pas: [{ validator: validatePass, trigger: "blur" }],
        pas2: [{ validator: checkpas, trigger: "change" }],
      },
    };
  },
  methods: {
    //点击重置
    reset() {
      this.$refs.form.resetFields();
    },

    //方案一按钮点击事件
    trueclose() {
      //成功返回操作
      //关闭提示
      this.trueshow = !this.trueshow;
      this.formshow = !this.formshow;
      //重置注册数据
      this.$refs.form.resetFields();
      //this.form.nickname = "";
      //this.form.name = "";
      //this.form.pas = "";
      //this.form.pas2 = "";
      //关闭注册页
      this.$emit("changed", false);
    },
    falseclose() {
      //失败返回操作
      //关闭提示，重新加载表单
      this.falseshow = !this.falseshow;
      this.formshow = !this.formshow;
      //重置注册数据
      this.$refs.form.resetFields();
      //this.form.nickname = "";
      //this.form.name = "";
      //this.form.pas = "";
      //this.form.pas2 = "";
    },

    //注册事件
    reg() {
      //开始加载
      this.loading = !this.loading;
      //开始预验证
      this.$refs.form.validate(async (vaild) => {
        if (vaild) {
          //验证通过，开始传数据
          this.$axios
            .post("/user/register", {
              nickname: this.form.nickname,
              password: this.form.pas,
              username: this.form.name,
            })
            .then((res) => {
              //请求成功
              console.log(res);
              //注册成功
              if (res.data.message === "success") {
                //停止加载
                this.loading = !this.loading;

                //方案一：成功需点击后返回
                //成功提示，隐藏表单
                //this.trueshow = !this.trueshow;
                //this.formshow = !this.formshow;

                //方案二：成功提示后直接返回
                //关闭注册界面
                this.$emit("changed", false);
                //重置注册表单
                this.$refs.form.resetFields();
                //成功提示信息，1000ms自动关闭
                this.$notify({
                  title: "注册成功",
                  message: "您的账号已成功注册!",
                  type: "success",
                  duration: 1000,
                });
              }
              // else {
              //   //停止加载
              //   this.loading = !this.loading;
              //   //失败提示，并隐藏表单
              //   this.falseshow = !this.falseshow;
              //   this.formshow = !this.formshow;}
            })
            .catch((err) => {
              //请求失败
              console.log(err.response);
              this.errtitle = err.response.data.message;
              //停止加载
              this.loading = !this.loading;

              //方案一失败后点击返回
              //失败提示，并隐藏表单
              // this.falseshow = !this.falseshow;
              // this.formshow = !this.formshow;

              //方案二失败提示后直接返回
              //关闭注册界面
              this.$emit("changed", false);
              //重置注册表单
              this.$refs.form.resetFields();
              //失败提示信息，1500ms自动关闭
              this.$notify({
                title: "注册失败",
                message: this.errtitle,
                type: "error",
                duration: 1500,
              });
            });
        } else {
          //验证未通过
          //停止加载
          this.loading = !this.loading;

          //方案一失败后点击返回
          //失败提示，并隐藏表单
          // this.falseshow = !this.falseshow;
          // this.formshow = !this.formshow;

          //方案二失败提示后直接返回
          //关闭注册界面
          this.$emit("changed", false);
          //重置注册表单
          this.$refs.form.resetFields();
          //失败提示信息，1500ms自动关闭
          this.$notify({
            title: "注册失败",
            message: "预验证失败，请检查注册信息",
            type: "error",
            duration: 1500,
          });
        }
      });
    },
  },
};
</script>
<style scoped>
</style>