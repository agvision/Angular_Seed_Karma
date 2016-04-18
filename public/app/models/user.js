System.register(['angular2/core', '../services/http', './model'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, model_1;
    var User;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (model_1_1) {
                model_1 = model_1_1;
            }],
        execute: function() {
            User = (function (_super) {
                __extends(User, _super);
                function User(httpService) {
                    _super.call(this);
                    this.httpService = httpService;
                    this.firstName = "";
                    this.lastName = "";
                    this.email = "";
                    this.password = "";
                }
                User.prototype.getAuthToken = function () {
                    return this.httpService.getAuthToken();
                };
                User.prototype.setAuthToken = function (token) {
                    this.httpService.setAuthToken(token);
                };
                User.prototype.register = function () {
                    var params = this.buildParams([
                        'firstName',
                        'lastName',
                        'email',
                        'password'
                    ]);
                    return this.httpService.sendRequest("POST", "/auth/register", params);
                };
                User.prototype.login = function () {
                    var params = this.buildParams([
                        'email',
                        'password'
                    ]);
                    return this.httpService.sendRequest("POST", "/auth/login", params);
                };
                User.prototype.getProfile = function () {
                    return this.httpService.sendAuthRequest("GET", "/user");
                };
                User = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.HttpService])
                ], User);
                return User;
            }(model_1.Model));
            exports_1("User", User);
        }
    }
});
