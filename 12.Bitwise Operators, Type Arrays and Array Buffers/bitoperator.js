const myObject = {
  foo1: false,
  foo2: true,
  foo3: false,
  foo4: true
};

const hasFoo2andFoo4 = {
  foo1: false,
  foo2: true,
  foo3: false,
  foo4: true
};

const hasFoo3andFoo4 = {
  foo1: false,
  foo2: false,
  foo3: true,
  foo4: true
};

// ... 나머지 경우의 수 ...

// 그 후에
if (isEqual(myObject, hasFoo2andFoo4)) {
  // 오브젝트가 Foo2와 Foo4만 가지고 있는지 알 수 있습니다.
}
if (myObject[2] && myObject[4] && !(myObject[1] || myObject[3])) {
  // 우린 오브젝트가 Foo2와 Foo4만 갖고 있다는 것을 알 수 있습니다.
}

(1).toStirng(2);
// 1

(2).toString(2);
// 10

(3).toString(2);
// 11

(4).toString(2);
// 100

// ...

(3877494).toString(2);
// 1110110010101001110110

// `fooBar`를 숫자 2로 셋팅해봅시다.

fooBar.toString(2);
// 10 <- 2의 2진법 표기입니다.

// fooBar의 바이너리 값의 끝에 0을 삽입할 것입니다.
// 표기법은 다음과 같습니다.
foobar = fooBar << 1;

fooBar.toString(2);
// 100

// ... 이제 4가 됐습니다.
console.log(fooBar);
// 4
// 체크할 오브젝트를 정의해봅시다. API 결과나, 유저와 상호작용할 때나, form 형식에서 불러질 수 있습니다.
// 아마 사전엔 알 수 없는 값이겠죠.
const myObject = {
  foo1: false,
  foo2: true,
  foo3: false,
  foo4: true
};

// 코드를 더욱 이해하기 쉽게 만들 수 있는 상수를 정의합시다.
// 이 상수들은 많은 방법으로 작성될 수 있습니다.
// 하지만 저는 이 방법이 직관적으로 이해하기 가장 좋은 방법이라고 생각했습니다.
const HAS_FOO1 = 1; // 0001
const HAS_FOO2 = 1 << 1; // 0010
const HAS_FOO3 = 1 << 2; // 0100
const HAS_FOO4 = 1 << 3; // 1000

// 비트연산 숫자를 만드세요. 아마 use-case에 따라 다르게 만들어지겠죠.
// 하지만 해야 할 일은 같습니다.
// 오브젝트 키를 수동으로 체크하고 if문을 사용하여 한 번에 하나씩 속성을 추가하는 거죠.
let myBitNumber = 0;

if (myObject["foo1"] === true) myBitNumber = myBitNumber | HAS_FOO1;
// 합집합의 형태를 띄기 위해 bit연산자인 "|"를 사용합니다.

if (myObject["foo2"] === true) myBitNumber = myBitNumber | HAS_FOO2;

if (myObject["foo3"] === true) myBitNumber = myBitNumber | HAS_FOO3;

if (myObject["foo4"] === true) myBitNumber = myBitNumber | HAS_FOO4;

console.log(myBitNumber.toString(2));
// 1010

/*
 * 비트연산 숫자는 이제 "1010"이라는 값을 가집니다.
 * 왜냐하면 두번째 값과 네번째 값이 true이기 때문입니다.
 * 이렇게 표현할 수도 있습니다:
 *
 * | fourth | third | second | first | <= Attribute
 * |    1   |   0   |   1    |   0   | <= True/false
 *
 */

// (역자 주 : 위의 소스에서 myBitNumber는 1010이 나오니 참고하세요.)

// 비트 숫자가 하나의 소속성만 가지고 있는지 테스트해보세요.
// &는 두 숫자 사이의 교집합을 보증합니다.
if (myBitNumber & HAS_FOO1) {
  // False, 이 예제에서는 False입니다.
}
if (myBitNumber & HAS_FOO2) {
  // True!
}

// Test whether your bit number has ANY of the specified attributes
if (myBitNumber & (HAS_FOO1 | HAS_FOO2)) {
  // True! (역자 주: 1010 & 0011 의 결과로 0010이 나와서 true입니다.)
}
if (myBitNumber & (HAS_FOO1 | HAS_FOO3)) {
  // False
}

// 오직 명시된 속성만을 가지고 있는지 테스트해보세요.
if (myBitNumber == (HAS_FOO2 | HAS_FOO4)) {
  // True
}
if (myBitNumber == (HAS_FOO2 | HAS_FOO3 | HAS_FOO4)) {
  // False
}

// 모든 주어진 속성을 포함하는지 확인해보세요
// 살짝 헷갈릴 수 있습니다. 속성의 합집합은 혼자서 `myBitNumber`를 대체할 수 없습니다.
// 다만, `myBitNumber` 가 가지지 못한 비트를 가지고 있습니다.
if (myBitNumber == (myBitNumber | (HAS_FOO2 | HAS_FOO4))) {
  // True
}
if (myBitNumber == (myBitNumber | (HAS_FOO2 | HAS_FOO3 | HAS_FOO4))) {
}
// Fa
