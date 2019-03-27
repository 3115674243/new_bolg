class Album extends React.Component{
    constructor(){
        super();
        this.state={
            dataMap:{"2019-3-4":[
            	{url:["images/ceshi.jpg"],name:"今天心情真好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情真好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情真好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情真好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情真好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情真好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情真好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情真好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情真好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情真好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情真好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情真好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情真好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情真好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情真好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情真好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情真好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情真好",text:"这是随笔"},
            
            ],"2019-3-5":[
            	{url:["/images/ceshi.jpg"],name:"今天心情也好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情也好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情也好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情也好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情也好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情也好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情也好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情也好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情也好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情也好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情也好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情也好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情也好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情也好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情也好",text:"这是随笔"},
            	{url:["/images/ceshi.jpg"],name:"今天心情也好",text:"这是随笔"},
            	]}
        }
    }
    componentWillMount(){
    
    }
    getData(){
        let url="";
	    ajaxUtil(url,'get',null).then(rst=>{
	        return rst.data;
	    }).catch(err=>{
		    ErrorMessage(err);
	    })
    }
    render(){
        let dataMap=this.state.dataMap;
        return (
            <div className="homePage albumPage">
	            <div className="albumBody scrollDiv">
                {Object.keys(dataMap).map(key=>{
                    return <div className="album" key={key}>
	                    <div className="dateTitle">
		                    {key}
	                    </div>
	                    <div className="item">
		                    {dataMap[key].map((item,index)=>{
		                    	
			                    return <div className="itemBody">
			                    <div className="itemitem" key={key+"_"+index}>
				                    <img data-src={item.url} src={item.url} className=""/>
			                    </div>
				                    {item.name}
			                    </div>
		                    })}
		                    
	                    </div>
                    </div>
                })}
	            </div>
            </div>
        )
    }
}