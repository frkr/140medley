test("t() compiles and evaluates interpolations with with-context and this", function() {
	var tpl = t('Hello #{x.name} #{y}', { y: 'world' });
	var out = tpl({ name: 'Alice' }, { y: 'there' });
	equal(out, 'Hello Alice there', 'uses provided with-context');
	var out2 = tpl({ name: 'Bob' });
	equal(out2, 'Hello Bob world', 'falls back to default context');
});
test("t() handles empty context", function() {
	var tpl = t('Value: #{z}');
	var out = tpl({}, { z: 'test' });
	equal(out, 'Value: test', 'uses runtime context when no default');
});
test("t() handles multiple interpolations", function() {
	var tpl = t('#{a} #{b} #{c}', { a: '1', b: '2', c: '3' });
	var out = tpl({});
	equal(out, '1 2 3', 'replaces all interpolations');
});
test("t() handles this context", function() {
	var tpl = t('Name: #{this.name}');
	var out = tpl.call({ name: 'Test' }, { name: 'Test' });
	equal(out, 'Name: Test', 'accesses this context');
});
test("t() without default context", function() {
	var tpl = t('X: #{x}');
	var out = tpl({}, { x: 'value' });
	equal(out, 'X: value', 'works without default context');
});
test("t() handles expressions", function() {
	var tpl = t('Sum: #{1 + 1}');
	var out = tpl({});
	equal(out, 'Sum: 2', 'evaluates expressions');
});
