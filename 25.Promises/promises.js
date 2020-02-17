// ES 5 //
var isMomHappy = false;

// Promise
var willIGetNewPhone = new Promise(function(resolve, reject) {
  if (isMomHappy) {
    var phone = {
      brand: "Samsung",
      color: "black"
    };
    resolve(phone); //fulfilled
  } else {
    var reason = new Error("mom is not happy");
    reject(reason); //reject
  }
});

// promise의 문법은 대략 다음과 같이 생겼습니다.
// new Promise(/_ executor _/ function (resolve, reject) { ... });

// ES 5 //

// Promise 호출
var askMom = function() {
  willGetNewPhone
    .then(function(fulfilled) {
      // 와! 새 폰을 얻었다!
      console.log(fulfilled);
      // output: { brand: 'Samsung', color: 'black' }
    })
    .catch(function(error) {
      // 이런. 엄마가 폰을 안사주네..
      console.log(error.message);
      // output: 'mom is not happy'
    });
};

// 2nd promise
// var showOff = function (phone) {
//     return new Promsie(
//       function (resolve, reject) {
//         var message = 'Hey friend, I have a new ' +
//             phone.color + ' ' + phone.brand + ' phone';

//         resolve(message);
//       };
//     );
//   };

// 2nd promise
var showOff = function(phone) {
  var message =
    "Hey friend, I have a new " + phone.color + " " + phone.brand + " phone";

  return Promise.resolve(message);
};

// call our promise
var askMom = function() {
  willGetNewPhone
    .then(showOff) // 여기서 연계합니다.
    .then(function(fulfilled) {
      console.log(fulfilleded);
      // output: 'Hey friend, I have a new black Samsung phone.'
    })
    .catch(function(error) {
      // oops, mom don't buy it
      console.log(error.message);
      // output: 'mom is not happy'
    });
};

var askMom = function() {
  console.log("before asking Mom"); // log before
  willGetNewPhone
    .then(showOff)
    .then(function(fulfilled) {
      console.log(fulfilled);
    })
    .catch(function(error) {
      console.log(error.message);
    });
  console.log("after asking Mom");
};

// ES 6 //
const isMomHappy = true;

// Promise
const willGetNewPhone = new Promise((resolve, reject) => {
  // 화살표 함수
  if (isMomHappy) {
    const phone = {
      brand: "Samsung",
      color: "black"
    };
    resolve(phone);
  } else {
    const reason = new Error("mom is not happy");
    reject(reason);
  }
});

const showOff = function(phone) {
  const message =
    "Hey friend, I have a new " + phone.color + " " + phone.brand + " phone";
  return Promise.resolve(message);
};

// call our promise
const askMom = function() {
  willGetNewPhone
    .then(showOff)
    .then(fulfilled => console.log(fulfilled))
    .catch(error => console.log(error));
};

askMom();

/_ ES7 _/;
const isMomHappy = true;

// Promise
const willIGetNewPhone = new Promise((resolve, reject) => {
  if (isMomHappy) {
    const phone = {
      brand: "Samsung",
      color: "black"
    };
    resolve(phone);
  } else {
    const reason = new Error("mom is not happy");
    reject(reason);
  }
});

// 2nd promise
async function showOff(phone) {
  return new Promise((resolve, reject) => {
    var message =
      "Hey friend, I have a new " + phone.color + " " + phone.brand + " phone";

    resolve(message);
  });
}

// call our promise
async function askMom() {
  try {
    console.log("before asking Mom");

    let phone = await willIGetNewPhone;
    let message = await showOff(phone);

    console.log(message);
    console.log("after asking mom");
  } catch (error) {
    console.log(error.message);
  }
}

(async () => {
  await askMom();
})();

// add two numbers normally

function add(num1, num2) {
  return num1 + num2;
}

const result = add(1, 2); // you get result = 3 immediately

// add two numbers remotely

// get the result by calling an API
const result = getAddResultFromServer("http://www.example.com?num1=1&num2=2");
// you get result  = "undefined"

// add two numbers normally

let resultA, resultB, resultC;

function add(num1, num2) {
  return num1 + num2;
}

resultA = add(1, 2); // you get resultA = 3 immediately
resultB = add(resultA, 3); // you get resultB = 6 immediately
resultC = add(resultB, 4); // you get resultC = 10 immediately

console.log("total" + resultC);
console.log(resultA, resultB, resultC);

// ...
// addAsync(1,2)
//   .delay(3000) // delay 3 seconds
//   .do(x => resultA = x)
//   ...
