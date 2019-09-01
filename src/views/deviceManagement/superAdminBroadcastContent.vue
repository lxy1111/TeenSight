<template>
  <section>

    <div class="retrieval  criteria Style">

      <div style="background: white;
                  border: 1px;
                  border-radius: 0.5rem;
                  margin-top: 0.5rem;
                  margin-right: 1rem;
                  margin-left: 1rem;">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item style="transform:translateY(50%)" label="公告标题">
            <input style="width: 90%;
                          position: relative;
                          padding-left: 1rem;
                          padding-right: 1rem;
                          height: 2.5rem;
                          font-size: 0.8rem;
                          border-radius: 1rem;
                          background: whitesmoke;
                          border: 0;
                          position: relative;" v-model="addForm.title"></input>
          </el-form-item>
          <el-form-item style="transform:translateY(10%)" label="公告正文">
            <textarea
                      style="width: 90%;
                              position: relative;
                              height: 8rem;
                              padding: 1rem;
                              font-size: 0.8rem;
                              margin-bottom: 1rem;
                              border-radius: 1rem;
                              font-family: PingFang SC;
                              background: whitesmoke;
                              border: 0;
                              resize: none;"
                      v-model="addForm.description"></textarea>
          </el-form-item>
        </el-form>

        <div style="text-align: right; margin-right: 1rem; padding-bottom: 2rem;">
          <el-button class="reset-student"
                     type="primary" round
                     @click="clear">
            <span style="font-size: 0.9rem;font-family: PingFang SC;">
              清空
            </span>
          </el-button>
          <el-button class="reset-student"
                     type="primary" round
                     @click="addSubmit">
            <span style="font-size: 0.9rem;font-family: PingFang SC;">
              发送
            </span>
          </el-button>
        </div>
      </div>


      <div style="font-size: 1rem;
                  font-family: PingFang SC;
                  margin-left: 2rem;
                  margin-top: 3rem;">历史推送公告</div>
      <el-table
              ref="multipleTable"
              :data="broadcastContent"
              tooltip-effect="dark"
              style="width: 100%">

        <el-table-column
                prop="createTime"
                width="200"
                show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <div style="background: lightgrey;
                        width: 9.5rem;
                        height: 4rem;
                        margin-left: 2rem;
                        border-radius: 1rem;
                        position: inherit;">
              <el-col style="height: 2rem;" :span="24">
                <div style="transform: translateY(70%); color: black;">{{scope.row.createTime}}</div>
              </el-col>
            </div>
          </template>
        </el-table-column>
        <el-table-column
                prop="title"
                show-overflow-tooltip align="left">
          <template slot-scope="scope">
            <el-form :model="broadcastContent">
              <el-form-item prop="title">
                <span style="font-size: 0.9rem;
                             font-weight: bolder;
                             color: black;
                             font-family: PingFang SC;">{{scope.row.title}}</span>
              </el-form-item>
              <el-form-item prop="description">
                <textarea disabled="disabled"
                        style="width: 90%;
                                  position: relative;
                                  height: 8rem;
                                  padding: 1rem;
                                  font-size: 0.8rem;
                                  margin-bottom: 1rem;
                                  border-radius: 1rem;
                                  font-family: PingFang SC;
                                  background: white;
                                  border: 0;
                                  resize: none;">{{scope.row.description}}</textarea>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
                width="100"
                show-overflow-tooltip align="center">
          <template slot-scope="scope">
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
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
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
  import {getUserListPage,removeNotice, addNotice, removeUser, batchRemoveUser, editUser, addUser, getNoticeList} from '../../api/api';

  export default {
    data() {
      return {
        broadcastContent:[{
          createTime:"",
          description:"",
          isDel:false,
          modifyTime:"",
          title:""
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
          createTime:"",
          description:"",
          isDel:false,
          modifyTime:"",
          title:""
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
          createTime:"",
          description:"",
          isDel:false,
          modifyTime:"",
          title:""
        }

      }
    },
    mounted() {
      this.getNoticeList();
      //this.getUsers();
    },
    methods: {
      clear(){
        this.addForm = {
          createTime:"",
          description:"",
          isDel:false,
          modifyTime:"",
          title:""
        }
      },
      //性别显示转换
      formatSex: function (row, column) {
        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getNoticeList();
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
          let para = {
            codeList: [row.id]
          };
          removeNotice(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getNoticeList();
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
          createTime:"",
          description:"",
          isDel:false,
          modifyTime:"",
          title:""
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
              addNotice(para).then((res) => {
                this.addLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['addForm'].resetFields();
                this.addForm = {
                  createTime:"",
                  description:"",
                  isDel:false,
                  modifyTime:"",
                  title:""
                }
                this.getNoticeList();
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
      getNoticeList(){
        let para = {
          page: this.page,
          pageSize:10
        };
        this.listLoading = true;
        //NProgress.start();
        getNoticeList(para).then((res) => {
          this.total = res.data.result.totalNum;
          this.listLoading = false;
          console.log(res);
          this.broadcastContent=res.data.result.items;
          //NProgress.done();
        });

      },
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
