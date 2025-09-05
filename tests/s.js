// Helper to clear localStorage for tests
QUnit.testStart(function() {
  if (window.localStorage) {
    localStorage.clear();
  }
});

test("s - Storage object exists", function() {
  ok(s, "Storage wrapper exists");
  ok(typeof s === "object", "s is an object");
});

test("s - Set and get string values", function() {
  if (s.set && s.get) {
    s.set("testKey", "testValue");
    equal(s.get("testKey"), "testValue", "String value stored and retrieved correctly");
    
    s.set("anotherKey", "another value with spaces");
    equal(s.get("anotherKey"), "another value with spaces", "String with spaces works");
  } else {
    ok(!window.localStorage || !window.JSON, "Storage methods not available (no localStorage or JSON support)");
  }
});

test("s - Set and get numeric values", function() {
  if (s.set && s.get) {
    s.set("number", 42);
    equal(s.get("number"), 42, "Number stored and retrieved correctly");
    strictEqual(s.get("number"), 42, "Number type preserved");
    
    s.set("float", 3.14159);
    equal(s.get("float"), 3.14159, "Float stored and retrieved correctly");
    
    s.set("zero", 0);
    equal(s.get("zero"), 0, "Zero stored and retrieved correctly");
    
    s.set("negative", -100);
    equal(s.get("negative"), -100, "Negative number stored and retrieved correctly");
  } else {
    ok(!window.localStorage || !window.JSON, "Storage methods not available");
  }
});

test("s - Set and get boolean values", function() {
  if (s.set && s.get) {
    s.set("boolTrue", true);
    equal(s.get("boolTrue"), true, "True boolean stored and retrieved correctly");
    strictEqual(s.get("boolTrue"), true, "Boolean type preserved for true");
    
    s.set("boolFalse", false);
    equal(s.get("boolFalse"), false, "False boolean stored and retrieved correctly");
    strictEqual(s.get("boolFalse"), false, "Boolean type preserved for false");
  } else {
    ok(!window.localStorage || !window.JSON, "Storage methods not available");
  }
});

test("s - Set and get object values", function() {
  if (s.set && s.get) {
    var obj = { name: "test", value: 123, nested: { prop: "value" } };
    s.set("object", obj);
    
    var retrieved = s.get("object");
    deepEqual(retrieved, obj, "Object stored and retrieved correctly");
    equal(retrieved.name, "test", "Object property accessible");
    equal(retrieved.nested.prop, "value", "Nested object property accessible");
  } else {
    ok(!window.localStorage || !window.JSON, "Storage methods not available");
  }
});

test("s - Set and get array values", function() {
  if (s.set && s.get) {
    var arr = [1, "two", { three: 3 }, [4, 5]];
    s.set("array", arr);
    
    var retrieved = s.get("array");
    deepEqual(retrieved, arr, "Array stored and retrieved correctly");
    equal(retrieved.length, 4, "Array length preserved");
    equal(retrieved[1], "two", "Array string element accessible");
    equal(retrieved[2].three, 3, "Array object element accessible");
    deepEqual(retrieved[3], [4, 5], "Nested array accessible");
  } else {
    ok(!window.localStorage || !window.JSON, "Storage methods not available");
  }
});

test("s - Get non-existent key", function() {
  if (s.get) {
    var result = s.get("nonExistentKey");
    equal(result, undefined, "Getting non-existent key returns undefined");
  } else {
    ok(!window.localStorage || !window.JSON, "Storage methods not available");
  }
});

test("s - Set null and undefined values", function() {
  if (s.set && s.get) {
    s.set("nullValue", null);
    strictEqual(s.get("nullValue"), null, "Null value stored and retrieved correctly");
    
    // Note: undefined cannot be stored in localStorage as JSON.stringify(undefined) returns undefined
    // This is expected behavior
  } else {
    ok(!window.localStorage || !window.JSON, "Storage methods not available");
  }
});

test("s - Overwrite existing values", function() {
  if (s.set && s.get) {
    s.set("overwrite", "initial");
    equal(s.get("overwrite"), "initial", "Initial value set");
    
    s.set("overwrite", "updated");
    equal(s.get("overwrite"), "updated", "Value overwritten successfully");
    
    s.set("overwrite", { new: "object" });
    deepEqual(s.get("overwrite"), { new: "object" }, "Value overwritten with different type");
  } else {
    ok(!window.localStorage || !window.JSON, "Storage methods not available");
  }
});

test("s - Empty key handling", function() {
  if (s.set && s.get) {
    s.set("", "emptyKey");
    equal(s.get(""), "emptyKey", "Empty string key works");
  } else {
    ok(!window.localStorage || !window.JSON, "Storage methods not available");
  }
});

test("s - Fallback when localStorage not available", function() {
  // Since 's' is already initialized, we'll just test its current state
  // and behavior based on what's available in the environment
  
  if (window.localStorage && window.JSON) {
    // Test normal behavior when both are available
    ok(s.get, "Get method exists when localStorage and JSON available");
    ok(s.set, "Set method exists when localStorage and JSON available");
    
    // Test that methods work
    s.set("fallbackTest", "testValue");
    equal(s.get("fallbackTest"), "testValue", "Storage methods work correctly");
    
    // Clean up
    localStorage.removeItem("fallbackTest");
  } else if (window.JSON && !window.localStorage) {
    // Test with in-memory storage fallback
    ok(s.get, "Get method exists with fallback storage");
    ok(s.set, "Set method exists with fallback storage");
  } else {
    // No JSON support
    deepEqual(s, {}, "Returns empty object when JSON not available");
  }
  
  // Test the initialization logic directly
  var testStorage = function(a,b){return b?{get:function(c){return a[c]&&b.parse(a[c])},set:function(c,d){a[c]=b.stringify(d)}}:{}}({}, JSON);
  ok(testStorage.get, "Storage wrapper with empty object works");
  ok(testStorage.set, "Storage wrapper with empty object works");
  
  var noJSONStorage = function(a,b){return b?{get:function(c){return a[c]&&b.parse(a[c])},set:function(c,d){a[c]=b.stringify(d)}}:{}}({}, undefined);
  deepEqual(noJSONStorage, {}, "Storage wrapper returns empty object without JSON");
});