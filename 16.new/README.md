# new

- 16th concept of 33

## new를 사용할 때

- `new` 연산자를 사용할 때 다음의 4가지 일이 벌어진다.

1. 새로운 빈 오브젝트를 생성한다.
2. `this`를 새롭게 생성된 오브젝트에 바인드 시킨다.
3. 새롭게 생성된 오브젝트의 프로퍼티에 `proto` 라고 불리는 생성자 함수의 프로토타입 오브젝트를 추가한다.
4. 함수에서 완성된 오브젝트가 반환될 수 있도록, return this를 함수의 맨 마지막에 추가한다.

```js
function Student(name, age) {
  this.name = name;
  this.age = age;
}
```

- `Student`는 `name`과 `age` 파라미터를 갖는다.

```js
var first = new Student("John", 26);
```

- `John`과 `26`을 인자로 전달한다.

위 코드를 실행시켰을 때 다음과 같은 일들이 일어난다.

1. 새로운 오브젝트가 만들어진다 - `first`라는 오브젝트
2. `this`가 `first` 오브젝트에 바운딩 된다. `this`를 참조하면 `first` 오브젝트가 참조된다.
3. `proto`가 추가된다. `first.__proto__`는 이제 `Student.prototype`을 가리킨다.
4. 모든 것이 끝난 후에 새로운 `first` 오브젝트가 리턴되어 `first` 변수에 할당된다.

## 프로토타입(Prototypes)

**모든 자바스크립트 오브젝트는 프로토타입을 가지고 있다. 자바스크립트의 모든 오브젝트는 프로토타입에서 메소드를 상속받고 프로퍼티를 상속받는다.**

```js
Student.prototype.constructor;
//  function Student(name, age) {
//    this.name = name;
//    this.age = age;
//  }
```

- `Student.prototype.constructor`가 `Student` 생성자 함수를 가리키고 있음을 알게된다.

![image](https://user-images.githubusercontent.com/52696993/73136373-4b3d5380-4090-11ea-813c-acf4a3a5f017.png)

- `Student` 생성자 함수는 `.prototype`이라 불리는 프로퍼티를 가진다. 이 프로토타입은 프로퍼티에 `.constructor`라 불리는 오브젝트를 가지고 있다.
- 이 오브젝트는 생성자 함수를 다시 가리킨다.
- 후에 우리가 `new` 연산자를 이용하여 새로운 오브젝트를 만들 때 각각의 오브젝트는 `.__proto__` 프로퍼티를 갖는다.
- `__proto__` 프로퍼티는 새로운 오브젝트를 다시 `Student.prototype`으로 연결한다.

> **프로포타입 오브젝트는 그 생성자 함수로 만들어진 모든 오브젝트에서 공유된다. 이 말은 우리가 함수나 프로퍼티를 프로토타입에 추가하면 모든 오브젝트가 그것을 이용할 수 있다는 말이다.**

엄청나게 많은 숫자의 오브젝트가 있다면 각각의 오브젝트에 함수를 넣는 대신 공유하는 함수들을 프로토타입에 넣음으로써 엄청난 프로세싱 파워를 절약할 수 있다.

```js
Student.prototype.sayInfo = function() {
  console.log(this.name + " is " + this.age + " years old");
};
```

- `Student` 프로토타입에 함수를 추가한다. `student` 오브젝트나 이미 생성된 `student` 오브젝트 모드 새로운 메소드인 `.sayInfo`에 접근할 수 있다.

```js
second.sayInfo();
// Jeff is 50 years old
```

```js
var third = new Student("Tracy", 15);
// Now if we log third out, we see the object only has two
// properties, age and name. Yet, we still have access to the
// sayInfo function:
third;
// Student {name: "Tracy", age: 15}
third.sayInfo();
// Tracy is 15 years old
```

- 잘 작동하는 이유는 상속 때문이다.
- 자바스크립트 오브젝트는 처음에 호출하는 프로퍼티가 있는지부터 검사한다.
- 만일 우리가 호출하는 프로퍼티가 없다면 상위로 올라간다.
- 상위에는 프로토타입이 있고 자바스크립트 엔진은 프로퍼티가 있는지 확인할 것이ㅏㄷ.
- 이 패턴은 프로퍼티를 찾을 때까지 계속되고 전역 오브젝트에서 프로토타입 체인은 끝나게 된다.

> 이는 `.toString()`과 같은 메소드를 사용할 수 있었던 것과 같은 원리이다. `.toString()` 메소드를 전혀 코딩한 적 없지만 사용할 수 있었던 이유는 `Object.prototype`에 이미 작성되어 있기 때문이다. 모든 오브젝트는 궁극적으로 `Object.prototype`을 상속받게 되어 있다. 그리고 이러한 메소드를 오버라이딩 할 수 있다.

```js
var name = {
  toString: function() {
    console.log("Not a good idea");
  }
};
name.toString();
// Not a good idea
```

- 프로토타입으로 이동하기 전에 오브젝트 내부에 메소드가 있는지 먼저 확인한다. 우리 오브젝트가 메소드를 갖고 있기 때문에 상속이 일어나지 않고 우리 오브젝트가 가진 메소드가 작동한다. 이는 좋은 방법이 아니니 글로벌 메소드를 그냥 두자.
