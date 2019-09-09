<template>
    <section>
        <!--工具条-->
        <div class="retrieval  criteria Style">
            <el-form :inline="true" :model="selectForm">
                <el-form-item>
                    <el-input style="width: 50%;" placeholder="请输入机构名称" v-model.trim="selectForm.institutionName"></el-input>
                </el-form-item>
                <el-form-item>
                    <v-distpicker @selected="onSelected" :province="selectForm.province" :city="selectForm.city" :area="selectForm.county"  @province="selectProvince" @city="selectCity" @area="selectArea" ></v-distpicker>
                </el-form-item>
                <el-form-item><el-button type="primary" round @click="handleselect">搜索</el-button></el-form-item>
                <el-form-item><el-button type="primary" round @click="handleReset">重置</el-button></el-form-item>
            </el-form>

            <div class="retrieval  criteria Style">
                <el-table
                        ref="multipleTable"
                        :data="institutes"
                        stripe
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="">
                    <el-table-column
                            prop="institutionName"
                            label="机构名称"
                            show-overflow-tooltip
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="principal"
                            label="负责人"
                            show-overflow-tooltip align="center">
                    </el-table-column>
                    <el-table-column
                            prop="mobile"
                            label="联系电话"
                            show-overflow-tooltip align="center">
                    </el-table-column>
                    <el-table-column
                            prop="county"
                            label="位置"
                            show-overflow-tooltip align="center">
                        <template slot-scope="scope">
                            {{scope.row.province+scope.row.city+scope.row.county+scope.row.address}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="account"
                            label="机构账号"
                            show-overflow-tooltip align="center">
                    </el-table-column>
                    <el-table-column
                            prop="audit"
                            label="状态"
                            show-overflow-tooltip align="center">
                        <template slot-scope="scope">
                            <el-button  :disabled="scope.row.audit==0 ? false : true"  :type="scope.row.audit === 0 ? 'danger' : 'success'"
                                       effect="dark" @click="auditInstitute(scope.$index,scope.row)">
                                {{scope.row.audit==0 ? '未认证' : '已认证'}}
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="id"
                            label="操作"
                            show-overflow-tooltip align="center">
                        <template slot-scope="scope">
<!--                            <el-link style="color: #7980FA; margin-right: 1rem;" size="small" @click="handleShow(scope.$index, scope.row)">详情</el-link>-->
                            <el-link style="color: #7980FA; margin-right: 1rem;" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-link>
                            <el-link style="color: #7980FA; margin-right: 1rem;" size="small"  @click="handleDel(scope.$index, scope.row)">删除</el-link>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
                </el-pagination>
            </div>
        </div>

        <!--工具条-->


        <!--编辑界面-->
        <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="机构名称">
                    <el-input   v-model="editForm.insName" auto-complete="off" :disabled="editable"></el-input>
                </el-form-item>

                <el-form-item label="负责人">
                    <el-input  v-model="editForm.principal" auto-complete="off" :disabled="editable"></el-input>
                </el-form-item>

                <el-form-item label="联系电话">
                    <el-input  v-model="editForm.mobile" auto-complete="off" :disabled="editable"></el-input>
                </el-form-item>

                <el-form-item label="所在位置">
                    <v-distpicker :disabled="editable" @province="selectProvince2" @city="selectCity2" @area="selectArea2" :province="editForm.province" :city="editForm.city" :area="editForm.county" @selected="onSelected2"></v-distpicker>
                </el-form-item>

                <el-form-item label="所含学校" >
                    <el-select :disabled="editable"
                                            v-model="schoolsIDList"
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

                <el-form-item label="详细地址">
                    <el-input  :disabled="editable" v-model="editForm.address" auto-complete="off"> </el-input>
                </el-form-item>


                <el-form-item label="登陆账号">
                    <el-input  v-model="editForm.insAccount" auto-complete="off" :disabled="editable"></el-input>
                </el-form-item>

                <el-form-item label="登陆密码">
                    <el-input v-model="editForm.insPassword" auto-complete="off" :disabled="editable"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" v-if="!editable" @click.native="editSubmit" :loading="editLoading">修改</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="机构名称" prop="insName">
                    <el-input v-model="addForm.insName" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="负责人">
                    <el-input v-model="addForm.principal" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="登录账号">
                    <el-input v-model="addForm.insAccount" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="登录密码">
                    <el-input v-model="addForm.insPassword" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="联系电话">
                    <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="所在地区">
                    <v-distpicker @selected="onSelected1"></v-distpicker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">返回</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">保存</el-button>
            </div>
        </el-dialog>
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
        getInstitutionList,
        addInstitutes, getInstituteDetail, removeInstitute, getSchoolListPage, editInstitutes
    } from '../../api/api';
    import VDistpicker from 'v-distpicker'
    export default {
        components:{
            VDistpicker
        },
        data() {
            return {
                selectForm:{
                    page:1,
                    pageSize:10,
                    type:2,
                    institutionName:null,
                    county:null,
                    city:null,
                    province:null
                },
                schoolist:[],
                allschool:[],
                schools:[],
                disabledelete:false,
                editable: true,
                options: [{
                    value: '1',
                    label: '政府机构'
                }, {
                    value: '2',
                    label: '筛查机构'
                }],
                institutes:[
                ],
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
                schoolsNameList:[],
                schoolsIDList:[],
                gendervalue: '性别-全部',
                users: [],
                total: 0,
                page: 1,
                loading:false,
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
                    city: "",
                    county: "",
                    insAccount: "",
                    insName: "",
                    insPassword: "",
                    mobile: "",
                    principal: "",
                    province: "",
                    type: "",
                    schoolList:"",
                    schoolNames:'',
                    id:''
                },

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
                    insName: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },
                //新增界面数据
                addForm: {
                    city: "",
                    county: "",
                    insAccount: "",
                    insName: "",
                    insPassword: "",
                    mobile: "",
                    principal: "",
                    province: "",
                    type: 1
                }

            }
        },
        methods: {
            handleReset(){
                this.selectForm.institutionName=null;
                this.selectForm.province=null;
                this.selectForm.city=null;
                this.selectForm.county=null;
            },
            handleselect(){
                if(this.selectForm.institutionName==''){
                    this.selectForm.institutionName=null;
                }
                if(this.selectForm.province=='省'){
                    this.selectForm.province=null;
                }
                if(this.selectForm.city=='市'){
                    this.selectForm.city=null;
                }
                if(this.selectForm.county=='区'){
                    this.selectForm.county=null;
                }
                getInstitutionList(this.selectForm).then((res)=>{
                    this.institutes=res.data.result.items;
                    this.total=res.data.result.totalNum;
                })
            },
            auditInstitute:function(index,row){
                if(row.audit==0){
                    this.$confirm('确认要通过审核吗?', '提示', {
                        type: 'warning'
                    }).then(()=>{
                        let detail = Object.assign({}, row);
                        let id=detail.id;
                        let para={
                            id:id
                        }
                        getInstituteDetail(para)
                            .then(res => {
                                console.log(res);
                                this.editForm=res.data.result;
                                //  this.editForm.schooist=[];
                                // for(let i=0;i<res.data.result.schoolList.length;i++){
                                //     this.editForm.schoolList.push(res.data.result.schoolList[i].id);
                                // }
                                console.log(this.editForm);
                                let school=this.editForm.schoolList;
                                console.log(school);
                                console.log(this.editForm)
                                this.editForm.audit=1;
                                editInstitutes(this.editForm).then((res)=>{
                                    console.log(res);
                                    if(res.result==true) {
                                        this.$message({
                                            message: '审核成功',
                                            type: 'success'
                                        })
                                        this.getInstitutionList();
                                    }
                                    else{
                                        this.$message({
                                            message:'审核失败',
                                            type:'error'
                                        })
                                    }
                                })
                                //this.myInfo = successResponse.data.datas[0];
                            })
                            .catch(failResponse => {
                                console.log("fail");
                            });



                    })
                }
            },
            selectProvince(data){
                this.selectForm.province=data.value;
                console.log(data);
            },
            selectCity(data){
                this.selectForm.city=data.value;
            },
            selectArea(data){
                this.selectForm.county=data.value;
            },
            selectProvince2(data){
                this.editForm.province=data.value;
                console.log(data);
            },
            selectCity2(data){
                this.editForm.city=data.value;
            },
            selectArea2(data){
                this.editForm.county=data.value;
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
            onSelected(data) {
                this.selectForm.province=data.province.value;
                this.selectForm.city=data.city.value;
                this.selectForm.county=data.area.value;
                console.log(data)
            },
            onSelected1(data) {
                this.addForm.province=data.province.value;
                this.addForm.city=data.city.value;
                this.addForm.county=data.area.value;
                console.log(data)
            },
            onSelected2(data) {
                this.editForm.province=data.province.value;
                this.editForm.city=data.city.value;
                this.editForm.county=data.area.value;
                console.log(data)
            },
            //性别显示转换
            formatSex: function (row, column) {
                return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
            },
            handleCurrentChange(val) {
                this.page = val;
                this.selectForm.page=this.page;
                getInstitutionList(this.selectForm).then((res)=>{
                    this.institutes=res.data.result.items;
                })
            },

            getInstitutionList(){
                let para = {
                    page: this.page,
                    pageSize: 10,
                    type: 2
                };
                this.listLoading = true;
                console.log("hihihi");
                // 发送请求:将数据返回到一个回到函数中
                // 并且响应成功以后会执行then方法中的回调函数


                getInstitutionList(para)
                    .then(res => {
                        console.log("login get success");
                        console.log(res);
                        this.institutes=res.data.result.items;
                        this.total=res.data.result.totalNum;
                        //this.myInfo = successResponse.data.datas[0];
                    })
                    .catch(failResponse => {
                        console.log("login get fail");
                    });
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
                    let para = { codeList: [row.id] };
                    removeInstitute(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getInstitutionList();
                    });
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editable=false;
                this.schoolist=[];
                let para1={
                    page:1,
                    pageSize:100000000
                };
                getSchoolListPage(para1)
                    .then(res => {
                        console.log("login get success");
                        console.log(res);
                        this.allschool=res.data.result.items;
                        //this.myInfo = successResponse.data.datas[0];
                        for(let i=0;i<this.allschool.length;i++){
                            let school ={
                                value:this.allschool[i].id,
                                label:this.allschool[i].schoolName
                            }
                            this.schoolist.push(school);
                        }
                    })
                    .catch(failResponse => {
                        console.log("login get fail");
                    });



                let detail = Object.assign({}, row);
                let id=detail.id;
                let para={
                    id:id
                }
                getInstituteDetail(para)
                    .then(res => {
                        console.log(res);
                        this.editForm=res.data.result;
                        //  this.editForm.schooist=[];
                        // for(let i=0;i<res.data.result.schoolList.length;i++){
                        //     this.editForm.schoolList.push(res.data.result.schoolList[i].id);
                        // }
                        console.log(this.editForm);
                        let school=this.editForm.schoolList;
                        console.log(school);
                        this.editForm.schoolList=[];
                        let schoollist=[];
                        this.schoolsNameList=[];
                        this.schoolsIDList=[];
                        for(let i=0;i<school.length;i++){
                            let school2={
                                id:school[i].id,
                                schoolName:school[i].schoolName
                            }
                            schoollist.push(school2);
                            let school3={
                                value:school[i].id,
                                label:school[i].schoolName
                            }
                            this.schoolsNameList.push(school[i].schoolName);
                            this.schoolsIDList.push(school[i].id);
                        }

                        this.editForm.schoolList=schoollist;
                        console.log(this.editForm)

                        //this.myInfo = successResponse.data.datas[0];
                    })
                    .catch(failResponse => {
                        console.log("fail");
                    });
            },


            handleShow: function (index, row) {
                this.schoolist=[];
                for(let i=0;i<this.allschool.length;i++){
                    let school ={
                        value:this.allschool[i].id,
                        label:this.allschool[i].schoolName
                    }
                    this.schoolist.push(school);
                }


                this.editFormVisible = true;
                this.editable=true;
                let detail = Object.assign({}, row);
                let id=detail.id;
                let para={
                    id:id
                }
                getInstituteDetail(para)
                    .then(res => {
                        console.log(res);
                        this.editForm=res.data.result;
                      //  this.editForm.schooist=[];
                        // for(let i=0;i<res.data.result.schoolList.length;i++){
                        //     this.editForm.schoolList.push(res.data.result.schoolList[i].id);
                        // }
                        console.log(this.editForm);
                        let school=this.editForm.schoolList;
                        console.log(school);
                        this.editForm.schoolList=[];
                        let schoollist=[];
                        let schoolnames=[];
                        this.schoolsNameList=[];
                        this.schoolsIDList=[];
                        for(let i=0;i<school.length;i++) {
                            schoollist.push(school[i].schoolName);
                            this.schoolsNameList.push(school[i].schoolName);
                            this.schoolsIDList.push(school[i].id)
                        }
                        console.log(this.editForm)

                        //this.myInfo = successResponse.data.datas[0];
                    })
                    .catch(failResponse => {
                        console.log("fail");
                    });
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
            },
            //编辑
            editSubmit: function () {
                if(this.editForm.province=='省'){
                    this.editForm.province=null;
                }
                if(this.editForm.city=='市'){
                    this.editForm.city=null;
                }
                if(this.editForm.county=='区'){
                    this.editForm.county=null;
                }
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();

                            let schoollist=[];
                            for(let i=0;i<this.schoolsIDList.length;i++){
                                   let school={
                                        id:this.schoolsIDList[i]
                                    }
                                schoollist.push(school);
                            }
                            this.editForm.schoolList= schoollist;
                            let para = Object.assign({}, this.editForm);
                            editInstitutes(para).then((res) => {
                                this.editLoading = false;
                                //NProgress.done();
                                if(res.result==true) {
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    this.$refs['editForm'].resetFields();
                                    this.editFormVisible = false;
                                    this.getInstitutionList();
                                }else{
                                    this.$message({
                                        message:res.codeMessage,
                                        type:'error'
                                    })
                                }
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
                            let req = Object.assign({}, this.addForm);
                            console.log(req);
                            // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            addInstitutes(req).then((res) => {
                                this.addLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getInstitutionList();
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
            // this.getUsers();
            this.getInstitutionList();
            // let para={
            //     page:1,
            //     pageSize:100000000
            // };
            // getSchoolListPage(para)
            //     .then(res => {
            //         console.log("login get success");
            //         console.log(res);
            //         this.allschool=res.data.result.items;
            //         //this.myInfo = successResponse.data.datas[0];
            //     })
            //     .catch(failResponse => {
            //         console.log("login get fail");
            //     });
        }
    }

</script>

<style>
    .el-button--primary {
        color: #FFF;
        background: linear-gradient(315deg,rgba(88,96,250,1) 0%,rgba(121,128,250,1) 100%);
        border-color: #6C73FA;
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
    .el-form {
        margin-left: 1rem;
        margin-right: 1rem;
        margin-top: 1rem;
        margin-bottom: 2rem;
    }
    .el-dialog {
        position: relative;
        margin: 0px auto 50px;
        border-radius: 1rem;
        -webkit-box-shadow: 0 1px 3px rgba(0,0,0,.3);
        box-shadow: 0 1px 3px rgba(0,0,0,.3);
        box-sizing: border-box;
        width: 50%;
    }
    .distpicker-address-wrapper select {
        padding: .5rem .75rem;
        height: 40px;
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
    .el-message-box {
        display: inline-block;
        width: 20%;
        padding-bottom: 10px;
        vertical-align: middle;
        background-color: #FFF;
        border-radius: 1rem;
        border: 0px solid #EBEEF5;
        font-size: 18px;
        -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        text-align: left;
        overflow: hidden;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
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
    .el-input__inner {
        width: 200%;
    }
    .el-select .el-input__prefix, .el-input__suffix {
        position: absolute;
        top: 0;
        -webkit-transition: all .3s;
        height: 100%;
        color: #C0C4CC;
        text-align: center;
        right: -95%;
    }
    .el-select-dropdown el-popper is-multiple {
        width: 10rem !important;
    }
    .el-select__tags {
        width: 200% !important;
        max-width: 100% !important;
    }
    .el-select {
        display: inline-block;
        position: relative;
        width: 80%;
    }
    .el-select .el-input {
        width: 50% !important;
    }
    .el-select .el-input .el-input--suffix .is-focus {
        width: 50% !important;
        margin: 0 !important;
        position: relative;
    }
    .el-select .el-input .el-input--suffix {
        width: 50% !important;
        margin: 0 !important;
        position: relative;
    }
</style>
