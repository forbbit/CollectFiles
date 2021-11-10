<template>
  <div class="indexContent">
    <hgroup class="contentText">
      <h1>
        灵魂是没有情感的
      </h1>
      <p>一阵阵细微的电流<br/>
        在繁忙的调控中<br/>
      一遍遍循环着绝对的轨迹<br/>
        无法被创造，无法被毁灭</p>
      <p>情感的复杂配不上规则的简单<br/>
      此时与彼时<br/>
      我不希望你只是一串信号分子<br/>
      那一道过后即降解的<br/>
        深深的刻痕</p>
      <p>好像沙滩的纹路被潮水重构<br/>
        仅有七个月的新生</p>
    </hgroup>
    <div class="buttonGroup">
      <el-button type="primary" class="loginButton" @click="handleMyButtonClick($event,'handIn')">交文件</el-button>
      <el-button type="success" class="registerButton" @click="handleMyButtonClick($event,'collect')">收文件</el-button>
    </div>

  </div>

</template>


<script>
export default {
  name: "IndexContent",
  methods:{
    handleMyButtonClick(e,which){
      let target = e.target
      if (target.nodeName === 'SPAN') target = e.target.parentNode
      target.blur()
      this.$router.push('/'+which)
    }
  }
}
</script>

<style scoped>
  .indexContent{
    height: 500px;
    width: 100%;
  }
  .buttonGroup{
    text-align: center;
    width: 100%;
    margin: 0 auto;
  }
  .loginButton, .registerButton{
    width: 175px;
  }
  .registerButton{
    margin-left: 50px;
  }
  .contentText{
    margin-top: 0;
    text-align: center;
  }
</style>