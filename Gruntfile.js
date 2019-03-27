module.exports=function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.initConfig({
    config: {
      app: 'public',
      server: 'server',
      dist: 'dist'
    },
    babel: {
      options: {
        sourceMap: false,
        presets: ["env", "react"]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/reactjs',
          src: ['*.jsx'],
          dest: '<%= config.app %>/build',
          ext: '.js'
        }]
      }
    },
    watch: {
      scripts: {
        files: ['<%= config.app %>/reactjs/*.jsx'],
        tasks: ['babel']
      }
    },
    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '<%= config.app %>/styles',
          ext: '.css'
        }]
      }
    },
  });
  grunt.registerTask('build-script', ['babel']);
  grunt.registerTask('build', ['clean:dist','babel','sass:dist']);
  grunt.registerTask('default', ['build']);

};