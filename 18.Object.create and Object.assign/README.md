# Object.create and Object.assign

- 18th concept of 33

오브젝트는 자바스크립트의 기반이 되는 개념 중의 하나이다. 이는 기본적으로 프로퍼티들(key&value)의 컬렉션이다. 거의 대부분의 자바스크립트 오브젝트는 프로토타입 체인의 top에 위치한 `Object`의 인스턴스이다.

```js
let obj = {
  a: 1,
  b: 2
};
let copy = obj;

obj.a = 5;
console.log(copy.a);
// Result
// a = 5;
```

- `obj` 변수는 초기화되는 새로운 오브젝트를 위한 컨테이너이다.
- `copy` 변수는 같은 오브젝트를 가리키고 그 오브젝트를 가리키는 레퍼런스이다.
- `{a:1, b:2}` 오브젝트에 접근하는 방법은 2가지가 있다.
- `obj` 변수 또는 `copy` 변수 둘 중 하나를 통해서 오브젝트에 접근할 수 있고 접근 후에 오브젝트에 변화를 주게 되면 두 방법 중 어떤 방법으로 접근했는지에 상관없이 오브젝트 자체에 변화가 일어나게 된다.

## 오브젝트를 복사하는 원시적(native)인 방법

- 오브젝트를 복사하는 원시적인 방법은 원본 오브젝트의 프로퍼티를 반복하고 각 프로퍼티를 복사하는 것이다.

```js
function copy(mainObj) {
  let objCopy = {}; // objCopy will store a copy of the mainObj
  let key;

  for (key in mainObj) {
    objCopy[key] = mainObj[key]; // copies each property to the objCopy object
  }
  return objCopy;
}

const mainObj = {
  a: 2,
  b: 5,
  c: {
    x: 7,
    y: 4
  }
};

console.log(copy(mainObj));
```

### 상속 이슈

1. `objCopy`는 `mainObj` 오브젝트 프로토타입 메소드와 다른 새로운 `Object.prototype` 메소드를 갖고 있다. 이는 우리가 원하는 것이 아니다. 원복 오브젝트의 정확한 복사본을 원한다.
2. 프로퍼티 기술자(descriptors)는 복사되지 않는다. `false` 값으로 세팅되는 값을 가진 작성 가능한 기술자는 `objCopy`에서는 `true`가 된다.
3. 위의 코드에서 `mainObj`의 `enumerable` 프로퍼티만을 복사한다.
4. 만일 원본 오브젝트에서의 프로퍼티 중 하나가 오브젝트 그 자체라면, 그 오브젝트는 각각의 프로퍼티에서 같은 오브젝트를 참조하게 되며 복사본과 원본 사이에서 공유된다.

## 얕은(Shallow) 오브젝트 복사하기

- 소스 최상위 레벨 프로퍼티들이 어떠한 **참조없이 복사**될 때, 오브젝트는 얕게 복사된다고 한다.
- 레퍼런스로 복사된 오브젝트 값을 가진 소스 프로퍼티가 존재하게 된다.
- 만일 소스 값이 오브젝트를 가리키는 레퍼런스라면, 결국 타겟 오브젝트를 가리키는 레퍼런스 값만 복사하게 된다.

얕은 복사는 최상위 레벨 프로퍼티들을 복사한다. 하지만 중첩된 오브젝트들은 원본(original, source)과 복사본(copy, target)사이에서 공유된다.

### `Object.assign()` 메소드 사용하기

- 하나 또는 그 이상의 원본 오브젝트로부터 복사본 오브젝트로 모든 enumerable한 프로퍼티 값을 복사하기 위해 사용된다. 반환 값은 복사본 오브젝트이다.

```js
let obj = {
  a: 1,
  b: 2
};
let objCopy = Object.assign({}, obj);
console.log(objCopy);
// Result - { a: 1, b: 2 }
```

- `obj`의 복사본을 만들었다.

```js
let obj = {
  a: 1,
  b: 2
};
let objCopy = Object.assign({}, obj);

console.log(objCopy); // result - { a: 1, b: 2 }
objCopy.b = 89;
console.log(objCopy); // result - { a: 1, b: 89 }
console.log(obj); // result - { a: 1, b: 2 }
```

- `objCopy` 오브젝트 내에 존재하는 `'b'`의 값을 `89`로 바꾸고 변경된 `objCopy` 오브젝트를 콘솔에 출력해보았다.
- 변화는 오직 `objCopy` 오브젝트에만 적용되었다.
- 마지막줄은 `obj` 오브젝트가 아직 그대로이고 변하지 않았는지 확인하는 코드이다.
- **원본 오브젝트에서 참조 없이 성공적으로 오브젝트 복사에 성공했다는 것을 알 수 있다.**

### `Object.assign()`의 함정

```js
let obj = {
  a: 1,
  b: {
    c: 2
  }
};
let newObj = Object.assign({}, obj);
console.log(newObj); // { a: 1, b: { c: 2} }

obj.a = 10;
console.log(obj); // { a: 10, b: { c: 2} }
console.log(newObj); // { a: 1, b: { c: 2} }

newObj.a = 20;
console.log(obj); // { a: 10, b: { c: 2} }
console.log(newObj); // { a: 20, b: { c: 2} }

newObj.b.c = 30;
console.log(obj); // { a: 10, b: { c: 30} }
console.log(newObj); // { a: 20, b: { c: 30} }

// Note: newObj.b.c = 30; Read why..
```

- **`Object.assign()`의 함정은 바로 얕은 복사만 가능하다는 것이다.** `newObj.b`와 `obj.b` 둘 다 같은 레퍼런스를 공유한다.
- 각각에 대한 카피는 이뤄지지 않았다. 대신 오브젝트를 가리키는 레퍼런스만 복사되었다.

> 프로토타입 체인의 프로퍼티와 non-enumerable 한 프로퍼티들은 복사될 수 없다.

```js
let someObj = {
  a: 2
};

let obj = Object.create(someObj, {
  b: {
    value: 2
  },
  c: {
    value: 3,
    enumerable: true
  }
});

let objCopy = Object.assign({}, obj);
console.log(objCopy); // { c: 3 }
```

- `someObj`는 `obj`의 프로퍼티 체인에 있다. 복사되지 않는다.
- 프로퍼티 b는 non-enumerable 프로퍼티이다.
- 프로퍼티 c는 enumerable 프로퍼티 기술자가 enumerable 하게 만들어주고 있다. 그래서 이 프로퍼티는 복사된다.

## 오브젝트 깊은 복사하기

깊은 복사는 만나는 모든 오브젝트를 복사한다. 복사본과 원본 오브젝트는 어느 프로퍼티도 공유하지 않는다. 여기서 `Object.assign()`을 사용할 때 만나게 되는 문제점을 해결할 것이다.

### JSON.parse(JSON.stringify(object)) 사용하기

이 방식은 이전의 이슈를 해결 할 수 있다. `newObj.b`는 레퍼런스가 아닌 복사본을 갖는다.

```js
let obj = {
  a: 1,
  b: {
    c: 2
  }
};

let newObj = JSON.parse(JSON.stringify(obj));

obj.b.c = 20;
console.log(obj); // { a: 1, b: { c: 20 } }
console.log(newObj); // { a: 1, b: { c: 2 } } (New Object Intact!)
```

- 이 메소드는 사용자 정의 오브젝트 메소드를 복사하는데 이용될 수는 없다.

## 오브젝트 메소드 복사하기

- 메소드는 오브젝트의 함수 프로퍼티이다. 지금까지 예제에서 오브젝트 메소드를 복사했던 적은 없다.

```js
let obj = {
  name: "scotch.io",
  exec: function exec() {
    return true;
  }
};

let method1 = Object.assign({}, obj);
let method2 = JSON.parse(JSON.stringify(obj));

console.log(method1); //Object.assign({}, obj)
/* result
{
  exec: function exec() {
    return true;
  },
  name: "scotch.io"
}
*/

console.log(method2); // JSON.parse(JSON.stringify(obj))
/* result
{
  name: "scotch.io"
}
*/
```

- `Object.assign()`이 메소드를 복사하는데 사용될 수 있다는 결과를 보여준다. 반면에 `JSON.parse(JSON.stringify(obj))`는 사용될 수 없다.

## 순환하는 오브젝트 복사하기

순환하는 오브젝트는 그들 자신을 참조하는 프로퍼티를 가진 오브젝트이다.

### JSON.parse(JSON.stringify(object)) 사용하기

```js
// circular object
let obj = {
  a: "a",
  b: {
    c: "c",
    d: "d"
  }
};

obj.c = obj.b;
obj.e = obj.a;
obj.b.c = obj.c;
obj.b.d = obj.b;
obj.b.e = obj.b.c;

let newObj = JSON.parse(JSON.stringify(obj));

console.log(newObj);
```

![image](https://user-images.githubusercontent.com/52696993/73440480-b2128380-4394-11ea-94a8-856d2e6a44f8.png)

- `JSON.parse(JSON.stringify(object))`는 순환하는 오브젝트를 복사할 수 없다.

### Object.assign() 사용하기

```js
// circular object
let obj = {
  a: "a",
  b: {
    c: "c",
    d: "d"
  }
};

obj.c = obj.b;
obj.e = obj.a;
obj.b.c = obj.c;
obj.b.d = obj.b;
obj.b.e = obj.b.c;

let newObj2 = Object.assign({}, obj);

console.log(newObj2);
```

![image](https://user-images.githubusercontent.com/52696993/73440616-eb4af380-4394-11ea-82ab-cad32e650618.png)

- `Ojbect.assign()`은 순환하는 오브젝트를 얕은 복사하는데 아무런 문제가 없지만 깊은 복사는 여전히 할 수 없다. 브라우저 콘솔에서 `circular object tree`를 돌아보자.


### Sparead Elements 사용하기(...)

ES6는 이미 배열 해체 할당과 구현된 어레이 리터럴을 위한 확장 엘리먼트를 가지고 있다. 배열에 대한 확장 엘리먼트 구현을 한 번 보자.

```js
const array = [
  "a",
  "c",
  "d", {
    four: 4
  },
];
const newArray = [...array];
console.log(newArray);
// Result 
// ["a", "c", "d", { four: 4 }]
```

- 오브젝트 리터럴을 위한 확장 프로퍼티는 현재 ECMAScript의 Stage 3 Proposal에 올라있다. 오브젝트 이니셜라이저 안의 확장 프로퍼티는 자체적인 enumerable 프로퍼티들을 원본에서 복사본으로 복사한다.


```js
let obj = {
  one: 1,
  two: 2,
}

let newObj = { ...z };

// { one: 1, two: 2 }
```

> 오직 얕은 복사에만 적용된다.
