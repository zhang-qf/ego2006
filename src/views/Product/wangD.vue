<template>
  <div class="home">
    <div>{{Mdesc}}</div>
    <div id="demo1"></div>
  </div>
</template>

<script>
import wangEditor from 'wangeditor'
export default {
name:'wangD',
 data() {
    return {
      editor: null,
      editorData: ''
    }
  },
   props: {
        Mdesc: {
            type: String,
            default: "",
        },
    },
     watch: {
        Mdesc() {
            this.editor.txt.html(this.editorData);
        },
    },
  mounted() {
    const editor = new wangEditor(`#demo1`)
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
       this.editorData = newHtml
       this.$bus.$emit('con',newHtml)
    }
    //  editor.config.menus = [
    //         // 菜单配置
    //         "head", // 标题
    //         "bold", // 粗体
    //         "fontSize", // 字号
    //         "fontName", // 字体
    //         "italic", // 斜体
    //         "underline", // 下划线
    //         "strikeThrough", // 删除线
    //         "foreColor", // 文字颜色
    //         "backColor", // 背景颜色
    //         "link", // 插入链接
    //         "list", // 列表
    //         "justify", // 对齐方式
    //         "quote", // 引用
    //         "emoticon", // 表情
    //         "image", // 插入图片
    //         "table", // 表格
    //         "code", // 插入代码
    //         "undo", // 撤销
    //         "redo", // 重复
    //     ];
    // 创建编辑器
    editor.create()
    this.editor = editor
  
  },
  methods: {
    getEditorData() {
      // 通过代码获取编辑器内容
      let data = this.editor.txt.html()
      alert(data)
    }
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  }
}
</script>
<style scoped>
  .home {
    width: 600px;
    margin: auto;
    position: relative;
    
  }
  #home{
        width: 600px;
  }
  .home .btn {
      position: absolute;
      right: 0;
      top: 0;
      padding: 5px 10px;
      cursor: pointer;
    }
    .home h3 {
      margin: 30px 0 15px;
    }
</style>