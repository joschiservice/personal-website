const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .js('node_modules/cookieconsent/build/cookieconsent.min.js', 'public/js')
    .styles(['node_modules/cookieconsent/build/cookieconsent.min.css'], 'public/css/cookieconsent.min.css')
    .sass('resources/sass/app.scss', 'public/css');
