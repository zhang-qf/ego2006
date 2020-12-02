<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" @submit.native.prevent>
      <el-form-item>
        <el-input v-model="formInline.user"  @keyup.enter.native="onSubmit" placeholder="搜索"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onAdd">添加</el-button>
      </el-form-item>
    </el-form>
   
  </div>
</template>

<script>
import api from '../../api'
export default {
  name: "proHead",
  components:{
    
  },
  data() {
    return {
      formInline: {
        user: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.formInline.user);
      api.search({
        search:this.formInline.user
      }).then(res=>{
        console.log(res.data);
        this.$bus.$emit('list',res.data)
      })
    },
    onAdd(){
      this.$bus.$emit('out',true)
    }
  },
};
</script>

<style scoped lang="less">
.el-form {
    overflow: hidden;
    clear: both;
    .el-form-item {
        float: left;
        margin-right: 10px;
        .el-input {
            width: 1000px;
        }
    }
}

.head {
    margin-top: 20px;
    width: 100%;
}
</style>