<template>
  <div>
    <el-button type="primary" @click="look">查看合同</el-button>
    <el-dialog
      title="合同"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
    <el-button @click="$refs.pdf.print()">打印</el-button>
      <pdf
      ref='pdf'
			:src="src"
      :page='currentPage'
	  	@num-pages="pageCount = $event"
			@page-loaded="currentPage = $event"
       @loaded="loadPdfHandler"
		></pdf>
    <el-pagination
                background
                layout="prev, pager, next"
                :page-size="1"
                :total="numPages"
                @current-change="changePage"
     ></el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
var loadingTask = pdf.createLoadingTask('./sxt.pdf');
export default {
  name: "Ucenter",
  components: {
		pdf
	},
  data() {
      return {
        dialogVisible: false,
        src: loadingTask,
        numPages: undefined,//总页数
        currentPage: 1,//当前页
      };
    },
  methods: {
    look() {
      this.dialogVisible=true
    },
    handleClose(){
      
    },
    loadPdfHandler(){
      console.log("PDF加载完成啦");
    },
    changePage(page){
      // console.log(page);
      this.currentPage=page
    }
  },
  mounted() {

		this.src.promise.then(pdf => {
      // console.log(pdf);
      // console.log(pdf.numPages);
      // console.log(this.pageCount);
			this.numPages = pdf.numPages;
		});
	}
};
</script>

<style>
</style>