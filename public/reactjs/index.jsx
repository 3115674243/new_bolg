

class Home_Page extends React.Component{
  constructor(){
    super();
    this.state={
      type:getQueryString("type")||"home"
    }
  }
  componentWillMount(){
	  let that=this;
	  that.slideMenu();
  }
  slideMenu(){
    let that=this;
    let tool=new tools();
	  tool.itemTouch(document.getElementById("container"),that.navShowAndHidden)
  }
  navShowAndHidden(e,state){
	  let evt=document.getElementById('leftNav');

	 // console.log(state);
    switch (state){
        case 'left':
          if(!evt.classList.contains("leftNavHidden")){
			  evt.classList.add("leftNavHidden");
			  $(".homePage").addClass("homePageLeft");
          }
          break;
		case 'right':
			if(evt.classList.contains("leftNavHidden")){
				evt.classList.remove("leftNavHidden");
				$(".homePage").removeClass("homePageLeft");
            }
		  break;
    }

  }
  changeType(value){
      if(this.state.type!=value){
	      setQueryString("type",value);
          this.setState({type:value});
      }
  }
  render(){
    let type=this.state.type;
    return (
      <div className="layOutPage noScrollDiv">
        <LeftNav changeType={this.changeType.bind(this)} type={this.state.type}/>
          {type=="home"?<HomeView/>:
              type=="album"?<Album/>:<HomeView/>}

        <BackGround/>
      </div>
      )
  }
}

class HomeView extends React.Component{
  constructor(){
    super();
	  this.state={
		  user_image:user_image||null,
          max:4,//轮播最大值
          index:0,//轮播位置
          show:true
	  }
  }
    componentDidMount(){
    }
  componentWillMount(){

  }

  changeList(){
      let that=this;
      let i =that.state.index;
      let render
      switch (i) {
          case 0:
              render=<div className={"givectent"}>
                  <div className={"contBody"}>
                      <img src={"/images/login/bg.jpg"} style={{    height: "60vh", width: "90%", animation: "changeInto .5s ease-in-out"}}/>
                      <img  src={"/images/my.jpg"} style={{position: "relative", left: "-17vh",width: "35vh", animation: "changeInto .7s ease-in-out"}}/>
                  </div>
                  <div className={"contText"}>
                      <div >
                          <h2>
                             您好，我是张超<br/>
                              高级软件工程师<br/>
                          </h2>
                              您的项目无法把控进度吗？您无法知悉开发流程各个环节的难点和成本吗？<br/>
                              您的项目遇到了技术问题吗？我认为我可以为您分担些压力<br/>
                              我的特长是nodejs方向的开发，面对一般的面向对象型语言都有一定的了解<br/>
                              并且我还是一名兼职前端工程师，针对android移动端熟悉react-native制作<br/>
                      </div>
                  </div>
              </div>;
              break;
          case 1:
              render=<div className={"givectent"}>
                  <div className={"contBody2"}>
                      <div className={"bodyList"}>
                          <img src={"/images/project/素材.jpg"} style={{position: "relative",height:"100%",margin: "auto",animation: "changeInto .4s ease-in-out"}}/>
                          <img src={"/images/project/素材3.png"} style={{position: "relative",height:"100%",margin: "auto",animation: "changeInto .6s ease-in-out"}}/>
                      </div>
                      <div className={"bodyText"}>
                        独立研发reactnative移动端，用于工业化
                      </div>
                  </div>
                  <div className={"contText"}>
                      <div style={{width: "80%"}}>
                      <h2>快速学习并运用实战</h2>
                      您的业务涉及到了移动端开发？微信小程序，androidAPP、H5网页应用，都不在话下<br/>
                      我熟练运用reactnative开发android应用，并了解rn原生交互
                      </div>
                  </div>
              </div>
              break;
          case 2:
              render=<div className={"givectent"}>
                <div className={"contBody3"} style={{position:"relative",animation: "changeInto .7s ease-in-out"}}>
                    <div className={"body3Item"} style={{position:"relative", animation: "changeInto .7s ease-in-out"}}>
                        <div className={"leftSpan"}>01</div>
                        <div className={"bodyText"}>良好的代码素养</div>
                    </div>
                    <div className={"body3Item"} style={{position:"relative", animation: "changeInto .9s ease-in-out"}}>
                        <div className={"leftSpan"}>02</div>
                        <div className={"bodyText"}>个人目标确定</div>
                    </div>
                    <div className={"body3Item"} style={{position:"relative",animation: "changeInto 1.2s ease-in-out"}}>
                        <div className={"leftSpan"}>03</div>
                        <div className={"bodyText"}>基于业务综合软件方案</div>
                    </div>
                </div>
                <div className={"contBody3"} style={{position:"relative",animation: "changeInto 1.2s ease-in-out"}}>
                    <div className={"body3Item"}>
                        <div className={"leftSpan"}>04</div>
                        <div className={"bodyText"}>良好的需求客户与开发技术对接</div>
                    </div>
                    <div className={"body3Item"} style={{position:"relative",animation: "changeInto 1.5s ease-in-out"}}>
                        <div className={"leftSpan"}>05</div>
                        <div className={"bodyText"}>项目流程清晰明朗</div>
                    </div>
                    <div className={"body3Item"} style={{position:"relative",animation: "changeInto 1.7s ease-in-out"}}>
                        <div className={"leftSpan"}>06</div>
                        <div className={"bodyText"}>将您的需求转化为产品</div>
                    </div>
                </div>
              </div>
              break;
          case 3:
              render=<div className={"givectent"}>
                  <div className={"contBody4"}>

                      <img src={"/images/project/大区图片.png"} style={{position: "relative",height:"100%",top: "12vh",margin: "auto",animation: "changeLeft .5s ease-in-out"}}/>


                      <img src={"/images/project/大区管理.png"} style={{position: "relative",height:"100%",margin: "auto",animation: "changeInto .7s ease-in-out"}}/>

                      <div className={"bodyItem"}>
                          <h2>平台化大区数据统计</h2>
                      </div>
                  </div>
                  <div className={"contText"}>
                      <div>
                          拥有良好的代码习惯<br/>
                          高效的接口设计<br/>
                          良好的解耦<br/>
                          高度复用性的结构<br/>
                          <h2>构建快速稳定的数据交互</h2>
                      </div>
                  </div>
              </div>
              break;
          case 4:
              render=<div className={"givectent"}>
                  <div className={"contBody4"}>
                      
                  </div>
                  <div className={"contText"}>
                      <div>

                      </div>
                  </div>
              </div>
              break;
      }
      return render;
  }

  render(){
      let that=this;
      let Icon=antd.Icon;
      let index=that.state.index;
      let max=that.state.max;
    return (
      <div className={'homePage  noScrollDiv'}>
          <div className="bodyHome">
              <div className={"navga"}>
                    <div className={"leftNavg"}>
                        {that.state.index>0?<Icon type="left" style={{color:"#fff",fontSize:30}} onClick={()=>{q_setState({show:false},that).then(ok=>{
                            q_setState({index:index-1,show:true},that)
                        })}}/>:null}

                    </div>
              </div>
              <div className={"ctent"}>
                  {that.state.show?that.changeList():null}
              </div>
              <div className={"navga"}>
                  <div className={"rightNavg"}>
                      {that.state.index<max-1?<Icon type="right" style={{color:"#fff",fontSize:30}} onClick={()=>{

                          q_setState({show:false},that).then(ok=>{
                              q_setState({index:index+1,show:true},that)
                          })
                      }}/>:null}
                  </div>
              </div>
          </div>
          <footer className={"homeFoter"} >

          </footer>
		</div>
    )
  }

}
class homeBody  extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    componentWillMount(){
        let that=this;
    }
    getRender(item){

    }
    render(){
        return <div className={"ctent"}>
            <div className={"contBody"}>

            </div>
            <div className={"contText"}>

            </div>
        </div>
    }
}


