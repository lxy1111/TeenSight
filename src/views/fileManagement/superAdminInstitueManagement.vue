<template>
  <section>
    <!--工具条-->
    <div class="retrieval  criteria Style">
      <el-form :model="selectForm" :inline="true" >
        <el-form-item>
          <el-input placeholder="请输入机构名称" v-model="selectForm.institutionName"></el-input>
        </el-form-item>
        <el-form-item>
         <v-distpicker @selected="onSelected"></v-distpicker>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入机构账号" v-model="selectForm.institutionAccount"></el-input>
        </el-form-item>
        <el-form-item><el-button type="primary" round @click="handleselect">查询</el-button></el-form-item>
        <el-form-item><el-button type="primary" round @click="">重置</el-button></el-form-item>
        <el-form-item><el-button type="primary" round @click="handleAdd">添加机构</el-button></el-form-item>
      </el-form>

      <div class="retrieval  criteria Style">
        <el-table
                ref="multipleTable"
                :data="institutes"
                stripe="true"
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
                prop="audit"
                label="状态"
                show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-button  :disabled="scope.row.audit==0 ? false : true"  :type="scope.row.audit == 0 ? 'danger' : 'success'"
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
              <el-link style="color: #7980FA; margin-right: 1rem;" size="small" @click="handleShow(scope.$index, scope.row)">详情</el-link>
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
            <el-input v-model="editForm.insName" auto-complete="off" :disabled="editable"></el-input>
        </el-form-item>

        <el-form-item label="负责人">
          <el-input v-model="editForm.principal" auto-complete="off" :disabled="editable"></el-input>
        </el-form-item>

        <el-form-item label="联系电话">
            <el-input v-model="editForm.mobile" auto-complete="off" :disabled="editable"></el-input>
        </el-form-item>

        <el-form-item label="所在位置">
          <v-distpicker :disabled="editable" :province="editForm.province" :city="editForm.city" :area="editForm.county" @selected="onSelected2"></v-distpicker>
        </el-form-item>

        <el-form-item label="登陆账号">
          <el-input v-model="editForm.insAccount" auto-complete="off" :disabled="editable"></el-input>
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
          <v-distpicker @selected="onSelected"></v-distpicker>
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
    addInstitutes, getInstituteDetail, removeInstitute, editInstitutes
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
          pageSize:1000000,
          institutionName:'',
          type:1
        },
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
          type: "",
          schoolList:"",
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
      handleselect(){
        if(this.selectForm.institutionName==''){
          this.selectForm.institutionName=null;
        }
        getInstitutionList(this.selectForm).then((res)=>{
          this.institutes=res.data.result.items;
          this.total=res.data.result.totalNum;

        })
      },
      onSelected(data) {
        this.selectForm.province=data.province.value;
        this.selectForm.city=data.city.value;
        this.selectForm.county=data.area.value;
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
        this.getInstitutionList();
      },

      getInstitutionList(){
        let para = {
          page: this.page,
          pageSize: 10,
          type: 1
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
        let detail = Object.assign({}, row);
        let id=detail.id;
        let para={
          id:id
        }
        getInstituteDetail(para)
                .then(res => {
                  console.log(res);
                  this.editForm=res.data.result;
                  //this.myInfo = successResponse.data.datas[0];
                })
                .catch(failResponse => {
                  console.log("fail");
                });

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


      handleShow: function (index, row) {
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
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.editForm);
              editInstitutes(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getInstitutionList();
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
                if(res.result==true) {
                  //NProgress.done();
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$refs['addForm'].resetFields();
                  this.addFormVisible = false;
                }
                else{
                  this.$message({
                    message:res.codeMessage,
                    type:"error"
                  })
                }
                this.getInstitutionList();
                this.$refs['addForm'].resetFields();
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
    margin-left: 2rem;
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
</style>
