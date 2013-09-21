module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    # meta options

    meta:
      banner: '// Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> - <%= pkg.homepage %>'

    # compile
    coffee:
      compileBare:
       options:
        bare: true
       files:
        'dist/140medley.js': ['src/*.coffee']

    # minify the sourcecode
    uglify:
      options:
       banner: '<%= meta.banner %>'
       report: 'gzip'
       compress: true
      dist:
        files:
          'dist/140medley.min.js': ['dist/140medley.js']

    # check for optimisations and errors
    jshint:
      options:
        curly: true
        expr: true
        newcap: true
        quotmark: 'single'
        regexdash: true
        trailing: true
        undef: true
        unused: true
        maxerr: 100
        eqnull: true
        sub: false
        browser: true
        node: true
        globals:
          define: false
      dist:
        src: ['dist/140medley.js']

    # watch for changes
    watch:
      scripts:
        files: ['src/*.coffee']
        tasks: ['coffee']
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

    # release
    tagrelease:
      file: 'package.json'
      commit: true
      message: 'Release %version%'
      prefix: 'v'
      annotate: false


  # Load tasks
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-qunit'
  grunt.loadNpmTasks 'grunt-tagrelease'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  
  # Default task(s).
  grunt.registerTask 'default', ['connect','watch']
  grunt.registerTask 'test', ['jshint','qunit']
  grunt.registerTask 'build', ['coffee','uglify','test']
  