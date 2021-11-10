<template>
  <div>
    <el-row class="header">
      <el-col :span="21">
        <el-menu :default-active="$route.name" class="el-menu-demo" mode="horizontal" router >
          <el-menu-item><img src="../assets/logo.png" class="headerLogo" alt="logo"></el-menu-item>
          <el-menu-item index="IndexContent" :route="{path:'/'}" name="indexContent" >主页</el-menu-item>
          <el-menu-item index="About" :route="{path:'/about'}">关于</el-menu-item>
          <el-menu-item index="HandIn" :route="{path:'/handIn'}">交文件</el-menu-item>
          <el-menu-item index="Collect" :route="{path:'/collect'}" v-show="IsLogin">收文件</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="3" class="loginButtonGroup test">
        <div v-show="!IsLogin">
          <el-button round size="mini" @click="drawer = true">登录</el-button>
          <el-button round size="mini">注册</el-button>
        </div>
        <div v-show="IsLogin">
          欢迎！{{UserId}}
        </div>
      </el-col>
    </el-row>
    <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        :with-header="false">
      <span>
        <login-form/>
      </span>
    </el-drawer>
  </div>

</template>

<script>
import LoginForm from "@/components/LoginForm";
export default {
  name: "IndexHeader",
  components:{
    LoginForm
  },
  data() {
    return {
      UserId: "20210007",
      IsLogin: true,
      drawer: false
    };
  },
  methods: {

  }
}
</script>

<style scoped>

  .loginButtonGroup, .headerLogo{
    line-height: 60px;
    text-align: center;
  }
  .headerLogo{
    height: 100%;
  }
  .el-menu-demo{
    height: 40px;
    background-color:rgba(0,0,0,0);

  }
  /* 点击出来的下划线进行隐藏 */
  .el-menu-item.is-active {
    border-bottom: none!important;
    color: rgba(0,0,0,0);
  }
  /* 点击出来的下划线动效残留进行隐藏 */
  .el-menu--horizontal>.el-menu-item{
    border-bottom: none;
  }
  /* 整体的下划线进行隐藏 */
  .el-menu.el-menu--horizontal{
    border-bottom: none;
  }
</style>