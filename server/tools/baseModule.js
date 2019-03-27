var Q = require('q');
var _ = require('underscore');
var Rst = require('./rstModule');
function base() {
	this.rst = new Rst();
}
base.prototype.applyDataModel = function (DataModel) {
  if (!this.DataModel) {
    this.DataModel = DataModel;
  }
};
base.prototype.applyModel = function (model) {
 	this._model = model;
 	return this;
 };
base.prototype.testModel = function () {
  return this.hasOwnProperty("_model");
};

base.prototype.prepareModel = function (model) {
  if (!this.testModel()){
    this.applyModel(model);
  }
  console.log(this._model);
  return this;
};
/*
 按照给定的条件通过findOne查询model，
 返回deferred.promise
 */
base.prototype.findOne = function (criterion, fields) {
  var deferred = Q.defer();
  var _fields = _.extend({}, fields);
  this._model.findOne(criterion, _fields, deferred.makeNodeResolver());
  return deferred.promise;
};

module.exports = base;