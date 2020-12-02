<template>
  <div>
      <el-dialog title="编辑商品" :visible.sync="outerVisible" width='80%'>
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
                    <proLm @tree='tree' @close='close'/>
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
                <span>{{img}}</span>
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
               <!-- <wangD :Mdesc='Mdesc'/> -->
               <ProductWangEditor :Mdesc='Mdesc'/>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogAddVisible = false">取 消</el-button>
            <el-button type="primary" @click="sureSubmit">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import ProductUpload from './ProductUpload'
import baiduD from './baiduD'
import wangD from './wangD'
import ProductWangEditor from './ProductWangEditor'
import proLm from './proLm'
import api from '../../api'
export default {
name:'proBj',
components:{
    ProductUpload,
    // baiduD,
    // wangD,
    ProductWangEditor,
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
            id:''
      };
    },
    computed:{
        ...mapState('wangMod',{
            Mdesc:state=>state.Mdesc
        })
    },
    mounted(){
        
        this.$bus.$on('Ref',row=>{
            console.log(row);
            this.outerVisible=true
            api.preUpdateItem({
                id:row.id
            }).then(res=>{
                var sj=res.data.result[0];
                console.log(res.data.result[0]);
                this.addForm= {
                name:sj.title,
                sellPoint:sj.sellPoint,
                price: sj.price,
                num: sj.num,
            }
            
            api.preCategory({
            cid:sj.cid
        }).then(res=>{
            // console.log(res.data.result[0]);
            this.treeData=res.data.result[0]
        })
            this.desc=sj.descs
            this.id=sj.id
            this.img=sj.image
              this.xiu(sj.descs)
            })
        })
        
        // this.$bus.$on('out',flag=>{
        //     this.outerVisible=flag
        // }),
        this.$bus.$on('con',val=>{
            // console.log(val);
            this.desc=val
        })
      
    },
    methods:{
      ...mapMutations('wangMod',['xiu']),
        getUpload(data){
            this.img=data
            this.dialogUploadVisible=false
        },
        sureSubmit(){
            api.updateTbItem({
                id:this.id,
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