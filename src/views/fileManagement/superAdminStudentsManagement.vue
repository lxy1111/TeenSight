<template>
  <section>
    <!--工具条-->
    <div class="retrieval  criteria Style">
      <el-form style="margin-left: 2rem;" :inline="true" :model="selectForm" ref="selectForm">
        <el-form-item>
          <el-input style="width: 50%;" size="small" placeholder="请输入学生姓名" v-model.trim="selectForm.studentName"></el-input>
        </el-form-item>
        <el-form-item>
         <el-input style="width: 50%;" size="small" placeholder="请输入学校名称" v-model.trim="selectForm.schoolName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input style="width: 50%;" size="small" placeholder="请输入年级"  v-model.trim="selectForm.gradeNo"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input style="width: 50%;" size="small" placeholder="请输入班级" v-model.trim="selectForm.classNo"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="reset-student" type="primary" round @click="handleselect">
            <span style="font-size: 0.9rem;font-family: PingFang SC;">
              搜索
            </span>
          </el-button>
          <el-button class="reset-student" type="primary" round @click="handleReset">
            <span style="font-size: 0.9rem;font-family: PingFang SC;">
              重置
            </span>
          </el-button>
        </el-form-item>

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

        <el-form-item v-if="!hidedelete">
          <el-button class="reset-student" type="primary" round @click="doUpgrade">
            <span style="font-size: 0.9rem;font-family: PingFang SC;">
              一键升班
            </span>
          </el-button>
        </el-form-item>


      </el-form>



      <el-dialog  title="批量导入" :visible.sync="batchAddVisible" @closed="handlebeforeclose" >
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
    <el-link  :href="require('../../assets/img/template.xlsx')" download="模版文件.xlsx"  style="left: 44%">
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

      <div class="retrieval  criteria Style">
        <el-table
                ref="multipleTable"
                :data="students"
                stripe
                highlight-current-row
                tooltip-effect="dark"
                :row-key="(row)=>{ return row.id}"
                @selection-change="handleSelectionChange">
          <el-table-column width="30" :reserve-selection="true" v-if="this.path!='superAdmin'"
                  type="selection">
          </el-table-column>
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
            <template slot-scope="scope">
              {{scope.row.sex==0?'男':'女'}}
            </template>
          </el-table-column>


          <el-table-column
                  prop="id"
                  label="操作"
                  show-overflow-tooltip align="center">
            <template scope="scope">
            <el-link style="color: #7980FA;" size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-link>
            <el-link style="color: #7980FA;" size="small" v-if="!hidedelete" @click="handleDel(scope.$index, scope.row)">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
        <el-button style="margin-left: 2rem; margin-top: 1rem;" type="primary" v-if="this.path!='superAdmin'" @click.native="generateStudentCode1">生成一字形学生二维码</el-button>
        <el-button style="margin-left: 2rem; margin-top: 1rem;" type="primary" v-if="this.path!='superAdmin'" @click.native="generateSurveyCode1" >生成一字形普查二维码</el-button>
          <el-button style="margin-left: 2rem; margin-top: 1rem;" type="primary" v-if="this.path!='superAdmin'" @click.native="generateStudentCode">生成井字形学生二维码</el-button>
          <el-button style="margin-left: 2rem; margin-top: 1rem;" type="primary" v-if="this.path!='superAdmin'" @click.native="generateSurveyCode" >生成井字形普查二维码</el-button>
        <el-pagination :current-page.sync="page" layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
        </el-pagination>
      </div>
    </div>

    <!--工具条-->
      <el-dialog title="学生信息二维码"   style="border: 0;" :visible.sync="qrcodevisible1" :close-on-click-modal="false">
          <div id="printArea3">
              <div  v-for="item in studentInfoCodeList" style="width: 100%; text-align: center">
                  <!--预览页面三个一排：210px，打印页面三个一排：232px-->

                  <el-row>
                      <el-image
                              style="width: 100px; height: 100px"
                              :src="item.url">
                      </el-image>
                  </el-row>
                  <el-row >
                      <span style="">学生姓名:{{item.req.stuName}}</span>
                  </el-row>

              </div>
          </div>
          <el-row >
              <el-button type="primary" style="margin-left: 45%" @click="clickPrinting3">打印</el-button>
          </el-row>
      </el-dialog>


      <el-dialog title="学生普查二维码"  style="border: 0;" :visible.sync="surveyqrcodevisible1" :close-on-click-modal="false">
          <div id="printArea4">
              <div  v-for="item in surveyqrcodelit" style="width: 100%; text-align: center">
                  <!--预览页面三个一排：210px，打印页面三个一排：232px-->
                  <el-row>
                      <el-image
                              style="width: 100px; height: 100px"
                              :src="item.url">
                      </el-image>
                  </el-row>
                  <el-row >
                      <span style="">学生姓名:{{item.req.stuName}}</span>
                  </el-row>
              </div>
          </div>
          <el-row >
              <el-button type="primary" style="margin-left: 45%" @click="clickPrinting4">打印</el-button>
          </el-row>
      </el-dialog>

     <el-dialog title="学生信息二维码"   style="border: 0;" :visible.sync="qrcodevisible" :close-on-click-modal="false">
       <div id="printArea">
     <div  v-for="item in studentInfoCodeList" style="width: 33%; height: 200px; display: inline-block; text-align: center">
       <!--预览页面三个一排：210px，打印页面三个一排：232px-->

      <el-row>
        <el-image
                style="width: 100px; height: 100px"
                :src="item.url">
        </el-image>
      </el-row>
      <el-row >
        <span style="">学生姓名:{{item.req.stuName}}</span>
      </el-row>

    </div>
       </div>
       <el-row >
         <el-button type="primary" style="margin-left: 45%" @click="clickPrinting">打印</el-button>
       </el-row>
  </el-dialog>


    <el-dialog title="学生普查二维码"  style="border: 0;" :visible.sync="surveyqrcodevisible" :close-on-click-modal="false">
    <div id="printArea2">
      <div  v-for="item in surveyqrcodelit" style="width: 33%; height:200px; display: inline-block; text-align: center">
        <!--预览页面三个一排：210px，打印页面三个一排：232px-->
        <el-row>
          <el-image
                  style="width: 100px; height: 100px"
                  :src="item.url">
          </el-image>
        </el-row>
        <el-row >
          <span style="">学生姓名:{{item.req.stuName}}</span>
        </el-row>
      </div>
    </div>
      <el-row >
        <el-button type="primary" style="margin-left: 45%" @click="clickPrinting2">打印</el-button>
      </el-row>
    </el-dialog>

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
    getStudentsList,
    addStudents, removeStudent, getStudentCode, getSurveyList, getSurveyCode, getSchoolListPage, upgrade
  } from '../../api/api';


  import UploadExcelComponent from './uploadExcel'

  import XLSX from 'xlsx'

  export default {
    components: { UploadExcelComponent },
    data() {
      return {
        allCheck:false,
        myid:'',
        isIns:false,
        ischeckins:false,
        selectForm:{
          page:1,
          pageSize:10,
          institutionId: null,
          schoolId:null,
          studentName:null,
          schoolName:null,
          classNo:null,
          gradeNo:null
        },
        loading: false,
        excelData: {
          header: null,
          results: null
        },
        tableData: [],
        tableHeader: [],

        fourthstep: false,
        firststep: true,
        secondstep: false,
        thirdstep: false,
        finishstep: 0,
        batchAddVisible: false,
        path: '',
        hidedelete: false,
        surveyqrcodevisible1:false,
        surveyqrcodevisible:false,
        students: [],
        filters: {
          name: ''
        },
        gender: [{
          label: '男',
          value: '男'
        },
          {
            label: '女',
            value: '女'
          },
          {
            label: '未知',
            value: '未知'
          },
          {
            label: '性别-全部',
            value: '性别-全部'
          }
        ],
        studentInfoCodeList:[],
        surveyqrcodelit:[],
        qrcodevisible1:false,
        qrcodevisible:false,
        gendervalue: '性别-全部',
        users: [],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],//列表选中列
        testData:{
          name:"lxy",
          nickname:"lxxx"
        },

        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        //编辑界面数据
        editForm: {
        },

        form: {
          classes: '',
          gender: '',
          version: '',
          versionStatus: '',
          planeOnlineDateFirst: '',
          planeOnlineDateSecond: '',
          actualOnlineDateFirst: '',
          actualOnlineDateSecond: '',
        },

        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
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
        schoolist:[],
        multipleselection:[],
        showSelectSchool:false
      }
    },
    methods: {
      handleselect(){
        if(this.selectForm.studentName==''){
          this.selectForm.studentName=null;
        }
        if(this.selectForm.schoolName==''){
          this.selectForm.schoolName=null;
        }
        if(this.selectForm.classNo==''){
          this.selectForm.classNo=null;
        }
        if(this.selectForm.gradeNo==''){
          this.selectForm.gradeNo=null;
        }
        this.page=1;
        this.getStudentsList();
      },
      generateSurveyCode(){
        let codelist=[];
        for(let i=0;i<this.multipleselection.length;i++){
          let id=this.multipleselection[i].id;
          codelist.push(id);
        }

        let para2={
          page:1,
          pageSize:10,
          schoolId:this.myid
        }
        getSurveyList(para2).then(res=>{
          if(res.data.succeed!=true){
            this.$message({
              message:'无普查数据',
              type:'error'
            })
            return;
          }
          let surveyid=res.data.result.items[0].id;
          let para={
            idList:codelist,
            surveyId:surveyid
          };
        getSurveyCode(para).then((res)=>{
          console.log(res);
          if(!res.succeed){
            this.$message({
              message:'无普查数据',
              type:'error'
            })
            return;
          }
          this.$message({
            message:'成功',
            type:'success'
          })
          this.surveyqrcodevisible=true;
          this.surveyqrcodelit=res.result;

        })
        })
      },
        generateSurveyCode1(){
            let codelist=[];
            for(let i=0;i<this.multipleselection.length;i++){
                let id=this.multipleselection[i].id;
                codelist.push(id);
            }

            let para2={
                page:1,
                pageSize:10,
                schoolId:this.myid
            }
            getSurveyList(para2).then(res=>{
                if(res.data.succeed!=true){
                    this.$message({
                        message:'无普查数据',
                        type:'error'
                    })
                    return;
                }
                let surveyid=res.data.result.items[0].id;
                let para={
                    idList:codelist,
                    surveyId:surveyid
                };
                getSurveyCode(para).then((res)=>{
                    console.log(res);
                    if(!res.succeed){
                        this.$message({
                            message:'无普查数据',
                            type:'error'
                        })
                        return;
                    }
                    this.$message({
                        message:'成功',
                        type:'success'
                    })
                    this.surveyqrcodevisible1=true;
                    this.surveyqrcodelit=res.result;

                })
            })
        },
        generateStudentCode1(){
            let codelist=[];
            if(this.multipleselection.length==0){
                this.$message({
                    message:'未选择学生',
                    type:'error'
                })
                return
            }
            for(let i=0;i<this.multipleselection.length;i++){
                let id=this.multipleselection[i].id;
                codelist.push(id);
            }
            let para={
                codeList:codelist
            };
            getStudentCode(para).then((res)=>{

                console.log(res);
                if(res.succeed!=true){
                    this.$message({
                        message:'无普查数据',
                        type:'error'
                    })
                    return
                }
                this.$message({
                    message:'成功',
                    type:'success'
                })
                this.qrcodevisible1=true;
                this.studentInfoCodeList=res.result;
            })

        },
      generateStudentCode(){
          let codelist=[];
          if(this.multipleselection.length==0){
            this.$message({
              message:'未选择学生',
              type:'error'
            })
            return
          }
          for(let i=0;i<this.multipleselection.length;i++){
            let id=this.multipleselection[i].id;
            codelist.push(id);
          }
          let para={
            codeList:codelist
          };
          getStudentCode(para).then((res)=>{

            console.log(res);
            if(res.succeed!=true){
              this.$message({
                message:'无普查数据',
                type:'error'
              })
              return
            }
            this.$message({
              message:'成功',
              type:'success'
            })
            this.qrcodevisible=true;
           this.studentInfoCodeList=res.result;
          })

      },


      handleSelectionChange(val){
          this.multipleselection=val;
      },
      handleReset(){
        this.selectForm.gradeNo=null;
        this.selectForm.classNo=null;
        this.selectForm.studentName=null;
        this.selectForm.schoolName=null;
        this.page=1;
      },
      handlebeforeclose(){
        this.finishstep=0;
        this.firststep=true;
        this.secondstep=false;
        this.thirdstep=false;
        this.fourthstep=false;
      },
      exportWord(){
        let _this = this;
        // 读取并获得模板文件的二进制内容
        JSZipUtils.getBinaryContent("demo.docx", function(error, content) {
          // input.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
          // 抛出异常
          if (error) {
            throw error;
          }

          // 创建一个JSZip实例，内容为模板的内容
          let zip = new JSZip(content);
          // 创建并加载docxtemplater实例对象
          let doc = new window.docxtemplater().loadZip(zip);
          // 设置模板变量的值
          doc.setData({
            ..._this.form,
            table: _this.testData
          });

          try {
            // 用模板变量的值替换所有模板变量
            doc.render();
          } catch (error) {
            // 抛出异常
            let e = {
              message: error.message,
              name: error.name,
              stack: error.stack,
              properties: error.properties
            };
            console.log(JSON.stringify({ error: e }));
            throw error;
          }

          // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
          let out = doc.getZip().generate({
            type: "blob",
            mimeType:
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          });
          // 将目标文件对象保存为目标类型的文件，并命名
          saveAs(out, "报价单.docx");
        });


      },
      turntosuccess() {
        this.finishstep = 4;
        this.thirdstep = false;
        this.fourthstep = true;
        for(let i=0;i<this.tableData.length;i++) {
          let student = {
            classNo: this.tableData[i].班级,
            gradeNo: this.tableData[i].年级,
            height: this.tableData[i].身高,
            idCard: this.tableData[i].身份证号,
            number: this.tableData[i].学生学号,
            parentName: this.tableData[i].家长姓名,
            parentPhone: this.tableData[i].家长电话,
            schoolId: this.myid,
            sex: this.tableData[i].学生性别=='男'? 0:1,
            stuName: this.tableData[i].学生姓名,
            weight: this.tableData[i].体重,
          }
          addStudents(student).then((res) => {
                    console.log(res);
                   if(res.result!=true){
                     this.$message({
                       message:res.codeMessage,
                       type:'error'
                     })
                   }

            this.getStudentsList();
                  }
          )
        }
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.getStudentsList();
      },

       clickPrinting(){
         let subOutputRankPrint = document.getElementById('printArea');
         console.log(subOutputRankPrint.innerHTML);
         let newContent =subOutputRankPrint.innerHTML;
         let oldContent = document.body.innerHTML;
         document.body.innerHTML = newContent;
         window.print();
         window.location.reload();
         document.body.innerHTML = oldContent;
         return false;
       },

      clickPrinting2(){
        let subOutputRankPrint = document.getElementById('printArea2');
        console.log(subOutputRankPrint.innerHTML);
        let newContent =subOutputRankPrint.innerHTML;
        let oldContent = document.body.innerHTML;
        document.body.innerHTML = newContent;
        window.print();
        window.location.reload();
        document.body.innerHTML = oldContent;
        return false;
      },
        clickPrinting3(){
            let subOutputRankPrint = document.getElementById('printArea3');
            console.log(subOutputRankPrint.innerHTML);
            let newContent =subOutputRankPrint.innerHTML;
            let oldContent = document.body.innerHTML;
            document.body.innerHTML = newContent;
            window.print();
            window.location.reload();
            document.body.innerHTML = oldContent;
            return false;
        },
        clickPrinting4(){
            let subOutputRankPrint = document.getElementById('printArea4');
            console.log(subOutputRankPrint.innerHTML);
            let newContent =subOutputRankPrint.innerHTML;
            let oldContent = document.body.innerHTML;
            document.body.innerHTML = newContent;
            window.print();
            window.location.reload();
            document.body.innerHTML = oldContent;
            return false;
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




      downloadIamge(imgsrc, name) {//下载图片地址和图片名
        var image = new Image();
        // 解决跨域 Canvas 污染问题
        image.setAttribute("crossOrigin", "anonymous");
        image.onload = function () {
          var canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          var context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, image.width, image.height);
          var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

          var a = document.createElement("a"); // 生成一个a元素
          var event = new MouseEvent("click"); // 创建一个单击事件
          a.download = name || "photo"; // 设置图片名称
          a.href = url; // 将生成的URL设置为a.href属性
          a.dispatchEvent(event); // 触发a的单击事件
        };
        image.src = imgsrc;
      },
      downloadImages(){
        for(var i=0;i<this.studentInfoCodeList.length;i++){
                 this.downloadIamge(this.studentInfoCodeList[i].url,this.studentInfoCodeList[i].req.stuName);
        }
      },

      doUpgrade(){

           let para= {
             schoolId:null,
             institutionId:null
           }
          if(this.isIns){
            para.institutionId=this.myid;
          }else {
            para.schoolId=this.myid;
          }
        this.$confirm('确认升班吗?', '提示', {
          type: 'warning'
        }).then(() => {
          upgrade(para).then(res=>{

            this.$message({
              message: '升班成功',
              type: 'success'
            });
            this.getStudentsList();

          })
        });
      },
      // 文件读取后执行
      handleSuccess({ results, header }) {
        this.tableData = results
        this.tableHeader = header
        this.$message({
          message:'上传成功，点击下一步预览数据',
          type:'success'
        })

      },
      downloadTempalteFile() {

        let url = '../../assets/img/file.jpeg';

        window.open(url);
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
      showBatchAdd() {
        this.batchAddVisible = true;
      },
      formatSex: function (row, column) {
        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
      },
      handleCurrentChange(val) {
        this.page = val;
        this.selectForm.page=this.page;
         this.getStudentsList();
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
      getStudentsList() {
        var user = sessionStorage.getItem('user');
        user=JSON.parse(user);
        var institute={};
        let para={};
        if(user.type==2||user.type==1) {
          var institute = sessionStorage.getItem('institute');
          institute = JSON.parse(institute);
          this.selectForm.page=this.page;
          this.selectForm.institutionId=institute.insDetail.id;
        }else if(user.type==0){
         this.selectForm.page=this.page;
        }
         else{
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

        getStudentsList(this.selectForm)
                .then(res => {
                  console.log("login get success");
                  console.log(res);
                  this.students = res.data.result.items;
                  for(let i=0;i<this.students.length;i++){
                    if(this.students[i].remark!=null&&this.students[i].remark.length>0){
                      this.students[i].gradeNo=this.students[i].remark;
                    }
                  }
                  this.total = res.data.result.totalNum;
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
        let para = {id: row.id};
        removeStudent(para).then((res) => {
          this.listLoading = false;
          //NProgress.done();
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getStudentsList();
        });
      }).catch(() => {

      });
    },
      allCheckEvent () {
        if (this.allCheck) {
          this.students.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row, true)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
    //显示编辑界面
    handleEdit: function (index, row) {
      // this.editFormVisible = true;
      //  this.editForm = Object.assign({}, row);
      this.editForm = Object.assign({}, row);
      this.$router.push({path: '/' + this.path + '/' + this.path + 'StudentDetail',
        query:{
        id:this.editForm.id,
          query:0
        }
      });
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
        let para = {ids: ids};
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
    mounted(){
     // this.getUsers();
      this.getStudentsList();
      var user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        if(user.type==0){
          this.path='superAdmin';
          this.hidedelete=true;
        }
        else if(user.type==1||user.type==2){
          this.path='institute';
          if(user.type==1) {
            this.hidedelete = true;
          }else{
            this.isIns=true;
            var insinfo = sessionStorage.getItem('institute');
            insinfo=JSON.parse(insinfo);
            var id=insinfo.insDetail.id;
            this.myid=id;
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
        else {
          var schoolinfo = sessionStorage.getItem('schoolinfo');
          schoolinfo=JSON.parse(schoolinfo);
          var id=schoolinfo.schoolId;
          this.myid=id;
          this.path='school';
          this.hidedelete=false;
        }

      }
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
  .excel-upload-input{
    display: none;
    z-index: -9999;
  }
  .drop{
    border: 2px dashed #bbb;
    width: 600px;
    height: 160px;
    line-height: 160px;
    margin: 0 auto;
    font-size: 24px;
    border-radius: 5px;
    text-align: center;
    color: #bbb;
    position: relative;
  }

</style>
