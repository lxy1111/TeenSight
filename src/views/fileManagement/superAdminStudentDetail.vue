<template>
    <section>

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="个人信息" name="stuinfo"></el-tab-pane>
            <el-tab-pane label="屈光档案" name="sightdata" ></el-tab-pane>
            <el-tab-pane label="历史记录" name="history"></el-tab-pane>
        </el-tabs>
        <div v-if="showSight" class="retrieval  criteria Style">
            <el-row type="flex" >
                <el-form :inline="true" :model="filters">
                    <el-form-item label="采集日期">
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row type="flex" >
                <el-form :inline="true" :model="filters">
                    <el-form-item label="第一次">
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="第二次">
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="第三次">
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-form>
            </el-row>

            <el-breadcrumb separator=">" class="bread-title">
                <el-breadcrumb-item>近视筛查</el-breadcrumb-item>
            </el-breadcrumb>

            <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    stripe
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        prop="eyes"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="裸眼视力"
                        show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="戴镜远视力"
                        show-overflow-tooltip align="center">
                    <el-table-column
                            label="戴镜类型"
                            show-overflow-tooltip align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            label="视力"
                            show-overflow-tooltip align="center"
                    >
                    </el-table-column>
                </el-table-column>

                <el-table-column
                        prop="address"
                        label="电脑验光(小瞳)"
                        show-overflow-tooltip align="center">
                    <el-table-column
                            label="球镜"
                            show-overflow-tooltip align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            label="柱镜"
                            show-overflow-tooltip align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            label="轴向"
                            show-overflow-tooltip align="center"
                    >
                    </el-table-column>
                </el-table-column>
            </el-table>


            <br>

            <el-breadcrumb separator=">" class="bread-title">
                <el-breadcrumb-item>屈光筛查</el-breadcrumb-item>
            </el-breadcrumb>
            <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    stripe
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        prop="eyes"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="睫状肌麻痹后电脑验光"
                        show-overflow-tooltip align="center">


                    <el-table-column
                            label="球镜"
                            show-overflow-tooltip align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            label="柱镜"
                            show-overflow-tooltip align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            label="轴向"
                            show-overflow-tooltip align="center"
                    >
                    </el-table-column>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="睫状肌麻痹验光(人工检影)"
                        show-overflow-tooltip align="center">
                    <el-table-column
                            label="球镜"
                            show-overflow-tooltip align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            label="柱镜"
                            show-overflow-tooltip align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            label="轴向"
                            show-overflow-tooltip align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            label="矫正视力"
                            show-overflow-tooltip align="center"
                    >
                    </el-table-column>
                </el-table-column>
            </el-table>
            <br>
            <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    border
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        prop="eyes"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="眼轴"
                        show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="眼压"
                        show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="角膜曲率"
                        show-overflow-tooltip align="center">
                    <el-table-column
                            label="曲率（K1）"
                            show-overflow-tooltip align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            label="轴向（K1）"
                            show-overflow-tooltip align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            label="曲率（K2）"
                            show-overflow-tooltip align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            label="轴向（K2）"
                            show-overflow-tooltip align="center"
                    >
                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
        <!--工具条-->
        <div v-if="showDetail" class="retrieval  criteria Style">
            <el-form style="margin-top: 2rem;" :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
                <el-form-item label="姓名">
                    <el-input v-model="editForm.stuName" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="学号">
                    <el-input v-model="editForm.number" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="性别">
                    <el-radio-group v-model="editForm.sex">
                        <el-radio class="radio" :label="0">男</el-radio>
                        <el-radio class="radio" :label="1">女</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="年级-班级">
                    <el-input v-model="editForm.gradeNo+'-'+editForm.classNo" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="身份证号">
                    <el-input v-model="editForm.idCard" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="家长姓名">
                    <el-input v-model="editForm.parentName" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="家长手机号">
                    <el-input v-model="editForm.parentPhone" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="身高（厘米）">
                    <el-input v-model="editForm.height" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="体重（kg）">
                    <el-input v-model="editForm.weight" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" align="center" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">返回</el-button>
                <el-button type="primary" v-if="!hideedit" @click.native="editSubmit" :loading="editLoading">保存</el-button>
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
        getRecordList
    } from '../../api/api';

    export default {
        data() {
            return {
                recordList:[],
                showSight:false,
                showDetail:true,
                path:'',
                hideedit:false,
                activeName: 'stuinfo',
                filters: {
                    name: ''
                },
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
                    addr: ''
                },
                tableData3: [{
                    eyes: '右眼',
                    name: '王小虎',
                }, {
                    eyes: '左眼',
                    name: '王小虎',
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
                //新增界面数据
                addForm: {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
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
                }
                else if(user.type==1){
                    this.path='institute';
                    this.hideedit=true;
                }
                else if(user.type==2){
                    this.path='school';
                    this.hideedit=true;
                }
            }
            let id=this.$route.query.id;
           let para={
               id:id
           }
           let para2={
               studentId:id
           }
            getStudentDetail(para).then((res)=>{
                this.editForm=res.data.result;
            })
            getRecordList(para2).then((res)=>{
                this.recordList=res.data.result;
            })

        },
        methods: {
            //性别显示转换

            handleClick(tab, event) {
                if(tab.name=='stuinfo'){
                    this.showDetail=true;
                    this.showSight=false;
                }
                if(tab.name=='sightdata'){
                    this.showDetail=false;
                    this.showSight=true;
                    // this.$router.push({ path: '/'+this.path+'/'+this.path+'SightData' });
                }
                if(tab.name=='history'){

                }
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
                            let para = Object.assign({}, this.editForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            editUser(para).then((res) => {
                                this.editLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
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
