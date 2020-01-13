# 3. Value vs Reference

- third concept of 33

## 자바스크립트에서 값(Value)과 참조(Reference)

- 자바스크립트는 값에 의한 전달이 일어나는 5가지 원시 타입이 있다.
- `Boolean`, `Null`, `Undefined`, `String`, `Number`
- 참조에 의해 전달이 이루어지는 참조에 의한 전달이 일어나는 객체가 있다.
- `Array`, `Function`, `Object`

## 원시 타입

```js
var x = 10;
var y = "abc";

var a = x;
var b = y;

console.log(x, y, a, b); // -> 10, 'abc', 10, 'abc'
```

- x의 값을 바꾸어도 a의 값에 변화가 없다.
- y의 값을 바꾸어도 b의 값에 변화가 없다.
- 서로 아무런 관계가 없다고 생각해도 무방하다.

## 객체

- 원시 타입이 아닌 값이 할당된 변수들은 그 값으로 향하는 참조를 갖게 된다.
- 이는 메모리에서 객체의 위치를 가리키고 있다.
- 변수는 실제로 값을 가지고 있지 않는다.

```js
arr = [];
```

- 변수 arr이 갖는 것은 그 배열이 위치한 주소이다.

```js
1) var arr = [];
2) arr.push(1);
```

- 1)의 값은 <#001>이라는 값을 갖게 되며 Address #001이다.
- objects는 빈 배열이 된다. []
- 2)의 값은 <#001>의 값을 갖으며 Addres #001이다.
- objects는 [1]이 된다.
- 이 값은 정적임을 인지해야 하며, 변수의 값이 바뀌는 것이 아닌 메모리 속의 배열 값이 바뀌는 것이다.

```js
var reference = [1];
var refCopy = reference;
```

- refCopy의 값은 reference의 주소가 되는 것이다.
- 둘은 같은 배열로 가는 래퍼런스를 갖게 된다.

```js
reference.push(2);
console.log(reference, refCopy); // -> [1, 2], [1, 2]
```

- 같은 배열을 가리키기 때문에 둘의 값이 동일하다.

## 참조 재할당 하기

- 참조 값을 재할당 하는 것은 오래된 참조를 대체한다.

```js
var obj = { first: "reference" };
obj = { second: "ref2" };
```

- 두번째 줄을 입력하는 순간 obj안에 저장됐던 주소 값은 변경된다.
- 하지만 첫번째 객체가 아직 메모리 상에 표기가 되긴 한다.
- 남아있는 객체를 가리키는 참조가 남아있지 않을 때 자바스크립트 엔진은 `가비지 컬랙션`을 동작시킬 수 있다.

### 가비지 콜랙션

- 메모리 할당을 추적하고 할당된 메모리가 더이상 필요 없어 졌을 때 해체하는 작업이다.
- `표시하고 지우기` 와 `참조 카운팅`이 있다.
- 대부분의 브라우저는 `표시하고 지우기` 사용
- 사용하지 않는 변수, 객체는 null로 초기화하자
- 이벤트 핸들러를 `바인딩` 했다면 모두 `언바인딩` 하자

## == 와 ===

- `==`와 `===`는 참조 타입의 변수를 비교 할 때 사용한다.

```js
var arrRef = ["Hi!"];
var arrRef2 = arrRef;

console.log(arrRef === arrRef2); // -> true
```

- 같은 아이템에 대한 참조 --> `true`

## 함수를 통한 파라미터 전달

- 우리가 원시 값들을 함수로 전달할 때 , 함수는 값들을 복사하여 파라미터로 전달한다.
- `=` 연산자를 이용하는 것과 같다.

```js
var hundred = 100;
var two = 2;

function multiply(x, y) {
  // PAUSE
  return x * y;
}

var twoHundred = multiply(hundred, two);
```

- `hundred`의 값이 `=`연산자를 써서 할당 한 것처럼 복사된다.
- 인자로 넘겨진 `hundred`라는 변수에는 아무런 영향도 미치지 않는다.

## 순수 함수

- 함수 중에 바깥 스코프에 아무런 영향도 미치지 않는 함수를 순수 함수 라고 한다.
- 함수가 오직 원시 값들만을 파라미터로 이용하고 주변 스코프에서 어떠한 함수도 이용하지 않는다면, 그 함수는 자연스럽게 순수 함수가 된다.
- 안에서 만들어진 모든 변수들은 함수에서 반환(return)이 실행되는 즉시 `가비지 콜랙션`처리가 된다.


- 객체를 받는 함수는 주변 스코프들의 상태를 변경할 수 있다.
- 만일 함수가 배열 참조값을 가진 변수를 받고 그 변수가 가리키는 배열에 push를 수행하면, 그 주변 스코프들에 존재하는 변수들과 그 참조(reference)와 배열이 바뀌는 것을 볼 수 있다.


- `Array.map`과 `Array.filter`를 포함한 많은 네이티브 배열 함수들은 그래서 순수 함수로 작성되어 있다.
- 배열 참조를 받아서 내부적으로 배열을 복사하고 원본 대신 복사된 배열로 작업한다.

```js
function changeAgeImpure(person) {
    person.age = 25;
    return person;
}

var alex = {
    name: 'Alex',
    age: 30
};

var changedAlex = changedAgeImprue(alex);

console.log(alex); // -> {name: 'Alex', age: 25}
console.log(chnagedAlex); // -> {name: 'Alex', age: 25}
```
- `changeAgeImpure`는 순수함수가 아니다.
- 객체로 받아온 값에 그대로 명령을 수행해서 `alex` 객체를 직접 변환시킨다.
- `changedAlex`에 복사하는 것은 어차피 쓸데없는 짓

```js
function changeAgePure(person) {
    var newPerson = JSON.parse(JSON.stringify(person));
    newPersonObj.age = 25;
    return newPersonObj;
};

var alex = {
    name: 'Alex',
    age: 30
};

var alexChanged = changeAgePure(alex);

console.log(alex); // -> {name: 'Alex', age: 30}
console.log(alexChanged); // -> {name: 'Alex', age: 25}
```
- `var newPerson = JSON.parse(JSON.stringify(person));`이 부분에서 다시 객체로 만들어서 newPerson이라는 객체를 만든다.
- 메모리 상에서 이 두 객체는 서로 다른 주소 값을 가지고 구분 될 수 있다.


## 자가 테스트

```js
function changeAgeAndReference(person) {
    person.age = 25;
    person = {
        name: 'John',
        age: 50
    };
    return person;
}

var personObj1 = {
    name: 'Alex',
    age: 30
};

var personObj2 = changeAgeAndReference(personObj1);

console.log(personObj1); // -> ? 
console.log(personObj2); // -> ? 
```
- 함수는 처음에 넘겨진 원본의 `age`값을 변경한다.
- 후에 person이라는 새로운 객체를 생성한 후에 그 값이 `personObj2`에 저장되게 된다.
- {name: 'Alex', age: 25}
- {name: 'John', age: 50}
