//Licensed BSD - https://github.com/frkr/140medley
var j = function(
  a // cursor placeholder
){
  for(                     // for all a
    a=0;                   // from 0
    a<4;                   // to 4,
    a++                    // incrementing
  ) try {                  // try
    return a               // returning
      ? new ActiveXObject( // a new ActiveXObject
          [                // reflecting
            ,              // (elided)
            "Msxml2",      // the various
            "Msxml3",      // working
            "Microsoft"    // options
          ][a] +           // for Microsoft implementations, and
          ".XMLHTTP"       // the appropriate suffix,
        )                  // but make sure to
      : new XMLHttpRequest // try the w3c standard first, and
  }

  catch(e){}               // ignore when it fails.
}