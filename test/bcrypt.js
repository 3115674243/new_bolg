var bcrypt = require('bcrypt-nodejs');

function creatBcr(text) {
  bcrypt.hash(text,null,null,function (err,hash) {
     if(err){
       console.log(err);
     }else {
       console.log(hash);
     }
  });
}
creatBcr('root');
function bcrHash(text,hash) {
  bcrypt.compare(text,hash,function (err,res) {
    if(err){
      console.log(err);
    }else {
      console.log(res);
    }
  });
}
bcrHash('root','$2a$10$Pb9UMgucWKKsweTCHdn6DOPd3MGDZ.C1H54tjPQ1Qw.gHwwrtTXbm');