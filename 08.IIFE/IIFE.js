function sayHi() {
  alert("Hello, World!");
}

sayHi();

var msg = "Hello, World!";
var sayHi = function() {
  alert(msg);
};

sayHi(); // 브라우저에서 "Hello, World!"라는 alert 메시지를 띄웁니다.
var fibo = function fibonacci() {
  // 여기서 fibonacci() 함수를 호출할 수 있습니다.
  // 이 함수 표현식이 이름을 갖고 있기 때문입니다.
};

// 여기서 fibonacci()를 호출하면 실패합니다. 하지만 fibo()는 동작합니다.
!(function() {
  alert("Hello from IIFE!");
})();

// "Hello from IIFE" 메시지를 보여줍니다.
void (function() {
  alert("Hello from IIFE!");
})();

(function() {
  alert("I am not an IIFE yet!");
});

// 문체 1
(function() {
  alert("I am an IIFE!");
})();

// 문체 2
(function() {
  alert("I am an IIFE, too!");
})();

// 유효한 IIFE
(function initGameIIFE() {
  // All your magical code to initialize the game!
})();

// 유효하지 않은 IIFE
//   function nonWorkingIIFE() {
//       // 이제 왜 앞뒤로 괄호가 필요한지 알게 될 것입니다.
//       // 괄호 없이는 그냥 함수 정의입니다. 표현식이 아닙니다.
//       // 문법 에러가 날 것입니다.
//   }();

//   function () {
//       // 여기서도 문법 에러가 날 것입니다.
//   }();

(function IIFE_initGame() {
  // IIFE 밖에서는 접근할 수 없는 Private 변수들입니다.
  var lives;
  var weapons;

  init();

  // IIFE 밖에서는 접근할 수 없는 Private 함수입니다.
  function init() {
    lives = 5;
    weapons = 10;
  }
})();

var result = (function() {
  return "From IIFE";
})();

alert(result); // "From IIFE" 메시지를 출력합니다.

(function IIFE(msg, times) {
  for (var i = 1; i <= times; i++) {
    console.log(msg);
  }
})("Hello!", 5);

(function($, global, document) {
  // jQuery를 위해 $를 사용하고, window를 위해 global을 사용합니다.
})(jQuery, window, document);

var Sequence = (function sequenceIIFE() {
  // 현재 counter 값을 저장하기 위한 Private 변수입니다.
  var current = 0;

  // IIFE에서 반환되는 객체입니다.
  return {};
})();

alert(typeof Sequence); // alert("Object");

var Sequence = (function sequenceIIFE() {
  // 현재 counter 값을 저장하기 위한 Private 변수
  var current = 0;

  // IIFE로 부터 반환 받는 객체
  return {
    getCurrentValue: function() {
      return current;
    },

    getNextValue: function() {
      current = current + 1;
      return current;
    }
  };
})();

console.log(Sequence.getNextValue()); // 1
console.log(Sequence.getNextValue()); // 2
console.log(Sequence.getCurrentValue()); // 2
