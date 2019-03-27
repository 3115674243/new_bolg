var base=require('../server/controllers/baseControllers');
var admin=require('../server/controllers/adminController');

function testFind(name) {
  User.findOne({uname:name}).then(function(rst){
    console.log(rst);
  });
}
testFind('root');