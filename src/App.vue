<template>
  <Index/>
</template>

<script>

import Index from "@/components/Index"
export default {
  name: 'App',
  components:{
    Index
  }
}
</script>

<style>
/* 解决element-ui的table表格控件表头与内容列不对齐问题 */
  .el-table th.gutter{
    display: table-cell!important;
  }
</style>
