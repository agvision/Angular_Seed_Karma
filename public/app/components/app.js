System.register(['angular2/core', 'angular2/router', '../models/user', './login/login', './register/register', './profile/profile'], function(exports_1, context_1) {
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
    var core_1, router_1, user_1, login_1, register_1, profile_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (register_1_1) {
                register_1 = register_1_1;
            },
            function (profile_1_1) {
                profile_1 = profile_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n    \t<nav>\n    \t\t<a [routerLink]=\"['Login']\">Login</a>\n    \t\t<a [routerLink]=\"['Register']\">Register</a>\n    \t\t<a [routerLink]=\"['Profile']\">Profile</a>\n    \t</nav>\n    \t<router-outlet></router-outlet>\n    ",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [user_1.User]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/register',
                            name: 'Register',
                            component: register_1.RegisterComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/login',
                            name: 'Login',
                            component: login_1.LoginComponent
                        },
                        {
                            path: '/profile',
                            name: 'Profile',
                            component: profile_1.ProfileComponent
                        },
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
