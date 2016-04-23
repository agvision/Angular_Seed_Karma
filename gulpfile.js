var elixir = require('laravel-elixir');

elixir.config.sourcemaps = false;
elixir.config.registerWatcher("jsonmin",    "src/**/*.json");
elixir.config.registerWatcher("htmlmin",    "src/**/*.html");
elixir.config.registerWatcher("scss",       "src/app/**/*.scss");
elixir.config.registerWatcher("copy",       "src/assets/fonts/**/*");
elixir.config.registerWatcher("imagemin",   "src/assets/img/**/*");
elixir.config.registerWatcher("uglify",     "public/assets/js/app.js");

require("./elixir-tasks");

elixir(function(mix) {
    mix
        .copy([
            'node_modules/bootstrap/dist/fonts',
            'src/assets/fonts'
        ], 'public/assets/fonts')

        .scss([
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'src/app/**/*.scss'
        ], 'public/assets/css', 'app.css')

        .concat([
            // 'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',   
            'node_modules/angular2/bundles/angular2-polyfills.min.js',
            'node_modules/systemjs/dist/system.js',
            'node_modules/rxjs/bundles/Rx.min.js',
            // 'node_modules/es6-shim/es6-shim.min.js',
            'node_modules/angular2/bundles/angular2.dev.js',
            // 'node_modules/angular2/bundles/testing.dev.js',
            'node_modules/angular2/bundles/router.dev.js',
            'node_modules/angular2/bundles/http.dev.js',

            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
        ], 'public/assets/js', 'libs.js')

        .uglify('public/assets/js/app.js', 'public/assets/js')
        .htmlmin('src/**/*.html', 'public')
        .jsonmin('src/**/*.json', 'public')
        .imagemin('src/assets/img/**/*', 'public/assets/img');
});