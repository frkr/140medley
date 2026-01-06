//Licensed BSD - https://github.com/frkr/140medley
var d = function(
  a,                         // take a simple selector like "name", "#name", or ".name", and
  b                          // an optional context, and
){
  a = a.match(/^(\W)?(.*)/); // split the selector into name and symbol.
  return(
    (a[1] == '#' ? document : b || document) // use document for ID selectors
  )[
    "getElement" + (
      a[1]
        ? a[1] == "#"
          ? "ById"
          : "sByClassName"
        : "sByTagName"
    )
  ](
    a[2]
  )
}
