const globalVariable = "some value";

const hello = "Hello CSS-Tricks Reader!";

function sayHello() {
  console.log(hello);
}

console.log(hello); // 'Hello CSS-Tricks Reader!'
sayHello(); // 'Hello CSS-Tricks Reader!'

// Don't do this!
let thing = "something";
let thing = "something else"; // Error, thing has already decleared

// Don't do this!
var thing = "something";
var thing = "something else"; // perhaps somewhere totally different in your code
console.log(thing); // 'something else'

function sayHello() {
  const hello = "Hello CSS-Tricks Reader!";
  console.log(hello);
}

sayHello(); // 'Hello CSS-Tricks Reader!'
console.log(hello); // Error, hello is not defined

{
  const hello = "Hello CSS-Tricks Reader!";
  console.log(hello); // 'Hello CSS-Tricks Reader!'
}

console.log(hello); // Error, hello is not defined

// 이 코드의 결과는 아래의 코드와 같습니다.
sayHello();
function sayHello() {
  console.log("Hello CSS-Tricks Reader!");
}

// 이 코드의 결과는 위의 코드의 결과와 같습니다.
function sayHello() {
  console.log("Hello CSS-Tricks Reader!");
}
sayHello();

sayHello(); // Error, sayHello is not defined
const sayHello = function() {
  console.log("Hello CSS-Tricks Reader!");
};

function first() {
  const firstFunctionVariable = `I'm part of first`;
}

function second() {
  first();
  console.log(firstFunctionVariable); // Error, firstFunctionVariable is not defined
}
function outerFunction() {
  const outer = `I'm the outer function!`;

  function innerFunction() {
    const inner = `I'm the inner function!`;
    console.log(outer); // I'm the outer function!
  }

  console.log(inner); // Error, inner is not defined
}

function outerFunction() {
  const outer = `I see the outer variable!`;

  function innerFunction() {
    console.log(outer);
  }

  return innerFunction;
}

outerFunction()(); // I see the outer variable!

function just(x) {
  console.log("A console.log is a side effect!");
}

function prepareCake(flavor) {
  return function() {
    setTimeout(_ => console.log(`Made a ${flavor} cake!`), 1000);
  };
}

const makeCakeLater = prepareCake("banana!");

// and later in your code
makeCakeLater();
// Made a banana cake!

function secret(secretCode) {
  return {
    saySecretCode() {
      console.log(secretCode);
    }
  };
}

const theSecret = secret("CSS Tricks is amazing");
theSecret.saySecretCode();
// 'CSS Tricks is amazing'

function prepareCake(flavor) {
  // Adding debugger
  debugger;
  return function() {
    setTimeout(_ => console.log(`Made a ${flavor} cake!`), 1000);
  };
}

const makeCakeLater = prepareCake("banana");
