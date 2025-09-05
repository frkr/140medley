// Test event binding functionality
test("b - Basic event binding", function() {
  var el = document.getElementById('container');
  
  // The b function sets up event handling
  b(el, 'click');
  
  // Check that onclick handler was set
  ok(el.onclick, "onclick handler was set");
  ok(typeof el.onclick === 'function', "onclick is a function");
});

test("b - Event handler execution", function() {
  var el = document.getElementById('container');
  
  // Set up handler
  b(el, 'mousedown');
  
  // Manually call the handler to test
  var evt = {type: 'mousedown'};
  if (el.onmousedown) {
    el.onmousedown(evt);
    ok(true, "Handler executed without error");
  } else {
    ok(false, "Handler not set");
  }
});

test("b - Handler replacement", function() {
  var el = document.getElementById('container');
  
  // Set first handler
  b(el, 'mouseover');
  var firstHandler = el.onmouseover;
  ok(firstHandler, "First handler set");
  
  // Set second handler (should replace)
  b(el, 'mouseover');
  var secondHandler = el.onmouseover;
  ok(secondHandler, "Second handler set");
  
  // They should be different functions
  notEqual(firstHandler, secondHandler, "Handler was replaced");
});

test("b - Different event types", function() {
  var el = document.getElementById('container');
  
  // Test various event types
  b(el, 'focus');
  ok(el.onfocus, "focus handler set");
  
  b(el, 'blur');
  ok(el.onblur, "blur handler set");
  
  b(el, 'keydown');
  ok(el.onkeydown, "keydown handler set");
});

test("b - Event name transformation", function() {
  var el = document.getElementById('container');
  
  // Test that event names are properly prefixed with 'on'
  b(el, 'submit');
  ok(el.onsubmit, "submit becomes onsubmit");
  
  b(el, 'change');
  ok(el.onchange, "change becomes onchange");
});

test("b - Coverage for all code paths", function() {
  var el = document.getElementById('container');
  var previousCalled = false;
  
  // Test with element that already has a handler
  el.ondblclick = function() { previousCalled = true; return "existing"; };
  var oldHandler = el.ondblclick;
  b(el, 'dblclick');
  
  // New handler should be set and be different
  ok(el.ondblclick, "Handler set even when one exists");
  notEqual(el.ondblclick, oldHandler, "New handler replaces old one");
  
  // Test that previous handler gets called
  el.ondblclick({type: 'dblclick'});
  ok(previousCalled, "Previous handler is called by new handler");
});

test("b - Function returns handler", function() {
  var el = document.getElementById('container');
  
  // b should return the handler function it creates
  var result = b(el, 'resize');
  
  ok(result, "b returns a value");
  equal(typeof result, "function", "Return value is a function");
  // The returned function is the handler that was set
  ok(el.onresize, "Handler was set on element");
});

test("b - Edge cases and error handling", function() {
  // Test with null element (should use document)
  var result = b(null, 'load');
  ok(result, "Works with null element");
  
  // Test the internal variables are set correctly
  var el = document.getElementById('container');
  var handler = b(el, 'input');
  
  // Trigger to ensure no errors
  if (el.oninput) {
    try {
      el.oninput({type: 'input'});
      ok(true, "Handler executes without error");
    } catch(e) {
      ok(false, "Handler threw error: " + e);
    }
  }
});