test("b() binds a click event", function(assert) {
    var done = assert.async();
    var el = document.getElementById('container');

    assert.ok(el, "The container element should exist.");

    b(el, 'click', function() {
        assert.ok(true, "click handler was executed");
        done();
    });

    // Only click if the element was found
    if (el) {
        el.click();
    } else {
        assert.ok(false, "Cannot run test because container element is missing.");
        done();
    }
});
