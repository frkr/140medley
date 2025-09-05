test("t() compiles and evaluates interpolations with with-context and this", function() {
	var tpl = t('Hello #{x.name} #{y}', { y: 'world' });
	var out = tpl({ name: 'Alice' }, { y: 'there' });
	equal(out, 'Hello Alice there', 'uses provided with-context');
	var out2 = tpl({ name: 'Bob' });
	equal(out2, 'Hello Bob world', 'falls back to default context');
});
