<template>
  <section>
    <!--工具条-->
    <div class="retrieval  criteria Style">
      <el-form :inline="true" :model="filters">
        <el-row type="flex" >
          <el-form-item>
            <el-select size="small" v-model="form.versionStatus" placeholder="请搜索学校名称">
              <el-option
                      v-for="item in versionOptions"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
            <el-form-item prop="planeOnlineDateSecond" label="年级">
              <el-select size="small" v-model="form.versionStatus" placeholder="请选择">
                <el-option
                        v-for="item in versionOptions"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="planeOnlineDateSecond" label="班级">
              <el-select size="small" v-model="form.versionStatus" placeholder="请选择">
                <el-option
                        v-for="item in versionOptions"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="planeOnlineDateSecond" label="普查时间范围">
              <el-select size="small" v-model="form.versionStatus" placeholder="请选择">
                <el-option
                        v-for="item in versionOptions"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          <el-form-item><el-button type="primary" round @click="Search">重置</el-button></el-form-item>

        </el-row>
      </el-form>
      <el-form :model="form" label-width="160px">
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="4" >
            <span style="font-size: xx-large" >上海小学</span>
          </el-col>
          <el-col :span="20"> <el-button type="primary" round  @click="Search">下载PDF报告</el-button></el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="4" >
            <span  >视力统计情况</span>
          </el-col>
          <el-col :span="4" >
            <span  >2019年7月29日16:00</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="4" >
            <span  >学校所在地</span>
          </el-col>
          <el-col :span="4" >
            <span  >学校类型</span>
          </el-col>
          <el-col :span="4" >
            <span  >学校人数</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="4" >
            <span  >xx区 xx</span>
          </el-col>
          <el-col :span="4" >
            <span  >小学</span>
          </el-col>
          <el-col :span="4" >
            <span  >0人</span>
          </el-col>
        </el-row>
      </el-form>

      <el-table
              ref="multipleTable"
              :data="tableData3"
              border
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
        <el-table-column
                prop="involvedproportion"
                label="筛查覆盖率(筛查参与情况)"
                show-overflow-tooltip
                align="center">
        </el-table-column>
        <el-table-column
                prop="badsightproportion"
                label="视力不良率(裸眼视力低于正常水平)"
                show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column
                prop="poorsightproportion"
                label="近视率(视力不良，且屈光读书低于-0.50)"
                show-overflow-tooltip align="center">
        </el-table-column>
      </el-table>
    </div>
    <div class="retrieval  criteria Style">
      <el-breadcrumb separator=">" class="bread-title" >
        <el-breadcrumb-item style="font-size: xx-large" >学校统计总览</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form :model="form" label-width="160px">
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="12" align="left">
            <span style="font-size: x-large">全球视力变化趋势</span>
          </el-col>
          <el-col :span="12">
            <span style="font-size: x-large">最后一次普查</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="5" align="left">
            <span style="font-size: large">视力不良率，近视率</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <div class="retrieval  criteria Style">
            <div id="globalsight"></div>
          </div>
        </el-row>

        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="12" align="left">
            <span style="font-size: x-large">近视率</span>
          </el-col>
          <el-col :span="12" >
            <span style="font-size: x-large">预警分布情况</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="5" align="left">
            <span style="font-size: large">视力不良且屈光度低于-0.5</span>
          </el-col>
          <el-col :span="17">
            <span style="font-size: large">各预警等级人数占比</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <div class="retrieval  criteria Style">
            <div id="schoolsight"></div>
          </div>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
          <div  class="retrieval  criteria Style">
            <div id="warning"></div>
          </div>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="24" align="left">
            <span style="font-size: large">关于预警分级</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="24" align="left">
            <span style="font-size: large">一级预警（视力正常且屈光正常）</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="24" align="left">
            <span style="font-size: large">非近视学生，这部分学生应该做好预防近视工作</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="24" align="left">
            <span style="font-size: large">二级预警（视力<5.0并且-6.00<=屈光度<-0.5）</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="24" align="left">
            <span style="font-size: large">轻度或中度近视学生，这部分学生应该做好控制近视度数增长</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="24" align="left">
            <span style="font-size: large">三级预警（视力<5.0并且屈光度<-6.00）</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="24" align="left">
            <span style="font-size: large">高度近视学生，这部分学生应时刻关注眼健康情况，防止眼底病变发生</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="24" align="left">
            <span style="font-size: large">预警分布情况</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="24" align="left">
            <span style="font-size: large">各预警等级人数占比</span>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="retrieval  criteria Style">

      <el-breadcrumb separator=">" class="bread-title" >
        <el-breadcrumb-item style="font-size: xx-large" >年级统计</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form :model="form" label-width="160px">
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="5" align="left">
            <span style="font-size: x-large">近视率</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <div class="retrieval  criteria Style">
            <div id="gradestatistic"></div>
          </div>
        </el-row>
      </el-form>
    </div>

    <div class="retrieval  criteria Style">

      <el-breadcrumb separator=">" class="bread-title" >
        <el-breadcrumb-item style="font-size: xx-large" >班级统计</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form :model="form" label-width="160px">
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="5" align="left">
            <span style="font-size: x-large">班级近视率</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <div class="retrieval  criteria Style">
            <el-table
                    ref="multipleTable"
                    :data="tableData2"
                    border
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
              <el-table-column
                      prop="class"
                      show-overflow-tooltip
                      align="center">
              </el-table-column>
              <el-table-column
                      prop="data"
                      label="一年级"
                      show-overflow-tooltip align="center">
              </el-table-column>
              <el-table-column
                      prop="data"
                      label="二年级"
                      show-overflow-tooltip align="center">
              </el-table-column>
              <el-table-column
                      prop="data"
                      label="三年级"

                      show-overflow-tooltip align="center">
              </el-table-column>
              <el-table-column
                      prop="data"
                      label="四年级"

                      show-overflow-tooltip align="center">
              </el-table-column>
              <el-table-column
                      prop="data"
                      label="五年级"
                      show-overflow-tooltip align="center">
              </el-table-column>
              <el-table-column
                      prop="data"
                      label="六年级"
                      show-overflow-tooltip align="center">
              </el-table-column>

            </el-table>

          </div>
        </el-row>
      </el-form>
    </div>
    <div class="retrieval  criteria Style">

      <el-breadcrumb separator=">" class="bread-title" >
        <el-breadcrumb-item style="font-size: xx-large" >性别统计</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form :model="form" label-width="160px">

        <el-row type="flex" class="row-bg" justify="right">
          <span style="font-size: x-large">男女生近视率</span>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <div class="retrieval  criteria Style">
            <div id="gender">
              <el-row type="flex" class="row-bg" justify="right">
                <span  style="font-size: x-large">男生近视率       0%</span>
              </el-row>
              <el-row type="flex" class="row-bg" justify="right">
                <span  style="font-size: x-large">女生近视率       0%</span>
              </el-row>
            </div>
          </div>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
          <div class="retrieval  criteria Style">
            <div id="genderstatistic"></div>
          </div>
        </el-row>
      </el-form>
    </div>
    <div class="retrieval  criteria Style">
      <el-breadcrumb separator=">" class="bread-title" >
        <el-breadcrumb-item style="font-size: xx-large" >一年级</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form :model="form" label-width="160px">
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="12" align="left">
            <span style="font-size: x-large">近视率</span>
          </el-col>
          <el-col :span="12">
            <span style="font-size: x-large">视力变化趋势</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="12" align="left">
            <span style="font-size: large">视力不良且屈光度低于-0.5</span>
          </el-col>
          <el-col :span="12" >
            <span style="font-size: large">视力不良率，近视率</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <div class="retrieval  criteria Style">
            <div id="specificgrade"></div>
          </div>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
          <div class="retrieval  criteria Style">
            <div id="trend"></div>
          </div>
        </el-row>

        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="12" align="left">
            <span style="font-size: x-large">预警分布情况</span>
          </el-col>
          <el-col :span="12" >
            <span style="font-size: x-large">各班级近视率</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="5" align="left">
            <span style="font-size: large">视力不良且屈光度低于-0.5</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <div class="retrieval  criteria Style">
            <div id="gradewarning"></div>
          </div>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
          <div class="retrieval  criteria Style">
            <div id="specificgradestatistic"></div>
          </div>
        </el-row>
      </el-form>
    </div>
  </section>
</template>

<script>
  import util from '../../common/js/util'
  import echarts from 'echarts'
  //import NProgress from 'nprogress'
  import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

  export default {
    data() {
      return {
        filters: {
          name: ''
        },
        tableData2: [{
          class: '一班',
          data:'20%'
        }, {
          class: '二班',
          data:'20%'
        }, {
          class: '三班',
          data:'20%'
        }, {
          class: '四班',
          data:'20%'
        }],
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
        drawColumnChart() {
            this.chartLine = echarts.init(document.getElementById('globalsight'));
            this.chartLine.setOption(this.chartLine.setOption({
                    tooltip : {
            trigger: 'axis',
                    axisPointer: {
              type: 'cross',
                      label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data:['视力不良率','近视率']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data:[]
            }
          ],
                  yAxis : [
            {
              type : 'value',
              axisLabel: {
                formatter: '{value}%'
              }
            }
          ],
                  series : [
            {
              name:'视力不良率',
              type:'line',
              stack: '总量',
              data:[3, 4, 3, 4, 5, 6, 7]
            },
            {
              name:'近视率',
              type:'line',
              stack: '总量',
              data:[7, 8, 9, 8, 6, 7, 7]
            }
          ]}));
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
      this.getUsers();
      this.$chart.line1('globalsight');
      this.$chart.line1('schoolsight');
      this.$chart.line1('warning');
      this.$chart.line1('gradestatistic');
      this.$chart.line1('genderstatistic');
      this.$chart.line1('specificgrade');
      this.$chart.line1('trend');
      this.$chart.line1('gradewarning');
      this.$chart.line1('specificgradestatistic');
    }
  }

</script>

<style scoped>
  .Style{
    margin-left: 0px;
    padding: 10px;
    border: 1px solid #d1dbe5;
    border-radius: 20px;
    background-color: #fff;
    overflow: hidden;

  }
  #globalsight {
    width: 400px;
    height: 400px;
  }
  #schoolsight{
    width: 400px;
    height: 400px;
  }
  #warning{
    width: 400px;
    height: 400px;
  }
  #gradestatistic{
    width: 1080px;
    height: 400px;
  }
  #genderstatistic{
    width: 400px;
    height: 400px;
  }
  #gender{
    width: 400px;
    height: 400px;
  }
  #specificgrade{
    width: 400px;
    height: 400px;
  }
  #trend{
    width: 400px;
    height: 400px;
  }
  #gradewarning{
    width: 400px;
    height: 400px;
  }
  #specificgradestatistic{
    width: 400px;
    height: 400px;
  }

</style>
