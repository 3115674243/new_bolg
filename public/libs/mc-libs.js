/**
 * Created by jun on 2016/10/28.
 */
var libs=(function(){
  /*组件定义及实现*/
  var comBase=function(func){
    //model,valid,htmlId
    var com= function(params){
      this.model=com.model?(new com.model(this,params)):{};
      this.model.isErr=this.model.isErr||ko.observable(false);
      this.model.errMsg=this.model.errMsg||ko.observable('');
      this._class=com;
    };
    var adapter={
      //参数为一个function，this=当前组件model
      validate:function(valid){
        com.valid=valid||function(){};
      },
      //参数为一个类
      model:function(model){
        com.model=model;
      },
      view:function(htmlId){
        com.html=htmlId;
      },
      getData:function(getData){
        com.getData=getData||comBase.buildModel;
      },
      setData:function(setData){
        com.setData=setData||comBase.setModel;
      },
      setDefault:function(){
        com.getData=com.getData||comBase.buildModel;
        com.setData=com.setData||comBase.setModel;
      }
    }
    func(adapter);
    adapter.setDefault();
    com.init=function(){
      $view=$("#"+com.html);
      $view.removeAttr('id');
      com.html=$view[0].outerHTML;
    };
    com.register=function(name){
      ko.components.register(name,{
        viewModel:{
          createViewModel:function(params,componentInfo){
            return params.com.model;
          }
        },
        template:com.html
      });
    }
    //后期可以使用 对象 instanceof comBase 判断是否是com对象
    com.prototype=comBase.prototype;
    return com;
  }
  comBase.prototype.valid=function(reset){
    var model=this.model;
    if(reset){
      model.isErr(false);
      model.errMsg('');
    }
    else{
      var errMsg=this._class.valid.call(model);
      if(errMsg){
        //返回错误信息为string时显示错误信息
        if(typeof errMsg=='string'){
          model.isErr(true);
          model.errMsg(errMsg);
        }
        return false;
      }
      else {
        model.isErr(false);
        model.errMsg('');
        return true;
      }
    }
  }
  comBase.prototype.getData=function(){
    return this._class.getData.call(this.model);
  }
  comBase.prototype.setData=function(data){
    this._class.setData.call(this.model,data);
  }
  comBase.buildModel=function(){
    var handlerData=function(data){
      //排除属性
      var excludes=(data._excludes||[]).concat(['_excludes','errMsg','isErr']);
      var obj={};
      for(p in data){
        if(excludes.indexOf(p)>-1) continue;
        var pro = data[p];
        if(typeof pro=='object'){
          if(comBase.isCom(pro)){
            obj[p]=pro.getData();
          }
          else{
            obj[p]=handlerData(pro);
          }
        }
        else if(typeof pro=='function'){
          //如果是ko对象
          if(pro.toString()==ko.observable().toString()){
            var val=pro();
            //数组
            if(val instanceof Array){
              var alist=[];
              obj[p]=alist;
              for(var i=0;i<val.length;i++){
                alist.push(handlerData(val[i]));
              }
            }
            //基本类型
            else{
              obj[p]=val;
            }
          }
        }
        else{
          obj[p]=pro;
        }
      }
      return obj;
    }
    return handlerData(this);
  }
  comBase.setModel=function(data){

  }
  comBase.isCom=function(obj){
    return obj instanceof comBase;
  }
  //暂时不使用
  var validateResult=function(success,msg){
    this.success=success||true;
    this.msg=msg||'ok';
  }

  var comMoneyValue=comBase(function(adapter){
    adapter.view('mc-com-moneyValue');
    adapter.model(function(){
      this.min=ko.observable(0);
      this.max=ko.observable(10);
    });
    adapter.validate(function(){
      var min = Number(this.min())||0;
      var max=Number(this.max())||0;
      if(min<0)return "最小值不能小于0";
      if(max<0)return "最大值不能小于0";
      if(min>max){
        return "最小值不能大于最大值";
      }
    });
    adapter.setData(function(data){
      this.min(data.min);
      this.max(data.max);
    })
  });

  var comMoney=comBase(function(adapter){
    adapter.view('mc-com-money');
    adapter.model(function(com){
      var self=this;
      this.type=ko.observable(1);
      this.rdmVals=ko.observableArray([{bl:40,moneyValue:newCom("money_value")},{bl:60,moneyValue:newCom("money_value")}]);
      this.moneyValue=newCom("money_value");
      this.removeBl=function(){
        self.rdmVals.remove(this);
      }
      this.addBl=function(){
        self.rdmVals.push({bl:0,moneyValue:newCom("money_value")});
      }
    });
    adapter.validate(function(){
      //普通金额不验证
      if(this.type()==1){
        //取反是因为当前方法返回true为验证失败，而valid方法正好相反，返回true为验证成功
        return !this.moneyValue.valid();
      }
      //验证比例
      var sum=0;
      var vals=this.rdmVals();
      for(var i=0;i<vals.length;i++){
        //验证失败
        if(!vals[i].moneyValue.valid()) return true;
        sum+=Number(vals[i].bl)||0;
      }
      if(sum!=100){
        return "所有比例总和不等于100%";
      }
    });
    adapter.getData(function(){
      this._excludes = this.type()==1?['rdmVals']:['moneyValue'];
      return comBase.buildModel.call(this);
    })
    adapter.setData(function(data){
      this.type(data.type);
      if(data.type==2){
        var rdmVals =data.rdmVals.map(function(item){
          var moneyValue = item.moneyValue;
          item.moneyValue=newCom("money_value");
          item.moneyValue.setData(moneyValue);
          return item;
        });
        this.rdmVals(rdmVals);
      }
      else{
        this.moneyValue.setData(data.moneyValue);
      }
    })
  });

  var comRangeMoney=comBase(function(adapter){
    adapter.view('mc-com-rangeMoney');
    adapter.model(function(){
      var self=this;
      this.ranges=ko.observableArray([{min:0,max:10,money:newCom("money")},{min:10,max:20,money:newCom("money")}]);
      this.removeRange=function(){
        self.ranges.remove(this);
      }
      this.addRange=function(){
        self.ranges.push({min:0,max:0,money:newCom("money")});
      }
    });
    adapter.validate(function(){
      var ranges = this.ranges();
       for(var i=0,ci;ci=ranges[i];i++){
         if(ci.min==='') return "起始值必填";
         if(ci.max && Number(ci.min)>Number(ci.max)) return "起始值大于结束值";
         if(!ci.money.valid()) return true;
       }
    });
    adapter.setData(function(data){
      var ranges = data.ranges.map(function(item){
        var money = item.money;
        item.money=newCom('money');
        item.money.setData(money);
        return item;
      });
      this.ranges(ranges);
    })
  });

  var comMoneyRule=comBase( function(adapter){
    adapter.view('mc-com-moneyRule');
    adapter.model(function(params){
      var self=this;
      //【注意】这里的数据应来自模板调用方，含义为给每个角色分配比例。注：反显生成此数据时应该将配置表和新增的角色（新增的角色默认比例为0）、删除的角色合并生成此数据
      var roles=params.roles|| staticData.roles||[];
      this.step1={
        type:ko.observable(),
        condType:ko.observable(),
        gradeType:ko.observable(),
        sendBl:ko.observable(100),
        money:newCom("money"),
        rangeMoney:newCom("range_money"),
        formula:ko.observable()
      }
      this.step2={allot:ko.observable(80),tag:ko.observable(80)}
      this.step3={
        roles:roles,
        curRole:{},
        rolesConfig:ko.observableArray([]),
        addRoleConfig:function () {
          var isExists = self.step3.rolesConfig().filter(function(item){
            return item.role.id==self.step3.curRole.id;
          });
          if(isExists.length>0){
            alert('已存在此角色的配置，请勿重复添加！');
          }
          else{
            self.step3.rolesConfig.push({role:self.step3.curRole,bl:10,include:true,enable:true});
          }
        },
        removeRoleConfig:function(){
          self.step3.rolesConfig.remove(this);
        },
        _excludes:['curRole','roles']
      }
    });
    adapter.validate(function(){
      var type=this.step1.type();
      //普通金额
      if(type==1){
        return !this.step1.money.valid();
      }
      //条件金额
      else if(type==2){
        return !this.step1.rangeMoney.valid();
      }
      //动态金额
      else if(type==3){
        var formula = this.step1.formula();
        if(!formula) return "请输入运算公式";
        //验证公式是否正确
        try{
          eval("var tmp ="+formula.replace("{money}",100));
          if(Number(tmp)==isNaN) throw new Error();
        }
        catch(error){
          return "公式有误，请输入正确的表达式";
        }
      }
    });
    adapter.getData(function(){
      var excludes=null;
      var type=this.step1.type();
      if(type==1){
        excludes=['rangeMoney','formula','condType','gradeType'];
      }
      else if(type==2){
        excludes=['money','formula'];
      }
      else if(type==3){
        excludes=['rangeMoney','money','condType','gradeType'];
      }
      this.step1._excludes = excludes;
      return comBase.buildModel.call(this);
    })
    adapter.setData(function(data){
      this.step1.type(data.step1.type);
      this.step1.condType(data.step1.condType||'');
      this.step1.gradeType(data.step1.gradeType||'');
      this.step1.sendBl(data.step1.sendBl||'');
      if(data.step1.money){
        this.step1.money.setData(data.step1.money);
      }
      if(data.step1.rangeMoney){
        this.step1.rangeMoney.setData(data.step1.rangeMoney);
      }
      if(data.step1.formula){
        this.step1.formula(data.step1.formula);
      }
      this.step2.allot(data.step2.allot);
      this.step2.tag(data.step2.tag);
      this.step3.rolesConfig(data.step3.rolesConfig);
    })
  });

  var comActMoneyConfig = comBase(function(adapter,rules){
      adapter.view('mc-com-actMoneyConfig');
      adapter.model(function(){
        var self=this;
        this.name=ko.observable();
        this.range=ko.observable(1);
        this.rangeValue=ko.observable();
        this.isLong=ko.observable(false);
        this.startDate=ko.observable();
        this.endDate=ko.observable();
        this.isEnable=ko.observable(true);
        this.moneyRuleJoin=newCom("money_rule",{});
        this.moneyRulePay=newCom("money_rule",{});
        this.moneyRuleDeal=newCom("money_rule",{});
        this.panels=[
          {txt:ko.observable('收起↓'),show:ko.observable(true)},
          {txt:ko.observable('展开↑'),show:ko.observable(false)},
          {txt:ko.observable('展开↑'),show:ko.observable(false)},
        ];
        this.panelClick=function(i){
          var isShow = self.panels[i].show();
          self.panels[i].show(!isShow);
          self.panels[i].txt(isShow?'展开↑':'收起↓');
        };
        this.errMsg=function(msg){
          msg && alert(msg);
        }
        this._excludes=['panels'];
      });
      adapter.validate(function(){
        if(!this.name()) {
          var msg="请输入规则名称";
          return msg;
        }
        if(!this.isLong()){
          var startDate = this.startDate();
          var endDate = this.endDate();
          if(startDate && endDate){
            startDate = new Date(startDate);
            endDate = new Date(endDate);
            if(endDate<startDate)
            {
              var msg="结束时间不得大于开始时间";
              return msg;
            }
          }
          else {
            var msg="请选择开始时间和结束时间";
            return msg;
          }
        }
        return !(this.moneyRuleJoin.valid() && this.moneyRulePay.valid() && this.moneyRuleDeal.valid());
      });
      adapter.setData(function(data){
        this.name(data.name);
        this.range(data.range);
        this.rangeValue(data.rangeValue);
        this.isLong(data.isLong);
        this.startDate(moment(data.startDate).format('YYYY-MM-DD'));
        this.endDate(moment(data.endDate).format('YYYY-MM-DD'));
        this.isEnable(data.isEnable);
        this.moneyRuleJoin.setData(data.moneyRuleJoin);
        this.moneyRulePay.setData(data.moneyRulePay);
        this.moneyRuleDeal.setData(data.moneyRuleDeal);
      })
    });
  /*end-组件定义及实现*/

  /*局部变量定义*/
  //所有组件类型
  var coms=[];
  coms['money']=comMoney;
  coms['money_value']=comMoneyValue;
  coms['range_money']=comRangeMoney;
  coms['money_rule']=comMoneyRule;
  coms['act_money_config']=comActMoneyConfig;
  newCom=function(name,params){
    return new coms[name](params);
  }
  //所有渲染对象
  var pages=[];
  //静态数据
  var staticData={};
  /*end-局部变量定义*/


  /*页面渲染对象*/
  var pageRender=function(id,model){
    var self=this;
    this.model=model;
    this.render(document.getElementById(id));
  }
  //开始渲染，将page中所有class为组件名称的元素追加组件
  pageRender.prototype.render=function(dom){
    ko.applyBindings(this.model,dom);
  }
  pageRender.prototype.getData=function(){
     return comBase.buildModel.call(this.model);
  }
  pageRender.prototype.setData=function(data){
    for(p in data){
      if(this.model[p] && comBase.isCom(this.model[p])){
        this.model[p].setData(data[p]);
      }
    }
  }
  pageRender.prototype.validate =function(){
    var istrue=true;
    for(p in this.model){
      var ci=this.model[p];
      if(!ci.valid()){
        istrue=false;
      }
    }
    return istrue;
  }
  /*end-页面渲染对象*/

  //公开信息
  var pub={
    inited:false,
    init:function(){
      for(name in coms){
        var com = coms[name];
        com.init();
        com.register(name);
      }
      pub.inited=true;
    },
    //渲染页面组件，id:dom元素的ID
    render:function(id,model){
      var page=new pageRender(id,model);
      pages.push(page);
      return page;
    },
    staticData:function(key,data){
      if(data && data!=staticData[key])
      staticData[key]=data;
      return staticData[key];
    },
    coms:coms,
    newCom:newCom
  };
  return pub;
})();

$(function(){
  libs.init();
});
