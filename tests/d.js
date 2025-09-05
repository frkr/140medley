test("d - Select by ID", function() {
  var element = d("#test-id");
  ok(element, "Element found by ID");
  equal(element.id, "test-id", "Correct element selected by ID");
  equal(element.innerHTML, "ID Test", "Element has correct content");
});

test("d - Select by ID (context ignored for IDs)", function() {
  // Note: getElementById only exists on document, so context is effectively ignored for ID selectors
  var element = d("#inner-id");
  ok(element, "Element found by ID");
  equal(element.id, "inner-id", "Correct element selected by ID");
  equal(element.innerHTML, "Inner ID", "Element has correct content");
});

test("d - Select by class name", function() {
  var elements = d(".test-class");
  ok(elements, "Elements found by class");
  equal(elements.length, 3, "Correct number of elements with class");
  equal(elements[0].innerHTML, "Class Test 1", "First element has correct content");
  equal(elements[1].innerHTML, "Class Test 2", "Second element has correct content");
  equal(elements[2].innerHTML, "Class Test 3", "Third element has correct content");
});

test("d - Select by class name with context", function() {
  var context = document.getElementById("context");
  var elements = d(".inner-class", context);
  ok(elements, "Elements found by class within context");
  equal(elements.length, 2, "Correct number of elements with class in context");
  equal(elements[0].innerHTML, "Inner Class 1", "First element has correct content");
  equal(elements[1].innerHTML, "Inner Class 2", "Second element has correct content");
});

test("d - Select by tag name", function() {
  var elements = d("p");
  ok(elements, "Elements found by tag name");
  ok(elements.length >= 2, "Found paragraph elements");
  equal(elements[0].tagName.toLowerCase(), "p", "First element is a paragraph");
  equal(elements[1].tagName.toLowerCase(), "p", "Second element is a paragraph");
});

test("d - Select by tag name with context", function() {
  var context = document.getElementById("context");
  var elements = d("p", context);
  ok(elements, "Elements found by tag name within context");
  equal(elements.length, 1, "Found one paragraph in context");
  equal(elements[0].innerHTML, "Inner Paragraph", "Paragraph has correct content");
});

test("d - Edge cases", function() {
  // Test with non-existent ID
  var element = d("#non-existent");
  equal(element, null, "Returns null for non-existent ID");
  
  // Test with non-existent class
  var elements = d(".non-existent");
  ok(elements, "Returns HTMLCollection for non-existent class");
  equal(elements.length, 0, "Empty collection for non-existent class");
  
  // Test with non-existent tag
  var tags = d("nonexistent");
  ok(tags, "Returns HTMLCollection for non-existent tag");
  equal(tags.length, 0, "Empty collection for non-existent tag");
});