<template >
    <el-form v-if="!clickNextStep&&isSchool" style="border-radius: 1rem; margin-bottom: 0;
                    position: absolute; top: 50%; margin-top: 0;
                    transform: translate(0,-50%); height: 26rem;
                    margin-left: 0; left: 60%; width: 25%"
             :model="ruleForm" :rules="rules2" ref="ruleForm"
             label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <el-tabs style="margin-bottom: 1rem;" v-model="activeName" >
            <el-tab-pane label="填写账户信息"  disabled name="first"></el-tab-pane>
            <el-tab-pane label="登记学校信息"  disabled name="second"></el-tab-pane>
        </el-tabs>
        <el-form-item prop="schoolAccount">
            <el-input class="login-input" type="text" v-model="ruleForm.schoolAccount" auto-complete="off" placeholder="设置您的用户名"></el-input>
        </el-form-item>
        <el-form-item prop="schoolPassword">
            <el-input class="login-input" type="password" v-model="ruleForm.schoolPassword" auto-complete="off" placeholder="设置您的登录密码"></el-input>
        </el-form-item>
        <el-form-item prop="repeatPassword">
            <el-input class="login-input" type="password" v-model="ruleForm.repeatPassword" auto-complete="off" placeholder="请再次输入您的登录密码"></el-input>
        </el-form-item>
        <el-form-item prop="schoolPhone">
            <el-input class="login-input" type="text" v-model="ruleForm.schoolPhone" auto-complete="off" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="schoolPrincipal">
            <el-input class="login-input" type="text" v-model="ruleForm.schoolPrincipal" auto-complete="off" placeholder="请输入负责人"></el-input>
        </el-form-item>

        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;
                      background: linear-gradient(315deg,rgba(88,96,250,1) 0%,rgba(121,128,250,1) 100%);
                      border-radius: 2rem; border: 0;box-shadow: 0 5px 10px #7980FA;"
                       @click.native.prevent="nextStep"
                       :loading="logining" >下一步</el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
        <el-form-item style="text-align: right; margin-top: -1.5rem;">
            <el-link disabled style="color: #B8B8B8;">已有账号？</el-link>
            <el-link style="color: #787FFA;" @click="showlogin" >快捷登录</el-link>
        </el-form-item>
    </el-form>

    <el-form v-else-if="!clickNextStep" style="border-radius: 1rem; margin-bottom: 0;
                    position: absolute; top: 50%; margin-top: 0;
                    transform: translate(0,-50%); height: 26rem;
                    margin-left: 0; left: 60%; width: 25%"
             :model="ruleForm2" :rules="rules3" ref="ruleForm2"
             label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <el-tabs style="margin-bottom: 1rem;" v-model="activeName" >
            <el-tab-pane label="填写账户信息"  disabled name="first"></el-tab-pane>
            <el-tab-pane label="登记筛查机构信息"  disabled name="second"></el-tab-pane>
        </el-tabs>
        <el-form-item prop="insAccount">
            <el-input class="login-input" type="text" v-model="ruleForm2.insAccount" auto-complete="off" placeholder="设置您的用户名"></el-input>
        </el-form-item>
        <el-form-item prop="insPassword">
            <el-input class="login-input" type="password" v-model="ruleForm2.insPassword" auto-complete="off" placeholder="设置您的登录密码"></el-input>
        </el-form-item>
        <el-form-item prop="repeatPassword">
            <el-input class="login-input" type="password" v-model="ruleForm2.repeatPassword" auto-complete="off" placeholder="请再次输入您的登录密码"></el-input>
        </el-form-item>
        <el-form-item prop="mobile">
            <el-input class="login-input" type="text" v-model="ruleForm2.mobile" auto-complete="off" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="principal">
            <el-input class="login-input" type="text" v-model="ruleForm2.principal" auto-complete="off" placeholder="请输入负责人"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;
                      background: linear-gradient(315deg,rgba(88,96,250,1) 0%,rgba(121,128,250,1) 100%);
                      border-radius: 2rem; border: 0;box-shadow: 0 5px 10px #7980FA;"
                       @click.native.prevent="nextStep2"
                       :loading="logining" >下一步</el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
        <el-form-item style="text-align: right; margin-top: -1.5rem;">
            <el-link disabled style="color: #B8B8B8;">已有账号？</el-link>
            <el-link style="color: #787FFA;" @click="showlogin" >快捷登录</el-link>
        </el-form-item>
    </el-form>

    <el-form v-else-if="isSchool"  style="border-radius: 1rem; margin-bottom: 0;
                    position: absolute; top: 50%; margin-top: 0;
                    transform: translate(0,-50%); height: 26rem;
                    margin-left: 0; left: 60%; width: 25%"
             :model="ruleForm" :rules="rules2" ref="ruleForm"
             label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <el-tabs style="margin-bottom: 1rem;" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="填写账户信息" disabled name="first"></el-tab-pane>
            <el-tab-pane label="登记学校信息" disabled name="second"></el-tab-pane>
        </el-tabs>
        <el-form-item prop="schoolName">
            <el-input class="school-input" v-model="ruleForm.schoolName" type="text"  auto-complete="off" placeholder="学校名称"></el-input>
        </el-form-item>
        <el-form-item prop="schoolType">
            <el-select v-model="ruleForm.schoolType" placeholder= "选择学校类型">
                <el-option
                        v-for="item in options"
                        :key="parseInt(item.value)"
                        :label="item.label"
                        :value="parseInt(item.value)">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="maxGrade">
            <el-input-number class="maxgradeinput"  v-model="ruleForm.maxGrade"  :min="1" :max="10" ></el-input-number>
        </el-form-item>
        <el-form-item  prop="county">
            <v-distpicker @selected="onSelected" @province="selectProvince" @city="selectCity" @area="selectArea"></v-distpicker>
        </el-form-item>
        <el-form-item style="width:100%;" >
            <el-button type="primary" style="width:100%;
                      background: linear-gradient(315deg,rgba(88,96,250,1) 0%,rgba(121,128,250,1) 100%);
                      border-radius: 2rem; border: 0;box-shadow: 0 5px 10px #7980FA;"
                       @click.native.prevent="registerSchool"
                       :loading="logining" >完成</el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
        <el-form-item style="width:100%;" >
            <el-button type="primary" style="width:100%;
                      background: linear-gradient(315deg,rgba(88,96,250,1) 0%,rgba(121,128,250,1) 100%);
                      border-radius: 2rem; border: 0;box-shadow: 0 5px 10px #7980FA;"
                       @click.native.prevent="lastStep"
                       :loading="logining" >上一步</el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
        <el-form-item style="text-align: right; margin-top: -1.5rem;">
            <el-link disabled style="color: #B8B8B8;">已有账号？</el-link>
            <el-link style="color: #787FFA;" @click="showlogin" >快捷登录</el-link>
        </el-form-item>
    </el-form>


    <el-form v-else  style="border-radius: 1rem; margin-bottom: 0;
                    position: absolute; top: 50%; margin-top: 0;
                    transform: translate(0,-50%); height: 65%;
                    margin-left: 0; left: 60%; width: 25%"
             :model="ruleForm2" :rules="rules3" ref="ruleForm2"
             label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <el-tabs style="margin-bottom: 1rem;" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="填写账户信息" disabled name="first"></el-tab-pane>
            <el-tab-pane label="登记筛查机构信息" disabled name="second"></el-tab-pane>
        </el-tabs>
        <el-form-item prop="insName">
            <el-input class="login-input" v-model="ruleForm2.insName" type="text"  auto-complete="off" placeholder="机构名称"></el-input>
        </el-form-item>
        <el-form-item prop="schoolList">
            <el-select style="width: 100%;"
                       class="select-school-name"
                    v-model="ruleForm2.schoolList"
                    multiple
                    filterable
                    placeholder="请选择学校名称"
                    :loading="loading">
                <el-option
                        v-for="item in schoolist"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item  prop="province">
            <v-distpicker @selected="onSelected2"  @province="selectProvince2" @city="selectCity2" @area="selectArea2" ></v-distpicker>
        </el-form-item>
        <el-form-item style="width:100%;" >
            <el-button type="primary" style="width:100%;
                      background: linear-gradient(315deg,rgba(88,96,250,1) 0%,rgba(121,128,250,1) 100%);
                      border-radius: 2rem; border: 0;box-shadow: 0 5px 10px #7980FA;"
                       @click.native.prevent="registerInstitute"
                       :loading="logining" >完成</el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
        <el-form-item style="width:100%;" >
            <el-button type="primary" style="width:100%;
                      background: linear-gradient(315deg,rgba(88,96,250,1) 0%,rgba(121,128,250,1) 100%);
                      border-radius: 2rem; border: 0;box-shadow: 0 5px 10px #7980FA;"
                       @click.native.prevent="lastStep"
                       :loading="logining" >上一步</el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
        <el-form-item style="text-align: right; margin-top: -1.5rem;">
            <el-link disabled style="color: #B8B8B8;">已有账号？</el-link>
            <el-link style="color: #787FFA;" @click="showlogin" >快捷登录</el-link>
        </el-form-item>
    </el-form>
</template>

<script>
    import {requestLogin, requestRegisterInstitute, requestRegisterSchool} from '../api/api';
    import VDistpicker from 'v-distpicker'
    //import NProgress from 'nprogress'
    import {
        getSchoolListPage
    } from '../api/api';
    export default {
        name:"register",
        components:{
          VDistpicker
        },
        data() {
            return {
                schools:[],
                schoolist:[],
                allschool:[],
                isSchool:false,
                firstdisable:true,
                seconddisable:true,
                clickNextStep:false,
                activeName:"first",
                logining: false,
                ruleForm: {
                    schoolAccount: '',
                    schoolPassword: '',
                    repeatPassword:'',
                    schoolName:'',
                    schoolType:'',
                    province:'',
                    city:'',
                    county:'',
                    schoolPhone:'',
                    schoolPrincipal:'',
                    maxGrade:1
                },
                ruleForm2: {
                    insName:'',
                    insAccount: '',
                    insPassword: '',
                    repeatPassword:'',
                    schoolList:'',
                    province:'',
                    city:'',
                    county:'',
                    mobile:'',
                    principal:'',
                    type:2
                },
                options: [{
                    value: '3',
                    label: '小学'
                }, {
                    value: '4',
                    label: '初中'
                },
                    {
                        value:'5',
                        label : '高中'
                    }],
                rules2: {
                    schoolAccount: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        //{ validator: validaePass }
                    ],
                    schoolPassword: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        //{ validator: validaePass2 }
                    ],
                    repeatPassword: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        //{ validator: validaePass2 }
                    ],
                    schoolName: [
                        { required: true, message: '请输入学校名称', trigger: 'blur' },
                        //{ validator: validaePass2 }
                    ],
                    schoolType: [
                        { required: true, message: '请选择学校类型', trigger: 'blur' },
                        //{ validator: validaePass2 }
                    ],
                    county:[
                        {required: true, message: '请选择地区', trigger: 'blur'}
                    ],
                    schoolPhone:[
                        {required: true, message: '请输入电话', trigger: 'blur'}
                    ],
                    schoolPrincipal:[
                        {required: true, message: '请输入负责人', trigger: 'blur'}
                    ],
                    maxGrade:[
                        {required: true, message: '请输入最大年级', trigger: 'blur'}
                    ]
                },
                rules3: {
                    insAccount: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        //{ validator: validaePass }
                    ],
                    insPassword: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        //{ validator: validaePass2 }
                    ],
                    repeatPassword: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        //{ validator: validaePass2 }
                    ],
                    province:[
                        {required: true, message: '请选择省份', trigger: 'blur'}
                    ],
                    mobile:[
                        {required: true, message: '请输入电话', trigger: 'blur'}
                    ],
                    principal:[
                        {required: true, message: '请输入负责人', trigger: 'blur'}
                    ]
                },
                checked: true
            };
        },
        mounted(){
          let type=this.$route.query.type;
          if(type==0){
              this.isSchool=true;
          }else if(type==1){
              this.isSchool=false;
              let para={
                  page:1,
                  pageSize:100000000
              };
              getSchoolListPage(para)
                  .then(res => {
                      console.log("login get success");
                      console.log(res);
                      this.allschool=res.data.result.items;
                      //this.myInfo = successResponse.data.datas[0];
                  })
                  .catch(failResponse => {
                      console.log("login get fail");
                  });
          }


        },
        methods: {
            selectProvince(data){
                this.ruleForm.province=data.value;
                console.log(data);
            },
            selectCity(data){
                this.ruleForm.city=data.value;
            },
            selectArea(data){
                this.ruleForm.county=data.value;
            },
            selectProvince2(data){
                this.ruleForm2.province=data.value;
                console.log(data);
            },
            selectCity2(data){
                this.ruleForm2.city=data.value;
            },
            selectArea2(data){
                this.ruleForm2.county=data.value;
            },
            remoteMethod(query) {


                console.log(this.schoolist);
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.schools = this.schoolist.filter(item => {
                            return item.label.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.schools = [];
                }
            },
            registerSchool(){
                this.$refs.ruleForm.validate((valid) => {
                    if(valid){
                       requestRegisterSchool(this.ruleForm).then(data=> {
                               console.log(data);
                               if (!data.succeed) {
                                   this.$message({
                                       message: data.codeMessage,
                                       type: 'error'
                                   });
                               } else {
                                   this.$message({
                                       message: '注册成功!',
                                       type: 'success'
                                   });
                                   this.$router.push({path: '/login'});
                               }
                           }
                       )
                    }
                });
            },

            registerInstitute(){
                if(this.ruleForm2.city=='市'){
                    this.ruleForm2.city=null;
                }
                if(this.ruleForm2.county=='区'){
                    this.ruleForm2.county=null;
                }
                this.$refs.ruleForm2.validate((valid) => {
                    if(valid){
                        requestRegisterInstitute(this.ruleForm2).then(data=> {
                                console.log(data);
                                if (!data.succeed) {
                                    this.$message({
                                        message: data.codeMessage,
                                        type: 'error'
                                    });
                                } else {
                                    this.$message({
                                        message: '注册成功!',
                                        type: 'success'
                                    });
                                    this.$router.push({path: '/login'});
                                }
                            }
                        )
                    }
                });
            },
            onSelected(data) {
                this.ruleForm.province=data.province.value;
                this.ruleForm.city=data.city.value;
                this.ruleForm.county=data.area.value;
                console.log(data)
            },
            onSelected2(data) {
                this.ruleForm2.province=data.province.value;
                this.ruleForm2.city=data.city.value;
                this.ruleForm2.county=data.area.value;
                console.log(data)
            },
            lastStep(){
              this.clickNextStep=false;
              this.activeName="first";
              this.seconddisable=true;
            },
            nextStep(){
                this.schoolist=[];
                this.$refs.ruleForm.validate((valid) => {
                    if(this.ruleForm.schoolPassword!=this.ruleForm.repeatPassword){
                        this.$message.error('两次输入密码不一致!');
                        return ;
                    }
                    if(valid){
                        this.clickNextStep=true;
                        this.activeName="second";
                        this.firstdisable=true;
                        console.log(this.allschool)

                        for(let i=0;i<this.allschool.length;i++){
                            let school ={
                                value:this.allschool[i].id,
                                label:this.allschool[i].schoolName
                            }
                            this.schoolist.push(school);
                        }
                    }
                });

            },
            nextStep2(){
                this.schoolist=[];
                this.$refs.ruleForm2.validate((valid) => {
                    if(this.ruleForm2.insPassword!=this.ruleForm2.repeatPassword){
                        this.$message.error('两次输入密码不一致!');
                        return ;
                    }
                    if(valid){
                        this.clickNextStep=true;
                        this.activeName="second";
                        this.firstdisable=true;
                        console.log(this.allschool)

                        for(let i=0;i<this.allschool.length;i++){
                            let school ={
                                value:this.allschool[i].id,
                                label:this.allschool[i].schoolName
                            }
                            this.schoolist.push(school);
                        }
                    }
                });

            },
            showlogin(){
                this.$router.push({ path: '/login' });
            },
            handleReset2() {
                this.$refs.ruleForm2.resetFields();
            },
            login(ev){

                var _this = this;
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        //_this.$router.replace('/table');
                        this.logining = true;
                        //NProgress.start();
                        var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };

                        var user={
                            name:"admin" ,
                            avatar:"123456"
                        }
                        sessionStorage.setItem('user', JSON.stringify(user));
                        this.$router.push({ path: '/superAdminInstituteManagement' });
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
            padding-left: 2rem;
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
            margin: 0px auto 40px auto;
            text-align: left;
            font-weight: bolder;
            font-size: 1.3rem;
            color: black;
        }
        .remember {
            margin: 0px 0px 10px 0px;
            color: #7980FA;
        }
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
        padding-left: 0.5rem;
    }
    .school-input{
        position: relative;
        height: 2rem;
        width: 100%;
        border-radius: 2rem;
        border-top: 1px;
        border-left: 1px;
        border-bottom: 1px;
        border-right: 1px;

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
            -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            width: 100%;
            left: 0% !important;
            position: relative !important;
        }
    }
    .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2), .el-tabs--bottom .el-tabs__item.is-top:nth-child(2), .el-tabs--top .el-tabs__item.is-bottom:nth-child(2), .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
        margin-left: 1rem;
    }
    .el-tabs--bottom .el-tabs__item.is-bottom:last-child, .el-tabs--bottom .el-tabs__item.is-top:last-child, .el-tabs--top .el-tabs__item.is-bottom:last-child, .el-tabs--top .el-tabs__item.is-top:last-child {

    }
    .el-tabs__item.is-active {
        color: #7980FA;
    }
    .el-tabs__active-bar {
        margin-left: 1rem;
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        background-color: #7980FA;
        z-index: 1;
        -webkit-transition: -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
        transition: -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
        transition: transform .3s cubic-bezier(.645,.045,.355,1);
        transition: transform .3s cubic-bezier(.645,.045,.355,1),-webkit-transform .3s cubic-bezier(.645,.045,.355,1);
        list-style: none;
    }
    el-tabs__active-bar is-top {
        width: 50%;
    }
    .el-tabs__item:hover {
        color: #7980FA;
        cursor: pointer;
    }
    .el-tabs__item.is-active {
        color: #7980FA;
    }
    .el-form-item {
        margin-bottom: 1rem;
    }
    .el-tabs el-tabs--top {
        margin-bottom: 5rem !important;
    }

    .distpicker-address-wrapper select {
        padding: .5rem .75rem;
        height: 40px;
        width: 30%;
        font-size: 0.8rem;
        line-height: 1.25;
        font-family: PingFang SC;
        color: #464a4c;
        background-color: #fff;
        background-image: none;
        -webkit-background-clip: padding-box;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 2rem;
        -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    }
    .select-school-name .el-input {
        width: 100%;
    }
    .maxgradeinput {
        width: 70%;
    }
    .el-input-number__decrease {
        margin-left: 2%;
        background: rgba(255,255,255,0);
        border-radius: 2rem;
        border: 0;
    }
    .el-input-number__increase {
        transform: translate(70%,0);
        background: rgba(255,255,255,0);
        border-radius: 2rem;
        border: 0;
    }
</style>
