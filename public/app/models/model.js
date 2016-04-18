System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Model;
    return {
        setters:[],
        execute: function() {
            Model = (function () {
                function Model() {
                }
                Model.prototype.buildParams = function (properties) {
                    var _this = this;
                    var params = new Map();
                    properties.forEach(function (value) {
                        params.set(value, _this[value]);
                    });
                    return params;
                };
                return Model;
            }());
            exports_1("Model", Model);
        }
    }
});
