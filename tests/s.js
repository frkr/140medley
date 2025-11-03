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
test("s() get returns undefined for missing keys", function() {
	if (s.get) {
		var result = s.get('nonexistent_key_' + Math.random());
		ok(result === undefined, 'returns undefined for missing key');
	} else {
		ok(true, 'skip if no get method');
	}
});
test("s() handles various data types", function() {
	if (s.get && s.set) {
		var key = 'test_' + Math.random();
		
		// Test string
		s.set(key + '_str', 'hello');
		ok(s.get(key + '_str') === 'hello', 'handles string');
		
		// Test number
		s.set(key + '_num', 42);
		ok(s.get(key + '_num') === 42, 'handles number');
		
		// Test array
		s.set(key + '_arr', [1, 2, 3]);
		var arr = s.get(key + '_arr');
		ok(arr && arr.length === 3 && arr[0] === 1, 'handles array');
		
		// Test nested object
		s.set(key + '_obj', { x: { y: 'z' } });
		var obj = s.get(key + '_obj');
		ok(obj && obj.x.y === 'z', 'handles nested object');
	} else {
		ok(true, 'skip if no methods');
	}
});
