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
        <!--列表-->


        <!--工具条-->

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="editForm.sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input type="textarea" v-model="editForm.addr"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="addForm.sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input type="textarea" v-model="addForm.addr"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

    export default {
        data() {
            return {
                activeName: 'sightdata',
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
                   this.$router.push({ path: '/superAdminStudentDetail' });
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
            batchRemove: function () {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { ids: ids };
                    batchRemoveUser(para).then((res) => {
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
            }
        },
        mounted() {
            this.getUsers();
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
