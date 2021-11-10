<template>
  <el-container>
    <el-header>
      <index-header/>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import IndexHeader from "@/components/IndexHeader"
export default {
  name: "Index",
  components: {
    IndexHeader,
    //Index
  }
}
</script>

<style scoped>

</style>