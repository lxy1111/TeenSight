import axios from 'axios';
import dev from '../../config/dev.env'

let base = '';

axios.defaults.baseURL="http://112.124.10.207:8080";

export const requestLogin = params => { return axios.post(`/api/user/login`, params).then(res => res.data); };

export const removeInstitute = params => { return axios.post(`/api/institution/removeInstitution`, params).then(res => res.data); };

export const removeSchool = params => { return axios.get(`/api/school/removeSchool`, {params:params});};

export const modifySchool = params => { return axios.post(`/api/school/modifySchool`, params).then(res => res.data);};

export const removeTeacher = params => { return axios.get(`/api/teacher/removeTeacher`, {params:params});};

export const removeStudent = params => { return axios.get(`/api/student/removeStudent`, {params:params});};

export const requestRegisterSchool = params => { return axios.post(`/api/user/schoolRegister`, params).then(res => res.data); };

export const requestRegisterInstitute = params => { return axios.post(`/api/user/institutionRegister`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getNoticeList = params => { return axios.get(`/api/common/getNoticeList`, { params: params }); };

export const getMessageList = params => { return axios.get(`/api/common/getMessageList`, { params: params }); };

export const getStudentCode = params => { return axios.post(`/api/student/generateQrCode`, params).then(res => res.data) };

export const getCircleBroadcastList = params => { return axios.get(`/api/common/getChartList`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const getStudentsList = params => { return axios.get(`/api/student/getStudentList`, { params: params }); };

export const getTeachersList = params => { return axios.get(`/api/teacher/getTeacherList`, { params: params }); };

export const getSchoolListPage = params => { return axios.get('/api/school/getSchoolList', { params: params }); };

export const getInstitutionList = params => { return axios.get(`/api/institution/getInstitutionList`, { params: params }); };

export const getInstituteDetail = params => { return axios.get(`/api/institution/getInstitutionDetail`, { params: params }); };

export const getStudentDetail = params => { return axios.get(`/api/student/getStudentDetail`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const addStudents = params => { return axios.post(`/api/student/createStudent`, params).then(res => res.data); };


export const addGrades = params => { return axios.post(`/api/teacher/createTeacher`, params).then(res => res.data); };


export const addInstitutes = params => { return axios.post(`/api/institution/createInstitution`, params).then(res => res.data); };

export const editInstitutes = params => { return axios.post(`/api/institution/modifyInstitution`, params).then(res => res.data); };

export const editGrades = params => { return axios.post(`/api/teacher/modifyTeacher`, params).then(res => res.data); };

export const editSchool = params => { return axios.post(`/api/school/modifySchool`, params).then(res => res.data); };
