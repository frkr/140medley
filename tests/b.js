test('B', function() {
  var i = 0;
  var handler = function() { i++; };

  b(handler, 'click');

  document.onclick({/* mock event */});

  equal(i, 1, 'Event handler was called');
});
