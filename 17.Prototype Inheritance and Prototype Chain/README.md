# Prototype Inheritance and Prototype Chain

- 17th concept of 33

## 'class' 키워드가 존재하기 전

![image](https://user-images.githubusercontent.com/52696993/73251078-945de680-41fb-11ea-9ef9-c75d560df5c1.png)

> 키워드 new를 이용하여 cat을 만들었다.

new 키워드를 까먹는다면?
![image](https://user-images.githubusercontent.com/52696993/73251203-d424ce00-41fb-11ea-9b77-0a9999104dcc.png)
- 아무런 에러도 나지 않고 그냥 최상위 오브젝트인 window 오브젝트의 name 프로퍼티만 수정이 된다.

## 프로토타입은 어디에 존재하는가

![image](https://user-images.githubusercontent.com/52696993/73251259-f1f23300-41fb-11ea-9835-bcf85414351f.png)
- 콘솔에서 프로토타입 체인을 볼 수 있다.
- cat은 name을 가진 오브젝트이다. 또 meow 함수를 가지고 Cat 생성자 함수를 가진 proto라는 오브젝트를 가지고 있다.
- 이 오브젝트/프로토타입은 또한 자바스크립트 오브젝트 중에 최상위 오브젝트인 Object도 갖고 있다.

```js
delete cat.__proto__.meow
```
- 콘솔에 입력하게 되면 모든 고양이의 `meow()` 메소드를 삭제하게 된다. 
- **모든 cat이 같은 프로토타입에 대한 참조를 공유하기 때문**

![image](https://user-images.githubusercontent.com/52696993/73252701-82317780-41fe-11ea-815a-0cc005d8a866.png)

- Dog와 Cat이 존재하게 된다. 절대로 하지 말아야 할 것을 해보자

```js
cat.__proto__ = dog.__proto__
```

![image](https://user-images.githubusercontent.com/52696993/73252820-bc9b1480-41fe-11ea-9b8c-9255cfca072c.png)

- cat은 `bark()`를 가지게 된다. Cat이지만 프로토타입은 Dog의 프로토타입을 가지고 있다.
- 이는 가능하지만 절대 하지말아야 할 것이다.


## class를 써보자

> 자바스크립트 클래스는 ECMAScript 2015에서 도입된 현존하는 자바스크립트의 프로토타입 기반 상속을 다루는 **문법적 부가기능**이다. 클래스 문법은 새로운 객체지향 상속 모델을 자바스크립트에 도입하지는 않는다.

![image](https://user-images.githubusercontent.com/52696993/73254381-a6db1e80-4201-11ea-896e-eb7aab85000f.png)

- class, constructor, super, extends 그리고 static 함수까지 추가되어 있다.

![image](https://user-images.githubusercontent.com/52696993/73434750-afab2c00-438a-11ea-9f99-92031950a167.png)

- extends 키워드를 사용한 의미는 프로토타입 체인에 이를 깊이 추가했다는 의미이다. 
- name과 superpower를 가진 superCat 오브젝트를 가지고 있다.
- 또한 SuperCat 생성자를 가진 `__proto__` 오브젝트도 갖고 있고 meow()까지 가지고 있다.

![image](https://user-images.githubusercontent.com/52696993/73434922-00228980-438b-11ea-8067-e88f939c1e7c.png)

- class를 사용함으로써 무엇인가가 변했다.