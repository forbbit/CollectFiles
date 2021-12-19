<template>
  <div>
    <el-table
        :data="tableData"
        style="width: 100%;"
        :header-cell-style="{'text-align': 'center'}"
        v-loading="loading"
    >
      <el-table-column
          label="创建日期"
          width="250"
          property="date"
          align="center">
      </el-table-column>
      <el-table-column
          label="项目名称"
          width="250"
          property="subjectName" align="center">
      </el-table-column>
      <el-table-column
          label="进度"
          width="150" align="center">
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
          width="100" align="center">
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
          width="120"
          property="fileCode" align="center">
      </el-table-column>
      <el-table-column
          label="截止日期"
          width="250"
          property="date" align="center">
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150" align="center">
        <template slot-scope="scope">
          <div>
            <el-dropdown
                style="width: 100%"
                split-button size="small"
                @command="(command) => handleCommand(command, scope.$index, scope.row)"
                @click="handleInfo($event, scope.$index, scope.row)"
            >
              查看详情
              <el-dropdown-menu>
                <el-dropdown-item command="complete">结束收取</el-dropdown-item>
                <el-dropdown-item command="delete">删除任务</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
export default {
  name: "CollectingList",
  data() {
    return {
      userId:48,
      loading:true,
      tableData2: [{
          date: '2021-11-08',
          totalNumber:90,
          currentNumber:30,
          subjectName: '2021.12.25光网络原理与技术大作业',
          nameRule:{title:'默认规则', length:4, rule:[
              {
                changeAble:true,
                value:'学号'
              },
              {
                changeAble: false,
                value: '-'
              },
              {
                changeAble: true,
                value: '姓名'
              },
              {
                changeAble: false,
                value: '-'
              },
              {
                changeAble: false,
                value: '光网络原理与技术大作业'
              }
            ]}
      }],
      tableData: [],
      showActives: false,
    }
  },
  methods: {
    buttonClickAutoBur(e){
      let target = e.target
      if (target.nodeName === 'SPAN') target = e.target.parentNode
      target.blur()
    },
    handleInfo(e, index, row) {
      this.buttonClickAutoBur(e)
      console.log(index, row);
    },
    handleCommand(command, index, row) {
      //this.buttonClickAutoBur(e)
      console.log(command, index, row);
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
      this.$axios({
        method: "get",
        url: "/file-receive/getalltask",
        responseType: "json",
        params: { uid: this.userId },
      }).then(
          (res) => {
            for (let i in res.data.data) {
              let item = res.data.data[i]
              console.log(item)
              if (item.finished === false) {
                let i = {}
                i.date = item.createTime
                i.totalNumber = item.num
                i.currentNumber = item.numCommit
                i.subjectName = item.zipName
                i.nameRule = item.jsonNameRules
                i.fileCode = item.filecode
                console.log(i)
                this.tableData.push(i)
              }
            }
            this.loading=false
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
      );
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