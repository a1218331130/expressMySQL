<template>
  <div v-show="showMarkDown" class="markdown">
    <div class="issue">
      <div class="issue-left note-view">
        <!-- <quill-editor v-model="issueContent"
                    ref="myQuillEditor"
                    :options="editorOption" style="height:calc(100vh - 136px)">
                 </quill-editor> -->
        <mavon-editor ref="imgId" @save="save" @imgAdd="$imgAdd" :ishljs="true" codeStyle="arduino-ligh" style="height: 100%; width: 100%" v-model="issueContent"></mavon-editor>
      </div>
    </div>
    <div class="footerClass">
      <el-button type="primary" size="small" @click="showMarkDown = false">关闭</el-button>
    </div>
  </div>
</template>

<script>
import { updatelist } from '@projects/manager/api/list'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  components: {
    mavonEditor
  },
  data() {
    return {
      issueContent: '',
      showMarkDown: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    $imgAdd() {},
    save(value, render) {
      updatelist({ ...this.$parent.listForm, detailText: render }).then((res) => {
        this.$message.success('修改成功')
        this.$parent.getTableList()
      })
    }
  }
}
</script>
<style lang="scss">
.markdown {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: white;
  z-index: 2000;
}
.footerClass {
  text-align: center;
  margin-top: 8px;
}
</style>
<style>
.markdown-body .highlight pre,
.markdown-body pre {
  background-color: #282c34;
}
.markdown-body blockquote {
  padding: 20px;
  background-color: #f2f2f2;
  border-left: 6px solid #b3b3b3;
  word-break: break-word;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
  margin: 0 0 20px;
}
</style>
<style scoped>
.wrapper {
  height: 100%;
}
.issue {
  /* padding: 0 1%; */
  /* display: flex; */
  width: 100%;
  height: calc(100vh - 50px);
}
.issue .issue-left {
  width: 100%;
  height: 100%;
}
/* .issue .issue-right{
      flex:1;
      height: 100%;
   } */
</style>
