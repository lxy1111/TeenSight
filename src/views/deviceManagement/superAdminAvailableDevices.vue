<template>
  <section>
    <!--工具条-->

    <div class="retrieval  criteria Style">

      <el-form :inline="true" :model="selectForm">
        <el-form-item label="">
          <el-input style="width: 50%;" size="small" v-model.trim="selectForm.deviceId" placeholder="按设备ID搜索"></el-input>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary" round
                     style="margin-right: 0rem;"
                     @click="handleselect">搜索</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" round
                     style="margin-right: 2rem;"
                     @click="handleReset">重置</el-button>
        </el-form-item>
        <el-form-item v-if="(!isAdmin&&isins)||isSchool"><el-button type="primary" round @click="handleAdd">添加设备</el-button></el-form-item>
      </el-form>
    </div>
    <el-dialog title="绑定" :visible.sync="showSchool" :close-on-click-modal="false">
      <el-form>
        <el-form-item label="已绑定学校">
          <el-select style="width: 86%;"
                     class="select-school-name"
                     multiple
                     v-model="deviceschool"
                     placeholder="暂无"
                     disabled
                     filterable
                     remote
                     reserve-keyword
                     :remote-method="remoteMethod"
                     :loading="loading">
            <el-option
                    v-for="item in schools"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      <el-form-item >
        <el-select style="width: 100%;"
                   class="select-school-name"
                   multiple
                   v-model="schoollist"
                   filterable
                   remote
                   reserve-keyword
                   placeholder="请选择学校名称"
                   :remote-method="remoteMethod"
                   :loading="loading">
          <el-option
                  v-for="item in schools"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" round @click.native="binddevice">确定</el-button>
      </div>
    </el-dialog>
    <div class="retrieval  criteria Style">
      <el-table
              ref="multipleTable"
              :data="devices"
              stripe
              tooltip-effect="dark"
              style="width: 100%">

        <el-table-column
                prop="deviceId"
                label="设备ID"
                show-overflow-tooltip align="center">
        </el-table-column>
<!--        <el-table-column-->
<!--                prop=""-->
<!--                label="是否为本机构设备"-->
<!--                show-overflow-tooltip align="center">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--                prop=""-->
<!--                label="是否共享"-->
<!--                show-overflow-tooltip align="center">-->
<!--        </el-table-column>-->
        <el-table-column
              prop="address"
              label="位置"
              show-overflow-tooltip align="center">
      </el-table-column>
        <el-table-column
                prop="isBind"
                label="状态"
                show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-button   :type="scope.row.isBind === 0 ? 'danger' : 'success'"
                        effect="dark" @click="scope.row.isBind === 0 ? bindSchool(scope.$index,scope.row):unbindSchool(scope.$index,scope.row)">
              {{scope.row.isBind==0 ? '未绑定' : '已绑定'}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
                prop="schoolName"
                label="学校名称"
                show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column v-if="isAdmin"
                prop="address"
                label="操作"
                show-overflow-tooltip align="center">
          <template slot-scope="scope">
<!--            <el-link style="color: #7980FA; margin-right: 1rem;" size="small"  @click="handleBind(scope.$index, scope.row)">绑定学校</el-link>-->
<!--            <el-link style="color: #7980FA; margin-right: 1rem;" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-link>-->
            <el-link style="color: #7980FA; margin-right: 0rem;" size="small"  @click="handleDel(scope.$index, scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
      </el-pagination>
    </div>

    <!--工具条-->
<!--    <el-col :span="24" class="toolbar">-->
<!--      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
<!--      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">-->
<!--      </el-pagination>-->
<!--    </el-col>-->

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="设备ID">
          <el-input v-model="editForm.deviceId" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="地址">
          <el-input  v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item label="已绑定学校">
          <el-select style="width: 86%;"
                     class="select-school-name"
                     multiple
                     v-model="deviceschoolid"
                     placeholder="暂无"
                     filterable
                     :loading="loading">
            <el-option
                    v-for="item in schoolist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
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
<!--        <el-form-item label="学校" v-if="isins" prop="schoolId">-->
<!--          <el-select style="width: 86%;"-->
<!--                     class="select-school-name"-->
<!--                     v-model="addForm.schoolId"-->
<!--                     placeholder="暂无"-->
<!--                     filterable-->
<!--                     :loading="loading">-->
<!--            <el-option-->
<!--                    v-for="item in schoolist"-->
<!--                    :key="item.value"-->
<!--                    :label="item.label"-->
<!--                    :value="item.value">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="设备ID">
          <el-input v-model="addForm.deviceId" auto-complete="off"></el-input>
        </el-form-item>

<!--        <el-form-item label="地址">-->
<!--          <el-input type="textarea" v-model="addForm.address"></el-input>-->
<!--        </el-form-item>-->
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
    editDevice,
    removeDevice,
    batchRemoveUser,
    editUser,
    addUser,
    getDeviceList,
    addDevice,
    getSchoolListPage, bindDevice, getBindSchools
  } from '../../api/api';

  export default {
    data() {
      return {
        isSchool:false,
        isAdmin:true,
        institutionId:null,
        devices:[],
        schoollist:[],
        selectForm:{
          page: 1,
          pageSize: 10,
          schoolId: null,
          address:null,
          deviceId:null,
          deviceName:null,
          institutionId:null,
        },
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
        deviceschoolid:[],
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
        deviceId:'',
        allschool:[],
        showSchool:false,
        gendervalue: '性别-全部',
        users: [],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],//列表选中列
        schools:[],
        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        bindedSchools:[],
        isins:false,
        bindschool:'',
        editFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        //编辑界面数据
        editForm: {
          address: "",
          deviceId: "",
          deviceName: "",
          schoolId: ""
        },
        schoolist:[],
        deviceschool:{
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
          schoolId: [
            { required: true, message: '请输入学校', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          address: "",
          deviceId: "",
          deviceName: "",
          schoolId: null,
          institutionId:null
        }

      }
    },
    methods: {

      handleReset(){

        this.selectForm.address = null;
        this.selectForm.deviceId=null;
        this.selectForm.deviceName=null;
        this.selectForm.schoolId=null;
      },
      binddevice(){
        for(let i=0;i<this.schoollist.length;i++){
          let para={
            deviceId:this.deviceId,
            isBind:"true",
            schoolId:this.schoollist[i]
          }
          bindDevice(para).then(res=>{
          })
        }
        this.$message({
          type:'success',
          message:'绑定成功'
        })
        this.showSchool=false;
      },
      getBindedSchool(id){
        let para={
          deviceId:id
        }
        this.schoollist=[];
        this.deviceschool=[];
        this.deviceschoolid=[];
        getBindSchools(para).then(res=>{
          this.bindedSchools=res.data.result;
          for(let i=0;i<this.bindedSchools.length;i++) {
           this.deviceschool.push(this.bindedSchools[i].schoolName);
           this.deviceschoolid.push(this.bindedSchools[i].id);
          }
        })

      },
      handleselect() {
        if(this.selectForm.deviceName==''){
          this.selectForm.deviceName=null;
        }
        if(this.selectForm.deviceId==''){
          this.selectForm.deviceId=null;
        }
        if(this.selectForm.address==''){
          this.selectForm.address=null;
        }
        if(this.selectForm.schoolId==''){
          this.selectForm.schoolId=null;
        }
        this.getDevices();
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
      //性别显示转换
      formatSex: function (row, column) {
        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
      },
      handleCurrentChange(val) {
        this.page = val;
        this.selectForm.page=this.page;
      this.getDevices();
      },
      getDevices() {                         /////////////////////获取所有设备列表
       this.selectForm.page=this.page;
        this.listLoading = true;
        getDeviceList(this.selectForm).then((res) => {
          this.total = res.data.result.totalNum;
          this.devices = res.data.result.items;
          this.listLoading = false;
        });

      },
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
      handleBind:function (index, row){
         this.showSchool=true;
         this.deviceId=row.id;
         this.schoolist=[];
        for(let i=0;i<this.allschool.length;i++){
          let school ={
            value:this.allschool[i].id,
            label:this.allschool[i].schoolName
          }
          this.schoolist.push(school);
        }
        this.getBindedSchool(row.id);

      },
      //删除
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { codeList: [row.id] };
          removeDevice(para).then((res) => {
            if (!res.succeed) {
              this.$message({
                message: res.codeMessage,
                type: 'error'
              });
              return;
            }
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getDevices();
          });
        }).catch(() => {

        });
      },
      bindSchool: function(index,row){
        var deviceid=row.id;
        var schoolid=row.schoolId;
        var para={
          deviceId:deviceid,
          schoolId:schoolid,
          isBind:true
        }
          bindDevice(para).then(res=>{
            if(!res.data.succeed){
              this.$message({
                message: res.data.codeMessage,
                type: 'error'
              });
              return ;
            }
            this.$message({
              message: '绑定成功',
              type: 'success'
            });
            this.getDevices();
          })


      },
      unbindSchool: function(index,row){
        var deviceid=row.id;
        var schoolid=row.schoolId;
        var para={
          deviceId:deviceid,
          schoolId:schoolid,
          isBind:false
        }
        bindDevice(para).then(res=>{
          if(!res.data.succeed){
            this.$message({
              message: res.data.codeMessage,
              type: 'error'
            });
            return ;
          }
          this.$message({
            message: '解绑成功',
            type: 'success'
          });
          this.getDevices();
        })
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
        this.deviceId=row.id;
        this.schoolist=[];
        for(let i=0;i<this.allschool.length;i++){
          let school ={
            value:this.allschool[i].id,
            label:this.allschool[i].schoolName
          }
          this.schoolist.push(school);
        }
        this.getBindedSchool(row.id);

      },
      //显示新增界面
      handleAdd: function () {
        this.schoolist=[];
        this.addFormVisible = true;
        for(let i=0;i<this.allschool.length;i++){
          let school ={
            value:this.allschool[i].id,
            label:this.allschool[i].schoolName
          }
          this.schoolist.push(school);
        }
      },
      //编辑
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              let idlist=[];
              let schoollist=[];
              for(let i=0;i<this.deviceschoolid.length;i++){
                let school={
                  id:this.deviceschoolid[i]
                };
                schoollist.push(school);
              }
              this.editForm.schoolList= schoollist;
              let para = Object.assign({}, this.editForm);
              if(this.deviceschoolid.length>0){
                for(let i=0;i<this.deviceschoolid.length;i++) {

                  let para = {
                    schoolId:this.deviceschoolid[i],
                    isBind: true,
                    deviceId:this.editForm.id
                  }
                  bindDevice(para).then(res=>{

                  })
                }
              }
              editDevice(para).then((res) => {
                if (!res.succeed) {
                  this.$message({
                    message: res.codeMessage,
                    type: 'error'
                  });
                  return;
                }
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getDevices();
              });
            });
          }
        });
      },
      //新增
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('请确认信息是否有误，一旦提交无法修改！', '提示', {}).then(() => {
              this.addLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.addForm);
              console.log(para);
              addDevice(para).then((res) => {
                this.addLoading = false;
                if (!res.succeed) {
                  this.$message({
                    message: res.codeMessage,
                    type: 'error'
                  });
                  return;
                }

                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                this.getDevices();
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
      },
    },
    mounted() {
      var user=sessionStorage.getItem('user');
      user=JSON.parse(user);
      let para={
        page:1,
        pageSize:10000000,
        institutionId: null,
      };
      if(user.type==1||user.type==2){
        this.isAdmin=false;
        if(user.type==2) {
          this.isins = true;
        }
        var insinfo = sessionStorage.getItem('institute');
        insinfo=JSON.parse(insinfo);
        var id=insinfo.insDetail.id;
        para.institutionId=id;
        this.selectForm.institutionId=id;
        this.addForm.institutionId=id;
      }
      if(user.type>=3){
        this.isAdmin=false;
        this.isSchool=true;
        var schoolinfo = sessionStorage.getItem('schoolinfo');
        schoolinfo=JSON.parse(schoolinfo);
        var id=schoolinfo.schoolId;
        this.selectForm.schoolId=id;
        this.addForm.schoolId=id;
      }
      this.getDevices();
      console.log("1111111111111111111111111")
      getSchoolListPage(para)
              .then(res => {
                console.log("login get success");
                console.log(res);
                this.allschool=res.data.result.items;
                //this.myInfo = successResponse.data.datas[0];
              })
              .catch(failResponse => {
                console.log("login get fail");
              });
    }
  }

</script>

<style scoped>
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
