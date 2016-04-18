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
    var ProfileComponent;
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
            ProfileComponent = (function () {
                function ProfileComponent(user, ts) {
                    this.user = user;
                    this.ts = ts;
                    ts.load('app/components/profile/strings', 'profile');
                }
                ProfileComponent.prototype.onUserClick = function () {
                    var _this = this;
                    this.user.getProfile()
                        .then(function (data) { return _this.onGetProfileSuccess(data); })
                        .catch(function (errors) { return _this.handleGetProfileErrors(errors); });
                };
                ProfileComponent.prototype.onGetProfileSuccess = function (data) {
                    console.log(data);
                };
                ProfileComponent.prototype.handleGetProfileErrors = function (errors) {
                    console.log(errors);
                };
                ProfileComponent = __decorate([
                    core_1.Component({
                        selector: 'profile',
                        templateUrl: 'app/components/profile/profile.html',
                        providers: [user_1.User]
                    }), 
                    __metadata('design:paramtypes', [user_1.User, translate_1.TranslateService])
                ], ProfileComponent);
                return ProfileComponent;
            }());
            exports_1("ProfileComponent", ProfileComponent);
        }
    }
});
