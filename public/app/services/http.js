System.register(['angular2/router', 'angular2/core', 'angular2/http'], function(exports_1, context_1) {
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
    var router_1, core_1, http_1;
    var HttpService;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            HttpService = (function () {
                function HttpService(http, router) {
                    this.http = http;
                    this.router = router;
                    this.requestURL = "http://localhost/agvision/Laravel_API/public/api";
                    this.tokenLifetimeLimit = 3600;
                    this.invalidTokenErrors = new Set([
                        'absentToken',
                        'invalidToken',
                        'expiredToken'
                    ]);
                }
                HttpService.prototype.sendAuthRequest = function (method, path, params) {
                    var _this = this;
                    if (params === void 0) { params = new Map(); }
                    params.set('token', this.getAuthToken());
                    return new Promise(function (resolve, reject) {
                        _this.sendRequest(method, path, params)
                            .then(function (data) {
                            _this.tryTokenRefresh();
                            resolve(data);
                        })
                            .catch(function (errors) { return reject(_this.handleInvalidTokenErrors(errors)); });
                    });
                };
                HttpService.prototype.sendRequest = function (method, path, params) {
                    if (params === void 0) { params = new Map(); }
                    switch (method) {
                        case "GET":
                            return this.get(path, params);
                        case "POST":
                            return this.post(path, params);
                        case "PUT":
                            return this.put(path, params);
                        case "DELETE":
                            return this.delete(path, params);
                    }
                };
                HttpService.prototype.getAuthToken = function () {
                    return localStorage.getItem('authToken');
                };
                HttpService.prototype.setAuthToken = function (token) {
                    localStorage.setItem('authTokenCreationTime', (new Date()).getTime().toString());
                    localStorage.setItem('authToken', token);
                };
                HttpService.prototype.getTokenLifetime = function () {
                    var tokenCreationTime = Number.parseInt(localStorage.getItem('authTokenCreationTime'));
                    var now = (new Date()).getTime();
                    return Math.abs((now - tokenCreationTime) / 1000);
                };
                HttpService.prototype.tryTokenRefresh = function () {
                    var _this = this;
                    var tokenLifetime = this.getTokenLifetime();
                    // check token lifetime
                    if (tokenLifetime > this.tokenLifetimeLimit) {
                        var params = new Map();
                        params.set('token', this.getAuthToken());
                        this.sendRequest("GET", '/auth/refresh-token', params)
                            .then(function (data) {
                            if (data.token) {
                                _this.setAuthToken(data.token);
                            }
                        })
                            .catch(function (errors) { return _this.handleInvalidTokenErrors(errors); });
                    }
                };
                HttpService.prototype.get = function (path, params) {
                    var _this = this;
                    var _a = this.getRequestDetails(path, params), url = _a.url, body = _a.body, options = _a.options;
                    return new Promise(function (resolve, reject) {
                        _this.http.get(url + "?" + body, options)
                            .toPromise()
                            .then(function (data) { return resolve(data.json().data); }, function (error) { return reject(new Set(error.json().errors)); });
                    });
                };
                HttpService.prototype.post = function (path, params) {
                    var _this = this;
                    var _a = this.getRequestDetails(path, params), url = _a.url, body = _a.body, options = _a.options;
                    return new Promise(function (resolve, reject) {
                        _this.http.post(url, body, options)
                            .toPromise()
                            .then(function (data) { return resolve(data.json().data); }, function (error) { return reject(new Set(error.json().errors)); });
                    });
                };
                HttpService.prototype.put = function (path, params) {
                    var _this = this;
                    var _a = this.getRequestDetails(path, params), url = _a.url, body = _a.body, options = _a.options;
                    return new Promise(function (resolve, reject) {
                        _this.http.put(url, body, options)
                            .toPromise()
                            .then(function (data) { return resolve(data.json().data); }, function (error) { return reject(new Set(error.json().errors)); });
                    });
                };
                HttpService.prototype.delete = function (path, params) {
                    var _this = this;
                    var _a = this.getRequestDetails(path, params), url = _a.url, body = _a.body, options = _a.options;
                    return new Promise(function (resolve, reject) {
                        _this.http.delete(url + "?" + body, options)
                            .toPromise()
                            .then(function (data) { return resolve(data.json().data); }, function (error) { return reject(new Set(error.json().errors)); });
                    });
                };
                HttpService.prototype.getRequestDetails = function (path, params) {
                    var url = this.getRequestURL(path);
                    var headers = new http_1.Headers({
                        'Content-Type': 'application/x-www-form-urlencoded'
                    });
                    var options = new http_1.RequestOptions({
                        headers: headers
                    });
                    var body = this.getRequestBody(params);
                    return { url: url, body: body, options: options };
                };
                HttpService.prototype.getRequestURL = function (path) {
                    return this.requestURL + path;
                };
                HttpService.prototype.getRequestBody = function (params) {
                    // TODO: Encode the values using encodeURIComponent().
                    var array = [];
                    var body;
                    params.forEach(function (value, key) {
                        array.push(key + "=" + value);
                    });
                    return array.join("&");
                };
                HttpService.prototype.handleInvalidTokenErrors = function (errors) {
                    var _this = this;
                    // convert Set to Array
                    var errorsArray = [];
                    errors.forEach(function (v) { return errorsArray.push(v); });
                    var invalidTokenErrors = new Set(errorsArray.filter(function (x) { return _this.invalidTokenErrors.has(x); }));
                    var otherErrors = new Set(errorsArray.filter(function (x) { return !invalidTokenErrors.has(x); }));
                    if (invalidTokenErrors.size > 0) {
                        // invalid tokens errors detected
                        this.setAuthToken("");
                        this.router.navigate(['Login']);
                    }
                    return otherErrors;
                };
                HttpService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.Router])
                ], HttpService);
                return HttpService;
            }());
            exports_1("HttpService", HttpService);
        }
    }
});
