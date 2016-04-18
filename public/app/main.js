System.register(['angular2/platform/browser', './components/app', 'angular2/router', 'angular2/http', './services/http', './services/translate', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, app_1, router_1, http_1, http_2, translate_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (translate_1_1) {
                translate_1 = translate_1_1;
            },
            function (_1) {}],
        execute: function() {
            browser_1.bootstrap(app_1.AppComponent, [router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS, http_2.HttpService, translate_1.TranslateService]);
        }
    }
});
