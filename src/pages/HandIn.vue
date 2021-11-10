<template>
  <div class="fileCodeInputerDiv">
    <el-input class="fileCodeInputer" v-model="input" placeholder="请输入文件码" spellcheck="false">
      <el-button slot="append" :disabled="isHasCode">进入提交</el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: "HandIn",
  data() {
    return {
      input: ''
    }
  },
  computed:{
    isHasCode(){
      return this.input.length <= 3;
    }
  },
}
</script>

<style scoped>
  .fileCodeInputerDiv{
    width: 400px;
    margin: 200px auto;
  }
</style>