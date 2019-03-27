module.exports={
  MongoSettings:{
    mongodb:'mongodb://127.0.0.1:27017/blog',
    options: {
      server: {
        socketOptions: { keepAlive: 1 },
        poolSize: 10
      },
      promiseLibrary: require('q').Promise
    }
  },
  RedisSettings:{
    host: "127.0.0.1",
    port: 6379,
    expires: 60 * 60
  },
  weiXInConfig:{
      appId:'wx46a14a41b0b86967',
      appsecret:'a3790a8f23e87970010e8e170a66e236',
  }
};