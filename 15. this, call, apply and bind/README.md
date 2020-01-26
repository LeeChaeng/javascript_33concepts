# this, call, apply and bind

- 15th concept of 33

## this?

- `this`는 함수가 동작하는 곳에 있는 오브젝트와 연결해준다.
- `this` 키워드의 값은 그 함수 자체와는 상관이 없다. 함수가 어떻게 불려지는지가 `this`의 값을 결정한다.

## this 컨텍스트

```js
// define a function
var myFunction = function() {
  console.log(this);
};

// call it
myFunction();
```

- `this`는 언제나 전역 스코프의 root를 참조하는 window Object가 된다.
- 만약 스크립트가 strict mode(`"use strict"`)내에서 작동하고 있다면 `this`는 undeifned일 것이다.

## 오브젝트 리터럴(Object literals)

```js
var myObject = {
  myMethod: function() {
    console.log(this);
  }
};
```

- 여기서 `this`의 값은 무엇이 들어올지 모른다.
- `this` 키워드의 값은 언제나 함수 자체와는 상관이 없다.
- **함수가 어떻게 호출되는지가 `this`의 값을 결정한다.**

```js
var myMethod = function() {
  console.log(this);
};

var myObject = {
  myMethod: myMethod
};
```

- 코드 안의 `myObject`는 `myMethod`라 불리는 프로퍼티를 갖는다. 이 프로퍼티는 `myMethod` 함수를 가리킨다.
- `myMethod` 함수가 글로벌 스코프로부터 호출됐을 때, `this`는 window object를 참조한다.
- `myObject` 메소드로서 호출됐을 때는 `this`가 `myObject를 참조한다.

```js
myObject.myMethod(); // this === myObject
myMethod(); // this === window
```

- **implicit binding** 이라고 한다.
  **_해봤는데 왜 둘 다 window 가 찍힐까?_**

## 명시적 바인딩(Explicit binding)

- 함수에 명시적으로 컨텍스트를 바인딩 할 때, 그것을 명시적 바인딩이라고 한다.
- 이는 주로 `call()` 메소드와 `apply()` 메소드에 의해 이루어진다.

```js
var myMethod = function () {
  console.log(this);
};

var myObject = {
  myMethod: myMethod
};

myMethod() // this === window
myMethod.call(myObject, args1, args2, ...) // this === myObject
myMethod.apply(myObject, [array of args]) // this === myObject
```

```js
var myMethod = function() {
  console.log(this);
};

var obj1 = {
  a: 2,
  myMethod: myMethod
};

var obj2 = {
  a: 3,
  myMethod: myMethod
};

obj1.myMethod(); // {a: 2, myMethod: ƒ}
obj2.myMethod(); // {a: 3, myMethod: ƒ}

obj1.myMethod.call(obj2); // {a: 3, myMethod: ƒ}
obj2.myMethod.call(obj1); // {a: 2, myMethod: ƒ}
```

- 명시적 바인딩이 묵시적 바인딩보다 우위를 갖게 된다.

## 하드 바인딩(Hard binding)

- 하드 바인딩은 `bind()` (ES5)으로 가능하다.
- `bind()`메소드는 우리가 지정한 `this` 컨텍스트를 가진 기존 함수를 불러오기 위해 하드코딩 된 새로운 함수를 반환한다.

```js
myMethod = myMethod.bind(myObject);

myMethod(); // this === myObject
```

- 명시적 바인딩보다 하드 바인딩이 우위를 갖게 된다.

```js
var myMethod = function() {
  console.log(this);
};

var obj1 = {
  a: 2
};

var obj2 = {
  a: 3
};

myMethod = myMethod.bind(obj1); // 2
myMethod.call(obj2); // 2 명시적 바인딩은 obj2이나, obj1로 하드바인딩 되어있음
```

## 'New' 바인딩(New binding)

```js
function foo(a) {
  this.a = a;
}

var bar = new foo(2);
console.log(bar.a); // 2
```

- 새로운 new 인스턴스를 참조하는 함수가 호출되었을 때, `this`가 만들어진다.
- 위의 경우에는 변수 bar가 `this`가 되었다.
- 함수가 `new`와 함께 호출되었을 때는 묵시적, 명시적 또는 하드 바인딩을 신경쓰지 않는다. 이때는 그냥 새로운 인스턴스인 새로운 컨텍스트를 만들어낸다.

```js
function foo(something) {
  this.a = something;
}

var obj1 = {};

var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a); // 2

var baz = new bar(3);
console.log(obj1.a); // 2
console.log(baz.a); // 3
```

- `new`키워드 후에는 새로운 컨텍스트를 만들어냈다.

## API 호출

- 라이브러리나 헬퍼 오브겢느를 사용하고 전달된 콜백을 호출할 시에 this의 동작을 주의해야 한다.

```js
myObject = {
  myMethod: function() {
    helperObject.doSomethingCool("superCool", this.onSomethingCoolDone);
  },

  onSomethingCoolDone: function() {
    /// Only god knows what is "this" here
  }
};
```

- "this.onSomethingCoolDone"을 콜백으로 넘겼기 때문에 스코프가 그 메소드를 참조하고 있다고 생각할 수 있다.

```js
myObject = {
  myMethod: function() {
    helperObject.doSomethingCool("superCool", this.onSomethingCoolDone, this);
  },

  onSomethingCoolDone: function() {
    /// Now everybody know that "this" === myObject
  }
};
```

- 라이브러리가 제공하는 파라미터를 통해 다시 가져오길 원하는 스코프를 전달할 수 있다.

```js
myObject = {
  myMethod: function() {
    helperObject.doSomethingCool(
      "superCool",
      this.onSomethingCoolDone.bind(this)
    );
  },

  onSomethingCoolDone: function() {
    /// Now everybody know that "this" === myObject
  }
};
```

- 원하는 스코프를 하드 바인드 할 수 있다.

```js
myObject = {
  myMethod: function() {
    var me = this;

    helperObject.doSomethingCool("superCool", function() {
      /// Only god knows what is "this" here, but we have access to "me"
    });
  }
};
```

- 클로져를 만들고 `this`를 `me`에 캐시할 수 있다.
- 하지만 이것은 추천하지 않는다.

## call(), apply(), bind()

- 함수를 즉시 호출하기 위해서 `call()` / `apply()` 메소드를 사용할 수 있다.
- `bind()`는 함수가 나중에 실행됐을 때에도 원본 함수를 호출할 때 갖는 올바른(correct) 컨텍스트(this)가 bind 된 함수를 반환한다.

### `call()` 또는 `Function.prototype.call()`

```js
//Demo with javascript .call()

var obj = { name: "Niladri" };

var greeting = function(a, b, c) {
  return "welcome " + this.name + " to " + a + " " + b + " in " + c;
};

console.log(greeting.call(obj, "Newtown", "KOLKATA", "WB"));
// returns output as welcome Niladri to Newtown KOLKATA in WB
```

- `call()` 메소드의 첫 번째 파라미터는 함수가 호출되는 순간 `this` 오브젝트 값을 세팅한다. 이 경우 `obj`가 `this`의 오브젝트이다.

### `apply()` 또는 `Function.prototype.apply()`

```js
//Demo with javascript .apply()

var obj = { name: "Niladri" };

var greeting = function(a, b, c) {
  return "welcome " + this.name + " to " + a + " " + b + " in " + c;
};

// array of arguments to the actual function
var args = ["Newtown", "KOLKATA", "WB"];
console.log("Output using .apply() below ");
console.log(greeting.apply(obj, args));

/* The output will be 
  Output using .apply() below
 welcome Niladri to Newtown KOLKATA in WB */
```

- 첫번째 파라미터는 함수가 호출되는 순간 `this`의 값을 세팅한다.
- `obj`가 오브젝트이다.
- `apply()` 메소드가 `call()` 메소드와 유일하게 다른 점은 두 번째 파라미터에서 실제 함수의 인자 값을 배열로 받는다.

### `bind()` 또는 `Function.prototype.bind()`

```js
//Use .bind() javascript

var obj = { name: "Niladri" };

var greeting = function(a, b, c) {
  return "welcome " + this.name + " to " + a + " " + b + " in " + c;
};

//creates a bound function that has same body and parameters
var bound = greeting.bind(obj);

console.dir(bound); ///returns a function

console.log("Output using .bind() below ");

console.log(bound("Newtown", "KOLKATA", "WB")); //call the bound function

/* the output will be 
Output using .bind() below
welcome Niladri to Newtown KOLKATA in WB */
```

- context를 가진 나중에 호출될 bound 함수를 반환한다.
- `bind()` 메소드에 대한 첫 번째 파라미터는 bound 함수가 호출될 때 타겟 함수에서 `this`의 값을 세팅하는 부분이다.
- bound 함수가 `new` 연산자를 이용하여 생성됐을 때, 바인드 시킨 this의 값이 무시된다는 것을 알아두어야 한다.
