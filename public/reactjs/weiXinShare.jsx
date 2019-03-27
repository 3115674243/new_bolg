class weiXinShare_Page extends React.Component{
	constructor(){
		super();
		this.state={
			_weiXInApi:'',
			zhi:''
		}
	}
	componentWillMount(){
		let that=this;
		let wexinAgent=new wexinApi();
		let _weiXInApi=wexinAgent.weiXinApi();
		_weiXInApi.init('debug').then(()=>{
			_weiXInApi.onShare({desc:'这是测试页面数据'},function (text) {
				console.log(text);
				that.seteState({zhi:"123"+text});
				alert('调用成功');
			});
		}).catch(err=>{
			console.error(err);
		});
		that.setState({_weiXInApi:_weiXInApi});
	}
	render(){
		return<div>
		你好，这是微信分享测试页面。
			<div>{this.state.zhi}</div>
		</div>
	}
}