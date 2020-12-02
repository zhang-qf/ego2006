<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="id" label="商品id" width="100"> </el-table-column>
    <el-table-column prop="title" label="商品名称" width="180"></el-table-column>
    <el-table-column prop="image" label="商品图片" width="100" show-overflow-tooltip> </el-table-column>
    <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip> </el-table-column>
    <el-table-column prop="price" label="商品价格" width="100"> </el-table-column>
    <el-table-column prop="num" label="商品数量" width="100"> </el-table-column>
    <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
        <template slot-scope="scope">
                <div v-html="scope.row.descs"></div>
        </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"  >编辑</el-button>
          
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import api from '../../api/index'

export default {
    name:'proList',
     data() {
      return {
        tableData: [],
        page:1,
        outerVisible:false
      }
    },
    components:{
    },
    mounted(){
        this.pro(this.page).then(res=>{
            // console.log(res.data);
            this.tableData=res.data
        })
        this.$bus.$on('yema',page=>{
            // console.log(page);
            this.page=page;
            this.pro(page).then(res=>{
            // console.log(res.data);
            this.tableData=res.data
        })
        })
        this.$bus.$on('list',list=>{
          this.tableData=list
        }),
        this.$bus.$on('shua',val=>{
          this.pro(1).then(res=>{
            // console.log(res.data);
            this.tableData=res.data
        })
        })
    },
    methods:{
        pro(page){
          // console.log(1111);
           return api.select({page})
        },
        handleEdit(index, row) {
        // console.log(index, row);
        this.outerVisible=true
        this.$bus.$emit('Ref',row)
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
           api.deleteItemById({
          id:row.id
        }).then(res=>{
          
          this.$message({
            type: 'success',
            message: res.data.msg
          });
          this.pro(1).then(res=>{
            // console.log(res.data);
            this.tableData=res.data
        })
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
       
      }
    }
};
</script>

<style>
</style>