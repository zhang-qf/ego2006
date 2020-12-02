<template>
  <div>
    <el-tree :props="props" :load="loadNode" lazy show-checkbox @node-click='node'> 
    </el-tree>
    <!-- <el-button type="primary" @click="sureSubmit">确 定</el-button> -->
  </div>
</template>

<script>
import api from '../../api'
export default {
  name: "proLm",
  data() {
      return {
        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
      };
    },
    mounted(){
        
    },
    methods: {
      loadNode(node, resolve) {
        if (node.level === 0) {
            api.selectItemCategoryByParentId().then(res=>{
                if(res.data.status === 200){
                    return resolve(res.data.result);
                }else{
                    return resolve([]);
                }
              })
        }
        if (node.level >=1) {
            api.selectItemCategoryByParentId({id:node.data.cid}).then(res=>{
                if(res.data.status === 200){
                    return resolve(res.data.result);
                }else{
                    return resolve([]);
                }
              })
            
        };
      },
      node(data){
          console.log(data);
          this.$emit('tree',data)
      },
      sureSubmit(){
          this.$emit('close',false)
          this.$emit('getCategoryDataHandle',true)
      }
    }
};
</script>

<style>
</style>