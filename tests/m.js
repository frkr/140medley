test("m() creates a DocumentFragment from HTML", function() {
	var frag = m('<div class="x">hello</div><span>y</span>');
	ok(frag && frag.nodeType === 11, 'is a fragment');
	ok(frag.childNodes.length === 2, 'contains two nodes');
	ok(frag.firstChild.className === 'x', 'first child has class x');
});
