module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    # meta options
    # 'src/b.js'
    # 'src/d.js'
    # 'src/j.js'
    # 'src/m.js'
    # 'src/s.js'
    # 'src/t.js'

    meta:
      banner: '
/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n
 * <%= pkg.homepage %>\n
 *\n
 * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> <<%= pkg.author.email %>>;\n
 * Licensed under the <%= _.pluck(pkg.licenses, "type").join(", ") %> license */\n\n'

    # concat src files
    concat:
      options:
        separator: '\n\n'
      dist:
        options:
          banner: '<%= meta.banner %>'
        src: [
          'src/**.js']
        dest: 'dist/140medley.js'

    # minify the sourcecode
    uglify:
      options:
        banner: '<%= meta.banner %>'
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
        files: ['src/*.js','plugins/*.js']
        tasks: ['concat']
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


  # Default task(s).
  grunt.registerTask 'default', ['connect','watch']
  grunt.registerTask 'test', ['jshint','qunit']
  grunt.registerTask 'build', ['concat','uglify','test']