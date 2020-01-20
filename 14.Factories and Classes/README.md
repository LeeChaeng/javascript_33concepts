# Factories and Classes

- 14th concept of 33

## 1. 생성자 함수
자바스크립트는 모든 것이 함수인 함수형 언어이다. 때문에 클래스를 가지기 위해서는 생성자 함수가 사용된다.

```js
function Vehicle(make, model, color) {
  this.make = make,
  this.model = model,
  this.color = color,
  this.getName = function () {
    return this.make + " " + this.model;
  }
}
```
- 자바스크립트 클래스의 생성자와 거의 흡사한 기능을 제공한다.

```js
let car = new Vehicle("Toyota", "Corolla", "Black");
let car2 = new Vehicle("Honda", "Civic", "White");
```
- `Vehicle` 타입의 오브젝트를 제공하기 위해서 이러한 코드를 작성한다.
- `new Vehicle()`이라는 코드를 작성할 때, 자바스크립트 엔진이 실제로 하는 일은 각 오브젝트에 대해서 `Vehicle` 생성자 함수를 복사하는 일이다.
- 그리고 각각의 모든 프로퍼티와 메소드가 `Vehicle`의 새로운 인스턴스에 복사된다. 
**생성자 함수의 멤버 함수가 모든 오브젝트에서 반복되는 것을 원하지 않는다.**
-> 중복된 코드를 계속해서 생성하는 것이 된다.
**새로운 프로퍼티나 메소드를 존재하는 constructor function에 추가 할 수 없다**

```js
car2.year = "2012"
```
- year 프로퍼티를 추가하려면 생성자 함수 자체에 추가해야한다.
- 이는 동작은 하지만 year 프로퍼티가 추가되는 것은 아니다.

```js
function Vehicle(make, model, color, year) {
        this.make = make,
        this.model = model,
        this.color = color,
        this.year = year,
        this.getName = function () {
            return this.make + " " + this.model;
        }
}
```

## 2. 프로토타입
- 자바스크립트에서 새로운 함수가 만들어질때마다, 자바스크립트 엔진은 `prototype` 프로퍼티를 기본적으로 추가한다.
- 이를 우리는 **프로토타입 오브젝트(prototype object)** 라고 부른다.
- 기본으로 이 프로토타입 오브젝트는 우리 함수를 다시 가르키는 생성자 프로퍼티와 오브젝트인 또 다른 프로퍼티 `__proto__`를 가지고 있다.

![image](https://user-images.githubusercontent.com/52696993/72711487-7dd8df00-3bac-11ea-9c4b-bf89bb491556.png)

- `__proto__` 프로퍼티는 dunder proto라고 불린다. 이는 생성자 함수의 프로퍼티를 가리킨다.
> 'dunder' 프로퍼티라는 말은 양 끝이 __로 묶여 있는 변수를 말한다. (from python)

- 생성자 함수의 새로운 인스턴스가 생성될 때마다, 다른 프로퍼티와 메소드와 함께 이 프로퍼티(`__proto__`)도 인스턴스에 복사된다.

![image](https://user-images.githubusercontent.com/52696993/72711679-d01a0000-3bac-11ea-8d56-97e64dc61eb2.png)

- 이 프로퍼티 오브젝트는 생성자 함수에 새로운 프로퍼티와 메소드를 추가하기 위해 사용할 수 있다.

```js
car.__proto__.year = "2016";
```
- 프로토타입 접근법을 사용하는 동안 몇가지 유의해야할 점이 있다.
- 프로토타입 프로퍼티와 메소드는 모든 생성자 함수 인스턴스 간에 공유가 된다.
- 하지만 생성자 함수의 인스턴스 중 하나에서 어떤 프리미티브 프로퍼티를 변경한다면 해당 인스턴스에만 반영이 되고 다른 인스턴스들은 반영이 안된다는 것이다.
![image](https://user-images.githubusercontent.com/52696993/72712477-7286b300-3bae-11ea-94aa-d7096a6a3e86.png)
- 그냥 한마디로 정리하자면 프로토타입 정의 후에 Vehicle의 year은 싹 다 2014이지만 civic의 year을 2018으로 바꾸면 얘는 2018이고 나머지는 2014인 것이다.

![image](https://user-images.githubusercontent.com/52696993/72712585-afeb4080-3bae-11ea-83ec-b37eb9b843dc.png)
- 참조 타입 프로퍼티는 항상 모든 인스턴스 사이에서 공유된다.

## 3. 클래스
- 자바스크립트 클래스는 프로토타입의 힘을 활용함으로써 새롭게 생성자 함수를 작성하는 방법이다.

```js
class Vehicle {
    constructor(make, model, color) {
        this.make = make;
        this.model = model;
        this.color = color;
    }

    getName() {
        return this.make + " " + this.model;
    }
}

let car = new Vehicle("Toyota", "Corolla", "Black");
```
- `Vehicle` 클래스의 새 인스턴스를 만든다.

```js
function Vehicle(make, model, color) {
    this.make = make;
    this.model = model;
    this.color = color;
}

Vehicle.prototype.getName = function () {
    return this.make + " " + this.model;
}

let car = new Vehicle("Toyota", "Corolla", "Black");
```
- 클래스는 단지 생성자 함수를 작성하는 새로운 방법이다.

```js
let car = new Vehicle("Toyota", "Corolla", "Black");
```

1. 클래스에서 constructor을 작동시키기 위해 new 키워드가 필요하다. 생성자는 new 키워드를 작성했을 때에만 호출할 수 있다.

![image](https://user-images.githubusercontent.com/52696993/72712912-60594480-3baf-11ea-9f17-4a41db9ebe33.png)
- 생성자 함수에서는 이러한 코드도 가능하지만 

![image](https://user-images.githubusercontent.com/52696993/72712948-736c1480-3baf-11ea-8efb-5c431ea60477.png)
- 클래스에서는 이러한 결과가 나타난다.

2. 클래스 메소드는 enumerable(열거 가능)하지 않다. 자바스크립트에서 오브젝트의 각 프로퍼티는 enumerable한 플래그를 가지고 있다. 이 플래그는 프로퍼티에서 어떤 명령이 실행되는지 유효성을 정의한다. 클래스는 prototype에 정의된 모든 메소드들에 대해 이 플래그를 false로 설정한다.
> `enumerable` 플래그의 용도는 `Object.keys()`와 같은 메소드를 실행했을 때 프로퍼티가 `for...loop` 반복에 포함되는지를 결정하는 것이라 생각하면 편하다.

3. constructor를 클래스에 추가하지 않는다면 기본 값으로 빈 constructor 가 자동으로 추가된다.
```js
constructor() {}
```

4. 클래스 내부의 코드는 항상 `strict` 모드이다. 이는 코드를 작성하는 도중 에러를 지우고 오타 또는 문법적인 에러가 없는 코드를 작성하는 것을 돕는다. 실스로 어딘가에서 참조되는 코드를 지웠을 때도 알아채기가 쉽다.

5. 클래스 선언은 `hoisted` 되지 않는다. 자바스크립트에서 호이스팅은 모든 선언문이 자동적으로 현재 스코프의 가장 위로 올라가는 것이다. 

![image](https://user-images.githubusercontent.com/52696993/72713437-63a10000-3bb0-11ea-8242-8b2a4e6a927f.png)
![image](https://user-images.githubusercontent.com/52696993/72713446-6865b400-3bb0-11ea-97eb-842a27b50bd5.png)

6. 클래스는 오브젝트 리터럴이나 생성자 함수 같은 것을 프로퍼티 값으로 할당하는 것을 허락하지 않는다. 함수나 getters/setters 같은 것들만 가질 수 있다. **클래스에서 property:value 할당을 바로 하지 말자.**


## 클래스의 특성

### 1. 생성자
- 클래스 자체를 표현하는 함수를 정의 후 `new` 키워드를 쓰면 생성자는 자동 호출된다. 클래스는 한개 이상의 생성자 함수를 소유할 수 없다.

```js
let car = new Vehicle("Honda", "Accord", "Purple");
```
- 생성자는 클래스의 생성자를 확장된 형태로 부르기 위해 `super` 키워드를 사용할 수 있다.

### 2. 정적 메소드
- 프로토타입 위에 있는 것이 아닌 클래스 자체에 있는 함수이다. `prototype`에서 정의된 메소드들은 정적 메소드와는 다르다.
- 정적 메소드들은 `static` 키워드를 사용하여 선언된다. 정적 메소드의 대부분은 공용 함수(utility functions)를 만들기 위해 사용된다. 

```js
class Vehicle {
    constructor(make, model, color) {
        this.make = make;
        this.model = model;
        this.color = color;
    }

    getName() {
        return this.make + " " + this.model;
    }

    static getColor(v) {
        return v.color;
    }
}

let car = new Vehicle("Honda", "Accord", "Purple");
let ex = new Vehicle("kia", "K5", "RED")

Vehicle.getColor(car); // "purple"
Vehicle.getColor(ex); //"RED"
```
- v에 클래스 명 이름이 들어가면 getColor 즉 공용함수임
- 클래스 인스턴스에서 호출 못함

### 3. Getters/Setters
- 클래스는 프로퍼티의 값을 가져오거나 값을 설정하기 위해서 getters와 setters를 가질 수 있다.

```js
class Vehicle {
    constructor(model) {
        this.model = model;
    }

    get model() {
        return this._model;
    }

    set model(value) {
        this._model = value;
    }
}
```
- 내부에서 getters/setters는 `prototype`에 정의되어 있다.

### 4. Subclassing
- 자바 클래스에서 상속을 구현할 수 있는 방법이다. `extends`라는 키워드로 클래스의 자식 클래스를 만들 때 사용된다.

```js
class Vehicle {
    constructor(make, model, color) {
        this.make = make;
        this.model = model;
        this.color = color;
    }

    getName() {
        return this.make + " " + this.model;
    }
}

class Car extends Vehicle{
    getName(){
        return this.make + " " + this.model +" in child class.";
    }
}

let car = new Car("Honda", "Accord", "Purple");

car.getName(); // "Honda Accord in child class."
```
- `getName()`함수를 호출했을 때 자식 클래스에서 호출 된 것을 볼 수 있다.


```js
class Car extends Vehicle{
    getName(){
        return super.getName() + " - called base class function from child class.";
    }
}
```
- 자식클래스의 메소드 내에서 베이스 클래스의 메소드를 호출하기 위해 `super`키워드를 사용한다.

![image](https://user-images.githubusercontent.com/52696993/72715640-335b6080-3bb4-11ea-8fc0-9760a01591f7.png)
