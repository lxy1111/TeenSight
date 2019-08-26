<template>
  <section>
    <!--工具条-->
    <div class="retrieval  criteria Style">

      <el-form :inline="true" :model="filters">
        <el-form-item label="">
          <el-input size="small" v-model="searchDeviceID" placeholder="按设备ID搜索"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" round
                     style="margin-right: 2rem;"
                     @click="searchById">搜索</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-input size="small" v-model="searchDeviceName" placeholder="按设备名称搜索"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" round
                     style="margin-right: 2rem;"
                     @click="searchByName">搜索</el-button>
        </el-form-item>
        <el-form-item><el-button type="primary" round @click="handleAdd">添加通知</el-button></el-form-item>
      </el-form>
    </div>

    <!--工具条-->
    <div class="retrieval  criteria Style">
      <br>
      <div class="retrieval  criteria Style">
        <el-table
                ref="multipleTable"
                :data="messageList"
                stripe
                tooltip-effect="dark"
                style="width: 100%">
          <el-table-column
                  prop="name"
                  label="设备ID"
                  show-overflow-tooltip
                  align="center">
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="名称"
                  show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="故障原因"
                  show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="发送时间"
                  show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="操作"
                  show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <el-button size="small" @click="handleEdit(scope.row)">详情</el-button>
              <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
        </el-pagination>
      </div>
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
          <el-input :disabled="true" v-model="editForm.deviceId"></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input :disabled="true" v-model="editForm.deviceName"></el-input>
        </el-form-item>
        <el-form-item label="故障原因">
          <el-input :disabled="true" v-model="editForm.faultCause"></el-input>
        </el-form-item>
        <el-form-item label="发送时间">
          <el-input :disabled="true" v-model="editForm.sendTime"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="添加通知" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="设备ID">
          <el-input v-model="addForm.deviceId"></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="addForm.deviceName"></el-input>
        </el-form-item>
        <el-form-item label="故障原因">
          <el-input v-model="addForm.faultCause"></el-input>
        </el-form-item>
        <el-form-item label="发送时间">
          <el-input v-model="addForm.sendTime"></el-input>
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
  import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser, getMessageList} from '../../api/api';

  export default {
    data() {
      return {
        searchDeviceID:"",                //第一个搜索框里绑定的设备ID
        searchDeviceName:"",              //第二个搜索框里绑定的设备名称
        messageList:[],
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
          deviceId: "",
          deviceName: "",
          faultCause: "",
          sendTime: ""
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

        addFormVisible: false,                      //新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          deviceId: "",
          deviceName: "",
          faultCause: "",
          sendTime: ""
        }

      }
    },
    methods: {
      searchById(){
                                                      //获取搜索设备ID接口信息


      },
      searchByName(){
                                                      //获取搜索设备名称接口信息


      },
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
      getMessageList() {
        let para = {
          page: this.page,
          pageSize: 10
        };
        this.listLoading = true;
        //NProgress.start();
        getMessageList(para).then((res) => {
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
            this.getMessageList();
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
          deviceId: "",
          deviceName: "",
          faultCause: "",
          sendTime: ""
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
              editMessage(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getMessageList();
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
              addMessage(para).then((res) => {                  //////////////这里需要改成正确的添加消息接口
                this.addLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                this.getMessageList();
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
      this.getMessageList();
    }
  }

</script>

<style scoped>
  .Style{
    margin-left: 0px;
    padding: 10px;
    padding-right: 0;
    padding-left: 0;
    border: 0px solid #d1dbe5;
    border-radius: 20px;
    background-color: #fff;
    overflow: hidden;

  }

</style>
