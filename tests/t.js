test('t templating', function(assert) {
  var template = t('Hello, #{this.name}!');
  var result = template({ name: 'World' });
  assert.equal(result, 'Hello, World!', 'should correctly interpolate the template');
});
