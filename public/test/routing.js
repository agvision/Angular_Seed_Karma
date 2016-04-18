System.register(['angular2/testing', 'angular2/core', 'angular2/http', 'angular2/router', 'angular2/src/router/router', '../app/components/app'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var testing_1, core_1, http_1, router_1, router_2, app_1;
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
            function (app_1_1) {
                app_1 = app_1_1;
            }],
        execute: function() {
            testing_1.describe('Routing', function () {
                var location;
                var router;
                testing_1.beforeEachProviders(function () { return [
                    http_1.HTTP_PROVIDERS,
                    router_1.RouteRegistry,
                    router_1.Location,
                    core_1.provide(router_1.Router, { useClass: router_2.RootRouter }),
                    core_1.provide(router_1.ROUTER_PRIMARY_COMPONENT, { useValue: app_1.AppComponent })
                ]; });
                testing_1.beforeEach(testing_1.inject([router_1.Router, router_1.Location], function (r, l) {
                    router = r;
                    location = l;
                }));
                testing_1.it('Should navigate to Login', function (done) {
                    router.navigate(['Login']).then(function () {
                        testing_1.expect(location.path()).toBe('/login');
                        done();
                    }).catch(function (e) { return done.fail(e); });
                });
                testing_1.it('Should navigate to Register', function (done) {
                    router.navigate(['Register']).then(function () {
                        testing_1.expect(location.path()).toBe('/register');
                        done();
                    }).catch(function (e) { return done.fail(e); });
                });
            });
        }
    }
});
