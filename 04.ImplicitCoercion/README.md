# 4. Implicit Coercion

- 4th concept of 33

## 자바스크립트의 암묵적 타입 변환(implicit coercion)
- 예상치 못한 타입을 받았을 때 예상 가능한 타입으로 바꿔주는 것이다.
- 숫자 값을 넘겨야 하는 곳에 문자열을 넣을 수도 있고 문자열을 넣어야 하는 곳에 객체를 넘길 수 있다.
- 이럴 때 자바스크립트 엔진은 사용자가 잘못 넣은 타입을 올바른 타입으로 변환하도록 시도한다.

```js
3 * "3" // 9
1 + "2" + 1 // 121

true + true // 2
10 - true // 9

const foo = {
    valueOf: () => 2  
}
3 + foo // 5
4 * foo // 8

const bar = {
    toString: () => " promise is a boy :)"  
}

1 + bar // "1 promise is a boy :)"


4 * [] // 0
4 * [2] // 8
4 + [2] // "42"
4 + [1, 2] // "41, 2"
4 * [1, 2] // NaN

"string" ? 4 : 1 // 4
undefined ? 4 : 1 // 1
```


## 숫자 표현식에서 숫자가 아닌 값
### 문자열
- 사용자가 숫자 표현식에서 문자열을 피연산자로 넘겼을 때마다 숫자의 암묵적 타입변환 프로세스는 문자열을 인자로 자바스크립트 내부에 저장된 `Number` 함수를 불러오는 것과 비슷하다.
- 숫자 문자를 가졌다면 어떤 문자열이라도 동등한 숫자로 바뀐다.
- 만일 문자열에 숫자가 아닌 것이 포함되어 있으면 `NaN`을 리턴한다.

```js
3 * "3" // 3 * 3
3 * Number("3") // 3 * 3
Number("5") // 5

Number("1.") // 1
Number("1.34") // 1.34
Number("0") // 0
Number("012") // 12

Number("1,") // NaN
Number("1+1") // NaN
Number("1a") // NaN
Number("la") // NaN
Number("one") // NaN
Number("text") // NaN
```

### + 연산자
- `+`연산자는 다른 수학적 연산자들과는 다르게 2가지 기능을 한다.
1. 수학적인 덧셈
2. 문자열 합치기
- 문자열이 `+` 연산자의 피연산자로 주어졌을 때, 자바스크립트는 문자열을 숫자로 바꾸려 하지 않고 숫자를 문자로 바꾸려 한다.

```js
// concatenation
1 + "2" // "12"
1 + "js" // "1js"

// addition
1 + 2 // 3
1 + 2 + 1 // 4

// addition, then concatenation
1 + 2 + "1" // "31"
(1 + 2) + "1" // "31"

// concatenation all through
1 + "2" + 1 // "121"
(1 + "2") + 1 // "121"
```

### 객체
- 객체 대부분의 암묵적 형변환은 결과 값으로 `[Object Object]`를 반환한다.

```js
"name" + {} // "name[object Object]"
```

- 모든 자바스크립트 객체는 `toString` 메소드를 상속받는다.
- 이는 객체가 문자열 타입으로 변해야 할 때마다 쓰인다.
- `toString`의 반환 값은 문자열 합치기 혹은 수학적 표현식과 같은 연산에서 쓰이게 된다.

```js
const foo = {}
foo.toString() // [object Object]

const baz = {
    toString: () => "I'm object baz"  
}

baz + "!" // "I'm object baz!"
```
- 객체가 수학적 표현식 사이에 들어갔을 때는, 자바스크립트는 반환 값을 숫자로 변환하려 할 것이다.

```js
const foo = {
    toString: () => 4  
}

2 * foo // 8
2 / foo // 0.5
2 + foo // 6
"four" + foo // "four4"

const baz = { 
    toString: () => "four"  
}

2 * baz // NaN
2 + baz // 2four

const bar = {
    toString: () => "2"  
}

2 + bar // "22"
2 * bar // 4
```

### 배열 객체
- 배열에서 상속된 `toString` 메소드는 약간 다르게 동작한다.
- 이것은 배열에서 아무런 인자도 넣지 않은 `join` 메소드를 호출한 것과 비슷한 방식으로 작동한다.
```js
[1, 2, 3].toString() // "1,2,3"
[1, 2, 3].join() // "1,2,3"
[].toString() // ""
[].join() // ""

"me" + [1,2,3] // "me1,2,3"
4 + [1,2,3] // "41,2,3"
4 * [1,2,3] // NaN
```

- 배열을 어딘가로 넘길 때는 언제나 `toString` 메소드를 거치면 어떻게 되는지를 생각하자

```js
4 * [] // 0
4 / [2] // 2

//similar to 
4 * Number([].toString())
4 * Number("")
4 * 0

// 

4 / Number([2].toString())
4 / Number("2")
4 / 2
```

### True, False 그리고 ""
```js
Number(true) // 1
Number(false) // 0
Number("") // 0

4 + true // 5
3 * false // 0
3 * "" // 0
3 + "" // 3
```

### valueOf 메소드
- 문자열이나 숫자가 올 곳에 객체를 넘길 때마다 자바스크립트 엔진에 의해 사용될 `valueOf` 메소드를 정의하는 것도 가능하다.

```js
const foo = {
    valueOf: () => 3  
}

3 + foo // 6
3 * foo // 9
```
- 객체에 `toString`과 `valueOf` 메소드가 전부 정의되어 있을 때는 자바스크립트 엔진은 `valueOf` 메소드를 사용한다.

```js
const bar = {
    valueOf: () => 5,
    toString: () => 2
}

"sa" + bar // "sa5"
3 * bar // 15
2 + bar // 7
```
- `valueOf` 메소드는 객체가 어떠한 숫자값을 나타낼 때 사용하기 위해 만들어졌다.

```js
const two = new Number(2)

two.valueOf() // 2
```

## Falsy와 Truthy
- 모든 자바스크립트 값은 `true`나 `false`로 변환될 수 있는 특성을 가지고 있다.
- `true`로 강제 형변환 하는 것을 `truthy`라고 한다. 
- `false`로 강제 형변환 하는 것을 `falsy`라고 한다.
- 자바스크립트에서 반환 시에 `falsy`로 취급되는 값들
1. false
2. 0
3. null
4. undefined
5. ""
6. NaN
7. -0
- 외에는 전부 `truthy`로 취급된다.

```js
if (-1) // truthy
if ("0") // truthy
if ({}) // truthy
```
- `truthy`를 이용해도 괜찮다. 하지만 값이 참임을 명시적으로 표현해주는 것이 더 좋은 방법이다.
- 묵시적 형변환을 완벽히 이해하더라도 의존하지 말 것
```js
const counter = 2

if(counter)
```
```js
if(counter === 2)

// or

if(typeof counter === "number")
```

- 두 번째 코드가 더 좋은 코드이다.

```js
const add = (number) => {
    if(!number) new Error("Only accepts arguments of type: number")
    // your code
}
```
- `number` 타입의 변수를 받아 실행하도록 하고 싶어 만든 함수이다.
- 인자 값이 0이라면 의도치 않은 에러가 발생한다.

```js
add(0) // Error: Only accepts arguments of type: number

// better check

const add = (number) => {
    if (typeof number !== "number") new Error("Only accepts arguments of type: number")  
    // your code  
}

add(0) // no error
```
- 이렇게 처리해 주는 것이 더 좋은 방법이다.

## NaN
- 자기 자신과도 같지 않은 특별한 숫자 값이다.

```js
NaN === NaN // false

const notANumber = 3 * "a" // NaN

notANumber == notANumber // false
notANumber === notANumber // false
```
```js
if (notANumber !== notANumber) // true
```
- 자바스크립트에서 유일하게 자기 자신과 같지 않은 값이다.

```js
Number.isNaN(NaN) // true
Number.isNaN("name") // false
```
- ECMAScript6는 `NaN`을 체크하기 위한 메소드(`Number.isNaN`)을 만들었다.
```js
isNaN("name") // true
isNaN("1") // false
```
- 전역 `isNaN`은 인자가 실제로 `NaN`인지 체크하기 전에 인자로 들어온 값의 형변환을 강제한다.

```js
const coerceThenCheckNaN = (val) => {
    const coercedVal = Number(val)
    return coercedVal !== coercedVal ? true : false
}

coerceThenCheckNaN("1a") // true
coerceThenCheckNaN("1") // false
coerceThenCheckNaN("as") // true
coerceThenCheckNaN(NaN) // true
coerceThenCheckNaN(10) // false
```
- 전역 `isNaN` 함수는 사용하지 않는 것이 좋다. 동작은 위와 같다.
- `Number`로 변환되지 않는다면 `true`값을 변환한다.

