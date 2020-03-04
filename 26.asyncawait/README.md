# async/await

- 26th concept of 33

## Async 함수

`async` 키워드의 사용법을 알아보자. 이 키워드는 function 앞에 올 수 있다. 다음과 같다.

```js
async function f() {
  return 1;
}
```

함수 전에 "async"라는 단어가 의미하는 것은 간단하다. promise를 반환하는 함수라는 뜻이다. 심지어 만일 함수가 실제로 promise가 아닌 값을 반환해도, "async" 키워드로 정의된 함수는 자바스크립트에서 자동으로 그 값을 resolve promise로 감싸라고 지시한다.

예를 들면, 위에 우리가 작성했던 코드는 `1` 이라는 결과 값의 resolved promise를 반환한다.

```js
async function f() {
  return 1;
}

f().then(alert); // 1
```

우리는 명시적으로 promise를 반환할 수도 있다. 아래의 코드도 같은 결과를 출력한다.

```js
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

`async`는 함수가 promise를 리턴하는 것을 보장해준다. 그리고 promise가 아닌 것을 리턴햇을 때는 promise로 감싸서 resolve promise를 반환하는 것을 확인했다. 또 다른 키워드 `await`가 있다. 이 키워드는 오직 `async` 키워드가 붙은 함수와 함께 동작한다.

## Await

문법은 다음과 같다.

```js
// 오직 async 함수 내부에서만 동작합니다.
let value = await promise;
```

키워드 `await`는 자바스크립트가 promise가 작업 이후 결과 값을 리턴할 때까지 잠시 기다리게 만든다.

1초 후에 resolve하는 promise의 예제를 보자

```js
async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000);
  });

  let result = await promise; // promise가 resolve될 때까지 기다립니다 (*)

  alert(result); // 끝입니다!
}

f();
```

함수 실행이 `(*)`의 라인에서 잠시 멈춘다. 그리고 promise가 완료 되었을때, `result`에서는 promise의 결과 값이 할당된다. 그래서 위의 코드에서 1초 후에 done이라는 메시지가 출력되는 이유이다.

다음의 내용을 잘 기억하자. `await`는 말 그대로 자바스크립트가 promise가 끝날 때까지 기다리게 만드는 것이다. 그 후에 promise의 결과 값을 갖고 다음 부분을 진행하자. 이 과정은 어떠한 CPU 리소스도 소모하지 않는다. 왜냐하면 엔진이 그 동안 다른 일을 할 수 있기 때문이다. 다른 스크립트를 실행하고 이벤트를 다루는 등의 일을 한다.

이 문법은 promise의 결과를 받고 `promise.then`을 사용하는 것보다 더 나은 문법이다. 읽기도 더 쉽고 작성하기도 더 쉽다.

> 일반적인 함수에서는 `await`를 사용할 수 없다!

비동기 함수에서 `await`를 사용하려 시도하면, 문법 에러가 발생한다.

```js
function f() {
  let promise = Promise.resolve(1);
  let result = await promise; // Syntax error
}
```

함수 앞에 `async`라는 키워드를 붙여주지 않는다면, 우리는 이러한 에러를 받게 될 것이다. 말했던 것처럼 `await`는 오직 `async function` 내부에서만 작동한다.

`showAvatar()` 예제를 보자. 이 예제는 Promise Chaining이라는 챕터에서 가져왓다. 그리고 우리는 이 예제를 `async/await`를 이용하여 다시 작성 할 것이다.

기존의 소스는 아래와 같은 형태였다.

```js
fetch("/article/promise-chaining/user.json")
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(
    githubUser =>
      new Promise(function(resolve, reject) {
        let img = document.createElement("img");
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
          img.remove();
          resolve(githubUser);
        }, 3000);
      })
  )
  // triggers after 3 seconds
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
```

1. 우리는 `.then`을 `await`로 대체할 것이다.
2. `await`를 쓰기 위해 함수에 `async`를 붙여준다.

```js
async function showAvatar() {
  // read our JSON
  let response = await fetch("/article/promise-chaining/user.json");
  let user = await response.join();

  // read github user
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // show the avatar
  let img = document.createElement("img");
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // wait 3 seconds
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

이전보다 깔끔하고 읽기 쉬워졌다.

> `await`는 최상위 수준(top-level) 코드에서 작동하지 않는다.

`await`를 이제 막 쓰기 시작한 사람들은 `await`를 최상위 수준(top-level) 코드에서 사용할 수 없다는 사실을 종종 잊는 경향이 있다.

예를 들면 다음과 같은 코드는 작동하지 않는다.

```js
// syntax error in 최상위 수준(top-level) code
let response = await fetch("/article/promise-chaining/user.json");
let user = await response.json();
```

우린 위의 코드를 익명 async 함수 안에 감쌀 수 있다. 다음과 같이

```js
(async () => {
  let response = await fetch("/article/promise-chaining/user.json");
  let user = await response.json();
})();
```

> `await`는 "thenable"을 받는다.

`promise.then` 처럼 `await`는 thenable 오브젝트(`.then` 메소드 호출이 가능한 메소드)를 사용한다. 제 3 오브젝트는 Promise가 아닐 수도 있다는 것이다. Promise와 호환 가능하면: 만일 `.then` 메소드를 지원만 한다면, `await`과 함께 사용할 수 있는 것이다.

여기 데모 `Thenable` 클래스가 있다. 아래의 `await`는 `Thenable`의 인스턴스를 받는다.

```js
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // 1초 후에 입력된 숫자의 2배의 값과 함께 resolve됩니다.
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // waits for 1 second, then result becomes 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```

`await`이 `.then` 메소드를 가진 promise가 아닌 오브젝트를 받았을 때, `await`는 native 함수인 `resolve`, `reject`를 인자로 `.then` 메소드를 호출한다. 그 후에 `await`는 둘 중 하나가 호출될 때까지 기다린다. (이 예제에서는 `(*)`이 적혀있는 라인에서 그 일이 일어나게 된다.)

> Async 메소드

Async 클래스 메소드를 선언하기 위해서 할 일은, 그냥 `async`라는 키워드를 앞에 붙이면 된다.

```js
class Waiter {
  async wait() {
    return await Promise.resolve(1);
  }
}

new Waiter().wait().then(alert); // 1
```

결국 의미하는 바는 같다. 이 클래스는 반환되는 값이 promise이며 `await`를 사용 가능하게 보장한다.

### 에러 핸들링

만일 promise가 일반적으로 resolve 하다면, `awiat promise`는 결과를 반환한다. 하지만 rejection이 된 경우 promise는 에러를 내뱉게 된다. 코드 라인에 `throw`가 있는 것 처럼 말이다.

다음 코드는

```js
async function f() {
  await Promise.reject(new Error("Whoops!"));
}
```

아래 코드와 같다

```js
async function f() {
  throw new Error("Whoops!");
}
```

실제 상황에서, promise는 reject 당하기 전 약간의 시간을 소모할 수도 있다. 그래서 `awiat`는 대기할 것이다. 그리고 그 이후 에러를 `throw`하게 될 것이다.

우리는 그 에러를 `try...catch`문을 이용하여 잡아낼 수 있다. 일반적인 `throw`와 동일하다.

```js
async function f() {
  try {
    let response = await fetch("http://no-such-url");
  } catch (err) {
    alert(err); // TypeError: failed to fatch
  }
}

f();
```

에러의 경우, 제어가 `catch` 블록으로 넘어간다. 우리는 `try...catch`를 통해 감싸줄 수 있다. 일반적인 `throw`와 동일하다.

```js
async function f() {
  try {
    let response = await fetch("http://no-such-url");
  } catch (err) {
    alert(err); // TypeError: failed to fatch
  }
}

f();
```

에러의 경우, 제어가 `catch` 블록으로 넘어간다. 우리는 `try...catch`를 통해 감싸줄 수 있다.

```js
async function f() {
  try {
    let response = await fetch("/no-user-here");
    let user = await response.json();
  } catch (err) {
    // catches errors both in fetch and response.json
    alert(err);
  }
}
```

만일 우리에게 `try...catch`문이 없었다면 비동기 함수 `f()`의 호출에 의해 생성된 promise는 그냥 reject 될 것이다. 우리는 그러한 흐름을 제어하기 위해 `.catch`를 붙일 수 있다.

```js
async function f() {
  let response = await fetch("http://no-such-url");
}

// f() becomes a rejected promise
f().catch(alert); // TypeError: failed to fetch // (*)
```

만일 우리가 `.catch`를 거기에 추가하는 것을 잊었다면, 우리는 제대로 제어되지 않는 promise 에러를 갖게 되는 것이다. (콘솔에서 볼 수 있다.) 전역 이벤트 핸들러를 사용하여 이러한 에러를 잡아낼 수 있다.

> `async/await` 그리고 `promise.then/catch`

우리가 `async/await`를 사용할 때, 우리는 간혹 `.then`이 필요하다. 왜냐하면 `await`는 우리를 위한 작업 대기를 처리한다. 그리고 우리는 `.catch` 대신에 일반적인 `try...catch` 구문을 사용할 수 있다. 항상은 아닐지라도 일반적인 구문을 사용하는 것이 편리한 경우가 더 많다.

> `async/await`는 `Promise.all`과 잘 작동한다.

다수의 promise를 기다려야 할 필요가 있을 때, 우리는 그것들을 `Promise.all`로 묶어주고 `await`를 걸 수 있다.
소스코드는 다음과 같이 나올 것이다.

```js
// 배열의 결과를 기다립니다.
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

에러가 난 경우에는, 일반적인 케이스와 같이 전파된다. 실패한 promise에서 `Promise.all`로 넘기고, 우리가 `try...catch`를 이용하여 캐치할 수 있는 예외가 된다.

## 요약

함수 전의 `async` 키워드는 2가지 효과를 갖는다.

1. 언제나 promise를 반환한다.
2. 함수 내부에서 await를 사용할 수 있게 해준다.

promise 앞의 `await` 키워드는 자바스크립트가 해당 promise가 끝날 때까지 잠시 기다리게 한다. 그리고

1. 에러가 발생한 경우, 예외가 만들어지고, 그 자리에서 throw error가 호출된 것처럼 동작한다.
2. 에러가 발생하지 않았따면, 결과를 반환한다. 그래서 우리가 그 결과 값을 변수에 넣을 수 있다.

`async/await`는 읽기 쉽고 쓰기 쉬운 비동기 코드를 작성하는데 좋은 프레임워크이다.

`async/await`와 함께, 우리는 가끔 `promise.then/catch`를 작성할 필요가 있다. 하지만 우리는 여전히 그들이 promise기반이라는 것을 잊어서는 안된다. 왜냐하면 때때로 우리는 그 메소드들을 써야한다. 또한 `Promise.all`은 여러 작업을 일제히 기다리는데 사용하기 매우 좋은 문법이다.

### 1. async/await를 이용하여 재작성하기

아래 예제는 Promise Chaining의 예제이다. `.then/catch` 대신에 `async/await`를 이용하여 재작성하자.

```js
function loadJson(url) {
  return fetch(url).then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw Error(response.status);
    }
  });
}

loadJson("no-such-user.json").catch(alert); // Error: 404

async function loadJson(url) {
  // (1)
  let response = await fetch(url); // (2)

  if (response.status === 200) {
    return response.json(); // (3)
  }

  throw new Error(response.status);
}

loadJson("no-such-user.json").catch(alert); // Error : 404 (4)
```
