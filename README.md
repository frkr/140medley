# 140medley coffee [![Build Status](https://travis-ci.org/frkr/140medley.png)](https://travis-ci.org/frkr/140medley/)

> This is a **micro-framework** or a collection of small, helpful utilities for common javascript tasks.

## Download
* Production: [download][downloadmin]
* Developer: [download][download]

### Size
* Source:  8.6 kb
* Minified: 821 bytes
* gzipped: 504 bytes
* [see original][honza]

### Features
* templating - `t();`
* local storage - `s();`
* bind/unbind events - `b();`
* create DOM elements - `m();`
* DOM selector - `$();`
* Get cross-browser xhr - `j();`

## Usage

### Bind/Unbind events
```
var el = document.getElementyById('#container');
b(el, 'click', function() {
	console.log('clicked');
});
```

### DOM selector
```
$('div');
$('#name');
$('.name');
```

### Get cross browser xhr object
```
a = j();
```

### Create DOM element
```
var el = m('<h1>Hello</h1>');
document.body.appendChild(el);
```

### LocalStorage
```
s(placeholder,JSON);
```

### Templating
```
var hello = t("Hello, #{this.name || 'world'}!")

console.log( // => "Hello, Jed!"
	hello({name: "Jed"})
)
```

Inspired by [140bytes][bytes].

[bytes]: https://gist.github.com/962807
[honza]: https://github.com/honza/140medley
[download]: https://raw.github.com/frkr/140medley/master/dist/140medley.js
[downloadmin]: https://raw.github.com/frkr/140medley/master/dist/140medley.min.js
