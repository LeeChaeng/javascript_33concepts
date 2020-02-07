# High Order Function

- 22th concept of 33

고차 함수(Higher-Order Function)가 무엇인지 배워보고 자바스크립트에서 고차함수를 어떻게 사용하는지 배워보자.

자바스크립트를 함수형 프로그래밍에 알맞은 언어로 만들어주는 특성이 바로 자바스크립트가 고차 함수 개념을 받아들인다는 것이다.

고차 함수는 자바스크립트에서 광범위하게 사용된다. 만일 고차 함수가 무엇인지 모를지라도 고차함수를 이용하여 프로그래밍을 해왔을 것이다.

고차함수 개념을 완전히 이해하기 위해서는 함수형 프로그래밍(Functional Programming)이 무엇인지와 퍼스트 클래스 함수(First-Class Functions)의 개념을 이해하는 것이 먼저이다.

## 함수형 프로그래밍이란 무엇일까?

가장 간결한 용어, 함수형 프로그래밍은 함수를 다른 함수의 파라미터로 넘길 수도 있고 반환(return) 값으로 함수를 받을 수도 있는 프로그래밍 형태를 말한다. 함수형 프로그래밍에서 우리는 함수라는 용어 하에서 생각하고 코딩하게 된다.

자바스크립트, Haskell, Clojure, Scala, Erlang은 전부 함수형 프로그래밍을 구현한 언어이다.

## 퍼스트 클래스(First-Class) 함수

만일 여러분이 자바스크립트를 배워왔다면, 자바스크립트가 함수를 일급 시민(fist-class citizen)으로 대해준다는 것을 들어봤을 것이다. 왜냐하면 자바스크립트 또는 다른 함수형 프로그래밍 언어 함수들은 전부 객체(objects)이기 때문이다.

자바스크립트에서 함수는 객체의 특별한 타입이다. 함수는 `Function` 객체이다.

```js
function greeting() {
  console.log("Hello World");
}

// 함수 호출하기
greeting(); // prints 'Hello World'
```

자바스크립트에서 함수가 오브젝트인 것을 증명하기 위해서, 우리는 다음과 같은 코드를 작성할 수 있다.

```js
// 우리는 오브젝트에 프로퍼티를 추가하듯 함수에 프로퍼티를 추가할 수 있습니다.
greeting.lang = "English";

// Prints 'English'
console.log(greeting.lang);
```

알아둘 것 - 위 문법은 자바스크립트에서 완전히 유효한 문법인 반면에, 위와 같이 코드를 작성하는 것은 매우 위험하게 여겨지고 있다. 함수 오브젝트에 랜덤한 프로퍼티를 추가하지 않는 것이 좋다. 만일 그래야만 한다면 오브젝트를 사용하자.

자바스크립트에서, object, string, number와 같은 타입으로 할 수 있는 것은, 함수로 할 수 있습니다. 여러분은 함수를 파라미터로 다른 함수에 넘길 수도 있고(콜백), 함수를 다른 변수에 할당하거나 다른 곳으로 넘길 수 있다. 이러한 특성 때문에 자바스크립트에 존재하는 함수들이 퍼스트 클래스 함수라 불리는 것이다.

### 함수를 변수에 할당하기

우리는 자바스크립트에서 함수를 변수에 할당할 수 있다.

```js
const square = function(x) {
  return x * x;
};

// prints 25
square(5);
```

또한 함수를 여러 곳에 넘길 수도 있다.

```js
const foo = square;

// prints 36
foo(6);
```

### 함수를 파라미터로 넘기기

```js
function formalGreeting() {
  console.log("How are you?");
}

function casualGreeting() {
  console.log("What's up?");
}

function greet(type, greetFormal, greetCasual) {
  if (type === "formal") {
    greetFormal();
  } else if (type === "casual") {
    greetCasual();
  }
}

// prints "What's up?"
greet("casual", formalGreeting, casualGreeting);
```

이제 퍼스트 클래스가 무엇인지 알았다. 자바스크립트 고차 함수에 대해서 자세히 알아보자.

## 고차 함수(Higher-Order Function)

고차 함수는 함수를 인자로 받거나 또는 함수를 반환함으로써 작동하는 함수를 말한다. 간단히 말하자면, **고차 함수는 함수를 인자로 받거나 함수를 출력(output)으로 반환하는(return) 함수를 말한다.**

예를 들면, `Array.prototype.map`, `Array.prototype.filter` 그리고 `Array.prototype.reduce`가 언어 내부에 포함된 (built-in) 고차 함수이다.

### 고차 함수의 동작

먼저, 내부적(built-in) 고차 함수의 예제부터 보고 난 뒤에 고차함수를 사용하지 않았을 때의 솔루션과 비교해보자

#### Array.prototype.map

`map()` 메소드는 입력으로 들어온 배열 내 모든 엘리먼트를 인자로 제공받는 콜백 함수를 호출함으로써 새로운 배열을 만든다. `map()` 메소드는 콜백 함수에서 모든 반환된 값을 가져올 것이다. 그리고 그 값들을 이용한 새로운 배열 하나를 만들어 낸다.

`map` 메소드로 전해진 콜백 함수는 3가지 인자를 받는다 : `element`, `index`, `array`

##### Example #1

우리가 숫자가 들어있는 배열을 가지고 있고 각각의 숫자 값이 2배가 된 배열을 만들길 원한다고 해보자. 고차 함수(Higher-Order function)가 없을 때와 있을 때, 각각 우리가 문제를 어떻게 해결할 수 있는지 보자.

###### 고차 함수가 아닌 함수로 작성

```js
const arr1 = [1, 2, 3];
const arr2 = [];

for (let i = 0; i < arr1.length; i++) {
  arr2.push(arr1[i] * 2);
}

// prints [2, 4, 6]
console.log(arr2);
```

##### 고차 함수로 작성

```js
const arr1 = [1, 2, 3];

const arr2 = arr1.map(function(item) {
  return item * 2;
});

console.log(arr2);
```

###### 화살표 문법

```js
const arr1 = [1, 2, 3];
const arr2 = arr1.map(item => item * 2);
console.log(arr2);
```

##### Example #2

사람들의 생일을 가지고 있는 배열을 가지고 있고 그 배열을 이용하여 그들의 나이를 계산해보자


###### 고차 함수가 아닌 함수로 작성

```js
const birthYear = [1975, 1997, 2002, 1995, 1985];
const ages = [];

for(let i=0; i<birthYear.length; i++){
  let age = 2018 - birthYear[i];
  ages.push(age);
}

// prints [43, 21, 16, 23, 33]
console.log(ages);
```

###### 고차 함수로 작성

```js
const birthYear = [1975, 1997, 2002, 1995, 1985];
const ages = birthYear.map(year => 2018 - year);

//prints [43, 21, 16, 23, 33]
console.log(ages);
```

#### Array.prototype.filter

`filter()` 메소드는 콜백 함수에 의해 제공된 테스트를 통과한 모든 엘리먼트를 가진 새로운 배열을 만들어낸다. `filter()` 메소드로 넘겨진 콜백 함수는 3가지 인자를 받는다 : `element`, `index`, `array`


##### Example #1

이름과 나이 프로퍼티를 가진 오브젝트를 가지고 있다고 해보자. 우리는 18살 이상의 사람만 필터링된 새로운 배열을 만들고 싶다.

###### 고차 함수가 아닌 함수로 작성

```js
const persons = [
  { name: 'Peter', age: 16 },
  { name: 'Mark', age: 18 },
  { name: 'John', age: 27 },
  { name: 'Jane', age: 14 },
  { name: 'Tony', age: 24},
];
const fullAge = [];
for(let i = 0; i < persons.length; i++) {
  if(persons[i].age >= 18) {
    fullAge.push(persons[i]);
  }
}
console.log(fullAge);
```

###### 고차 함수로 작성

```js
const persons = [
  { name: 'Peter', age: 16 },
  { name: 'Mark', age: 18 },
  { name: 'John', age: 27 },
  { name: 'Jane', age: 14 },
  { name: 'Tony', age: 24},
];
const fullAge = persons.filter(person => person.age >= 18);
console.log(fullAge);
```

#### Array.prototype.reduce

`reduce` 메소드는 호출하는 배열의 각각의 멤버에 대해서 콜백 함수를 실행하고 하나의 결과 값만 내보낸다. `reduce` 메소드는 2가지 파라미터를 받는다.

1. 리듀서 함수(콜백)
2. 초기 값(initialValue) 옵션

리듀서(콜백) 함수는 4가지 파라미터를 받는다.
`accumulator`, `currentValue`, `currentIndex`, `sourceArray`

만일 `initialValue`가 제공되었다면, 그 후에 `accumulator`는 `initialValue`와 같아지고 `currentValue`는 배열의 첫번째 값과 동일할 것이다.

만일 `initialValue`가 제공되지 않았다면, 그 후에 `accumulator`는 배열의 처음 요소와 동일해지고 `currentValue`는 배열의 두 번째 요소와 같아질 것이다.

##### Example #1

숫자 배열의 합을 구하는 예제를 만들어보자

###### 고차 함수로 작성


```js
const arr = [5, 7, 1, 8, 4];

const sum = arr.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
});

// prints 25
console.log(sum);
```

배열 내부의 각 값에 대해 리듀서 함수가 호출되는 순간에 `accumulator`는 리듀서 함수로부터 반환된 이전 연산의 결과를 갖고 있다. 그리고 `currentValue`는 배열의 현재 값으로 세팅된다. 마지막에, 결과 값은 `sum` 변수에 저장된다.

이 함수에 초기 값을 제공하는 것도 가능하다.

```js
const arr = [5, 7, 1, 8, 4];

const sum = arr.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
}, 10);

// prints 35
console.log(sum);
```

###### 고차 함수가 아닌 함수로 작성

```js
const arr = [5, 7, 1, 8, 4];

let sum = 0;

for (let i=0; i<arr.length; i++) {
  sum = sum + arr[i];
}

// prints 25
console.log(sum);
```

여기까지 고차 함수를 이용하여 코드를 조금 더 깔끔하고 간결히 더럽지 않게 작성하는 방법을 볼 수 있었다.

