var bitsok=false;
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