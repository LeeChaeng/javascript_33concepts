let obj = {
  a: 1,
  b: 2
};
let copy = obj;

obj.a = 5;
console.log(copy.a);
// Result
// a = 5;

function copy(mainObj) {
  let objCopy = {}; // objCopy will store a copy of the mainObj
  let key;

  for (key in mainObj) {
    objCopy[key] = mainObj[key]; // copies each property to the objCopy object
  }
  return objCopy;
}

const mainObj = {
  a: 2,
  b: 5,
  c: {
    x: 7,
    y: 4
  }
};

console.log(copy(mainObj));

let obj = {
  a: 1,
  b: 2
};
let objCopy = Object.assign({}, obj);
console.log(objCopy);
// Result - { a: 1, b: 2 }

let obj = {
  a: 1,
  b: 2
};
let objCopy = Object.assign({}, obj);

console.log(objCopy); // result - { a: 1, b: 2 }
objCopy.b = 89;
console.log(objCopy); // result - { a: 1, b: 89 }
console.log(obj); // result - { a: 1, b: 2 }

let obj = {
  a: 1,
  b: {
    c: 2
  }
};
let newObj = Object.assign({}, obj);
console.log(newObj); // { a: 1, b: { c: 2} }

obj.a = 10;
console.log(obj); // { a: 10, b: { c: 2} }
console.log(newObj); // { a: 1, b: { c: 2} }

newObj.a = 20;
console.log(obj); // { a: 10, b: { c: 2} }
console.log(newObj); // { a: 20, b: { c: 2} }

newObj.b.c = 30;
console.log(obj); // { a: 10, b: { c: 30} }
console.log(newObj); // { a: 20, b: { c: 30} }

// Note: newObj.b.c = 30; Read why..

let someObj = {
  a: 2
};

let obj = Object.create(someObj, {
  b: {
    value: 2
  },
  c: {
    value: 3,
    enumerable: true
  }
});

let objCopy = Object.assign({}, obj);
console.log(objCopy); // { c: 3 }

let obj = {
  a: 1,
  b: {
    c: 2
  }
};

let newObj = JSON.parse(JSON.stringify(obj));

obj.b.c = 20;
console.log(obj); // { a: 1, b: { c: 20 } }
console.log(newObj); // { a: 1, b: { c: 2 } } (New Object Intact!)

let obj = {
  name: "scotch.io",
  exec: function exec() {
    return true;
  }
};

let method1 = Object.assign({}, obj);
let method2 = JSON.parse(JSON.stringify(obj));

console.log(method1); //Object.assign({}, obj)
/* result
  {
    exec: function exec() {
      return true;
    },
    name: "scotch.io"
  }
  */

console.log(method2); // JSON.parse(JSON.stringify(obj))
/* result
  {
    name: "scotch.io"
  }
  */

// circular object
let obj = {
  a: "a",
  b: {
    c: "c",
    d: "d"
  }
};

obj.c = obj.b;
obj.e = obj.a;
obj.b.c = obj.c;
obj.b.d = obj.b;
obj.b.e = obj.b.c;

let newObj = JSON.parse(JSON.stringify(obj));

console.log(newObj);

// circular object
let obj = {
  a: "a",
  b: {
    c: "c",
    d: "d"
  }
};

obj.c = obj.b;
obj.e = obj.a;
obj.b.c = obj.c;
obj.b.d = obj.b;
obj.b.e = obj.b.c;

let newObj2 = Object.assign({}, obj);

console.log(newObj2);

const array = [
  "a",
  "c",
  "d",
  {
    four: 4
  }
];
const newArray = [...array];
console.log(newArray);
// Result
// ["a", "c", "d", { four: 4 }]

let obj = {
  one: 1,
  two: 2
};

let newObj = { ...z };

// { one: 1, two: 2 }
