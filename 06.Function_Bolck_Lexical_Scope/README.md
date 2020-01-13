# 6. Function Scope, Block Scope and Lexical Scope

- 6th concept of 33

## 스코프(Scope)

- 자바스크립트에서 스코프는 어떤 변수에 접근 할 수 있는지를 정의한다.
- 일반적으로 전역 스코프와 지역 스코프가 존재한다.

### 전역 스코프(Global Scope)

- 변수가 모든 함수에 속하지 않고 `{}` 괄호 안에 들어있지도 않다면 그 변수를 전역 변수라고 한다.
- Node.js에서의 전역 변수 선언은 약간 다르다.

```js
const globalVariable = "some value";

const hello = "Hello CSS-Tricks Reader!";

function sayHello() {
  console.log(hello);
}

console.log(hello); // 'Hello CSS-Tricks Reader!'
sayHello(); // 'Hello CSS-Tricks Reader!'
```

- 전역변수를 선언하면 함수 내부에서도 불러서 쓸 수 있다.
- 전역 변수 선언을 할 수 있더라도 전역 변수 선언을 하지 않는 것을 권장한다.
- 네이밍 충돌(naming collisions)이 발생할 확률이 있다.

```js
// Don't do this!
let thing = "something";
let thing = "something else"; // Error, thing has already decleared
```

- `const` 혹은 `let` 키워드로 변수를 선언한다면 에러가 난다.

```js
// Don't do this!
var thing = "something";
var thing = "something else"; // perhaps somewhere totally different in your code
console.log(thing); // 'something else'
```

- `var` 키워드로 변수 선언을 한다면 두 번째 변수가 첫 번째 변수를 덮어쓴다.

전역변수 사용을 자제하며 지역 변수 사용을 지향하자.

### 지역 스코프(Local Scope)

- 자바스크립트는 두 가지의 지역 변수가 있다.

1. 함수 스코프 지역 변수
2. 블록 스코프 지역 변수

### 함수 스코프(Function Scope)

```js
function sayHello() {
  const hello = "Hello CSS-Tricks Reader!";
  console.log(hello);
}

sayHello(); // 'Hello CSS-Tricks Reader!'
console.log(hello); // Error, hello is not defined
```

- 함수 내에서 변수를 선언하면 함수 안에서만 변수에 접근 할 수 있다.
- 함수 밖으로 나오게 되면 내부에 있는 변수에 접근 할 수 없다.

### 블록 스코프(Block Scope)

```js
{
  const hello = "Hello CSS-Tricks Reader!";
  console.log(hello); // 'Hello CSS-Tricks Reader!'
}

console.log(hello); // Error, hello is not defined
```

- 변수를 `{}` 괄호 안에 `const`나 `let`키워드로 선언했을 때, 우리는 `{}` 괄호 안에서만 변수에 접근 할 수 있다.
- 블록 스코프는 함수 스코프의 부분집합이다.(블록 스코프 ⊂ 함수 스코프)
- 화살표 함수로 즉시 리턴하면 `{}` 없이 함수를 만들 수도 있다.

### 함수 호이스팅과 스코프

```js
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
```

- `function` 키워드와 함께 선언된 함수들은 항상 현재 스코프의 가장 위로 호이스팅 된다.

```js
sayHello(); // Error, sayHello is not defined
const sayHello = function() {
  console.log("Hello CSS-Tricks Reader!");
};
```

- 함수 표현식으로 작성된 함수는 현재 스코프의 가장 위로 **호이스팅 되지 않습니다.**
- 이 때문에 함수 호이스팅은 헷갈릴 수 있다. 항상 함수는 사용 전에 미리 선언하자.

### 함수는 각자의 스코프에 접근 할 수 없다.

- 함수는 다른 함수의 스코프에 접근할 권한을 갖고 있지 않다.
- 함수 내에서 다른 함수를 불러오더라도 스코프는 사용할 수 없다.

```js
function first() {
  const firstFunctionVariable = `I'm part of first`;
}

function second() {
  first();
  console.log(firstFunctionVariable); // Error, firstFunctionVariable is not defined
}
```

- `second`는 `firstFunctionVaiable`에 접근할 권한이 없다.

### 내부 스코프(Nested Scope)

- 함수가 다른 함수 안에서 만들어졌고 안쪽 함수(inner function)는 바깥 함수(outer function)의 변수에 접근 가능하다.
- 이러한 것을 어휘적 스코프(lexical scoping)이라고 한다.

```js
function outerFunction() {
  const outer = `I'm the outer function!`;

  function innerFunction() {
    const inner = `I'm the inner function!`;
    console.log(outer); // I'm the outer function!
  }

  console.log(inner); // Error, inner is not defined
}
```

- 바깥 함수에게는 안쪽 함수의 변수에 접근할 권한이 주어지지 않는다.

### 클로져(Closures)

- 함수 안에서 또 다른 함수를 만들 때마다 사실 클로져를 만든 것이다.
- 안쪽 함수가 **클로져**이다.
- 반환된 클로져를 이용하여 바깥 함수의 변수들을 사용할 수 있다.

```js
function outerFunction() {
  const outer = `I see the outer variable!`;

  function innerFunction() {
    console.log(outer);
  }

  return innerFunction;
}

outerFunction()(); // I see the outer variable!
```

- 클로져는 바깥 함수의 변수에 접근할 수 있기 때문에 주로 두가지 이유로 쓰인다.

1. 사이드 이펙트(side effects)를 제어하기 위해
2. private 변수를 만들기 위해서

**_사이드 이펙트란 어떤 함수 내에서 자신의 스코프가 아닌 변수들을 제어하는 것을 말한다._**

### 클로져로 사이드 이펙트 제어하기

- 함수에서 값을 반환하는 것과는 별도의 무언가를 하는 경우 사이드 이펙트가 발생할 수 있다.
- `Ajax`요청, `timeout`, 심지어 `console.log`문까지 많은 것들이 사이드 이펙트를 유발할 수 있다.

```js
function (x) {
    console.log('A console.log is a side effect!');
}
```

- 사이드 이펙트를 제어하기 위해 클로져를 사용할 때, `Ajax`나 `timeout`과 같은 코드를 망칠 수 있는 것을 고려해야한다.

```js
function prepareCake(flavor) {
  return function() {
    setTimeout(_ => console.log(`Made a ${flavor} cake!`), 1000);
  };
}

const makeCakeLater = prepareCake("banana!");

// and later in your code
makeCakeLater();
// Made a banana cake!
```

`prepareCake` 내부에 `makeCake` 클로져를 반환 할 수 있다.

### 클로져로 private 변수 만들기

**_private 변수란, 외부에서 접근 할 수 없고 내부에서만 사용되는 변수를 말한다._**

```js
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
```

- `saySecretCode`는 유일하게 기존 `secret`함수 밖에서 `secretCode`를 노출하는 함수이다.
- 이 함수는 `privileged function`이라 불린다.

### 개발자 도구로 스코프 디버깅하기

1. 자바스크립트 코드 내부에 `debugger`라는 키워드를 추가해준다.

- 브라우저에서 자바스크립트 실행을 정지하고 디버그 할 수 있게 도와준다.

```js
function prepareCake(flavor) {
  // Adding debugger
  debugger;
  return function() {
    setTimeout(_ => console.log(`Made a ${flavor} cake!`), 1000);
  };
}

const makeCakeLater = prepareCake("banana");
```

2. 코드에 브레이크 포인트를 직접 추가하기

- `sources`탭을 클릭하고 `line`의 번호를 클릭하면 브레이크 포인트 추가가 가능하다.
