test('B', function() {
  var i = 0;
  b(document, 'click', function() {
    i++;
  });
  var ev = document.createEvent('MouseEvents');
  ev.initEvent('click', true, true);
  document.dispatchEvent(ev);
  equal(i, 1, 'Event was triggered');
});
