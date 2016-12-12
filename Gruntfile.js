module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            css: {
                src: [
                    'App/Assets/styles/nitrostyles.css'
                ],
                dest: 'app/combined.min.css'
            }
        },
        uglify: {
            options: {
                mangle: false,
                report: 'min',
            },
            js: {
                src: [
                         'App/app.js',
                         'App/components/loading.js',
                         'App/filters/searchFor.js',
                         'App/dataService/nitroCartDataService.js',
                         'App/home/homeController.js',
                         'App/home/header.js',
                         'App/home/searchsort.js',
                         'App/home/cartbody.js'
                ],
                dest: 'app/build.js'
            }
        },
        watch: {
            files: ['css/*', 'js/*'],
            tasks: ['cssmin', 'uglify']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['cssmin:css', 'uglify:js']);
};