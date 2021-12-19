<template>
  <div style="height: 100%">
    <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%;height: 90%"
        :header-cell-style="{'text-align': 'center'}"
        :row-style="{'height':'60px'}"
        v-loading="loading"
    >
      <el-table-column
          label="状态"
          min-width="90"
          align="center"
          fixed="left"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.finished" style="color: #67C23A">
            <i class="el-icon-check">已完成</i>
          </div>
          <div v-else style="color: #409EFF">
            <i class="el-icon-takeaway-box">收取中</i>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          label="项目名称"
          min-width="250"
          property="subjectName" align="center" fixed="left">
      </el-table-column>
      <el-table-column
          label="创建日期"
          min-width="150"
          property="date"
          align="center">
      </el-table-column>

      <el-table-column
          label="进度"
          min-width="150" align="center">
        <template slot-scope="scope">
          <el-progress
              :percentage="setCollectPercent(scope)"
              :format="setItemText(scope)"
              :text-inside="true"
              :stroke-width="20"
          ></el-progress>
        </template>
      </el-table-column>
      <el-table-column
          label="自动命名"
          min-width="100" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="left">
            <p>{{scope.row.nameRule.title}}</p>
            <el-tag v-for="(t, index) in scope.row.nameRule.rule"
                    :key="index"
                    :type="t.changeAble ? '' : 'success'"
                    style="margin-left: 5px;margin-bottom: 15px"
            >{{t.value}}</el-tag>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.nameRule.title }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
          label="文件码"
          min-width="100"
          property="fileCode" align="center">
      </el-table-column>
      <el-table-column
          label="截止日期"
          min-width="150"
          property="ddl" align="center">
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="150" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.finished">
            <el-dropdown
                style="width: 100%"
                split-button size="small"
                @command="(command) => handleCommand(command, scope.row)"
                @click="download($event, scope.row)"
            >
              打包下载
              <el-dropdown-menu>
                <el-dropdown-item command="delete">删除任务</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div v-else>
            <el-dropdown
                style="width: 100%"
                split-button size="small"
                @command="(command) => handleCommand(command, scope.row)"
                @click="endCollect($event, scope.row)"
            >
              结束收取
              <el-dropdown-menu>
                <el-dropdown-item command="download">打包下载</el-dropdown-item>
                <el-dropdown-item command="delete">删除任务</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        layout="prev, pager, next"
        :total="total" @current-change="current_change" :page-size="pageSize"
        style="float: right">
    </el-pagination>
  </div>

</template>

<script>
export default {
  name: "CollectingList",
  data() {
    return {
      //userId:48,
      loading:true,
      tableData: [],
      showActives: false,
      currentPage:1,
      pageSize:9,
      total:0
    }
  },
  methods: {
    buttonClickAutoBur(e){
      let target = e.target
      if (target.nodeName === 'SPAN') target = e.target.parentNode
      target.blur()
    },
    download(e, row) {
      this.buttonClickAutoBur(e)
      this.handleCommand("download", row)
    },
    endCollect(e, row) {
      this.buttonClickAutoBur(e)
      console.log('endCollect', row.id);
      this.$axios({
        method: "get",
        url: "/file-receive/finish/" + row.id + "/true",
        responseType: "json",
      }).then(
          (res) => {
            if (res.status === 200) {
              this.$message.success("修改成功")
              this.loadList()
            }
          },
          (err) => {
            this.$message.error("修改失败" + err)
          }
      );
    },
    handleCommand(command, row) {
      switch (command){
        case 'download':
          //console.log(command, row.id);
          this.$axios({
            method: "get",
            url: "/file-receive/download",
            responseType: "blob",
            params: { fid : row.id }
          }).then(
              (res) => {
                if (res.status === 200) {
                  this.$message("正在下载")
                  let blob = new Blob([res.data], {type: "application/zip"});
                  const fileName = row.subjectName + ".zip"
                  if ('download' in document.createElement('a')) { // 非IE下载
                    const elink = document.createElement('a')
                    elink.download = fileName
                    elink.style.display = 'none'
                    elink.href = window.URL.createObjectURL(blob)
                    document.body.appendChild(elink)
                    elink.click()
                    window.URL.revokeObjectURL(elink.href) // 释放URL 对象
                    document.body.removeChild(elink)
                  } else { // IE10+下载
                    navigator.msSaveBlob(blob, fileName)
                  }
                }
              },
              (err) => {
                this.$message.error("下载失败" + err)
              }
          );
          break;
        case 'delete':
          //console.log(command, row.id);
          this.$axios({
            method: "delete",
            url: "/file-receive/delete/" + row.id,
            responseType: "json",
          }).then(
              (res) => {
                if (res.status === 200) {
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                  this.loadList()
                }
              },
              (err) => {
                this.$message.error('删除失败！' + err)
              }
          );

          break;
      }
    },
    setCollectPercent(scope){
      if (scope.row.totalNumber === 0) {
        return 0
      }
      return 100 * (scope.row.currentNumber/scope.row.totalNumber)
    },
    setItemText(scope){
      return () => {return scope.row.currentNumber+'/'+scope.row.totalNumber}
    },
    loadList(){
      this.loading = true
      this.tableData.splice(0,this.tableData.length)
      this.$axios({
        method: "get",
        url: "/file-receive/getalltask",
        responseType: "json",
        //params: { uid: this.userId },
      }).then(
          (res) => {
            for (let k in res.data.data) {
              this.total = res.data.data.length
              let item = res.data.data[k]
              let i = {}
              i.id = item.id
              i.date = item.createTime
              i.ddl = item.ddl
              i.totalNumber = item.num
              i.currentNumber = item.numCommit
              i.subjectName = item.zipName
              i.nameRule = item.jsonNameRules
              i.fileCode = item.filecode
              i.finished = item.finished
              this.tableData.push(i)
            }
            this.loading=false
            //console.log(res);
          },
          (err) => {
            console.log(err);
          }
      );
    },
    current_change:function(currentPage){
      this.currentPage = currentPage;
    }
  },
  computed: {},
  mounted() {
    this.loadList()
  },

}
</script>

<style>
  /deep/ body .el-table th.gutter{
    display: table-cell!important;
  }
</style>