<template >
    <el-form style="border-radius: 1rem; margin-bottom: 0;
                    position: absolute; top: 50%; margin-top: 0;
                    transform: translate(0,-50%); height: 55%;
                    margin-left: 0; left: 65%; width: 20%"
             :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left"
             label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">管理员登录</h3>
        <el-form-item prop="account">
          <el-input class="login-input" style="border-radius: 2rem !important;" prefix-icon="el-icon-user" type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input class="login-input" prefix-icon="el-icon-lock" type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="height: 10%">
            <el-col :span="12">
                <el-checkbox v-model="checked" checked class="remember"><span >记住用户名</span></el-checkbox>
            </el-col>
            <el-col style="text-align: right" :span="12">
                <el-link style="color: #B8B8B8">忘记密码?</el-link>
            </el-col>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;
                          background: linear-gradient(315deg,rgba(88,96,250,1) 0%,rgba(121,128,250,1) 100%);
                          border-radius: 2rem; border: 0;box-shadow: 0 5px 10px #7980FA;"
                     @click.native.prevent="login"
                     :loading="logining">登录</el-button>
          <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
        <el-form-item>
            <el-link style="color: #787FFA;margin-top: -3rem !important;" :underline="false" @click="showregister">还没有账号？注册一个吧！</el-link>
        </el-form-item>
  </el-form>
</template>

<script>
  import { requestLogin } from '../api/api';
  //import NProgress from 'nprogress'
  export default {
    name:"login",
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      showregister(){
        this.$router.push({ path: '/register' });
      },
      login(ev){

        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
            requestLogin(loginParams).then(data => {
              this.logining = false;
              //NProgress.done();
             console.log(data);
              if (!data.succeed) {
                this.$message({
                  message: data.message,
                  type: 'error'
                });
              } else {
                let user={
                  name: this.ruleForm2.account,
                  avatar:this.ruleForm2.checkPass
                }
                sessionStorage.setItem('user', JSON.stringify(user));
                this.$router.push({path: '/superAdminInstituteManagement'});
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
            requestLogin(loginParams).then(data => {
              this.logining = false;
              //NProgress.done();
              let { msg, code, user } = data;
              if (code !== 200) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
              } else {
                sessionStorage.setItem('user', JSON.stringify(user));
                this.$router.push({ path: '/superAdminInstituteManagement' });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss">
  .login-input{
    .el-input__inner {
      -webkit-appearance: none;
      background-color: #FFF;
      background-image: none;
      border-radius: 2rem !important;
      border: 1px solid #DCDFE6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: 0;
      padding: 0 15px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
    }
  }


    .el-checkbox__inner {
      display: inline-block;
      position: relative;
      border: 1px solid #DCDFE6;
      border-radius: 200px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 14px;
      height: 14px;
      background-color: #FFF;
      z-index: 1;
      -webkit-transition: border-color .25s cubic-bezier(.71, -.46, .29, 1.46), background-color .25s cubic-bezier(.71, -.46, .29, 1.46);
      transition: border-color .25s cubic-bezier(.71, -.46, .29, 1.46), background-color .25s cubic-bezier(.71, -.46, .29, 1.46);
    }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    margin-left: 58%;
    margin-top: 14%;
    width: 340px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    .title {
      margin: 0px auto 1rem auto;
      text-align: left;
      font-family: PingFang SC;
      font-weight: bolder;
      font-size: 1.3rem;
      color: black;
    }
    .remember {
      margin: 0px 0px 10px 0px;
      color: #7980FA;
    }
  }

  .el-button--primary {
      color: #FFF;
      background-color: #409EFF;
      border-color: #409EFF;
      font-family: PingFang SC;
  }

  .login-input .el-input--prefix .el-input__inner{
    border-radius: 2rem !important;
  }

  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #7980FA;
  }
  .login-input{
    position: relative;
    height: 2rem;
    width: 100%;
    border-radius: 2rem;
    border-top: 1px;
    border-left: 1px;
    border-bottom: 1px;
    border-right: 1px;
    padding-left: 0rem !important;
  }
  .login-input /deep/ {

      padding-left: 0rem !important;

      .el-input__prefix  {
          padding-left: 0.2rem;
          border-radius: 2rem !important;
      }
      .el-input__inner {
          font-family: PingFang SC;
          -webkit-appearance: none;
          background-color: #FFF;
          background-image: none;
          border-radius: 2rem !important;
          border: 1px solid #DCDFE6;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          color: #606266;
          display: inline-block;
          font-size: inherit;
          height: 40px;
          line-height: 40px;
          outline: 0;
          padding: 0 15px;
          padding-left: 2rem;
          -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
          transition: border-color .2s cubic-bezier(.645,.045,.355,1);
          width: 100%;
      }
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #7980FA !important;
      border-color: #7980FA !important;
  }
  .el-checkbox__input.is-focus .el-checkbox__inner {
      border-color: #7980FA !important;
  }
  .el-link.el-link--default:hover {
      color: #7980FA !important;
  }
  .el-link.el-link--default {
      color: #7980FA !important;
  }
  .el-link.el-link--default:after, .el-link.el-link__primary.is-underline:hover:after, .el-link.el-link__primary:after {
      border-color: #7980FA !important;
  }
</style>
