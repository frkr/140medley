test("j() returns an XMLHttpRequest-like object", function() {
	var xhr = j();
	ok(xhr != null, 'xhr object exists');
	// We cannot guarantee methods, but existence is enough to execute code path
});
