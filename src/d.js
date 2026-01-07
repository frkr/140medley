//Licensed BSD - https://github.com/frkr/140medley
var d = function(
  a,                         // take a simple selector like "name", "#name", or ".name", and
  b                          // an optional context, and
){
  return (b || document).querySelectorAll(a);
}
