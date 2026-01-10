test('m', function() {
  var frag = m('<div><p>hello</p></div>');
  ok(frag.firstChild.tagName === 'DIV', 'Fragment created');
  ok(frag.firstChild.firstChild.tagName === 'P', 'Fragment is correct');
});
