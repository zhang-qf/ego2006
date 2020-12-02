<template>
  <div>
      <el-dialog title="添加商品" :visible.sync="outerVisible" width='80%'>
           <el-form
            label-width="70px"
            :label-position="labelPosition"
            :model="addForm"
            ref="ruleForm"
        >
            <el-form-item label="商品类目">
                <el-button class="category" type="primary" @click="innerVisible = true">类目选择</el-button>
                <span>{{treeData.name}}</span>
                <el-dialog
                    width="50%"
                    title="商品类目"
                    :visible.sync="innerVisible"
                    append-to-body>
                    <proLm @tree='tree' @getCategoryDataHandle='getCategoryDataHandle'/>
                    <el-button type="primary" @click="sureSubmit">确 定</el-button>
                </el-dialog>
            </el-form-item>
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品卖点" prop="sellPoint">
                <el-input v-model="addForm.sellPoint"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
                <el-input v-model="addForm.price"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="num">
                <el-input v-model="addForm.num"></el-input>
            </el-form-item>
            <el-form-item label="商品图片">
                <el-button class="category" type="primary" @click="dialogUploadVisible = true">图片上传</el-button>
                <el-dialog
                    width="50%"
                    title="上传图片"
                    :visible.sync="dialogUploadVisible"
                    append-to-body>
                    <ProductUpload @upload="getUpload"/>
                </el-dialog>
            </el-form-item>
            <el-form-item label="商品描述">
               <!-- <baiduD/> -->
               <wangD/>
               <!-- <ProductWangEditor/> -->
            </el-form-item>
            <div v-for="(item,index) in treeDataEditor" :key="index">
                <h3>{{ item.value }}</h3>
                <div v-for="(childItem,childIndex) in item.children" :key="childIndex">
                    <el-form-item label-width="130px" :label="childItem.childValue">
                        <el-input v-model="childItem.value" type="text"></el-input>
                    </el-form-item>
                </div>
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogAddVisible = false">取 消</el-button>
            <el-button type="primary" @click="sureSubmit">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import ProductUpload from './ProductUpload'
import baiduD from './baiduD'
import wangD from './wangD'
import ProductWangEditor from './ProductWangEditor'
import proLm from './proLm'
import api from '../../api'
export default {
name:'proadd',
components:{
    ProductUpload,
    // baiduD,
    wangD,
    // ProductWangEditor,
    proLm
},
data() {
      return {
         outerVisible: false,
         dialogUploadVisible:false,
         innerVisible:false,
         labelPosition: "left",
         addForm: {
                name: "",
                sellPoint: "",
                price: "",
                num: "",
            },
            treeData:[],
            desc:'',
            img:[],
            treeDataEditor:[]
      };
    },
    mounted(){
        this.$bus.$on('out',flag=>{
            this.outerVisible=flag
        }),
        this.$bus.$on('con',val=>{
            // console.log(val);
            this.desc=val
        })
      
    },
    methods:{
      
        getUpload(data){
            this.img=data
            this.dialogUploadVisible=false
        },
        sureSubmit(){
            api.insertTbItem({
                title:this.addForm.name,
                cid:this.treeData.cid,
                sellPoint:this.addForm.sellPoint,
                price:this.addForm.price,
                num:this.addForm.num,
                desc:this.desc,
                image:this.img.url,
            }).then(res=>{
                console.log(res);
                this.$message({
                    message: res.data.msg,
                    type: 'success'
                    });
                    this.$bus.$emit('shua',true)
                    this.init()
            })
            this.outerVisible=false
        },
        tree(data){
            this.treeData=data

        },
         getCategoryDataHandle() {
            api.paramsItem({
                cid:this.treeData.cid
            }).then(res =>{
                if(res.data.status ===200){
                    this.treeDataEditor = JSON.parse(res.data.result[0].paramData)
                    console.log(JSON.parse(res.data.result[0].paramData));
                    this.innerVisible = false;
                }else{
                    this.$message('请选择分类');
                }
            })
        },
        close(flag){
            this.innerVisible=flag
        },
        init(){
            this.addForm= {
                name: "",
                sellPoint: "",
                price: "",
                num: "",
            }
            this.treeData=[]
            this.desc=''
            this.img=[]
        },
        sureSubmit(){
          this.close(false)
          this.getCategoryDataHandle()
      }

    }
}
</script>

<style scoped lang="less">
.category {
    float: left;
    margin-right: 20px;
}
.upload-img {
    width: 400px;
    float: left;
}
</style>