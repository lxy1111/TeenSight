<template>
  <section>
    <!--工具条-->
    <div class="retrieval  criteria Style">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-select
                  v-model="value"
                  multiple
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请搜索学校名称"
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
        <el-form-item><el-button type="primary" round @click="Search">重置</el-button></el-form-item>
      </el-form>

      <div class="retrieval  criteria Style">
        <el-table
                ref="multipleTable"
                :data="schools"
                stripe="true"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="">
          <el-table-column
                  prop="schoolName"
                  label="学校名称"
                  show-overflow-tooltip
                  align="center">
          </el-table-column>
          <el-table-column
                  prop="schoolType"
                  label="学校类型"
                  show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column
                  prop="schoolAccount"
                  label="登陆账号"
                  show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column
                  prop="location"
                  label="学校位置"
                  show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column
                  prop="audit"
                  label="状态"
                  show-overflow-tooltip align="center">
            <template slot-scope="scope">
            <el-tag    :type="scope.row.audit === 0 ? 'danger' : 'success'"
                    effect="dark">
              {{scope.row.audit==0 ? '未认证' : '已认证'}}
            </el-tag>
            </template>
          </el-table-column>
          <el-table-column
                  prop="id"
                  label="操作"
                  show-overflow-tooltip align="center">
            <template slot-scope="scope">
          <el-link style="color: #7980FA; " size="small" @click="handleEdit(scope.row)">详情</el-link>
          <el-link style="color: #7980FA; " size="small" v-if="!hidedelete" @click="handleDel(scope.$index, scope.row)">删除</el-link>
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
        <el-form-item label="学校名称">
            <el-input v-model="editForm.schoolName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="负责人">
            <el-input v-model="editForm.schoolPrincipal" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="联系电话">
            <el-input v-model="editForm.schoolPhone" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="所在位置">
          <el-input v-model="editForm.location" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="登陆账号">
            <el-input v-model="editForm.schoolAccount" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="登陆密码">
          <el-input v-model="editForm.schoolPassword" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">修改</el-button>
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
  import axios from 'axios';
  //import NProgress from 'nprogress'
  import {
    getUserListPage,
    removeUser,
    batchRemoveUser,
    editUser,
    addUser,
    getSchoolListPage,
    removeSchool
  } from '../../api/api';

  export default {
    data() {
      return {
        state:'',
        hidedelete: false,
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
        schools:[
        ],
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
          schoolName:'',
          schoolType:'',
          schoolAccount:'',
          location:'',
          schoolPhone:'',
          schoolPrincipal:'',
          id:'',
          schoolPassword:''
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
      formatSex: function (row, column) {
        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getSchoolsList();
      },
      getSchoolsList(){
        let para = {
          page: this.page,
          pageSize: 10
        };
        this.listLoading = true;
        console.log("hihihi");
        this.schools=[];
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数


        getSchoolListPage(para)
                .then(res => {
                  console.log("login get success");
                  console.log(res);
                  let schoolslist=res.data.result.items;
                  this.total=res.data.result.items.length;
                  for(let i=0;i<this.total;i++){
                    let state='';
                     let school={
                        schoolName: schoolslist[i].schoolName,
                        schoolType: schoolslist[i].schoolType,
                        schoolAccount: schoolslist[i].schoolAccount,
                        location: schoolslist[i].province+schoolslist[i].city+schoolslist[i].county,
                        schoolPassword:schoolslist[i].schoolPassword,
                       schoolPhone: schoolslist[i].schoolPhone,
                       schoolPrincipal:schoolslist[i].schoolPrincipal,
                       id:schoolslist[i].id,
                       audit:schoolslist[i].audit
                     }
                     this.schools.push(school);
                  }
                  console.log(this.schools[0].city);
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
          console.log(res)
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
          removeSchool(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getSchoolsList();
          });
        }).catch(() => {

        });
      },
      //显示编辑界面
      handleEdit: function (row) {
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
      // this.getUsers();
      this.getSchoolsList();
      var user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        if(user.type==0){
          this.hidedelete=false;
        }
        else if(user.type==1){
          this.hidedelete=true;
        }
        else if(user.type==3){
          this.hidedelete=true;
        }
      }
    }
  }

</script>

<style scoped>
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

</style>
