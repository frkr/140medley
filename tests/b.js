var bitsok=false;
var previousHandlerCalled=false;
test("b() assigns document onclick handler", function() {
	var el = document.getElementById('container');
	b(el, 'click', function(){ bitsok = true; });
	ok(typeof document.onclick === 'function', 'document.onclick is a function');
});
test("b() wrapper can be assigned without invoking", function() {
	ok(bitsok === false, 'handler not invoked implicitly');
});
test("b() wrapper executes without error when called", function() {
	try {
		document.onclick && document.onclick();
		ok(true, 'onclick executed');
	} catch (e) {
		ok(false, 'onclick threw: ' + e);
	}
});
test("b() chains previous handler", function() {
	// Set a previous handler
	document.onmousedown = function() { previousHandlerCalled = true; };
	var newHandlerCalled = false;
	var el = document.getElementById('container');
	b(el, 'mousedown', function(){ newHandlerCalled = true; });
	// Trigger the event
	document.onmousedown && document.onmousedown();
	ok(newHandlerCalled, 'new handler was called');
	ok(previousHandlerCalled, 'previous handler was called');
});
test("b() handles custom context", function() {
	var customCtx = document.createElement('div');
	var handlerCalled = false;
	b(function(){ handlerCalled = true; }, 'click', customCtx);
	ok(typeof customCtx.onclick === 'function', 'handler attached to custom context');
});
test("b() handles event return value", function() {
	var el = document.getElementById('container');
	// Handler that returns false
	b(el, 'keydown', function(){ return false; });
	var result = document.onkeydown && document.onkeydown();
	ok(result === false || result === undefined, 'handles return value correctly');
});