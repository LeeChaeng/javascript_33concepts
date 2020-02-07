let name = "John";

function sayHi() {
  alert("Hi, " + name);
}

name = "Pete";

sayHi(); // what will it show: "John" or "Pete"?

function sayHiBye(firstName, lastName) {
  // helper nested function to use below
  function getFullName() {
    return firstName + " " + lastName;
  }

  alert("Hello, " + getFullName());
  alert("Bye, " + getFullName());
}

// constructor function returns a new object
function User(name) {
  // the object method is created as a nested function
  this.sayHi = function() {
    alert(name);
  };
}

let user = new User("John");
user.sayHi(); // the method "sayHi" code has access to the outer "name"

function makeCounter() {
  let count = 0;
  return function() {
    return count++;
  };
}

let counter1 = makeCounter();
let counter2 = makeCounter();

alert(counter1()); // 0
alert(counter1()); // 1

alert(counter2()); // 0 (independent)

for (let i = 0; i < 10; i++) {
  // 각각의 루프가 자신의 어휘 환경을 가짐
  // {i: value}
}

alert(i); // Error, no such variable

{
  // do some job with local variables that should not be seen outside

  let message = "Hello";

  alert(message); // Hello
}

alert(message); // Error: message is not defined

(function() {
  let message = "Hello";

  alert(message); // Hello
})();

// syntax error because of parentheses below
// function go() {

// }(); // <-- can't call Function Declaration immediately

// IIFE 만드는 방법
(function() {
  alert("Parentheses around the function");
})();

(function() {
  alert("Parenthjeses around the whole thing");
})();

!(function() {
  alert("Bitwise NOT operator starts the expression");
})();

+(function() {
  alert("Unary plus starts the expression");
})();

function f() {
  let value = 123;
  function g() {
    alert(value);
  }

  return g;
}

let g = f(); // g는 f 내부의 value에 접근 가능하여 외부 어휘 환경을 메모리에 유지시킵니다.
