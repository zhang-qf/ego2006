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
import api from '../api/index'
export default {
name:'proFenye',
 methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.$parent.http(val)
      }
    },
    data() {
      return {
        currentPage: 1,
        
      };
    },
    props:{
        num:{
            type:[String,Number],
            default:1
        }
    },
    mounted(){
       
    }
}
</script>

<style scoped>

.pagination-container{
    margin-top: 40px;
    text-align: center;
}

</style>