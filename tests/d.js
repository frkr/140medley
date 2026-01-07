test('d', function() {
  var el;

  el = d('#test-div');
  ok(el.id === 'test-div', 'Select by ID');

  el = d('.test-class');
  ok(el.length === 2, 'Select by class name');

  el = d('span');
  ok(el.length === 3, 'Select by tag name');

  var context = document.getElementById('qunit-fixture');
  el = d('.test-class', context);
  ok(el.length === 2, 'Select by class name with context');
});
