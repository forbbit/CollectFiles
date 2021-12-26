<template>
  <div class="indexContent">
    <div class="buttonGroup">
      <el-button
        type="primary"
        class="loginButton"
        @click="handleMyButtonClick($event, 'handin')"
        >交文件</el-button
      >
      <el-button
        type="success"
        class="registerButton"
        @click="handleMyButtonClick($event, 'collect/collectlist')"
        >收文件</el-button
      >
    </div>
  </div>
</template>


<script>
export default {
  name: "IndexContent",
  methods: {
    handleMyButtonClick(e, which) {
      let target = e.target;
      if (target.nodeName === "SPAN") target = e.target.parentNode;
      target.blur();
      if (
        which === "collect/collectlist" &&
        sessionStorage.getItem('UserId') === null
      ) {
        this.$message.error("请先登录");
      } else {
        this.$router.push("/" + which);
      }
    },
  },
};
</script>

<style scoped>
.indexContent {
  height: 500px;
  width: 100%;
}
.buttonGroup {
  text-align: center;
  width: 100%;
  margin: 0 auto;
}
.loginButton,
.registerButton {
  width: 175px;
}
.registerButton {
  margin-left: 50px;
}
.contentText {
  margin-top: 0;
  text-align: center;
}
</style>