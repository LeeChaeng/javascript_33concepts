// let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...);

function sayHi() {
  alert("Hello");
}

setTimeout(sayHi, 1000);

function sayHi(phrase, who) {
  alert(phrase + ", " + who);
}

setTimeout(sayHi, 1000, "Hello", "John"); // Hello, John

setTimeout("alert('Hello')", 1000);

setTimeout(() => alert("Hello"), 1000);

// Wrong!
setTimeout(sayHi(), 1000);

// let timerId = setTimeout(...);
clearTimeout(timerId);

let timerId = setTimeout(() => alert("never happens"), 1000);
alert(timerId); // timer identifier

clearTimeout(timerId);
alert(timerId); // same identifier (취소 이후에도 null이 되진 않습니다.)

//let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...);

// 2초마다 반복
let timerId = setInterval(() => alert("tick"), 2000);

// 5초 후에 정지
setTimeout(() => {
  clearInterval(timerId);
  alert("stop");
}, 5000);

let timerId = setTimeout(function tick() {
  alert("tick");
  timerId = setTimeout(tick, 2000); // (*)
}, 2000);

let i = 1;
setInterval(function() {
  func(i);
}, 100);

setTimeout(() => alert("World"));

alert("Hello");
