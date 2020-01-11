<template>
    <section>

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="个人信息" name="stuinfo"></el-tab-pane>
            <el-tab-pane label="屈光档案" name="sightdata" ></el-tab-pane>
<!--            <el-tab-pane label="历史记录" name="history"></el-tab-pane>-->
        </el-tabs>
        <div v-if="showSight" class="retrieval  criteria Style">
            <el-form :model="record">
                <el-tabs v-model="selectTime" type="card" @tab-click="handleClick2">
                    <el-tab-pane v-if="showhistory" label="第一次" name="first"></el-tab-pane>
                    <el-tab-pane v-if="showhistory" label="第二次" name="second" ></el-tab-pane>
<!--                    <el-tab-pane v-if="!showhistory" label="最近一次" name="third"></el-tab-pane>-->
                    <el-form-item prop="planeOnlineDateSecond" >
                        <el-select size="small"   v-model="surveyName" placeholder="请选择普查">
                            <el-option
                                    v-for="item in surveyList"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item><el-button type="primary"  round @click="getRecordInfo">获取视力数据</el-button></el-form-item>
                    <el-form-item><el-button type="primary"  round @click="exportReport">导出报告</el-button></el-form-item>
                </el-tabs>

                <el-form-item label="采集日期">
                      {{record.inspectionDate}}
                    </el-form-item>


            <el-breadcrumb separator=">" class="bread-title">
                <el-breadcrumb-item>近视筛查</el-breadcrumb-item>
            </el-breadcrumb>

            <el-table
                    ref="multipleTable"
                    :data="shortsight"
                    stripe
                    border
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        prop="eyes"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="ucva"
                        label="裸眼视力"
                        show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column
                        prop="glassEyesight"
                        label="戴镜视力"
                        show-overflow-tooltip align="center">
                </el-table-column>
<!--                <el-table-column-->
<!--                        label="电脑验光(小瞳)"-->
<!--                        show-overflow-tooltip align="center">-->
<!--                    <el-table-column-->
<!--                            prop="pupilSphere"-->
<!--                            label="球镜"-->
<!--                            show-overflow-tooltip align="center"-->
<!--                    >-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                            prop="pupilCylinder"-->
<!--                            label="柱镜"-->
<!--                            show-overflow-tooltip align="center"-->
<!--                    >-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                            prop="pupilAxial"-->
<!--                            label="轴向"-->
<!--                            show-overflow-tooltip align="center"-->
<!--                    >-->
<!--                    </el-table-column>-->
<!--                </el-table-column>-->
            </el-table>


            <br>

            <el-breadcrumb separator=">" class="bread-title">
                <el-breadcrumb-item>屈光筛查</el-breadcrumb-item>
            </el-breadcrumb>
            <el-table
                    ref="multipleTable"
                    :data="lightcheck"
                    stripe
                    border
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        prop="eyes"
                        align="center">
                </el-table-column>
<!--                <el-table-column-->
<!--                        label="睫状肌麻痹后电脑验光"-->
<!--                        show-overflow-tooltip align="center">-->


                    <el-table-column
                            prop="pupilSphere"
                            label="球镜"
                            show-overflow-tooltip align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="pupilCylinder"
                            label="柱镜"
                            show-overflow-tooltip align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="pupilAxial"
                            label="轴位"
                            show-overflow-tooltip align="center"
                    >
                    </el-table-column>
                <el-table-column
                        prop="distance"
                        label="瞳距"
                        show-overflow-tooltip align="center"
                >

                </el-table-column>
                <el-table-column
                        prop="diopter"
                        label="等效球镜"
                        show-overflow-tooltip align="center"
                >

                </el-table-column>

<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        label="睫状肌麻痹验光(人工检影)"-->
<!--                        show-overflow-tooltip align="center">-->
<!--                    <el-table-column-->
<!--                            prop="manualSphere"-->
<!--                            label="球镜"-->
<!--                            show-overflow-tooltip align="center"-->
<!--                    >-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                            prop="manualCylinder"-->
<!--                            label="柱镜"-->
<!--                            show-overflow-tooltip align="center"-->
<!--                    >-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                            prop="manualCva"-->
<!--                            label="轴向"-->
<!--                            show-overflow-tooltip align="center"-->
<!--                    >-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                            label="矫正视力"-->
<!--                            prop="manualAxial"-->
<!--                            show-overflow-tooltip align="center"-->
<!--                    >-->
<!--                    </el-table-column>-->
<!--                </el-table-column>-->
            </el-table>
            <br>
                <el-breadcrumb separator=">" class="bread-title">
                    <el-breadcrumb-item>角膜曲率</el-breadcrumb-item>
                </el-breadcrumb>
            <el-table
                    ref="multipleTable"
                    :data="lightcheck2"
                    stripe
                    border
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        prop="eyes"
                        align="center">
                </el-table-column>
<!--                <el-table-column-->
<!--                        prop="axial"-->
<!--                        label="眼轴"-->
<!--                        show-overflow-tooltip align="center">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="pressure"-->
<!--                        label="眼压"-->
<!--                        show-overflow-tooltip align="center">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        label="角膜曲率"-->
<!--                        show-overflow-tooltip align="center">-->
<!--                    <el-table-column-->
<!--                            prop="k1Axial"-->
<!--                            label="曲率（K1）"-->
<!--                            show-overflow-tooltip align="center"-->
<!--                    >-->
<!--                    </el-table-column>-->
                    <el-table-column
                            prop="k1Curvature"
                            label="曲率（R1）"
                            show-overflow-tooltip align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="k2Curvature"
                            label="曲率（R2）"
                            show-overflow-tooltip align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="axial"
                            label="轴位"
                            show-overflow-tooltip align="center"
                    >
                    </el-table-column>
<!--                </el-table-column>-->
            </el-table>
            </el-form>
        </div>
        <!--工具条-->
        <div v-if="showDetail" class="retrieval  criteria Style">
            <el-form style="margin-top: 2rem;" :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
                <el-form-item label="姓名">
                    <el-input :disabled="isAdmin" v-model="editForm.stuName" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="学号">
                    <el-input :disabled="isAdmin" v-model="editForm.number" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="性别">
                    <el-radio-group :disabled="isAdmin" v-model="editForm.sex">
                        <el-radio class="radio" :label="0">男</el-radio>
                        <el-radio class="radio" :label="1">女</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="年级">
                    <el-input :disabled="isAdmin" v-model="editForm.gradeNo" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否毕业">
                    <el-input :disabled="isAdmin" v-model="editForm.remark" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="班级">
                    <el-input :disabled="isAdmin" v-model="editForm.classNo" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="身份证号">
                    <el-input :disabled="isAdmin" v-model="editForm.idCard" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="家长姓名">
                    <el-input :disabled="isAdmin" v-model="editForm.parentName" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="家长手机号">
                    <el-input :disabled="isAdmin" v-model="editForm.parentPhone" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="身高（厘米）">
                    <el-input :disabled="isAdmin" v-model="editForm.height" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="体重（kg）">
                    <el-input :disabled="isAdmin" v-model="editForm.weight" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" align="center" class="dialog-footer">
<!--                <el-button @click.native="editFormVisible = false">返回</el-button>-->
                <el-button type="primary" v-if="!isAdmin" @click.native="editSubmit" :loading="editLoading">保存</el-button>
            </div>

        </div>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import {
        getUserListPage,
        removeUser,
        batchRemoveUser,
        editUser,
        addUser,
        getStudentDetail,
        getRecordList, modifyStudents, getSurveyList, getPersonalReport, getDeletedStudentDetail, getAllSurveyNameList
    } from '../../api/api';

    export default {
        data() {
            return {
                schoolId:null,
                surveyName:null,
                surveyList:[],
                recordList:[],
                showhistory:false,
                selectTime:'',
                showSight:false,
                showDetail:true,
                path:'',
                hideedit:false,
                activeName: 'stuinfo',
                filters: {
                    name: ''
                },
                selectForm:{
                  page:1,
                  pageSize:100000,
                  schoolId:null,
                },
                stuId:null,
                gender:[{
                    label:'男',
                    value:'男'
                },
                    {
                        label:'女',
                        value:'女'
                    },
                    {
                        label:'未知',
                        value:'未知'
                    },
                    {
                        label:'性别-全部',
                        value:'性别-全部'
                    }
                ],
                sightInfo:[],
                isAdmin:false,
                gendervalue: '性别-全部',
                users: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: '',
                    schoolId:1
                },
               shortsight : [{
                    eyes: '左眼',
                   ucva:'',
                   pupilSphere:'',
                   pupilCylinder:'',
                   pupilAxial:''

                }, {
                    eyes: '右眼',
                   ucva:'',
                   pupilSphere:'',
                   pupilCylinder:'',
                   pupilAxial:''

               }],
                lightcheck : [{
                    eyes: '左眼',
                    manualSphere:'',
                    manualCylinder:'',
                    manualCva:'',
                    manualAxial:'',
                    computerSphere:'',
                    computerCylinder:'',
                    computerAxial:'',
                    pupilSphere:'',
                    pupilCylinder:'',
                    pupilAxial:'',
                    axial:'',
                    distance:'',
                    diopter: ''

                }, {
                    eyes: '右眼',
                    manualSphere:'',
                    manualCylinder:'',
                    manualCva:'',
                    manualAxial:'',
                    computerSphere:'',
                    computerCylinder:'',
                    computerAxial:'',
                    pupilSphere:'',
                    pupilCylinder:'',
                    pupilAxial:'',
                    axial:'',
                    distance:'',
                    diopter: ''

                }],
                form:{
                    classes:'',
                    gender: '',
                    version:'',
                    versionStatus:'',
                    planeOnlineDateFirst:'',
                    planeOnlineDateSecond:'',
                    actualOnlineDateFirst:'',
                    actualOnlineDateSecond:'',
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },

                lightcheck2: [{
                    eyes: '左眼',
                    axial:'',
                   pressure:'',
                  k1Axial:'',
                 k1Curvature:'',
                k2Axial:'',
                 k2Curvature:'',
                    axial:''

                }, {
                    eyes: '右眼',
                    axial:'',
                    pressure:'',
                    k1Axial:'',
                    k1Curvature:'',
                    k2Axial:'',
                    k2Curvature:'',
                    axial:''
                }],
                //新增界面数据
                addForm: {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                },
                inspectiondate:'',
                record:{
                    inspectionDate:''
                }

            }
        },
        mounted(){
            var user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                if(user.type==0){
                    this.path='superAdmin';
                    this.hideedit=false;
                    this.isAdmin=true;
                }
                else if(user.type==1||user.type==2){
                    this.path='institute';
                    this.hideedit=true;
                    this.isAdmin=true;
                }
                else {
                    var school=sessionStorage.getItem('schoolinfo');
                    school=JSON.parse(school);
                    this.schoolId=school.schoolId;
                    this.path='school';
                }
            }
            let id=this.$route.query.id;
            let type=this.$route.query.type;
            this.stuId=id;
           let para={
               id:id
           }

           let para2={
               studentId:id,
               surveyName:this.surveyName
           }
           let para3={
               studentId:id,
               page:1,
               pageSize:100000
           }
           if(type==1){
               getAllSurveyNameList(para3).then(res=>{
                   let allsurveys=res.data.result;
                   this.surveyList=[];
                   for(let i=0;i<allsurveys.length;i++){
                       let survey ={
                           value:allsurveys[i],
                           label:allsurveys[i]
                       }
                       this.surveyList.push(survey);
                   }

               })
               getDeletedStudentDetail(para).then((res)=>{
                   this.editForm=res.data.result;
               })

           }else {
               getSurveyList(para3).then(res => {
                   let allsurveys = res.data.result.items;
                   this.surveyList = [];
                   for (let i = 0; i < allsurveys.length; i++) {
                       let survey = {
                           value: allsurveys[i].surveyName,
                           label: allsurveys[i].surveyName
                       }
                       this.surveyList.push(survey);
                   }

               })
               getStudentDetail(para).then((res) => {
                   this.editForm = res.data.result;
               })
           }
            // getSurveyList(this.selectForm).then(res=>{
            //     this.allsurveys=res.data.result.items;
            //     this.surveylist=[];
            //     for(let i=0;i<this.allsurveys.length;i++){
            //         let survey ={
            //             value:this.allsurveys[i].surveyName,
            //             label:this.allsurveys[i].surveyName
            //         }
            //         this.surveylist.push(survey);
            //     }
            //
            // })
            // getRecordList(para2).then((res)=>{
            //     if(res.data.result.length!=0) {
            //         this.recordList = res.data.result;
            //         this.record = this.recordList[0];
            //         this.importdata();
            //     }
            // })

        },
        methods: {
            //性别显示转换


            getRecordInfo(){
                let para2={
                    studentId:this.stuId,
                    surveyName:this.surveyName
                }
                getRecordList(para2).then((res)=>{
                    if(!res.data.succeed){
                        this.$message({
                            type:'error',
                            message:res.data.codeMessage
                        })
                    }
                    if(res.data.result.length!=0) {
                        this.recordList = res.data.result;
                        this.record = this.recordList[0];
                        this.importdata();
                    }
                })

            },


            exportReport(){
                if(this.surveyName==null){
                    this.$message({
                        type:'error',
                        message:'请选择普查'
                    })
                    return;
                }
                let para={
                    studentId:this.stuId,
                    surveyName:this.surveyName
                }
              getPersonalReport(para).then(res=>{
                console.log(res.data);
                  const blob = new Blob([res.data]);//处理文档流
                  const fileName = this.editForm.stuName+'视力报告.pdf';
                  const elink = document.createElement('a');
                  elink.download = fileName;
                  elink.style.display = 'none';
                  elink.href = URL.createObjectURL(blob);
                  document.body.appendChild(elink);
                  elink.click();
                  URL.revokeObjectURL(elink.href); // 释放URL 对象
                  document.body.removeChild(elink);

              })


            },

            importdata(){
                this.shortsight[0].ucva=this.record.result[0].ucva;
                this.shortsight[0].pupilAxial=this.record.result[0].pupilAxial;
                this.shortsight[0].pupilCylinder=this.record.result[0].pupilCylinder;
                this.shortsight[0].pupilSphere=this.record.result[0].pupilSphere;
                this.shortsight[0].glassEyesight=this.record.result[0].glassEyesight;
                this.shortsight[1].ucva=this.record.result[1].ucva;
                this.shortsight[1].pupilAxial=this.record.result[1].pupilAxial;
                this.shortsight[1].pupilCylinder=this.record.result[1].pupilCylinder;
                this.shortsight[1].pupilSphere=this.record.result[1].pupilSphere;
                this.shortsight[1].glassEyesight=this.record.result[1].glassEyesight;

                this.lightcheck[0].manualSphere=this.record.result[0].manualSphere;
                this.lightcheck[0].manualCylinder=this.record.result[0].manualCylinder;
                this.lightcheck[0].manualCva=this.record.result[0].manualCva;
                this.lightcheck[0].manualAxial=this.record.result[0].manualAxial;
                this.lightcheck[0].computerSphere=this.record.result[0].computerSphere;
                this.lightcheck[0].computerCylinder=this.record.result[0].computerCylinder;
                this.lightcheck[0].computerAxial=this.record.result[0].computerAxial;
                this.lightcheck[0].pupilSphere=this.record.result[0].pupilSphere;
                this.lightcheck[0].pupilCylinder=this.record.result[0].pupilCylinder;
                this.lightcheck[0].pupilAxial=this.record.result[0].pupilAxial;
                this.lightcheck[0].distance=this.record.result[0].distance;
                this.lightcheck[0].diopter=this.record.result[0].diopter;

                this.lightcheck[1].manualSphere=this.record.result[1].manualSphere;
                this.lightcheck[1].manualCylinder=this.record.result[1].manualCylinder;
                this.lightcheck[1].manualCva=this.record.result[1].manualCva;
                this.lightcheck[1].manualAxial=this.record.result[1].manualAxial;
                this.lightcheck[1].computerSphere=this.record.result[1].computerSphere;
                this.lightcheck[1].computerCylinder=this.record.result[1].computerCylinder;
                this.lightcheck[1].computerAxial=this.record.result[1].computerAxial;
                this.lightcheck[1].pupilSphere=this.record.result[1].pupilSphere;
                this.lightcheck[1].pupilCylinder=this.record.result[1].pupilCylinder;
                this.lightcheck[1].pupilAxial=this.record.result[1].pupilAxial;
                this.lightcheck[1].distance=this.record.result[1].distance;
                this.lightcheck[1].diopter=this.record.result[1].diopter;


                this.lightcheck2[0].axial=this.record.result[0].axial;
                this.lightcheck2[0].pressure=this.record.result[0].pressure;
                this.lightcheck2[0].k1Axial=this.record.result[0].k1Axial;
                this.lightcheck2[0].k1Curvature=this.record.result[0].k1Curvature;
                this.lightcheck2[0].k2Axial=this.record.result[0].k2Axial;
                this.lightcheck2[0].k2Curvature=this.record.result[0].k2Curvature;
                this.lightcheck2[0].axial=this.record.result[0].axial;



                this.lightcheck2[1].axial=this.record.result[1].axial;
                this.lightcheck2[1].pressure=this.record.result[1].pressure;
                this.lightcheck2[1].k1Axial=this.record.result[1].k1Axial;
                this.lightcheck2[1].k1Curvature=this.record.result[1].k1Curvature;
                this.lightcheck2[1].k2Axial=this.record.result[1].k2Axial;
                this.lightcheck2[1].k2Curvature=this.record.result[1].k2Curvature;
                this.lightcheck2[1].axial=this.record.result[1].axial;


            },

            handleClick(tab, event) {
                if(tab.name=='stuinfo'){
                    this.showDetail=true;
                    this.showSight=false;
                    this.showhistory=false;
                }
                if(tab.name=='sightdata'){
                    this.showDetail=false;
                    this.showSight=true;
                    this.showhistory=false;
                    this.selectTime='third';
                    // this.$router.push({ path: '/'+this.path+'/'+this.path+'SightData' });
                }
                if(tab.name=='history'){
                    this.showDetail=false;
                    this.showSight=true;
                    this.showhistory=true;
                    this.selectTime='first';
                }
            },
            handleClick2(tab, event) {
                if(tab.name=='first'){
                    if(this.recordList[0]!=null) {
                        this.record = this.recordList[0];
                    }
                }
                if(tab.name=='second'){
                    if(this.recordList[1]!=null) {
                        this.record = this.recordList[1];
                    }
                }
                if(tab.name=='third'){
                    if(this.recordList[2]!=null) {
                        this.record = this.recordList[2];
                    }
                }
                this.importdata();
            },
            formatSex: function (row, column) {
                return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            //获取用户列表
            getUsers() {
                let para = {
                    page: this.page,
                    name: this.filters.name
                };
                this.listLoading = true;
                //NProgress.start();
                getUserListPage(para).then((res) => {
                    this.total = res.data.total;
                    this.users = res.data.users;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { id: row.id };
                    removeUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                };
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            this.editForm.schoolId=this.schoolId;
                            let para = Object.assign({}, this.editForm);
                            modifyStudents(para).then((res) => {
                                this.editLoading = false;
                                //NProgress.done();
                                if(res.succeed!=true){
                                    this.$message({
                                        message: res.codeMessage,
                                        type: 'error'
                                    });
                                }else {
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                }
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getUsers();
                            });
                        });
                    }
                });
            },
            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.addForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            addUser(para).then((res) => {
                                this.addLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getUsers();
                            });
                        });
                    }
                });
            },


            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除

        }
    }

</script>

<style>
    .bread-title {
        margin-bottom: 20px;
        margin-left: 20px;
    }
    .Style{
        margin-left: 0px;
        padding: 10px;
        padding-left: 0;
        padding-right: 0;
        border: 0px solid #d1dbe5;
        border-radius: 20px;
        background-color: #fff;
        overflow: hidden;

    }
    .el-tabs--card>.el-tabs__header {
        border-bottom: 0px solid #E4E7ED !important;
    }
    .el-tabs__header {
        padding: 0;
        position: relative;
        margin: 0px 0 0px;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__nav {
        border: 0px solid #E4E7ED;
        border-bottom: none;
        border-radius: 4px 4px 0 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .Style[data-v-45538424] {
        margin-left: 0px;
        padding: 10px;
        border: 0px solid #d1dbe5 !important;
        border-radius: 20px;
        background-color: #fff;
        overflow: hidden;
    }
    .el-form-item__label {
        text-align: center !important;
        vertical-align: middle;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 0px 0 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .el-button {
        border-radius: 2rem;
    }
</style>
