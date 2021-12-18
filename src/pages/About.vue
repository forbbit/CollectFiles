<template>
  <div>
    <div class="t1">
      <h1>网站介绍:</h1>
      <p>本站是一个文件在线交收网站，能对文件进行统一命名及整理，方便收方的统计及整理，欢迎使用!</p>
    </div>
    <div class="t2">
      <h1>使用指南:</h1>
      <p>如果您是收方，请首先生成你的文件接收码，然后填写您所收取文件的命名规则即可；<br/>
      如果您是交方，请首先填写您获得的文件接收码进入提交页面，然后填写您的相关信息即可。</p>
    </div>
    <div class="t3">
      <h1>开发人员:</h1>
      <p>范润哲、雷佳聪、熊豫桂、万星石、陈霄鹤</p><br/>
      <p>如有疑问，请联系我们:forbbit@outlook.com</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "About"
}
</script>

<style scoped>
.t1{
  margin-top: 5%;
}
.t1,.t2,.t3{
  text-align: center;
}
</style>