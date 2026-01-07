test('d selector', function(assert) {
    var byId = d('#test-div');
    assert.ok(byId, 'select by id');
    assert.equal(byId.length, 1, 'should be the correct element');

    var byClass = d('.test-class');
    assert.ok(byClass, 'select by class');
    assert.equal(byClass.length, 2, 'should select all elements with the class');

    var byTag = d('span');
    assert.ok(byTag, 'select by tag');
    assert.equal(byTag.length, 1, 'should select all span elements');
});
