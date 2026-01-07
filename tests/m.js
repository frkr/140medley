test('m dom creator', function(assert) {
  var el = m('<h1>Hello</h1>');
  assert.ok(el, 'element created');
  assert.equal(el.tagName, 'H1', 'should be an h1 element');
  assert.equal(el.innerHTML, 'Hello', 'should have the correct text');
});
