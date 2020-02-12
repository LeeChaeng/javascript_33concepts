const myFavouriteAuthors = [
  "Neal Stephenson",
  "Arthur Clarke",
  "Isaac Asimov",
  "Robert Heinlein"
];

// for (const value of iterable) { ... }

const array = ["a", "b", "c", "d", "e"];
const [first, , third, , last] = array;

const array = ["a", "b", "c", "d", "e"];
const iterator = array[Symbol.iterator]();
const first = iterator.next().value;
iterator.next().value; // Since it was skipped, so it's not assigned
const third = iterator.next().value;
iterator.next().value; // Since it was skipped, so it's not assigned
const last = iterator.next().value;

const array = ["a", "b", "c", "d", "e"];
const newArray = [1, ...array, 2, 3];

const myFavouriteAuthors = {
  allAuthors: {
    fiction: ["Agatha Christie", "J. K. Rowling", "Dr. Seuss"],
    scienceFiction: [
      "Neal Stephenson",
      "Arthur Clarke",
      "Isaac Asimov",
      "Robert Heinlein"
    ],
    fantasy: ["J. R. R. Tolkien", "J. K. Rowling", "Terry Pratchett"]
  },
  [Symbol.iterator]() {
    // 모든 작가를 배열로 받기
    const genres = Object.values(this.allAuthors);

    // 현재의 장르와 작가 인덱스를 저장하기
    let currentAuthorIndex = 0;
    let currentGenreIndex = 0;

    return {
      // next() 구현
      next() {
        // 현재 장르 인덱스에 따른 작가들
        const authors = genres[currentGenreIndex];

        // doNotHaveMoreAuthors 는 Authors 배열을 전부 돌았을 때, 참이 됩니다.
        // 모든 아이템이 소비되었을 때, 참이 됩니다.
        const doNotHaveMoreAuthors = !(currentAuthorIndex < authors.length);
        if (doNotHaveMoreAuthors) {
          // 더 이상 불러올 작가가 없을 때, 다음 장르 인덱스(currentGenreIndex)가 다음으로 넘어갑니다.
          currentGenreIndex++;
          // 그리고 작가 인덱스(currentAuthorIndex)가 0이 됩니다.
          currentAuthorIndex = 0;
        }

        // 만일 모든 장르가 끝났다면,
        // 우리는 아이터레이터에게 더 이상 우리가 줄 값이 없다는 것을 알려야 합니다.
        const doNotHaveMoreGenres = !(currentGenreIndex < genres.length);
        if (doNotHaveMoreGenres) {
          return {
            value: undefined,
            done: true
          };
        }

        // 만일 모든 것들이 맞다면, 현재 장르로부터 작가 이름을 반환합니다.
        // 그리고 작가 인덱스를 하나 늘립니다(increment).
        // 다음에는, 다음 작가가 반환됩니다.
        return {
          value: genres[currentGenreIndex][currentAuthorIndex++],
          done: false
        };
      }
    };
  }
};

for (const author of myFavouriteAuthors) {
  console.log(author);
}

console.log(...myFavouriteAuthors);
