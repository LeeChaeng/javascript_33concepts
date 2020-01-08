# setTimeout, setInterval and requestAnimationFrame

- 10th concept of 33

**호출 스케줄링**이란 함수를 지금 당장 실행하지 않고 정확히 몇 초의 딜레이 후에 실행하고 싶을 때를 말한다.

- setTimeout은 일정 시간 간격 이후에 함수가 한 번 실행된다.
- setInterval은 일정 시간 간격으로 함수가 주기적으로 실행된다.

이 두 메소드들은 자바스크립트 스펙의 일부가 아니다. 대부분의 환경은 내부적인 스케줄러를 가지고 있고 이러한 메소드들을 제공한다. Node.js와 모든 브라우저에서 제공된다.

## setTimeout

문법 :

```js
let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...);
```

파라미터 :
`func|code`

- 실행을 위한 함수나 문자열이다. 주로 함수를 받는다. 히스토리적인 이유로, 코드의 문자열도 넘겨질 수 있지만 권장되지는 않는다.

`delay`

- 실행하기 전의 딜레이이다. ms 단위로 이루어져있다. (1000ms = 1s) 디폴트값은 0이다.

`arg1`, `arg2` ...
함수에 대한 인자(Arguments)들이다. (IE9 미만 버전에서 지원하지 않는다.)

```js
function sayHi() {
  alert("Hello");
}

setTimeout(sayHi, 1000);
```

- 1초 후에 `sayHi()`를 호출하는 코드이다.

```js
function sayHi(phrase, who) {
  alert(phrase + ", " + who);
}

setTimeout(sayHi, 1000, "Hello", "John"); // Hello, John
```

- 인자를 넘겨줄 수 있다.

```js
setTimeout("alert('Hello')", 1000);
```

- 첫 번째 인자에 문자열로 들어온 것을 자바스크립트는 그를 함수로 만든다.
- alert가 정상적으로 작동한다.

```js
setTimeout(() => alert("Hello"), 1000);
```

- 하지만 이렇게 사용하는 것을 권장한다.

```js
// Wrong!
setTimeout(sayHi(), 1000);
```

- **`()`로 실행하지 말자.**
- `()`를 사용하면 함수를 참조하는 것이 아닌 실행시키는 것이다.
- 그 실행의 결과가 `setTimeout`으로 전달된다.

## claeTimeout으로 취소하기

- `setTimeout`을 호출했을 때, 반환 값으로 우리가 실행을 취소하기 위해 사용할 수 있는 "timer identifier"인 `timerId`를 준다.

```js
let timerId = setTimeout(...);
clearTimeout(timerId);
```

- 이러한 문법으로 취소한다.

```js
let timerId = setTimeout(() => alert("never happens"), 1000);
alert(timerId); // timer identifier

clearTimeout(timerId);
alert(timerId); // same identifier (취소 이후에도 null이 되진 않습니다.)
```

- 함수를 스케줄링하고 그 후에 취소한다.
- 결과적으로 아무것도 일어나지 않는다.

브라우저 내부에서 timer identifier은 숫자이다. 다른 환경에서는 timer identifier가 숫자가 아닌 다른 것일 수 있다. 예를 들어 Node.js는 추가적인 메소드와 함께 timer object를 리턴한다.

## setInterval

```js
let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...);
```

- `setInterval`메소드는 `setTimeout`과 같은 문법을 가지고 있다.
- `setTimeout`과는 다르게 함수를 한번만 실행하는 것이 아니라 부여된 시간 간격 이후로 주기적으로 실행된다.
- 더이상 호출하는 것을 중지하고 싶다면, `clearInterval(timeId)`를 호출해야한다.

```js
// 2초마다 반복
let timerId = setInterval(() => alert("tick"), 2000);

// 5초 후에 정지
setTimeout(() => {
  clearInterval(timerId);
  alert("stop");
}, 5000);
```
- 2초마다 메시지를 보여준다. 5초 후에 출력이 중지된다.


## 재귀적인 setTimeout
```js
let timerId = setTimeout(function tick() {
  alert('tick');
  timerId = setTimeout(tick, 2000); // (*)
}, 2000);
```
- `setTimeout`은 현재 실행중인 것이 끝날 때 (`(*)`) 다음 호출을 바로 스케쥴합니다.
- 재귀적인 `setInterval`보다 더욱 유연하다. 이 방법에서는 다음 호출은 아마 때에 따라 다르게 스케쥴된다.

```js
let delay = 5000;

let timerId = setTimeout(function request() {
  ...요청 전송...

  if(서버 과부하 때문에 요청이 실패한다면...) {
    // 다음 실행까지 인터벌을 좀 늘리자..
    delay *= 2;
  }

  timerId = setTimeout(request, delay);

}, delay);
```
- 주기적으로 CPU 사용량이 많은 작업(CPU-hungry tasks)이 있다면, 실행에 걸린 시간을 측정하고 다음 호출을 더 일찍 할지 늦게 할지 계획할 수 있다.
- **재귀적인 `setTimeout`은 `setInterval`이 보장하지 못하는 실행간 딜레이를 보장할 수 있다.**
```js
let i = 1;
setInterval(function () {
  func(i);
}, 100);
```
- `setInterval` 사용

```js
let i = 1;
setTimeout(function run() {
  func(i);
  setTimeout(run, 100);
}, 100);
```
- `setTimeout` 사용


![image](https://user-images.githubusercontent.com/52696993/71969741-a24ac800-324a-11ea-8242-ec59bbe976d5.png)

- `setInterval`에서는 내부적인 스케줄러가 `func(i)`를 매 100ms 마다 실행할 것이다.
- **`func` 호출 사이의 진짜 딜레이는 코드에 기재된 것보다 적다.**
- `func`가 예상하는 것보다 더 길게 실행되어 100ms의 시간보다 더 걸리는 것도 가능하다.


![image](https://user-images.githubusercontent.com/52696993/71969916-f81f7000-324a-11ea-9aa9-a3c9e3e77694.png)
- **재귀적인 `setTimeout`은 고정된 딜레이를 보장한다. **
- 새로운 호출이 이전 호출의 끝에 계획되기 때문이다.

> Gabage Collection
> 함수가 `setInterval` 혹은 `setTimeout`에 넘겨졌을 때, 그것을 가리키는 내부적인 레퍼런스가 만들어지고 스케줄러에 저장된다. 이것은 만일, 함수에 별다른 참조가 없더라도 함수가 garbage collect 되는 것을 막아준다.
```js 
// 스케쥴러 호출 시까지, 함수는 메모리에 머무릅니다. 
setTimeout(function() {...}, 100);
```
> `setInterval`의 경우에는, `clearInterval`이 호출될 때까지 함수는 메모리에 머문다.
> side-effect도 있다. 한 함수가 lexical 환경 바깥을 참조한다. 그래서, 이 함수가 살아있는 동안, 바깥의 변수들도 마찬가지로 살아있다. 변수들은 아마 함수 자체보다 더 많은 메모리를 소비할 것이다. 그래서 우리가 스케쥴된 함수가 더 이상 필요하지 않을 때는 아주 작은 함수라고 할지라도 cancel 시켜주는 것이 좋다.

## setTimeout(..., 0)
```js
setTimeout(() => alert("World"));

alert("Hello");
```
- "Hello"를 출력한 후 즉시 "world"를 출력한다.

## CPU 소비가 많은 작업을 Splitting 하기
```js
let i = 0;

let start = Date.now();

function count() {

  // 무거운 작업을 하자
  for (let j = 0; j < 1e9; j++) {
    i++;
  }

  alert("Done in " + (Date.now() - start) + 'ms');
}

count();
```
- 이 작업을 `setTimeout`을 이용하여 작업을 Split 한다.

```js
let i = 0;
let start = Date.now();

function count() {
  // 약간의 무거운 작업을 해봅시다. (*)
  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done in " + (Date.now() - start) + 'ms');
  } else {
    setTimeout(count); // 호출을 스케쥴링합니다. (**) 
  }
}

count();
```
