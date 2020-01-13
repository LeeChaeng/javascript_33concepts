//Object is non-primitive types (key: "value")
const object = {
  key: "value"
};

// All functions are objects.

// Primitive types
true instanceof Object; // false (Boolean)
null instanceof Object; // false (null)
undefined instanceof Object; // false (ndefined)
0 instanceof Object; // false (number)
"bar" instanceof Object; // false (string)

// Non-primitive types
const foo = function() {}; // (function)
foo instanceof Object; // true

//배열의 내용은 같지만 다른곳을 참조
"dog" === "dog"; // true
14 === 14; // true

[] === []; // false
(function() {} === function() {}); // false

//function
const foo = function(baz) {};
foo.name; // "foo"
foo.length; // 1
foo.bar = "baz";
foo.bar; // "baz"

//생성자
const Foo = function() {
  this.bar = "baz";
};
const qux = new Foo();
qux; // { bar: "baz" }
qux instanceof Foo; // true
qux instanceof Object; // true

Foo(); // undefined
window.bar; // "baz"

//Wrapper Object
String(1337); // "1337"
String(true); // "true"
String(null); // "null"
String(undefined); // "undefined"
String(); // ""
String("dog") === "dog"; // "true"
typeof String("dog"); // "string"

const pet = new String("dog");
typeof pet; // "object"
pet === "dog"; // false

//Auto Boxing
const pet = new String("dog");
pet.constructor === String; // true
String("dog").constructor === String; // true

const foo = "bar";
foo.length; // 3
foo === "bar"; // true

const foo = 42;
foo.bar = "baz"; // Assignment done on temporary wrapper object
foo.bar; // undefined

const foo = null;
foo.bar = "baz"; // Uncaught TypeError: Cannot set property 'bar' of null
