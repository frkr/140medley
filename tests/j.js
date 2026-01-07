test('j ajax', function(assert) {
  var xhr = j();
  assert.ok(xhr, 'xhr object created');
  assert.ok(typeof xhr.open === 'function', 'has open method');
  assert.ok(typeof xhr.send === 'function', 'has send method');
});
