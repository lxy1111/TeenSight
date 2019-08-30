import login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import SuperAdminFileList from './views/fileManagement/superAdminFileList.vue'
import Form from './views/fileManagement/Form.vue'
import user from './views/fileManagement/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'
import superAdminSightData from "./views/fileManagement/superAdminSightData";
import superAdminCheckStatistic from "./views/checkManagement/superAdminCheckStatistic";
import superAdminCheckActivity from "./views/checkManagement/superAdminCheckActivity";
import superAdminInstitueManagement from "./views/fileManagement/superAdminInstitueManagement";
import superAdminSchoolManagement from "./views/fileManagement/superAdminSchoolManagement";
import superAdminGradeManagement from "./views/fileManagement/superAdminGradeManagement";
import superAdminStudentsManagement from "./views/fileManagement/superAdminStudentsManagement";
import superAdminAvailableDevices from "./views/deviceManagement/superAdminAvailableDevices";
import superAdminCircleBroadcastContent from "./views/deviceManagement/superAdminCircleBroadcastContent";
import superAdminBroadcastContent from "./views/deviceManagement/superAdminBroadcastContent";
import superAdminMessageList from "./views/messageManagement/superAdminMessageList";
import superAdminStudentDetail from "./views/fileManagement/superAdminStudentDetail";
import register from "./views/register";
import globalvariable from './global'
import superAdminCheckInstitute from "./views/fileManagement/superAdminCheckInstitute";
import myAccount from "./views/fileManagement/myAccount";



let routes = [
    {
        path: '/login',
        component: login,
        name: 'login',
        hidden: true
  },
    {
        path: '/register',
        component: register,
        name: 'registerSchool',
        hidden: true
    },
{
    path: '/404',
        component: NotFound,
    name: '',
    hidden: true
},
//{ path: '/main', component: Main },
{
    path: '/superAdmin',
    component: Home,
    name: '档案管理',
    iconCls: 'el-icon-message',//图标样式class
    children: [
    { path: '/superAdmin/superAdminInstituteManagement', component: superAdminInstitueManagement, name: '政府机构信息' },
        { path: '/superAdmin/superAdminCheckInstitute', component: superAdminCheckInstitute, name: '筛查机构信息' },
    { path: '/superAdmin/superAdminSchoolManagement', component: superAdminSchoolManagement, name: '学校信息' },
    { path: '/superAdmin/superAdminGradeManagement', component: superAdminGradeManagement, name: '年级信息' },
    { path: '/superAdmin/superAdminStudentsManagement', component: superAdminStudentsManagement, name: '学生信息' },
        { path: '/superAdmin/superAdminStudentDetail', component: superAdminStudentDetail,hidden:true,name:'个人信息'},
        { path: '/superAdmin/superAdminSightData', component: superAdminSightData,hidden:true,name:'屈光档案'},
        { path: '/superAdmin/superAdminSightData', component: superAdminSightData,hidden:true,name:'历史记录'},
]
},
{
    path: '/superAdmin',
        component: Home,
    name: '普查管理',
    iconCls: 'fa fa-id-card-o',
    children: [
    { path: '/superAdmin/superAdminCheckStatistics', component: superAdminCheckStatistic, name: '普查统计' },
    { path: '/superAdminCheckActivity', component: superAdminCheckActivity, name: '普查活动' }
]
},
{
    path: '/superAdmin',
    component: Home,
    name: '设备管理',
    iconCls: 'fa fa-bar-chart',
    children: [
    { path: '/superAdmin/superAdminAvailableDevices', component: superAdminAvailableDevices, name: '可用设备' },
    { path: '/superAdmin/superAdminCircleBroadcastContent', component: superAdminCircleBroadcastContent, name: '轮播内容' },
    { path: '/superAdmin/superAdminBroadcastContent', component: superAdminBroadcastContent, name: '公告内容' }
]
},
{
    path: '/superAdmin',
        component: Home,
    name: '消息管理',
    iconCls: 'fa fa-bar-chart',
    children: [
    { path: '/superAdmin/superAdminMessageList', component: superAdminMessageList, name: '系统消息' }
]
},
    {
        path: '/institute',
        component: Home,
        name: '筛查机构',
        children: [
            { path: '/institute/myAccount', component: myAccount, name: '个人信息' }
        ],
        hidden:true
    },
    {
        path: '/superAdmin',
        component: Home,
        name: '管理员',
        children: [
            { path: '/superAdmin/myAccount', component: myAccount, name: '个人信息' }
        ],
        hidden:true
    },
    {
        path: '/school',
        component: Home,
        name: '学校',
        children: [
            { path: '/school/myAccount', component: myAccount, name: '个人信息' }
        ],
        hidden:true
    },
    {
        path: '/institute',
        component: Home,
        name: '档案管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/institute/instituteSchoolManagement', component: superAdminSchoolManagement, name: '学校信息' },
            { path: '/institute/instituteGradeManagement', component: superAdminGradeManagement, name: '年级信息' },
            { path: '/institute/instituteStudentsManagement', component: superAdminStudentsManagement, name: '学生信息' },
            { path: '/institute/instituteStudentDetail', component: superAdminStudentDetail,hidden:true,name:'个人信息'},
            { path: '/institute/instituteSightData', component: superAdminSightData,hidden:true,name:'屈光档案'},
            { path: '/institute/instituteSightData', component: superAdminSightData,hidden:true,name:'历史记录'},
        ]
    },
    {
        path: '/institute',
        component: Home,
        name: '普查管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/institute/instituteCheckStatistics', component: superAdminCheckStatistic, name: '普查统计' }
            // { path: '/superAdminCheckActivity', component: superAdminCheckActivity, name: '普查活动' }
        ]
    },
    {
        path: '/school',
        component: Home,
        name: '档案管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/school/schoolGradeManagement', component: superAdminGradeManagement, name: '年级信息' },
            { path: '/school/schoolStudentsManagement', component: superAdminStudentsManagement, name: '学生信息' },
            { path: '/school/schoolStudentDetail', component: superAdminStudentDetail,hidden:true,name:'个人信息'},
            { path: '/school/schoolSightData', component: superAdminSightData,hidden:true,name:'屈光档案'},
            { path: '/school/schoolSightData', component: superAdminSightData,hidden:true,name:'历史记录'},
        ]
    },
    {
        path: '/school',
        component: Home,
        name: '普查管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/school/schoolCheckStatistics', component: superAdminCheckStatistic, name: '普查统计' },
            { path: '/school/schoolCheckActivity', component: superAdminCheckActivity, name: '普查活动' }
        ]
    },
    {
        path: '/school',
        component: Home,
        name: '设备管理',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/school/schoolAvailableDevices', component: superAdminAvailableDevices, name: '可用设备' }
        ]
    }
];

export default routes;
