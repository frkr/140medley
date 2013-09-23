module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    # meta options

    meta:
      banner: '// Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> - <%= pkg.homepage %>\n'

    # compile
    concat:
     options:
      separator: '\n\n'
     dist:
      options:
       banner: '<%= meta.banner %>'
      src: ['src/*.js']
      dest: 'dist/140medley.js'

    # minify the sourcecode
    uglify:
      options:
       banner: '<%= meta.banner %>'
       report: 'gzip'
       compress: true
      dist:
        files:
          'dist/140medley.min.js': ['dist/140medley.js']

    # watch for changes
    watch:
      scripts:
        files: ['src/*.js', 'tests/*.js', 'tests/*.html']
        tasks: ['concat','qunit']
        options:
          interrupt: true

    # simple node server
    connect:
      server:
        options:
          hostname: "0.0.0.0"

    # tests
    qunit:
      all: ['tests/**/*.html']

  # Load tasks
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-qunit'
  
  # Default task(s).
  grunt.registerTask 'default', ['connect','watch']
  grunt.registerTask 'test', ['qunit']
  grunt.registerTask 'build', ['concat','uglify','test']
  