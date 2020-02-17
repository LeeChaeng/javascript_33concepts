# Promises

- 25th concept of 33

## Promise 이해하기

Promise는 요약하자면 다음과 같다

"여러분이 아이라고 상상해보자. 여러분의 어머니가 새로운 스마트폰을 다음 주에 사주기로 약속한다"

여러분은 다음 주에 정말로 새로운 스마트폰을 가질 수 있을 지 알 수 없다. 어머니는 진짜로 새로운 스마트폰을 사줄 수도 있고 만일 기분이 좋지 않다면 약속을 어기고 스마트폰을 사주는 것을 잠시 보류할 수도 있다.

이게 바로 **Promise** 이다. Promise는 3가지 상태를 가진다.

1. Pending(미결) : 새로운 스마트폰을 가질 수 있을 지 알 수 없다.
2. Fullfilled(이행) : 어머니의 기분이 괜찮아서 스마트폰을 사줬다.
3. Rejected(거절) : 어머니가 기분이 괜찮지만 스마트폰은 사주지 않기로 했다.

## Promise 만들기

위에서 이해한 내용을 자바스크립트 코드로 만들어보자

```js
// ES 5 //
var isMomHappy = false;

// Promise
var willIGetNewPhone = new Promise(function(resolve, reject) {
  if (isMomHappy) {
    var phone = {
      brand: "Samsung",
      color: "black"
    };
    resolve(phone); //fulfilled
  } else {
    var reason = new Error("mom is not happy");
    reject(reason); //reject
  }
});
```

코드만 봐도 대략 무슨 내용인지 알기 쉽다.

```js
// promise의 문법은 대략 다음과 같이 생겼습니다.
new Promise(/_ executor _/ function (resolve, reject) { ... });
```

## Promise 사용하기

이제 Promise를 만들어보았으니, 사용해보자

```js
// ES 5 //
...

// Promise 호출
var askMom = function () {
  willGetNewPhone
    .then(function (fulfilled) {
      // 와! 새 폰을 얻었다!
      console.log(fulfilled);
    // output: { brand: 'Samsung', color: 'black' }
    })
    .catch(function (error) {
      // 이런. 엄마가 폰을 안사주네..
      console.log(error.message);
    // output: 'mom is not happy'
    });
}
```

예제를 실행해보고 결과를 보자

## Promise 연계(Chaining) 하기

Promise는 연계가능 (Chainable)하다.

여러분은 아이이다. 새로운 스마트폰을 사면 친구들에게 보여주기로 약속했다고 생각해보자

새로운 Promise를 작성해보자

```js
// 2nd promise
var showOff = function (phone) {
  return new Promsie(
    function (resolve, reject) {
      var message = 'Hey friend, I have a new ' +
          phone.color + ' ' + phone.brand + ' phone';

      resolve(message);
    };
  );
};
```

더 짧게 작성하면 다음과 같다.

```js
// 2nd promise
var showOff = function(phone) {
  var message =
    "Hey friend, I have a new " + phone.color + " " + phone.brand + " phone";

  return Promise.resolve(message);
};
```

이제 Promise를 연계해보자. `willGetNewPhone` Promise를 수행한 이후에만 `showOff` Promise를 수행할 수 있다.

```js
// call our promise
var askMom = function() {
  willGetNewPhone
    .then(showOff) // 여기서 연계합니다.
    .then(function(fulfilled) {
      console.log(fulfilleded);
      // output: 'Hey friend, I have a new black Samsung phone.'
    })
    .catch(function(error) {
      // oops, mom don't buy it
      console.log(error.message);
      // output: 'mom is not happy'
    });
};
```

Promise를 연계하는 것은 이렇게 쉽다.

## Promise는 비동기(Asynchronous)다

Promise는 비동기이다. Promise를 호출한 전과 이후의 메시지를 로깅해보자

```js
var askMom = function() {
  console.log("before asking Mom"); // log before
  willGetNewPhone
    .then(showOff)
    .then(function(fulfilled) {
      console.log(fulfilled);
    })
    .catch(function(error) {
      console.log(error.message);
    });
  console.log("after asking Mom");
};
```

출력 순서가 어떻게 될까?

아마 다음과 같을 수 있을 것이다.

```
1. before asking mom
2. Hey friend, I have a new black Samsung phone.
3. after asking mom
```

하지만 실제 출력은 다음과 같이 이루어진다.

```
1. before asking mom
2. after asking mom
3. Hey friend, I have a new black Samsung phone.
```

### 왜냐 ? JS는 누구도 기다려주지 않는다.

여러분도 어머니가 새로운 스마트폰을 사준다는 약속을 계속 기다리기만 하진 않을 것이다. 그 동안 밖에 나가서 뛰어 놀기도 하고 그럴 것이다. 그게 우리가 말하는 비동기(Asynchronous)이다. 코드는 어떠한 방해나 결과에 대한 기다림 없이 돌아갈 것이다. Promise는 오직 코드가 흘러가길 기다릴 뿐이다. 여러분은 `.then`을 작성하여 코드가 흘러갔을 때 추가적으로 해야할 일을 코딩할 수 있다.

## ES5, ES6/2015, ES7에서의 Promise

### ES5 - 주류 브라우저들

위에 작성했던 데모 코드들은 만일 여러분들이 Bluebird Promise 라이브러리만 설치했다면 ES5 환경(모든 주류 브라우저 + node.js 환경을 말한다.)에서 돌아간다. ES5 자체적으로는 Promise를 지원하지 않는다.

### ES6 / ES2015 - 현대 브라우저들과 NodeJS v6

위의 작성했던 데모 코드들이 라이브러리 없이도 작동한다. 왜냐하면 ES6는 Promise를 네이티브하게 지원하기 때문이다. 추가로 ES6 함수들과 함께라면 화살표 함수를 이용하여 코드를 훨씬 더 간단히 만들 수 있다. 그리고 `const`나 `let`과 같은 선언문으로 변수 선언도 가능하다.

ES6의 코드 예제

```js
// ES 6 //
const isMomHappy = true;

// Promise
const willGetNewPhone = new Promise((resolve, reject) => {
  // 화살표 함수
  if (isMomHappy) {
    const phone = {
      brand: "Samsung",
      color: "black"
    };
    resolve(phone);
  } else {
    const reason = new Error("mom is not happy");
    reject(reason);
  }
});

const showOff = function(phone) {
  const message =
    "Hey friend, I have a new " + phone.color + " " + phone.brand + " phone";
  return Promise.resolve(message);
};

// call our promise
const askMom = function() {
  willGetNewPhone
    .then(showOff)
    .then(fulfilled => console.log(fulfilled))
    .catch(error => console.log(error));
};

askMom();
```

### ES7 - Async Await이 문법을 더 예쁘게 만들어준다.

ES7은 `async`와 `await` 문법을 도입했다. 두 가지 문법은 비동기 문법을 더 예쁘고 이해하기 쉽게 만들어준다. 심지어 `.then`과 `.catch`도 필요 없다.

ES7로 재작성해보자

```js
/_ ES7 _/;
const isMomHappy = true;

// Promise
const willIGetNewPhone = new Promise((resolve, reject) => {
  if (isMomHappy) {
    const phone = {
      brand: "Samsung",
      color: "black"
    };
    resolve(phone);
  } else {
    const reason = new Error("mom is not happy");
    reject(reason);
  }
});

// 2nd promise
async function showOff(phone) {
  return new Promise((resolve, reject) => {
    var message =
      "Hey friend, I have a new " + phone.color + " " + phone.brand + " phone";

    resolve(message);
  });
}

// call our promise
async function askMom() {
  try {
    console.log("before asking Mom");

    let phone = await willIGetNewPhone;
    let message = await showOff(phone);

    console.log(message);
    console.log("after asking mom");
  } catch (error) {
    console.log(error.message);
  }
}

(async () => {
  await askMom();
})();
```

## 왜 Promise 이고 언제 써야 할까?

우리는 왜 Promise가 필요할까? Promise가 있기 전에는 어떻게 코딩을 했을까? 이러한 질문에 대답하기 전에 다시 근본적인 부분으로 넘어가보자

### 일반함수 vs 비동기 함수

두 가지 예제를 보자. 두 예제 모두 두 숫자를 더하는 예제이다. 하나는 일반 함수를 이용해 더하고 하나는 원격에서 더한다.

#### 일반 함수로 두 숫자 더하기

```js
// add two numbers normally

function add(num1, num2) {
  return num1 + num2;
}

const result = add(1, 2); // you get result = 3 immediately
```

#### 비동기 함수로 두 숫자 더하기

```js
// add two numbers remotely

// get the result by calling an API
const result = getAddResultFromServer("http://www.example.com?num1=1&num2=2");
// you get result  = "undefined"
```

여러분이 만일 일반 함수로 두 숫자를 더한다면, 결과를 즉시 볼 수 있을 것이다. 하지만, 여러분이 원격 서버를 이용하여 두 숫자 더하기에 대한 결과 값을 구하면, 여러분은 기다려야 한다. 즉시 값을 얻진 못한다.

또는 이렇게 설명할 수도 있다 여러분은 서버가 다운되거나 응답 지연 때문에 값을 얻을 수 있ㅇ르지 없을지도 모른다. 여러분은 서버가 값을 반환할 때까지 모든 프로세스를 잠시 멈춰두길 원하지 않을 것이다. 그래서 비동기가 필요하다.

API를 호출하는 일, 파일을 다운로드 하는 일, 파일을 읽는 일 등은 주로 비동기 함수를 사용하여 코딩한다.

### Promise가 있기 전에 코딩하던 방법 : Callback

우리가 반드시 비동기 호출을 사용해야 할까? 정답은 아니다. Promise 전에 우리는 callback을 사용했다. Callback은 우리가 결과 값을 받으면 수행할 함수이다. callback의 개념을 받아들이기 위해 이전 예제를 수정해보자

```js
// add two numbers remotely
// get the result by calling an API

function addAsync(num1, num2, callback) {
  // use the famous jQuery getJSON callback API
  return $.getJSON(
    "http://www.example.com",
    {
      num1: num1,
      num2: num2
    },
    callback
  );
}

addAsync(1, 2, success => {
  // callback
  const result = success; // you get result = 3 here
});
```

문법은 그럭저럭 괜찮아보인다. 그렇다면 우리는 왜 Promise를 사용해야 할까

### 만일 여러분이 연속되는 비동기 액션을 수행하려면 어떻게 해야할까?

숫자들을 한 번 더하지 않고, 이번에는 숫자를 세 번 더해보자. 일반 함수에서 우리는 다음과 같이 코딩할 것이다.

```js
// add two numbers normally

let resultA, resultB, resultC;

function add(num1, num2) {
  return num1 + num2;
}

resultA = add(1, 2); // you get resultA = 3 immediately
resultB = add(resultA, 3); // you get resultB = 6 immediately
resultC = add(resultB, 4); // you get resultC = 10 immediately

console.log("total" + resultC);
console.log(resultA, resultB, resultC);
```

콜백을 사용하면 어떻게 될까

```js
// add two numbers remotely
// get the result by calling an API

let resultA, resultB, resultC;

function addAsync(num1, num2, callback) {
  // use the famous jQuery getJSON callback API
  return $.getJSON(
    "http://www.example.com",
    {
      num1: num1,
      num2: num2
    },
    callback
  );
}

addAsync(1, 2, success => {
  // callback 1
  resultA = success; // you get result = 3 here

  addAsync(resultA, 3, success => {
    // callback 2
    resultB = success; // you get result = 6 here

    addAsync(resultB, 4, success => {
      // callback 3
      resultC = success; // you get result = 10 here

      console.log("total" + resultC);
      console.log(resultA, resultB, resultC);
    });
  });
});
```

문법이 사용자에게 친화적이지 못한다. 좋은 말로는, 피라미드처럼 보인다고 한다. 하지만 사람들은 주로 이렇게 된 코드를 "콜백 지옥"이라고 부른다. 왜냐하면 콜백이 다른 콜백 안에 계속 중첩되어 있기 때문이다. 여러분이 10개의 콜백을 가지고 있다고 가정하면 10개 중첩을 시켜야 한다.

#### 콜백 지옥에서 빠져나오기

Promise가 우리를 구하러 왔다. Promise 버전의 예제를 보자

```js
// add two numbers remotely using observable

let resultA, resultB, resultC;

function addAsync(num1, num2) {
  // use ES6 fetch API, which return a promise
  return fetch(`http://www.example.com?num1=${num1}&num2=${num2}`).then(x =>
    x.json()
  );
}

addAsync(1, 2)
  .then(success => {
    resultA = success;
    return resultA;
  })
  .then(success => addAsync(success, 3))
  .then(success => {
    resultB = success;
    return resultB;
  })
  .then(success => addAsync(success, 4))
  .then(success => {
    resultC = success;
    return resultC;
  })
  .then(success => {
    console.log("total: " + success);
    console.log(resultA, resultB, resultC);
  });
```

Promise와 `.then`을 사용하여 우리는 피라미드 모양의 콜백을 Flatten했다. 중첩된 부분이 없어서 훨씬 보기 좋아졌다. 물론 ES7의 `async` 문법을 사용하면, 우리는 예제를 더 깔끔히 작성할 수 있다.

## 새로운 친구 : Observable

Promise라는 친구를 놓아주기 전에, 비동기 데이터를 더욱 쉽게 다루게 해줄 수 있는 `Observable`이라는 친구에 대해 알아보자

> Observable은 0개 혹은 그 이상의 이벤트를 내보내는 lazy event stream이다. 그리고 Observable을 끝낼 수도 있고 안 끝낼 수도 있다.

Promise와 Observable의 몇가지 중대한 차이가 있다.

이 예제에서, 우리는 Observable을 만들기 위해서 RxJS를 이용할 것이다.

```js
let Observable = Rx.Observable;
let resultA, resultB, resultC;

function addAsync(num1, num2) {
  // ES6의 fetch API를 사용합니다. fetch API는 promise를 반환합니다.
  const promise = fetch(
    `http://www.example.com?num1=${num1}&num2=${num2}`
  ).then(x => x.json());

  return Observable.fromPromise(promise);
}

addAsync(1, 2)
  .do(x => (resultA = x))
  .flatMap(x => resultAsync(x, 3))
  .do(x => (resultB = x))
  .flatMAp(x => resultAsync(x, 4))
  .do(x => (resultC = x))
  .subscribe(x => {
    console.log("total: " + x);
    console.log(resultA, resultB, resultC);
  });
```

알아둬야 할 것은 Observable은 더 멋진 일을 쉽게 할 수 있는 친구이다. 예를 들면 `delay` 추가 함수를 3초로 설정하여 지연을 둘 수도 있고 또한 일정 횟수 이후에 다시 호출할 수도 있다.

```js
...
addAsync(1,2)
  .delay(3000) // delay 3 seconds
  .do(x => resultA = x)
  ...
```

이는 나중에 다시 얘기해보자
