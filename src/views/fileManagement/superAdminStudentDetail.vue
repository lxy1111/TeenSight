<template>
    <section>

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="个人信息" name="stuinfo"></el-tab-pane>
            <el-tab-pane label="屈光档案" name="sightdata" ></el-tab-pane>
            <el-tab-pane label="历史记录" name="history"></el-tab-pane>
        </el-tabs>
        <!--工具条-->
        <div class="retrieval  criteria Style">
            <el-form style="margin-top: 2rem;" :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
                <el-form-item label="姓名">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="学号">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="性别">
                    <el-radio-group v-model="editForm.sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="年级-班级">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="身份证号">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="家长姓名">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="家长手机号">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="身高（厘米）">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="体重（kg）">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
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
    import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

    export default {
        data() {
            return {
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

        },
        methods: {
            //性别显示转换

            handleClick(tab, event) {
                if(tab.name=='stuinfo'){

                }
                if(tab.name=='sightdata'){
                    this.$router.push({ path: '/'+this.path+'/'+this.path+'SightData' });
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
