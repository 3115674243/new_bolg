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
	  }
  }
  componentWillMount(){

  }

  render(){
    return (
      <div className={'homePage  noScrollDiv'}>
        <div className="home">
            <div className="topIndex">
              <div className="portrait">
                <img src={this.state.user_image|| '/images/portrait.jpg'}/>
              </div>
            </div>
            <div className="bodyHome">
              主体
            </div>
          <div id="main" style={{width: '4rem',height: '2.56rem'}} className="divCtent">
          </div>
		</div>
      </div>
    )
  }
  componentDidMount(){
// 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
// 指定图表的配置项和数据
    var option = {
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series : [
        {
          name:'文章类型',
          type:'pie',
          radius : '55%',
          center: ['50%', '50%'],
          data:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:274, name:'联盟广告'},
            {value:235, name:'视频广告'},
            {value:400, name:'搜索引擎'}
          ].sort(function (a, b) { return a.value - b.value; }),
          roseType: 'radius',
          label: {
            normal: {
              textStyle: {
                color: 'rgba(255, 255, 255, 0.9)'
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.9)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            }
          },
          itemStyle: {
            normal: {
              color: '#00B7FF',
              shadowBlur: 200,
              shadowColor: 'rgba(41, 182,246, 0.5)'

            }

          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ]
    };

// 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

  }
}


