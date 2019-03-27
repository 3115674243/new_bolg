var Models = require("./schemaModule");
var util = require('util');
var modelBase = require("./base/baseModule");

/**
 * Base modules class
 */
function base() {
    modelBase.apply(this);
    this.applyDataModel(Models);
}
util.inherits(base,modelBase);

module.exports=base;