5 === 5;
// true

"hello world" === "hello world";
// true (둘 다 스트링이고 같은 값을 가짐)

true === true;
// true (둘 다 불리언이고 같은 값을 가짐)

77 === "77";
// false (숫자 타입 vs 문자열 타입)

"cat" === "dog";
// false (둘 다 문자열 타입 하지만 다른 값을 가짐)

false === 0;
// false (다른 타입, 다른 값)

77 == "77";
// true

false == 0;
// true

false == 0;
// true

0 == "";
// true

"" == false;
// true

null == null;
// true

undefined == undefined;
// true

null == undefined;
// true

NaN == null;
// false

NaN == undefined;
// false

NaN == NaN;
// false
