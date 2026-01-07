// Licensed BSD - https://github.com/frkr/140medley
var b = function(
  a, // a DOM element
  b, // an event name such as "click"
  c  // a function to call on the event
){
  if (a.addEventListener) {
    a.addEventListener(b, c);
  } else {
    a.attachEvent('on' + b, c);
  }
};