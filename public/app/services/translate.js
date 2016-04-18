System.register(['angular2/core', './http', 'angular2/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, http_2;
    var TranslateService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            }],
        execute: function() {
            TranslateService = (function () {
                function TranslateService(httpService, http) {
                    var _this = this;
                    this.httpService = httpService;
                    this.http = http;
                    this.strings = new Map();
                    this.loaded = new Set();
                    this.defaultLanguage = 'en';
                    this.getLanguage()
                        .then(function (language) { return _this.setLanguage(language); });
                }
                TranslateService.prototype.get = function (string, params) {
                    var value = this.strings.get(string);
                    return this.replaceParams(value, params);
                };
                TranslateService.prototype.load = function (path, prefix) {
                    var _this = this;
                    this.getLanguage()
                        .then(function (language) {
                        var resource = path + "_" + language;
                        if (!_this.loaded.has(resource)) {
                            _this.loadStrings(path, language, prefix);
                            _this.loaded.add(resource);
                        }
                    });
                };
                TranslateService.prototype.getLanguage = function () {
                    var _this = this;
                    var cachedLanguage = localStorage.getItem('language');
                    return new Promise(function (resolve, reject) {
                        if (cachedLanguage && cachedLanguage != 'undefined') {
                            resolve(cachedLanguage);
                        }
                        else {
                            _this.httpService.sendRequest("GET", "/language")
                                .then(function (data) { return resolve(data.language); })
                                .catch(function (errors) { return reject(errors); });
                        }
                    });
                };
                TranslateService.prototype.refreshLanguage = function () {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        _this.httpService.sendRequest("GET", "/language")
                            .then(function (data) {
                            _this.setLanguage(data.language);
                            resolve(data.language);
                        })
                            .catch(function (errors) { return reject(errors); });
                    });
                };
                TranslateService.prototype.setLanguage = function (language) {
                    localStorage.setItem('language', language);
                    this.loaded.clear();
                };
                TranslateService.prototype.loadStrings = function (path, language, prefix) {
                    var _this = this;
                    var filePath = path + "/" + language + ".json";
                    this.http.get(filePath).toPromise()
                        .then(function (file) {
                        _this.addStrings(file.json(), prefix);
                    })
                        .catch(function (error) { return _this.handleFileError(error, path, language, prefix); });
                };
                TranslateService.prototype.addStrings = function (strings, prefix) {
                    if (prefix === void 0) { prefix = ''; }
                    for (var key in strings) {
                        if (typeof strings[key] == 'object') {
                            this.addStrings(strings[key], prefix + '.' + key);
                        }
                        else {
                            this.strings.set(prefix + '.' + key, strings[key]);
                        }
                    }
                };
                TranslateService.prototype.replaceParams = function (input, params) {
                    if (!input)
                        return '';
                    var output = input;
                    for (var key in params) {
                        output = output.replace("{{" + key + "}}", params[key]);
                    }
                    return output;
                };
                TranslateService.prototype.handleFileError = function (error, path, language, prefix) {
                    if (error.status == 404 && language != this.defaultLanguage && language != 'undefined') {
                        return this.loadStrings(path, this.defaultLanguage, prefix);
                    }
                };
                TranslateService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.HttpService, http_2.Http])
                ], TranslateService);
                return TranslateService;
            }());
            exports_1("TranslateService", TranslateService);
        }
    }
});
