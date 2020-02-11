function factorial(x) {
  if (x < 0) return;
  if (x === 0) return 1;
  return x * factorial(x - 1);
}

factorial(3);
// 6

function factorial(x) {
  // 종료 조건
  if (x < 0) return;

  // 기반 조건
  if (x === 0) return 1;

  // 재귀
  return x * factorial(x - 1);
}

factorial(3);
// 6

// factorial(3) returns 3 * factorial(2)
// factorial(2) returns 2 * factorial(1)
// factorial(1) returns 1 * factorial(0)
// factorial(0) returns 1
// // 여기서 기반 조건이 충족됩니다. 재귀 함수는 안에서 부터 바깥으로 값을 반환해나갑니다.
// factorial(0) returns 1                 => 1
// factorial(1) returns 1 * factorial(0)  => 1 * 1
// factorial(2) returns 2 * factorial(1)  => 2 * 1 * 1
// factorial(3) returns 3 * factorial(2)  => 3 * 2 * 1 * 1
// // 3 * 2 * 1 * 1 = 6

function revStr(str) {
  if (str === "") return "";
  return revStr(str.substr(1)) + str[0];
}

revStr("cat");
// tac
