System.register(['angular2/core', '../../models/user', '../../services/translate'], function(exports_1, context_1) {
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
    var core_1, user_1, translate_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (translate_1_1) {
                translate_1 = translate_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(user, ts) {
                    this.user = user;
                    this.ts = ts;
                    ts.load('app/components/login/strings', 'login');
                }
                LoginComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this.user.login()
                        .then(function (data) { return _this.onLoginSuccess(data); })
                        .catch(function (errors) { return _this.handleLoginErrors(errors); });
                };
                LoginComponent.prototype.onUserClick = function () {
                    var _this = this;
                    this.user.getProfile()
                        .then(function (data) { return _this.onGetProfileSuccess(data); })
                        .catch(function (errors) { return _this.handleGetProfileErrors(errors); });
                };
                LoginComponent.prototype.onLoginSuccess = function (data) {
                    console.log("Login Success");
                    if (data.token) {
                        this.saveAuthToken(data.token);
                    }
                };
                LoginComponent.prototype.onGetProfileSuccess = function (data) {
                    console.log(data);
                };
                LoginComponent.prototype.handleGetProfileErrors = function (errors) {
                    console.log(errors);
                };
                LoginComponent.prototype.saveAuthToken = function (token) {
                    this.user.setAuthToken(token);
                };
                LoginComponent.prototype.handleLoginErrors = function (errors) {
                    console.log(errors);
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'login',
                        templateUrl: 'app/components/login/login.html',
                        providers: [user_1.User]
                    }), 
                    __metadata('design:paramtypes', [user_1.User, translate_1.TranslateService])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
