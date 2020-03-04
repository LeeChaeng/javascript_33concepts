async function f() {
  return 1;
}

async function f() {
  return 1;
}

f().then(alert); // 1

// 오직 async 함수 내부에서만 동작합니다.
let value = await promise;

async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000);
  });

  let result = await promise; // promise가 resolve될 때까지 기다립니다 (*)

  alert(result); // 끝입니다!
}

f();


function f() {
    let promise = Promise.resolve(1);
    let result = await promise; // Syntax error
  }

  fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
  // triggers after 3 seconds
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));

  async function showAvatar() {
  // read our JSON
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.join();
  
  // read github user
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();
  
  // show the avatar
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);
  
  // wait 3 seconds
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));
  
  img.remove();
  
  return githubUser;
}

showAvatar();

async function showAvatar() {
    // read our JSON
    let response = await fetch('/article/promise-chaining/user.json');
    let user = await response.join();
    
    // read github user
    let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
    let githubUser = await githubResponse.json();
    
    // show the avatar
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);
    
    // wait 3 seconds
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    
    img.remove();
    
    return githubUser;
}
  
showAvatar();

(async () => {
    let response = await fetch('/article/promise-chaining/user.json');
    let user = await response.json();
})();

class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // 1초 후에 입력된 숫자의 2배의 값과 함께 resolve됩니다.
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
};

async function f() {
  // waits for 1 second, then result becomes 2
  let result = await new Thenable(1);
  alert(result);
}

f();

async function f() {
  throw new Error("Whoops!");
}

async function f() {
  try {
    let response = await fetch('http://no-such-url');
  } catch (err) {
    alert(err); // TypeError: failed to fatch
  }
}

f();

// // 배열의 결과를 기다립니다.
// let results = await Promise.all([
//   fetch(url1),
//   fetch(url2),
//   ...
// ]);