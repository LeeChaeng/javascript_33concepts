function three() {
  console.log("It's my first step");
}
function two() {
  three();
}
function one() {
  two();
}
function zero() {
  one();
  throw Error("I am an error");
}
zero();
