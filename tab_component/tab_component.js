/**
 * Created by zhengfei on 2017/4/29.
 */
(function ($) {
  var Tab=function (tab) {
      var _this_=this;
      this.tab=tab;
      this.config={
          "triggerType":"mouseover",
          "effect":"default",
          "invoke":1,
          "auto":1000
      };
      var option=this.getConfig();
      if(option){
        $.extend(this.config,option);
      }
      var config=this.config;
      this.tabItems=this.tab.find('.tab-nav li');
      this.contentItems=this.tab.find('.content-wrap .content-item');
      /*triggerType实现*/
      if(config.triggerType==="click"){
        this.tabItems.bind('click',function () {
            _this_.invoke($(this));
        })
      }else {
        this.tabItems.bind('mouseover',function () {
            _this_.invoke($(this));
        })
      }
      /*自动切换*/
      if(config.auto){
          this.timer=null;
          this.loop=0;
          this.autoPlay();
          this.tab.hover(function () {
              window.clearInterval(_this_.timer);
          },function () {
              _this_.autoPlay();
          })
      }
      /*默认显示第几个*/
      if(config.invoke>1){
          this.invoke(this.tabItems.eq(config.invoke-1))
      }
  };
  Tab.prototype={
      /*自动播放autoPlay()*/
      autoPlay:function () {
        var _this_=this,
        tabItems=this.tabItems,
        tabLength=tabItems.length,
        config=this.config;

        this.timer=window.setInterval(function () {
            _this_.loop++;
            if(_this_.loop>=tabLength){
                _this_.loop=0;
            }
            tabItems.eq(_this_.loop).trigger(config.triggerType)
        },config.auto)

      },
      /*切换效果invoke()*/
      invoke:function (currentTab) {
          var _this_=this;
          var index=currentTab.index();
          currentTab.addClass('active').siblings().removeClass('active');
          var effect=this.config.effect;
          var conItems=this.contentItems;
          if(effect==='fade'){
              conItems.eq(index).addClass('current').siblings().removeClass('current')
              conItems.eq(index).fadeIn(1000).siblings().fadeOut();
          }else {
              conItems.eq(index).addClass('current').siblings().removeClass('current')
          }
          if(this.config.auto){
              this.loop=index;
          }
      },
      getConfig:function () {
          var config=this.tab.attr('data-config');
          if(config&&config!==''){
            return $.parseJSON(config)
          }else{
            return null;
          }
      }
  };
  /*注册成JQ方法*/
  $.fn.extend({
     tab:function () {
         this.each(function () {
             new Tab($(this));
         });
         return this;
     }
  });
  window.Tab=Tab;

})($);