<template>
  <div class="createRule">
    <div style="margin: -20px 10px 10px 10px;">
      <el-row :gutter="0">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input placeholder="规则名称" v-model="newRule.title" class="newRuleNameInput"></el-input>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple"
               style="width: 100%;
                 height: 40px;
                 border: 1px solid #88C2FF;
                 border-top-right-radius: 8px;
                 border-bottom-right-radius: 8px">
            <div>
                <span v-if="newRule.rule.length === 0"
                      style="line-height: 40px;
                      margin-left: 10px;
                      color: #C0C4CC;
                      font-size: 15px;
                      cursor: default">
                  点击下方标签添加字段
                </span>
              <span v-else style="line-height: 36px">
                  <el-tag v-for="(t, index) in newRule.rule"
                          disable-transitions
                          closable
                          @close="deleteTag(index)"
                          :key="index"
                          :type="t.changeAble ? '' : 'success'"
                          style="margin-left: 5px;margin-bottom: 15px"
                  >{{t.value}}</el-tag>
                </span>
              <el-button type="primary"
                         style="border-top-left-radius: 0;
                           border-bottom-left-radius: 0;
                           float: right" :disabled="newRule.rule.length === 0 || newRule.title === '' "
                         @click="addToRule">点击新建</el-button>
            </div>


          </div></el-col>
      </el-row>
    </div>
    <div>
      <span class="newRuleDiv">
        <div>
          动态字段
        </div>
        <el-tag
            class="createRuleTag"
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            disable-transitions
            @close="handleTagsClose('dynamic', tag)"
            @click="addTag('dynamic', tag)">
          {{tag}}
        </el-tag>
        <el-input
            class="input-new-tag"
            v-if="dynamicTagsInputVisible"
            v-model="dynamicTagsInputValue"
            ref="saveDynamicTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm('dynamic')"
            @blur="handleInputConfirm('dynamic')"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput('dynamic')">+ 新标签</el-button>
      </span>
      <el-divider direction="vertical"></el-divider>
      <span class="newRuleDiv">
        <div>
          静态字段
        </div>
        <el-tag
            class="createRuleTag"
            :key="tag"
            v-for="tag in staticTags"
            closable
            disable-transitions
            @close="handleTagsClose('static', tag)"
            @click="addTag('static', tag)"
            type="success">
          {{tag}}
        </el-tag>
        <el-input
            class="input-new-tag"
            v-if="staticTagsInputVisible"
            v-model="staticTagsInputValue"
            ref="saveStaticTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm('static')"
            @blur="handleInputConfirm('static')"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput('static')">+ 新标签</el-button>
      </span>
    </div>

  </div>
</template>

<script>
export default {
  name: "CreateRule",
  props:['addRule'],
  data(){
    return {
      newRule:{
        title:'',
        rule:[
        ]
      },
      emptyRule:{
        title:'',
        rule:[
        ]
      },
      dynamicTags: ['动态一', '动态二', '动态三'],
      staticTags: ['静态一', '静态二', '静态三'],
      staticTagsInputVisible: false,
      staticTagsInputValue:'',
      dynamicTagsInputVisible: false,
      dynamicTagsInputValue:''
    }
  },
  methods:{
    // 新建规则部分的函数
    handleTagsClose(stable, tag) {
      if (stable === 'dynamic')
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      else
        this.staticTags.splice(this.staticTags.indexOf(tag), 1);
    },
    buttonClickAutoBur(e){
      let target = e.target
      if (target.nodeName === 'SPAN') target = e.target.parentNode
      target.blur()
    },
    showInput(stable) {
      if (stable === 'dynamic') {
        this.dynamicTagsInputVisible = true
      }else
        this.staticTagsInputVisible = true
      // eslint-disable-next-line no-unused-vars
      this.$nextTick(_ => {
        if (stable === 'dynamic')
          this.$refs.saveDynamicTagInput.$refs.input.focus()
        else
          this.$refs.saveStaticTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm(stable) {
      if (stable === 'dynamic'){
        let inputValue = this.dynamicTagsInputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.dynamicTagsInputVisible = false;
        this.dynamicTagsInputValue = '';
      }else {
        let inputValue = this.staticTagsInputValue;
        if (inputValue) {
          this.staticTags.push(inputValue);
        }
        this.staticTagsInputVisible = false;
        this.staticTagsInputValue = '';
      }
    },
    addTag(stable, value) {
      let word = {value:value}
      word.changeAble = stable === 'dynamic';
      this.newRule.rule.push(word)
    },
    deleteTag(index){
      this.newRule.rule.splice(index, 1);
    },
    addToRule(){
      let rule = JSON.stringify(this.newRule)
      this.newRule.title=''
      this.newRule.rule=[]
      //console.log(rule)
      this.addRule(rule)
    }

  }
}
</script>

<style scoped>
  .title{
    margin: 0;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .button-new-tag, .createRuleTag, .input-new-tag{
    margin-left: 10px;
    margin-top: 10px;
  }
  .el-divider--vertical{
    height: 300px;
    vertical-align: top;
    margin: 0 10px;
  }
  .newRuleDiv{
    display: inline-block;
    width: 500px;
    vertical-align: top;
  }
  /deep/.newRuleNameInput .el-input__inner{
    height: 42px;
    border: 1px solid #88C2FF; border-radius: 8px;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    border-right: 0;
  }
  .el-tag{
    cursor: pointer;
  }
</style>