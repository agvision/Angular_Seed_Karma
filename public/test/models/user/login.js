System.register(['angular2/testing', 'angular2/core', 'angular2/http', 'angular2/router', 'angular2/src/router/router', 'rxjs/Rx', '../../../app/services/http', '../../../app/models/user', '../../../app/components/app'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var testing_1, core_1, http_1, router_1, router_2, http_2, user_1, app_1;
    return {
        setters:[
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            },
            function (_1) {},
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            }],
        execute: function() {
            testing_1.describe('User Login', function () {
                testing_1.beforeEachProviders(function () { return [
                    http_1.Http,
                    http_1.HTTP_PROVIDERS,
                    router_1.RouteRegistry,
                    router_1.Location,
                    core_1.provide(router_1.Router, { useClass: router_2.RootRouter }),
                    core_1.provide(router_1.ROUTER_PRIMARY_COMPONENT, { useValue: app_1.AppComponent }),
                    user_1.User,
                    http_2.HttpService,
                ]; });
                testing_1.it('Should set auth token', testing_1.inject([user_1.User], function (user) {
                    var token = "h83hdks95gt7";
                    user.setAuthToken(token);
                    testing_1.expect(user.getAuthToken()).toBe(token);
                }));
                testing_1.it('Should require email', testing_1.injectAsync([user_1.User], function (user) {
                    return user.login()
                        .then(function (data) {
                        testing_1.expect("Login").toContain("errors");
                    })
                        .catch(function (errors) {
                        testing_1.expect(errors.has("requiredEmail")).toBeTruthy();
                    });
                }));
                testing_1.it('Should require password', testing_1.injectAsync([user_1.User], function (user) {
                    return user.login()
                        .then(function (data) {
                        testing_1.expect("Login").toContain("errors");
                    })
                        .catch(function (errors) {
                        testing_1.expect(errors.has("requiredPassword")).toBeTruthy();
                    });
                }));
                testing_1.it('Should require valid email', testing_1.injectAsync([user_1.User], function (user) {
                    user.email = "invalid_email";
                    return user.login()
                        .then(function (data) {
                        testing_1.expect("Login").toContain("errors");
                    })
                        .catch(function (errors) {
                        testing_1.expect(errors.has("invalidEmail")).toBeTruthy();
                    });
                }));
                testing_1.it('Should require valid credentials', testing_1.injectAsync([user_1.User], function (user) {
                    user.email = Math.random().toString() + "@email.com";
                    user.password = "123456";
                    return user.login()
                        .then(function (data) {
                        testing_1.expect("Login").toContain("errors");
                    })
                        .catch(function (errors) {
                        testing_1.expect(errors.has("invalidCredentials")).toBeTruthy();
                    });
                }));
                testing_1.it('Should successfully login', testing_1.injectAsync([user_1.User], function (user) {
                    user.email = "mihai@gmail.com";
                    user.password = "123456";
                    return user.login()
                        .then(function (data) {
                        testing_1.expect(data.token).toBeDefined();
                    })
                        .catch(function (errors) {
                        testing_1.expect("Login").toBe("successful");
                    });
                }));
            });
        }
    }
});
