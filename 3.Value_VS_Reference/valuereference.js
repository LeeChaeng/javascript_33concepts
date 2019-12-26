// 변하지 않는 값들
var x = 10;
var y = "abc";

var a = x;
var b = y;

console.log(x, y, a, b); // -> 10, 'abc', 10, 'abc'

//같은 배열을 가리켜 동일한 값
var reference = [1];
var refCopy = reference;
reference.push(2);
console.log(reference, refCopy); // -> [1, 2], [1, 2]

//값을 재할당하여도 메모리에 남아있는 값
var obj = { first: "reference" };
obj = { second: "ref2" };

//함수를 통하여 전달된 값은 복사된다.
var hundred = 100;
var two = 2;

function multiply(x, y) {
  // PAUSE
  return x * y;
}

var twoHundred = multiply(hundred, two);

//순수함수와 비순수함수
function changeAgeImpure(person) {
  person.age = 25;
  return person;
}

var alex = {
  name: "Alex",
  age: 30
};

var changedAlex = changedAgeImprue(alex);

console.log(alex); // -> {name: 'Alex', age: 25}
console.log(chnagedAlex); // -> {name: 'Alex', age: 25}

function changeAgePure(person) {
  var newPerson = JSON.parse(JSON.stringify(person));
  newPersonObj.age = 25;
  return newPersonObj;
}

var alex = {
  name: "Alex",
  age: 30
};

var alexChanged = changeAgePure(alex);

console.log(alex); // -> {name: 'Alex', age: 30}
console.log(alexChanged); // -> {name: 'Alex', age: 25}
