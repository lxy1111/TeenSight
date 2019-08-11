import echarts from 'echarts'
const install = function(Vue) {
  Object.defineProperties(Vue.prototype, {
    $chart: {
      get() {
        return {
          //画一条简单的线
          line1: function (id) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();


            const specificgrade= {
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                x: 'left',
                data:['近视率','非近视率']
              },
              series: [
                {
                  name:'访问来源',
                  type:'pie',
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
                  data:[
                    {value:335, name:'近视率'},
                    {value:310, name:'非近视率'}
                  ]
                }
              ]
            };

            const specificgradestatistic = {
              color: ['#3398DB'],
              tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
                  data : ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
                  axisTick: {
                    alignWithLabel: true
                  }
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
                  name:'直接访问',
                  type:'bar',
                  barWidth: '60%',
                  data:[10, 52, 20, 30, 24, 34]
                }
              ]
            };


           const gradestatistic = {
              color: ['#3398DB'],
              tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
                  data : ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
                  axisTick: {
                    alignWithLabel: true
                  }
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
                  name:'直接访问',
                  type:'bar',
                  barWidth: '60%',
                  data:[10, 52, 20, 30, 24, 34]
                }
              ]
            };
            const genderstatistic = {
              color: ['#3398DB'],
              tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
                  data : ['男生', '女生'],
                  axisTick: {
                    alignWithLabel: true
                  }
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
                  name:'直接访问',
                  type:'bar',
                  barWidth: '60%',
                  data:[10, 52]
                }
              ]
            };


            const schoolsight= {
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                x: 'left',
                data:['近视率','非近视率']
              },
              series: [
                {
                  name:'访问来源',
                  type:'pie',
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
                  data:[
                    {value:335, name:'近视率'},
                    {value:310, name:'非近视率'}
                  ]
                }
              ]

            };



            const gradewarning= {
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                x: 'left',
                data:['一级预警','二级预警','三级预警']
              },
              series: [
                {
                  name:'访问来源',
                  type:'pie',
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
                  data:[
                    {value:335, name:'一级预警'},
                    {value:310, name:'二级预警'},
                    {value:234, name:'三级预警'}
                  ]
                }
              ]
            };

            const warning= {
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                x: 'left',
                data:['一级预警','二级预警','三级预警']
              },
              series: [
                {
                  name:'访问来源',
                  type:'pie',
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
                  data:[
                    {value:335, name:'一级预警'},
                    {value:310, name:'二级预警'},
                    {value:234, name:'三级预警'}
                    ]
                }
              ]
            };

            const trend=   {
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
              ]};


            const globalsight=   {
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
            ]};
           if(id=='globalsight') {
             this.chart.setOption(globalsight);
           }
           if(id=='schoolsight'){
             this.chart.setOption(schoolsight);
           }
            if(id=='warning'){
              this.chart.setOption(warning);
            }
            if(id=='gradestatistic'){
              this.chart.setOption(gradestatistic);
            }
            if(id=='genderstatistic'){
              this.chart.setOption(genderstatistic);
            }
            if(id=='specificgrade'){
              this.chart.setOption(specificgrade);
            }
            if(id=='trend'){
              this.chart.setOption(trend);
            }
            if(id=='gradewarning'){
              this.chart.setOption(gradewarning);
            }
            if(id=='specificgradestatistic'){
              this.chart.setOption(specificgradestatistic);
            }
          },
        }
      }
    }
  })
}

export default {
  install
}
