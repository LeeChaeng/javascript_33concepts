# JavaScript Engines

- 11th concept of 33

우리의 모든 시스템은 마이크로프로세서(CPU)를 포함한다. 이는 전자적인 신호로 동작하는 작은 기계이다. 그리고 궁극적으로는 job을 수행한다. 우리는 마이크로 프로세서들에게 지시(instruction)를 한다. 여기서 지시란 것은 해석(interpret)할 수 있는 언어로 되어 있는 것을 말한다. 다른 마이크로 프로세서들은 다른 언어로 말한다.가장 일반적인 언어로는 IA-32, x86-64, MIPS 그리고 ARM이 있다.

자바스크립트 V8 엔진은 구글이 제공하는 가장 강력한 오픈소스 자바스크립트 엔진이다. 자바스크립트 엔진이란 자바스크립트 코드를 마이크로프로세서가 이해할 수 있는 더 낮은 수준의 언어 혹은 기계어로 변환해주는 역할을 한다

Rhino, JavaScriptCore, SpiderMonkey와 같은 다양한 종류의 자바스크립트 엔진이 존재한다. 이 엔진들은 ECMAScript 표준을 따른다. ECMAScript는 스크립팅 언어를 위한 표준을 정의한다. 자바스크립트는 이를 기반으로 하는데 이러한 표준은 언어가 어떻게 동작할지 그리고 어떤 특성을 가져야 하는지를 정의한다.

크롬 V8 엔진의 특성

- C++로 작성되었으며 Chrome과 Node.js에서 사용된다.
- ECMA-262에 기재된 ECMAScript를 구현했다.
- standalone으로 동작할 수 있어서 우리는 자바스크립트 엔진을 C++ 프로그램에 내장시킬 수 있다.
  **_c++로 구현된 함수를 자바스크립트의 새로운 특성으로 넣을 수 있다._**

예를 들어 print('hello world')는 node.js에서 유효한 구문이 아니라 컴파일 시 에러를 송출한다. 하지만 깃허브에 오픈소스로 제공된 V8엔진의 맨 위에 프린트 문을 추가할 수 있다. 그래서 print 함수가 native로 동작하게 만들 수 있다. 이러한 행위는 자바스크립트가 ECMAScript 표준이 정의하는 자바스크립트 동작보다 더 많은 동작을 하도록 허용해준다.

C++로 된 코드를 작성하도록 허용하고 자바스크립트에서 동작 가능하게 만드는 것이 가능하고 그래서 더 많은 특성을 자바스크립트에 추가할 수 있다.

```c++
// 자바스크립트에서 'print' 함수가 호출될 때마다, v8엔진에 의해 콜백이 호출됩니다.
// 스페이스와 새로운 라인을 기준으로 분리된 stdout에 있는 인자들을 프린트합니다.
void Print(const v8::FunctionCallbackInfo<v8::Value>& args) {
  bool first = true;
  for (int i=0; i<args.length(); i++) {
    v8::HandleScope handle_scope(args.GetIsolate());
    if (first) {
      first = false;
    } else {
      print(" ");
    }
    v8::String::Utf8Value str(args.GetIsolate(), args[i]);
    const char* cstr = ToCString(str);
    printf("%s", cstr);
  }
  printf("\n");
  fflush(stdout);
}
```

C++ 내부에 다른 함수를 추가적으로 구현하여 Node.js에서 인식되도록 할 수 있다.
