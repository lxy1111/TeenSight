<template xmlns:page-break-inside="http://www.w3.org/1999/xhtml">
  <section>
    <!--工具条-->

      <el-form :inline="true" :model="selectForm">
        <el-row type="flex" >
          <el-form-item  v-if="!isschool">
            <el-select  size="small"
                       v-model="selectForm.schoolId"
                       filterable
                        @change="handleChange"
                       placeholder="请选择学校名称"
                       :loading="loading">
              <el-option
                      v-for="item in schoolist"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
<!--          <el-form-item>-->
<!--            <img src="../../assets/img/search.png" @click="handlesearch">-->
<!--          </el-form-item>-->
            <el-form-item prop="planeOnlineDateSecond" >
              <el-select size="small" @change="handleGradeChange" v-model="finalgradeNo" filterable placeholder="请选择年级">
                <el-option

                        v-for="item in gradelist"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="planeOnlineDateSecond" >
              <el-select size="small" v-model="selectForm.classNo" @change="handleClassChange" placeholder="请选择班级">
                <el-option
                        v-for="item in classlist"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          <el-form-item prop="planeOnlineDateSecond" >
            <el-select size="small" @change="handlegetdata" v-model="selectForm.surveyName" placeholder="请选择普查">
              <el-option
                      v-for="item in surveylist"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="!ishidden"> <el-button  v-loading.fullscreen.lock="fullscreenLoading"  type="primary" round  v-on:click="downloadpdf(htmltitle)">下载PDF报告</el-button></el-form-item>
        </el-row>
        <el-row>
        <div v-if="notforschool">
          <el-form-item prop="planeOnlineDateSecond" >
            <el-select size="small" @change="handleprimaryschoolgrade" v-model="primarygrade" filterable placeholder="选择小学年级">
              <el-option

                      v-for="item in primarygradelist"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="planeOnlineDateSecond" >
            <el-select size="small" @change="handlesecondaryschoolgrade" v-model="secondarygrade" filterable placeholder="选择初中年级">
              <el-option

                      v-for="item in secondarygradelist"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="planeOnlineDateSecond" >
            <el-select size="small" @change="handlehighschoolgrade" v-model="highgrade" filterable placeholder="选择高中年级">
              <el-option

                      v-for="item in highgradelist"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            (此行功能只适用于只选择年级的普查)
          </el-form-item>
        </div>
          <el-form-item><el-button type="primary" round @click="handlesearch">查看报告</el-button></el-form-item>
          <!--          <el-form-item><el-button type="primary"  round @click="refresh">刷新</el-button></el-form-item>-->

          <el-form-item><el-button type="primary"  round @click="handlereset">重置</el-button></el-form-item>
        </el-row>
      </el-form>
    <div class="retrieval  criteria Style" id="pdfDom">
    <div :hidden="ishidden" class="retrieval  criteria Style">
      <el-form :model="form" label-width="160px">
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="12" >
            <span style="font-size: xx-large" >{{nowschool}}</span>
            <span v-if="showgradename" style="font-size: xx-large" >{{nowgrade}}</span>
            <span v-if="showclassname" style="font-size: xx-large" >{{nowclass}}班</span>
            <span  style="font-size: xx-large" >视力报告</span>
          </el-col>
<!--          <el-col :span="4">-->
<!--            <span v-if="showgradename" style="font-size: xx-large" >{{nowgrade}}</span>-->
<!--          </el-col>-->
<!--          <el-col :span="4">-->
<!--            <span v-if="showclassname" style="font-size: xx-large" >{{nowclass}}班</span>-->
<!--          </el-col>-->

<!--            <span  style="font-size: xx-large" >视力报告</span>-->

        </el-row>
        <br>
<!--        <el-row type="flex" class="row-bg" justify="right">-->
<!--          <el-col :span="2" >-->
<!--            <span  >时间</span>-->
<!--          </el-col>-->
<!--          <el-col :span="6" >-->
<!--            <span  >{{this.selectForm.surveyName}}</span>-->
<!--          </el-col>-->
<!--        </el-row>-->
      <div :hidden="isIns">
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="4" >
            <span  >学校所在地</span>
          </el-col>
          <el-col :span="4" >
            <span  >学校类型</span>
          </el-col>
          <el-col :span="4" >
            <span  >人数</span>
          </el-col>
          <el-col :span="4" >
            <span  >时间</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="4" >
            <span  >{{schoolplace}}</span>
          </el-col>
          <el-col :span="4" >
            <span  >{{schooltype}}</span>
          </el-col>
          <el-col :span="4" >
            <span  >{{studentno}}人</span>
          </el-col>
          <el-col :span="8" >
            <span  >{{this.selectForm.surveyName}}</span>
          </el-col>
        </el-row>
      </div>
      </el-form>

      <el-table
              ref="multipleTable"
              :data="smalltable"
              border
              tooltip-effect="dark"
              style="width: 100%">
        <el-table-column
                prop="type"
                show-overflow-tooltip
                align="center">
        </el-table-column>
        <el-table-column
                prop="coveragerate"
                label="筛查覆盖率(筛查参与情况)%"
                show-overflow-tooltip
                align="center">
        </el-table-column>
        <el-table-column
                prop="normalDegree"
                label="视力正常(5.0(1.0)及以上)"
                show-overflow-tooltip align="center">
        </el-table-column>

        <el-table-column
                prop="firstDegree"
                label="轻度不良(4.8(0.6)-4.9(0.8))"
                show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column
                prop="secondDegree"
                label="中度不良(4.5(0.3)-4.7(0.5))"
                show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column
                prop="thirdDegree"
                label="重度不良(4.5(0.3)以下"
                show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column
                prop="poorSightRate"
                label="近视"
                show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column
                prop="normalSightRate"
                label="非近视"
                show-overflow-tooltip align="center">
        </el-table-column>
      </el-table>
    </div>
      <br><br>
    <div :hidden="showschooloverall" class="retrieval  criteria Style">
      <el-breadcrumb separator=">" class="bread-title" >
        <el-breadcrumb-item style="font-size: xx-large" >学校统计总览</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form :model="form" label-width="160px">
<!--        <el-row type="flex" class="row-bg" justify="right">-->
<!--          <el-col :span="12" align="left">-->
<!--            <span style="font-size: x-large">全球视力变化趋势</span>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <span style="font-size: x-large">最后一次普查</span>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row type="flex" class="row-bg" justify="right">-->
<!--          <el-col :span="5" align="left">-->
<!--            <span style="font-size: large">视力不良率，近视率</span>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row type="flex" class="row-bg" justify="right">-->
<!--          <div class="retrieval  criteria Style">-->
<!--            <div id="globalsight"></div>-->
<!--          </div>-->
<!--        </el-row>-->

        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="12" align="left">
            <span style="font-size: x-large">近视率</span>
          </el-col>
          <el-col :span="12" >
            <span style="font-size: x-large">视力分布情况</span>
          </el-col>

        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="12" align="left">
            <span style="font-size: large">视力不良且屈光度低于-0.5</span>
          </el-col>
          <el-col :span="12">
            <span style="font-size: large">视力不良等级人数占比</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="12" align="left">
          <div class="retrieval  criteria Style">
            <div style="page-break-inside: avoid" id="schoolsight" ref="schoolsight"></div>
          </div>
          </el-col>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <el-col :span="12" align="left">
          <div  class="retrieval  criteria Style">
            <div style="page-break-inside: avoid" id="warning" ref="warning"></div>
          </div>
        </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="12">
            <span style="font-size: x-large">视力变化趋势</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          &nbsp; &nbsp; &nbsp; <div class="retrieval  criteria Style">
            <div style="page-break-inside: avoid" id="trend3" ref="trend3"></div>
          </div>
        </el-row>
<!--        <el-row type="flex" class="row-bg" justify="right">-->
<!--          <el-col :span="24" align="left">-->
<!--            <span style="font-size: large">关于预警分级</span>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row type="flex" class="row-bg" justify="right">-->
<!--          <el-col :span="24" align="left">-->
<!--            <span style="font-size: large">一级预警（视力正常且屈光正常）</span>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row type="flex" class="row-bg" justify="right">-->
<!--          <el-col :span="24" align="left">-->
<!--            <span style="font-size: large">非近视学生，这部分学生应该做好预防近视工作</span>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row type="flex" class="row-bg" justify="right">-->
<!--          <el-col :span="24" align="left">-->
<!--            <span style="font-size: large">二级预警（视力<5.0并且-6.00<=屈光度<-0.5）</span>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row type="flex" class="row-bg" justify="right">-->
<!--          <el-col :span="24" align="left">-->
<!--            <span style="font-size: large">轻度或中度近视学生，这部分学生应该做好控制近视度数增长</span>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row type="flex" class="row-bg" justify="right">-->
<!--          <el-col :span="24" align="left">-->
<!--            <span style="font-size: large">三级预警（视力<5.0并且屈光度<-6.00）</span>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row type="flex" class="row-bg" justify="right">-->
<!--          <el-col :span="24" align="left">-->
<!--            <span style="font-size: large">高度近视学生，这部分学生应时刻关注眼健康情况，防止眼底病变发生</span>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row type="flex" class="row-bg" justify="right">-->
<!--          <el-col :span="24" align="left">-->
<!--            <span style="font-size: large">预警分布情况</span>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row type="flex" class="row-bg" justify="right">-->
<!--          <el-col :span="24" align="left">-->
<!--            <span style="font-size: large">各预警等级人数占比</span>-->
<!--          </el-col>-->
<!--        </el-row>-->
      </el-form>
    </div>
      <div :hidden="showIns||onlygrade" class="retrieval  criteria Style">
        <el-form :model="form" label-width="160px">
<!--          <el-row type="flex" class="row-bg" justify="right">-->
<!--              <span style="font-size: large">视力不良变化趋势</span>-->
<!--          </el-row>-->
<!--          <el-row type="flex" class="row-bg" justify="right">-->
<!--            &nbsp; &nbsp; <div class="retrieval  criteria Style">-->
<!--              <div id="trend2" ref="trend2"></div>-->
<!--            </div>-->
<!--          </el-row>-->
          <el-breadcrumb separator=">" class="bread-title" >
            <el-breadcrumb-item style="font-size: xx-large" >学校类型统计</el-breadcrumb-item>
          </el-breadcrumb>
          <el-row type="flex" class="row-bg" justify="right">
            &nbsp; &nbsp; <div class="retrieval  criteria Style">
            <div style="page-break-inside: avoid" id="schoolStatistic" ref="schoolStatistic"></div>
          </div>
          </el-row>
          <el-breadcrumb separator=">" class="bread-title" >
            <el-breadcrumb-item style="font-size: xx-large" >学校统计</el-breadcrumb-item>
          </el-breadcrumb>
          <el-row type="flex" class="row-bg" justify="right">
            &nbsp; &nbsp; <div class="retrieval  criteria Style">
            <div style="page-break-inside: avoid" id="schoolListStatistic" ref="schoolListStatistic"></div>
          </div>
          </el-row>
        </el-form>
      </div>

    <div :hidden="showschooloverall||onlygrade" class="retrieval  criteria Style">

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
            <div style="page-break-inside: avoid" id="gradestatistic" ref="gradestatistic"></div>
          </div>
        </el-row>
      </el-form>
    </div>

      <div   :hidden="showschooloverall"  class="retrieval  criteria Style">
        <el-row v-for="item in gradesDetailList">
        <el-breadcrumb separator="" class="bread-title" >
          <el-breadcrumb-item  style="font-size: xx-large" >{{item.gradeNo}}年级</el-breadcrumb-item>
        </el-breadcrumb>
          <el-table
                  ref="multipleTable"
                  :data="item.smallTable"
                  border
                  tooltip-effect="dark"
                  style="width: 100%">
            <el-table-column
                    prop="type"
                    show-overflow-tooltip
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="coverageRate"
                    label="筛查覆盖率(筛查参与情况)%"
                    show-overflow-tooltip
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="normalDegree"
                    label="视力正常(5.0(1.0)及以上)"
                    show-overflow-tooltip align="center">
            </el-table-column>

            <el-table-column
                    prop="firstDegree"
                    label="轻度不良(4.8(0.6)-4.9(0.8))"
                    show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column
                    prop="secondDegree"
                    label="中度不良(4.5(0.3)-4.7(0.5))"
                    show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column
                    prop="thirdDegree"
                    label="重度不良(4.5(0.3)以下"
                    show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column
                    prop="shortSightRate"
                    label="近视"
                    show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column
                    prop="normalSightRate"
                    label="非近视"
                    show-overflow-tooltip align="center">
            </el-table-column>
          </el-table>
<!--            <el-form :model="form" label-width="160px">-->
<!--          <el-row type="flex" class="row-bg" justify="right">-->
<!--            <el-col :span="4" >-->
<!--              <span  ></span>-->
<!--            </el-col>-->
<!--            <el-col :span="4" >-->
<!--              <span  >筛查覆盖率(筛查参与情况)%</span>-->
<!--            </el-col>-->
<!--            <el-col :span="4" >-->
<!--              <span  >视力正常(5.0(1.0)及以上)</span>-->
<!--            </el-col>-->
<!--            <el-col :span="4" >-->
<!--              <span  >轻度不良(4.8(0.6)-4.9(0.8))</span>-->
<!--            </el-col>-->
<!--            <el-col :span="4" >-->
<!--              <span  >中度不良(4.5(0.3)-4.7(0.5))</span>-->
<!--            </el-col>-->
<!--            <el-col :span="4" >-->
<!--              <span  >重度不良(4.5(0.3)以下</span>-->
<!--            </el-col>-->
<!--            <el-col :span="4" >-->
<!--              <span  >近视</span>-->
<!--            </el-col>-->
<!--            <el-col :span="4" >-->
<!--              <span  >非近视</span>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--          <el-row type="flex" class="row-bg" justify="right">-->
<!--            <el-col :span="3" >-->
<!--              <span style="text-align: center" >比率</span>-->
<!--            </el-col>-->
<!--            <el-col :span="3" >-->
<!--              <span  >{{item.coverageRate*100}}</span>-->
<!--            </el-col>-->
<!--            <el-col :span="3" >-->
<!--              <span  >{{item.warningRes.normalDegree*100}}</span>-->
<!--            </el-col>-->
<!--            <el-col :span="3" >-->
<!--            <span  >{{item.warningRes.firstDegree*100}}</span>-->
<!--          </el-col>-->
<!--            <el-col :span="3" >-->
<!--              <span  >{{item.warningRes.secondDegree*100}}</span>-->
<!--            </el-col>-->
<!--            <el-col :span="3" >-->
<!--              <span  >{{item.warningRes.thirdDegree*100}}</span>-->
<!--            </el-col>-->
<!--            <el-col :span="3" >-->
<!--              <span  >{{item.shortSightRate*100}}</span>-->
<!--            </el-col>-->
<!--            <el-col :span="3" >-->
<!--              <span  >{{100-item.shortSightRate*100}}</span>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--          <el-row type="flex" class="row-bg" justify="right">-->
<!--            <el-col :span="3" >-->
<!--              <span style="text-align: center">人数</span>-->
<!--            </el-col>-->
<!--            <el-col :span="3" >-->
<!--              <span  >{{item.coverageCount}}</span>-->
<!--            </el-col>-->
<!--            <el-col :span="3" >-->
<!--              <span  >{{item.warningRes.normalDegreeCount}}</span>-->
<!--            </el-col>-->
<!--            <el-col :span="3" >-->
<!--              <span  >{{item.warningRes.firstDegreeCount}}</span>-->
<!--            </el-col>-->
<!--            <el-col :span="3" >-->
<!--              <span  >{{item.warningRes.secondDegreeCount}}</span>-->
<!--            </el-col>-->
<!--            <el-col :span="3" >-->
<!--              <span  >{{item.warningRes.thirdDegreeCount}}</span>-->
<!--            </el-col>-->
<!--            <el-col :span="3" >-->
<!--              <span  >{{item.shortSightCount}}</span>-->
<!--            </el-col>-->
<!--            <el-col :span="3" >-->
<!--              <span  >{{item.coverageCount-item.shortSightCount}}</span>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--            </el-form>-->
        <el-form :model="form" label-width="160px">
          <el-row type="flex" class="row-bg" justify="right">
            <el-col :span="12" align="left">
              <span style="font-size: x-large">近视率</span>
            </el-col>
            <el-col :span="12" align="left">
              <span style="font-size: x-large">视力分布情况</span>
            </el-col>

          </el-row>
          <el-row type="flex" class="row-bg" justify="right">
            <el-col :span="12" align="left">
              <span style="font-size: large">视力不良且屈光度低于-0.5</span>
            </el-col>

          </el-row>

          <el-row type="flex" class="row-bg" justify="right">
            <el-col :span="12" align="left">
              <div class="retrieval  criteria Style">
                <div  style="width: 400px;height: 400px;page-break-inside: avoid" :id="'poor'+item.gradeNo"  :ref="'poor'+item.gradeNo"></div>
              </div>
            </el-col>
            <el-col :span="12" align="left">
              <div class="retrieval  criteria Style">
                <div  style="width: 400px;height: 400px;page-break-inside: avoid" :id="'proportion'+item.gradeNo" :ref="'proportion'+item.gradeNo"></div>
              </div>
            </el-col>
            &nbsp; &nbsp; &nbsp; &nbsp;
          </el-row>

          <!--        <el-row type="flex" class="row-bg" justify="right">-->
          <!--          <el-col :span="5" align="left">-->
          <!--            <span style="font-size: large">视力不良且屈光度低于-0.5</span>-->
          <!--          </el-col>-->
          <!--        </el-row>-->

          <el-row type="flex" class="row-bg" justify="right">
            <el-col :span="12">
              <span style="font-size: x-large">视力变化趋势</span>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="right">
            <el-col :span="12" >
              <span style="font-size: large">视力不良变化趋势</span>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="right">

            <div class="retrieval  criteria Style">
              <div  style="width: 1000px;height: 400px;page-break-inside: avoid" :id="'changetrend'+item.gradeNo" :ref="'changetrend'+item.gradeNo"></div>
            </div>
          </el-row>


        </el-form>
        </el-row>
      </div>

<!--    <div :hidden="showschooloverall"class="retrieval  criteria Style">-->

<!--      <el-breadcrumb separator=">" class="bread-title" >-->
<!--        <el-breadcrumb-item style="font-size: xx-large" >班级统计</el-breadcrumb-item>-->
<!--      </el-breadcrumb>-->
<!--      <el-form :model="form" label-width="160px">-->
<!--        <el-row type="flex" class="row-bg" justify="right">-->
<!--          <el-col :span="5" align="left">-->
<!--            <span style="font-size: x-large">班级近视率</span>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row type="flex" class="row-bg" justify="right">-->
<!--          <div class="retrieval  criteria Style">-->
<!--            <el-table-->
<!--                    ref="multipleTable"-->
<!--                    :data="tableData2"-->
<!--                    border-->
<!--                    tooltip-effect="dark"-->
<!--                    style="width: 100%"-->
<!--                    @selection-change="handleSelectionChange">-->
<!--              <el-table-column-->
<!--                      prop="class"-->
<!--                      show-overflow-tooltip-->
<!--                      align="center">-->
<!--              </el-table-column>-->
<!--              <el-table-column-->
<!--                      prop="data"-->
<!--                      label="一年级"-->
<!--                      show-overflow-tooltip align="center">-->
<!--              </el-table-column>-->
<!--              <el-table-column-->
<!--                      prop="data"-->
<!--                      label="二年级"-->
<!--                      show-overflow-tooltip align="center">-->
<!--              </el-table-column>-->
<!--              <el-table-column-->
<!--                      prop="data"-->
<!--                      label="三年级"-->

<!--                      show-overflow-tooltip align="center">-->
<!--              </el-table-column>-->
<!--              <el-table-column-->
<!--                      prop="data"-->
<!--                      label="四年级"-->

<!--                      show-overflow-tooltip align="center">-->
<!--              </el-table-column>-->
<!--              <el-table-column-->
<!--                      prop="data"-->
<!--                      label="五年级"-->
<!--                      show-overflow-tooltip align="center">-->
<!--              </el-table-column>-->
<!--              <el-table-column-->
<!--                      prop="data"-->
<!--                      label="六年级"-->
<!--                      show-overflow-tooltip align="center">-->
<!--              </el-table-column>-->

<!--            </el-table>-->

<!--          </div>-->
<!--        </el-row>-->
<!--      </el-form>-->
<!--    </div>-->


    <div  :hidden="showgradeoverall"  class="retrieval  criteria Style">
      <el-breadcrumb separator=">" class="bread-title" >
        <el-breadcrumb-item  style="font-size: xx-large" >{{nowgrade}} <span v-if="showclassname"  style="font-size: xx-large" >{{nowclass}}班</span></el-breadcrumb-item>
      </el-breadcrumb>

      <el-form :model="form" label-width="160px">
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="12" align="left">
            <span style="font-size: x-large">近视率</span>
          </el-col>
          <el-col :span="12" align="left">
            <span style="font-size: x-large">视力分布情况</span>
          </el-col>

        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="12" align="left">
            <span style="font-size: large">视力不良且屈光度低于-0.5</span>
          </el-col>

        </el-row>

        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="12" align="left">
          <div class="retrieval  criteria Style">
            <div style="page-break-inside:avoid" id="specificgrade"  ref="specificgrade"></div>
          </div>
          </el-col>
          <el-col :span="12" align="left">
          <div class="retrieval  criteria Style">
            <div style="page-break-inside:avoid" id="gradewarning" ref="gradewarning"></div>
          </div>
          </el-col>
          &nbsp; &nbsp; &nbsp; &nbsp;
        </el-row>

        <!--        <el-row type="flex" class="row-bg" justify="right">-->
        <!--          <el-col :span="5" align="left">-->
        <!--            <span style="font-size: large">视力不良且屈光度低于-0.5</span>-->
        <!--          </el-col>-->
        <!--        </el-row>-->

        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="12">
            <span style="font-size: x-large">视力变化趋势</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">
          <el-col :span="12" >
            <span style="font-size: large">视力不良变化趋势</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="right">

        <div class="retrieval  criteria Style">
          <div style="page-break-inside:avoid" id="trend" ref="trend"></div>
        </div>
        </el-row>
      </el-form>
    </div>
      <div :hidden="showschooloverall&&showgradeoverall" class="retrieval  criteria Style">

        <el-breadcrumb separator=">" class="bread-title" >
          <el-breadcrumb-item style="font-size: xx-large" >性别统计</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="form" label-width="160px">

          <el-row type="flex" class="row-bg" justify="right">
            <span style="font-size: x-large">男女生视力情况</span>
          </el-row>
          <el-row type="flex" class="row-bg" justify="right">
            <!--          <div class="retrieval  criteria Style">-->
            <!--            <div id="gender">-->
            <!--              <el-row type="flex" class="row-bg" justify="right">-->
            <!--                <span  style="font-size: x-large">男生近视率       {{this.maleshortrate*100}}%</span>-->
            <!--              </el-row>-->
            <!--              <el-row type="flex" class="row-bg" justify="right">-->
            <!--                <span  style="font-size: x-large">女生近视率        {{this.femaleshortrate*100}}%</span>-->
            <!--              </el-row>-->
            <!--            </div>-->
            <!--          </div>-->
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
            <div class="retrieval  criteria Style">
              <div style="page-break-inside: avoid" id="genderstatistic" ref="genderstatistic"></div>
            </div>
          </el-row>
        </el-form>
      </div>

    </div>
  </section>
</template>

<script>
  import util from '../../common/js/util'
  import html2Canvas from 'html2canvas'
  import echarts from 'echarts'
  //import NProgress from 'nprogress'
  import {
    getUserListPage,
    removeUser,
    batchRemoveUser,
    editUser,
    addUser,
    getSchoolListPage,
    getSchoolDetail,
    getTeachersList,
    getClassByschool,
    getStatisticsBySchool,
    getSurveyList,
    getStatisticsDetail,
    getSchoolInfo, getSurveyName, getGrades
  } from '../../api/api';
  import htmlToPdf from "../../common/js/htmlToPdf";
  import JsPDF from 'jspdf'
  export default {
    data() {
      return {
        primarygradelist:[],
        secondarygradelist:[],
        highgradelist:[],
        isGovern:false,
        grades:[],
        normalDegree:null,
        firstDegree:null,
        secondDegree:null,
        thirdDegree:null,
        surveyNameList:[],
        firstDegreeList:null,
        secondDegreeList:null,
        thirdDegreeList:null,
        normalDegreeList:null,
        firstDegreeListBySchoolType:null,
        secondDegreeListBySchoolType:null,
        thirdDegreeListBySchoolType:null,
        firstDegreeListBySchool:null,
        secondDegreeListBySchool:null,
        thirdDegreeListBySchool:null,
        shortList:null,
        firstSexDegreeList:null,
        secondSexDegreeList:null,
        thirdSexDegreeList:null,
        normalSexDegreeList:null,
        gradeslist:[],
        classeslist:[],
        shortratelist2:[],
        shortratelist:[],
        chart:'',
        chart2:'',
        chart3:'',
        chart4:'',
        chart5:'',
        chart6:'',
        chart7:'',
        chart8:'',
        chart9:'',
        chart10:'',
        chart11:'',
        schoolsNameList:[],
        showclassname:false,

        ishidden:true,
        filters: {
          name: ''
        },
        showgradeoverall:true,
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
        fullscreenLoading:false,
        gradesDetailList:null,
        maleshortrate:0,
        onlygrade:false,
        femaleshortrate:0,
        schoolplace:'',
        smalltable:[{
          type:"比率",
          coveragerate:null,
          firstDegree:null,
          secondDegree:null,
          thirdDegree:null,
          normalDegree:null,
          poorSightRate:null,
          normalSightRate:null,
        },
          {
            type:"人数",
            coveragerate:null,
            firstDegree:null,
            secondDegree:null,
            thirdDegree:null,
            normalDegree:null,
            poorSightRate:null,
            normalSightRate:null,

          }],
        maleshortcnt:0,
        schooltype:'',
        studentno:'',
        gendervalue: '性别-全部',
        users: [],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],//列表选中列
        showIns:true,

        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        primarygrade:null,
        secondarygrade:null,
        highgrade:null,
        isIns:true,
        htmltitle:'',
        //编辑界面数据
        editForm: {
          id: 0,
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        },
        isschool:false,
        schoolListByIns:null,
       coveragecount:'',
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
        poorsightcount:0,
        schooltype:'',
        shortsightcount:0,
        showschool:false,
        showschooloverall:true,
        showgrade:false,
        gradelist:[],
        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        allsurveys:[],
        surveylist:[],
        gradeslist:[],
        selectForm:{
          page:1,
          pageSize:1000000,
          schoolId:null,
          institutionId:null,
          gradeNo:null,
          classNo:null,
          surveyName:null
        },
        nowgrade:'',
        showgradename:false,
        firstwarning:0,
        secondwarning:0,
        thirdwarning:0,
        coveragerate:'',
        poorsightrate:'',
        shortsightrate:'',
        //新增界面数据
        addForm: {
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        },
        schools:[],
        schoolist:[],
        allschool:[],
        allTeachers:[],
        classlist:[],
        allclass:[],
        nowschool:'',
        nowgrade:'',
        nowclass:'',
        shortsightlist:[],
        poorsightlist:[],
        inspectiondate:'',
        finalgradeNo:null,
        notforschool:true
      }
    },
    methods: {
      handleClassChange(val){
        this.showclassname=true;
        this.nowclass=val;
        this.selectForm.surveyName=null;

      //  this.showgradeoverall=true;
      },
      handleGradeChange(val){
        this.selectForm.gradeNo=this.finalgradeNo;
        this.classlist=[];
        if(!this.ishidden) {
          this.showgradename = true;
          this.showclassname=false;
          this.showgradeoverall=false;
        }
        this.selectForm.surveyName=null;

        if(val==1){
          this.nowgrade='一年级'
        }
        if(val==2){
          this.nowgrade='二年级'
        }
        if(val==3){
          this.nowgrade='三年级'
        }
        if(val==4){
          this.nowgrade='四年级'
        }
        if(val==5){
          this.nowgrade='五年级'
        }
        if(val==6){
          this.nowgrade='六年级'
        }
        if(val==7){
          this.nowgrade='七年级'
        }
        if(val==8){
          this.nowgrade='八年级'
        }
        if(val==9){
          this.nowgrade='九年级'
        }
        let para={
          schoolId:this.selectForm.schoolId,
          gradeNo:val
        }
        this.classlist=[];
        this.selectForm.classNo=null;
        getClassByschool(para).then(res=>{
          this.allclass=res.data.result.classList;
          this.classlist=[];
          for(let i=0;i<this.allclass.length;i++){
            let classes={
              value:this.allclass[i],
              label:this.allclass[i]
            }
            this.classlist.push(classes);
          }
        })
      },
      handleprimaryschoolgrade(){
        this.selectForm.type=3;
        this.selectForm.gradeNo=this.primarygrade;
        this.secondarygradelist=null;
        this.highgradelist=null;
        console.log("!!!!!");

      },
      handlesecondaryschoolgrade(){
        this.selectForm.type=4;
        this.selectForm.gradeNo=this.secondarygrade;
        this.primarygradelist=null;
        this.highgradelist=null;

      },
      handlehighschoolgrade(){
        this.selectForm.type=5;
        this.selectForm.gradeNo=this.highgrade;
        this.primarygradelist=null;
        this.secondarygradelist=null;

      },

      handleChange(val){

        this.gradelist=[];
        this.classlist=[];
        this.selectForm.surveyName=null;
        if(!this.ishidden) {
          this.showschooloverall = false;
          this.showgradeoverall=true;
          this.showgradename=false;
          this.showclassname=false;
        }
        console.log(val);
        let para={
           schoolId:val,
        }
        let para1={
          id:val
        }

        getSchoolDetail(para1).then(res=>{
          this.nowschool=res.data.result.schoolName;
          this.schooltype=res.data.result.schoolType;

        this.gradelist=[];
        this.selectForm.gradeNo=null;
        this.selectForm.classNo=null;
        this.selectForm.surveyName=null;
        getClassByschool(para).then(res=>{
          this.allTeachers=res.data.result.gradeList;
          this.gradelist=[];
          let gradeName='';
          for(let i=0;i<this.allTeachers.length;i++){
            if(this.schooltype==3){
              if(this.allTeachers[i]==1){
                gradeName="小学一年级";
              }else if(this.allTeachers[i]==2){
                gradeName="小学二年级"
              }else if(this.allTeachers[i]==3){
                gradeName="小学三年级"
              }else if(this.allTeachers[i]==4){
                gradeName="小学四年级"
              }else if(this.allTeachers[i]==5){
                gradeName="小学五年级"
              }else if(this.allTeachers[i]==6){
                gradeName="小学六年级"
              }
            }else if(this.schooltype==4){
              if(this.allTeachers[i]==0){
                gradeName="初中预备班";
              }else if(this.allTeachers[i]==1){
                gradeName="初中一年级"
              }else if(this.allTeachers[i]==2){
                gradeName="初中二年级"
              }
              else if(this.allTeachers[i]==3){
                gradeName="初中三年级"
              }
            }
            else if(this.schooltype==5){
              if(this.allTeachers[i]==1){
                gradeName="高中一年级"
              }else if(this.allTeachers[i]==2){
                gradeName="高中二年级"
              }
              else if(this.allTeachers[i]==3){
                gradeName="高中三年级"
              }
            }


            let teacher ={
              value:this.allTeachers[i],
              label:gradeName
            }
            this.gradelist.push(teacher);
          }
        })

        getSurveyName(this.selectForm).then(res=>{
          this.allsurveys=res.data.result;
          this.surveylist=[];
          for(let i=0;i<this.allsurveys.length;i++){
            let survey ={
              value:this.allsurveys[i],
              label:this.allsurveys[i]
            }
            this.surveylist.push(survey);
          }

        })
        })

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
      handlereset(){
        this.finalgradeNo=null;
        this.primarygrade=null;
        this.secondarygrade=null;
        this.highgrade=null;
        this.showIns=true;
      this.selectForm.surveyName=null;
        this.selectForm.classNo=null;
        this.selectForm.gradeNo=null;
        if(!this.isschool) {
          this.selectForm.schoolId = null;
        }else{
          this.handleChange(this.selectForm.schoolId);
        }
        this.showschooloverall = true;
        this.showgradeoverall=true;
        this.ishidden=true;
    this.showgradename=false;
    this.showclassname=false;
        this.gradelist=[];
        this.classlist=[];
        if(this.selectForm.institutionId!=null) {
          this.getSurveyWithoutCondition();
          this.getGradesWithoutCondition();
        }
        this.onlygrade=false;
        // this.schoolist=[];
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

      getSurveyWithoutCondition(){


        getSurveyName(this.selectForm).then(res=>{
          this.allsurveys=res.data.result;
          this.surveylist=[];
          for(let i=0;i<this.allsurveys.length;i++){
            let survey ={
              value:this.allsurveys[i],
              label:this.allsurveys[i]
            }
            this.surveylist.push(survey);
          }
        })

      },
      getGradesWithoutCondition(){


        getGrades(this.selectForm).then(res=> {
          let ans = res.data.result;
          this.gradelist = [];
          this.highgradelist=[];
          this.secondarygradelist=[];
          this.primarygradelist=[];
          if(ans[5]!=null) {
            for (let i = 0; i < ans[5].length; i++) {
              let gradeName = '';
              if (ans[5][i] == 1) {
                gradeName = "高中一年级"
              } else if (ans[5][i] == 2) {
                gradeName = "高中二年级"
              } else if (ans[5][i] == 3) {
                gradeName = "高中三年级"
              }

              let grade = {
                value: ans[5][i],
                label: gradeName
              }
             // this.gradelist.push(grade)
              this.highgradelist.push(grade)
            }
          }
            if(ans[4]!=null){
              for (let i = 0; i < ans[4].length; i++) {
                let gradeName = '';
                if (ans[4][i] == 0) {
                  gradeName = "初中预备班";
                } else if (ans[4][i] == 1) {
                  gradeName = "初中一年级"
                } else if (ans[4][i] == 2) {
                  gradeName = "初中二年级"
                } else if (ans[4][i] == 3) {
                  gradeName = "初中三年级"
                }
                let grade ={
                  value:ans[4][i],
                  label:gradeName
                }
             //   this.gradelist.push(grade)
                this.secondarygradelist.push(grade);
              }

            }


            if (ans[3] != null) {
            for (let i = 0; i < ans[3].length; i++) {
              let gradeName = '';
              if (ans[3][i] == 1) {
                gradeName = "小学一年级";
              } else if (ans[3][i] == 2) {
                gradeName = "小学二年级"
              } else if (ans[3][i] == 3) {
                gradeName = "小学三年级"
              } else if (ans[3][i] == 4) {
                gradeName = "小学四年级"
              } else if (ans[3][i] == 5) {
                gradeName = "小学五年级"
              } else if (ans[3][i] == 6) {
                gradeName = "小学六年级"
              }
              let grade = {
                value: ans[3][i],
                label: gradeName
              }
             // this.gradelist.push(grade);
              this.primarygradelist.push(grade);
            }

          }




        })

      },

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

      getStatistics(){




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
      refresh(){
       this.initChart()
    },
      handlegetdata(){
        getStatisticsDetail(this.selectForm).then(res=>{
          if(!res.data.succeed){
            this.$message({
              type:'error',
              message:'暂无数据'
            })
            this.handlereset();
            return;
          }
          this.studentno=res.data.result.totalCount;
          let coverage=res.data.result.coverageRate;
          let firstDegree=res.data.result.warningRes.firstDegree;
          let secondDegree=res.data.result.warningRes.secondDegree;
          let thirdDegree=res.data.result.warningRes.thirdDegree;
          let normalDegree=res.data.result.warningRes.normalDegree;

          this.firstDegree=firstDegree;
          this.secondDegree=secondDegree;
          this.thirdDegree=thirdDegree;
          this.normalDegree=normalDegree;

          let coveragecnt=res.data.result.coverageCount;
          let firstDegreecnt=res.data.result.warningRes.firstDegreeCount;
          let secondDegreecnt=res.data.result.warningRes.secondDegreeCount;
          let thirdDegreecnt=res.data.result.warningRes.thirdDegreeCount;
          let normalDegreecnt=res.data.result.warningRes.normalDegreeCount;
          this.smalltable[0].coveragerate=coverage*100;
          this.smalltable[0].firstDegree=firstDegree*100;
          this.smalltable[0].secondDegree=secondDegree*100;
          this.smalltable[0].thirdDegree=thirdDegree*100;
          this.smalltable[0].normalDegree=normalDegree*100;


          this.smalltable[1].coveragerate=coveragecnt;
          this.smalltable[1].firstDegree=firstDegreecnt;
          this.smalltable[1].secondDegree=secondDegreecnt;
          this.smalltable[1].thirdDegree=thirdDegreecnt;
          this.smalltable[1].normalDegree=normalDegreecnt;
          let poorsightrate=res.data.result.shortSightRate*100;
          let normalsightrate=100-poorsightrate;
          this.poorsightcount=res.data.result.poorSightCount;
          this.shortsightcount=res.data.result.shortSightCount;
          this.coveragecount=res.data.result.coverageCount;
          this.shortsightrate=poorsightrate;

          this.smalltable[0].poorSightRate=poorsightrate;
          this.smalltable[0].normalSightRate=normalsightrate;
          this.smalltable[1].poorSightRate=this.shortsightcount;
          this.smalltable[1].normalSightRate=this.coveragecount-this.shortsightcount;
          this.firstwarning=res.data.result.warningRes.firstDegreeCount;
          this.secondwarning=res.data.result.warningRes.secondDegreeCount;
          this.thirdwarning=res.data.result.warningRes.thirdDegreeCount;
          this.normalwarning=res.data.result.warningRes.normalDegreeCount;
          this.firstSexDegreeList=[];
          this.secondSexDegreeList=[];
          this.thirdSexDegreeList=[];
          this.normalSexDegreeList=[];
          this.firstDegreeListBySchoolType=[];
          this.secondDegreeListBySchoolType=[];
          this.thirdDegreeListBySchoolType=[];
          this.normalDegreeListBySchoolType=[];
          this.firstDegreeListBySchool=[];
          this.secondDegreeListBySchool=[];
          this.thirdDegreeListBySchool=[];
          this.normalDegreeListBySchool=[];
          this.schoolListByIns=[];
          if(res.data.result.warningResByMale!=null&&res.data.result.warningResByFemale!=null) {
            this.firstSexDegreeList.push(res.data.result.warningResByMale.firstDegreeCount);
            this.secondSexDegreeList.push(res.data.result.warningResByMale.secondDegreeCount);
            this.thirdSexDegreeList.push(res.data.result.warningResByMale.thirdDegreeCount);
            this.normalSexDegreeList.push(res.data.result.warningResByMale.normalDegreeCount)
            this.firstSexDegreeList.push(res.data.result.warningResByFemale.firstDegreeCount);
            this.secondSexDegreeList.push(res.data.result.warningResByFemale.secondDegreeCount);
            this.thirdSexDegreeList.push(res.data.result.warningResByFemale.thirdDegreeCount);
            this.normalSexDegreeList.push(res.data.result.warningResByFemale.normalDegreeCount)
          }
          if(res.data.result.typeList!=null&&res.data.result.typeList.length==3) {
            this.firstDegreeListBySchoolType.push(res.data.result.typeList[0].warningRes.firstDegreeCount);
            this.firstDegreeListBySchoolType.push(res.data.result.typeList[1].warningRes.firstDegreeCount);
            this.firstDegreeListBySchoolType.push(res.data.result.typeList[2].warningRes.firstDegreeCount);
            this.secondDegreeListBySchoolType.push(res.data.result.typeList[0].warningRes.secondDegreeCount);
            this.secondDegreeListBySchoolType.push(res.data.result.typeList[1].warningRes.secondDegreeCount);
            this.secondDegreeListBySchoolType.push(res.data.result.typeList[2].warningRes.secondDegreeCount);
            this.thirdDegreeListBySchoolType.push(res.data.result.typeList[0].warningRes.thirdDegreeCount);
            this.thirdDegreeListBySchoolType.push(res.data.result.typeList[1].warningRes.thirdDegreeCount);
            this.thirdDegreeListBySchoolType.push(res.data.result.typeList[2].warningRes.thirdDegreeCount);
            this.normalDegreeListBySchoolType.push(res.data.result.typeList[0].warningRes.normalDegreeCount);
            this.normalDegreeListBySchoolType.push(res.data.result.typeList[1].warningRes.normalDegreeCount);
            this.normalDegreeListBySchoolType.push(res.data.result.typeList[2].warningRes.normalDegreeCount);

          }
          if(res.data.result.schoolList!=null&&res.data.result.schoolList.length>=0) {
                for(let i=0;i<res.data.result.schoolList.length;i++){
                    this.schoolListByIns.push(res.data.result.schoolList[i].schoolName);
                     this.firstDegreeListBySchool.push(res.data.result.schoolList[i].warningRes.firstDegree*100);
                  this.secondDegreeListBySchool.push(res.data.result.schoolList[i].warningRes.secondDegree*100);
                  this.thirdDegreeListBySchool.push(res.data.result.schoolList[i].warningRes.thirdDegree*100);
                  this.normalDegreeListBySchool.push(res.data.result.schoolList[i].warningRes.normalDegree*100);
                }
          }

          this.femaleshortrate=res.data.result.shortSightRateByFemale;
          this.poorsightcount=res.data.result.poorSightCount;
          this.inspectiondate=res.data.result.inspectionDate;
          let allgrades=[];
          let firstdegreelist=[];
          let seconddegreelist=[];
          let thirddegreelist=[];
          let normaldegreelist=[];
          this.grades=res.data.result.gradeList;
          if(this.grades!=null) {
            for (let i = 0; i < this.grades.length; i++) {
                if(this.grades[i].type==3) {
                    allgrades.push('小学'+this.grades[i].gradeNo+'年级');
                }else if(this.grades[i].type==4) {
                    if (this.grades[i].gradeNo == 0) {
                        allgrades.push('初中预备班');
                    } else {
                        allgrades.push('初中' + this.grades[i].gradeNo + '年级');
                    }
                }else if(this.grades[i].type==5){
                    allgrades.push('高中'+this.grades[i].gradeNo+'年级');

                }
              firstdegreelist.push(this.grades[i].warningRes.firstDegreeCount);
              seconddegreelist.push(this.grades[i].warningRes.secondDegreeCount);
              thirddegreelist.push(this.grades[i].warningRes.thirdDegreeCount);
              normaldegreelist.push(this.grades[i].warningRes.normalDegreeCount);

            }
          }
          this.gradeslist=allgrades;
          this.firstDegreeList=firstdegreelist;
          this.secondDegreeList=seconddegreelist;
          this.thirdDegreeList=thirddegreelist;
          this.normalDegreeList=normaldegreelist;
          // this.classes=res.data.result.classList[0];
          // this.allclasses=res.data.result.classList;

          let allclasses=[];
          let shortlist2=[];
          // for(let i=0;i<this.classes.length;i++){
          //    allclasses.push(this.classes[i].classNo);
          //    shortlist2.push(this.classes[i].shortSightRate*100);
          // }
          // this.classeslist=allclasses;
          // this.shortratelist2=shortlist2;
          let first=[];
          let second=[];
          let third=[];
          let normal=[];
          let surveys=[];
          let short=[];
          for(let i=0;i<res.data.result.resList.length;i++){
            first.push(res.data.result.resList[i].warningRes.firstDegree*100);
            second.push(res.data.result.resList[i].warningRes.secondDegree*100);
            third.push(res.data.result.resList[i].warningRes.thirdDegree*100);
            normal.push(res.data.result.resList[i].warningRes.normalDegree*100);
            short.push(res.data.result.resList[i].shortSightRate*100);
            surveys.push(res.data.result.resList[i].surveyName);
          }
          this.firstDegreeList2=first;
          this.secondDegreeList2=second;
          this.thirdDegreeList2=third;
          this.normalDegreeList2=normal;
          this.shortList=short;
          this.surveyNameList=surveys;
          if(res.data.result.gradeDetail!=null){
            this.gradesDetailList=res.data.result.gradeDetail;
          }
          console.log(this.poorsightlist);
          console.log(this.shortsightlist)
        })
      },
      handlesearch(){
        this.htmltitle=this.nowschool;
        if(this.selectForm.surveyName==null){
          this.$message({
            type:'error',
            message:'请选择普查'
          })
          return;
        }
        if(this.selectForm.schoolId==null&&this.selectForm.surveyName!=null){
            var institute = sessionStorage.getItem('institute');
            institute = JSON.parse(institute);
            this.nowschool = institute.insDetail.province + institute.insDetail.city + institute.insDetail.county;
            this.ishidden = false;
            this.isIns = true;
            this.showschooloverall = false;
            this.showIns = false;
            this.htmltitle=this.nowschool;
            if(this.selectForm.gradeNo!=null){
                this.onlygrade=true;
                this.showgradename=true;
                let val=this.selectForm.gradeNo;
                let type=this.selectForm.type;
                if(type==3) {
                  if (val == 1) {
                    this.nowgrade = '小学一年级';
                  }
                  if (val == 2) {
                    this.nowgrade = '小学二年级'
                  }
                  if (val == 3) {
                    this.nowgrade = '小学三年级'
                  }
                  if (val == 4) {
                    this.nowgrade = '小学四年级'
                  }
                  if (val == 5) {
                    this.nowgrade = '小学五年级'
                  }
                  if (val == 6) {
                    this.nowgrade = '小学六年级'
                  }
                  if (val == 7) {
                    this.nowgrade = '小学七年级'
                  }
                  if (val == 8) {
                    this.nowgrade = '小学八年级'
                  }
                  if (val == 9) {
                    this.nowgrade = '小学九年级'
                  }
                }
               else if(type==4) {
                 if(val==0){
                   this.nowgrade = '初中预备班';
                 }
                if (val == 1) {
                  this.nowgrade = '初中一年级';
                }
                if (val == 2) {
                  this.nowgrade = '初中二年级'
                }
                if (val == 3) {
                  this.nowgrade = '初中三年级'
                }

              }
                else if(type==5) {
                  if (val == 1) {
                    this.nowgrade = '高中一年级';
                  }
                  if (val == 2) {
                    this.nowgrade = '高中二年级'
                  }
                  if (val == 3) {
                    this.nowgrade = '高中三年级'
                  }

                }
                this.htmltitle+=this.nowgrade;
            }

            this.initChart();
        }

        if(this.selectForm.schoolId!=null&&this.selectForm.surveyName!=null){

          this.isIns=false;
          this.showIns=true;
          this.ishidden=false;
          if(this.selectForm.gradeNo!=null) {
            let val=this.selectForm.gradeNo;
             let type=this.selectForm.type;
            this.showgradename=true;
            if(type==3) {
              if (val == 1) {
                this.nowgrade = '小学一年级';
              }
              if (val == 2) {
                this.nowgrade = '小学二年级'
              }
              if (val == 3) {
                this.nowgrade = '小学三年级'
              }
              if (val == 4) {
                this.nowgrade = '小学四年级'
              }
              if (val == 5) {
                this.nowgrade = '小学五年级'
              }
              if (val == 6) {
                this.nowgrade = '小学六年级'
              }
              if (val == 7) {
                this.nowgrade = '小学七年级'
              }
              if (val == 8) {
                this.nowgrade = '小学八年级'
              }
              if (val == 9) {
                this.nowgrade = '小学九年级'
              }
            }
            else if(type==4) {
              if(val==0){
                this.nowgrade = '初中预备班';
              }
              if (val == 1) {
                this.nowgrade = '初中一年级';
              }
              if (val == 2) {
                this.nowgrade = '初中二年级'
              }
              if (val == 3) {
                this.nowgrade = '初中三年级'
              }

            }
            else if(type==5) {
              if (val == 1) {
                this.nowgrade = '高中一年级';
              }
              if (val == 2) {
                this.nowgrade = '高中二年级'
              }
              if (val == 3) {
                this.nowgrade = '高中三年级'
              }

            }
            this.showschooloverall = true;
            this.showgradeoverall=false;
            this.htmltitle+=this.nowgrade;
          }else if(this.selectForm.classNo!=null){
            this.nowclass=this.selectForm.classNo;
            this.showschooloverall=false;
            this.htmltitle+=this.nowclass+'班';
          }else{
            this.showschooloverall=false;


          }
          this.htmltitle+='视力报告';

          let para={
            schoolId:this.selectForm.schoolId
          }
          getSchoolInfo(para).then( res=>{
            this.schoolplace=res.data.result.province+res.data.result.city+res.data.result.county;
           if(res.data.result.schoolType==3){
             this.schooltype='小学'
           }
            if(res.data.result.schoolType==4){
              this.schooltype='初中'
            }
            if(res.data.result.schoolType==5){
              this.schooltype='高中'
            }
          //  this.studentno=res.data.result.studentCount;
          })
          // getStatisticsDetail(this.selectForm).then(async  res=>{
          //     this.smalltable[0].coveragerate=res.data.result.coverageRate;
          //     this.smalltable[0].shortsightrate=res.data.result.shortSightRate;
          //     this.smalltable[0].poorsightrate=res.data.result.poorSightRate;
          //     this.poorsightcount=res.data.result.poorSightCount;
          //     this.shortsightcount=res.data.result.shortSightCount;
          //     this.coveragecount=res.data.result.coverageCount;
          // })
          this.initChart();


        }

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
      },

      initChart() {
        if (this.gradesDetailList != null) {
          for (var i = 0; i < this.gradesDetailList.length; i++) {
            let first = [];
            let second = [];
            let third = [];
            let normal = [];
            let surveys = [];
            let short = [];
            for (let i = 0; i < this.gradesDetailList[i].resList.length; i++) {
              first.push(this.gradesDetailList[i].resList[i].warningRes.firstDegree * 100);
              second.push(this.gradesDetailList[i].resList[i].warningRes.secondDegree * 100);
              third.push(this.gradesDetailList[i].resList[i].warningRes.thirdDegree * 100);
              normal.push(this.gradesDetailList[i].resList[i].warningRes.normalDegree * 100);
              short.push(this.gradesDetailList[i].resList[i].shortSightRate * 100);
              surveys.push(this.gradesDetailList[i].resList[i].surveyName);
            }
            let firstDegreeList2 = first;
            let secondDegreeList2 = second;
            let thirdDegreeList2 = third;
            let normalDegreeList2 = normal;
            let shortList = short;
            let surveyNameList = surveys;
            let a = echarts.init(document.getElementById('poor' + this.gradesDetailList[i].gradeNo));
            let b = echarts.init(document.getElementById('proportion' + this.gradesDetailList[i].gradeNo));
            let c = echarts.init(document.getElementById('changetrend' + this.gradesDetailList[i].gradeNo));
            a.setOption({
              color: ['#FF9900', '#FFCC33'],
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                x: 'left',
                data: ['非近视率: ' + (100 - this.gradesDetailList[i].shortSightRate * 100 + '%'),
                  '近视率: ' + this.gradesDetailList[i].shortSightRate * 100 + '%']
              },
              series: [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    {
                      value: this.gradesDetailList[i].coverageCount - this.gradesDetailList[i].shortSightCount,
                      name: '非近视率: ' + (100 - this.gradesDetailList[i].shortSightRate * 100) + '%'
                    },
                    {
                      value: this.gradesDetailList[i].shortSightCount,
                      name: '近视率: ' + this.gradesDetailList[i].shortSightRate * 100 + '%'
                    },

                  ]
                }
              ]
            });

            b.setOption({
              color: ['#FF9900', '#FFCC33', '#66CC00', '#3399CC'],
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                x: 'left',
                data: ['视力正常: ' + this.gradesDetailList[i].warningRes.normalDegree * 100 + '%', '轻度不良: ' + this.gradesDetailList[i].warningRes.firstDegree * 100 + '%', '中度不良: ' + this.gradesDetailList[i].warningRes.secondDegree * 100 + '%', '重度不良: ' + this.gradesDetailList[i].warningRes.thirdDegree * 100 + '%']
              },
              series: [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    {
                      value: this.gradesDetailList[i].warningRes.normalDegreeCount,
                      name: '视力正常: ' + this.gradesDetailList[i].warningRes.normalDegree * 100 + '%'
                    },
                    {
                      value: this.gradesDetailList[i].warningRes.firstDegreeCount,
                      name: '轻度不良: ' + this.gradesDetailList[i].warningRes.firstDegree * 100 + '%'
                    },
                    {
                      value: this.gradesDetailList[i].warningRes.secondDegreeCount,
                      name: '中度不良: ' + this.gradesDetailList[i].warningRes.secondDegree * 100 + '%'
                    },
                    {
                      value: this.gradesDetailList[i].warningRes.thirdDegreeCount,
                      name: '重度不良: ' + this.gradesDetailList[i].warningRes.thirdDegree * 100 + '%'
                    }
                  ]
                }
              ]
            });

            var option = {
              color: ['#FF9900', '#FFCC33', '#66CC00', '#3399CC', '#e5323e'],
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross',
                  label: {
                    backgroundColor: '#6a7985'
                  }
                }
              },
              legend: {
                data: ['视力正常', '轻度不良', '中度不良', '重度不良', '近视率']
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
              xAxis: [
                {
                  type: 'category',
                  boundaryGap: false,
                  data: surveyNameList
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [

                {
                  name: '视力正常',
                  type: 'line',
                  // stack: '总量',
                  // areaStyle: {normal: {}},
                  data: normalDegreeList2
                },
                {
                  name: '轻度不良',
                  type: 'line',
                  // stack: '总量',
                  // areaStyle: {normal: {}},
                  data: firstDegreeList2
                },
                {
                  name: '中度不良',
                  type: 'line',
                  // stack: '总量',
                  // areaStyle: {normal: {}},
                  data: secondDegreeList2
                },

                {
                  name: '重度不良',
                  type: 'line',
                  // stack: '总量',
                  // label: {
                  //   normal: {
                  //     show: true,
                  //     position: 'top'
                  //   }
                  // },
                  // areaStyle: {normal: {}},
                  data: thirdDegreeList2
                },
                {
                  name: '近视率',
                  type: 'line',
                  // stack: '总量',
                  // areaStyle: {normal: {}},
                  data: shortList
                },
              ]
            };

            c.setOption(option);
          }
        }


        this.chart = echarts.init(this.$refs.schoolsight);
        this.chart.setOption({
          color: ['#FF9900', '#FFCC33',],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['非近视率: ' + (100 - this.shortsightrate) + '%', '近视率: ' + this.shortsightrate + '%']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: this.coveragecount - this.shortsightcount, name: '非近视率: ' + (100 - this.shortsightrate) + '%'},
                {value: this.shortsightcount, name: '近视率: ' + this.shortsightrate + '%'},

              ]
            }
          ]
        });



        this.chart2 = echarts.init(this.$refs.warning);
        this.chart2.setOption({
          color: ['#FF9900', '#FFCC33', '#66CC00', '#3399CC'],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['视力正常: ' + this.normalDegree * 100 + '%', '轻度不良: ' + this.firstDegree * 100 + '%', '中度不良: ' + this.secondDegree * 100 + '%', '重度不良: ' + this.thirdDegree * 100 + '%']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: this.normalwarning, name: '视力正常: ' + this.normalDegree * 100 + '%'},
                {value: this.firstwarning, name: '轻度不良: ' + this.firstDegree * 100 + '%'},
                {value: this.secondwarning, name: '中度不良: ' + this.secondDegree * 100 + '%'},
                {value: this.thirdwarning, name: '重度不良: ' + this.thirdDegree * 100 + '%'}
              ]
            }
          ]
        });
        var option = {
          color: ['#FF9900', '#FFCC33', '#66CC00', '#3399CC'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['Forest', 'Steppe', 'Desert', 'Wetland']
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              axisTick: {show: false},
              data: this.gradeslist
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '视力正常',
              type: 'bar',
              data: this.normalDegreeList
            },
            {
              name: '轻度视力不良',
              type: 'bar',
              barGap: 0,
              data: this.firstDegreeList
            },
            {
              name: '中度视力不良',
              type: 'bar',

              data: this.secondDegreeList
            },
            {
              name: '重度不力不良',
              type: 'bar',
              data: this.thirdDegreeList
            }

          ]
        };

        this.chart3 = echarts.init(this.$refs.gradestatistic);
        this.chart3.setOption(option);
        // this.chart3.setOption({
        //   color: ['#3398DB'],
        //   tooltip : {
        //     trigger: 'axis',
        //     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        //       type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        //     }
        //   },
        //   grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '3%',
        //     containLabel: true
        //   },
        //   xAxis : [
        //     {
        //       type : 'category',
        //       data : this.gradeslist,
        //       axisTick: {
        //         alignWithLabel: true
        //       }
        //     }
        //   ],
        //   yAxis : [
        //     {
        //       type : 'value',
        //       axisLabel: {
        //         formatter: '{value}%'
        //       }
        //     }
        //   ],
        //   series : [
        //     {
        //       name:'直接访问',
        //       type:'bar',
        //       barWidth: '60%',
        //       data:this.shortratelist
        //     }
        //   ]
        //
        // });


        var option2 = {
          color: ['#FF9900', '#FFCC33', '#66CC00', '#3399CC'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['Forest', 'Steppe', 'Desert', 'Wetland']
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              axisTick: {show: false},
              data: ['男', '女']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '视力正常',
              type: 'bar',
              data: this.normalSexDegreeList
            },
            {
              name: '轻度视力不良',
              type: 'bar',
              barGap: 0,
              data: this.firstSexDegreeList
            },
            {
              name: '中度视力不良',
              type: 'bar',

              data: this.secondSexDegreeList
            },
            {
              name: '重度视力不良',
              type: 'bar',
              data: this.thirdSexDegreeList
            }
            ,

          ]
        };
        this.chart4 = echarts.init(this.$refs.genderstatistic);
        this.chart4.setOption(option2);
        // this.chart4.setOption({
        //   color: ['#3398DB'],
        //   tooltip : {
        //     trigger: 'axis',
        //     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        //       type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        //     }
        //   },
        //   grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '3%',
        //     containLabel: true
        //   },
        //   xAxis : [
        //     {
        //       type : 'category',
        //       data : ['男生', '女生'],
        //       axisTick: {
        //         alignWithLabel: true
        //       }
        //     }
        //   ],
        //   yAxis : [
        //     {
        //       type : 'value',
        //       axisLabel: {
        //         formatter: '{value}%'
        //       }
        //     }
        //   ],
        //   series : [
        //     {
        //       name:'直接访问',
        //       type:'bar',
        //       barWidth: '60%',
        //       data:[this.maleshortrate*100, this.femaleshortrate*100]
        //     }
        //   ]
        // });
        this.chart5 = echarts.init(this.$refs.specificgrade);
        this.chart5.setOption({
          color: ['#FFCC33', '#FF9900'],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['近视率', '非近视率']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: this.poorsightcount, name: '近视率'},
                {value: this.coveragecount - this.poorsightcount, name: '非近视率'}
              ]
            }
          ]
        });
        this.chart6 = echarts.init(this.$refs.gradewarning);
        this.chart6.setOption({
          color: ['#FF9900', '#FFCC33', '#66CC00', '#3399CC'],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['视力正常', '轻度视力不良', '中度视力不良', '重度视力不良']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: this.normalwarning, name: '视力正常'},
                {value: this.firstwarning, name: '轻度视力不良'},
                {value: this.secondwarning, name: '中度视力不良'},
                {value: this.thirdwarning, name: '重度视力不良'},

              ]
            }
          ]

        });
        // this.chart7=echarts.init(this.$refs.specificgradestatistic);
        // this.chart7.setOption({
        //   color: ['#3398DB'],
        //   tooltip : {
        //     trigger: 'axis',
        //     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        //       type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        //     }
        //   },
        //   grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '3%',
        //     containLabel: true
        //   },
        //   xAxis : [
        //     {
        //       type : 'category',
        //       data : this.classeslist,
        //       axisTick: {
        //         alignWithLabel: true
        //       }
        //     }
        //   ],
        //   yAxis : [
        //     {
        //       type : 'value',
        //       axisLabel: {
        //         formatter: '{value}%'
        //       }
        //     }
        //   ],
        //   series : [
        //     {
        //       name:'直接访问',
        //       type:'bar',
        //       barWidth: '60%',
        //       data: this.shortratelist2
        //     }
        //   ]
        // });


        var option3 = {
          color: ['#FF9900', '#FFCC33', '#66CC00', '#3399CC', '#e5323e'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['视力正常', '轻度不良', '中度不良', '重度不良', '近视率']
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
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: this.surveyNameList
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [

            {
              name: '视力正常(%)',
              type: 'line',
              // stack: '总量',
              // areaStyle: {normal: {}},
              data: this.normalDegreeList2
            },
            {
              name: '轻度不良(%)',
              type: 'line',
              // stack: '总量',
              // areaStyle: {normal: {}},
              data: this.firstDegreeList2
            },
            {
              name: '中度不良(%)',
              type: 'line',
              // stack: '总量',
              // areaStyle: {normal: {}},
              data: this.secondDegreeList2
            },

            {
              name: '重度不良(%)',
              type: 'line',
              // stack: '总量',
              // label: {
              //   normal: {
              //     show: true,
              //     position: 'top'
              //   }
              // },
              // areaStyle: {normal: {}},
              data: this.thirdDegreeList2
            },
            {
              name: '近视率(%)',
              type: 'line',
              // stack: '总量',
              // areaStyle: {normal: {}},
              data: this.shortList
            },
          ]
        };


        this.chart8 = echarts.init(this.$refs.trend);
        // this.chart9=echarts.init(this.$refs.trend2);
        this.chart10 = echarts.init(this.$refs.trend3);
        this.chart8.setOption(option3);
        // this.chart9.setOption(option3);
        this.chart10.setOption(option3);

        var option4 = {
          color: ['#FF9900', '#FFCC33', '#66CC00', '#3399CC'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['Forest', 'Steppe', 'Desert', 'Wetland']
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              axisTick: {show: false},
              data: ['小学', '初中', '高中']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '视力正常',
              type: 'bar',
              data: this.normalDegreeListBySchoolType
            },
            {
              name: '轻度视力不良',
              type: 'bar',
              barGap: 0,
              data: this.firstDegreeListBySchoolType
            },
            {
              name: '中度视力不良',
              type: 'bar',

              data: this.secondDegreeListBySchoolType
            },
            {
              name: '重度视力不良',
              type: 'bar',
              data: this.thirdDegreeListBySchoolType
            },
          ]
        };
        this.chart10 = echarts.init(this.$refs.schoolStatistic);
        this.chart10.setOption(option4);
        var option5 = {
          color: ['#FF9900', '#FFCC33', '#66CC00', '#3399CC'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['Forest', 'Steppe', 'Desert', 'Wetland']
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              axisTick: {show: false},
              data: this.schoolListByIns
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '视力正常',
              type: 'bar',
              data: this.normalDegreeListBySchool
            },
            {
              name: '轻度视力不良',
              type: 'bar',
              barGap: 0,
              data: this.firstDegreeListBySchool
            },
            {
              name: '中度视力不良',
              type: 'bar',

              data: this.secondDegreeListBySchool
            },
            {
              name: '重度视力不良',
              type: 'bar',
              data: this.thirdDegreeListBySchool
            }
            ,

          ]
        };

        var schooloption = {
          color: ['#FF9900', '#FFCC33', '#66CC00', '#3399CC'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['视力正常', '轻度视力不良','中度视力不良','重度视力不良']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis:  {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: this.schoolListByIns,
          },
          series: [
            {
              name: '视力正常',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              data: this.normalDegreeListBySchool
            },
            {
              name: '轻度视力不良',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              data:  this.firstDegreeListBySchool
            },
            {
              name: '中度视力不良',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              data: this.secondDegreeListBySchool
            },
            {
              name: '重度视力不良',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              data:  this.thirdDegreeListBySchool
            }
          ]
        };

        let chartName = echarts.init(document.getElementById('schoolListStatistic'));
        chartName.setOption(schooloption);
        let autoHeight = schooloption.yAxis.data.length * 30 + 150; // counst.length为柱状图的条数，即数据长度。35为我给每个柱状图的高度，50为柱状图x轴内容的高度(大概的)。
        chartName.getDom().style.height = autoHeight + "px";
        // chartName.getDom().childNodes[0].style.height = autoHeight + "px";
        // chartName.getDom().childNodes[0].childNodes[0].setAttribute("height",autoHeight);
        // chartName.getDom().childNodes[0].childNodes[0].style.height = autoHeight + "px";
        chartName.resize();
        // this.chart11=echarts.init(this.$refs.schoolListStatistic);
        // this.chart11.setOption(schooloption);

        // this.chart8.setOption({
        //   tooltip : {
        //     trigger: 'axis',
        //     axisPointer: {
        //       type: 'cross',
        //       label: {
        //         backgroundColor: '#6a7985'
        //       }
        //     }
        //   },
        //   legend: {
        //     data:['轻度不良','中度不良','重度不良']
        //   },
        //   toolbox: {
        //     feature: {
        //       saveAsImage: {}
        //     }
        //   },
        //   grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '3%',
        //     containLabel: true
        //   },
        //   xAxis : [
        //     {
        //       type : 'category',
        //       boundaryGap : false,
        //       data:this.surveyNameList
        //     }
        //   ],
        //   yAxis : [
        //     {
        //       type : 'value',
        //       axisLabel: {
        //         formatter: '{value}%'
        //       }
        //     }
        //   ],
        //   series : [
        //     {
        //       name:'轻度不良',
        //       type:'line',
        //       stack: '总量',
        //       areaStyle: {},
        //       data:this.firstDegreeList2
        //     },
        //     {
        //       name:'中度不良',
        //       type:'line',
        //       stack: '总量',
        //       areaStyle: {},
        //       data:this.secondDegreeList2
        //     },
        //     {
        //       name:'重度不良',
        //       type:'line',
        //       stack: '总量',
        //       areaStyle: {},
        //       data:this.thirdDegreeList2
        //     }
        //   ]
        // });


      },
      downloadpdf(name){

        this.fullscreenLoading=true;

        html2Canvas(document.querySelector('#pdfDom'), {
          allowTaint: true
        }).then(function (canvas) {

                  var leftHeight = canvas.height;

                  var a4Width = 595.28
                  var a4Height = 841.89
                  //一页pdf显示html页面生成的canvas高度;
                  var a4HeightRef = Math.floor(canvas.width / a4Width * a4Height);

                  //pdf页面偏移
                  var position = 0;

                  var pageData = canvas.toDataURL('image/jpeg', 1.0);

                  var pdf = new JsPDF('x', 'pt', 'a4');
                  var index = 1,
                          canvas1 = document.createElement('canvas'),
                          height;
                  pdf.setDisplayMode('fullwidth', 'continuous', 'FullScreen');

                  var pdfName = name;

                  function createImpl(canvas) {
                    if (leftHeight > 0) {
                      index++;

                      var checkCount = 0;
                      if (leftHeight > a4HeightRef) {
                        var i = position + a4HeightRef;
                        for (i = position + a4HeightRef; i >= position; i--) {
                          var isWrite = true
                          for (var j = 0; j < canvas.width; j++) {
                            var c = canvas.getContext('2d').getImageData(j, i, 1, 1).data

                            if (c[0] != 0xff || c[1] != 0xff || c[2] != 0xff) {
                              isWrite = false
                              break
                            }
                          }
                          if (isWrite) {
                            checkCount++
                            if (checkCount >= 10) {
                              break
                            }
                          } else {
                            checkCount = 0
                          }
                        }
                        height = Math.round(i - position) || Math.min(leftHeight, a4HeightRef);
                        if (height <= 0) {
                          height = a4HeightRef;
                        }
                      } else {
                        height = leftHeight;
                      }

                      canvas1.width = canvas.width;
                      canvas1.height = height;

                      // console.log(index, 'height:', height, 'pos', position);

                      var ctx = canvas1.getContext('2d');
                      ctx.drawImage(canvas, 0, position, canvas.width, height, 0, 0, canvas.width, height);

                      var pageHeight = Math.round(a4Width / canvas.width * height);
                      // pdf.setPageSize(null, pageHeight)
                      if (position != 0) {
                        pdf.addPage();
                      }
                      pdf.addImage(canvas1.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, a4Width, a4Width / canvas1.width * height);
                      leftHeight -= height;
                      position += height;
                      // $('.pdfProgress').text(index + 1);
                      // $('.pdfTotal').text(index + Math.ceil(leftHeight / a4HeightRef));
                      if (leftHeight > 0) {
                        setTimeout(createImpl, 1, canvas);
                      } else {
                        pdf.save(pdfName + '.pdf');
                        // $('.pdfTip').remove();
                      }
                    }
                  }

                  //当内容未超过pdf一页显示的范围，无需分页
                  if (leftHeight < a4HeightRef) {
                    pdf.addImage(pageData, 'JPEG', 0, 0, a4Width, a4Width / canvas.width * leftHeight);
                    pdf.save(pdfName + '.pdf')
                  } else {
                    try {
                      pdf.deletePage(0);
                      // $('.pdfTip').show();
                      // $('.pdfTotal').text(index + Math.ceil(leftHeight / a4HeightRef));
                      setTimeout(createImpl, 1, canvas);
                    } catch (err) {
                      console.log(err);
                    }
                  }

                }


        )

        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 5000);

      },
      getSchools(){
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
      },
    },



    mounted() {
      var user = sessionStorage.getItem('user');
      user=JSON.parse(user);
      if(user.type==1||user.type==2) {
        if(user.type==1){
          this.isGovern=true;
        }
        var institute = sessionStorage.getItem('institute');
        institute = JSON.parse(institute);
        this.selectForm.institutionId=institute.insDetail.id;
        //this.selectForm.type=user.type;
        this.getSurveyWithoutCondition();
        this.getGradesWithoutCondition();
      }
      else{
        this.notforschool=false;
        this.isschool=true;
        var schoolinfo = sessionStorage.getItem('schoolinfo');
        schoolinfo=JSON.parse(schoolinfo);
        var id=schoolinfo.schoolId;
        this.selectForm.schoolId=id;
        this.handleChange(id);
      }

     this.getSchools();
      let para={
        num:this.shortsightcount
      }
  //    this.initChart();
     // this.$chart.line1('schoolsight');
     //  this.$chart.line1('warning');
     //  this.$chart.line1('gradestatistic');
     //  this.$chart.line1('genderstatistic');
     //  this.$chart.line1('specificgrade');
     //  this.$chart.line1('trend');
     //  this.$chart.line1('gradewarning');
     //  this.$chart.line1('specificgradestatistic');


    }
  }

</script>

<style>
  .Style{
    margin-left: 0px;
    padding: 20px;
    border: 0px solid #d1dbe5;
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
  #schoolStatistic{
    width: 1080px;
    height: 400px;
  }
  #schoolListStatistic{
    width: 1080px;
    /*height: 400px;*/
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
    width: 1000px;
    height: 600px;
  }
  #trend2{
    width: 1000px;
    height: 600px;
  }
  #trend3{
    width: 1000px;
    height: 600px;
  }
  #gradewarning{
    width: 400px;
    height: 400px;
  }
  #specificgradestatistic{
    width: 400px;
    height: 400px;
  }
  .el-form-item__label {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }
</style>
