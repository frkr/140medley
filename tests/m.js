test("m - Create DocumentFragment from simple HTML", function() {
  var html = '<div>Hello World</div>';
  var fragment = m(html);
  
  ok(fragment, "DocumentFragment created");
  ok(fragment instanceof DocumentFragment, "Result is a DocumentFragment");
  equal(fragment.childNodes.length, 1, "Fragment has one child");
  equal(fragment.firstChild.tagName.toLowerCase(), "div", "Child is a div element");
  equal(fragment.firstChild.innerHTML, "Hello World", "Content is correct");
});

test("m - Create DocumentFragment from multiple elements", function() {
  var html = '<div>First</div><span>Second</span><p>Third</p>';
  var fragment = m(html);
  
  ok(fragment, "DocumentFragment created");
  equal(fragment.childNodes.length, 3, "Fragment has three children");
  
  equal(fragment.childNodes[0].tagName.toLowerCase(), "div", "First child is div");
  equal(fragment.childNodes[0].innerHTML, "First", "First child content");
  
  equal(fragment.childNodes[1].tagName.toLowerCase(), "span", "Second child is span");
  equal(fragment.childNodes[1].innerHTML, "Second", "Second child content");
  
  equal(fragment.childNodes[2].tagName.toLowerCase(), "p", "Third child is p");
  equal(fragment.childNodes[2].innerHTML, "Third", "Third child content");
});

test("m - Create DocumentFragment with nested HTML", function() {
  var html = '<div><span>Nested</span><p>Content</p></div>';
  var fragment = m(html);
  
  ok(fragment, "DocumentFragment created");
  equal(fragment.childNodes.length, 1, "Fragment has one child");
  
  var div = fragment.firstChild;
  equal(div.childNodes.length, 2, "Div has two children");
  equal(div.childNodes[0].tagName.toLowerCase(), "span", "First nested child is span");
  equal(div.childNodes[0].innerHTML, "Nested", "Nested span content");
  equal(div.childNodes[1].tagName.toLowerCase(), "p", "Second nested child is p");
  equal(div.childNodes[1].innerHTML, "Content", "Nested p content");
});

test("m - Create DocumentFragment with text nodes", function() {
  var html = 'Plain text <span>with element</span> more text';
  var fragment = m(html);
  
  ok(fragment, "DocumentFragment created");
  equal(fragment.childNodes.length, 3, "Fragment has three nodes");
  equal(fragment.childNodes[0].nodeType, 3, "First node is text node");
  ok(fragment.childNodes[0].textContent.indexOf("Plain text") > -1, "First text node content");
  equal(fragment.childNodes[1].tagName.toLowerCase(), "span", "Second node is span");
  equal(fragment.childNodes[2].nodeType, 3, "Third node is text node");
});

test("m - Create DocumentFragment with attributes", function() {
  var html = '<div id="test" class="foo bar" data-value="123">Content</div>';
  var fragment = m(html);
  
  var div = fragment.firstChild;
  equal(div.id, "test", "ID attribute preserved");
  equal(div.className, "foo bar", "Class attribute preserved");
  equal(div.getAttribute("data-value"), "123", "Data attribute preserved");
});

test("m - Fragment can be appended to DOM", function() {
  var html = '<div>Test 1</div><div>Test 2</div>';
  var fragment = m(html);
  
  var container = document.getElementById("test-container");
  container.innerHTML = ""; // Clear container
  
  equal(fragment.childNodes.length, 2, "Fragment has two children before append");
  container.appendChild(fragment);
  
  equal(container.childNodes.length, 2, "Container has two children after append");
  equal(fragment.childNodes.length, 0, "Fragment is empty after append");
  equal(container.innerHTML, '<div>Test 1</div><div>Test 2</div>', "Content appended correctly");
  
  // Clean up
  container.innerHTML = "";
});

test("m - Empty HTML string", function() {
  var fragment = m("");
  
  ok(fragment, "DocumentFragment created for empty string");
  ok(fragment instanceof DocumentFragment, "Result is a DocumentFragment");
  equal(fragment.childNodes.length, 0, "Fragment has no children");
});

test("m - Complex HTML with scripts (scripts should not execute)", function() {
  var html = '<div>Before</div><script>window.testScriptRan = true;</script><div>After</div>';
  window.testScriptRan = false;
  
  var fragment = m(html);
  
  equal(fragment.childNodes.length, 3, "Fragment has three children");
  equal(window.testScriptRan, false, "Script did not execute during fragment creation");
  
  // Note: Scripts in innerHTML don't execute, which is the expected behavior
  delete window.testScriptRan;
});