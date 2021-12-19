<template>
  <div>
    <el-col :span="4">
      <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          router
          text-color="#303133"
          active-text-color="#409EFF"

      >
        <el-menu-item index="/collecting" :route="{path:'collecting'}">
          <i class="el-icon-menu"></i>
          <span slot="title">正在收取</span>
        </el-menu-item>
        <el-menu-item index="/collected" :route="{path:'collected'}">
          <i class="el-icon-menu"></i>
          <span slot="title">收取完成</span>
        </el-menu-item>
        <el-menu-item index="/create" :route="{path:'create'}">
          <i class="el-icon-menu"></i>
          <span slot="title">新建收取</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20">
      <router-view/>
    </el-col>
  </div>
</template>

<script>

  export default {
    name: "Collecting",
    computed:{
      defaultActive(){
        //console.log(this.$route.path.split('/'))
        return '/' + this.$route.path.split('/')[2];
      }
    },
    methods:{
      buttonClickAutoBur(e){
        let target = e.target
        //console.log(e)
        if (target.nodeName === 'SPAN') target = e.target.parentNode
        target.blur()
      },
      handleClick(e){
        //console.log(11)
        this.buttonClickAutoBur(e)
      }
    }
  }
</script>

<style scoped>
  .el-menu-item:focus{
    background-color: white;
  }
</style>