const commonNew = {
  //刷新页面
  winReload:function(cond){
    window.location.reload();
  },

  //关闭当前选项卡
  closeSel:function(){
      this.closeTab( this.selectedTab);
  },


};


export default commonNew