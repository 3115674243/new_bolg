var Q = require('q');
var _ = require('underscore');
var Rst = require('./rstModule');
var moment = require('moment');

function base() {
    this.rst = new Rst();
}

base.prototype.applyDataModel = function (DataModel) {
    if (!this.DataModel) {
        this.DataModel = DataModel;
    }
};

base.prototype.ObjectId = function (value) {
    if (value !== undefined) {
        if (!this.DataModel.mongoose.Types.ObjectId.isValid(value)) {
            throw this.rst.error('ObjId参数“' + value + '”,格式不正确');
        }
        return this.DataModel.mongoose.Types.ObjectId(value);
    }
    return this.DataModel.mongoose.Types.ObjectId;
};

base.prototype.isValidObjId = function (value) {
    return this.ObjectId().isValid(value);
};

base.prototype.OidWrapper = function (value) {
    var _objId = this.ObjectId();
    if (value) {
        if (this.isValidObjId(value)) {
            return _objId(value);
        }
        throw this.rst.oError('convert value [' + value + '] to ObjectId failed', value);
    }
    return _objId();
};

base.prototype.applyModel = function (model) {
    if (this.DataModel && this.DataModel.hasOwnProperty(model)) {
        this._model = this.___model = this.DataModel[model];
        return this;
    }
    throw 'cannot find specific model ' + model;
};

base.prototype.testModel = function () {
    return this.hasOwnProperty("_model");
};

base.prototype.prepareModel = function (model) {
    if (!this.testModel()) this.applyModel(model);
    return this;
};

/*
 按照给定的条件通过find查询model，
 返回deferred.promise
 */
base.prototype.find = function (criterion, fields, sort) {
    var deferred = Q.defer();
    var _fields = _.extend({}, fields);
    var _criterion = criterion || {};
    if (!sort) {
        this._model.find(criterion, _fields, deferred.makeNodeResolver());
    } else {
        this._model.find(criterion, _fields).sort(sort).exec(deferred.makeNodeResolver());
    }
    return deferred.promise;
};

//注意，2个版本的find参数结构不一样
base.prototype.pro_find = function (criterion, sort, fields) {
    return this.find(criterion, fields, sort);
};

base.prototype.leanFind = function (criterion, fields, sort) {
    var deferred = Q.defer();
    var _fields = _.extend({}, fields);
    var _criterion = criterion || {};
    if (!sort) {
        this._model.find(criterion, _fields).lean().exec(deferred.makeNodeResolver());
    } else {
        this._model.find(criterion, _fields).sort(sort).lean().exec(deferred.makeNodeResolver());
    }
    return deferred.promise;
};


/*
 带skip和limit的查询
 */
base.prototype.limitFind = function (criterion, fields, sort, skip, limit) {
    var deferred = Q.defer();
    var _fields = _.extend({}, fields);
    var _sort = sort ? sort : {
        nosort: 1
    };
    var _skip = skip ? Number(skip) : 0;
    var _limit = limit ? Number(limit) : 0;
    this._model.find(criterion, _fields).sort(_sort).skip(_skip).limit(_limit).exec(deferred.makeNodeResolver());
    return deferred.promise;
};

//冗余，重复方法，大小写不一样
base.prototype.limitfind = function (criterion, fields, sort, skip, limit) {
    return this.limitFind(criterion, fields, sort, skip, limit);
};

//冗余，重复方法
base.prototype.pro_limitfind = function (criterion, fields, sort, skip, limit) {
    return this.limitFind(criterion, fields, sort, skip, limit);
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

base.prototype.pro_findone = function (criterion, fields) {
    return this.findOne(criterion, fields);
};

/*
 通过id查询model，
 返回deferred.promise
 */
base.prototype.findBy = function (id, fields) {
    var deferred = Q.defer();
    var _fields = _.extend({}, fields);
    this._model.findById(id, _fields, deferred.makeNodeResolver());
    return deferred.promise;
};

base.prototype.pro_findById = function (id, fields) {
    return this.findBy(id, fields);
};

// 通过给定的坐标点查找指定范围内的数据，type = Point
base.prototype.getGeoNearByPoint = function (coord, options) {
    var deferred = Q.defer();
    this._model.geoNear({ type: 'Point', coordinates: coord }, options, deferred.makeNodeResolver());
    return deferred.promise;
};


/*
 根据array生成以key为mapping属性的对象
 */
base.prototype.arrayMap = function (array, func, key) {
    var _rtv = {};
    array.forEach(function (single) {
        var _col = key ? key : '_id';
        var _key = single[_col];
        if (func) {
            func.apply(single);
        }
        delete single[_col];
        _rtv[_key] = single;
    });
    return _rtv;
};

base.prototype.pro_arrayMap = function (array, func, key) {
    return this.arrayMap(array, func, key);
};


/*
 返回查询结果，并按照key列进行mapping转换
 */
base.prototype.map = function (criterion, fields, func, key) {
    var that = this;
    return this.find(criterion, fields).then(function (docs) {
        return that.arrayMap(docs, func, key);
    });
};

base.prototype.pro_map = function (criterion, fields, func, key) {
    return this.map(criterion, fields, func, key);
};

/*
    populate
    返回一个promise
*/
base.prototype.populate = function (criterion, populateField, fields, sort) {
    var deferred = Q.defer();
    var _fields = _.extend({}, fields);
    if (!sort) {
        this._model.find(criterion, _fields).populate(populateField).exec(deferred.makeNodeResolver());
    } else {
        this._model.find(criterion, _fields).populate(populateField).sort(sort).exec(deferred.makeNodeResolver());
    }
    return deferred.promise;
};

//冗余方法
base.prototype.pro_populate = function (criterion, populateField, fields, sort) {
    return this.populate(criterion, populateField, fields, sort);
};

/*
    populate one
    返回一个promise
*/
base.prototype.populateOne = function (criterion, populateField, fields) {
    var deferred = Q.defer();
    var _fields = _.extend({}, fields);
    this._model.findOne(criterion, _fields).populate(populateField).exec(deferred.makeNodeResolver());
    return deferred.promise;
};

base.prototype.pro_populateOne = function (criterion, populateField, fields) {
    return this.populateOne(criterion, populateField, fields);
};



base.prototype.populates = function (criterion, fields, popFields, sort, skip, limit) {
    /*popFields的格式
        [
            ['keyField','popField1 popField2 popField3']
        ]
    */
    var deferred = Q.defer();
    var _fields = _.extend({}, fields);
    var _pops = popFields ? popFields : [];
    var _sort = _.extend({}, sort);
    var _skip = skip ? skip : 0;
    var _limit = limit ? limit : 0;
    var _finder = this._model.find(criterion, _fields);
    _pops.forEach(function (pop) {
        if (pop.length === 1) {
            _finder = _finder.populate(pop[0]);
        } else if (pop.length === 2) {
            _finder = _finder.populate(pop[0], pop[1]);
        }
    });
    _finder.sort(_sort).skip(_skip).limit(_limit).exec(deferred.makeNodeResolver());
    return deferred.promise;
};

base.prototype.pro_populates = function (criterion, fields, popFields, sort, skip, limit) {
    return this.populates(criterion, fields, popFields, sort, skip, limit);
};

/*
 通过给定的条件向model更新数据，
 返回deferred.promise
 */
base.prototype.update = function (criterion, data) {
    var deferred = Q.defer();
    this._model.update(criterion, data, {
        multi: true
    }, deferred.makeNodeResolver());
    return deferred.promise;
};

base.prototype.pro_updateData = function (criterion, data) {
    return this.update(criterion, data);
};

/*
 保存数据
 */
base.prototype.save = function (data) {
    if (!this._obj) {
        this.bind();
    }
    if (data) {
        _.extend(this._obj, data);
    }
    var deferred = Q.defer();
    this._obj.save(deferred.makeNodeResolver());
    return deferred.promise;
};

base.prototype.pro_save = function (data) {
    if (!this.___obj) {
        throw this.rst.notInit("current object has no data bound. Data cannot be saved");
    }
    if (data) {
        _.extend(this.___obj, data);
    }

    var deferred = Q.defer();
    this.___obj.save(deferred.makeNodeResolver());
    return deferred.promise;
};

//创建一条新数据
base.prototype.create = function (data) {
    if (!this._obj) {
        this.bind();
    }
    return this.save(data);
};

/*
 删除数据
 */
base.prototype.remove = function (data) {
    if (!(data instanceof this._model)) {
        throw 'current data is not an instance of model';
    }
    var deferred = Q.defer();
    data.remove(deferred.makeNodeResolver());
    return deferred.promise;
};


base.prototype.pro_remove = function (condition) {
    var that = this;
    return this.pro_find(condition).then(function (doc) {
        that.bind(doc);
        return that.pro_removeByInstance();
    });
};

base.prototype.pro_removeById = function (id) {
    return this.pro_remove({
        _id: id
    });
};

base.prototype.pro_removeByInstance = function () {
    if (!this.___obj || !this.___obj._id) {
        throw this.rst.notInit("current object has no valid data bound.");
    }
    var deferred = Q.defer();
    this.___obj.remove(deferred.makeNodeResolver());
    return deferred.promise;
};

///////////////////////////////

base.prototype.delete = function (criterion) {
    var deferred = Q.defer();
    this._model.remove(criterion, deferred.makeNodeResolver());
    return deferred.promise;
};

base.prototype.pro_delete = function (criterion) {
    return this.delete(criterion);
};

///////////////////////////////

base.prototype.findOneAndRemove = function (condition) {
    var deferred = Q.defer();
    this._model.findOneAndRemove(condition, deferred.makeNodeResolver());
    return deferred.promise;
};

////////////////////////////////
base.prototype.findOneAndUpdate = function (condition, updateData) {
    var deferred = Q.defer();
    this._model.findOneAndUpdate(condition, updateData, deferred.makeNodeResolver());
    return deferred.promise;
};

base.prototype.pro_findOneAndUpdate = function (criterion, data) {
    return this.findOneAndUpdate(criterion, data);
};

base.prototype.boundTest = function () {
    if (!this._obj) {
        return false;
    }
    return true;
};

base.prototype.bind = function (data) {
    if (data && data.toObject) {
        this._obj = this.___obj = data;
    } else if (this._model) {
        this._obj = this.___obj = new this._model();
        this._obj = this.___obj = _.extend(this._obj, data);
    } else {
        throw this.rst.error('unavailable model specified');
    }
    this.___biz = {};
    return this;
};

//search in DB and get matching data from it.
//then try to bind referenced object from the data returned.
//return a promise
base.prototype.pro_bind = function (criterion) {
    var that = this;
    return this.pro_findone(criterion).then(function (data) {
        return that.bind(data);
    });
};

base.prototype.distinct = function (field, condition) {
    if (!field instanceof String) {
        throw this.rst.error('param field must be a string');
    }
    var deferred = Q.defer();
    var _field = field;
    var _condition = _.extend({}, condition);
    this._model.distinct(_field, _condition).exec(deferred.makeNodeResolver());
    return deferred.promise;
};

///////////////////////////////////////////////
base.prototype.aggregate = function (array) {
    var deferred = new Q.defer();
    this._model.aggregate(array).exec(deferred.makeNodeResolver());
    return deferred.promise;
};

base.prototype.pro_aggregate = function (array) {
    return this.aggregate(array);
};

/////////////////////////////////////////////////


base.prototype.count = function (criterion) {
    var deferred = Q.defer();
    this._model.count(criterion, deferred.makeNodeResolver());
    return deferred.promise;
};

base.prototype.pro_count = function (criterion) {
    return this.count(criterion);
};

///////////////////////////////////////////////////

base.prototype.exists = function (criterion) {
    return this.count(criterion).then(function (count) {
        return count > 0 ? true : false;
    });
};

base.prototype.insertMany = function (array) {
    if (!array || !array instanceof Array || array.length === 0) {
        throw new Rst().error('must give an array');
    }
    var deferred = Q.defer();
    this._model.insertMany(array, deferred.makeNodeResolver());
    return deferred.promise.then(function (info) {
        return info;
    });
};


base.prototype.pro_insert = function (array) {
    var deferred = Q.defer();
    this.___model.insertMany(array).exec(deferred.makeNodeResolver());
    return deferred.promise.then(function (info) {
        return info;
    });
};


base.prototype.upSert = function (criterion, data) {
    var deferred = Q.defer();
    this._model.update(criterion, data, {
        upsert: true
    }, deferred.makeNodeResolver());
    return deferred.promise.then(function (info) {
        return info;
    });
};

base.prototype.pro_upSert = function (criterion, data) {
    return this.upSert(criterion, data);
};

base.prototype.get = function (key) {
    if (key === undefined) {
        return this._obj;
    }
    return this._obj[key];
};


base.prototype.getByEntityOrId = function (info) {
    if (!info) {
        throw this.rst.error('未传入查询参数');
    }
    if (info._id) {
        // this.bind(info);
        //传入的是一个实例
        return Q(info);
    }

    var that = this;
    //传入的是一个id
    return this.findBy(info).then(function (doc) {
        if (!doc) {
            throw that.rst.error('未找到指定id的对象:' + info);
        }
        // that.bind(doc);
        return doc.toObject();
    });
};


base.prototype.checkAndBind = function (info) {
    var that = this;
    if (info && info !== this.get()) {
        //传入task，重新绑定
        return this.getByEntityOrId(info).then(function (instance) {
            that.bind(instance);
            return that.get();
        });
    }
    //未传入
    if (!this.boundTest()) {
        //保证当前对象绑定了对象，否则报错
        throw this.rst.error('当前对象未绑定，无法继续');
    }
    return this.get();
};


base.prototype.formatPagingParams = function (pageSize, pageCount, defaultPageSize) {
    try {
        var _limit = pageSize ? parseInt(pageSize) : defaultPageSize;
        var _skip = (pageCount === undefined || _limit === undefined) ? 0 : Math.max(0, (parseInt(pageCount) - 1)) * _limit;
        return {
            limit: _limit,
            skip: _skip
        };
    } catch (err) {
        throw new Rst().error('pageSize或pageCount参数不正确');
    }
};

// start, end格式：“2017-05-01”
// 参数可以不传
base.prototype.getPeriod = function (start, end) {
    var _start = moment("20050101 0:00:00 000", "YYYYMMDD HH:mm:ss SSS");
    var _end = moment("21010101 23:59:59 999", "YYYYMMDD HH:mm:ss SSS");

    if (start) {
        _start = (start.isValid && start.isValid()) ? start : moment(start + " 0:00:00 000", "YYYYMMDD HH:mm:ss SSS");
    }
    if (end) {
        _end = (end.isValid && end.isValid()) ? end : moment(end + " 23:59:59 999", "YYYYMMDD HH:mm:ss SSS");
    }
    return {
        start: _start,
        end: _end
    };
};


/////////////////////////////////////////////////////////


//update database according to the change from the instance itself
//return a promise
base.prototype.pro_updateBySelf = function (att, data) {
    if (!this.___obj) {
        throw this.rst.notInit("current object has no data bound.");
    }
    if (this.___obj[att] == undefined) {
        throw this.rst.notAvailable(att);
    }
    var _crit = {};
    _crit[att] = this.___obj[att].toString();
    if (!data) {
        data = {};
        for (var i in this.___obj) {
            data[i] = this[i];
        }
    }
    return this.pro_updateData(_crit, data);
};



base.prototype.isBound = function () {
    return this.___obj ? true : false;
};



//bind object but keep the custom properties
base.prototype.bindWithBiz = function (data) {
    var _biz = this.___biz;
    this.bind(data);
    _.extend(this.___biz, _biz);
    return this;
};

//根据传入ID对对象进行数据绑定。
//如对象已经完成对传入ID的绑定，则不再绑定
//总是返回一个promise
base.prototype.pro_baseInitById = function (id) {
    var _obj = this.___obj;
    var _objId = _obj == undefined ? undefined : _obj._id;

    //检查ID状态
    if (_objId == undefined && id == undefined) {
        //对象未初始化且未给定ID
        throw this.rst.notInit("Neither the object data is bound nor the given id is ready");
    }
    if (_objId == id || id == undefined) {
        //两个ID相等，即同一个ID给了2次,无需继续绑定
        //2个id不相等，但参数ID未指定
        //直接返回this
        var that = this;
        var deferred = Q.defer();
        deferred.makeNodeResolver()(null, this);
        return deferred.promise;
    }
    //2个ID不相等，但指定了参数ID，即给出了新的模型ID或第一次指定ID
    //根据指定ID绑定数据
    return this.pro_bind({
        _id: id
    });
};

base.prototype.setBizValue = function (key, value) {
    if (key == undefined) {
        throw _rst.notAvailable("cannot set biz value to an empty field");
    }
    if (!this.___biz) {
        this.___biz = {};
    }
    this.___biz[key] = value;
    return this;
};

base.prototype.setDataValue = function (key, value) {
    if (key == undefined) {
        throw this.rst.notAvailable("cannot set obj value to an empty field");
    }
    if (!this.___obj) {
        this.___obj = {};
    }
    this.___obj[key] = value;
    return this;
};

base.prototype.extendBiz = function (extender) {
    if (!extender) {
        throw this.rst.empty("Biz extender");
    }
    _.extend(this.___biz, extender);
    return this;
};

base.prototype.extendObj = function (extender) {
    if (!extender) {
        throw this.rst.empty("Obj extender");
    }
    _.extend(this.___obj, extender);
    return this;
};

base.prototype.cloneFrom = function (obj) {
    this.___obj = obj.___obj;
    this.___biz = obj.___biz;
    return this;
};

base.prototype.getSelectedObjFields = function (listArray) {
    var _data = {};
    var that = (this.isBound != undefined && this.isBound()) ? this.getBizRef() : this;
    _.each(listArray, function (property) {
        var _propList = property.split(":");
        var _tagName = _propList[0];
        var _tagField = _propList[_propList.length - 1];
        var _properties = _tagField.split(">");
        var value = null;
        _.each(_properties, function (field) {
            if (field != "") {
                if (!value) {
                    value = that[field];
                } else {
                    value = value[field];
                }
            }
        });

        var _item = {};
        _item[_tagName] = value;
        _.extend(_data, _item);
    });
    return _data;
};

base.prototype.getBizRef = function () {
    if (!this.___obj) {
        throw this.rst.notInit("instance data has not been bound");
    }

    return _.extend({}, this.___obj.toObject ? this.___obj.toObject() : this.___obj, this.___biz);
};

base.prototype.getDataField = function (fieldName) {
    if (!this.___obj) {
        throw this.rst.empty("object need to be bound first");
    }
    return fieldName == undefined ? this.___obj : this.___obj[fieldName];
};

base.prototype.getBizField = function (fieldName) {
    if (!this.___biz) {
        throw this.rst.empty("object Biz need to be bound first");
    }
    return fieldName == undefined ? this.___biz : this.___biz[fieldName];
};

base.prototype.mapReduce = function (cmd) {
    var deferred = Q.defer();
    this._model.mapReduce(cmd, deferred.makeNodeResolver());
    return deferred.promise;
};


module.exports = base;