var util = require('util');

var result = function () {
	Error.stackTraceLimit = 60;
	Error.apply(this, arguments);
	this.code = 0;
	this.message = "not initialized";
	this.isManaged_Flag = true;
};

util.inherits(result, Error);


result.prototype.startValidation = function () {
	this.validationStr = [];
};

result.prototype.attachStr = function (str) {
	if (!this.validationStr) {
		this.startValidation();
	}
	this.validationStr.push(str);
	return this;
};

result.prototype.headStr = function (str) {
	if (!this.validationStr) {
		this.startValidation();
	}
	this.validationStr.unshift(str);
	return this;
};

result.prototype.concat = function (strs) {
	if (!this.validationStr) {
		this.startValidation();
	}
	this.validationStr = this.validationStr.concat(strs);
	return this;
};

result.prototype.concatWith = function (strs) {
	if (!this.validationStr) {
		this.startValidation();
	}
	this.validationStr = strs.concat(this.validationStr);
	return this;
};

result.prototype.endValidation = function (delimiter) {
	if (!this.validationStr) {
		return null;
	}
	return this.validationStr.join(delimiter ? delimiter : '\n');
};

result.prototype.helper = function (code, msg) {
	this.setCode(code);
	this.setMsg(msg);
	// this.setData();
	// this.logErr();
	return this;
};

result.prototype.setCode = function (code) {
	this.code = code;
};

result.prototype.setMsg = function (msgStr) {
	this.message = msgStr;
};

result.prototype.logErr = function () {
	console.error("code:" + this.code + "  message:" + this.message);
};

result.prototype.notFound = function (str) {
	return this.initError(404, "未找到" + str);
};

result.prototype.code404 = function (str) {
	return this.notFound(str);
};

result.prototype.code403 = function (str) {
	return this.initError(403, str ? str : "用户未被授权访问该页面");
};

result.prototype.code401 = function () {
	return this.initError(401, "用户认证失败");
};

result.prototype.notReady = function (str) {
	return this.initError(400, "对象未准备好：" + str);
};

result.prototype.notAvailable = function (str) {
	return this.initError(400, "未找到指定对象或属性：" + str);
};

result.prototype.empty = function (str) {
	return this.initError(400, "指定对象属性为空：" + str);
};

result.prototype.notInit = function (str) {
	return this.initError(400, "对象未初始化： '" + str + "'");
};

result.prototype.initError = function (code, errMsg, extraData, statusCode) {
	this.helper(code, errMsg);
	if (extraData !== undefined) {
		this.extraData = extraData;
	}
	this.statusCode = statusCode;
	Error.captureStackTrace(this);
	return this;
};

result.prototype.error = function (errMsg, extraData, statusCode) {
	return this.initError(400, errMsg, extraData, statusCode);
};

result.prototype.msg = function (str) {
	return this.helper(399, str);
};

result.prototype.success = function (str, data) {
	this.helper(200, str == undefined ? "操作成功" : str);
	if (data != undefined) {
		this.setData(data);
	}
	this.statusCode = 200000;
	return this;
};

result.prototype.setData = function (data) {
	if (data != undefined) {
		this.data = data;
	} else {
		delete this.data;
	}
	return this;
};

result.prototype.ok = function () {
	return this.code < 400;
};

result.prototype.toObj = function (errFlag) {
	var _target = {};
	_target.code = this.code;
	_target.error = errFlag ? true : (this.code >= 400);
	_target.message = this.message;
	if (this.statusCode) {
		_target.statusCode = this.statusCode;
	}

	if (this.hasOwnProperty("data")) {
		_target.data = this.data;
	}
	if (this.hasOwnProperty("extraData")) {
		_target.extraData = this.extraData;
	}
	return _target;
};

result.prototype.toJSON = function () {
	var _target = this.toObj();
	return JSON.stringify(_target);
};

result.prototype.tryErr = function (err) {
	if (err instanceof Error) {
		throw err;
	}
};

result.prototype.checkNull = function (source, filedName) {
	for (var i = 0, ci; ci = filedName[i]; i++) {
		if (!source[ci]) {
			throw this.error("'" + ci + "' cannont be empty");
		}
	}
};

result.prototype.testArgs = function (source) {
	for (var i = 0, ci; ci = source[i]; i++) {
		if (ci.state == "rejected" && ci.hasOwnProperty("reason")) {
			this.tryErr(ci.reason);
		}
	}
};

result.prototype.oError = function (msg, extraData) {
	var _err = new Error(msg);
	_err.extraInfo = extraData;
	return _err;
};

result.prototype.dError = function (errMsg, statusCode, extraData) {
	return this.initError(200, errMsg, extraData, statusCode);
}

module.exports = result;