# 5. == vs === vs typeof

- 5th concept of 33

## `===` =표시 3개의 동등 비교연산자

- 자바스크립트에서 `===`연산을 사용할 때, 우리는 엄격한 동등성을 비교한다.

```js
5 === 5;
// true
```

- `true`가 반환된다. `numbers` 타입이며 둘 다 5라는 값을 가지고 있다.

```js
"hello world" === "hello world";
// true (둘 다 스트링이고 같은 값을 가짐)

true === true;
// true (둘 다 불리언이고 같은 값을 가짐)
```

```js
77 === "77";
// false (숫자 타입 vs 문자열 타입)
```

- 숫자와 문자를 비교한다. **같은 값**을 가지지만 **다른 타입**을 가지고 있다.

```js
"cat" === "dog";
// false (둘 다 문자열 타입 하지만 다른 값을 가짐)

false === 0;
// false (다른 타입, 다른 값)
```

## `==` =표시 2개의 동등 비교연산자

- `==` 연산자를 쓰는 목적은 느슨한 동등 비교를 위함이다.
- `==` 연산자도 **강제 형변환**을 수행한다.
- **강제 형변환(type coercion)**이란 동등 연산자로 비교하기 전에 피연산자들을 공통 타입(common type)으로 만드는 행위를 뜻한다.

```js
77 == "77";
// true
```

- 느슨한 동등 비교로 테스트한다면 `true`값을 얻는다.
- 동등한 타입으로 변환 후(강제 형변환)에 값을 비교 하기 때문에 `true`를 반환한다.

```js
false == 0;
// true
```

- 이러한 현상은 자바스크립트의 `falsy`값들과 관련이 있다.

## Falsy 값

- 자바스크립트에서 `0`이란 값이 `falsy` 값이다.
- 자바스크립트는 숫자 `0`을 강제로 `false`로 변환시킨다.

```js
1. false
2. 0
3. ""
4. null
5. undefined
6. NaN
```

- 6가지 값은 자바스크립트에서 falsy 값으로 통용된다.

## Falsy 값의 비교

1. false, 0, 그리고 ""

```js
false == 0;
// true

0 == "";
// true

"" == false;
// true
```

- 느슨한 동등 연산자로 비교하면 **강제 형변환**이 되어서 항상 동일하다는 결과를 나타낸다.

2. null 그리고 undefined

```js
null == null;
// true

undefined == undefined;
// true

null == undefined;
// true
```

- `null`과 `undefined`를 비교할때 그들은 서로 같고 자기 자신과도 같다.
- `null`을 다른 값과 비교한다면, 아마 `false`가 나올 확률이 높다.

3. NaN

- `NaN`은 자기 자신을 포함한 어떠한 값과도 동일하지 않다.

```js
NaN == null;
// false

NaN == undefined;
// false

NaN == NaN;
// false
```
