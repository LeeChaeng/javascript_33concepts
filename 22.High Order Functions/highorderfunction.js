function greeting() {
  console.log("Hello World");
}

// 함수 호출하기
greeting(); // prints 'Hello World'

// 우리는 오브젝트에 프로퍼티를 추가하듯 함수에 프로퍼티를 추가할 수 있습니다.
greeting.lang = "English";

// Prints 'English'
console.log(greeting.lang);

const square = function(x) {
  return x * x;
};

// prints 25
square(5);

const foo = square;

// prints 36
foo(6);

const arr1 = [1, 2, 3];
const arr2 = [];

for (let i = 0; i < arr1.length; i++) {
  arr2.push(arr1[i] * 2);
}

// prints [2, 4, 6]
console.log(arr2);

const arr1 = [1, 2, 3];

const arr2 = arr1.map(function(item) {
  return item * 2;
});

console.log(arr2);

const arr1 = [1, 2, 3];
const arr2 = arr1.map(item => item * 2);
console.log(arr2);

const birthYear = [1975, 1997, 2002, 1995, 1985];
const ages = [];

for (let i = 0; i < birthYear.length; i++) {
  let age = 2018 - birthYear[i];
  ages.push(age);
}

// prints [43, 21, 16, 23, 33]
console.log(ages);

const persons = [
  { name: "Peter", age: 16 },
  { name: "Mark", age: 18 },
  { name: "John", age: 27 },
  { name: "Jane", age: 14 },
  { name: "Tony", age: 24 }
];
const fullAge = [];
for (let i = 0; i < persons.length; i++) {
  if (persons[i].age >= 18) {
    fullAge.push(persons[i]);
  }
}
console.log(fullAge);

const arr = [5, 7, 1, 8, 4];

const sum = arr.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
});

// prints 25
console.log(sum);

const arr = [5, 7, 1, 8, 4];

const sum = arr.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
}, 10);

// prints 35
console.log(sum);

const arr = [5, 7, 1, 8, 4];

let sum = 0;

for (let i = 0; i < arr.length; i++) {
  sum = sum + arr[i];
}

// prints 25
console.log(sum);
