# 140medley [![Build Status](https://travis-ci.org/frkr/140medley.png)](https://travis-ci.org/frkr/140medley/)

> This is a **micro-framework** or a collection of small, helpful utilities for common javascript tasks.

## Download
* Production: [download][downloadmin]
* Developer: [download][download]

### Size
* Source: 5147 bytes.
* Minified: 825 bytes 
* Compressed: 241 bytes.
* [see original][honza]

### Features
* Bind/Unbind events - `b();`
* DOM selector - `d();`
* Get cross-browser xhr - `j();`
* Create DOM elements - `m();`
* Local storage - `s();`
* Templating - `t();`

## Usage

### Bind event
* a DOM Element
* b Event name

```
var el = document.getElementById('container');
b(el, 'click', function(e) {
	console.log('clicked');
});
```
> [More](https://gist.github.com/968186)

### DOM selector
```
d('div');
d('#name');
d('.name');
```
> [More](https://gist.github.com/991057)

### Get cross browser xhr object
```
a = j();
```
> [More](https://gist.github.com/993585)

### Create DOM element
```
var el = m('<h1>Hello</h1>');
document.body.appendChild(el);
```
> [More](https://gist.github.com/966233)

### LocalStorage
```
s(placeholder,JSON);
```
> [More](https://gist.github.com/966030)

### Templating
```
var hello = t("Hello, #{this.name || 'world'}!")

console.log( // => "Hello, Jed!"
	hello({name: "Jed"})
)
```
> [More](https://gist.github.com/964762)

---
---
Inspired by [140bytes][bytes].

[bytes]: https://gist.github.com/962807
[honza]: https://github.com/honza/140medley
[download]: https://raw.github.com/frkr/140medley/master/dist/140medley.js
[downloadmin]: https://raw.github.com/frkr/140medley/master/dist/140medley.min.js
