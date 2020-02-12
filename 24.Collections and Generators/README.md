# Collections and Generators

- 24th concept of 33

## Iterator

자바스크립트의 **Iterator** 를 분석해보자. **Iterator는 자바스크립트의 collection을 반복하는 새로운 방법이다.** ES6에서 소개된 개념이고 매우 유용하고 많은 곳에서 사용되고 있기 때문에 인기가 많다.

우리는 개념적으로 Iterator가 어떤 것인지 이해하고 예제와 함께 어디에 사용해야 하는지 배워볼 것이다. 그리고 자바스크립트 내부에서 Ietrator가 구현된 곳도 살펴볼 것이다.

### 소개

다음과 같은 배열이 있다고 가정해보자

```js
const myFavouriteAuthors = [
  "Neal Stephenson",
  "Arthur Clarke",
  "Isaac Asimov",
  "Robert Heinlein"
];
```

우리가 주로 하고 싶은 작업들은 배열의 값들을 꺼내서 화면에 출력하거나, 배열 값들을 수정하거나 또는 배열 값들을 이용하여 무언가를 수행하고 싶어한다. 이는 `for`, `while`, `for-of`를 이용하여 반복문을 돌려 작업을 수행할 것이라고 할 것이다. 예제의 구현은 다음과 같다

![image](https://user-images.githubusercontent.com/52696993/74315275-6f03d780-4dba-11ea-9ed2-03eca2d1259f.png)

> 배열에서의 다양한 반복 테크닉

이제, 이전의 배여로가 같은 형태의 데이터가 아닌, 아래와 같이 사용자 설정의 데이터 구조를 가진 데이터를 갖고 있다고 생각해보자

![image](https://user-images.githubusercontent.com/52696993/74315344-978bd180-4dba-11ea-9210-49e6e58b69e4.png)

> > Custom Data Structure

이제, `myFavouriteAuthors`는 또 다른 객체인 `allAuthors`를 가진 객체이다. `allAuthors`는 `ficion`, `scienceFiction`, `fantasy`라는 키를 가진 3개의 배열로 이루어져 있다. **지금 모든 작가 정보를 가져오기 위해서 `myFavouriteAuthos`에 대한 루프를 돌아보라고 한다면, 접근법은 어떻게 될까?** 모든 데이터를 가져오기 위해서 반복을 조합하려 할 것이다.

만일 이전처럼 하려고 한다면

```js
for (let author of myFavouriteAuthors) {
  console.log(author);
}

// 타입 에러: {} 는 반복할 수 없습니다.
```

하지만 객체(Object)를 반복할 수 없다(not iterable)는 `TypeError`를 만나게 될 것이다. **반복할 수 있다는 것(Iterable)이 어떤 의미인지 살펴보고 어떻게 객체(Object)를 반복할 수 있게 만들 수 있는지 알아보자** 이 글 마지막에서, 여러분은 `for-of`루프를 사용자 정의 객체에 어떻게 적용하는지 알게 될 것이다. 이제 `myFavouriteAuthors`를 반복 가능(Iterable)하게 만들어보자

### 반복 가능한 것(Iterable)과 Iterator

이전 섹션에서 우리에게 어떤 문제가 발생했는지는 알았을 것이다. 사용자 정의 객체에서 'author'에 들어있는 목록들을 가져올 수 있는 쉬운 방법이 없었다. 내부 에이터를 차례로 밖으로 노출시키는 방법을 통한 어떤 메소드를 원한다.

메소드 `myFavouriteAuthors` 내부에 `getAllAuthors` 메소드를 추가해보자. 이 메소드는 모든 author를 반환할 것이다. 다음과 같다.

![image](https://user-images.githubusercontent.com/52696993/74315896-cb1b2b80-4dbb-11ea-9518-72ae91ae429e.png)

> > getAllAuthors 구현

위에 나온 구현 방법은 정말 간단한 접근법이다. 모든 author를 가져오긴 한다. 하지만, 아직 몇가지 문제들이 구현된 코드 속에 남아있다.

- getAllAuthors는 매우 제한적이다. 만일 어떤 사람이 myFavouiteAuthors를 만든다면, 그 사람은 이 메소드의 이름을 retrieveAllAuthors로 바꿀 것이다.
- 개발자로서 우리는 항상 모든 데이터를 반환하는 정확한 메소드를 알아둘 필요가 있다. 이 경우에는 `getAllAuthors`라는 이름의 메소드이다.
- `getAllAuthors`는 모든 `author`의 문자열의 배열을 반환한다. 만일, 다른 개발자가 오브젝트를 다음과 같은 포맷으로 반환하면 어떻게 할까?

```js
[ {name: 'Agatha Christie'}, {name: 'J. K. Rowling'}, ...]
```

개발자는 반드시 모든 데이터를 반환하는 **메소드의 정확한 이름과 반환 타입**을 알아야 한다.

만일, 우리가 메소드의 이름과 반환 타입이 고정되어 있고 변하지 않는다는 규칙을 만들면 어떨까?

이러한 메소드를 바로 `iteratorMethod`라고 한다.

이와 비슷하게 사용자 정의 오브젝트를 반복하는 프로세스의 표준화가 **ECMA**에 의해 진행되었다. 하지만 `iteratorMethod`라는 이름을 사용하는 대신에, ECMA는 `Symbol.iterator`라는 이름을 사용했다. **Symbol** 은 유일(unique)한 이름을 제공한다. 그리고 다른 프로퍼티 이름과 충돌이 발생하지 않는다. 또한 `Symbol.iterator`는 `iterator`라 불리는 오브젝트를 반환한다. 이 `iterator`는 `next`라 불리는 메소드를 가질 것이다. `iterator`는 또한 `value`와 `done`이라는 키를 가진 오브젝트이다.

`value`키는 현재 값을 포함한다. 이 값은 어떤 타입이든 될 수 있다. `done`은 `boolean`이다. `done`은 모든 값이 전달(fetced)되었는지 아닌지를 나타낸다.

아래의 그림이 **iterables, iterators, next` 사이의 관계를 알아보는데 도움을 줄 수 있다. **이 관계를 Iteration Protocol(반복 프로토콜)이라고 불린다.\*\*

![image](https://user-images.githubusercontent.com/52696993/74317889-88f3e900-4dbf-11ea-84a3-9b8374fcb9e8.png)

- iterable은 자신의 원소들이 외부에서 접근 가능하도록 만들길 원하는 자료 구조이다. 키가 Symbol.iterator인 메소드를 구현함으로써 원소들이 외부에서 접근 가능하도록 만든다. Symbol.iterator 메소드는 iterator를 위한 공장이라고 보면 된다. iterator들을 만들어낸다.
- iterator는 자료 구조의 원소들을 순회할 수 있는 포인터이다.

### 오브젝트를 반복 가능(iterable)하게 만들어보기

이전 섹션에서 배웠듯이, 우리는 `Symbol.iterator`라 불리는 메소드를 구현할 필요가 있다.

![image](https://user-images.githubusercontent.com/52696993/74318843-4cc18800-4dc1-11ea-9dcd-63a78ac3c955.png)

> > iterator 예제

4번째 줄에서, 우리는 iterator를 만들었다. `next` 메소드가 정의된 오브젝트이다. `next` 메소드는 `step` 변수에 따라 값을 반환한다. 25번째 줄에서 우리는 `iterator`를 가져온다. 27번째 줄에서, 우리는 `next`를 호출한다. `done`이 `true`가 될 때까지 next를 계속하여 호출한다.

이게 바로 `for-of` 반복 내부에서 일어나는 일이다. `for-of` 반복은 iterable한 것을 인자로 받아서 iterator로 만든다. 그리고 `next()` 메소드를 `done`이 `true`가 될 때까지 호출한다.

### 자바스크립트 내에서 Iterable들

> > Iterable은 영어 단어로 반복이라는 뜻을 가지는 형용사가 될 수 있지만, 여기서는 일종의 고유명사로 생각하여야 한다. Iterable이란 자체가 반복 가능한 어떠한 객체 정도로 생각하자

자바스크립트에서 많은 것들이 반복 가능하다. 즉시 보이진 않을 수 있어도, 면밀하게 조사해보면 iterable이 보이기 시작한다.

**다음에 나열된 것들은 iterable이다.**

- **배열** 과 **타입이 정해진 배열**
- **문자열** - 각 문자 또는 유니코드/ 코드 - 포인트를 반복한다.
- **맵** - 키&값 쌍을 반복한다.
- **set** - 원소를 반복한다.
- arguments - 함수의 배열과 같은 특별한 변수를 반복한다.
- DOM 원소들

**자바스크릅트에서 iterables를 인자로 사용하는 생성자들은 다음과 같다.**

- **`for-of` 반복** - `for-of` 반복은 반복 가능한 것을 필요ㄹ 한다. 반복이 불가능하다면 `for-of`는 `TypeError`를 던질 것이다.

```js
for (const value of iterable) { ... }
```

- **배열의 비구조화(Destructuring of Arrays)** - 비구조화는 반복 가능(iterable)하기에 일어난다. 어떤 일이 일어나는지 살펴보자.

```js
const array = ["a", "b", "c", "d", "e"];
const [first, , third, , last] = array;
```

위의 코드는

```js
const array = ["a", "b", "c", "d", "e"];
const iterator = array[Symbol.iterator]();
const first = iterator.next().value;
iterator.next().value; // Since it was skipped, so it's not assigned
const third = iterator.next().value;
iterator.next().value; // Since it was skipped, so it's not assigned
const last = iterator.next().value;
```

- **전개 연산자(Spread Operator)**

```js
const array = ["a", "b", "c", "d", "e"];
const newArray = [1, ...array, 2, 3];
```

위의 코드는 다음과 같이 쓰여질 수 있다.

```js
const array = ["a", "b", "c", "d", "e"];
const iterator = array[Symbol.iterator]();

const newArray = [1];
for (
  let nextValue = iterator.next();
  nextValue.done !== true;
  nextValue = iterator.next()
) {
  newArray.push(nextValue.value);
}

newArray.push(2);
newArray.push(3);
```

- `Promise.all`과 `Promise.race` 역시 Promise 전반에서 iterable을 수용한다.

- **Map과 Set**
  Map의 생성자는 Iterable `[key, pair]`의 쌍을 Map으로 변화시킨다. 그리고 Set 생성자는 Iterable의 `[key, pair]`의 쌍을 Set으로 변화시킨다.

```js
const map = new Map([
  [1, "one"],
  [2, "two"]
]);
map.get(1);
// one

const set = new Set(["a", "b", "c"]);
set.has("c");
// true
```

- Iterator는 또한 Generator의 선배이다.

### myFavouriteAuthors를 Iterable로 만들기

`myFavouriteAuthors`가 iterable이 된 구현

```js
const myFavouriteAuthors = {
  allAuthors: {
    fiction: ["Agatha Christie", "J. K. Rowling", "Dr. Seuss"],
    scienceFiction: [
      "Neal Stephenson",
      "Arthur Clarke",
      "Isaac Asimov",
      "Robert Heinlein"
    ],
    fantasy: ["J. R. R. Tolkien", "J. K. Rowling", "Terry Pratchett"]
  },
  [Symbol.iterator]() {
    // 모든 작가를 배열로 받기
    const genres = Object.values(this.allAuthors);

    // 현재의 장르와 작가 인덱스를 저장하기
    let currentAuthorIndex = 0;
    let currentGenreIndex = 0;

    return {
      // next() 구현
      next() {
        // 현재 장르 인덱스에 따른 작가들
        const authors = genres[currentGenreIndex];

        // doNotHaveMoreAuthors 는 Authors 배열을 전부 돌았을 때, 참이 됩니다.
        // 모든 아이템이 소비되었을 때, 참이 됩니다.
        const doNotHaveMoreAuthors = !(currentAuthorIndex < authors.length);
        if (doNotHaveMoreAuthors) {
          // 더 이상 불러올 작가가 없을 때, 다음 장르 인덱스(currentGenreIndex)가 다음으로 넘어갑니다.
          currentGenreIndex++;
          // 그리고 작가 인덱스(currentAuthorIndex)가 0이 됩니다.
          currentAuthorIndex = 0;
        }

        // 만일 모든 장르가 끝났다면,
        // 우리는 아이터레이터에게 더 이상 우리가 줄 값이 없다는 것을 알려야 합니다.
        const doNotHaveMoreGenres = !(currentGenreIndex < genres.length);
        if (doNotHaveMoreGenres) {
          return {
            value: undefined,
            done: true
          };
        }

        // 만일 모든 것들이 맞다면, 현재 장르로부터 작가 이름을 반환합니다.
        // 그리고 작가 인덱스를 하나 늘립니다(increment).
        // 다음에는, 다음 작가가 반환됩니다.
        return {
          value: genres[currentGenreIndex][currentAuthorIndex++],
          done: false
        };
      }
    };
  }
};

for (const author of myFavouriteAuthors) {
  console.log(author);
}

console.log(...myFavouriteAuthors);
```
