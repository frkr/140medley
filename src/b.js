// Licensed BSD - https://github.com/frkr/140medley
var b = function(
  a, // a DOM element
  b, // an event name such as "click"
  c, // (placeholder)
  d  // (placeholder)
){
  c = a || document; // use the element or document by default
  d = c[             // save the current onevent　handler
    b = "on" + b     // prepent the event name with "on"
  ];
  a = c[b] =                 // cache and replace the current handler
    function(e) {            // with a function that
      d = d && d(            // executes/caches the previous handler
        e = e || c.event     // with a cross-browser object,
      );

      // Note: Original implementation had a bug here trying to call b(e)
      // Just return the result of previous handler
      return d
    };
  c = this; // cache the window to fetch IE events
  return a // return the handler function
};