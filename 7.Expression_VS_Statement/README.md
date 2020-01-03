# 7. Expression vs Statement

- 7th concept of 33

자바스크립트에는 대표적인 2가지 문법적 카테고리가 있다.

1. Statements(문장)
2. Expressions(표현식)

- 표현식(Expression)은 문장(Statement)처럼 동작할 수 있기 때문에 이 둘을 구분하는 것은 중요하다.
- 하지만 문장(Statement)은 표현식(Expression)처럼 동작할 수 없다.

## 표현식(Expressions)

- `value`를 return하는 것은 `Expression`

### 표현식은 값을 만들어낸다.

- 표현식은 값 하나로 귀결되는 자바스크립트 코드 조각(snippet)이다. 표현식은 우리가 원하는 만큼 길어질 수 있지만 언제나 동일한 값이 나오지는 않는다.

```js
2 + (2 * 3) / 2(Math.random() * (100 - 20)) + 20;

functionCall();

window.history ? useHistory() : noHistoryFallback();

1 + 1, 2 + 2, 3 + 3;

declaredVariable;

true && functionCall();

true && declaredVariable;
```

- 위의 모든 코드들은 표현식이다. 자바스크립트 코드 중 값이 들어가는 곳이면 어디든 넣을 수 있다.
- `console.log`의 인자는 콘솔이 로깅될 때 하나의 값으로 변한다.

### 표현식은 반드시 상태(State)를 바꿀 필요는 없다.

```js
const assignedVariable = 2; // 이건 문장(Statement)입니다. assignedVariable은 상태입니다.

assignedVariable * 4; // 표현식(Expression)입니다.

assignedVariable * 10; // 표현식(Expression)입니다.

assignedVariable - 10; // 표현식(Expression)입니다.

console.log(assignedVariable); // 2
```

- 함수 호출은 표현식이다.
- 함수는 값을 변화시키는 문장(Statement)를 포함할 수 있다.

## 문장(Statement)

- 자바스크립트에서 `statement`는 값이 들어와야 할 곳에 들어갈 수 없다.
- 함수의 인자로도, 대입 연산의 값으로도, 연산자의 피연산자로도 사용 될 수 없다.

```js
foo(if () {return 2}) // js engine mind = blown
```

- 자바스크립트의 statement는 다음과 같다.

1. if
2. if-else
3. while
4. do-while
5. for
6. switch
7. for-in
8. with(deprecated)
9. debugger
10. variable declaration

```js
if (true) {
  9 + 9;
}
```

- 이렇게 하면 18이 리턴되지만 이 결과를 표현식처럼 사용하여 값이 들어갈 곳에 넣을 수 없다.
- statement가 값을 반환하는 것은 아무런 의미가 없다.

### 함수 선언, 함수 표현식 그리고 네임드(Named) 함수 표현식

```js
function foo(func) {
  return func.name;
}
```

- 함수 선언은 `statement`이다.

```js
console.log(foo(function() {})); // ""
```

- 함수 표현식은 표현식이다. 익명 함수라 불린다.

```js
console.log(foo(function myName() {})); // "myName"
```

- 네임드 함수 표현식은 표현식이다. 익명 함수같다.

```js
if () {
  function foo () {} // 블록의 가장 상위 레벨, 함수 선언
}

function foo () {} // 전역 레벨, 함수 선언

function foo () {
  function bar () {} // 블록의 가장 상위 레벨, 함수 선언
}

function foo () {
  return function bar () {} // 네임드 함수 표현식
}

foo(function () {}) // 익명 함수 표현식

function foo () {
  return function bar () {
    function baz () {} // 블록의 가장 상위 레벨, 함수 선언
  }
}

function () {} // 문법 에러: 함수 문장(statement)은 이름이 필요합니다.
```

### 표현식을 문장으로 바꾸기 : 표현식 문장(Expression Statements)

```js
2 + 2; // expression statement
foo(); // expression statement
```

- `;`을 추가하면 Expressions를 Expression Statement로 바꿀 수 있다.

```js
2+2 // 그 자체로는 표현식입니다.

foo(2+2) // 그래서 어디든 값이 들어가야 할 곳에서 사용할 수 있죠.

true ? 2+2 : 1 + 1

function foo () {return 2+2}

2+2; // 표현식 문장(Expression Statements)
foo(2+2;) // 문법 에러(Syntax Error)
```

### 세미콜론 vs 콤마 연산자

```js
const a; function foo () {}; const b = 2;
```

- `;`을 붙이면 여러 줄의 문장을 하나의 줄에 넣을 수 있다.

```js
console.log((1 + 2, 3, 4)); // 4

console.log((2, 9 / 3, function() {})); //function () {}

console.log((3, true ? 2 + 2 : 1 + 1)); // 4
```

- 콤마 연산자로 여러 개의 표현식을 연결할 수 있도록 도와준다.

```js
function foo() {
  return 1, 2, 3, 4;
}
foo(); // 4
```

- 모든 표현식은 왼쪽에서 오른쪽으로 계산되며 마지막 것만 return 된다.

### IIFEs(Immediately Invoked Function Expression(즉시 호출되는 함수 표현식))

- 익명 함수는 표현식으로 사용할 수 있다.

```js
function () {}  //Error

(function () {}) // function () {}를 리턴합니다.
```

```js
(function() {
  // do something
})();
```

- 익명 함수를 괄호 속에 넣으면 같은 익명 함수를 return 한다.

```js
(function() {
  console.log("익명함수 즉시 호출");
})()(
  // "익명함수 즉시 호출"

  function() {
    return 3;
  }
)(); // 3

console.log(
  (function() {
    return 3;
  })()
)(
  // 3

  // 인자를 넘길 수도 있습니다.
  function(a) {
    return a;
  }
)("저는 인자입니다."); // 저는 인자입니다.
```

### 오브젝트 리터럴 vs 블록 문장(Block Statement)

**_리터럴이란 값 그 자체를 의미한다._**

```js
r: 2 + 2; // 유효함

foo();

const foo = () => {};
```

- `r`은 label이라 불리는 것이며 breaking loops를 구성할 때 유용하다.

```js
loop: {
  for (const i = 0; i < 2; i++) {
    for (const n = 0; n < 2; n++) {
      break loop; // 바깥 루프를 중단하여 전체 루프를 중단합니다.
    }
  }
}
```

```js
lab: function a() {}
console.log(lab); // ReferenceError: lab is not defined
```

- 라벨을 만드는 것이 변수를 만드는 것은 아니다.

```js
{
  var a = "b";
  func();
  2 + 2;
} // 4
```

- `{}`와 같은 괄호는 문장과 표현식 문장들을 그룹화하는데 도움을 준다.
- 이것을 블록 문장이라고 불른다.
- 오브젝트 리터럴과는 다른 것이다.

```js
console.log({a: 'b'}); // {a: 'b'} 오브젝트 리터럴

console.log({var a = "b", func(), 2+2}) // SyntaxError 블록 문장

const obj = {var a = "b", func(), 2+2} // SyntaxError 블록 문장
```

- 블록 문장을 값이나 표현식으로 사용할 수는 없다.

```js
{
}
+1; // 1

{
  2;
}
+2; // 2

{
  2 + 2;
}
+3; // 3

{
  2 + 2;
}
-3; // -3
```

- statements는 값으로 쓰일 수 없기 때문에 어느 것도 반환하도록 되어있지 않다.
- 블록 문장에서 무엇이 반환되던지 그것은 암묵적으로 0으로 강제 형변환 되어서 피연산자로 사용된다.
