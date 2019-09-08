<template>
  <section>
    <!--工具条-->
    <div class="retrieval  criteria Style">
      <el-form :inline="true" :model="selectForm">
        <el-form-item>
         <el-input style="width: 50%;" size="small" placeholder="请输入班主任名字" v-model.trim="selectForm.teacherName">
         </el-input>
        </el-form-item>
        <el-form-item>
          <el-input style="width: 50%;" size="small" placeholder="请输入学校名称" v-model.trim="selectForm.schoolName">
          </el-input>
        </el-form-item>
        <el-form-item>
         <el-input style="width: 50%;" size="small" placeholder="请输入年级号" v-model.trim="selectForm.gradeNo">
         </el-input>
        </el-form-item>
        <el-form-item>
        <el-input style="width: 50%;" size="small" placeholder="请输入班级号" v-model.trim="selectForm.classNo"></el-input>
        </el-form-item>
        <el-form-item><el-button type="primary" round @click="handleselect">搜索</el-button></el-form-item>
        <el-form-item><el-button type="primary" round @click="handleReset">重置</el-button></el-form-item>
        <el-form-item v-if="!hidedelete&&isIns">
          <el-button class="reset-student" type="primary" round @click="showSelect">
            <span style="font-size: 0.9rem;font-family: PingFang SC;">
              批量导入
            </span>
          </el-button>
        </el-form-item>
        <el-form-item v-if="!hidedelete&&!isIns">
          <el-button class="reset-student" type="primary" round @click="showBatchAdd">
            <span style="font-size: 0.9rem;font-family: PingFang SC;">
              批量导入
            </span>
          </el-button>
        </el-form-item>
      </el-form>


      <div class="retrieval  criteria Style">
        <el-table
                ref="multipleTable"
                :data="teachersList"
                stripe
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="">
          <el-table-column
                  prop="schoolName"
                  label="所在学校"
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
                  prop="teacherName"
                  label="班主任"
                  show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column
                  prop="teacherPhone"
                  label="联系电话"
                  show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column v-if="!hidedelete"
                  prop="id"
                  label="操作"
                  show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <el-link style="color: #7980FA; " size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-link>
              <el-link style="color: #7980FA; " size="small" v-if="!hidedelete" @click="handleDel(scope.$index, scope.row)">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
        </el-pagination>
      </div>
    </div>

    <!--工具条-->

    <el-dialog  title="批量导入" :visible.sync="batchAddVisible" @closed="handlebeforeclose">
      <el-steps align-center  :space="200" :active.sync="finishstep" finish-status="success">
        <el-step  title="下载模版"></el-step>
        <el-step  title="上传文件"></el-step>
        <el-step  title="审核数据"></el-step>
        <el-step  title="完成"></el-step>
      </el-steps>
      <div v-if="firststep">
        <el-row>
          <img  style="position: relative; width: 10%; height: 10%; left: 45%" src="../../assets/img/file.jpeg">
        </el-row>
        <el-row>
          <el-link  :href="require('../../assets/img/template2.xlsx')" download="模版文件.xlsx"  style="left: 44%">
            下载模版文件
          </el-link>
        </el-row>
        <el-row >
          <div align="center">
            <el-button class="reset-student" type="primary" @click="turntoUpload" round>
              下一步
            </el-button>
          </div>
        </el-row>
      </div>

      <div v-if="secondstep">
        <el-row >
          <div align="center">
            <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
            <el-button class="reset-student" type="primary" @click="turntocheck" round>
              下一步
            </el-button>
          </div>
        </el-row>
      </div>



      <div v-if="thirdstep">
        <el-row>
          <div align="center">
            <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
              <el-table-column v-for="item of tableHeader" :prop="item" :label="item" :key="item"/>
            </el-table>
            <el-button class="reset-student" type="primary" @click="turntosuccess" round>
              下一步
            </el-button>
          </div>
        </el-row>
      </div>

      <div v-if="fourthstep">
      </div>

    </el-dialog>


    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">

        <el-form-item label="年级">
          <el-input v-model="editForm.gradeNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="editForm.classNo" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="负责人">
            <el-input v-model="editForm.teacherName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="联系电话">
          <el-input v-model="editForm.teacherPhone" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog  :visible.sync="showSelectSchool" title="选择学校"  :close-on-click-modal="false">
      <el-form  label-width="80px" >
        <el-form-item label="姓名" prop="schoolId">
          <el-select style="width: 86%;"
                     class="select-school-name"
                     v-model="myid"
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
        <el-button @click.native="showSelectSchool = false">取消</el-button>
        <el-button type="primary" @click.native="showBatchAdd" :loading="addLoading">确认</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
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
  import {
    getUserListPage,
    getTeachersList,
    removeUser,
    batchRemoveUser,
    editUser,
    addUser,
    removeTeacher, addGrades, editGrades, getSchoolListPage
  } from '../../api/api';
  import UploadExcelComponent from './uploadExcel'
  export default {
    components: { UploadExcelComponent },
    data() {
      return {
        selectForm:{
          page:1,
          pageSize:10,
          institutionId:null,
          schoolId:null,
          teacherName:null,
          gradeNo:null,
          classNo:null,
          schoolName:null

        },
        showSelectSchool:false,
        hidedelete:false,
        teachers:[],
        filters: {
          name: ''
        },
        teachersList:[],
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
        fourthstep: false,
        firststep: true,
        secondstep: false,
        thirdstep: false,
        finishstep: 0,
        batchAddVisible:false,
        gendervalue: '性别-全部',
        isIns:false,
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
            classgradeNo:'',
            school:'',
            teacher:'',
            tel:'',
           account:'',
          id:''
        },
       myid:'',
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
        },
        allschool:[],
        schoolist:[]

      }
    },
    methods: {
      handleReset(){
        this.selectForm.teacherName=null;
        this.selectForm.classNo=null;
        this.selectForm.gradeNo=null;
        this.selectForm.schoolName=null;
      },
      handleselect(){
        if(this.selectForm.gradeNo==''){
          this.selectForm.gradeNo=null;
        }
        if(this.selectForm.classNo==''){
          this.selectForm.classNo=null;
        }
        if(this.selectForm.teacherName==''){
          this.selectForm.teacherName=null;
        }
        if(this.selectForm.schoolName==''){
          this.selectForm.schoolName=null;
        }
      this.getTeachersList();
      },
      beforeUpload(file) {
        // 取文件大小，限制文件大小超过1mb
        const isLt1M = file.size / 1024 / 1024 < 1
        if (isLt1M) {
          return true
        }
        this.$message({
          message: '上传的Excel文件不能大于1mb.',
          type: 'warning'
        })
        return false
      },
      handleSuccess({ results, header }) {
        this.tableData = results
        this.tableHeader = header
        this.$message({
          message:'上传成功，点击下一步预览数据',
          type:'success'
        })

      },
      showSelect(){
        this.showSelectSchool=true;
        this.schoolist=[];
        for(let i=0;i<this.allschool.length;i++){
          let school ={
            value:this.allschool[i].id,
            label:this.allschool[i].schoolName
          }
          this.schoolist.push(school);
        }
      },
      handlebeforeclose(){
        this.finishstep=0;
        this.firststep=true;
        this.secondstep=false;
        this.thirdstep=false;
        this.fourthstep=false;
      },
      turntosuccess() {
        this.finishstep = 4;
        this.thirdstep = false;
         this.fourthstep = true;
        for(let i=0;i<this.tableData.length;i++) {
          let teacher = {
            classNo: this.tableData[i].班级,
            gradeNo: this.tableData[i].年级,
            schoolId: this.myid,
            teacherName: this.tableData[i].教师姓名,
            teacherPhone: this.tableData[i].教师手机号,
          }
          addGrades(teacher).then((res) => {
                    console.log(res);
                    if(res.result!=true){
                      this.$message({
                        message:'出错',
                        type:'error'
                      })
                    }
            this.getTeachersList();

                  }
          )
        }
        this.$message({
          message: '添加成功',
          type: 'success'
        })


      },

      turntocheck() {
        this.finishstep = 2;
        this.secondstep = false;
        this.thirdstep = true;
      },

      turntoUpload() {
        this.finishstep = 1;
        this.firststep = false;
        this.secondstep = true;
      },
      showBatchAdd() {
        this.batchAddVisible = true;
      },
      //性别显示转换
      formatSex: function (row, column) {
        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
      },
      handleCurrentChange(val) {
        this.page = val;
        this.selectForm.page=this.page;
        this.getTeachersList();
      },
      getTeachersList(){
        var user = sessionStorage.getItem('user');
        user=JSON.parse(user);
        var institute={};
        let para={};
        if(user.type==2||user.type==1) {
          var institute = sessionStorage.getItem('institute');
          institute = JSON.parse(institute);
          this.selectForm.page=this.page;
          this.selectForm.institutionId=institute.insDetail.id
        }else if(user.type==0) {
          this.selectForm.page=this.page;
        }else{
          var schoolinfo=sessionStorage.getItem('schoolinfo');
          schoolinfo= JSON.parse(schoolinfo);
          this.myid=schoolinfo.schoolId;
          this.selectForm.page=this.page;
          this.selectForm.schoolId=schoolinfo.schoolId;
        }
        this.listLoading = true;
        console.log("hihihi");
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
       this.teachers=[];

        getTeachersList(this.selectForm)
                .then(res => {
                  console.log("login get success");
                  console.log(res);
                  let reslist=res.data.result.items;
                  this.teachersList=reslist;
                  this.total=res.data.result.totalNum;
                  console.log(this.teachers);
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
          removeTeacher(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getTeachersList();
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
              editGrades(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getTeachersList();
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
     this.getTeachersList();
      var user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        if(user.type==0){
          this.hidedelete=true;
        }
        else if(user.type==1||user.type==2){
          if(user.type==1) {
            this.hidedelete = true;
          }else{
            this.isIns=true;
            var insinfo = sessionStorage.getItem('institute');
            insinfo=JSON.parse(insinfo);
            var id=insinfo.insDetail.id;
            var para={
              page:1,
              pageSize:1000000,
              institutionId:id
            }
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
        else{
          this.hidedelete=false;
        }
      }
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
