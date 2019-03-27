var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;

passport.use('local',new LocalStrategy(
  function (username, password, done) {
    console.log('Trying to verify user, username:${username} password:${password}');
    if (username != 'root' || password != '123') {
      console.log('Failed to verify user, username:${username} password:${password}');
      return done(null, false, { message: 'Invalid username or password' });
    }
    return done(null, { "username": username, "password": password },{message:'Successfully authenticated!'});
  }
));

passport.serializeUser(function (user, done) {//保存user对象
  done(null, user);//可以通过数据库方式操作
});

passport.deserializeUser(function (user, done) {//删除user对象
  done(null, user);//可以通过数据库方式操作
});
exports.passport=passport;
exports.isLocalAuthenticated=function (req,res,next){
  passport.authenticate('local',function(err, user) {
    if (err)
      res.json(err);
    else
     res.json(user);
  })
};