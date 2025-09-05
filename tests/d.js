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
