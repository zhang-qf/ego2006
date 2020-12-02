<template>
  <div>
    <el-button @click="contentInfoAdd" v-if="node.name"
            >添加{{ node.name }}</el-button>
            <el-dialog
            title="添加广告"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose"
        >
            <el-form :model="ruleForm" ref="ruleForm">
                <el-form-item label="name">
                    <el-input type="text" v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="url">
                    <el-input type="text" v-model="ruleForm.url"></el-input>
                </el-form-item>
                <el-form-item label="image">
                    <el-input type="text" v-model="ruleForm.image"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addHandle">添 加</el-button>
            </span>
        </el-dialog>
       <el-table :data="tableData">
            <el-table-column label="ID" prop="id" width="100"></el-table-column>
            <el-table-column
                label="PID"
                prop="pid"
                width="100"
            ></el-table-column>
            <el-table-column
                show-overflow-tooltip
                label="名字"
                prop="name"
                width="300"
            ></el-table-column>
            <el-table-column
                show-overflow-tooltip
                label="URL"
                prop="url"
            ></el-table-column>
            <el-table-column
                show-overflow-tooltip
                label="Image"
                prop="image"
            ></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
  </div>
</template>

<script>
import api from '../../api/index'
export default {
  name:'ContentInfo',
data(){
  return{
    tableData:[],
    node:{},
    dialogVisible:false,
    ruleForm: {
                name: "",
                url: "",
                image: "",
            },
  }
},
mounted(){
this.$bus.$on('node',node=>{
    this.node=node
    this.http(node)
})
},
methods:{
  handleDelete(index,row){
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
           api.deleteContentByIds({
                id: row.id,
            }).then((res) => {
                if (res.data.status === 200) {
                      this.$message({
                type: 'success',
                message: '删除成功!'
              });
                    this.http(this.node)
                }
            });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

  },
  http(data) {
            api.selectTbContentAllByCategoryId({
                pid: data.pid,
            }).then((res) => {
              // console.log(res.data.result);
                this.tableData = res.data.result;
            });
        },
  contentInfoAdd(){
    this.dialogVisible=true
        },
        handleClose(){

        },
        addHandle(){
          api.insertTbContent({
                pid: this.node.pid,
                name: this.ruleForm.name,
                url: this.ruleForm.url,
                image: this.ruleForm.image,
            }).then((res) => {
                if (res.data.status === 200) {
                    this.dialogVisible = false;
                    this.http(this.node);
                }
            });
        }
}
}
</script>

<style>

</style>