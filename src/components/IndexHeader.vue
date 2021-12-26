<template>
  <div>
    <el-row class="header">
      <el-col :span="15">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-demo"
          mode="horizontal"
          router
        >
          <el-menu-item
            ><img src="../assets/logo.png" class="headerLogo" alt="logo"
          /></el-menu-item>
          <el-menu-item
            index="/"
            :route="{ path: '/' }"
            name="indexContent"
            >主页</el-menu-item
          >
          <el-menu-item index="/about" :route="{ path: '/about' }"
            >关于</el-menu-item
          >
          <el-menu-item index="/handIn" :route="{ path: '/handin' }"
            >交文件</el-menu-item
          >
          <el-menu-item
            index="/collect"
            :route="{ path: '/collect/collectlist' }"
            v-show="IsLogin"
            >收文件</el-menu-item
          >
        </el-menu>
      </el-col>
      <el-col :span="9" class="loginButtonGroup test">
        <div v-show="!IsLogin" style="float: right">
          <el-button round size="mini" @click="login" type="primary"
            >登录</el-button
          >
          <el-button round size="mini" @click="register" type="primary"
            >注册</el-button
          >
        </div>
        <div v-show="IsLogin" style="float: right">
          {{ UserName }}
          <el-button round size="mini" @click="logout" type="danger" style="margin-left: 20px"
            >登出</el-button
          >
        </div>
      </el-col>
    </el-row>

    <el-drawer title="登陆界面" :visible.sync="drawer" :direction="direction">
      <span>
        <login
          :drawer="drawer"
          @changed2="xchange2"
          ref="login"
        ></login>
      </span>
    </el-drawer>

    <el-drawer title="注册界面" :visible.sync="drawer2" :direction="direction2">
      <span>
        <register
          v-bind:drawer2="drawer2"
          v-on:changed="xchange($event)"
        ></register>
      </span>
    </el-drawer>
  </div>
</template>

<script>
import Login from "./Login.vue";
import Register from "./Register.vue";
export default {
  components: { Login, Register },
  name: "IndexHeader",
  data() {
    return {
      drawer: false,
      drawer2: false,
      direction: "rtl",
      direction2: "rtl",
      UserId: "",
      UserName: "",
      IsLogin: false,
    };
  },
  computed:{
    defaultActive(){
      // console.log(this.$route.path.split('/'))
      return '/' + this.$route.path.split('/')[1];
    }
  },
  methods: {
    login(e) {
      this.buttonClickAutoBur(e)
      this.drawer = true;
      //在表单渲染后获取登录验证码
      this.$nextTick(() => {
        this.$refs.login.getCode();
      });
    },
    register(e) {
      this.buttonClickAutoBur(e)
      this.drawer2 = true;
    },
    logout() {
      this.IsLogin = !this.IsLogin;
      this.$axios({
        method: "post",
        url: "/logout",
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err.response));
    },
    xchange(msg) {
      this.drawer2 = msg;
    },
    xchange2(msg1, msg2, msg3) {
      if (msg2) {
        //成功时需要显示用户id
        this.drawer = msg1;
        this.IsLogin = !this.IsLogin;
        //保留用户id
        this.UserId = msg2;
        // console.log(this.UserId)
        //显示用户名
        this.UserName = msg3;
      } else {
        //失败时直接返回原界面
        this.drawer = msg1;
      }
    },
    buttonClickAutoBur(e){
      let target = e.target
      if (target.nodeName === 'SPAN') target = e.target.parentNode
      target.blur()
    },
  },
  mounted() {
    window.addEventListener( 'beforeunload',this.logout);
  }

};
</script>

<style scoped>
.loginButtonGroup,
.headerLogo {
  line-height: 60px;
  text-align: center;
}
.headerLogo {
  height: 100%;
}
.el-menu-demo {
  height: 40px;
  background-color: rgba(0, 0, 0, 0);
}
/* 点击出来的下划线进行隐藏 */
.el-menu-item.is-active {
  border-bottom: none !important;
  color: rgba(0, 0, 0, 0);
}
/* 点击出来的下划线动效残留进行隐藏 */
.el-menu--horizontal > .el-menu-item {
  border-bottom: none;
}
/* 整体的下划线进行隐藏 */
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
</style>