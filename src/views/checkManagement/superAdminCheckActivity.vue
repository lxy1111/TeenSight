<template>
  <section>
    <!--工具条-->
    <div class="retrieval  criteria Style">
      <el-form :inline="true" :model="selectForm">
        <el-form-item>
          <el-input style="width: 50%;" size="small" placeholder="搜索普查名称" v-model.trim="selectForm.surveyName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input style="width: 50%;" size="small" placeholder="搜索学校名称" v-model.trim="selectForm.schoolName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round @click="handleselect">搜索</el-button>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" round @click="handleReset">重置</el-button>
      </el-form-item>

        <el-form-item v-if="!isAdimin"><el-button type="primary" round @click="handleAdd">新增普查</el-button></el-form-item>
      </el-form>


      <br>
      <div class="retrieval  criteria Style">
        <el-table
                ref="multipleTable"
                :data="surveys"
                stripe
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
                  prop="surveyName"
                  label="普查名称"
                  show-overflow-tooltip
                  align="center">
          </el-table-column>

          <el-table-column
                  prop="finish"
                  label="是否结束"
                  show-overflow-tooltip align="center">
            <template slot-scope="scope">
              {{scope.row.finish==true? "是":"否"}}
            </template>
          </el-table-column>

          <el-table-column v-if="!isAdimin"
                  prop="id"
                  label="操作"
                  show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <el-link style="color: #7980FA; " size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-link>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page.sync="page" layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
        </el-pagination>
      </div>
    </div>

    <!--工具条-->

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="普查名称" prop="name">
          <el-input v-model="editForm.surveyName" disabled="true"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否结束">
          <el-select v-model="editForm.finish" placeholder="请选择">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择设备">
          <el-select v-model="deviceidlist" multiple
                     filterable placeholder="请选择">
            <el-option
                    v-for="item in devices"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注">
          <el-input  type="textarea" v-model="editForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="普查名称"  prop="name">
          <el-input  disabled v-model="addForm.surveyName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择学校" v-if="isIns">
          <el-select  v-model="addForm.schoolId"  placeholder="请选择">
            <el-option
                    v-for="item in schoolist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择设备">
          <el-select v-model="addForm.deviceId" multiple placeholder="请选择">
            <el-option
                    v-for="item in devices"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注">
          <el-input type="textarea"  v-model="addForm.remark"></el-input>
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
  import {
    getUserListPage,
    removeUser,
    batchRemoveUser,
    editUser,
    addUser,
    getSurveyList,
    getDeviceList, createSurvey, editSurvey, getSchoolListPage
  } from '../../api/api';

  export default {
    data() {
      return {
        surveyName:'',
        deviceidlist:[],
        isAdimin:false,
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        filters: {
          name: ''
        },
        schooldevice:[],
        selectForm:{
          page:1,
          pageSize:10,
          surveyName:null,
          schoolName:null,
          schoolId:null,
          institutionId:null
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
        isIns:false,
        options:[{
          value:true,
          label:'是'
        },{
          value:false,
          label:'否'
        }],
        devices:[],
        gendervalue: '性别-全部',
        users: [],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],//列表选中列
       surveys:[],
        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          surveyName: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ]
        },
        //编辑界面数据
        editForm: {
          deviceId:[]
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
          surveyName: [
            { required: true, message: '请输入普查名称', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          finish:false,
          surveyType:0,
         surveyName:'',
        },
        allschool:[],
        schoolist:[]

      }
    },
    methods: {
      //性别显示转换
      formatSex: function (row, column) {
        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
      },
      handleCurrentChange(val) {
        this.page = val;
        this.selectForm.page=this.page;
        this.getSurveyList();
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
      getDevices(val){
        let para = {
          page: 1,
          pageSize: 1000000,
          schoolId:val
        };
        getDeviceList(para).then(res=>{
          let deviceList=res.data.result.items;
          this.devices=[];
          for(let i=0;i<deviceList.length;i++){
            let item={
              value: deviceList[i].id,
              label:deviceList[i].deviceId
            }
            this.devices.push(item);
          }
        })
      },
      handleReset(){
        this.selectForm.surveyName=null;
        this.selectForm.schoolName=null;
        this.page=1;
      },
      handleselect(){
        if(this.selectForm.schoolName==''){
          this.selectForm.schoolName=null;
        }
        if(this.selectForm.surveyName==''){
          this.selectForm.surveyName=null;
        }
        this.page=1;
        this.getSurveyList();

      },
      getSurveyList() {
        this.listLoading = true;
        //NProgress.start();
        getSurveyList(this.selectForm).then((res) => {
         this.surveys=res.data.result.items;
          this.total = res.data.result.totalNum;
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
        let para = {
          page: 1,
          pageSize: 1000000,
          schoolId:row.schoolId
        };
        getDeviceList(para).then(res=>{
          let deviceList=res.data.result.items;
          this.devices=[];
          for(let i=0;i<deviceList.length;i++){
            let item={
              value: deviceList[i].id,
              label:deviceList[i].deviceId
            }
            this.devices.push(item);
          }
        })
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
        this.deviceidlist=[];
        this.devices=[];
        for(let i=0;i<this.editForm.deviceList.length;i++){
          this.deviceidlist.push(this.editForm.deviceList[i].id);
        }
      },
      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        if(month>=3&&month<5){
          this.surveyName=(year-1)+'到'+(year)+'学年第二学期第一次普查';
        }
        else if(month>=5&&month<9){
          this.surveyName=(year-1)+'到'+(year)+'学年第二学期第二次普查';
        }else if(month>=9&&month<11)
        {
          this.surveyName=(year)+'到'+(year+1)+'学年第一学期第一次普查';
        }else if(month>=11||month<3)
        {
          this.surveyName=(year)+'到'+(year+1)+'学年第一学期第二次普查';
        }
        this.addForm.surveyName=this.surveyName;

      },
      //编辑
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.editForm);
              para.deviceId=this.deviceidlist;
              para.startDate = (!para.startDate || para.startDate == '') ? '' : util.formatDate.format(new Date(para.startDate), 'yyyy-MM-dd');
              para.endDate = (!para.endDate|| para.endDate == '') ? '' : util.formatDate.format(new Date(para.endDate), 'yyyy-MM-dd');
              editSurvey(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                if(res.succeed!=true){
                  this.$message({
                    message: res.codeMessage,
                    type: 'error'
                  });
                  return;
                }
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getSurveyList();
              });
            });
          }
        });
      },
      //新增
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确定学籍信息都已经输入完备，确定后进行新建普查', '提示', {}).then(() => {
              this.addLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.addForm);
              let id=null;
              if(this.isIns){
                para.schoolId=this.addForm.schoolId;
              }else {
                let schoolinfo = sessionStorage.getItem('schoolinfo');
                schoolinfo = JSON.parse(schoolinfo);
                id = schoolinfo.schoolId;
                para.schoolId = id;
              }
            //  para.startDate = (!para.startDate || para.startDate == '') ? '' : util.formatDate.format(new Date(para.startDate), 'yyyy-MM-dd');
             // para.endDate = (!para.endDate|| para.endDate == '') ? '' : util.formatDate.format(new Date(para.endDate), 'yyyy-MM-dd');
              createSurvey(para).then((res) => {
                console.log(res);
                this.addLoading = false;
                //NProgress.done();
                if(!res.succeed){
                  this.$message({
                    message:res.codeMessage,
                    type:'error'
                  })
                }else {
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                }
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                this.getSurveyList();
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

      var user = sessionStorage.getItem('user');
      user=JSON.parse(user);
      if(user.type==2||user.type==1){
         this.isAdimin=false;
         this.isIns=true;
        var institute = sessionStorage.getItem('institute');
        institute = JSON.parse(institute);
        this.selectForm.institutionId=institute.insDetail.id;
        this.getSurveyList();
        let para = {
          page: 1,
          pageSize: 1000000,
          institutionId:institute.insDetail.id
        };
        getDeviceList(para).then(res=>{
          let deviceList=res.data.result.items;
          this.devices=[];
          for(let i=0;i<deviceList.length;i++){
            let item={
              value: deviceList[i].id,
              label:deviceList[i].deviceId
            }
            this.devices.push(item);
          }
        })
        getSchoolListPage(this.selectForm)
                .then(res => {
                  console.log("login get success");
                  console.log(res);
                  this.allschool=res.data.result.items;

                  for(let i=0;i<this.allschool.length;i++){
                    let school ={
                      value:this.allschool[i].id,
                      label:this.allschool[i].schoolName
                    }
                    this.schoolist.push(school);
                  }
                  //this.myInfo = successResponse.data.datas[0];
                })
                .catch(failResponse => {
                  console.log("login get fail");
                });
      } else if(user.type>=3) {
        var schoolinfo = sessionStorage.getItem('schoolinfo');
        schoolinfo=JSON.parse(schoolinfo);
        var id=schoolinfo.schoolId;
        this.selectForm.schoolId=id;
        this.getSurveyList();
        let para = {
          page: this.page,
          pageSize: 1000000,
          schoolId:id
        };
        getDeviceList(para).then(res=>{
          let deviceList=res.data.result.items;
          this.devices=[];
          for(let i=0;i<deviceList.length;i++){
            let item={
              value: deviceList[i].id,
              label:deviceList[i].deviceId
            }
            this.devices.push(item);
          }
        })
      }else{
        this.isAdimin=true;
        this.getSurveyList();
      }
    }
  }

</script>

<style scoped>
  .Style{
    margin-left: 0px;
    padding: 10px;
    border: 0px solid #d1dbe5;
    border-radius: 20px;
    background-color: #fff;
    overflow: hidden;
  }

</style>
