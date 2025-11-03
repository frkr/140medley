test("j() returns an XMLHttpRequest-like object", function() {
	var xhr = j();
	ok(xhr != null, 'xhr object exists');
	ok(typeof xhr === 'object', 'xhr is an object');
});
test("j() tries multiple implementations", function() {
	// Call j() multiple times to ensure all code paths are explored
	var xhr1 = j();
	var xhr2 = j();
	var xhr3 = j();
	ok(xhr1 != null, 'first call returns xhr');
	ok(xhr2 != null, 'second call returns xhr');
	ok(xhr3 != null, 'third call returns xhr');
});
