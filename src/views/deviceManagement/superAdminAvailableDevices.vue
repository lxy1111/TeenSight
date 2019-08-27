<template>
  <section>
    <!--工具条-->

    <div class="retrieval  criteria Style">

      <el-form :inline="true" :model="selectForm">
        <el-form-item label="">
          <el-input size="small" v-model="selectForm.deviceId" placeholder="按设备ID搜索"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input size="small" v-model="selectForm.deviceName" placeholder="按设备名称搜索"></el-input>
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
        <el-form-item><el-button type="primary" round @click="handleAdd">添加通知</el-button></el-form-item>
      </el-form>
    </div>

    <div class="retrieval  criteria Style">
      <el-table
              ref="multipleTable"
              :data="devices"
              stripe
              tooltip-effect="dark"
              style="width: 100%">
        <el-table-column
                prop="deviceName"
                label="设备名称"
                show-overflow-tooltip
                align="center">
        </el-table-column>
        <el-table-column
                prop="deviceId"
                label="设备ID"
                show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column
                prop=""
                label="是否为本机构设备"
                show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column
                prop=""
                label="是否共享"
                show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column
                prop="address"
                label="位置"
                show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column
                prop="address"
                label="操作"
                show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-link style="color: #7980FA; margin-right: 1rem;" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-link>
            <el-link style="color: #7980FA; margin-right: 1rem;" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
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
        <el-form-item label="设备名称">
          <el-input v-model="editForm.deviceName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="editForm.address"></el-input>
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
        <el-form-item label="设备ID">
          <el-input v-model="addForm.deviceId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="addForm.deviceName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="addForm.address"></el-input>
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
  import { getUserListPage, removeUser, editDevice, removeDevice, batchRemoveUser, editUser, addUser ,getDeviceList, addDevice } from '../../api/api';

  export default {
    data() {
      return {
        devices:[],
        selectForm:{
          page: 1,
          pageSize: 10,
          address: "",
          deviceId: "",
          deviceName: "",
          schoolId: ""
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
          address: "",
          deviceId: "",
          deviceName: "",
          schoolId: ""
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
          address: "",
          deviceId: "",
          deviceName: "",
          schoolId: ""
        }

      }
    },
    methods: {
      handleReset(){
        this.getDevices();
        this.selectForm = {
          page: 1,
          pageSize: 10,
          address: "",
          deviceId: "",
          deviceName: "",
          schoolId: ""
        };
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
        getDeviceList(this.selectForm).then((res)=>{
          this.devices=res.data.result.items;
          this.total=res.data.result.totalNum;
        })
      },
      //性别显示转换
      formatSex: function (row, column) {
        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getUsers();
      },
      getDevices() {                         /////////////////////获取所有设备列表

        let para = {
          page: this.page,
          pageSize: 10
        };
        this.listLoading = true;
        getDeviceList(para).then((res) => {
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
      //删除
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { codeList: [row.id] };
          removeDevice(para).then((res) => {
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
              editDevice(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
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
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.addForm);
              console.log(para);
              addDevice(para).then((res) => {
                this.addLoading = false;
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
      }
    },
    mounted() {
      this.getDevices();
      console.log("1111111111111111111111111")
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
