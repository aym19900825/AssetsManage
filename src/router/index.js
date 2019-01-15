import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login/login'//登录页
import index from '@/components/index'//首页
import task from '@/components/task'//代办
import all_icons from '@/components/common/all_icons'//所有图标
import ztree from '@/components/common/ztree' //树菜单


import products_category from '@/components/maindata/products_category'//产品类别
import products from '@/components/maindata/products'//产品
import testing_standard from '@/components/maindata/testing_standard'//检验/检测标准
import testing_projects from '@/components/maindata/testing_projects'//检验/检测项目
import testing_methods from '@/components/maindata/testing_methods'//检验/检测方法
import data_module from '@/components/maindata/data_module'//原始数据模板
import report_module from '@/components/maindata/report_module'//检验/检测报告模板
import work_instruction from '@/components/maindata/work_instruction'//作业指导书


import customer_management from '@/components/setting/customer_management'//客户管理
import user_management from '@/components/setting/user_management'//用户管理
import dept_management from '@/components/setting/dept_management'//机构管理
import role_management from '@/components/setting/role_management'//角色管理
import menu_management from '@/components/setting/menu_management'//菜单管理
import data_management from '@/components/setting/data_management'//数据管理
import safe_management from '@/components/setting/safe_management'//安全管理
import number_settings from '@/components/setting/number_settings'//自动编号设置
import dictionaries_management from '@/components/setting/dictionaries_management'//字典管理
import personinfo from '@/components/setting/personinfo'//个人资料
import passwordedit from '@/components/setting/passwordedit'//修改密码



import annual_plan from '@/components/annual_plan'//年度计划
import notifications from '@/components/notifications'//工作任务通知书
import proxies from '@/components/proxies'//委托书管理

import samples from '@/components/samples/samples'//样品管理-接样
import collar_sample from '@/components/samples/collar_sample'//样品管理-领样
import return_sample from '@/components/samples/return_sample'//样品管理-返样
import sample_disposal from '@/components/samples/sample_disposal'//样品管理-样品处置


import workorders from '@/components/workorders'//工作任务单
import devices from '@/components/devices'//设备管理
import inspection_project from '@/components/inspection_project'//检验/检测项目管理
import test from '@/components/test'//检验/检测项目管理
import files_search from '@/components/files_search'//文件查询
import interfaces from '@/components/interfaces'//接口
import reports from '@/components/reports'//报表管理


import inspect_proxy from '@/components/proxies/inspect_proxy'//检验委托书
import subc_agreement from '@/components/proxies/subc_agreement'//分包协议

import equipment_classify from '@/components/equipments/equipment_classify'//设备分类
import instruments from '@/components/equipments/instruments'//仪器和计量器具
import usag_tending_records from '@/components/equipments/usag_tending_records'//使用/维护保养记录
import traceability_plan from '@/components/equipments/traceability_plan'//溯源计划
import traceability_records from '@/components/equipments/traceability_records'//溯源记录
import verification_plan from '@/components/equipments/verification_plan'//期间核查计划
import verification_records from '@/components/equipments/verification_records'//期间核查记录   
import testing from '@/components/testing'//期间核查记录

import doc_category from '@/components/document/category'//关键字类别
import doc_keyword from '@/components/document/keyword'//关键字
import doc_authorize from '@/components/document/authorize'//关键字授权
import doc_root from '@/components/document/doc_root'//文件目录
import doc_list from '@/components/document/doc_list'//文件列表

import approving from '@/components/workflow/approving'//审批意见
import flowhistory from '@/components/workflow/flowhistory'//流程历史
import flowmap from '@/components/workflow/flowmap'//流程地图

import flow_management from '@/components/flow/flow_management'//流程模型
import flow_process from '@/components/flow/flow_process'//流程模型
Vue.use(Router)
  const routes = [
    {//登录页
      path: '/',
      name: 'Login',
      component: Login
    },
    {//首页
      path: '/index',
      name: 'index',
      component: index
    },
     {//代办
      path: '/task',
      name: 'task',
      component: task
    },
    {//年度计划
      path: '/annual_plan',
      name: 'annual_plan',
      component: annual_plan
    },
    {//工作任务通知书
      path: '/notifications',
      name: 'notifications',
      component: notifications
    },
    {//所有图标
      path: '/all_icons',
      name: 'all_icons',
      component: all_icons
    },
    {//客户管理
      path: '/customer_management',
      name: 'customer_management',
      component: customer_management
    },
    {//产品类别
      path: '/products_category',
      name: 'products_category',
      component: products_category
    },
    {//产品
      path: '/products',
      name: 'products',
      component: products
    },
    {//检验/检测标准
      path: '/testing_standard',
      name: 'testing_standard',
      component: testing_standard
    },
    {//检验/检测项目
      path: '/testing_projects',
      name: 'testing_projects',
      component: testing_projects
    },
    {//检验/检测方法
      path: '/testing_methods',
      name: 'testing_methods',
      component: testing_methods
    },
    {//原始数据模板
      path: '/data_module',
      name: 'data_module',
      component: data_module
    },
    {//检验检测报告模板
      path: '/report_module',
      name: 'report_module',
      component: report_module
    },
    {//作业指导书
      path: '/work_instruction',
      name: 'work_instruction',
      component: work_instruction
    },
    {//自动编号设置
      path: '/number_settings',
      name: 'number_settings',
      component: number_settings
    },
    {//机构管理
      path: '/dept_management',
      name: 'dept_management',
      component: dept_management
    },
    {//数据管理
      path: '/data_management',
      name: 'data_management',
      component: data_management
    },
    {//字典管理
      path: '/dictionaries_management',
      name: 'dictionaries_management',
      component: dictionaries_management
    },
    {//检验委托书
      path: '/inspect_proxy',
      name: 'inspect_proxy',
      component: inspect_proxy
    },{//审批意见
      path: '/approving',
      name: 'approving',
      component: approving
    },
     {//流程历史
      path: '/flowhistory',
      name: 'flowhistory',
      component: flowhistory
    },{//流程地图
      path: '/flowmap',
      name: 'flowmap',
      component: flowmap
    },
    {//分包协议
      path: '/subc_agreement',
      name: 'subc_agreement',
      component: subc_agreement
    },
    {//设备分类
      path: '/equipment_classify',
      name: 'equipment_classify',
      component: equipment_classify
    },
    {//仪器和计量器具
      path: '/instruments',
      name: 'instruments',
      component: instruments
    },
    {//使用/维护保养记录
      path: '/usag_tending_records',
      name: 'usag_tending_records',
      component: usag_tending_records
    },
    {//溯源计划
      path: '/traceability_plan',
      name: 'traceability_plan',
      component: traceability_plan
    },
    {//溯源记录
      path: '/traceability_records',
      name: 'traceability_records',
      component: traceability_records
    },
    {//期间核查计划
      path: '/verification_plan',
      name: 'verification_plan',
      component: verification_plan
    },
    {//期间核查记录
      path: '/verification_records',
      name: 'verification_records',
      component: verification_records
    },
    {//个人资料
      path: '/personinfo',
      name: 'personinfo',
      component: personinfo
    },
    {//修改密码
      path: '/passwordedit',
      name: 'passwordedit',
      component: passwordedit
    },
    {//树菜单
      path: '/ztree',
      name: 'ztree',
      component:ztree  
    },
    {//菜单管理
      path: '/menu_management',
      name: 'menu_management',
      component: menu_management
    },
    {//角色管理
      path: '/role_management',
      name: 'role_management',
      component: role_management
    },
     {//用户管理
      path: '/user_management',
      name: 'user_management',
      component: user_management
    },
    {//安全管理
      path: '/safe_management',
      name: 'safe_management',
      component: safe_management
    },
    {//委托书管理
      path: '/proxies',
      name: 'proxies',
      component: proxies
    },
    {//样品管理-接样
      path: '/samples',
      name: 'samples',
      component: samples
    },{//样品管理-领样
      path: '/collar_sample',
      name: 'collar_sample',
      component: collar_sample
    },
    {//样品管理-返样
      path: '/return_sample',
      name: 'return_sample',
      component: return_sample
    },
    {//样品管理-样品处置
      path: '/sample_disposal',
      name: 'sample_disposal',
      component: sample_disposal
    },
    {//工作任务单
      path: '/workorders',
      name: 'workorders',
      component: workorders
    },
    {//设备管理
      path: '/devices',
      name: 'devices',
      component: devices
    },
    {//检验/检测项目管理
      path: '/inspection_project',
      name: 'inspection_project',
      component: inspection_project
    },
    {//检验/检测项目管理
      path: '/test',
      name: 'test',
      component: test
    },
    {//文件查询
      path: '/files_search',
      name: 'files_search',
      component: files_search
    },
    {//接口
      path: '/interfaces',
      name: 'interfaces',
      component: interfaces
    },
    {//报表管理
      path: '/reports',
      name: 'reports',
      component: reports
    },
    {//机构管理
      path: '/testing',
      name: 'testing',
      component: testing
    },
    {//关键字类别管理
      path: '/doc_category',
      name: 'doc_category',
      component: doc_category
    },
    {//关键字管理
      path: '/doc_keyword',
      name: 'doc_keyword',
      component: doc_keyword
    },
    {//关键字授权管理
      path: '/doc_authorize',
      name: 'doc_authorize',
      component: doc_authorize
    },
    {//文件目录管理
      path: '/doc_root',
      name: 'doc_root',
      component: doc_root
    }
    ,
    {//文件列表管理
      path: '/doc_list',
      name: 'doc_list',
      component: doc_list
    },
     {//流程模型
      path: '/flow_management',
      name: 'flow_management',
      component: flow_management
    },
    {//工作流管理
      path: '/flow_process',
      name: 'flow_process',
      component: flow_process
    },
];

const router = new Router({
  routes: routes
})
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        var token = sessionStorage.getItem('access_token');
        if (token) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/',
            })
        }
    }
    else {
        next();
    }
})

export default  router