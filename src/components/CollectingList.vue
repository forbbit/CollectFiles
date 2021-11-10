<template>
  <div>
    <el-table
        :data="tableData"
        style="width: 1000px;"
        :header-cell-style="{'text-align': 'center'}"
        :cell-style="{'text-align': 'center'}"

    >
      <el-table-column
          label="创建日期"
          width="120"
          property="date">
      </el-table-column>
      <el-table-column
          label="项目名称"
          width="250"
          property="subjectName">
      </el-table-column>
      <el-table-column
          label="进度"
          width="150">
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
          width="100">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="left">
            <p>{{nameRules[scope.row.nameRule].title}}</p>
            <el-tag v-for="(t, index) in nameRules[scope.row.nameRule].rule"
                    v-bind:key="index"
                    :type="t.changeAble ? '' : 'success'"
                    style="margin-left: 5px;margin-bottom: 15px"
            >{{t.value}}</el-tag>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ nameRules[scope.row.nameRule].title }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
          label="截止日期"
          width="120"
          property="date">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-dropdown
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
      tableData: [{
          date: '2021-11-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          totalNumber:90,
          currentNumber:30,
          subjectName: '2021.12.25光网络原理与技术大作业',
          nameRule:0
        },
        {
          date: '2021-11-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          totalNumber:90,
          currentNumber:30,
          subjectName: '2021.12.25光网络原理与技术大作业',
          nameRule:0
        }],
      nameRules:[{
        index:0,
        title:'默认规则',
        length:4,
        rule:[
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
        ]
      }],
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
      return 100 * (scope.row.currentNumber/scope.row.totalNumber)
    },
    setItemText(scope){
      return () => {return scope.row.currentNumber+'/'+scope.row.totalNumber}
    },


  },
  computed:{

  }
}
</script>

<style scoped>

</style>