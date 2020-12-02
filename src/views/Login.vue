<template>
  <div class="login-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="登录" name="first">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="user">
            <el-input
              type="text"
              v-model="ruleForm.user"
              autocomplete
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="second">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="user">
            <el-input
              type="text"
              v-model="ruleForm.user"
              autocomplete
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              type="text"
              v-model="ruleForm.email"
              autocomplete
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitFormSet('ruleForm')"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import api from "../api/index";
import jwt from "jwt-decode";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      callback();
    };

    return {
      activeName: "first",
      ruleForm: {
        pass: "",
        user: "",
        checkPass: "",
        email: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        user: [{ validator: checkUser, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations("logMod", ["xiu"]),
    //切换
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //登录
    submitForm(formName) {
      api
        .getLogin({
          username: this.ruleForm.user,
          password: this.ruleForm.pass,
        })
        .then((res) => {
          // console.log(res.data);
          if (res.status === 200) {
            this.xiu({
              name: jwt(res.data).username,
              token: res.data,
            });
            localStorage.setItem("ego", res.data);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message.error(error.data.errors);
        });
    },
    //注册
    submitFormSet(formName) {
      console.log(this.ruleForm);
      if (this.ruleForm.pass === this.ruleForm.checkPass) {
        console.log(this.ruleForm.pass, this.ruleForm.checkPass);
        api
          .getRegister({
            username: this.ruleForm.user,
            password: this.ruleForm.pass,
            email: this.ruleForm.email,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$message({
                message: res.data.msg,
                type: "success",
              });
            }
          })
          .catch((error) => {
            this.$message.error(error.data.msg);
          });
      } else {
        this.$message.error("两次输入密码不一致！请重新输入");
      }
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  width: 500px;
  margin: 0 auto;
  margin-top: 100px;
  .login-form {
    padding: 40px 40px;
  }
  h3 {
    margin-top: 20px;
  }
  .login-tabs {
    border-radius: 5px;
  }
}
</style>