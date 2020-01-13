// 이상한 자바스크립트..
3 * "3"; // 9
1 + "2" + 1; // 121

true + true; // 2
10 - true; // 9

const foo = {
  valueOf: () => 2
};
3 + foo; // 5
4 * foo; // 8

const bar = {
  toString: () => " promise is a boy :)"
};

1 + bar; // "1 promise is a boy :)"

4 * []; // 0
4 * [2]; // 8
4 + [2]; // "42"
4 + [1, 2]; // "41, 2"
4 * [1, 2]; // NaN

"string" ? 4 : 1; // 4
undefined ? 4 : 1; // 1

3 * "3"; // 3 * 3
3 * Number("3"); // 3 * 3
Number("5"); // 5

Number("1."); // 1
Number("1.34"); // 1.34
Number("0"); // 0
Number("012"); // 12

Number("1,"); // NaN
Number("1+1"); // NaN
Number("1a"); // NaN
Number("la"); // NaN
Number("one"); // NaN
Number("text"); // NaN

// concatenation
1 + "2"; // "12"
1 + "js"; // "1js"

// addition
1 + 2; // 3
1 + 2 + 1; // 4

// addition, then concatenation
1 +
  2 +
  "1"(
    // "31"
    1 + 2
  ) +
  "1"; // "31"

// concatenation all through
1 +
  "2" +
  1(
    // "121"
    1 + "2"
  ) +
  1; // "121"

"name" + {}; // "name[object Object]"

const foo = {};
foo.toString(); // [object Object]

const baz = {
  toString: () => "I'm object baz"
};

baz + "!"; // "I'm object baz!"

const foo = {
  toString: () => 4
};

2 * foo; // 8
2 / foo; // 0.5
2 + foo; // 6
"four" + foo; // "four4"

const baz = {
  toString: () => "four"
};

2 * baz; // NaN
2 + baz; // 2four

const bar = {
  toString: () => "2"
};

2 + bar; // "22"
2 *
  bar[(1, 2, 3)] // 4
    .toString() // "1,2,3"
    [(1, 2, 3)].join(); // "1,2,3"

"me" + [1, 2, 3]; // "me1,2,3"
4 + [1, 2, 3]; // "41,2,3"
4 * [1, 2, 3]; // NaN

4 * []; // 0
4 / [2]; // 2

//similar to  0
4 * Number([].toString());
4 * Number("");
4 * 0;

//  2

4 / Number([2].toString());
4 / Number("2");
4 / 2;

Number(true); // 1
Number(false); // 0
Number(""); // 0

4 + true; // 5
3 * false; // 0
3 * ""; // 0
3 + ""; // 3

const foo = {
  valueOf: () => 3
};

3 + foo; // 6
3 * foo; // 9

const bar = {
  valueOf: () => 5,
  toString: () => 2
};

"sa" + bar; // "sa5"
3 * bar; // 15
2 + bar; // 7

const two = new Number(2);

two.valueOf(); // 2

const add = number => {
  if (!number) new Error("Only accepts arguments of type: number");
  // your code
};

add(0); // Error: Only accepts arguments of type: number

// better check

const add = number => {
  if (typeof number !== "number")
    new Error("Only accepts arguments of type: number");
  // your code
};

add(0); // no error

NaN === NaN; // false

const notANumber = 3 * "a"; // NaN

notANumber == notANumber; // false
notANumber === notANumber; // false

if (notANumber !== notANumber)
  // true

  Number.isNaN(NaN); // true
Number.isNaN("name"); // false

isNaN("name"); // true
isNaN("1"); // false

const coerceThenCheckNaN = val => {
  const coercedVal = Number(val);
  return coercedVal !== coercedVal ? true : false;
};

coerceThenCheckNaN("1a"); // true
coerceThenCheckNaN("1"); // false
coerceThenCheckNaN("as"); // true
coerceThenCheckNaN(NaN); // true
coerceThenCheckNaN(10); // false
