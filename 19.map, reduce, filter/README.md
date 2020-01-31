# map, reduce, filter

- 19th concept of 33

## 함수형 프로그래밍이란 ?

함수형 프로그래밍은 함수의 출력 값이 오직 함수로 넘어온 argument에만 의존하는 프로그래밍 패러다임이다. 함수를 몇번 호출해도 항상 같은 결과를 낳는다. 사실 앞서 설명한 특성은 현재 존재하는 local 또는 global한 변수를 이용하여 매 실행마다 다른 결과를 내보낼 수 있는 공통적이고 현대적인 코드와 대비된다. **상태의 변화는 side-effect를 발생시킨다.** 매번 다른 결과를 내보내는 코드를 제거하는 것은 코드의 동작을 더 쉽게 이해하고 예측할 수 있게 만들어준다.

## Map, Filter, Reduce ?

### Map

때때로 우리는 우리가 각각의 프로퍼티를 수정하거나 추가하길 원하는 오브젝트의 배열을 갖고 있다. 우리가 소문자로 변화시키길 원하는 배열을 갖고 있을 수도 있다.

#### how to use it?

![image](https://user-images.githubusercontent.com/52696993/73524487-91a7ff00-4450-11ea-82c9-63f4fe9aba48.png)

> 모든 수를 2로 곱한다.

- **map은 인자로 콜백을 받는다.** map이 호출될 때, 이 콜백에 현재 값의 iteration, iteration의 index 그리고 원본 배열이 주어진다. map을 위한 optional한 두번째 인자도 있다. 두번째 인자는 콜백 내부에서 this를 이용하기 위한 값이다.

#### Example

![image](https://user-images.githubusercontent.com/52696993/73524686-fbc0a400-4450-11ea-8d6d-34503a23e789.png)

> songs 배열이 있다.

- 오브젝트의 배열을 간단하게 스트링의 배열로 바꾸기
  ![image](https://user-images.githubusercontent.com/52696993/73524821-43473000-4451-11ea-8972-87aaa15a8260.png)

  > map을 이용하여 모든 song의 이름을 가져온다.

- 유틸 함수를 이용하여 변화 적용하기
  ![image](https://user-images.githubusercontent.com/52696993/73524976-9325f700-4451-11ea-8e92-b91813de25be.png)

  > map과 함께 유틸 함수(`toLowerCase()`)를 이용하여 모든 song의 name을 소문자로 바꾸어준다.

- 주어진 배열을 변화시키고, 각각의 오브젝트의 프로퍼티를 추가/ 삭제하기
  ![image](https://user-images.githubusercontent.com/52696993/73525229-1c3d2e00-4452-11ea-83c3-2865aabd1bb9.png)

  > artist 프로퍼티를 제거하고 다른 프로퍼티를 추가했다.

  **_전개 구문을 사용하여 정해지지 않은 갯수의 매개변수를 받을 수 있다._**
  **_Rest 파라미터는 arguments와 다르게 유사 배열이 아닌 자바스크립트 표준 배열로 대체되고 마지막 파라미터만 Rest 파라미터가 될 수 있다._**

  **_출처 : https://blog.geundung.dev/93_**

#### 브라우저 호환성

![image](https://user-images.githubusercontent.com/52696993/73526042-b18cf200-4453-11ea-9e11-9b76cd3395e3.png)

> 자바스크립트 map 브라우저 호환성

### Filter

존재하는 배열에서 특정한 아이템을 필터해야 하는 경우에 도움이 된다.

#### how to use it ?

map이랑 비슷하다. map을 안다면 filter도 아는 것

![image](https://user-images.githubusercontent.com/52696993/73526199-092b5d80-4454-11ea-9f96-eee37ca51afe.png)

> 배열에서 짝수만 골라낸다.

Filter는 map과 같은 인자를 받는다. 그리고 매우 비슷하게 동작한다. 유일한 다른 점은 콜백이 true 또는 false로 반환해야 한다는 것이다. **만일 true를 반환해야한다면 배열이 그 원소를 계속 갖고 있고 false를 반환한다면 필터링된다.**

#### Example

- 짝수 필터링하기
  ![image](https://user-images.githubusercontent.com/52696993/73526356-68896d80-4454-11ea-82fa-838bd7fa1b77.png)

  > 필터를 이용하여 짝수 필터링하기

- 간단한 문자열 검색하기
  ![image](https://user-images.githubusercontent.com/52696993/73526739-30365f00-4455-11ea-9888-58897680ec9b.png)

  > 'at'이라는 문자열을 가진 단어를 필터링한다.

- 오브젝트의 배열 필터링하기
  ![image](https://user-images.githubusercontent.com/52696993/73527624-b30be980-4456-11ea-96fb-78a2b00a7649.png)

  > 모든 'mastodon' 노래를 필터링한다.

#### 브라우저 호환성

![image](https://user-images.githubusercontent.com/52696993/73527694-d59e0280-4456-11ea-8de2-18114f6dc3a5.png)

> 자바스크립트 filter 브라우저 호환성

### Reduce

- 배열 하나를 받아서 하나의 값으로 바꿔준다.
- 예를 들어, 숫자의 배열을 가지고 있을 때, 쉽게 모든 값의 평균을 구할 수 있다.

#### how to use it ?

map과 filter와 비슷하지만 콜백 인자에서 다른 점이 있다. 콜백은 이제 accumulator를 받는다. accumulator는 모든 반환 값을 누적한다. reduce 함수의 두번째 인자 값이 accumulator의 초기 값이다.

![image](https://user-images.githubusercontent.com/52696993/73527971-54933b00-4457-11ea-988e-7960cfc871f6.png)

> 배열 숫자들의 합을 계산하고, 합을 이용하여 평균을 계산한다.

#### Example

이전과 같이 노래의 배열을 받았다고 가정한다.

- 정수 배열의 합 계산하기
  ![image](https://user-images.githubusercontent.com/52696993/73528058-72f93680-4457-11ea-9c54-c125b7789dd8.png)

  > 배열의 합 계산하기

- 배열에서 오브젝트 빌드하기
  ![image](https://user-images.githubusercontent.com/52696993/73528152-a936b600-4457-11ea-9c20-4084ffd7574d.png)

  > 배열에서 오브젝트 만들기

- 배열로 된 배열을 하나의 배열로 만들기
  ![image](https://user-images.githubusercontent.com/52696993/73529595-4d216100-445a-11ea-9e9c-24421705c85b.png)

  > 배열의 배열을 Flattening 하기

#### 브라우저 호환성

![image](https://user-images.githubusercontent.com/52696993/73529742-8f4aa280-445a-11ea-8cf0-fc71bd0a43df.png)

### 삼위일체

Map, Filter, Reduce는 같이 연계로 사용할 수 있고 끝을 알 수 없는 미스터리한 힘을 가지고 있다.

![image](https://user-images.githubusercontent.com/52696993/73531507-f9b11200-445d-11ea-8d97-b08e1704aeba.png)

- 3분이 넘는 모든 노래의 제목을 컴마로 나눈 배열을 가져야 한다고 가정하자.
  ![image](https://user-images.githubusercontent.com/52696993/73531585-18afa400-445e-11ea-854f-d86f306d839e.png)

## Map, Filter, Reduce를 사용해야 하는 이유

- 현재 값에 접근 할 수 있다.(array[i]와 같은 형식으로 접근하려면 매우 불편하다.)
- 기존 배열의 변화를 방지할 수 있다. side-effect를 최소화 하는 것이 가능하다.
- for loop를 관리할 필요가 없다.
- 빈 배열을 만들고 거기에 push 할 필요가 없다.
- 콜백에서 RETURN 문을 기억하자.
