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
                  placeholder="搜索教育机构名称"
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
        <el-form-item><el-button type="primary" round @click="handleAdd">添加机构</el-button></el-form-item>
      </el-form>

      <div class="retrieval  criteria Style">
        <el-table
                ref="multipleTable"
                :data="institutes"
                border
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
                  prop="id"
                  label="操作"
                  show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <el-button size="small" @click="handleShow(scope.$index, scope.row)">详情</el-button>
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
        <el-form-item label="机构名称" prop="name">
          <el-input v-model="editForm.insName" auto-complete="off" :disabled="editable"></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="editForm.principal" auto-complete="off" :disabled="editable"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="editForm.mobile" auto-complete="off" :disabled="editable"></el-input>
        </el-form-item>
        <el-form-item label="所含学校">
          <el-input v-model="editForm.insAccount" auto-complete="off" :disabled="editable"></el-input>
        </el-form-item>
        <el-form-item label="所在位置">
          <el-input v-model="editForm.province+editForm.city+editForm.county" auto-complete="off" :disabled="editable"></el-input>
        </el-form-item>
        <el-form-item label="登陆账号">
          <el-input v-model="editForm.insAccount" auto-complete="off" :disabled="editable"></el-input>
        </el-form-item>
        <el-form-item label="登陆密码">
          <el-input v-model="editForm.insPassword" auto-complete="off" :disabled="editable"></el-input>
        </el-form-item>
<!--        <el-form-item label="所含学校">-->
<!--          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="地址">-->
<!--          <el-input type="textarea" v-model="editForm.addr"></el-input>-->
<!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">修改</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="机构名称" prop="insName">
          <el-input v-model="addForm.insName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="机构类型">
          <el-select v-model="addForm.type" placeholder="请选择">
            <el-option
                    v-for="item in options"
                    :key="parseInt(item.value)"
                    :label="item.label"
                    :value="parseInt(item.value)">
            </el-option>
          </el-select>
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
          <v-distpicker  @selected="onSelected"></v-distpicker>
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
    addInstitutes
  } from '../../api/api';
  import VDistpicker from 'v-distpicker'
  export default {
    components:{
      VDistpicker
    },
    data() {
      return {
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
          city: "",
          county: "",
          insAccount: "",
          insName: "",
          insPassword: "",
          mobile: "",
          principal: "",
          province: "",
          type: ""
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
          type: ""
        }

      }
    },
    methods: {
      onSelected(data) {
        this.addForm.province=data.province.value;
        this.addForm.city=data.city.value;
        this.addForm.county=data.area.value;
        console.log(data)
      },
      //性别显示转换
      formatSex: function (row, column) {
        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getInstitutionList();
      },

      getInstitutionList(){
        let para = {
          page: this.page,
          pageSize: 10
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
        this.editable=false;
        this.editForm = Object.assign({}, row);
      },


      handleShow: function (index, row) {
        this.editFormVisible = true;
        this.editable=true;
        let detail = Object.assign({}, row);

      },
      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
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
    border: 1px solid #d1dbe5;
    border-radius: 20px;
    background-color: #fff;
    overflow: hidden;

  }

</style>
