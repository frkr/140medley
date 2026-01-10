test('t', function() {
  var template = t('Hello, #{name}!');
  var result = template(null, { name: 'world' });
  equal(result, 'Hello, world!', 'Template was rendered');
});
