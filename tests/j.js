test("j - Create XMLHttpRequest", function() {
  var xhr = j();
  ok(xhr, "XMLHttpRequest object created");
  
  // Check if it's a valid XMLHttpRequest or ActiveXObject
  var isXHR = xhr instanceof XMLHttpRequest || 
              (typeof ActiveXObject !== "undefined" && xhr instanceof ActiveXObject);
  ok(isXHR, "Created object is XMLHttpRequest or ActiveXObject");
  
  // Test that we can use basic XHR methods
  ok(typeof xhr.open === "function", "Has open method");
  ok(typeof xhr.send === "function", "Has send method");
  ok(typeof xhr.setRequestHeader === "function", "Has setRequestHeader method");
});

test("j - Multiple calls return new instances", function() {
  var xhr1 = j();
  var xhr2 = j();
  
  ok(xhr1, "First XMLHttpRequest created");
  ok(xhr2, "Second XMLHttpRequest created");
  notEqual(xhr1, xhr2, "Each call returns a new instance");
});

test("j - Test ActiveXObject fallback simulation", function() {
  // This test is tricky because we can't easily mock ActiveXObject in modern browsers
  // But we can at least verify the function structure handles the loop correctly
  
  // Save original constructors
  var originalXHR = window.XMLHttpRequest;
  var originalActiveX = window.ActiveXObject;
  
  // Test when XMLHttpRequest is available (modern browsers)
  var xhr = j();
  ok(xhr, "Returns object when XMLHttpRequest is available");
  
  // Simulate IE environment where XMLHttpRequest might not exist
  if (typeof window.XMLHttpRequest !== "undefined") {
    window.XMLHttpRequest = undefined;
    
    // Mock ActiveXObject to test the fallback paths
    var callCount = 0;
    var failedVersions = [];
    window.ActiveXObject = function(version) {
      callCount++;
      
      // Simulate failures for first few attempts
      if (version === "Msxml2.XMLHTTP" || version === "Msxml3.XMLHTTP") {
        failedVersions.push(version);
        throw new Error("Not supported");
      }
      
      // Succeed for Microsoft.XMLHTTP
      if (version === "Microsoft.XMLHTTP") {
        this.open = function() {};
        this.send = function() {};
        this.setRequestHeader = function() {};
        return this;
      }
    };
    
    var xhrFallback = j();
    ok(xhrFallback, "Returns object using ActiveXObject fallback");
    equal(callCount, 3, "Tried all three ActiveXObject versions");
    ok(failedVersions.indexOf("Msxml2.XMLHTTP") > -1, "Tried Msxml2.XMLHTTP");
    ok(failedVersions.indexOf("Msxml3.XMLHTTP") > -1, "Tried Msxml3.XMLHTTP");
  }
  
  // Restore original constructors
  window.XMLHttpRequest = originalXHR;
  window.ActiveXObject = originalActiveX;
});

test("j - Handles all error cases", function() {
  // Save originals
  var originalXHR = window.XMLHttpRequest;
  var originalActiveX = window.ActiveXObject;
  
  // Test complete failure scenario
  window.XMLHttpRequest = undefined;
  window.ActiveXObject = function() {
    throw new Error("ActiveXObject not supported");
  };
  
  var result = j();
  equal(result, undefined, "Returns undefined when all methods fail");
  
  // Restore
  window.XMLHttpRequest = originalXHR;
  window.ActiveXObject = originalActiveX;
});