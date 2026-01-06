test('d selector', function() {
  var byId = d('#test-div');
  ok(byId, 'select by id');
  equal(byId.id, 'test-div', 'should be the correct element');

  var byClass = d('.test-class');
  ok(byClass, 'select by class');
  equal(byClass.length, 2, 'should select all elements with the class');

  var byTag = d('span');
  ok(byTag, 'select by tag');
  equal(byTag.length, 1, 'should select all span elements');

  var context = d('#qunit-fixture');
  var byTagWithContext = d('span', context);
  ok(byTagWithContext, 'select by tag with context');
  equal(byTagWithContext.length, 1, 'should select all span elements within the context');
});
