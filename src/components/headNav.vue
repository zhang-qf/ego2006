<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      router
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/"><i class="el-icon-menu"></i>{{ $t("message.project") }}</el-menu-item>
      <el-menu-item index="/params"><i class="el-icon-document"></i>{{ $t("message.params") }}</el-menu-item>
      <el-menu-item index="/content"><i class="el-icon-setting"></i>{{ $t("message.content") }}</el-menu-item>
       <el-select v-model="value" placeholder="请选择"  @change='xuan'>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
         >
        </el-option>
      </el-select>
      <div class="user">
            <router-link to="/ucenter" tag="span" class="user-name">{{ userInfo.name }}</router-link>
            <el-button class="logout" @click="logoutHandle">退出</el-button>
      </div>
    </el-menu>
  </div>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
export default {
  name: "headNav",
  data() {
      return {
        activeIndex: '/',
        options: [{
          value: 'zh',
          label: '中文'
        }, {
          value: 'en',
          label: '英文'
        }],
        value: ''
      };
    },
    computed:{
      ...mapState('logMod',{
        userInfo:state=>state.userInfo
      })
    },
    methods: {
      ...mapMutations('logmod',['set']),
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      logoutHandle(){
        this.set()
        localStorage.removeItem('ego')
        this.$router.push('/login')
      },
      xuan(){
        // console.log(this.value);
        this.$i18n.locale=this.value
        localStorage.setItem('lang',this.value)
      }
    }
};
</script>
<style scoped lang="less">
.user {
    float: right;
    margin-right: 20px;
    line-height: 60px;
    .user-name {
        color: #fff;
        margin-right: 10px;
        font-size: 15px;
        border: 1px solid #fff;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: inline-block;
        line-height: 40px;
    }
    
}

.set-lang {
    float: right !important;
}

.el-dropdown-link {
    color: #fff;
}
</style>