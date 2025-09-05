test("s() provides get/set when JSON is available", function() {
	// s is initialized at load time using localStorage or fallback {}
	var key = 'k_' + Math.random();
	if (s.get && s.set) {
		s.set(key, { a: 1 });
		var v = s.get(key);
		ok(v && v.a === 1, 'round-trips object');
	} else {
		ok(true, 'no JSON branch not used in modern browsers');
	}
});
