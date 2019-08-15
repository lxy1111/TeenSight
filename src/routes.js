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
        name: 'register',
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
    path: '/',
    component: Home,
    name: '档案管理',
    iconCls: 'el-icon-message',//图标样式class
    children: [
    { path: '/superAdminInstituteManagement', component: superAdminInstitueManagement, name: '政府机构信息' },
    { path: '/superAdminSchoolManagement', component: superAdminSchoolManagement, name: '学校信息' },
    { path: '/superAdminGradeManagement', component: superAdminGradeManagement, name: '年级信息' },
    { path: '/superAdminStudentsManagement', component: superAdminStudentsManagement, name: '学生信息' },
        { path: '/superAdminStudentDetail', component: superAdminStudentDetail,hidden:true,name:'个人信息'},
        { path: '/superAdminSightData', component: superAdminSightData,hidden:true,name:'屈光档案'},
        { path: '/superAdminSightData', component: superAdminSightData,hidden:true,name:'历史记录'},
]
},
{
    path: '/',
        component: Home,
    name: '普查管理',
    iconCls: 'fa fa-id-card-o',
    children: [
    { path: '/superAdminCheckStatistics', component: superAdminCheckStatistic, name: '普查统计' }
    // { path: '/superAdminCheckActivity', component: superAdminCheckActivity, name: '普查活动' }
]
},
{
    path: '/',
    component: Home,
    name: '设备管理',
    iconCls: 'fa fa-bar-chart',
    children: [
    { path: '/superAdminAvailableDevices', component: superAdminAvailableDevices, name: '可用设备' },
    { path: '/superAdminCircleBroadcastContent', component: superAdminCircleBroadcastContent, name: '轮播内容' },
    { path: '/superAdminBroadcastContent', component: superAdminBroadcastContent, name: '公告内容' }
]
},
{
    path: '/',
        component: Home,
    name: '消息管理',
    iconCls: 'fa fa-bar-chart',
    children: [
    { path: '/superAdminMessageList', component: superAdminMessageList, name: '消息列表' }
]
}
];

export default routes;
