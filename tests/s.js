test('s local storage', function(assert) {
  var key = 'test-key';
  var value = { a: 1 };
  s(key, value);
  var storedValue = s(key);
  assert.deepEqual(storedValue, value, 'should store and retrieve the value');
});
