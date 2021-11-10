<template>
  <div>
    <el-tabs tab-position="left" style="height: 600px;" >
      <el-tab-pane label="正在收取">
        <collecting-list/>
      </el-tab-pane>
      <el-tab-pane label="收取完成">
        <collect-complete-list/>
      </el-tab-pane>
      <el-tab-pane label="新建收取">
        <create-collect/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CreateCollect from "@/components/CreateCollect.vue";
import CollectingList from "@/components/CollectingList";
import CollectCompleteList from "@/components/CollectCompleteList";
export default {
  name: "Collecting",
  components:{
    CollectCompleteList,
    CreateCollect,
    CollectingList
  }
}
</script>

<style scoped>

</style>