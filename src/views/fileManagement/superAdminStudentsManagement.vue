<template>
  <section>
    <!--工具条-->
    <div class="retrieval  criteria Style">
      <el-form style="margin-left: 2rem;" :inline="true" :model="filters">
        <el-form-item label="姓名"></el-form-item>
        <el-form-item>
          <el-select
                  v-model="value"
                  multiple
                  filterable
                  remote
                  reserve-keyword
                  placeholder="搜索学生姓名"
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
        <el-form-item label="学校"></el-form-item>
        <el-form-item>
          <el-select
                  v-model="value"
                  multiple
                  filterable
                  remote
                  reserve-keyword
                  placeholder="搜索学校名称"
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
        <el-form-item label="年级"></el-form-item>
        <el-form-item>
          <el-select  size="small" v-model="form.versionStatus" placeholder="请选择">
            <el-option
                    v-for="item in versionOptions"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级"></el-form-item>
        <el-form-item>
          <el-select  size="small" v-model="form.versionStatus" placeholder="请选择">
            <el-option
                    v-for="item in versionOptions"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button class="reset-student" type="primary" round @click="Search">
            <span style="font-size: 0.9rem;font-family: PingFang SC;">
              重置
            </span>
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-button class="reset-student" type="primary" round @click="Search">
            <span style="font-size: 0.9rem;font-family: PingFang SC;">
              添加学生
            </span>
          </el-button>
        </el-form-item>

      </el-form>

      <div class="retrieval  criteria Style">
        <el-table
                ref="multipleTable"
                :data="students"
                stripe="true"
                highlight-current-row="true"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange">
          <el-table-column
                  prop="stuName"
                  label="姓名"
                  show-overflow-tooltip
                  align="center">
          </el-table-column>
          <el-table-column
                  prop="number"
                  label="学号"
                  show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column
                  prop="sex"
                  label="性别"
                  show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column
                  prop="gradeNo"
                  label="年级"
                  show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column
                  prop="classNo"
                  label="班级"
                  show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column
                  prop="schoolName"
                  label="所在学校"
                  show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column
                  prop="id"
                  label="操作"
                  show-overflow-tooltip align="center">
            <template scope="scope">
            <span style="color: #7980FA; margin-right: 1rem;" size="small" @click="handleEdit(scope.$index, scope.row)">详情</span>
            <span style="color: #7980FA;"size="small" @click="handleDel(scope.$index, scope.row)">删除</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
        </el-pagination>
      </div>
    </div>

    <!--工具条-->

    <!--编辑界面-->
    <el-dialog title="编辑" style="border: 0;" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form style="border: 0;" :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
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
  import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser,getStudentsList } from '../../api/api';

  export default {
    data() {
      return {
       students:[{
         classNo: 1,
         createTime: "2019-08-11 08:21:11",
         gradeNo: 1,
         id: 1,
         number: "10152510229",
         schoolName: "ecnu",
         sex: 0,
         stuName: "李昂"
       },
         {
           classNo: 1,
           createTime: "2019-08-11 08:21:11",
           gradeNo: 1,
           id: 1,
           number: "10152510229",
           schoolName: "ecnu",
           sex: 0,
           stuName: "李昂"
         },
         {
           classNo: 1,
           createTime: "2019-08-11 08:21:11",
           gradeNo: 1,
           id: 1,
           number: "10152510229",
           schoolName: "ecnu",
           sex: 0,
           stuName: "李昂"
         },
         {
           classNo: 1,
           createTime: "2019-08-11 08:21:11",
           gradeNo: 1,
           id: 1,
           number: "10152510229",
           schoolName: "ecnu",
           sex: 0,
           stuName: "李昂"
         },
         {
           classNo: 1,
           createTime: "2019-08-11 08:21:11",
           gradeNo: 1,
           id: 1,
           number: "10152510229",
           schoolName: "ecnu",
           sex: 0,
           stuName: "李昂"
         }],
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
      getStudentsList(){
        let para = {
          page: this.page,
          pageSize: 10
        };
        this.listLoading = true;
        console.log("hihihi");
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数

        getStudentsList(para)
                .then(res => {
                  console.log("login get success");
                  console.log(res);
                  this.students=res.data.result.items;
                  this.total=res.data.result.items.length;
                  //this.myInfo = successResponse.data.datas[0];
                })
                .catch(failResponse => {
                  console.log("login get fail");
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
       // this.editFormVisible = true;
      //  this.editForm = Object.assign({}, row);
        this.$router.push({ path: '/superAdminStudentDetail' });
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
      //this.getStudentsList();
    }
  }

</script>

<style>
  .Style{
    margin-left: 0px;
    padding-left: 0;
    padding-right: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    border: 0px solid #d1dbe5;
    border-radius: 1rem;
    background-color: #fff;
    overflow: hidden;

  }
  .container .main .content-container .content-wrapper[data-v-88dff836] {
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 1rem;
    border: 0;
    box-shadow: 0 0 1rem lightgrey;
    margin-top: 1rem;
  }
  .container .main .content-container .breadcrumb-container .title[data-v-88dff836] {
    width: 200px;
    float: left;
    color: black;
    font-size: 1.1rem;
    font-weight: bold;
    font-family: PingFang SC;
  }
  .el-form el-form__inline{
    padding-top: 1rem;
    padding-bottom: 0px;
    font-family: PingFang SC;
    margin-left: 2rem !important;
    padding-right: 1rem;
  }
  .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 0px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .el-input {
    width: 8rem;
  }
  .el-input__inner{
    border-radius: 2rem;
  }
  .el-select__input {
    border: none;
    outline: 0;
    padding: 0;
    margin-left: 15px;
    color: #666;
    font-size: 0.85rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    height: 28px;
    background-color: transparent;
    font-family: PingFang SC;
  }
  .el-input--suffix .el-input__inner {
    padding-right: 30px;
    font-family: PingFang SC;
    font-size: 0.85rem;
  }
  .el-input--small .el-input__icon {
     line-height: 0rem;
  }
  .el-select .el-input .el-select__caret {
    color: #7980FA;
    font-size: 1rem;
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s,-webkit-transform .3s;
    -webkit-transform: rotateZ(180deg);
    transform: rotateZ(180deg);
    cursor: pointer;
  }
  .el-button--primary {
    color: #FFF;
    background-color: #7980FA;
    border-color: #7980FA;
    font-family: PingFang SC;
    border: 0;
    box-shadow: 0 2px 10px #7980FA;
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

</style>
