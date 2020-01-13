# 1. Call Stack

- first concept of 33
- 자바스크립트가 함수의 실행을 핸들링하는 방법 중에 하나이다.
- 함수의 호출을 기록하는 자료구조이다.

```js
function three() {
  console.log("It's my first step");
}
function two() {
  three();
}
function one() {
  two();
}
function zero() {
  one();
}
zero();
```

- 위의 코드에서 살펴본다면 `zero()`는 `one()`을 호출하고 `one()`은 `two()`를 `two()`는 `three()`를 호출한다.
  ![image](https://user-images.githubusercontent.com/52696993/71347480-d4eb9400-25ad-11ea-9d04-d3c0355b0231.png)

- 위의 그림과 같이 `zero()`부터 `console.log()`까지 call stack에 들어가게 된다.

```js
function three() {
  console.log("It's my first step");
}
function two() {
  three();
}
function one() {
  two();
}
function zero() {
  one();
  throw Error("I am an error");
}
zero();
```

![image](https://user-images.githubusercontent.com/52696993/71347980-e1bcb780-25ae-11ea-8fec-b35a586a5073.png)

- 위와 같이 `zero() -> one() -> two() -> three() -> console.log() -> three() End -> two() End -> one() 's throw Error()` 순으로 처리가 되게 된다.
