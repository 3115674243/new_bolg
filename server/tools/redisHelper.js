var redis = require("redis");
var gconfig = require("../config").RedisSettings;
/*var constant = require('./constant');*/
// var bluebird = require("bluebird")
// bluebird.promisifyAll(redis.RedisClient.prototype);
// bluebird.promisifyAll(redis.Multi.prototype);

var self_config = {};

module.exports = function (mconfig) {
    if (mconfig) {
        return new RedisHelper(mconfig);
    }
    else {
        return new RedisHelper(gconfig);
    }
};

function RedisHelper(config) {
    self_config = config;
    // return initClient();
}

function initClient() {
    var client
    if (self_config.options) {
        client = redis.createClient(self_config.port, self_config.host, self_config.options);
    }
    else if (self_config.password) {
        client = redis.createClient(self_config.port, self_config.host, {password: self_config.password});
    }
    else {
        client = redis.createClient(self_config.port, self_config.host);
    }
    client.on('error', function (err) {
        console.log('Error ' + err);
    });
    return client
}

RedisHelper.prototype.incr = function (key) {
    var client = initClient();
    client.incr(key, function (err, item) {
        //callback(err, item);
        client.quit();
    })
};

RedisHelper.prototype.keys = function (key, callback) {
    var client = initClient();
    client.keys(key, function (err, items) {
        callback(null, items);
        client.quit();
    })
};

RedisHelper.prototype.set = function (key, value) {
    var client = initClient();
    client.set(key, value);
    //client.expire(key, config.RedisSettings.expires);
    client.quit();
};

RedisHelper.prototype.set_cb = function (key, value, callback) {
    var client = initClient();
    client.set(key, value, function (err, result) {
        callback(err, result);
        client.quit();
    });
    client.quit();
};

RedisHelper.prototype.setex = function (key, value, ttl) {
    var client = initClient();
    client.set(key, value);
    client.expire(key, ttl);
    client.quit();
};

RedisHelper.prototype.setex_cb = setex_cb = function (key, value, ttl, callback) {
    var client = initClient();
    client.setex(key, ttl, value, function (err, result) {
        callback(err, result);
        client.quit();
    });
};

RedisHelper.prototype.setex_promise = require("bluebird").promisify(setex_cb)

RedisHelper.prototype.setnx_cb = setnx_cb = function (key, value, callback) {
    var client = initClient();
    client.setnx(key, value, function (err, result) {
        callback(err, result);
        client.quit();
    });
};

RedisHelper.prototype.setnx_promise = require("bluebird").promisify(setnx_cb)


RedisHelper.prototype.get = get_cb = function (key, callback) {
    var client = initClient();
    client.get(key, function (err, value) {
        callback(err, value);
        client.quit();
    })
};

RedisHelper.prototype.get_promise = require("bluebird").promisify(get_cb)

RedisHelper.prototype.del = function (key, callback) {
    var client = initClient();
    client.del(key, function (err, reply) {
        callback(err, reply);
        client.quit();
    })
};

RedisHelper.prototype.expire = expire = function (key, ttl, callback) {
    var client = initClient();
    var _ttl = ttl || Expires;
    client.expire(key, ttl, function (err, result) {
        callback(err, result);
        client.quit();
    });
};

RedisHelper.prototype.expire_promise = require("bluebird").promisify(expire)


RedisHelper.prototype.lpush = function (key, value, callback) {
    var client = initClient();
    client.lpush(key, value, function (err, reply) {
        callback(err, reply);
        client.quit();
    });
};

RedisHelper.prototype.brpop = function (key, callback) {
    var client = initClient();
    client.brpop(key, 0, function (err, reply) {
        callback(err, reply);
        client.quit();
    });
};

RedisHelper.prototype.rpop = function (key, callback) {
    var client = initClient();
    client.rpop(key, function (err, reply) {
        callback(err, reply);
        client.quit();
    });
};