test("d() selects by tag, id, and class within context", function() {
	var fixture = document.getElementById('qunit-fixture');
	var container = document.createElement('div');
	fixture.appendChild(container);

	var a = document.createElement('div');
	var b = document.createElement('div');
	var c = document.createElement('span');
	a.className = 'c1';
	b.className = 'c1';
	c.id = 'uniq';
	container.appendChild(a);
	container.appendChild(b);
	container.appendChild(c);

	var tags = d('div', container);
	ok(tags && tags.length === 2, 'selected 2 div elements');

	var byId = d('#uniq', container);
	ok(byId === c, 'selected by id');

	var byClass = d('.c1', container);
	ok(byClass && byClass.length === 2, 'selected 2 by class');
});
test("d() selects without context (uses document)", function() {
	var fixture = document.getElementById('qunit-fixture');
	var testDiv = document.createElement('div');
	testDiv.id = 'testElement';
	fixture.appendChild(testDiv);

	var result = d('#testElement');
	ok(result === testDiv, 'selected element from document');

	var spans = d('span');
	ok(spans != null, 'selected spans from document');
});
test("d() handles all selector types", function() {
	var fixture = document.getElementById('qunit-fixture');
	
	// Test tag selector without symbol
	var div = document.createElement('div');
	fixture.appendChild(div);
	var tags = d('div', fixture);
	ok(tags && tags.length > 0, 'tag selector works');
	
	// Test ID selector with #
	div.id = 'myid';
	var byId = d('#myid', fixture);
	ok(byId === div, 'id selector works');
	
	// Test class selector with .
	div.className = 'myclass';
	var byClass = d('.myclass', fixture);
	ok(byClass && byClass.length > 0, 'class selector works');
});
