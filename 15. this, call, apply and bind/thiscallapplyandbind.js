// define a function
var myFunction = function() {
  console.log(this);
};

// call it
myFunction();

var myObject = {
  myMethod: function() {
    console.log(this);
  }
};

var myMethod = function() {
  console.log(this);
};

var myObject = {
  myMethod: myMethod
};

myObject.myMethod(); // this === myObject
myMethod(); // this === window

var myMethod = function() {
  console.log(this);
};

var myObject = {
  myMethod: myMethod
};

myMethod(); // this === window
//   myMethod.call(myObject, args1, args2, ...) // this === myObject
//   myMethod.apply(myObject, [array of args]) // this === myObject

myMethod = myMethod.bind(myObject);

myMethod(); // this === myObject

var myMethod = function() {
  console.log(this);
};

var obj1 = {
  a: 2
};

var obj2 = {
  a: 3
};

myMethod = myMethod.bind(obj1); // 2
myMethod.call(obj2); // 2 명시적 바인딩은 obj2이나, obj1로 하드바인딩 되어있음

function foo(a) {
  this.a = a;
}

var bar = new foo(2);
console.log(bar.a); // 2

function foo(something) {
  this.a = something;
}

var obj1 = {};

var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a); // 2

var baz = new bar(3);
console.log(obj1.a); // 2
console.log(baz.a); // 3

myObject = {
  myMethod: function() {
    helperObject.doSomethingCool("superCool", this.onSomethingCoolDone);
  },

  onSomethingCoolDone: function() {
    /// Only god knows what is "this" here
  }
};

myObject = {
  myMethod: function() {
    helperObject.doSomethingCool("superCool", this.onSomethingCoolDone, this);
  },

  onSomethingCoolDone: function() {
    /// Now everybody know that "this" === myObject
  }
};

//Demo with javascript .call()

var obj = { name: "Niladri" };

var greeting = function(a, b, c) {
  return "welcome " + this.name + " to " + a + " " + b + " in " + c;
};

console.log(greeting.call(obj, "Newtown", "KOLKATA", "WB"));
// returns output as welcome Niladri to Newtown KOLKATA in WB

//Demo with javascript .apply()

var obj = { name: "Niladri" };

var greeting = function(a, b, c) {
  return "welcome " + this.name + " to " + a + " " + b + " in " + c;
};

// array of arguments to the actual function
var args = ["Newtown", "KOLKATA", "WB"];
console.log("Output using .apply() below ");
console.log(greeting.apply(obj, args));

/* The output will be 
  Output using .apply() below
 welcome Niladri to Newtown KOLKATA in WB */

//Use .bind() javascript

var obj = { name: "Niladri" };

var greeting = function(a, b, c) {
  return "welcome " + this.name + " to " + a + " " + b + " in " + c;
};

//creates a bound function that has same body and parameters
var bound = greeting.bind(obj);

console.dir(bound); ///returns a function

console.log("Output using .bind() below ");

console.log(bound("Newtown", "KOLKATA", "WB")); //call the bound function

/* the output will be 
Output using .bind() below
welcome Niladri to Newtown KOLKATA in WB */
