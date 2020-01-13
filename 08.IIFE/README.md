# 8. IIFE, Modules and Namespaces

- 8th concept of 33

## IIFE (Immediately-invoked Function Expression)

- 자바스크립트 함수와 함께 사용되는 코딩 패턴 중 하나

## 자연스러운 함수 정의

```js
function sayHi() {
  alert("Hello, World!");
}

sayHi();
```

- 이렇게 함수를 생성하는 방법은 "a function definition" or "a function declaration" or "a function statement" 라고 함

## 함수 표현식

```js
var msg = "Hello, World!";
var sayHi = function() {
  alert(msg);
};

sayHi(); // 브라우저에서 "Hello, World!"라는 alert 메시지를 띄웁니다.
```

1. 1번째 줄은 `msg` 변수를 선언하고 `string` 값을 할당한다.
2. 2~4번째 줄은 `sayHi`변수를 선언하고 `function` 타입의 값을 할당한다.
3. 6번째 줄은 `sayHi`함수를 호출한다.

> 2~4번째 줄에서는 함수 타입의 값을 `sayHi`라는 변수에 할당했다.

## 익명 함수 표현식

- 위의 예제가 익명함수 표현식이다.
- **function** 키워드 뒤에 이름이 붙지 않기 때문에 익명함수이다.

## Named 함수 표현식

```js
var fibo = function fibonacci() {
  // 여기서 fibonacci() 함수를 호출할 수 있습니다.
  // 이 함수 표현식이 이름을 갖고 있기 때문입니다.
};

// 여기서 fibonacci()를 호출하면 실패합니다. 하지만 fibo()는 동작합니다.
```

- 여기서 차이점은 함수 표현식이 `fibonacci`라는 이름을 가졌다는 것이다.
- 이름을 가졌기 때문에 `fibonacci`함수 내부에서 자신을 재귀적으로 호출할 수 있따.

## IIFE

```js
!(function() {
  alert("Hello from IIFE!");
})();
// "Hello from IIFE" 메시지를 보여줍니다.
```

> 이 함수는 생명을 갖자마자 바로 사라진다.

- 함수 statement는 언제나 function 이라는 키워드로 시작한다.
- 자바스크립트가 유효한 statement에서 첫 단어로 function 키워드를 볼때마다 자바스크립트는 함수 정의가 일어날 것이라고 예측한다.
- 그렇지 않게 하기 위해 우리는 첫번째 줄 function 앞에 `!`을 붙여준다.
- 이렇게 하면 자바스크립트는 `!` 뒤에 온게 무엇이든지 표현식으로 다루게 된다.

> 생기자마자 바로 호출되는 함수 표현식 IIFE

- `!` 이외에도 `+`,`-`등등 다양한 방식으로 작성해도 같은 결과를 보인다. 1진 연산자면 아무거나 이용해도 된다.

> `!`는 작성한 함수가 정의되지 않게 표현식으로 만들고 즉시 실행된다.

```js
void (function() {
  alert("Hello from IIFE!");
})();
```

- void는 함수를 식으로 다뤄지게 강제한다.
- IIFE에서 반환 값이 필요 없을 때 위의 패턴들은 실용적이다.

## 클래식한 IIFE 스타일

```js
(function() {
  alert("I am not an IIFE yet!");
});
```

- 1~3번째 줄에서 함수 식이 괄호로 감싸져 있다.
- 위의 함수는 실행되지 않았기 때문에 아직 IIFE가 아니다.

> IIFE 로 바꾸기 위해 두가지의 문체를 사용한다.

```js
// 문체 1
(function() {
  alert("I am an IIFE!");
})();

// 문체 2
(function() {
  alert("I am an IIFE, too!");
})();
```

1. 첫번째 문체 4번째 줄에서, 함수 식을 호출하기 위한 ()괄호는 바깥 괄호 안에 포함된다. 다시 바깥 괄호가 바깥 함수를 함수식으로 만들기 위해서 필요하다.
2. 두번째 문체 4번째 줄에서, 함수 식을 호출하기 위한 ()괄호는 함수 표현식을 위해 감싸는 괄호 밖에 있다.

```js
// 유효한 IIFE
(function initGameIIFE() {
  // All your magical code to initialize the game!
}());

// 유효하지 않은 IIFE
function nonWorkingIIFE() {
    // 이제 왜 앞뒤로 괄호가 필요한지 알게 될 것입니다.
    // 괄호 없이는 그냥 함수 정의입니다. 표현식이 아닙니다.
    // 문법 에러가 날 것입니다.
}();

function () {
    // 여기서도 문법 에러가 날 것입니다.
}();
```

> IIFE를 구성하기 위해서는 함수 표현식이 필요하다. 함수 statement나 정의는 IIFE를 만드는데 절대 이용될 수 없다.

## IIFE와 private 변수

- IIFE에서 좋은 점은 IIFE를 위한 함수 스코프를 만드는 능력이다.
  > IIFE 내부에 정의된 어떠한 변수라도 스코프 밖에서는 보이지 않는다.

```js
(function IIFE_initGame() {
  // IIFE 밖에서는 접근할 수 없는 Private 변수들입니다.
  var lives;
  var weapons;

  init();

  // IIFE 밖에서는 접근할 수 없는 Private 함수입니다.
  function init() {
    lives = 5;
    weapons = 10;
  }
})();
```
- IIFE 내부의 2개의 변수는 IIFE에 private하다.
- init 함수에서는 바깥 변수에 접근이 가능하다.

> 코드 바깥에서는 사용하지 않는 많은 변수와 함수들을 전역에 만들때마다, 변수와 함수들 모두 IIFE로 감싸면 좋은 자바스크립트 카르마를 얻는다. 


## 값을 리턴하는 IIFE
- IIFE로부터 반환 값이 필요하지 않다면 그냥 단항 연산자를 이용해서 IIFE를 계속 사용할 수 있다.

```js
var result = (function () {
  return "From IIFE";
}());

alert(result); // "From IIFE" 메시지를 출력합니다.
```
- 변수에 할당 될 수 있는 값을 리턴할 수 있다.

1. 2번째 줄에서 statement를 반환하는 IIFE를 갖는다.
2. 5번째 줄은 IIFE에서 반환된 값과 함께 alert 메시지를 보여준다.

- IIFE는 즉시 실행되며 반환된 값은 result 변수에 할당된다.

## 파라미터가 있는 IIFE
- IIFE는 값을 리턴할 수 있을 뿐만 아니라, 호출될 때 인자를 받을 수도 있다.

```js
(function IIFE(msg, times) {
  for (var i=1; i<=times; i++){
    console.log(msg);  
  }
}("Hello!", 5));
```

1. IIFE는 `msg`, `times` 각각 두 개의 파라미터를 갖는다. 
2. 여태까지 사용했던 빈 괄호() 대신에 인자를 IIFE로 넘긴다.
3. 이 파라미터를 IIFE 내부에서 사용이 가능하다.

```js
(function($, global, document) {
  // jQuery를 위해 $를 사용하고, window를 위해 global을 사용합니다.
}(jQuery, window, document));
```
1. 자바스크립트는 항상 현재 함수의 스코프로부터 식별자(ID)를 찾을 때까지 계속 더 높은 레벨의 스코프로 올라가며 식별자를 찾아다닌다. document를 넘겼을 때가, document에 대한 로컬 스코프를 너머 스코프 탐색을 하는 유일한 때이다. IIFE에서 doucment로의 어떤 참조도 IIFE의 로컬 스코프 밖에서 찾아질 필요가 없다. jQery에도 동일하게 적용된다. IIFE 코드가 간단한지 복잡한지에 기반하여 얻어지는 성능향상을 크지 않지만 좋은 트릭이다.

2. 자바스크립트 축소기는 안전하게 함수 안에 선언된 파라미터의 이름을 축소할 수 있다. 우리가 만일 이러한 파라미터를 넘기지 않는다면 축소기는 document나 jQuery에 대한 직접적인 참조를 축소할 수 없다. 왜냐면 함수 스코프 밖에 있기 때문이다.

--> 잘 이해가 안됨.


## 클래식한 자바스크립트 모듈 패턴
```js
var Sequence = (function sequenceIIFE() {
  // 현재 counter 값을 저장하기 위한 Private 변수입니다.
  var current = 0;

  // IIFE에서 반환되는 객체입니다.
  return {
  };

}());

alert(typeof Sequence); // alert("Object");
```
1. 객체를 반환하는 IIFE를 생성한다.
2. IIFE 내부에 `current`라는 이름을 갖는 지역변수를 생성한다.
3. IIFE의 반환 값인 객체는 `Sequence`라는 변수에 할당된다. 
4. 12 번째 줄에서는 우리가 IIFE에서 반환한 "object" 메시지를 올바르게 출력한다.

```js
var Sequence = (function sequenceIIFE() {

  // 현재 counter 값을 저장하기 위한 Private 변수
  var current = 0;

  // IIFE로 부터 반환 받는 객체
  return {
    getCurrentValue: function() {
      return current;  
    },

    getNextValue: function() {
      current = current + 1;
      return current;
    }
  };

}());

console.log(Sequence.getNextValue()); // 1
console.log(Sequence.getNextValue()); // 2
console.log(Sequence.getCurrentValue()); // 2
```
1. IIFE가 리턴하는 객체에 2가지 함수를 추가했다.
2. 8~10번째 줄은 `current`변수가 가진 값을 반환하는 `getCurrentValue`함수를 추가했다.
3. 12~15 번째 줄은 `current` 변수를 1 증가시키고 반환하는 `getNextValue` 함수를 추가했다.

`current`변수가 IIFE 에서 private하기 때문에, 클로져를 통해 여기에 접근할 수 있는 함수 말고는 누구도 `current`변수의 값에 접근하거나 그 값을 수정할 수 없다.


# 마치며
- 이해가 잘 가지 않는 IIFE 개념이라 그냥 내 나름대로 요약을 해보았다. 

> IIFE란 쉽게 말해 누군가에게 variable을 주고 싶고, 실행을 하고 싶지만 누군가가 나의 값을 변하지 못하게 만들고자 하는 것이다.

```js
(function() {
  //code, variable change
})()
```
- 기본적으로 이렇게 사용하지만

```js
(() => {
  //code, variable change
})()

```
- 이게 조금 더 멋있다


## +import & export
- 브라우저에서는 웹팩 등 모듈 번들러 없이 파일을 합칠 수 없다.
- 두개의 파일을 브라우저에서 합치고 싶다면 import와 export error가 발생한다.
```html
<script type="module" src="./app.js"></script>
```
- 이렇게 사용해주면 export & import 에러는 더 이상 나타나지 않는다.
