2 + (2 * 3) / 2(Math.random() * (100 - 20)) + 20;

functionCall();

window.history ? useHistory() : noHistoryFallback();

1 + 1, 2 + 2, 3 + 3;

declaredVariable;

true && functionCall();

true && declaredVariable;

const assignedVariable = 2; // 이건 문장(Statement)입니다. assignedVariable은 상태입니다.

assignedVariable * 4; // 표현식(Expression)입니다.

assignedVariable * 10; // 표현식(Expression)입니다.

assignedVariable - 10; // 표현식(Expression)입니다.

console.log(assignedVariable); // 2

//foo(if () {return 2}) // js engine mind = blown

if (true) {
  function foo() {} // 블록의 가장 상위 레벨, 함수 선언
}

function foo() {} // 전역 레벨, 함수 선언

function foo() {
  function bar() {} // 블록의 가장 상위 레벨, 함수 선언
}

function foo() {
  return function bar() {}; // 네임드 함수 표현식
}

foo(function() {}); // 익명 함수 표현식

function foo() {
  return function bar() {
    function baz() {} // 블록의 가장 상위 레벨, 함수 선언
  };
}

// function () {} // 문법 에러: 함수 문장(statement)은 이름이 필요합니다.

2 + 2; // expression statement
foo(); // expression statement

2 + 2; // 그 자체로는 표현식입니다.

foo(2 + 2); // 그래서 어디든 값이 들어가야 할 곳에서 사용할 수 있죠.

true ? 2 + 2 : 1 + 1;

function foo() {
  return 2 + 2;
}

2 + 2; // 표현식 문장(Expression Statements)
// foo(2+2;) // 문법 에러(Syntax Error)

const a; function foo () {}; const b = 2;

console.log( (1+2, 3, 4) ) // 4

console.log( (2, 9/3, function () {}) ) //function () {}

console.log( (3, true ? 2+2 : 1+1) ) // 4

function foo () {return 1, 2, 3, 4}
foo() // 4

// function () {}  //Error

(function () {}) // function () {}를 리턴합니다.

r: 2+2 // 유효함

foo()

const foo = () => {}

loop: {
    for (const i=0; i<2; i++){
      for (const n=0; n<2; n++){
        break loop; // 바깥 루프를 중단하여 전체 루프를 중단합니다.  
      }
    }
  }

  lab: function a () {}
console.log(lab) // ReferenceError: lab is not defined

{var a = "b"; func(); 2+2} // 4

console.log({a: 'b'}); // {a: 'b'} 오브젝트 리터럴

// console.log({var a = "b", func(), 2+2}) // SyntaxError 블록 문장

// const obj = {var a = "b", func(), 2+2} // SyntaxError 블록 문장

{} + 1 // 1

{2} + 2 // 2

{2+2} + 3 // 3

{2+2} - 3 // -3