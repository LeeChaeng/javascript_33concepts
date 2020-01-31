// 오브젝트의 배열을 간단하게 스트링의 배열로 바꾸기
var allSongNames = songs.map(function(song) {
  return song.name;
});

// ES6
const allSongNames = songs.map(song => {
  return song.name;
});

console.log(allSongNames); // ["Curl of the Burl","Oblivion","Flying Whales","L'Enfant Sauvage"];

//유틸 함수를 이용하여 변화 적용하기
const lowerCaseSongs = songs.map(mySongFunc);

var mySongFunc = function(song) {
  return song.name.toLowerCase();
};

// ES6
const mySongFunc = song => {
  return song.name.toLowerCase();
};

console.log(lowerCaseSongs); // ["curl of the burl","oblivion","flying whales","l'enfant sauvage"];

//주어진 배열을 변화시키고, 각각의 오브젝트의 프로퍼티를 추가/삭제 하기

var mapped = songs.map(function(song) {
  // using _.omit we remove the artist property
  // don't use delete because it mutates the song object
  // while _.omit creates a new one
  var newSong = _.omit(song, "artist");

  return Object.assign(newSong, {
    scrobbleCount: 0,
    spotifyUrl: "let's just imagine these properties make sense for now"
  });
});

// ES6
const mapped = songs.map(song => {
  // let's remove the artist property
  const { artist, ...rest } = song;

  return {
    ...rest,
    scrobbleCount: 0,
    spotifyUrl: "let's just imagine these properties make sense for now"
  };
});

console.log(mapped);

// const songs = [
//   {
//     id: 1,
//     name: "Curl of the Burl",
//     scrobbleCount: 0,
//     spotifyUrl: "let's just imagine these properties make sense for now"
//   },
//   {
//     id: 2,
//     name: "Oblivion",
//     scrobbleCount: 0,
//     spotifyUrl: "let's just imagine these properties make sense for now"
//   },
//   {
//     id: 3,
//     name: "Flying Whales",
//     scrobbleCount: 0,
//     spotifyUrl: "let's just imagine these properties make sense for now"
//   },
//   {
//     id: 4,
//     name: "L'Enfant Sauvage",
//     scrobbleCount: 0,
//     spotifyUrl: "let's just imagine these properties make sense for now"
//   },
// ];

// 짝수 필터링하기
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var evenNumbers = numbers.filter(function(num) {
  return num % 2 === 0;
});

// ES6
const evenNumbers = numbers.filter(num => {
  return num % 2 === 0;
});

console.log(evenNumbers); // [2,4,6,8,10];

//간단한 문자열 검색하기
var strings = ["hello", "Matt", "Mastodon", "Cat", "Dog"];

var filtered = strings.filter(function(str) {
  return str.includes("at");
});

// ES6
const filtered = strings.filter(str => {
  return str.includes("at");
});

console.log(filtered); // ["Matt", "Cat"];

// 정수 배열의 합 계산하기
const numbers = [2, 10, 11, 5, 16];

var sum = numbers.reduce(function(acc, currValue) {
  return acc + currValue;
}, 0);

// ES6
const sum = numbers.reduce((acc, currValue) => {
  return acc + currValue;
}, 0);

console.log(sum); // 44

//배열에서 오브젝트 빌드하기
var obj = songs.reduce(function(acc, currValue) {
  var artist = currValue.artist;
  var artistCount = acc[artist] ? acc[artist] + 1 : 1;

  var newObj = {};
  newObj[artist] = artistCount;

  return Object.assign(acc, newObj);
}, {});

// ES6
const obj = songs.reduce((acc, currvalue) => {
  const artist = currValue.artist;
  const artistCount = acc[artist] ? acc[artist] + 1 : 1;

  return {
    ...acc,
    [artist]: artistCount
  };
}, {});

console.log(obj); // {Mastodon: 2, Gojira: 2}

//배열로 된 배열을 하나의 배열로 만들기
const mult = [
  songs,
  [{ id: 112, name: "Chop Suey", artist: "System of a Down" }]
];

var flatMult = mult.reduce(function(acc, currValue) {
  return acc.concat(currValue);
}, []);

// ES6
const flatMult = mult.reduce((acc, currValue) => {
  return acc.concat(currValue);
}, []);

console.log(flatMult);

// [
//  { id: 1, name: "Curl of the Burl", artist: "Mastodon" },
//  { id: 2, name: "Oblivion", artist: "Mastodon" },
//  { id: 3, name: "Flying Whales", artist: "Gojira" },
//  { id: 4, name: "L'Enfant Sauvage", artist: "Gojira" },
//  { id: 112, name: "Chop Suey", artist: "System of a Down" },
// ]
