<template>
    <section>

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="个人信息" name="stuinfo"></el-tab-pane>
            <el-tab-pane label="屈光档案" name="sightdata" ></el-tab-pane>
            <el-tab-pane label="历史记录" name="history"></el-tab-pane>
        </el-tabs>
        <!--工具条-->
        <div class="retrieval  criteria Style">
            <el-row type="flex" >
                <el-form :inline="true" :model="filters">
                    <el-form-item label="搜索学生姓名">
                    </el-form-item>
                    <el-form-item>
                        <el-select
                                v-model="value"
                                multiple
                                filterable
                                remote
                                reserve-keyword
                                placeholder="输入学生姓名搜索"
                                :remote-method="remoteMethod"
                                :loading="loading">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-row>
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
        methods: {
            //性别显示转换

            handleClick(tab, event) {
                if(tab.name=='stuinfo'){

                }
                if(tab.name=='sightdata'){
                    this.$router.push({ path: '/superAdminSightData' });
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

<style scoped>
    .bread-title {
        margin-bottom: 20px;
        margin-left: 20px;
    }
    .Style{
        margin-left: 0px;
        padding: 10px;
        border: 1px solid #d1dbe5;
        border-radius: 20px;
        background-color: #fff;
        overflow: hidden;

    }


</style>
