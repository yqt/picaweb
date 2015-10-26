module.exports = function(grunt) {

  var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    timeStamp: grunt.template.today('yyyymmdd'),

    /* config */
    config: {
      local: {
        options: {
          variables: grunt.file.readJSON('config/local.json')
        }
      },
      dist: {
        options: {
          variables: grunt.file.readJSON('config/dist.json')
        }
      }
    },

    /* connect */
    connect: {
      server: {
          options: {
            hostname: 'localhost',
            port: 8080,
            keepalive: false,
            livereload: true,
            base: ['src'],
            middleware: function (connect, options, defaultMiddleware) {
              return [proxySnippet].concat(defaultMiddleware);
            }
          },
          proxies: [
            {
              context: '/picaweb/api',
              host: 'sakura.coz.moe',
              port: 443,
              https: true,
              protocol: 'https:',
              headers: {
                'host': 'sakura.coz.moe',
              }
            }
          ]
      }
    },

    /* watch*/
    watch: {
      options: {
        livereload: true
      },
      local: {
        files: [
          'src/js/logic/*.js',
          'src/index.tpl',
          'src/css/*.css'
        ],
        tasks: ['concat'],
        options: {
          spawn: false
        },
      }
    },

    /* concat */
    concat: {
      options: {
        process: true
      },
      index: {
        src: ['src/index.tpl'],
        dest: '<%= grunt.config.get("indexDest") %>'
      }
    },

    /* uglify */
    uglify: {
      main: {
        options: {
          mangle: false
        },
        files: [
          {
            expand: true,
            cwd: 'src/js',
            src: '**/*.js',
            dest: '<%= grunt.config.get("dest") %>/static/<%= pkg.name %>/js'
          }
        ]
      }
    },

    /* cssmin */
    cssmin: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'src/css',
            src: ['*.css', '!*.min.css'],
            dest: '<%= grunt.config.get("dest") %>/static/<%= pkg.name %>/css',
          }
        ]
      }
    },

    /* copy */
    copy: {
      main: {
        files: [
          {
            expand: true,
            src: 'src/index.html',
            dest: '<%= grunt.config.get("dest") %>/template/<%= pkg.name %>/index.html'
          },
          {
            expand: true,
            cwd: 'src/',
            src: ['fonts/*'],
            dest: '<%= grunt.config.get("dest") %>/static/<%= pkg.name %>/'
          }
        ]
      }
    },

    /* clean */
    clean: {
      options: {
        force: true
      },
      dist: {
        src: ['dist/', 'dist.zip']
      },
      index: {
        src: ['src/index.html']
      }
    },

    /* compress */
    compress: {
      main: {
        options: {
          archive: '<%= grunt.config.get("dest") %>.zip'
        },
        files: [
          {
            expand: true,
            cwd: '<%= grunt.config.get("dest") %>',
            src: ['**'],
            dest: ''
          }
        ]
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-connect-proxy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-config');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Register task(s).
  grunt.registerTask('default', ['config:local', 'concat', 'configureProxies:server', 'connect:server', 'watch:local']);

  grunt.registerTask('release', ['clean', 'config:dist', 'concat', 'uglify', 'cssmin', 'copy', 'compress']);
};