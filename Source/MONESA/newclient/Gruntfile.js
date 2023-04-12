const sass = require('node-sass');

module.exports = function(grunt) {
    grunt.initConfig({
		sass: {			
        dist: {
            options: {
                outputStyle: 'compressed',
                implementation: sass,
                sourceMap: true
            },
            files: [{
                'src/assets/css/main.min.css':              'src/assets/scss/main.scss', 	                        /* 'All main SCSS' */
                'src/assets/css/light.min.css':     'src/assets/scss/skins/default.scss',                   /* 'Theme SCSS to css path' */
                'src/assets/css/dark.min.css':         'src/assets/scss/skins/dark.scss',                      /* 'Theme SCSS to css path' */
				    }]
        }
    }});
    grunt.loadNpmTasks("grunt-sass");
    
    grunt.registerTask("buildcss", ["sass"]);
};
