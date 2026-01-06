var bitsok = false;
test("B create", function() {
    var el = document.getElementById('container');
    b(el, 'click', function() {
        bitsok = true;
    });
    el.click();
    ok(bitsok, "click");
});
