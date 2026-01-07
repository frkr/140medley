test('s', function() {
  var data = { a: 1, b: 'hello' };
  s.set('test', data);
  var retrieved = s.get('test');
  deepEqual(retrieved, data, 'Data was stored and retrieved');
});
