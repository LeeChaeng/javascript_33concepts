# DOM and Layout Trees

- 13th concept of 33

**DOM(Document Object Model)**은 웹사이트를 유저와 상호작용 할 수 있도록 만들기 위해 필수적인 부분이다. DOM은 프로그래밍 언어가 웹 사이트의 내용(conetent), 구조(structure) 그리고 스타일을 조작할 수 있게 만들어주는 인터페이스 이다. 자바스크립트는 인터넷 브라우저 상의 DOM과 연결해주는 클라이언트 사이드 스크립팅 언어이다.

웹 사이트는 action을 취한다. 사용자가 불완전한 형태의 폼을 제출했을 때는 에러를 보여주고 네비게이션 메뉴를 토글했을 때는 이미지를 보여주는 것과 같이 화면을 전환한다. 이러한 것들은 자바스크립트에 접근하여 DOM을 조작한 결과이다.

> DOM은 특정 프로그래밍 언어와는 독립적이게 만들어지지만, 이 글에서는 HTML DOM의 자바스크립트적 구현에 집중한다.

## DOM은 무엇인가?

웹 사이트는 HTML Document라는 것을 포함한다. style, content, structure 등을 우리가 보는 페이지에 렌더링한다.

HTML과 CSS의 structure와 style을 파싱하기 위해서, 브라우저는 DOM(Document Object Model)이라고 불리는 document의 겉모양을 만든다. 이 모델(model)은 자바스크립트가 오브젝트로서의 웹 사이트 document 컨텐츠의 요소에 접근할 수 있도록 해준다.

> index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Learning the DOM</title>
  </head>

  <body>
    <h1>Document Object Model</h1>
  </body>
</html>
```

- `doctype`과 `head`, `body`가 포함된 `html` 태그는 웹 사이트 document의 가장 필수적인 것들이다.
- 개발자 도구 내부 Elements 탭에서 DOM을 볼 수 있다.
  ![image](https://user-images.githubusercontent.com/52696993/72505840-10fbd700-3884-11ea-99f7-ef7aa4b4db8f.png)

## Document 객체 (Document Object)

- `document` 객체는 우리가 웹 사이트에 접근하고 수정할 수 있는 많은 **프로퍼티(properties)와 메소드(methods)**를 가진 빌트인 오브젝트이다.
- 개발자 도구 탭 중 `Console` 탭에서 `document`라고 타이핑 후 엔터를 치면 `Element`탭에서 보던 것과 같은 내용이 나온다.

## DOM과 HTML 소스 코드의 차이점은 무엇일까?

- HTML 소스 코드와 DOM이 같은 것으로 보일 수 있지만 두 가지 차이점이 존재한다.

1. DOM은 자바스크립트 클라이언트 사이드에 의해 수정된다.
2. 브라우저는 소스코드에 존재하는 에러를 자동으로 고친다.

```
> document.body
```

를 입력하면

```html
// Output
<body>
  <h1>Document Object Model</h1>
</body>
```

- `document`는 오브젝트이다. `body`는 `.`으로 접근 할 수 있는 `document`의 프로퍼티이다.
- `document.body`를 콘솔에 작성하는 것은 `body` 요소와 그 안에 있는 모든 것들을 출력한다.

콘솔에서, 이 웹페이지의 `body` 오브젝트의 라이브 프로퍼티의 일부를 수정할 수 있다. `style` 속성의 배경색을 `fuchsia`로 바꿔보면 이러한 결과가 나타난다.

![image](https://user-images.githubusercontent.com/52696993/72509836-b8303c80-388b-11ea-9e26-791b37f4ffdc.png)

- `Element` 탭으로 이동해서 `document.body`를 콘솔에 타이핑 해보면 DOM이 변경된 것을 볼 수 있다.
  <<<<<<< HEAD
- `body`의 배경색을 `fuchsia` 로 할당 했던 자바스크립트 코드는 DOM의 일부이지만 `View Page Source`에서 보면 웹사이트의 소스는 우리가 자바스크립트를 통해 추가했던 새로운 스타일 속성을 가지고 있지 않다는 것을 알게 된다.
- DOM이 HTML 소스코드와 다른 출력 결과를 갖는 또 하나의 사례는 소스코드에 에러가 있을 때이다.
- `table` 태그 안에는 `tbody`가 요구된다. 하지만 HTML 소스에 좀처럼 잘 추가하지 않는다. 브라우저는 자동적으로 에러를 찾아주고 DOM을 수정하여 `tbody`코드를 추가해준다.
- 또한 DOM은 제대로 닫히지 않은 태그에 대해서도 수정해준다.
