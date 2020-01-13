# 2. Primitive Type

- second concept of 33

## javascript의 6가지 원시 데이터 타입

- 객체가 아닌 것들이며, 그 값 자체로 저장된 것이다.

- Booleans (`true` or `false`)
- null
- undefined
- number (64 bits 정수 x)
- string
- symbol (ES6~)

## Primitive Type이 아니며 ESMAScript 표준이 Object 정의. 키-값 저장소

- 함수들과 배열들도 포함한다.
- Object (key : value, not primitive type)

## 원시 타입은 불변적이다. (Primitive Type is immutable)

- 원시 타입에는 어떠한 메소드도 붙어있지 않다. 즉, 원시타입은 변하지 않는 속성을 갖는다.
- 얼마든지 값 재할당은 가능하지만, 원시타입의 값이 바뀌는 것이 아니라 새로운 값의 원시타입이 들어가는 개념이다. 원시타입 값 자체는 절대 바뀔 수 없다.
- 원시 타입은 참조(reference)로 저장되는 Object와 다르게 그 값 자체로 저장되어 있다.

```js
"dog" === "dog"; // true
14 === 14; // true

{} === {}; // false
[] === []; // false
(function () {}) === (function () {}); // false
```

- 배열의 내용은 같지만 다른곳을 참조하기 때문에 false를 return 한다.
- 원시 타입은 값(value)로 저장되고, 객체들은 참조(reference)로 저장됩니다.

## 함수

- 함수는 특별한 프로퍼티들을 가진 새로운 형태의 객체이다.

```js
const foo = function(baz) {};
foo.name; // "foo"
foo.length; // 1
foo.bar = "baz";
foo.bar; // "baz"
```

## 메소드

- 메소드는 함수와 같이 객체의 프로퍼티이다.

```js
const foo = {};
foo.bar = function() {
  console.log("baz");
};
foo.bar(); // "baz"
```

## 생성자

- 어떤 함수든 생성자 함수가 될 수 있다.
- 생성자 함수는 object를 return하게 된다.

```js
const Foo = function() {
  this.bar = "baz";
};
const qux = new Foo();
qux; // { bar: "baz" }
qux instanceof Foo; // true
qux instanceof Object; // true
```

- 새로운 오브젝트를 만들기 위해 생성자 함수를 사용할 수 있다.
- new 키워드 없이 Foo()라는 함수를 실행한다면 전역 컨테스트 시점의 `this`인 `window`객체에 `bar`라는 프로퍼티가 추가됩니다.

```js
Foo(); // undefined
window.bar; // "baz"
```

```js
const pet = new String("dog");
// pet은 원시 타입의 "dog" 값을 갖는 것이 아니라 생성자 함수로 생성된 String 객체를 갖게 됩니다.
```

## 래퍼 오브젝트 (Wrapper Object)

- `String`, `Number`, `Boolean`, `Function`와 같은 원시타입을 `new`키워드로 생성하면 원시 타입에 대한 `래퍼 오브젝트`가 생성됩니다.

```js
String(1337); // "1337"
String(true); // "true"
String(null); // "null"
String(undefined); // "undefined"
String(); // ""
String("dog") === "dog"; // "true"
typeof String("dog"); // "string"
```

- String은 인자로 들어온 값을 문자열로 바꾼다.

```js
const pet = new String("dog");
typeof pet; // "object"
pet === "dog"; // false
```

- 하지만 `new`키워드를 붙인다면 `String`은 생성자 함수로 쓰일 수 있다.
- `String` 생성자는 `Wrapper Object`라는 새로운 `Object`를 만든다.

```js
{
    0: "d",
    1: "o",
    2: "g",
    length: 3
}
```

- `"dog"`라는 문자열을 다음과 같은 프로퍼티로 나타낸다.

## 오토 박싱(Auto Boxing)

- 원시 타입 문자열 생성자와 일반 오브젝트 생성자 둘 다 `String` 함수를 이용한다.
- 원시 문자열 타입에서 `.constructor`를 이용하여 생성자 프로퍼티를 확인할 수 있다.

```js
const pet = new String("dog");
pet.constructor === String; // true
String("dog").constructor === String; // true
```

- 여기서 오토 박싱이 이루어짐
- 특정한 원시 타입에서 프로퍼티나 메소드를 호출하려고 할 때, 자바스크립트는 이것을 임시 래퍼 오브젝트로 바꾼 뒤에 프로퍼티나 메소드에 접근하려고 한다. 원본은 손상되지 않는다.

```js
const foo = "bar";
foo.length; // 3
foo === "bar"; // true
```

- `length`라는 프로퍼티에 접근하려 함 --> `foo`를 `오토 박싱` --> `래퍼 오브젝트`에 넣는다. --> `래퍼 오브젝트`의 `length` 프로퍼티에 접근 -- > 이용 후 삭제
- `foo`는 여전히 원시 타입 문자열/ 원본 값 손상 x
- 원시 타입에 프로퍼티를 할당하려고 할 때 자바스크립트가 아무런 경고 메시지나 에러메시지를 출력하지 않는 이유(원시 타입은 프로퍼티를 가질 수 없다.)
- 프로퍼티를 할당할 때 잠시 원시 타입을 이용한 `래퍼 오브젝트`를 만들고 거기에 할당하기 때문

```js
const foo = 42;
foo.bar = "baz"; // Assignment done on temporary wrapper object
foo.bar; // undefined

const foo = null;
foo.bar = "baz"; // Uncaught TypeError: Cannot set property 'bar' of null
```

- `undefined`나 `null`과 같이 `래퍼 오브젝트`가 없는 원시 타입에 대해서 프로퍼티를 할당하려고 하면 자바스크립트는 에러 메시지 출력
