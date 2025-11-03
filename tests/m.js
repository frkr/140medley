test("m() creates a DocumentFragment from HTML", function() {
	var frag = m('<div class="x">hello</div><span>y</span>');
	ok(frag && frag.nodeType === 11, 'is a fragment');
	ok(frag.childNodes.length === 2, 'contains two nodes');
	ok(frag.firstChild.className === 'x', 'first child has class x');
});
test("m() processes all child nodes", function() {
	var frag = m('<p>1</p><p>2</p><p>3</p>');
	ok(frag.childNodes.length === 3, 'all three nodes processed');
	ok(frag.firstChild.textContent === '1', 'first node correct');
});
test("m() handles single element", function() {
	var frag = m('<div>single</div>');
	ok(frag.nodeType === 11, 'returns fragment');
	ok(frag.childNodes.length === 1, 'contains one node');
});
test("m() handles complex HTML", function() {
	var frag = m('<ul><li>a</li><li>b</li></ul><div>test</div>');
	ok(frag.childNodes.length === 2, 'contains two top-level nodes');
	ok(frag.firstChild.tagName === 'UL', 'first is ul');
});
