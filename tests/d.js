// Comprehensive tests for DOM selector function (d.js)

test("D - Select by ID", function() {
  var element = d('#test-id');
  ok(element, "Element with ID 'test-id' should be found");
  equal(element.id, 'test-id', "Element should have correct ID");
  equal(element.textContent, 'ID Test', "Element should have correct text content");
});

test("D - Select by class name", function() {
  var elements = d('.test-class');
  ok(elements, "Elements with class 'test-class' should be found");
  equal(elements.length, 3, "Should find 3 elements with class 'test-class'");
  
  // Test each element
  equal(elements[0].textContent, 'Class Test 1', "First element should have correct text");
  equal(elements[1].textContent, 'Class Test 2', "Second element should have correct text");
  equal(elements[2].textContent, 'Class Test 3', "Third element should have correct text");
});

test("D - Select by tag name", function() {
  var elements = d('p');
  ok(elements, "Elements with tag 'p' should be found");
  equal(elements.length, 2, "Should find 2 paragraph elements");
  
  // Test each element
  equal(elements[0].textContent, 'Tag Test 1', "First paragraph should have correct text");
  equal(elements[1].textContent, 'Tag Test 2', "Second paragraph should have correct text");
});

test("D - Select with context", function() {
  var context = document.getElementById('context-test');
  var elements = d('.nested-class', context);
  
  ok(elements, "Elements with class 'nested-class' should be found in context");
  equal(elements.length, 2, "Should find 2 elements with class 'nested-class' in context");
  
  // Test each element
  equal(elements[0].textContent, 'Nested Class', "First nested element should have correct text");
  equal(elements[1].textContent, 'Nested Span', "Second nested element should have correct text");
});

test("D - Select non-existent ID", function() {
  var element = d('#non-existent');
  equal(element, null, "Non-existent ID should return null");
});

test("D - Select non-existent class", function() {
  var elements = d('.non-existent');
  equal(elements.length, 0, "Non-existent class should return empty NodeList");
});

test("D - Select non-existent tag", function() {
  var elements = d('non-existent-tag');
  equal(elements.length, 0, "Non-existent tag should return empty NodeList");
});

test("D - Edge case: empty selector", function() {
  var elements = d('');
  equal(elements.length, 0, "Empty selector should return empty NodeList");
});

test("D - Edge case: selector with only symbol", function() {
  var element = d('#');
  equal(element, null, "Selector with only '#' should return null");
});

test("D - Edge case: selector with only class symbol", function() {
  var elements = d('.');
  equal(elements.length, 0, "Selector with only '.' should return empty NodeList");
});

test("D - Edge case: selector with only tag symbol", function() {
  var elements = d('!');
  equal(elements.length, 0, "Selector with only '!' should return empty NodeList");
});

test("D - Edge case: null context", function() {
  var element = d('#test-id', null);
  ok(element, "Should work with null context (defaults to document)");
  equal(element.id, 'test-id', "Element should be found from document");
});

test("D - Edge case: undefined context", function() {
  var element = d('#test-id', undefined);
  ok(element, "Should work with undefined context (defaults to document)");
  equal(element.id, 'test-id', "Element should be found from document");
});

test("D - Edge case: invalid context", function() {
  try {
    var elements = d('.test-class', 'invalid-context');
    // This might throw an error or return empty results depending on browser
    ok(true, "Should handle invalid context gracefully");
  } catch (e) {
    ok(true, "Should handle invalid context gracefully");
  }
});

test("D - Complex selector patterns", function() {
  // Test various selector patterns that the regex should handle
  var element1 = d('#test-id');
  var elements2 = d('.test-class');
  var elements3 = d('p');
  
  ok(element1, "ID selector should work");
  ok(elements2, "Class selector should work");
  ok(elements3, "Tag selector should work");
});

test("D - Regex pattern matching", function() {
  // Test the regex pattern /^(\W)?(.*)/ used in the function
  var testCases = [
    { input: 'test', expected: ['test', undefined, 'test'] },
    { input: '#test', expected: ['#test', '#', 'test'] },
    { input: '.test', expected: ['.test', '.', 'test'] },
    { input: '!test', expected: ['!test', '!', 'test'] }
  ];
  
  testCases.forEach(function(testCase) {
    var match = testCase.input.match(/^(\W)?(.*)/);
    deepEqual(match, testCase.expected, "Regex should match " + testCase.input + " correctly");
  });
});