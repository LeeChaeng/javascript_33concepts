# 9. Message Queue and Event Loop

- 9th concept of 33

> "어떻게 자바스크립트는 싱글 스레드이면서 비동기인걸까?"

- 자바스크립트의 비동기 행위들은 엄밀히 말하면 자바스크립트 언어 그 자체의 일부분은 아니다.

## 기본 아키텍쳐

![image](https://user-images.githubusercontent.com/52696993/71885370-98a75e80-317d-11ea-8d65-dcd9dd63e369.png)

- **힙 영역** : 대규모이면서 대부분 구조화되지 않은 메모리 영역인 힙 영역 내부에 객체가 할당된다.
- **스택 영역** : 자바스크립트 코드 실행을 위해 제공된 싱글 스레드를 나타낸다. 함수 호출은 frame의 스택을 구성한다.
- **브라우저 또는 웹 API** : 브라우저 내부에 구성된다. 브라우저 또는 주변 컴퓨터 환경으로부터 데이터를 노출시킬 수 있고 이것을 통해 유용하지만 복잡한 것들을 할 수 있다. 자바스크립트 언어 그 자체라고 볼 수는 없고 자바스크립트 언어 코어 단의 상위에 만들어져, 우리가 자바스크립트 코드 사용 시에 추가적인 초능력(superpowers)을 제공한다.

## 코드 1

```js
function main() {
  console.log("A");
  setTimeout(function display() {
    console.log("B");
  }, 0);
  console.log("C");
}

main();
// 출력
// A
// C
// B
```

![image](https://user-images.githubusercontent.com/52696993/71885899-a4475500-317e-11ea-928e-0c97b93d3695.png)

1. 메인 함수 호출이 먼저 프레임으로 stack에 push 된다. 후에 브라우저가 메인 함수의 첫 번째 statement(`console.log('A')`)를 stack에 넣는다. 이 statement가 실행되고 완료되자마자 해당 프레임은 스택에서 `pop`된다. 알파벳 A가 콘솔에 표기된다.

2. 다음 statement(콜백 `display()`과 함께 0ms의 딜레이를 가진 `setTimeout()`)가 콜스텍으로 `push`되고 실행된다. `setTimeout`함수는 제공된 콜백을 딜레이 하기 위해 브라우저 API를 사용한다. 타이머를 돌리기 위해 콜백이 브라우저로 넘어가면 `setTimeout()`을 가진 프레임은 `pop` 된다.

3. 브라우저에서 `display()` 실행을 위한 타이머가 돌아가는 도중에 `console.log('C')`가 콜스택에 `push`된다. 이러한 경우에 제공된 딜레이는 0ms 였기 때문에, 콜백은 브라우저가 콜백을 받자마자 메시지 큐에 바로 추가된다. (이상적인 경우)

4. 메인 함수에서 마지막 statement의 실행 후에 `main()` 프레임은 콜스택 밖으로 `pop`된다. 그러면서 콜스택은 빈(empty)상태가 된다. 브라우저가 어떤 메시지를 큐에서 콜스택으로 `push`하기 위해서는 먼저 콜스택을 반드시 비워야한다. 이게 `setTimeout()`의 딜레이가 0초였음에도 불구하고, `display()`으로의 콜백이 콜스택에 존재했던 모든 프레임이 실행될 때까지 기다려야했던 이유이다.

5. 이제야 콜백 `display()`이 콜스택에 푸시되고 실행된다. 그 다음 알파벳 C가 콘솔에 나타난다.

> `setTimeout(function, delayTime)에 들어가는 delay 파라미터는 어떤 함수가 실행된 뒤에 정확한 시간 딜레이를 말하는 것이 아니다. delay 파라미터는 함수가 실행 됐을 때 어떤 지점 이후의 최초 대기시간을 의미하는 것이다.

## 코드 2

```js
function main() {
  console.log("A");
  setTimeout(function exec() {
    console.log("B");
  }, 0);
  runWhileLoopForNSeconds(3);
  console.log("C");
}

main();

function runWhileLoopForNSeconds(sec) {
  let start = Date.now(),
    now = start;
  while (now - start < sec * 1000) {
    now = Date.now();
  }
}

// Output
// A
// C
// B
```

![image](https://user-images.githubusercontent.com/52696993/71890793-6a7b4c00-3188-11ea-945a-b68f08a0281d.png)

- 함수 `runWhileLoopForSeconds()`는 함수가 호출된 시간에서 경과된 시간을 계속 측정하여 경과된 시간이 함수의 인자로 받은 시간과 일치하는지 계속해서 검증한다. 기억해야할 메인 포인트는 while 반복문이 콜스택에서 상주하면서 브라우저 API를 사용하지 못하게 하는 blocking statement 라는 것이다. 이 함수는 실행이 끝날때까지 뒤에 오는 모든 statements들이 실행되지 못하게 막는다.
- 위의 코드에서 비록 `setTimeout`은 0초의 딜레이를 가지고 while 반복문은 3초간 실행되더라도, `exec()` 콜백은 메시지 큐에 갇혀있다. while 반복문은 3초가 지날때까지 콜스택 위에서 계속 실행된다. 3초가 지나 콜스택이 비게 되는 순간에 `exec()` 콜백은 콜스택으로 들어와서 실행된다.
- `setTimeout()`의 딜레이 인자는 실행이 시작되는 타이밍을 보장해주는 것이 아니다. 최소한 얼마정도 있다가 실행되라는 정도의 의미로 보는 것이 맞다.
