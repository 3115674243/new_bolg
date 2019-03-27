var Q = require('q');
var config = require('../config');
var Redis = require('./redisHelper')(config.RedisSettings);

function wrapper(preFix) {
  //preFix业务相关占位符，在set或get时作为前缀拼到key里面
  this.prefix = preFix || '';
};

wrapper.prototype.processKey = function (key) {
  // return (process.env.NODE_ENV||'development')+'_'+(this.prefix?(this.prefix+'_'):'')+key;
  return (this.prefix ? (this.prefix + '_') : '') + key;
};

wrapper.prototype.incr = function (key) {
  var _redis = Redis;
  var _key = this.processKey(key);
  return Q.fcall(function () {
    _redis.incr(_key);
  });
};

wrapper.prototype.keys = function (key) {
  var _redis = Redis;
  var _key = this.processKey(key);
  var deferred = new Q.defer();
  _redis.keys(_key, deferred.makeNodeResolver());
  return deferred.promise;
};

wrapper.prototype.set = function (key, value) {
  var _redis = Redis;
  var _key = this.processKey(key);
  var _value = typeof value === 'string' ? value : JSON.stringify(value);
  var deferred = new Q.defer();
  _redis.set_cb(_key, _value, deferred.makeNodeResolver());
  return deferred.promise;
};

wrapper.prototype.setex = function (key, value, ttl) {
  var _redis = Redis;
  var _key = this.processKey(key);
  var _value = typeof value === 'string' ? value : JSON.stringify(value);
  var deferred = new Q.defer();
  _redis.setex_cb(_key, _value, ttl, deferred.makeNodeResolver());
  return deferred.promise;
};

wrapper.prototype.setnx = function (key, value) {
  var _redis = Redis;
  var _key = this.processKey(key);
  var _value = typeof value === 'string' ? value : JSON.stringify(value);
  var deferred = new Q.defer();
  _redis.setnx_cb(_key, _value, deferred.makeNodeResolver());
  return deferred.promise;
};

wrapper.prototype.expire = function (key, ttl) {
  var _redis = Redis;
  var deferred = new Q.defer();
  _redis.expire(key, ttl, deferred.makeNodeResolver());
  return deferred.promise;
};

wrapper.prototype.setnxex = function (key, value, ttl) {
  var _redis = Redis
  var _key = this.processKey(key);
  var _value = typeof value === 'string' ? value : JSON.stringify(value);

  return _redis.setnx_promise(_key, _value).then(function (result) {
    if (result === 1) {
      return _redis.expire_promise(_key, ttl).then(function (result) {
        return result;
      })
    } else {
      return Q();
    }
  });
};

wrapper.prototype.get = function (key) {
  console.log(key);
  var _redis = Redis;
  var _key = this.processKey(key);
  var deferred = new Q.defer();
  _redis.get(_key, deferred.makeNodeResolver());
  return deferred.promise.then(function (data) {
    var _data;
    try {
      _data = JSON.parse(data);
    } catch (e) {
      _data = data;
    } finally {
      return _data;
    }
  }).catch(err=>{
    console.error(err);
  });
};

wrapper.prototype.get_cb = function (key, callback) {
  var _redis = Redis;
  var _key = this.processKey(key);
  _redis.get(_key, function (err, data) {
    var _data;
    try {
      _data = JSON.parse(data);
    } catch (e) {
      _data = data;
    } finally {
      callback(err, _data)
    }
  });
};

wrapper.prototype.del = function (key) {
  var _redis = Redis;
  var _key = this.processKey(key);
  var deferred = new Q.defer();
  _redis.del(_key, deferred.makeNodeResolver());
  return deferred.promise;
};

wrapper.prototype.touch = function (key, duration) {
  var _redis = Redis;
  var _key = this.processKey(key);
  var deferred = new Q.defer();
  _redis.expire(_key, duration, deferred.makeNodeResolver());
  return deferred.promise;
};

module.exports = wrapper;
