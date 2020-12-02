<template>
  <div>
    <el-tree :props="props" :load="loadNode" lazy show-checkbox :expand-on-click-node="false" @node-click="handleNodeClick"> 
         <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            添加
          </el-button>
          <el-dialog
            title="添加子导航"
            :visible.sync="dialogAddNavVisible"
            width="50%"
            :before-close="handleClose"
        >
            <el-form :model="navForm" ref="ruleForm">
                <el-form-item label="导航名字" prop="pass" width='30%'>
                    <el-input type="text" v-model="navForm.name" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogAddNavVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="sureAddNavHandle"
                    >添 加</el-button
                >
            </span>
        </el-dialog>

          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            删除
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => updata(node, data)">
            修改
          </el-button>
          <el-dialog
            title="修改导航"
            :visible.sync="dialogUpdateNavVisible"
            width="50%"
            :before-close="handleClose"
        >
            <el-form :model="navForm" ref="ruleForm">
                <el-form-item label="导航名字">
                    <el-input type="text" v-model="navForm.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogUpdateNavVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="sureUpdateNavHandle"
                    >修 改</el-button
                >
            </span>
        </el-dialog>
        </span>
      </span>
    </el-tree>
   
  </div>
</template>

<script>
import api from '../../api'
export default {
  name:'ContentNav',
    inject: ["reload", "demo"],
    data() {
      return {
        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
        dialogAddNavVisible:false,
        navForm: {
                name: "",
            },
        node:{},
        dialogUpdateNavVisible:false
      };
    },
    methods: {
      loadNode(node, resolve) {
        //    console.log(node);
        if (node.level === 0) {
          this.http({id:1,},resolve)
        }
        if (node.level >= 1){
           this.http({id:node.data.pid,},resolve)
        }; 
      },
       http(page,resolve){
        api.selectContentCategoryByParentId(page).then((res) => {
                if (res.data.status === 200) {
                    return resolve(res.data.result);
                } else {
                    return resolve([]);
                }
            });
    },
     append(node,data) {
        //  console.log(node)
         this.node=node
         this.dialogAddNavVisible=true
      },
      sureAddNavHandle(){
       api.insertContentCategory({pid:this.node.pid,name:this.navForm.name}).then((res) => {
                if (res.data.status === 200) {
                    this.dialogAddNavVisible = false;
                    this.reload();
                }
            });

      },
      remove(node, data) {
        api.deleteContentCategoryById({
                pid: data.pid,
            }).then((res) => {
                if (res.data.status === 200) {
                    this.reload();
                }
            });
      },
      updata(node, data){
          console.log(node);
         this.node=node
         this.dialogUpdateNavVisible=true
      },
      sureUpdateNavHandle(){
          console.log(111);
           api.updateContentCategory({
                pid:this.node.data.pid,
                name:this.navForm.name
            }).then(res =>{
                console.log(res);
                if(res.data.status === 200){
                    this.reload();
                }
            })
      },
      handleClose(){},
      handleNodeClick(node){
        // console.log(node);
        this.$bus.$emit('node',node)
      }


    
    },
    
};
</script>

<style>
.el-input{
    width: 400px;
}
</style>