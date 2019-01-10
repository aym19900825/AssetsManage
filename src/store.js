import Vue from 'vue'
import Vuex from 'vuex'

   Vue.use(Vuex)
   const state={//要设置的全局访问的state对象
     roleid:null,
     navid: null,
     menuid:null,//一级菜单id
     menusid:null,//二级菜单id
     selectedNav:{
      css: 'icon-user',
      name: '首页',
      url: '/index'},
     //要设置的初始属性值
     clickedNav:[{
      css: 'icon-user',
      name: '首页',
      url: '/index'}]
   };
	//组件获取 state 用 vuex 的 getter
   const getters = {   //实时监听state值的变化(最新状态)
    getRoleId(state) {  //承载变化的showFooter的值
       return state.roleid
    },
    getNavId(state){  //承载变化的changebleNum的值
       return state.navid
    },
    getMenuId(state){  //承载变化的changebleNum的值
       return state.menuid
    },
    getMensuId(state){  //承载变化的changebleNum的值
       return state.menusid
    },
    getSelectedNav(state){
       return state.selectedNav;
    },
    getClickedNav(state){
       return state.clickedNav;
    },
  
   };
   //修改 state 用 vuex 的 mutation 
   const mutations = {
      setRoleId(state,roleid) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
          state.roleid = roleid;
      },
      setNavId(state,navid){ //同上，这里面的参数除了state之外还传了需要增加的值sum
         state.navid=navid;
      },
      setMenuId(state,menuid) {  //同上
          state.menuid = menuid;
      },
      setMenusId(state,menusid) {  //同上
          state.menusid = menusid;
      },
      setSelectedNav(state,selectedNav){
          state.selectedNav=selectedNav;
      },
      setClickedNav(state,clickedNav){
          state.clickedNav=clickedNav;
      }
    };
    //组件触发动作用 vuex 的 action
   const actions = {
      setRoleIdAct(context,roleid) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
          context.commit('setRoleId',roleid);
      },
       setNavIdAct(context,navid) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
          context.commit('setNavId',navid);
      },
       setMenuIdAct(context,menuid) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
          context.commit('setMenuId',menuid);
      },
       setMenusIdAct(context,menusid) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
          context.commit('setMenusId',menusid);
      },
      setSelectedNavAct(context,selectedNav){
          context.commit('setSelectedNav',selectedNav);
      },
      setClickedNavAct(context,clickedNav){
          context.commit('setClickedNav',clickedNav);
      }
  };

   const store = new Vuex.Store({
       state,
       getters,
       mutations,
       actions
   });

export default store