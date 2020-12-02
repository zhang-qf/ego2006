<template>
  <div class="pagination-container">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="num">
    </el-pagination>
  </div>
</template>

<script>
import api from '../../api/index'
export default {
name:'proFenye',
 methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.$bus.$emit('yema',val)
      }
    },
    data() {
      return {
        currentPage: 1,
        num:1
      };
    },
    mounted(){
        api.total().then(res=>{
          // console.log(res.data.result[0]['count(*)']);
          this.num=res.data.result[0]['count(*)']
        })
    }
}
</script>

<style scoped>

.pagination-container{
    margin-top: 40px;
    text-align: center;
}

</style>